document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const settingsScreen = document.getElementById('settings-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');

    const startGameBtn = document.getElementById('start-game-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const endGameInterruptBtn = document.getElementById('end-game-interrupt-btn');
    const restartGameBtn = document.getElementById('restart-game-btn');

    const addOp = document.getElementById('add-op');
    const subtractOp = document.getElementById('subtract-op'); // FIXED: Corrected ID from 'subtractOp' to 'subtract-op'
    const multiplyOp = document.getElementById('multiply-op');
    const divideOp = document.getElementById('divide-op');
    const digitRadios = document.querySelectorAll('input[name="digits"]');
    const answerModeRadios = document.querySelectorAll('input[name="answerMode"]');
    const gameTimeRadios = document.querySelectorAll('input[name="gameTime"]');

    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score');
    const questionDisplay = document.getElementById('question');

    // Answer Areas
    const typeAnswerArea = document.getElementById('type-answer-area');
    const answerInput = document.getElementById('answer-input');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');

    const mcqOptionsArea = document.getElementById('mcq-options-area');

    const feedbackDisplay = document.getElementById('feedback');

    const finalCorrectDisplay = document.getElementById('final-correct');
    const finalWrongDisplay = document.getElementById('final-wrong');

    // Game Variables
    let selectedOperations = [];
    let numberDigitMode = 'one'; // 'one', 'two', or 'two-one'
    let answerMode = 'type'; // 'type' or 'mcq'
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let timeRemaining = 180; // Default to 3 minutes (180 seconds)
    let timerInterval;
    let currentQuestion = {};

    // --- Utility Functions ---

    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    /**
     * Generates a random number with the specified number of digits.
     * @param {number} digits - The number of digits (1 or 2).
     * @param {boolean} [allowZero=false] - Whether to allow 0 for 1-digit numbers.
     * @returns {number} The generated random number.
     */
    function getRandomNumber(digits, allowZero = false) {
        if (digits === 1) {
            return allowZero ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 9) + 1; // 0-9 or 1-9
        } else if (digits === 2) {
            return Math.floor(Math.random() * 90) + 10; // 10-99
        }
        return 0; // Should not reach here
    }

    function generateQuestion() {
        const op = selectedOperations[Math.floor(Math.random() * selectedOperations.length)];
        let num1, num2, answer, questionText;

        do {
            if (numberDigitMode === 'one') {
                num1 = getRandomNumber(1);
                num2 = getRandomNumber(1);
            } else if (numberDigitMode === 'two') {
                num1 = getRandomNumber(2);
                num2 = getRandomNumber(2);
            } else { // 'two-one' mode
                num1 = getRandomNumber(2); // Two-digit number
                num2 = getRandomNumber(1); // One-digit number
            }

            // Ensure valid operations and answers
            switch (op) {
                case 'add':
                    answer = num1 + num2;
                    questionText = `${num1} + ${num2} = ?`;
                    break;
                case 'subtract':
                    // Ensure result is not negative for basic arithmetic
                    if (num1 < num2) {
                        [num1, num2] = [num2, num1]; // Swap to ensure num1 >= num2
                    }
                    answer = num1 - num2;
                    questionText = `${num1} - ${num2} = ?`;
                    break;
                case 'multiply':
                    answer = num1 * num2;
                    questionText = `${num1} * ${num2} = ?`;
                    break;
                case 'divide':
                    // Ensure whole number division
                    if (num2 === 0) continue; // Avoid division by zero

                    let tempAnswer; // This will be the desired quotient
                    let tempDivisor; // This will be the desired divisor (num2)

                    if (numberDigitMode === 'one') {
                        tempAnswer = getRandomNumber(1, true); // Quotient 0-9
                        tempDivisor = getRandomNumber(1, false); // Divisor 1-9
                    } else if (numberDigitMode === 'two') {
                        tempAnswer = getRandomNumber(2, true); // Quotient 0-99
                        tempDivisor = getRandomNumber(2, false); // Divisor 10-99
                    } else { // 'two-one' mode
                        tempAnswer = getRandomNumber(1, true); // Quotient 0-9
                        tempDivisor = getRandomNumber(1, false); // Divisor 1-9
                    }

                    // Calculate dividend (num1) based on desired quotient and divisor
                    num1 = tempAnswer * tempDivisor;
                    num2 = tempDivisor; // Assign the actual divisor

                    // Additional checks to ensure numbers are within reasonable bounds for the mode
                    if (numberDigitMode === 'one' && (num1 > 81 || num1 < 0)) continue; // Max 9*9 for 1-digit operands
                    if (numberDigitMode === 'two' && (num1 > 9801 || num1 < 0)) continue; // Max 99*99 for 2-digit operands
                    if (numberDigitMode === 'two-one' && (num1 > 891 || num1 < 0)) continue; // Max 99*9 for 2-digit by 1-digit

                    // Ensure division by zero is strictly avoided after calculations too
                    if (num2 === 0) continue;

                    answer = tempAnswer;
                    if (num1 === 0 && num2 === 0) continue; // Avoid 0/0
                    questionText = `${num1} / ${num2} = ?`;
                    break;
            }
        } while (answer < 0 || (op === 'divide' && (num1 % num2 !== 0))); // Re-generate if answer is negative or not whole for division

        currentQuestion = { num1, num2, op, answer, questionText };
        questionDisplay.textContent = currentQuestion.questionText;

        // Clear and prepare answer area based on mode
        feedbackDisplay.textContent = ''; // Clear previous feedback
        feedbackDisplay.classList.remove('feedback-correct', 'feedback-wrong');

        if (answerMode === 'type') {
            typeAnswerArea.style.display = 'block';
            mcqOptionsArea.style.display = 'none';
            answerInput.value = ''; // Clear input field
            answerInput.focus(); // Focus on the input for quick typing
        } else { // MCQ mode
            typeAnswerArea.style.display = 'none';
            mcqOptionsArea.style.display = 'grid'; // Use grid for options
            generateMCQOptions(currentQuestion.answer);
        }
    }

    function generateMCQOptions(correctAnswer) {
        mcqOptionsArea.innerHTML = ''; // Clear previous options
        const options = new Set();
        options.add(correctAnswer); // Add the correct answer

        // Determine a reasonable range for wrong answers based on the correct answer and number of digits
        let minOption, maxOption;

        // Adjusted ranges for better distractor generation across different digit modes
        if (numberDigitMode === 'one') {
            minOption = Math.max(0, correctAnswer - 5);
            maxOption = correctAnswer + 5;
            minOption = Math.max(minOption, 0); // Ensure non-negative options for 1-digit unless from subtraction
            maxOption = Math.min(maxOption, 81); // Max result for 1-digit operations
        } else if (numberDigitMode === 'two') {
            minOption = correctAnswer - 50;
            maxOption = correctAnswer + 50;
            minOption = Math.max(minOption, -100);
            maxOption = Math.min(maxOption, 10000); // Max possible for 2-digit multiplication is 99*99 = 9801
        } else { // 'two-one' mode
            minOption = correctAnswer - 20;
            maxOption = correctAnswer + 20;
            minOption = Math.max(minOption, -10); // Answers can be small from division/subtraction
            maxOption = Math.min(maxOption, 900); // Max possible for 2-digit * 1-digit is approx 99*9 = 891
        }


        // Generate 3 unique wrong answers
        let attempts = 0;
        const maxAttempts = 200; // Increased attempts for robustness
        while (options.size < 4 && attempts < maxAttempts) {
            let wrongAnswer;
            // Generate wrong answers randomly within a plausible range around the correct answer
            // Ensure the random number is within the defined minOption and maxOption
            wrongAnswer = Math.floor(Math.random() * (maxOption - minOption + 1)) + minOption;

            // Ensure wrong answers are different from the correct answer and not already in the set
            if (wrongAnswer !== correctAnswer && !options.has(wrongAnswer)) {
                options.add(wrongAnswer);
            }
            attempts++;
        }

        // Fallback: If after maxAttempts, we still don't have enough options, add simple deviations
        // This is a safeguard against extremely rare cases where a random generation fails
        while (options.size < 4) {
            let wrongAnswer;
            // Try simple +/- deviations
            if (!options.has(correctAnswer + 1)) wrongAnswer = correctAnswer + 1;
            else if (!options.has(correctAnswer - 1)) wrongAnswer = correctAnswer - 1;
            else if (!options.has(correctAnswer + 10)) wrongAnswer = correctAnswer + 10;
            else if (!options.has(correctAnswer - 10)) wrongAnswer = correctAnswer - 10;
            else wrongAnswer = Math.floor(Math.random() * (maxOption - minOption + 1)) + minOption; // Last resort random

            if (wrongAnswer !== correctAnswer && !options.has(wrongAnswer)) {
                options.add(wrongAnswer);
            }
            // Add a safety break to prevent an infinite loop in extreme edge cases
            if (options.size === 4) break;
        }

        const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5); // Shuffle

        shuffledOptions.forEach(option => {
            const optionBox = document.createElement('div');
            optionBox.classList.add('option-box');
            optionBox.textContent = option;
            optionBox.dataset.value = option; // Store the value
            optionBox.addEventListener('click', () => checkAnswer(option));
            mcqOptionsArea.appendChild(optionBox);
        });
    }


    function updateTimer() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endGame();
        } else {
            timeRemaining--;
        }
    }

    function updateScore() {
        scoreDisplay.textContent = `Correct: ${correctAnswers} | Wrong: ${wrongAnswers}`;
    }

    function checkAnswer(userAnswerFromMCQ = null) {
        let userAnswer;
        if (answerMode === 'type') {
            userAnswer = parseInt(answerInput.value);
            if (isNaN(userAnswer)) {
                feedbackDisplay.textContent = "Please enter a number!";
                feedbackDisplay.classList.add('feedback-wrong');
                return;
            }
        } else { // MCQ mode
            userAnswer = userAnswerFromMCQ;
            // Disable options temporarily
            mcqOptionsArea.querySelectorAll('.option-box').forEach(box => {
                box.style.pointerEvents = 'none'; // Prevent clicking other options after one is chosen
            });
        }


        if (userAnswer === currentQuestion.answer) {
            correctAnswers++;
            feedbackDisplay.textContent = "Correct!";
            feedbackDisplay.classList.remove('feedback-wrong');
            feedbackDisplay.classList.add('feedback-correct');
        } else {
            wrongAnswers++;
            feedbackDisplay.textContent = `Wrong! The answer was ${currentQuestion.answer}`;
            feedbackDisplay.classList.remove('feedback-correct');
            feedbackDisplay.classList.add('feedback-wrong');
        }
        updateScore();
        // Re-enable options after delay for next question in MCQ mode
        if (answerMode === 'mcq') {
            setTimeout(() => {
                mcqOptionsArea.querySelectorAll('.option-box').forEach(box => {
                    box.style.pointerEvents = 'auto';
                });
                generateQuestion(); // Generate new question after 1 second feedback
            }, 1000);
        } else {
            setTimeout(generateQuestion, 1000); // Generate new question after 1 second feedback
        }
    }

    function startGame() {
        // Get selected operations
        selectedOperations = [];
        if (addOp.checked) selectedOperations.push('add');
        if (subtractOp.checked) selectedOperations.push('subtract');
        if (multiplyOp.checked) selectedOperations.push('multiply');
        if (divideOp.checked) selectedOperations.push('divide');

        if (selectedOperations.length === 0) {
            alert("Please select at least one arithmetic operation!");
            return;
        }

        // Get selected number digits mode
        digitRadios.forEach(radio => {
            if (radio.checked) {
                numberDigitMode = radio.value;
            }
        });

        // Get selected answer mode
        answerModeRadios.forEach(radio => {
            if (radio.checked) {
                answerMode = radio.value;
            }
        });

        // Get selected game time
        gameTimeRadios.forEach(radio => {
            if (radio.checked) {
                timeRemaining = parseInt(radio.value); // Set timeRemaining based on selected radio value
            }
        });

        // Reset game variables
        correctAnswers = 0;
        wrongAnswers = 0;
        updateScore();
        updateTimer();
        generateQuestion(); // Generate the first question

        showScreen('game-screen');
        clearInterval(timerInterval); // Clear any existing interval
        timerInterval = setInterval(updateTimer, 1000);
    }

    function endGame() {
        clearInterval(timerInterval); // Stop the timer
        finalCorrectDisplay.textContent = correctAnswers;
        finalWrongDisplay.textContent = wrongAnswers;
        showScreen('result-screen');
    }

    function resetGame() {
        clearInterval(timerInterval); // Stop the timer if running
        showScreen('settings-screen');
        // Reset settings checkboxes and radio buttons to defaults
        addOp.checked = true;
        subtractOp.checked = false;
        multiplyOp.checked = false;
        divideOp.checked = false;
        document.querySelector('input[name="digits"][value="one"]').checked = true;
        document.querySelector('input[name="answerMode"][value="type"]').checked = true; // Default to type mode
        document.querySelector('input[name="gameTime"][value="180"]').checked = true; // Default to 3 minutes
    }

    // --- Event Listeners ---

    startGameBtn.addEventListener('click', startGame);
    playAgainBtn.addEventListener('click', resetGame);
    endGameInterruptBtn.addEventListener('click', endGame);
    restartGameBtn.addEventListener('click', resetGame);

    // Event listener for "Submit" button (only for type mode)
    submitAnswerBtn.addEventListener('click', () => checkAnswer());

    // Allow pressing Enter key to submit answer (only for type mode)
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && answerMode === 'type') {
            checkAnswer();
        }
    });

    // Initial screen setup
    showScreen('settings-screen');
});