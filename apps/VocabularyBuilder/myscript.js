    const wordListInput = document.getElementById('word-list');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const inputArea = document.getElementById('input-area');
    const quizArea = document.getElementById('quiz-area');
    const questionTextEl = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackEl = document.getElementById('feedback');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const newListBtn = document.getElementById('new-list-btn');
    const scoreEl = document.getElementById('score');
    const highScoreEl = document.getElementById('high-score');
    const clearHSBtn = document.getElementById('clear-hs-btn');
    const predefinedListsContainer = document.querySelector('.predefined-lists');

    const quizModeSelect = document.getElementById('quiz-mode');
    const timeLimitInput = document.getElementById('time-limit');
    const timerEl = document.getElementById('timer');
    const currentQNumberEl = document.getElementById('current-q-number');
    const totalQNumberEl = document.getElementById('total-q-number');

    // New DOM Elements for User List Management
    const saveListNameInput = document.getElementById('save-list-name');
    const saveListBtn = document.getElementById('save-list-btn');
    const savedListsSelect = document.getElementById('saved-lists-select');
    const loadListBtn = document.getElementById('load-list-btn');
    const deleteListBtn = document.getElementById('delete-list-btn');

    let vocabulary = [];
    let currentQuestionIndex = 0;
    let currentQuizItem; // { word: '...', meaning: '...' }
    let score = 0;
    let quizWords = []; // Shuffled items for the current quiz session
    let highScore = 0;
    let optionsEnabled = true; // To prevent multiple clicks on options

    let quizMode = 'word-to-meaning';
    let questionTimeLimit = 15; // seconds, 0 for no limit
    let timerInterval;
    let timeLeft;

    const NUM_OPTIONS = 4;
    const HIGH_SCORE_KEY = 'vocabQuizHighScore';
    const USER_LISTS_KEY = 'vocabQuizUserLists'; // Key for storing user lists

    // Inbuilt vocabulary lists
            const commonWords = `account - a record of transactions
act - to do something 
addition - the process of adding numbers/things 
adjustment - the act of adjusting or modifying 
advertisement - a public notice meant to promote a product 
agreement - a negotiated bargain or understanding 
air - the invisible gaseous substance surrounding the earth 
amount - a quantity of something 
amusement - anything that provides entertainment 
animal - a living organism that feeds on plants/other animals 
answer - a response to a question 
apparatus - a piece of equipment for a specific purpose 
approval - the act of approving something 
argument - a reason or set of reasons given for/against something 
art - creative expression through a medium 
attack - an act of hostility 
attempt - the action of trying to do something 
attention - notice or observation 
attraction - something that draws interest 
authority - the power to enforce rules/give orders 
back - the rear part of something 
balance - an even distribution of weight 
base - the bottom support of something 
behaviour - the way one acts or conducts oneself 
belief - an acceptance that something exists or is true 
birth - the emergence of a newborn 
bit - a small piece of something 
bite - to cut, grip, or tear with the teeth 
blood - the red liquid pumped by the heart 
blow - a forcible strike or harsh act 
body - the physical structure of a person/animal 
brass - a yellow alloy of copper and zinc 
bread - a baked food made of flour 
breath - air inhaled and exhaled in respiration 
brother - a male sibling 
building - a permanent structure for residence/business 
burn - to consume by fire 
burst - to break open/apart suddenly 
business - commerce, trade, or work involving money 
butter - a solid emulsion of fat globules made from milk/cream 
canvas - a heavy woven fabric for painting 
care - close protection or attention 
cause - the source or origin of an event 
chalk - a soft white limestone 
chance - a possibility of something happening 
change - to make or become different 
cloth - a woven fabric 
coal - a combustible black sedimentary rock 
colour - the property of an object of producing light sensations 
comfort - a state of physical ease and freedom from pain 
committee - a group appointed to consider/report on something 
company - an association of individuals for business purposes 
comparison - considering something in relation to something else 
competition - the act of competing, as for profit or a prize 
condition - a state of being 
connection - a relationship or association 
control - to exercise authority or influence over 
cook - to prepare food by heating it 
copper - a reddish-brown malleable metallic element 
copy - a reproduction or transcript 
cork - the outer bark of an oak tree 
cotton - a soft white fibrous substance 
cough - to expel air from the lungs with a sudden noise 
country - a nation with its own government 
cover - something that covers or conceals 
crack - a narrow fracture or fissure 
credit - money or amount counted toward a purchase 
crime - an act punishable by law 
crush - to compress or flatten 
cry - to shed tears from duress or pain 
current - the flow of electricity through a conductor 
curve - a line or outline that gradually deviates from straightness 
damage - harm impairing the function/condition of something 
danger - the possibility of harm or adverse consequences 
daughter - a person's female offspring 
day - a period of 24 hours 
death - the termination of life 
debt - something owed, such as money 
decision - a determination arrived at after consideration 
degree - a stage of attainment or development 
design - to plan and make decisions about something 
desire - a strong wish or longing 
destruction - the act of destroying something 
detail - a minor or subordinate item or part 
development - the process of developing or being developed 
digestion - the process of making food usable for the body 
direction - the path along which something moves 
discovery - the act of finding something new 
discussion - the process of considering by talking 
disease - an abnormal condition affecting part/all of an organism 
disgust - a strong feeling of revulsion or repugnance 
distance - the amount of space between two things 
distribution - the act of distributing or spreading around 
division - the act or process of dividing 
doubt - a feeling of uncertainty about something 
drink - a liquid for drinking 
driving - the act of controlling a vehicle 
dust - fine dry particles of matter 
earth - the planet we live on 
edge - the border, brink or outer portion of something 
education - the process of receiving instruction 
effect - a result or consequence 
end - the last part, finale 
error - a mistake 
event - something that happens, an occurrence 
example - a representative sample 
exchange - the act of trading one thing for another 
existence - the state or fact of being 
expansion - the act of increasing in size/scope 
experience - the process of doing and seeing things 
expert - someone with a high skill level 
fact - a truth, reality 
fall - to descend from a higher place 
family - a group of related people 
father - a male parent 
fear - an unpleasant emotion caused by threat 
feeling - an emotional state or reaction 
fiction - literature consisting of imaginary events 
field - an open land area 
fight - a violent struggle 
fire - combustion of inflammable materials 
flame - the hot glowing part of a fire 
flight - the action of flying through the air 
flower - the bloom or blossom of a plant 
fold - to bend over or double up 
food - what people and animals eat 
force - strength or energy used on an object 
form - the visible shape or configuration of something 
friend - a person you know well and like 
front - the forward part of something 
fruit - the edible reproductive body of a seed plant 
glass - a hard transparent material 
gold - a precious yellow metallic element 
government - the ruling authority over a community 
grain - a small hard seed 
grass - vegetation consisting of green blades 
grip - to grasp firmly 
group - a number of people or things together 
growth - the process of growing 
guide - someone who leads the way 
harbour - a sheltered body of water for docking 
harmony - a pleasing combination of elements 
hate - to dislike intensely 
hearing - the sense by which sound is perceived 
heat - hot or warm condition 
help - to give assistance 
history - the record of past events 
hole - an hollow place in a solid body or surface 
hope - a feeling of desire for something to happen 
hour - a period of 60 minutes 
humour - the quality of being funny 
ice - frozen water 
idea - a thought or suggestion 
impulse - a sudden spontaneous inclination 
increase - to make or become greater 
industry - economic activity concerned with manufacture 
ink - a colored liquid used for writing 
insect - a small air-breathing arthropod 
instrument - a device used for a specific purpose 
insurance - coverage for damage, liability or loss 
interest - feelings of curiosity or concern 
invention - a new device or process from study/experimentation 
iron - a heavy magnetic metallic element 
jelly - a semi-solid food gelatin product 
join - to put or bring together 
journey - an act of traveling from place to place 
judge - to form an opinion after consideration 
jump - to spring into the air 
kick - to strike out with the foot 
kiss - to touch with the lips as a greeting 
knowledge - information, understanding gained by study 
land - the solid part of the earth's surface 
language - the method of human communication 
laugh - to express emotion through amused sounds 
law - the rules of conduct established by authority 
lead - to guide or show the way 
learning - the acquisition of knowledge or skills 
leather - the tanned skin of an animal 
letter - a written message 
level - a height or distance from a given plane 
lift - to raise something up 
light - the natural agent that allows things to be seen 
limit - the utmost extent or boundary 
linen - a fabric made from the flax plant 
liquid - a substance that flows freely 
list - a series of names or things, one after the other 
look - to direct the eyes in order to see 
loss - the condition of being deprived of something 
love - a deep feeling of affection 
machine - a device with moving parts that does work 
man - an adult male human 
manager - someone who manages a business/department 
mark - a visible sign or impression 
market - a place where goods are bought/sold 
mass - the quantity of matter an object contains 
meal - an instance of eating food 
measure - to ascertain the size, quantity or degree of 
meat - the edible flesh of animals 
meeting - the act of coming together 
memory - the power to retain information 
metal - a solid material that is typically hard, opaque, and a good conductor 
middle - the center or midst of something 
milk - a white liquid produced by mammals 
mind - the element in a person that reasons/thinks 
mine - an excavated pit for extracting minerals 
minute - a period of 60 seconds 
mist - a thin, condensed water vapor in the atmosphere 
money - currency used to purchase goods/services 
month - one of the twelve periods a year is divided into 
morning - the earliest part of the day 
mother - a female parent 
motion - the action or process of moving 
mountain - a large natural elevation of earth's surface 
move - to change from one place/position to another 
music - the art of arranging tones in sequence 
name - the word by which someone/something is designated 
nation - a sovereign country with its own government 
need - a physiological or psychological requirement 
news - newly received or noteworthy information 
night - the period of darkness when the sun is below the horizon 
noise - a loud or unpleasant sound 
note - a brief written record 
number - a mathematical value 
observation - the act of making and noting a phenomenon 
offer - to present for acceptance or rejection 
oil - a viscous liquid derived from petroleum 
operation - the state of being employed or operating 
opinion - a personal view or belief 
order - a proper or methodical arrangement 
organization - an organized group with a objective 
ornament - something that adorns or decorates 
owner - the person who owns something 
page - one side of a leaf of paper in a book/document 
pain - an unpleasant physical sensation 
paint - a colored substance used on surfaces 
paper - a material made of cellulose pulp 
part - a portion or division of a whole 
paste - an adhesive substance 
payment - the remuneration of a sum due 
peace - a state of tranquility and quiet 
person - a human being 
place - a particular position or point in space 
plant - a living organism in the vegetable kingdom 
play - to engage in recreative activity 
pleasure - a feeling of happy satisfaction 
point - a specific position or place 
poison - a substance that can cause injury, illness or death 
polish - to make smooth and glossy 
porter - one who carries baggage/burdens for others 
position - the location occupied by something 
powder - a solid substance composed of fine particles 
power - the ability or capacity to perform 
price - the amount of money something costs 
print - to reproduce writing/images on a surface 
process - a series of actions toward a particular end 
produce - to manufacture or create 
profit - the money gained in business after expenses 
property - something owned 
prose - the ordinary language in speech/writing 
protest - an objection or remonstrance 
pull - to apply force to move something toward oneself 
punishment - a penalty for wrongdoing 
purpose - the reason for which something exists/is done 
push - to apply force to move something away 
quality - a distinguishing characteristic or attribute 
question - an instance of asking 
rain - water condensed from the atmosphere 
range - the extent to which something varies 
rate - a ratio of one quantity to another 
ray - a line of energy/particles moving in one direction 
reaction - something done/felt in response 
reading - the act of understanding written/printed words 
reason - a cause or justification 
record - a piece of documented evidence 
regret - feeling sorry for an action 
relation - a connection or association 
religion - a system of faith and worship 
representative - a person who represents others 
request - an act of asking politely for something 
respect - a feeling of admiration 
rest - cessation of work or movement 
reward - something given for service/attainment 
rhythm - a recurrence of sound/movement in a pattern 
rice - grains used for food 
river - a large stream of flowing fresh water 
road - a path or way between places 
roll - to move along a surface by rotating 
room - an area within a building 
rub - to apply pressure with friction 
rule - a principle or regulation 
run - to move rapidly by using the legs 
salt - a seasoning used in food 
sand - loose granular particles of disintegrated rocks 
scale - a graduated series of values 
science - knowledge about the physical world 
sea - the saltwater surrounding the land masses 
seat - a place for sitting 
secretary - an administrative assistant 
selection - the act or instance of selecting 
self - one's own person or identity 
sense - a faculty for physical perception 
servant - one who works for another 
sex - biological male or female characteristics 
shade - a comparative degree of lightness/darkness 
shake - to move up and down or back and forth 
shame - a painful feeling of humiliation 
shock - a sudden or violent blow or jolt 
side - either lateral half of something 
sign - an indicator or token 
silk - a fine, soft thread produced by silkworms 
silver - a precious grayish-white metallic element 
sister - a daughter of one's parents 
size - the physical dimensions or magnitude 
sky - the region of clouds and atmosphere above 
sleep - a natural periodic state of rest 
slip - to slide accidentally and lose one's foothold 
slope - an inclined plane or surface 
smash - to shatter or break into pieces violently 
smell - the sense by which odors are perceived 
smile - a facial expression showing happiness 
smoke - the gaseous products of burning materials 
sneeze - to expel air from the nose/mouth suddenly 
snow - frozen water vapor in the solid state 
soap - a cleansing agent used with water 
society - a group of people living as a community 
son - a male child in relation to the parents 
song - a musical composition with lyrics 
sort - to arrange according to characteristics 
sound - the sensation perceived by the sense of hearing 
soup - a liquid dish, typically savory 
space - the unlimited expanse in which everything is situated 
stage - a raised platform for performances 
start - to begin or initiate 
statement - a communication or declaration 
steam - the vapor into which water is converted when heated 
steel - an alloy of iron and carbon 
step - a movement made by lifting a foot and setting it down 
stitch - a loop of thread in sewing/knitting 
stone - a small hard piece of rock 
stop - to halt or discontinue motion 
story - a narrative or tale 
stretch - to extend or spread out 
structure - the arrangement of parts in a construction 
substance - physical material from which something is made 
sugar - a sweet crystalline food ingredient 
suggestion - an idea or proposal put forward for consideration 
summer - the warmest season of the year 
support - to bear the weight of 
surprise - the feeling caused by something unexpected 
swim - to propel oneself in water 
system - a set of connected things operating together 
talk - to communicate verbally 
taste - one of the sensations excited by substances on the tongue 
tax - a compulsory payment imposed by government 
teaching - the act of instructing 
tendency - an inclination or proneness toward something 
test - a procedure to determine knowledge/abilities 
theory - a well-substantiated explanation of some aspect of the world 
thing - an object whose name is unknown or unspecified 
thought - the product of mental activity 
thunder - the sound caused by a lightning discharge 
time - the measured or measurable period during which things happen 
tin - a malleable metallic element 
top - the uppermost part of something 
touch - to be in contact with 
trade - the act of buying, selling or exchanging commodities 
transport - to carry or convey from one place to another 
trick - a crafty underhanded procedure to deceive 
trouble - a state of distress, affliction or difficulty 
turn - a circular or semi-circular movement 
twist - to com bine by winding together 
unit - a determinate quantity adopted as a standard measurement 
use - to put into service or employ for a purpose 
value - a principle or quality considered worthwhile 
verse - a single metrical line in a poetic composition 
vessel - a craft for traveling on water 
view - an instance of seeing or beholding 
voice - the sound produced by the vocal organs 
walk - to go on foot at a moderate pace 
war - a state of armed conflict between different nations 
wash - to cleanse by immersing in or applying a liquid 
waste - to uselessly expend or employ 
water - the clear liquid essential for life 
wave - a ridged alternating swell and depression 
wax - a solid substance made by bees 
way - a road, path or particular manner of doing 
weather - the state of the atmosphere 
week - a period of seven days 
weight - the force that causes something to drop 
wind - air moving in a specific direction 
wine - the fermented juice of grapes 
winter - the coldest season of the year 
woman - an adult female human being 
wood - the hard fibrous material of trees 
wool - the dense crispy or curly hair of sheep/goats 
word - a sound or combination of sounds with meaning 
work - activity involving mental or physical effort 
wound - an injury to living tissue 
writing - the activity of putting words on paper 
year - one cycle of the seasons, or 12 months`;

    const advancedVocabulary = `ephemeral:lasting for a very short time
ubiquitous:present, appearing, or found everywhere
serendipity:the occurrence and development of events by chance in a happy or beneficial way
cacophony:a harsh discordant mixture of sounds
mellifluous:sweet or musical; pleasant to hear
lugubrious:looking or sounding sad and dismal
egregious:outstandingly bad; shocking
juxtaposition:the fact of two things being seen or placed close together with contrasting effect
insidious:proceeding in a gradual, subtle way, but with harmful effects
perfunctory:carried out with a minimum of effort or reflection`;

    const scienceTerms = `photosynthesis:the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll
mitochondria:an organelle found in large numbers in most cells, in which the biochemical processes of respiration and energy production occur
osmosis:a process by which molecules of a solvent tend to pass through a semipermeable membrane from a less concentrated solution into a more concentrated one
catalyst:a substance that increases the rate of a chemical reaction without itself undergoing any permanent chemical change
inertia:a tendency to do nothing or to remain unchanged
quantum:a discrete quantity of energy proportional in magnitude to the frequency of the radiation it represents
genome:the complete set of genetic material of an organism
enzyme:a substance produced by a living organism which acts as a catalyst to bring about a specific biochemical reaction
neuron:a nerve cell that is specialized for the transmission of nerve impulses
polymer:a substance that has a molecular structure consisting chiefly or entirely of a large number of similar units bonded together`;

    const inbuiltLists = {
        common: commonWords,
        advanced: advancedVocabulary,
        science: scienceTerms
    };

    // --- Initialization ---
    document.addEventListener('DOMContentLoaded', () => {
        loadHighScore();
        updateHighScoreDisplay();
        populateSavedListsDropdown(); // Populate user-saved lists dropdown
    });

    // --- Event Listeners ---
    startQuizBtn.addEventListener('click', () => {
        const listText = wordListInput.value.trim();
        if (!listText && vocabulary.length === 0) { // Check if vocab was populated by a loaded list if textarea is empty
             // If textarea is empty but vocabulary has items (e.g. from a loaded list not yet started)
            if (vocabulary.length > 0 && vocabulary.length < NUM_OPTIONS){
                 alert(`The current list has only ${vocabulary.length} items. Please add at least ${NUM_OPTIONS} unique word:meaning pairs.`);
                 return;
            } else if (vocabulary.length === 0) {
                 alert("Please enter a vocabulary list, choose a predefined list, or load a saved list.");
                 return;
            }
        }

        if (listText) { // Always re-parse from textarea if it has content
            vocabulary = parseWordList(listText);
        }


        if (vocabulary.length < NUM_OPTIONS) {
            alert(`Please ensure your list has at least ${NUM_OPTIONS} unique word:meaning pairs to generate meaningful choices.`);
            return;
        }

        quizMode = quizModeSelect.value;
        questionTimeLimit = parseInt(timeLimitInput.value, 10);

        inputArea.classList.add('hidden');
        quizArea.classList.remove('hidden');
        restartQuizBtn.classList.remove('hidden');
        newListBtn.classList.remove('hidden');
        startNewQuiz();
    });

    nextQuestionBtn.addEventListener('click', () => {
        if (optionsEnabled) return; 
        currentQuestionIndex++;
        if (currentQuestionIndex < quizWords.length) {
            displayQuestion();
            optionsEnabled = true;
        } else {
            endQuiz();
        }
    });

    restartQuizBtn.addEventListener('click', startNewQuiz);

    newListBtn.addEventListener('click', () => {
        quizArea.classList.add('hidden');
        inputArea.classList.remove('hidden');
        feedbackEl.textContent = '';
        feedbackEl.className = '';
        wordListInput.value = ''; 
        vocabulary = []; 
        if (saveListNameInput) saveListNameInput.value = ''; // Clear save name input
        populateSavedListsDropdown(); // Refresh dropdown
        stopTimer();
    });

    clearHSBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear the high score?")) {
            localStorage.removeItem(HIGH_SCORE_KEY);
            highScore = 0;
            updateHighScoreDisplay();
        }
    });

    predefinedListsContainer.addEventListener('click', (event) => {
        if (event.target.dataset.list) {
            const listKey = event.target.dataset.list;
            wordListInput.value = inbuiltLists[listKey];
            vocabulary = parseWordList(inbuiltLists[listKey]); // Parse immediately
            if(saveListNameInput) saveListNameInput.value = ''; // Clear any custom list name
        }
    });

    // Event Listeners for User List Management
    if (saveListBtn) {
        saveListBtn.addEventListener('click', handleSaveList);
    }
    if (loadListBtn) {
        loadListBtn.addEventListener('click', handleLoadSelectedList);
    }
    if (deleteListBtn) {
        deleteListBtn.addEventListener('click', handleDeleteSelectedList);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !nextQuestionBtn.classList.contains('hidden') && optionsEnabled === false) {
            nextQuestionBtn.click();
        }
    });


    // --- Core Logic ---
    function parseWordList(listText) {
        const lines = listText.split('\n');
        const parsedVocab = [];
        const seenWords = new Set(); 
        const seenMeanings = new Set();

        lines.forEach(line => {
            const parts = line.split(/[:\-–—]/);
            if (parts.length >= 2) {
                const word = parts[0].trim().toLowerCase(); 
                const meaning = parts.slice(1).join(':').trim();
                if (word && meaning && !seenWords.has(word) && !seenMeanings.has(meaning)) {
                    parsedVocab.push({ word, meaning });
                    seenWords.add(word);
                    seenMeanings.add(meaning);
                }
            }
        });
        return parsedVocab;
    }

    function startNewQuiz() {
        if (vocabulary.length < NUM_OPTIONS) { // This check should ideally use vocabulary array directly
            alert(`Please ensure your list has at least ${NUM_OPTIONS} unique word:meaning pairs to generate meaningful choices.`);
            // Optionally, switch back to input area if quiz cannot start
            // quizArea.classList.add('hidden');
            // inputArea.classList.remove('hidden');
            return;
        }
        score = 0;
        currentQuestionIndex = 0;
        quizWords = shuffleArray([...vocabulary]);
        totalQNumberEl.textContent = quizWords.length;
        scoreEl.textContent = score;
        feedbackEl.textContent = '';
        feedbackEl.className = '';
        nextQuestionBtn.classList.add('hidden');
        nextQuestionBtn.textContent = "Next Question";
        optionsEnabled = true; // Ensure options are enabled for the first question
        displayQuestion();
    }

    function displayQuestion() {
        stopTimer(); 
        feedbackEl.textContent = '';
        feedbackEl.className = '';
        nextQuestionBtn.classList.add('hidden');
        optionsContainer.innerHTML = '';

        if (currentQuestionIndex >= quizWords.length) {
            endQuiz();
            return;
        }

        currentQuizItem = quizWords[currentQuestionIndex];
        currentQNumberEl.textContent = currentQuestionIndex + 1;

        let questionStr = '';
        let correctAnswerValue; 

        if (quizMode === 'word-to-meaning') {
            questionStr = `What is the meaning of: "${capitalizeFirstLetter(currentQuizItem.word)}"?`;
            correctAnswerValue = currentQuizItem.meaning;
        } else { 
            questionStr = `Which word means: "${capitalizeFirstLetter(currentQuizItem.meaning)}"?`;
            correctAnswerValue = currentQuizItem.word;
        }
        questionTextEl.textContent = questionStr;

        const options = generateOptions(currentQuizItem, correctAnswerValue);

        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = capitalizeFirstLetter(option.text); 
            button.addEventListener('click', () => checkAnswer(option.correct, button));
            optionsContainer.appendChild(button);
        });
        optionsEnabled = true; // Make sure options are clickable

        if (questionTimeLimit > 0) {
            timeLeft = questionTimeLimit;
            updateTimerDisplay();
            timerInterval = setInterval(onTimerTick, 1000);
        } else {
            timerEl.textContent = "No time limit";
        }
    }

    function generateOptions(correctItem, correctAnswerText) {
        let options = [{ text: correctAnswerText, correct: true }];
        let wrongAnswerSources = vocabulary.filter(item => {
            return item.word !== correctItem.word && item.meaning !== correctItem.meaning;
        });
        wrongAnswerSources = shuffleArray(wrongAnswerSources);

        for (let i = 0; options.length < NUM_OPTIONS && i < wrongAnswerSources.length; i++) {
            let potentialOptionText;
            if (quizMode === 'word-to-meaning') {
                potentialOptionText = wrongAnswerSources[i].meaning;
            } else { 
                potentialOptionText = wrongAnswerSources[i].word;
            }

            if (!options.some(opt => opt.text.toLowerCase() === potentialOptionText.toLowerCase())) {
                options.push({ text: potentialOptionText, correct: false });
            }
        }
        
        let fullVocabCopy = shuffleArray([...vocabulary]);
        let emergencyLoopGuard = 0;
        while(options.length < NUM_OPTIONS && emergencyLoopGuard < vocabulary.length * 2) {
             emergencyLoopGuard++;
            const randomItem = fullVocabCopy[Math.floor(Math.random() * fullVocabCopy.length)];
            if (!randomItem) continue; // Should not happen if vocabulary.length > 0

            let fallbackText;
            if (quizMode === 'word-to-meaning') {
                fallbackText = randomItem.meaning;
            } else {
                fallbackText = randomItem.word;
            }
            
            if (fallbackText.toLowerCase() !== correctAnswerText.toLowerCase() && !options.some(opt => opt.text.toLowerCase() === fallbackText.toLowerCase())) {
                options.push({ text: fallbackText, correct: false });
            }
        }
         // If still not enough, add generic options as a last resort (rare for lists >= NUM_OPTIONS)
        let genericOptionCounter = 1;
        while(options.length < NUM_OPTIONS && options.length > 0) { // Ensure we have at least one correct option
            let genericText = `Option ${options.length + genericOptionCounter++}`;
             if (!options.some(opt => opt.text === genericText)) {
                options.push({ text: genericText, correct: false});
            }
        }
        return shuffleArray(options);
    }

    function checkAnswer(isCorrect, button) {
        if (!optionsEnabled) return; 
        optionsEnabled = false;
        stopTimer();
        const optionButtons = optionsContainer.getElementsByTagName('button');
        for (let btn of optionButtons) {
            btn.disabled = true;
            let correctValueToCheck = (quizMode === 'word-to-meaning') ? currentQuizItem.meaning : currentQuizItem.word;
            if (btn.textContent.toLowerCase() === correctValueToCheck.toLowerCase()) { 
                if(!isCorrect && btn !== button) { 
                    btn.classList.add('revealed-correct');
                }
            }
        }

        if (isCorrect) {
            feedbackEl.textContent = "Correct!";
            feedbackEl.className = 'feedback correct-feedback';
            button.classList.add('correct');
            score++;
            scoreEl.textContent = score;
        } else {
            button.classList.add('incorrect');
            let correctAnswerText = (quizMode === 'word-to-meaning') ? currentQuizItem.meaning : currentQuizItem.word;
            feedbackEl.innerHTML = `Incorrect. The correct answer is: <strong>${capitalizeFirstLetter(correctAnswerText)}</strong>`;
            feedbackEl.className = 'feedback incorrect-feedback';
        }
        nextQuestionBtn.classList.remove('hidden');
        if (currentQuestionIndex >= quizWords.length - 1) {
            nextQuestionBtn.textContent = "Show Final Score";
        }
    }

    function onTimerTick() {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            stopTimer();
            feedbackEl.innerHTML = "Time's up! The correct answer was: <strong>" +
                capitalizeFirstLetter((quizMode === 'word-to-meaning' ? currentQuizItem.meaning : currentQuizItem.word)) + "</strong>";
            feedbackEl.className = 'feedback incorrect-feedback';
            optionsEnabled = false;
            const optionButtons = optionsContainer.getElementsByTagName('button');
            for (let btn of optionButtons) {
                btn.disabled = true;
                let correctValueToCheck = (quizMode === 'word-to-meaning') ? currentQuizItem.meaning : currentQuizItem.word;
                if (btn.textContent.toLowerCase() === correctValueToCheck.toLowerCase()) {
                    btn.classList.add('revealed-correct');
                }
            }
            nextQuestionBtn.classList.remove('hidden');
            if (currentQuestionIndex >= quizWords.length - 1) {
                nextQuestionBtn.textContent = "Show Final Score";
            }
        }
    }

    function endQuiz() {
        stopTimer();
        questionTextEl.textContent = "Quiz Finished!";
        optionsContainer.innerHTML = '';
        let message = `Your final score is ${score} out of ${quizWords.length}.<br>`;
        if (score > highScore) {
            message += `Congratulations! New High Score!`;
            highScore = score;
            saveHighScore();
            updateHighScoreDisplay();
        } else {
            message += `Current High Score: ${highScore}.`;
        }

        feedbackEl.innerHTML = message;
        feedbackEl.className = 'feedback info-feedback';
        nextQuestionBtn.classList.add('hidden');
        restartQuizBtn.classList.remove('hidden');
        newListBtn.classList.remove('hidden');
    }

    // --- Timer ---
    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    function updateTimerDisplay() {
        timerEl.textContent = `Time: ${timeLeft}s`;
    }

    // --- High Score ---
    function loadHighScore() {
        const savedScore = localStorage.getItem(HIGH_SCORE_KEY);
        if (savedScore !== null) {
            highScore = parseInt(savedScore, 10);
        }
    }
    function saveHighScore() {
        localStorage.setItem(HIGH_SCORE_KEY, highScore.toString());
    }
    function updateHighScoreDisplay() {
        highScoreEl.textContent = highScore;
    }

    // --- User List Management Functions ---
    function getUserLists() {
        const lists = localStorage.getItem(USER_LISTS_KEY);
        return lists ? JSON.parse(lists) : [];
    }

    function storeUserLists(lists) {
        localStorage.setItem(USER_LISTS_KEY, JSON.stringify(lists));
    }

    function populateSavedListsDropdown() {
        if (!savedListsSelect) return;

        const lists = getUserLists();
        savedListsSelect.innerHTML = '<option value="">-- Select a list to load or delete --</option>'; 

        lists.sort((a, b) => a.name.localeCompare(b.name)); 

        lists.forEach(list => {
            const option = document.createElement('option');
            option.value = list.name;
            option.textContent = list.name;
            savedListsSelect.appendChild(option);
        });
    }

    function handleSaveList() {
        const listName = saveListNameInput.value.trim();
        const listContent = wordListInput.value.trim();

        if (!listName) {
            alert("Please enter a name for your list.");
            saveListNameInput.focus();
            return;
        }
        if (!listContent) {
            alert("The vocabulary list content is empty. Please add some words.");
            wordListInput.focus();
            return;
        }

        const lists = getUserLists();
        const existingListIndex = lists.findIndex(l => l.name === listName);

        if (existingListIndex > -1) {
            if (!confirm(`A list named "${listName}" already exists. Do you want to overwrite it?`)) {
                return;
            }
            lists[existingListIndex].content = listContent;
            alert(`List "${listName}" updated successfully!`);
        } else {
            lists.push({ name: listName, content: listContent });
            alert(`List "${listName}" saved successfully!`);
        }

        storeUserLists(lists);
        populateSavedListsDropdown();
        saveListNameInput.value = ''; 
    }

    function handleLoadSelectedList() {
        const selectedListName = savedListsSelect.value;
        if (!selectedListName) {
            alert("Please select a list to load.");
            return;
        }

        const lists = getUserLists();
        const listToLoad = lists.find(l => l.name === selectedListName);

        if (listToLoad) {
            wordListInput.value = listToLoad.content;
            saveListNameInput.value = listToLoad.name; 
            vocabulary = parseWordList(listToLoad.content); 
            alert(`List "${selectedListName}" loaded into the textarea.`);
        } else {
            alert("Could not find the selected list. It might have been deleted elsewhere.");
            populateSavedListsDropdown(); 
        }
    }

    function handleDeleteSelectedList() {
        const selectedListName = savedListsSelect.value;
        if (!selectedListName) {
            alert("Please select a list to delete.");
            return;
        }

        if (!confirm(`Are you sure you want to delete the list "${selectedListName}"? This action cannot be undone.`)) {
            return;
        }

        let lists = getUserLists();
        const listBeingDeleted = lists.find(l => l.name === selectedListName); // Get ref before filtering
        lists = lists.filter(l => l.name !== selectedListName);
        storeUserLists(lists);
        populateSavedListsDropdown(); 

        alert(`List "${selectedListName}" deleted successfully.`);

        if (saveListNameInput.value === selectedListName) {
            saveListNameInput.value = '';
            if (listBeingDeleted && wordListInput.value === listBeingDeleted.content) {
                wordListInput.value = '';
                vocabulary = []; 
            } else if (!listBeingDeleted && wordListInput.value.trim() !== '') {
                // If the list was already gone but name matched, and textarea had content, user might want to keep it.
                // Or, if they edited after loading, they might want to keep edits.
                // For simplicity, we only clear textarea if its content *exactly* matched the deleted list.
                // If name matches but content doesn't, we leave textarea as is.
            }
        }
         // Reset select if the deleted item was selected
        if(savedListsSelect.value === selectedListName) { // This check might be redundant as populate already resets
            savedListsSelect.value = "";
        }
    }


    // --- Utility Functions ---
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
