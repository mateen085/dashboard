// --- DOM Elements ---
        const boardElement = document.getElementById('board');
        const statusElement = document.getElementById('statusArea');
        const restartButton = document.getElementById('restartButton');

        // --- Game State Variables ---
        let currentPlayer = 'X'; // 'X' always starts
        let boardState = ['', '', '', '', '', '', '', '', '']; // Represents the 3x3 board
        let gameActive = true; // Flag to indicate if the game is ongoing

        // --- Winning Combinations ---
        // These are the indices of the boardState array that result in a win
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // --- Functions ---

        /**
         * Initializes or resets the game board.
         * Clears existing cells and creates 9 new cells.
         * Adds event listeners to each cell.
         */
        function initializeBoard() {
            boardElement.innerHTML = ''; // Clear previous cells
            boardState = ['', '', '', '', '', '', '', '', '']; // Reset board state
            currentPlayer = 'X';
            gameActive = true;
            statusElement.textContent = `Player ${currentPlayer}'s turn`;
            statusElement.className = 'status-message'; // Reset status styles

            // Create 9 cells for the board
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.index = i; // Store the index of the cell
                cell.addEventListener('click', handleCellClick);
                cell.addEventListener('touchend', handleCellClick, { passive: false }); // For touch devices
                boardElement.appendChild(cell);
            }
        }

        /**
         * Handles a click or tap event on a cell.
         * If the cell is empty and the game is active, it places the current player's mark.
         * Then, it checks for a win or draw and switches the player.
         * @param {Event} event - The click or touchend event.
         */
        function handleCellClick(event) {
            event.preventDefault(); // Prevent double events on touch (click after touchend)
            const clickedCell = event.target;
            const clickedCellIndex = parseInt(clickedCell.dataset.index);

            // Check if the cell is already filled or if the game is over
            if (boardState[clickedCellIndex] !== '' || !gameActive) {
                return;
            }

            // Update board state and UI
            boardState[clickedCellIndex] = currentPlayer;
            clickedCell.textContent = currentPlayer;
            clickedCell.classList.add(currentPlayer.toLowerCase()); // Add 'x' or 'o' class for styling

            // Check for game end conditions
            if (checkWin()) {
                endGame(false);
            } else if (boardState.every(cell => cell !== '')) { // Check for draw (all cells filled)
                endGame(true);
            } else {
                // Switch player if game is still active
                switchPlayer();
            }
        }

        /**
         * Switches the current player and updates the status message.
         */
        function switchPlayer() {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusElement.textContent = `Player ${currentPlayer}'s turn`;
        }

        /**
         * Checks if the current player has won.
         * Iterates through winningCombinations to see if any are met.
         * @returns {boolean} True if the current player has won, false otherwise.
         */
        function checkWin() {
            for (const combination of winningCombinations) {
                const [a, b, c] = combination;
                if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                    // Highlight winning cells
                    combination.forEach(index => {
                        boardElement.children[index].classList.add('winning-cell');
                    });
                    return true; // A win is found
                }
            }
            return false; // No win found
        }

        /**
         * Ends the game, displaying the result.
         * @param {boolean} isDraw - True if the game is a draw, false if a player won.
         */
        function endGame(isDraw) {
            gameActive = false; // Stop further moves
            if (isDraw) {
                statusElement.textContent = "It's a Draw!";
                statusElement.className = 'status-message text-yellow-600'; // Style for draw
            } else {
                statusElement.textContent = `Player ${currentPlayer} Wins! 🎉`;
                statusElement.className = `status-message ${currentPlayer === 'X' ? 'text-red-500' : 'text-blue-500'}`; // Style for winner
            }
        }

        // --- Event Listeners ---
        restartButton.addEventListener('click', initializeBoard);
        restartButton.addEventListener('touchend', (e) => { e.preventDefault(); initializeBoard(); }, { passive: false });


        // --- Initial Game Setup ---
        // Call initializeBoard when the script loads to set up the game for the first time.
        window.onload = () => {
            initializeBoard();
        };