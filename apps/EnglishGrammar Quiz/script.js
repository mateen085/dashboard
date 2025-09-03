const startArea = document.getElementById('start-area');
const startQuizBtn = document.getElementById('start-quiz-btn');
const gameArea = document.getElementById('game-area');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback');
const nextQuestionBtn = document.getElementById('next-question-btn');
const endTestBtn = document.getElementById('end-test-btn'); // Get the new button
const restartGameBtn = document.getElementById('restart-game-btn');
const playAgainSameListBtn = document.getElementById('play-again-same-list-btn');
const scoreEl = document.getElementById('score');
const questionNumberEl = document.getElementById('question-number');
const totalQuestionsEl = document.getElementById('total-questions');
const highScoreEl = document.getElementById('high-score');
const timerArea = document.getElementById('timer-area');
const timeEl = document.getElementById('time');

const endSummaryEl = document.getElementById('end-summary');
const summaryTotalEl = document.getElementById('summary-total');
const summaryCorrectEl = document.getElementById('summary-correct');
const summaryIncorrectEl = document.getElementById('summary-incorrect');
const summaryTimedOutEl = document.getElementById('summary-timedout');
const summaryMissedQuestionsEl = document.querySelector('#summary-missed-questions ul');

const listManagementArea = document.getElementById('list-management-area');
const questionListSelect = document.getElementById('question-list-select');
const loadListBtn = document.getElementById('load-list-btn');
const deleteListBtn = document.getElementById('delete-list-btn');
const createListArea = document.getElementById('create-list-area');
const newListNameInput = document.getElementById('new-list-name');
// Removed individual question input elements and buttons
// const newQuestionInput = document.getElementById('new-question');
// const newOptionsInput = document.getElementById('new-options');
// const newAnswerIndexInput = document.getElementById('new-answer-index');
// const newExplanationInput = document.getElementById('new-explanation');
// const addQuestionBtn = document.getElementById('add-question-btn');
// const updateQuestionBtn = document.getElementById('update-question-btn');
const previewListNameEl = document.getElementById('preview-list-name');
const previewQuestionsListEl = document.getElementById('preview-questions-list');
const saveNewListBtn = document.getElementById('save-new-list-btn');
const clearNewListBtn = document.getElementById('clear-new-list-btn');

const exportImportArea = document.getElementById('export-import-area');
const exportListBtn = document.getElementById('export-list-btn');
const importExportJsonTextarea = document.getElementById('import-export-json');
const importListBtn = document.getElementById('import-list-btn');
const importFromFileBtn = document.getElementById('import-from-file-btn');
const importFileInput = document.getElementById('import-file-input');


// --- Pre-defined Sample Questions (Can be any topic) ---
// Renamed and made generic
const basicGrammarList = [
    {
        question: "Choose the correct sentence:",
        options: ["He go to the store.", "He goes to the store.", "He going to the store.", "He gone to the store."],
        answerIndex: 1,
        explanation: "For third person singular subjects (He, She, It) in the simple present tense, add -s or -es to the base verb."
    },
    {
        question: "Identify the noun in the sentence: 'The cat sat on the mat.'",
        options: ["The", "sat", "on", "cat"],
        answerIndex: 3,
        explanation: "A noun is a person, place, thing, or idea. 'Cat' is a thing (animal)."
    },
    {
        question: "Which is the correct form of the verb 'be' for 'I' in the simple present?",
        options: ["is", "are", "am", "be"],
        answerIndex: 2,
        explanation: "The correct form of 'be' for 'I' in the simple present is 'am'."
    },
    {
        question: "Add the correct article: 'She saw ______ elephant.'",
        options: ["a", "an", "the", "none"],
        answerIndex: 1,
        explanation: "Use 'an' before words that start with a vowel sound (elephant starts with 'e')."
    },
    {
        question: "Choose the correct plural form of 'child'.",
        options: ["childs", "children", "childes", "child's"],
        answerIndex: 1,
        explanation: "Children is an irregular plural noun."
    },
    {
        question: "Complete the sentence: 'They ______ playing outside yesterday.'",
        options: ["is", "was", "were", "are"],
        answerIndex: 2,
        explanation: "Use 'were' with plural subjects (They) in the past continuous tense."
    },
    {
        question: "Which word is an adjective in the sentence: 'The quick brown fox.'",
        options: ["The", "quick", "fox", "brown"],
        answerIndex: 1,
        explanation: "Adjectives describe nouns. 'Quick' describes the fox."
    },
     {
        question: "Choose the correct preposition: 'The book is ______ the table.'",
        options: ["in", "on", "at", "of"],
        answerIndex: 1,
        explanation: "Use 'on' to indicate something is on a surface."
    },
    {
        question: "Complete the sentence: 'He ______ finished his homework yet.'",
        options: ["hasn't", "haven't", "isn't", "aren't"],
        answerIndex: 0,
        explanation: "Use 'hasn't' (has not) with third person singular subjects in the present perfect tense."
    },
    {
        question: "Choose the sentence with correct capitalization:",
        options: ["i live in paris.", "I live in paris.", "i live in Paris.", "I live in Paris."],
        answerIndex: 3,
        explanation: "Capitalize the first word of a sentence and proper nouns (Paris is a city name)."
    },
     // Adding 90 more basic questions...
     {
        question: "Identify the verb in the sentence: 'Birds fly in the sky.'",
        options: ["Birds", "fly", "in", "sky"],
        answerIndex: 1,
        explanation: "A verb is an action word. 'Fly' is an action."
    },
    {
        question: "Which word is a pronoun: 'She gave him the book.'",
        options: ["She", "gave", "book", "the"],
        answerIndex: 0,
        explanation: "'She' is a pronoun, replacing a noun."
    },
    {
        question: "Choose the correct form: 'He is ______ than me.'",
        options: ["taller", "tallest", "tall", "more tall"],
        answerIndex: 0,
        explanation: "Use the comparative form 'taller' when comparing two things."
    },
    {
        question: "Complete the sentence: 'I ______ to the party last night.'",
        options: ["go", "goes", "went", "going"],
        answerIndex: 2,
        explanation: "Use the simple past tense 'went' for a completed action in the past."
    },
    {
        question: "Choose the correct sentence:",
        options: ["They is happy.", "They are happy.", "They am happy.", "They be happy."],
        answerIndex: 1,
        explanation: "Use 'are' with the pronoun 'They'."
    },
    {
        question: "What is the past tense of 'eat'?",
        options: ["eated", "ate", "eaten", "eating"],
        answerIndex: 1,
        explanation: "'Ate' is the irregular past tense of 'eat'."
    },
    {
        question: "Choose the correct contraction for 'it is'.",
        options: ["its", "it's", "its'", "its's"],
        answerIndex: 1,
        explanation: "'It's' is the contraction for 'it is' or 'it has'. 'Its' is possessive."
    },
    {
        question: "Add the correct article: 'He wants ______ apple.'",
        options: ["a", "an", "the", "none"],
        answerIndex: 1,
        explanation: "Use 'an' before a word starting with a vowel sound ('apple')."
    },
    {
        question: "Choose the correct plural of 'mouse'.",
        options: ["mouses", "mice", "mousees", "mices"],
        answerIndex: 1,
        explanation: "'Mice' is an irregular plural noun."
    },
    {
        question: "Identify the adverb: 'She sings beautifully.'",
        options: ["She", "sings", "beautifully", "the"],
        answerIndex: 2,
        explanation: "Adverbs describe verbs, adjectives, or other adverbs. 'Beautifully' describes how she sings."
    },
     {
        question: "Complete the sentence: 'He is ______ a book now.'",
        options: ["read", "reads", "reading", "to read"],
        answerIndex: 2,
        explanation: "Use the present continuous tense (is + -ing) for actions happening now."
    },
    {
        question: "Choose the correct sentence structure:",
        options: ["Ran the dog.", "The dog ran.", "Dog the ran.", "Ran dog the."],
        answerIndex: 1,
        explanation: "Basic sentence structure is Subject + Verb."
    },
    {
        question: "What is the base form of 'swimming'?",
        options: ["swam", "swim", "swum", "swims"],
        answerIndex: 1,
        explanation: "The base form (infinitive without 'to') is 'swim'."
    },
    {
        question: "Choose the correct possessive pronoun: 'This is ______ pen.' (belonging to me)",
        options: ["my", "mine", "I", "me"],
        answerIndex: 0,
        explanation: "'My' is a possessive adjective used before a noun."
    },
    {
        question: "Complete the sentence: 'We ______ watched that movie already.'",
        options: ["has", "have", "is", "are"],
        answerIndex: 1,
        explanation: "Use 'have' with the pronoun 'We' in the present perfect tense."
    },
     {
        question: "Which word is a conjunction: 'I like tea and coffee.'",
        options: ["I", "like", "and", "coffee"],
        answerIndex: 2,
        explanation: "Conjunctions connect words, phrases, or clauses. 'And' connects 'tea' and 'coffee'."
    },
    {
        question: "Choose the correct sentence:",
        options: ["He dont like pizza.", "He doesn't like pizza.", "He don't likes pizza.", "He doesn't likes pizza."],
        answerIndex: 1,
        explanation: "Use 'doesn't' (does not) with third person singular subjects in the negative present tense."
    },
    {
        question: "What is the past participle of 'see'?",
        options: ["saw", "seeing", "seen", "sees"],
        answerIndex: 2,
        explanation: "'Seen' is the irregular past participle of 'see', used in perfect tenses."
    },
    {
        question: "Choose the correct preposition: 'She is good ______ drawing.'",
        options: ["at", "in", "on", "with"],
        answerIndex: 0,
        explanation: "Use 'at' to indicate proficiency in an activity."
    },
    {
        question: "Complete the sentence: 'They ______ visit us next week.'",
        options: ["will", "shall", "are going", "will going"],
        answerIndex: 0,
        explanation: "Use 'will' for simple future actions."
    },
     {
        question: "Identify the direct object: 'She ate an apple.'",
        options: ["She", "ate", "an", "apple"],
        answerIndex: 3,
        explanation: "The direct object receives the action of the verb. What did she eat? An apple."
    },
    {
        question: "Choose the correct form: 'He is the ______ student in the class.'",
        options: ["smart", "smarter", "smartest", "more smart"],
        answerIndex: 2,
        explanation: "Use the superlative form 'smartest' when comparing three or more things."
    },
    {
        question: "Complete the sentence: 'I was born ______ 1990.'",
        options: ["on", "at", "in", "of"],
        answerIndex: 2,
        explanation: "Use 'in' for years and months."
    },
    {
        question: "Choose the correct sentence:",
        options: ["My parents lives in London.", "My parents live in London.", "My parents is living in London.", "My parents are lives in London."],
        answerIndex: 1,
        explanation: "The subject 'My parents' is plural, so the verb should be 'live'."
    },
    {
        question: "What is the past tense of 'have'?",
        options: ["haved", "had", "has", "having"],
        answerIndex: 1,
        explanation: "'Had' is the past tense of 'have'."
    },
     {
        question: "Choose the correct question word: '______ is your name?'",
        options: ["What", "Who", "Where", "Why"],
        answerIndex: 0,
        explanation: "Use 'What' to ask for information about something."
    },
    {
        question: "Complete the sentence: 'She is taller ______ her brother.'",
        options: ["then", "than", "that", "from"],
        answerIndex: 1,
        explanation: "Use 'than' for comparisons."
    },
    {
        question: "Which is a proper noun:",
        options: ["city", "country", "London", "river"],
        answerIndex: 2,
        explanation: "Proper nouns are specific names and are capitalized. London is a specific city."
    },
    {
        question: "Choose the correct sentence:",
        options: ["The cat is sleeping on the sofa.", "The cat are sleeping on the sofa.", "The cat am sleeping on the sofa."],
        answerIndex: 0,
        explanation: "The subject 'The cat' is singular, so use 'is'."
    },
    {
        question: "What is the past participle of 'go'?",
        options: ["went", "gone", "going", "goes"],
        answerIndex: 1,
        explanation: "'Gone' is the irregular past participle of 'go'."
    },
     {
        question: "Complete the sentence: 'I woke up ______ 7 o'clock.'",
        options: ["on", "in", "at", "by"],
        answerIndex: 2,
        explanation: "Use 'at' for specific times."
    },
    {
        question: "Choose the correct form: 'He drove ______.'",
        options: ["careful", "carefully", "more careful", "most careful"],
        answerIndex: 1,
        explanation: "Adverbs modify verbs. 'Carefully' modifies the verb 'drove'."
    },
    {
        question: "Which is a collective noun:",
        options: ["student", "book", "team", "house"],
        answerIndex: 2,
        explanation: "Collective nouns refer to a group of people or things (e.g., team, family, class)."
    },
    {
        question: "Choose the correct sentence:",
        options: ["There is five apples on the table.", "There are five apples on the table.", "There am five apples on the table."],
        answerIndex: 1,
        explanation: "When using 'there is' or 'there are', the verb agrees with the noun that follows it ('apples' is plural)."
    },
    {
        question: "What is the contraction for 'we will'?",
        options: ["we'll", "we'l", "we will'", "wel'l"],
        answerIndex: 0,
        explanation: "'We'll' is the contraction for 'we will'."
    },
     {
        question: "Identify the prepositional phrase: 'The bird flew over the house.'",
        options: ["The bird flew", "over the house", "flew over", "the house"],
        answerIndex: 1,
        explanation: "A prepositional phrase starts with a preposition ('over') and ends with a noun or pronoun ('house')."
    },
    {
        question: "Choose the correct sentence:",
        options: ["She studies hard, but she finds it difficult.", "She studies hard but, she finds it difficult.", "She studies hard, but, she finds it difficult."],
        answerIndex: 0,
        explanation: "Use a comma before a coordinating conjunction (like 'but') that connects two independent clauses."
    },
    {
        question: "What is the past tense of 'make'?",
        options: ["maked", "made", "makeed", "making"],
        answerIndex: 1,
        explanation: "'Made' is the irregular past tense of 'make'."
    },
    {
        question: "Complete the sentence: 'I like ______ on Sundays.'",
        options: ["to sleep late", "sleeping late", "sleep late", "slept late"],
        answerIndex: 0, // Both 'to sleep late' and 'sleeping late' are often acceptable after 'like'. Choosing infinitive as one common form.
        explanation: "Verbs like 'like' can be followed by either a gerund (-ing form) or an infinitive (to + verb)."
    },
    {
        question: "Choose the correct sentence:",
        options: ["He have a car.", "He has a car.", "He having a car."],
        answerIndex: 1,
        explanation: "Use 'has' with the third person singular subject 'He' in the simple present."
    },
    {
        question: "Which word is an interjection:",
        options: ["run", "quickly", "wow", "under"],
        answerIndex: 2,
        explanation: "Interjections express strong emotion. 'Wow' is an interjection."
    },
    {
        question: "Complete the sentence: 'They waited ______ the bus stop.'",
        options: ["on", "in", "at", "for"],
        answerIndex: 2,
        explanation: "Use 'at' for specific locations like bus stops."
    },
     {
        question: "Choose the correct possessive pronoun: 'Is this book ______?' (belonging to you)",
        options: ["your", "yours", "you", "yous"],
        answerIndex: 1,
        explanation: "'Yours' is a possessive pronoun used without a following noun."
    },
    {
        question: "Identify the indefinite article:",
        options: ["the", "a", "an", "both a and an"],
        answerIndex: 3,
        explanation: "Indefinite articles are 'a' and 'an', used for non-specific nouns."
    },
    {
        question: "Choose the correct sentence:",
        options: ["Every student have a book.", "Every student has a book.", "Every students have a book."],
        answerIndex: 1,
        explanation: "Words like 'Every', 'Each', 'Either', 'Neither' take a singular verb ('has')."
    },
     {
        question: "What is the base form of 'running'?",
        options: ["ran", "run", "runs", "running"],
        answerIndex: 1,
        explanation: "The base form is 'run'."
    },
    {
        question: "Complete the sentence: 'I'm tired ______ I didn't sleep well.'",
        options: ["so", "because", "but", "and"],
        answerIndex: 1,
        explanation: "'Because' introduces the reason for being tired."
    },
    {
        question: "Choose the correct punctuation: 'What time is it'",
        options: ["What time is it.", "What time is it?", "What time is it!", "What time is it,"],
        answerIndex: 1,
        explanation: "This is a question, so use a question mark."
    },
    {
        question: "Identify the coordinating conjunction:",
        options: ["because", "although", "while", "or"],
        answerIndex: 3,
        explanation: "Coordinating conjunctions connect elements of equal grammatical rank (For, And, Nor, But, Or, Yet, So - FANBOYS)."
    },
    {
        question: "Complete the sentence: 'She waited ______ him for an hour.'",
        options: ["at", "on", "for", "of"],
        answerIndex: 2,
        explanation: "We wait 'for' a person or thing."
    },
     {
        question: "What is the past tense of 'give'?",
        options: ["gived", "gave", "given", "giving"],
        answerIndex: 1,
        explanation: "'Gave' is the irregular past tense of 'give'."
    },
    {
        question: "Choose the correct plural of 'man'.",
        options: ["mans", "men", "manes", "man's"],
        answerIndex: 1,
        explanation: "'Men' is an irregular plural noun."
    },
    {
        question: "Identify the subject in 'The big dog barked loudly.'",
        options: ["The big dog", "dog", "barked", "loudly"],
        answerIndex: 0,
        explanation: "The subject is who or what the sentence is about. Here, it's 'The big dog'."
    },
    {
        question: "Choose the correct sentence:",
        options: ["He is more happy than she.", "He is happier than she.", "He is happiest than she."],
        answerIndex: 1,
        explanation: "Use the comparative form 'happier' for adjectives ending in -y."
    },
    {
        question: "Complete the sentence: 'I need ______ water.'",
        options: ["some", "any", "a", "an"],
        answerIndex: 0,
        explanation: "Use 'some' with uncountable nouns in positive sentences."
    },
     {
        question: "Which word is a verb in the base form:",
        options: ["running", "ate", "go", "reads"],
        answerIndex: 2,
        explanation: "The base form of the verb is the infinitive without 'to'."
    },
    {
        question: "Choose the correct sentence:",
        options: ["She speak english good.", "She speaks english good.", "She speak english well.", "She speaks english well."],
        answerIndex: 3,
        explanation: "Use 'speaks' for third person singular. Use the adverb 'well' to describe the verb 'speaks'."
    },
    {
        question: "What is the past participle of 'write'?",
        options: ["wrote", "writing", "written", "writes"],
        answerIndex: 2,
        explanation: "'Written' is the irregular past participle of 'write'."
    },
    {
        question: "Identify the demonstrative pronoun:",
        options: ["I", "she", "this", "quickly"],
        answerIndex: 2,
        explanation: "Demonstrative pronouns point to specific things (this, that, these, those)."
    },
    {
        question: "Complete the sentence: 'We are going ______ holiday next week.'",
        options: ["in", "at", "on", "for"],
        answerIndex: 2,
        explanation: "The common phrase is 'on holiday'."
    },
    {
        question: "Choose the correct plural of 'tooth'.",
        options: ["tooths", "teeth", "toothes", "tooth's"],
        answerIndex: 1,
        explanation: "'Teeth' is an irregular plural noun."
    },
    {
        question: "Complete the sentence: 'He ______ be here tomorrow.'",
        options: ["cans", "can", "is can", "are can"],
        answerIndex: 1,
        explanation: "'Can' is a modal verb and does not change form for third person singular."
    },
    {
        question: "Identify the article in 'A big dog barked.'",
        options: ["A", "big", "dog", "barked"],
        answerIndex: 0,
        explanation: "'A' is an indefinite article."
    },
    {
        question: "Choose the correct sentence:",
        options: ["I like read books.", "I like reading books.", "I like to reading books."],
        answerIndex: 1, // Both 'reading' and 'to read' are common. Using gerund here.
        explanation: "Verbs like 'like' can be followed by a gerund (-ing form)."
    },
    {
        question: "What is the past tense of 'come'?",
        options: ["comed", "came", "comeed", "coming"],
        answerIndex: 1,
        explanation: "'Came' is the irregular past tense of 'come'."
    },
     {
        question: "Complete the sentence: 'The cat is ______ the chair.'",
        options: ["under", "on", "in", "all of the above could be correct depending on context"],
        answerIndex: 3,
        explanation: "Prepositions can indicate various spatial relationships (under, on, in the box, etc.)."
    },
    {
        question: "Choose the correct form: 'She is the ______ singer in the group.'",
        options: ["good", "better", "best", "more good"],
        answerIndex: 2,
        explanation: "Use the superlative form 'best' for irregular adjectives like 'good'."
    },
    {
        question: "Identify the adjective in 'She has beautiful eyes.'",
        options: ["She", "has", "beautiful", "eyes"],
        answerIndex: 2,
        explanation: "'Beautiful' describes the noun 'eyes'."
    },
    {
        question: "Choose the correct sentence:",
        options: ["We seed a movie last night.", "We saw a movie last night.", "We seen a movie last night."],
        answerIndex: 1,
        explanation: "Use the simple past tense 'saw'."
    },
    {
        question: "What is the base form of 'making'?",
        options: ["made", "make", "makes", "making"],
        answerIndex: 1,
        explanation: "The base form is 'make'."
    },
     {
        question: "Complete the sentence: 'He speaks very ______.'",
        options: ["loud", "louder", "loudly", "most loudly"],
        answerIndex: 2,
        explanation: "Use the adverb 'loudly' to modify the verb 'speaks'."
    },
    {
        question: "Choose the correct plural of 'foot'.",
        options: ["foots", "feet", "footes", "foot's"],
        answerIndex: 1,
        explanation: "'Feet' is an irregular plural noun."
    },
    {
        question: "Identify the linking verb: 'She is happy.'",
        options: ["She", "is", "happy", "none"],
        answerIndex: 1,
        explanation: "Linking verbs (forms of 'be', seem, appear, etc.) connect the subject to a description or state."
    },
    {
        question: "Choose the correct sentence:",
        options: ["I dont have any money.", "I doesn't have any money.", "I don't have any money."],
        answerIndex: 2,
        explanation: "Use 'don't' (do not) with the pronoun 'I'."
    },
    {
        question: "What is the contraction for 'they are'?",
        options: ["they're", "their", "there", "theyr'e"],
        answerIndex: 0,
        explanation: "'They're' is the contraction for 'they are'."
    },
    {
        question: "Complete the sentence: 'The dog is sitting ______ the car.'",
        options: ["in", "on", "under", "all of the above could be correct depending on context"],
        answerIndex: 3,
        explanation: "Prepositions can indicate various spatial relationships."
    },
    {
        question: "Choose the correct form: 'This is the ______ book I've ever read.'",
        options: ["interesting", "more interesting", "most interesting", "interestingest"],
        answerIndex: 2,
        explanation: "Use the superlative form 'most interesting' for longer adjectives."
    },
     {
        question: "Identify the indirect object: 'He gave her a flower.'",
        options: ["He", "gave", "her", "a flower"],
        answerIndex: 2,
        explanation: "The indirect object is the person or thing to whom or for whom the action is done. To whom did he give it? Her."
    },
    {
        question: "Choose the correct sentence:",
        options: ["Neither he nor she is coming.", "Neither he nor she are coming.", "Neither him nor her is coming."],
        answerIndex: 0,
        explanation: "With 'neither...nor', the verb agrees with the subject closer to it ('she' is singular)."
    },
    {
        question: "What is the past tense of 'say'?",
        options: ["sayed", "said", "sayd", "saying"],
        answerIndex: 1,
        explanation: "'Said' is the irregular past tense of 'say'."
    },
    {
        question: "Identify the coordinating conjunction:",
        options: ["although", "if", "so", "since"],
        answerIndex: 2,
        explanation: "So is a FANBOYS conjunction."
    },
    {
        question: "Complete the sentence: 'I am going ______.'",
        options: ["home", "to home", "at home", "in home"],
        answerIndex: 0,
        explanation: "We typically say 'go home' without a preposition."
    },
     {
        question: "Choose the correct plural of 'woman'.",
        options: ["womans", "women", "womanes", "woman's"],
        answerIndex: 1,
        explanation: "'Women' is an irregular plural noun."
    },
    {
        question: "Identify the auxiliary verb: 'She is singing.'",
        options: ["She", "is", "singing", "none"],
        answerIndex: 1,
        explanation: "Auxiliary verbs (helping verbs) combine with a main verb to form a verb phrase. 'Is' helps 'singing'."
    },
    {
        question: "Choose the correct sentence:",
        options: ["The dog chases its tail.", "The dog chases it's tail.", "The dog chase its tail."],
        answerIndex: 0,
        explanation: "Use 'chases' for third person singular. 'Its' is the possessive form (belonging to it)."
    },
    {
        question: "What is the past participle of 'take'?",
        options: ["took", "taking", "taken", "takes"],
        answerIndex: 2,
        explanation: "'Taken' is the irregular past participle of 'take'."
    },
    {
        question: "Complete the sentence: 'He is afraid ______ spiders.'",
        options: ["of", "from", "with", "by"],
        answerIndex: 0,
        explanation: "The correct preposition is 'afraid of'."
    },
     {
        question: "Choose the correct form: 'He arrived ______ than expected.'",
        options: ["late", "later", "latest", "more late"],
        answerIndex: 1,
        explanation: "Use the comparative form 'later'."
    },
    {
        question: "Identify the count noun:",
        options: ["water", "information", "chair", "advice"],
        answerIndex: 2,
        explanation: "Count nouns can be counted and have plural forms ('chair', 'chairs')."
    },
    {
        question: "Choose the correct sentence:",
        options: ["My family is happy.", "My family are happy."],
        answerIndex: 0, // In AmE, collective nouns are often singular
        explanation: "In American English, collective nouns like 'family' are often treated as singular."
    },
    {
        question: "What is the contraction for 'you have'?",
        options: ["you've", "yove", "you have'", "you'hve"],
        answerIndex: 0,
        explanation: "'You've' is the contraction for 'you have'."
    },
    {
        question: "Complete the sentence: 'She works ______ a bank.'",
        options: ["at", "in", "on", "for"],
        answerIndex: 1, // Or 'at' depending on the context (building vs. company) - 'in' is common for 'in the building'.
        explanation: "Use 'in' when referring to working inside a building."
    },
     {
        question: "Choose the correct plural of 'knife'.",
        options: ["knifes", "knives", "knifes'", "knifees"],
        answerIndex: 1,
        explanation: "Nouns ending in -fe or -f often change to -ves in the plural."
    },
    {
        question: "Identify the relative pronoun:",
        options: ["who", "what", "why", "how"],
        answerIndex: 0,
        explanation: "Relative pronouns introduce relative clauses (who, whom, whose, which, that)."
    },
    {
        question: "Choose the correct sentence:",
        options: ["He gone home.", "He went home.", "He goes home last night."],
        answerIndex: 1,
        explanation: "Use the simple past tense 'went' for a completed action in the past."
    },
    {
        question: "What is the past tense of 'sleep'?",
        options: ["sleeped", "slept", "sleepd", "sleeping"],
        answerIndex: 1,
        explanation: "'Slept' is the irregular past tense of 'sleep'."
    },
    {
        question: "Complete the sentence: 'I'm looking forward ______ your visit.'",
        options: ["to", "for", "at", "on"],
        answerIndex: 0,
        explanation: "'Look forward to' is a phrasal verb followed by a noun or gerund."
    },
     {
        question: "Choose the correct form: 'He talks ______ than his sister.'",
        options: ["quick", "quicker", "more quickly", "quickest"],
        answerIndex: 2,
        explanation: "Use the comparative adverb 'more quickly' to modify the verb 'talks'."
    },
    {
        question: "Identify the uncountable noun:",
        options: ["book", "pen", "sugar", "car"],
        answerIndex: 2,
        explanation: "Uncountable nouns cannot be counted and do not typically have plural forms ('sugar', 'water', 'information')."
    },
    {
        question: "Choose the correct sentence:",
        options: ["Each of the students has finished.", "Each of the students have finished.", "Each of the student has finished."],
        answerIndex: 0,
        explanation: "Use 'has' with 'Each of the students' as 'Each' is singular."
    },
    {
        question: "What is the contraction for 'she would'?",
        options: ["she'd", "she wod", "she would'", "she'uld"],
        answerIndex: 0,
        explanation: "'She'd' can be the contraction for 'she would' or 'she had'."
    },
    {
        question: "Complete the sentence: 'She arrived ______ the morning.'",
        options: ["at", "on", "in", "for"],
        answerIndex: 2,
        explanation: "Use 'in' for periods of the day (morning, afternoon, evening)."
    },
     {
        question: "Choose the correct plural of 'story'.",
        options: ["storys", "stories", "storyes", "story's"],
        answerIndex: 1,
        explanation: "Nouns ending in a consonant + y change y to ies in the plural."
    },
    {
        question: "Identify the possessive adjective:",
        options: ["mine", "yours", "his", "them"],
        answerIndex: 2,
        explanation: "Possessive adjectives are used before nouns (my, your, his, her, its, our, their)."
    },
    {
        question: "Choose the correct sentence:",
        options: ["I haven't never been there.", "I haven't ever been there.", "I have never been there.", "Both B and C"],
        answerIndex: 3,
        explanation: "Avoid double negatives. 'Haven't ever' or 'have never' are correct."
    },
    {
        question: "What is the past tense of 'know'?",
        options: ["knowed", "knew", "known", "knowing"],
        answerIndex: 1,
        explanation: "'Knew' is the irregular past tense of 'know'."
    },
    {
        question: "Complete the sentence: 'He is married ______ Sarah.'",
        options: ["with", "to", "by", "for"],
        answerIndex: 1,
        explanation: "The correct preposition is 'married to'."
    },
     {
        question: "Choose the correct form: 'He feels ______ today.'",
        options: ["bad", "badly", "worse", "worst"],
        answerIndex: 0,
        explanation: "Use the adjective 'bad' after linking verbs like 'feels' when describing a state."
    },
    {
        question: "Identify the adverb of frequency:",
        options: ["quickly", "often", "under", "happy"],
        answerIndex: 1,
        explanation: "Adverbs of frequency indicate how often something happens (always, often, sometimes, never)."
    },
    {
        question: "Choose the correct sentence:",
        options: ["This is the best book I ever read.", "This is the best book I have ever read.", "This is the best book I had ever read."],
        answerIndex: 1,
        explanation: "Use the present perfect tense ('have ever read') when talking about experiences up to the present."
    },
    {
        question: "What is the past participle of 'eat'?",
        options: ["ate", "eating", "eaten", "eated"],
        answerIndex: 2,
        explanation: "'Eaten' is the irregular past participle of 'eat'."
    },
    {
        question: "Complete the sentence: 'She lives ______ 5 Main Street.'",
        options: ["in", "on", "at", "by"],
        answerIndex: 2,
        explanation: "Use 'at' for specific addresses."
    },
    {
        question: "Choose the correct plural of 'city'.",
        options: ["citys", "cities", "cityes", "city's"],
        answerIndex: 1,
        explanation: "Nouns ending in a consonant + y change y to ies in the plural."
    },
     {
        question: "Identify the definite article:",
        options: ["a", "an", "the", "none"],
        answerIndex: 2,
        explanation: "The definite article is 'the', used for specific nouns."
    },
    {
        question: "Choose the correct sentence:",
        options: ["He is taller then I am.", "He is taller than I am.", "He is taller than me."],
        answerIndex: 1, // 'than I am' is technically more correct when followed by a pronoun, but 'than me' is common informally. 'than I am' uses the nominative case consistent with the comparison.
        explanation: "When comparing pronouns, use the nominative case ('I', 'she', 'he') followed by the verb 'am', 'is', or 'are'."
    },
    {
        question: "What is the base form of 'doing'?",
        options: ["did", "do", "does", "done"],
        answerIndex: 1,
        explanation: "The base form is 'do'."
    },
    {
        question: "Complete the sentence: 'He's interested ______ learning Spanish.'",
        options: ["at", "in", "on", "for"],
        answerIndex: 1,
        explanation: "The correct preposition is 'interested in'."
    },
    {
        question: "Choose the correct possessive pronoun: 'The blue car is ______.' (belonging to us)",
        options: ["our", "ours", "we", "us"],
        answerIndex: 1,
        explanation: "'Ours' is a possessive pronoun used without a following noun."
    },
     {
        question: "Identify the adverb of place:",
        options: ["quickly", "yesterday", "here", "happy"],
        answerIndex: 2,
        explanation: "Adverbs of place indicate where an action happens (here, there, outside, upstairs)."
    },
    {
        question: "Choose the correct sentence:",
        options: ["She is more faster than me.", "She is faster than me.", "She is more fast than me."],
        answerIndex: 1,
        explanation: "Faster is the comparative form of fast. Do not use 'more' with '-er' adjectives."
    },
    {
        question: "What is the past tense of 'teach'?",
        options: ["teached", "taught", "teaching", "teaches"],
        answerIndex: 1,
        explanation: "'Taught' is the irregular past tense of 'teach'."
    },
    {
        question: "Complete the sentence: 'They arrived ______ the party late.'",
        options: ["at", "in", "on", "to"],
        answerIndex: 0,
        explanation: "Use 'at' for arriving at an event or specific place."
    },
    {
        question: "Choose the correct plural of 'leaf'.",
        options: ["leafs", "leaves", "leafes", "leaf's"],
        answerIndex: 1,
        explanation: "Nouns ending in -f often change to -ves in the plural."
    },
     {
        question: "Identify the preposition:",
        options: ["run", "quickly", "under", "happy"],
        answerIndex: 2,
        explanation: "Prepositions show the relationship between a noun/pronoun and other words (in, on, at, under, over, etc.)."
    },
    {
        question: "Choose the correct sentence:",
        options: ["Neither of the options is correct.", "Neither of the options are correct.", "Neither of the option is correct."],
        answerIndex: 0,
        explanation: "With 'neither of the...', the verb is singular ('is')."
    },
    {
        question: "What is the past participle of 'break'?",
        options: ["broke", "breaking", "broken", "breaks"],
        answerIndex: 2,
        explanation: "'Broken' is the irregular past participle of 'break'."
    },
    {
        question: "Complete the sentence: 'He is responsible ______ the project.'",
        options: ["of", "for", "with", "by"],
        answerIndex: 1,
        explanation: "The correct phrase is 'responsible for'."
    },
    {
        question: "Choose the correct possessive pronoun: 'The idea was ______.' (belonging to them)",
        options: ["their", "theirs", "they", "them"],
        answerIndex: 1,
        explanation: "'Theirs' is a possessive pronoun used without a following noun."
    },
     {
        question: "Identify the adverb of time:",
        options: ["quickly", "tomorrow", "under", "happy"],
        answerIndex: 1,
        explanation: "Adverbs of time indicate when an action happens (today, tomorrow, yesterday, now)."
    },
    {
        question: "Choose the correct sentence:",
        options: ["I should of gone.", "I should have gone.", "I should has gone."],
        answerIndex: 1,
        explanation: "Use 'should have' followed by the past participle."
    },
    {
        question: "What is the base form of 'speaking'?",
        options: ["spoke", "speak", "speaks", "spoken"],
        answerIndex: 1,
        explanation: "The base form is 'speak'."
    },
    {
        question: "Complete the sentence: 'She is good ______ computers.'",
        options: ["with", "in", "at", "on"],
        answerIndex: 2,
        explanation: "Use 'at' to indicate proficiency."
    },
    {
        question: "Choose the correct plural of 'mouse'.",
        options: ["mouses", "mice", "mousees", "mices"],
        answerIndex: 1,
        explanation: "'Mice' is an irregular plural noun."
    },
     {
        question: "Identify the article:",
        options: ["big", "red", "a", "jump"],
        answerIndex: 2,
        explanation: "Articles are 'a', 'an', and 'the'."
    },
    {
        question: "Choose the correct sentence:",
        options: ["He swims good.", "He swims well.", "He swims goodly."],
        answerIndex: 1,
        explanation: "Use the adverb 'well' to modify the verb 'swims'."
    },
    {
        question: "What is the past tense of 'begin'?",
        options: ["beginned", "began", "begun", "beginning"],
        answerIndex: 1,
        explanation: "'Began' is the irregular past tense of 'begin'."
    },
    {
        question: "Complete the sentence: 'I'm excited ______ the trip.'",
        options: ["of", "for", "about", "with"],
        answerIndex: 2,
        explanation: "The correct preposition is 'excited about'."
    },
    {
        question: "Choose the correct possessive adjective: 'This is ______ car.' (belonging to him)",
        options: ["he", "him", "his", "he's"],
        answerIndex: 2,
        explanation: "'His' is a possessive adjective used before a noun."
    },
    {
        question: "Identify the adverb of manner:",
        options: ["often", "tomorrow", "here", "quickly"],
        answerIndex: 3,
        explanation: "Adverbs of manner describe how an action is done (quickly, slowly, carefully)."
    },
    {
        question: "Choose the correct sentence:",
        options: ["He is more stronger than me.", "He is stronger than me.", "He is stronger then me."],
        answerIndex: 1,
        explanation: "Use the comparative form 'stronger'. Do not use 'more' with '-er' adjectives. Use 'than' for comparison."
    },
     {
        question: "What is the base form of 'taken'?",
        options: ["took", "take", "takes", "taking"],
        answerIndex: 1,
        explanation: "The base form is 'take'."
    },
    {
        question: "Complete the sentence: 'We arrived ______ London.'",
        options: ["at", "in", "on", "to"],
        answerIndex: 1,
        explanation: "Use 'in' for arriving in a city or country."
    },
    {
        question: "Choose the correct plural of 'child'.",
        options: ["childs", "children", "childes", "child's"],
        answerIndex: 1,
        explanation: "'Children' is an irregular plural noun."
    },
    {
        question: "Identify the noun:",
        options: ["happy", "run", "quickly", "book"],
        answerIndex: 3,
        explanation: "A noun is a person, place, thing, or idea. 'Book' is a thing."
    },
    {
        question: "Choose the correct sentence:",
        options: ["She should cleans her room.", "She should cleaned her room.", "She should clean her room."],
        answerIndex: 2,
        explanation: "Modal verbs (should, can, will, may, must, etc.) are followed by the base form of the verb."
    },
     {
        question: "What is the past tense of 'come'?",
        options: ["comed", "came", "comeed", "coming"],
        answerIndex: 1,
        explanation: "'Came' is the irregular past tense of 'come'."
    },
    {
        question: "Complete the sentence: 'He graduated ______ university last year.'",
        options: ["from", "of", "at", "with"],
        answerIndex: 0,
        explanation: "The correct preposition is 'graduated from'."
    },
    {
        question: "Choose the correct form: 'This is the ______ day of my life.'",
        options: ["happy", "happier", "happiest", "more happy"],
        answerIndex: 2,
        explanation: "Use the superlative form 'happiest' for adjectives ending in -y."
    },
    {
        question: "Identify the conjunction:",
        options: ["run", "happy", "and", "under"],
        answerIndex: 2,
        explanation: "Conjunctions connect words, phrases, or clauses."
    },
     {
        question: "Choose the correct sentence:",
        options: ["I have saw him.", "I have seen him.", "I has seen him."],
        answerIndex: 1,
        explanation: "Use 'have' with 'I' and the past participle 'seen' for the present perfect tense."
    },
    {
        question: "What is the past participle of 'go'?",
        options: ["went", "gone", "going", "goes"],
        answerIndex: 1,
        explanation: "'Gone' is the irregular past participle of 'go'."
    },
    {
        question: "Complete the sentence: 'He is good ______ chess.'",
        options: ["with", "in", "at", "on"],
        answerIndex: 2,
        explanation: "Use 'at' to indicate proficiency."
    },
    {
        question: "Choose the correct plural of 'person'.",
        options: ["persons", "people", "persones", "person's"],
        answerIndex: 1,
        explanation: "'People' is the irregular plural of 'person'."
    },
    {
        question: "Identify the adverb:",
        options: ["beautiful", "quickly", "beauty", "beautify"],
        answerIndex: 1,
        explanation: "Adverbs often end in -ly and modify verbs, adjectives, or other adverbs."
    },
     {
        question: "Choose the correct sentence:",
        options: ["Give me some advices.", "Give me some advice.", "Give me an advice."],
        answerIndex: 1,
        explanation: "'Advice' is an uncountable noun and does not have a plural form. Use 'some' with uncountable nouns."
    },
    {
        question: "What is the past tense of 'make'?",
        options: ["maked", "made", "makeed", "making"],
        answerIndex: 1,
        explanation: "'Made' is the irregular past tense of 'make'."
    },
    {
        question: "Complete the sentence: 'She is different ______ her sister.'",
        options: ["from", "than", "with", "to"],
        answerIndex: 0,
        explanation: "The correct preposition is 'different from'."
    },
    {
        question: "Choose the correct form: 'He ran ______ than I did.'",
        options: ["quick", "quicker", "more quickly", "quickest"],
        answerIndex: 2,
        explanation: "Use the comparative adverb 'more quickly' to modify the verb 'ran'."
    },
     {
        question: "Identify the demonstrative adjective:",
        options: ["this", "that", "these", "all of the above"],
        answerIndex: 3,
        explanation: "Demonstrative adjectives ('this', 'that', 'these', 'those') are used before nouns to point to them."
    },
     {
        question: "Choose the correct sentence:",
        options: ["He walks slow.", "He walks slowly.", "He walks more slow."],
        answerIndex: 1,
        explanation: "Use the adverb 'slowly' to modify the verb 'walks'."
    },
    {
        question: "What is the past tense of 'write'?",
        options: ["wrote", "writing", "written", "writes"],
        answerIndex: 0,
        explanation: "'Wrote' is the irregular past tense of 'write'."
    },
    {
        question: "Complete the sentence: 'I arrived ______ time for the meeting.'",
        options: ["at", "in", "on", "for"],
        answerIndex: 2,
        explanation: "Use 'on time' to mean at the scheduled time."
    },
    {
        question: "Choose the correct plural of 'sheep'.",
        options: ["sheeps", "sheep", "sheepes", "sheep's"],
        answerIndex: 1,
        explanation: "'Sheep' is an irregular plural noun that stays the same in the plural form."
    },
    {
        question: "Identify the imperative sentence:",
        options: ["The sun is hot.", "Is it raining?", "Please close the door.", "What a beautiful day!"],
        answerIndex: 2,
        explanation: "Imperative sentences give commands or make requests."
    },
     {
        question: "Choose the correct sentence:",
        options: ["There is a lot of information.", "There are a lot of informations.", "There is a lot of informations."],
        answerIndex: 0,
        explanation: "'Information' is uncountable. Use 'is' with uncountable nouns. 'Informations' is incorrect."
    },
    {
        question: "What is the base form of 'ran'?",
        options: ["ran", "run", "runs", "running"],
        answerIndex: 1,
        explanation: "The base form is 'run'."
    },
    {
        question: "Complete the sentence: 'He is interested ______ history.'",
        options: ["of", "for", "in", "about"],
        answerIndex: 2,
        explanation: "The correct preposition is 'interested in'."
    },
    {
        question: "Choose the correct form: 'This is the ______ mistake I've ever made.'",
        options: ["bad", "worse", "worst", "more bad"],
        answerIndex: 2,
        explanation: "Use the superlative form 'worst' for irregular adjectives like 'bad'."
    },
    {
        question: "Identify the possessive pronoun:",
        options: ["my", "your", "her", "hers"],
        answerIndex: 3,
        explanation: "Possessive pronouns ('mine', 'yours', 'his', 'hers', 'its', 'ours', 'theirs') are used without a following noun."
    },
     {
        question: "Choose the correct sentence:",
        options: ["The news is good.", "The news are good.", "The new is good."],
        answerIndex: 0,
        explanation: "'News' is treated as an uncountable noun and takes a singular verb ('is')."
    },
    {
        question: "What is the past participle of 'do'?",
        options: ["did", "do", "does", "done"],
        answerIndex: 3,
        explanation: "'Done' is the past participle of 'do'."
    },
    {
        question: "Complete the sentence: 'She is good ______ telling jokes.'",
        options: ["at", "in", "on", "for"],
        answerIndex: 0,
        explanation: "Use 'at' to indicate proficiency in an activity (telling jokes)."
    },
    {
        question: "Choose the correct plural of 'fish'.",
        options: ["fishs", "fishes", "fish", "fish's"],
        answerIndex: 2,
        explanation: "'Fish' is an irregular plural noun that can stay the same or become 'fishes' when referring to different species."
    },
    {
        question: "Identify the adverb:",
        options: ["happy", "sad", "angrily", "kind"],
        answerIndex: 2,
        explanation: "Adverbs often end in -ly and modify verbs, adjectives, or other adverbs."
    },
    {
        question: "Choose the correct sentence:",
        options: ["He walked quick to the door.", "He walked quickly to the door.", "He walked more quick to the door."],
        answerIndex: 1,
        explanation: "Use the adverb 'quickly' to modify the verb 'walked'."
    },
     {
        question: "What is the past tense of 'give'?",
        options: ["gived", "gave", "given", "giving"],
        answerIndex: 1,
        explanation: "'Gave' is the irregular past tense of 'give'."
    },
    {
        question: "Complete the sentence: 'I am going ______ the shop.'",
        options: ["at", "in", "to", "on"],
        answerIndex: 2,
        explanation: "Use 'to' when indicating movement towards a place."
    },
    {
        question: "Choose the correct form: 'This is ______ than that.'",
        options: ["easy", "easier", "easiest", "more easy"],
        answerIndex: 1,
        explanation: "Use the comparative form 'easier' for adjectives ending in -y."
    },
    {
        question: "Identify the article:",
        options: ["blue", "car", "the", "drive"],
        answerIndex: 2,
        explanation: "Articles are 'a', 'an', and 'the'."
    },
    {
        question: "Choose the correct sentence:",
        options: ["My hairs are brown.", "My hair is brown.", "My hair are brown."],
        answerIndex: 1,
        explanation: "'Hair' is usually treated as an uncountable noun and takes a singular verb ('is')."
    },
    {
        question: "What is the base form of 'ate'?",
        options: ["eat", "eats", "eating", "eaten"],
        answerIndex: 0,
        explanation: "The base form is 'eat'."
    },
    {
        question: "Complete the sentence: 'He is good ______ cooking.'",
        options: ["with", "in", "at", "on"],
        answerIndex: 2,
        explanation: "Use 'at' to indicate proficiency in an activity."
    },
     {
        question: "Choose the correct plural of 'mouse'.",
        options: ["mouses", "mice", "mousees", "mices"],
        answerIndex: 1,
        explanation: "'Mice' is an irregular plural noun."
    },
    {
        question: "Identify the verb:",
        options: ["beautiful", "run", "quickly", "happy"],
        answerIndex: 1,
        explanation: "A verb is an action word or a state of being. 'Run' is an action."
    },
    {
        question: "Choose the correct sentence:",
        options: ["There is many people here.", "There are many people here.", "There is much people here."],
        answerIndex: 1,
        explanation: "'People' is a plural noun. Use 'are' with plural nouns and 'many' with count nouns."
    },
    {
        question: "What is the past tense of 'see'?",
        options: ["seed", "saw", "seen", "seeing"],
        answerIndex: 1,
        explanation: "'Saw' is the irregular past tense of 'see'."
    },
    {
        question: "Complete the sentence: 'She is famous ______ her paintings.'",
        options: ["of", "for", "about", "with"],
        answerIndex: 1,
        explanation: "The correct preposition is 'famous for'."
    },
     {
        question: "Choose the correct form: 'He speaks English ______ than I do.'",
        options: ["fluent", "fluently", "more fluent", "more fluently"],
        answerIndex: 3,
        explanation: "Use the comparative adverb 'more fluently' to modify the verb 'speaks'."
    },
    {
        question: "Identify the collective noun:",
        options: ["tree", "forest", "leaf", "branch"],
        answerIndex: 1,
        explanation: "A 'forest' is a collection of trees."
    },
    {
        question: "Choose the correct sentence:",
        options: ["My baggage is heavy.", "My baggage are heavy.", "My baggages are heavy."],
        answerIndex: 0,
        explanation: "'Baggage' is an uncountable noun and takes a singular verb ('is'). 'Baggages' is incorrect."
    },
    {
        question: "What is the past participle of 'write'?",
        options: ["wrote", "writing", "written", "writes"],
        answerIndex: 2,
        explanation: "'Written' is the irregular past participle of 'write'."
    },
    {
        question: "Complete the sentence: 'I am leaving ______ Friday.'",
        options: ["at", "in", "on", "for"],
        answerIndex: 2,
        explanation: "Use 'on' for days of the week."
    },
     {
        question: "Choose the correct plural of 'foot'.",
        options: ["foots", "feet", "footes", "foot's"],
        answerIndex: 1,
        explanation: "'Feet' is an irregular plural noun."
    },
    {
        question: "Identify the article:",
        options: ["tall", "man", "an", "walk"],
        answerIndex: 2,
        explanation: "Articles are 'a', 'an', and 'the'."
    },
    {
        question: "Choose the correct sentence:",
        options: ["Each student received their award.", "Each student received his or her award.", "Each student received his award.", "All of the above are commonly used."],
        answerIndex: 3, // While 'his or her' is traditionally prescribed, 'their' is widely accepted in modern English for singular subjects.
        explanation: "While 'his or her' is traditionally used for singular subjects like 'Each student', 'their' is commonly accepted in modern English to avoid gender specificity."
    },
    {
        question: "What is the past tense of 'teach'?",
        options: ["teached", "taught", "teaching", "teaches"],
        answerIndex: 1,
        explanation: "'Taught' is the irregular past tense of 'teach'."
    },
    {
        question: "Complete the sentence: 'He is angry ______ me.'",
        options: ["with", "at", "on", "to"],
        answerIndex: 0, // Angry with someone / angry about something
        explanation: "Use 'angry with' when referring to being angry at a person."
    },
     {
        question: "Choose the correct form: 'She speaks ______ than I do.'",
        options: ["clear", "clearer", "more clearly", "clearest"],
        answerIndex: 2,
        explanation: "Use the comparative adverb 'more clearly' to modify the verb 'speaks'."
    },
    {
        question: "Identify the uncountable noun:",
        options: ["table", "chair", "furniture", "lamp"],
        answerIndex: 2,
        explanation: "'Furniture' is an uncountable noun, referring to a group of items."
    },
    {
        question: "Choose the correct sentence:",
        options: ["The information is correct.", "The informations are correct.", "The information are correct."],
        answerIndex: 0,
        explanation: "'Information' is uncountable and takes a singular verb."
    },
    {
        question: "What is the base form of 'bought'?",
        options: ["buy", "buys", "buying", "bought"],
        answerIndex: 0,
        explanation: "The base form is 'buy'."
    },
    {
        question: "Complete the sentence: 'I live ______ the third floor.'",
        options: ["at", "in", "on", "by"],
        answerIndex: 2,
        explanation: "Use 'on' for floors of a building."
    },
     {
        question: "Choose the correct plural of 'louse' (singular head louse).",
        options: ["louses", "lices", "lousees", "lice"],
        answerIndex: 3,
        explanation: "'Lice' is the irregular plural of 'louse'."
    },
    {
        question: "Identify the abstract noun:",
        options: ["table", "chair", "happiness", "book"],
        answerIndex: 2,
        explanation: "Abstract nouns refer to ideas, qualities, or states rather than concrete objects (happiness, freedom, love)."
    },
     {
        question: "Choose the correct sentence:",
        options: ["The police is investigating.", "The police are investigating.", "The police is investigating it."],
        answerIndex: 1,
        explanation: "'Police' is treated as a plural noun and takes a plural verb ('are')."
    },
    {
        question: "What is the past tense of 'find'?",
        options: ["finded", "found", "find", "finding"],
        answerIndex: 1,
        explanation: "'Found' is the irregular past tense of 'find'."
    },
    {
        question: "Complete the sentence: 'He apologised ______ being late.'",
        options: ["of", "for", "about", "with"],
        answerIndex: 1,
        explanation: "The correct phrase is 'apologised for'."
    }
];

const advanceGrammarList = [
    {
        question: "If she ______ harder, she would have passed the exam.",
        options: ["studied", "studies", "had studied", "would study"],
        answerIndex: 2,
        explanation: "This is a Type 3 conditional sentence (past unreal). The structure is If + past perfect, would have + past participle."
    },
    {
        question: "He denied ______ the money.",
        options: ["to steal", "stealing", "stole", "of stealing"],
        answerIndex: 1,
        explanation: "The verb 'deny' is typically followed by a gerund (-ing form)."
    },
    {
        question: "By the time we arrived, the show ______.",
        options: ["started", "had started", "has started", "was starting"],
        answerIndex: 1,
        explanation: "Use the past perfect ('had started') for an action completed before another action in the past ('arrived')."
    },
    {
        question: "Which sentence is in the passive voice?",
        options: ["The dog chased the ball.", "The ball was chased by the dog.", "The dog is chasing the ball.", "The ball is for the dog."],
        answerIndex: 1,
        explanation: "The passive voice structure is Object + be + past participle (+ by subject)."
    },
    {
        question: "She suggested ______ to the cinema.",
        options: ["to go", "going", "go", "of going"],
        answerIndex: 1,
        explanation: "The verb 'suggest' is typically followed by a gerund (-ing form)."
    },
    {
        question: "Hardly ______ the house when the phone rang.",
        options: ["I had left", "had I left", "I left", "did I left"],
        answerIndex: 1,
        explanation: "Use inversion (auxiliary verb + subject) after negative adverbs like 'hardly' at the beginning of a sentence."
    },
    {
        question: "He might ______ by now, but I'm not sure.",
        options: ["have arrived", "has arrived", "had arrived", "arrive"],
        answerIndex: 0,
        explanation: "Use 'might have' + past participle to express a possibility about a past action."
    },
    {
        question: "She told me that she ______ sick the day before.",
        options: ["is", "was", "had been", "has been"],
        answerIndex: 2,
        explanation: "When reporting speech about a past event that occurred before the reporting, use the past perfect (backshifting from past simple)."
    },
    {
        question: "______ carefully, he avoided the accident.",
        options: ["Driving", "Driven", "To drive", "Having driven"],
        answerIndex: 0, 
        explanation: "'Driving carefully' is a present participle phrase acting adverbially to describe how he avoided the accident."
    },
    {
        question: "It's high time you ______ your room.",
        options: ["clean", "cleaned", "will clean", "have cleaned"],
        answerIndex: 1,
        explanation: "After 'It's high time' or 'It's time', use the past tense to indicate that something should have been done already or should be done immediately."
    },
    {
        question: "Should you need anything, feel free to ask.",
        options: ["If you should need anything...", "If you needed anything...", "If you need anything...", "If you had needed anything..."],
        answerIndex: 0,
        explanation: "This is an inverted conditional structure for a less likely or formal conditional (Type 1 variation)."
    },
    {
        question: "He insisted ______ paying for the meal.",
        options: ["on", "at", "for", "about"],
        answerIndex: 0,
        explanation: "The correct preposition with 'insisted' is 'on'."
    },
    {
        question: "She wishes she ______ play the piano.",
        options: ["can", "could", "is able to", "can be able to"],
        answerIndex: 1,
        explanation: "Use the past tense ('could') after 'wish' to express a present desire that is not possible or is unlikely."
    },
    {
        question: "The house, ______ built in the 18th century, is now a museum.",
        options: ["which was", "which it was", "it was", "that it was"],
        answerIndex: 0,
        explanation: "Use 'which was' to introduce a non-defining relative clause describing the house."
    },
    {
        question: "He looks forward to ______ you again.",
        options: ["see", "seeing", "saw", "be seen"],
        answerIndex: 1,
        explanation: "'Look forward to' is followed by a gerund (-ing form) or a noun."
    },
    {
        question: "Not until I saw him ______ I recognize him.",
        options: ["did", "had", "have", "do"],
        answerIndex: 0,
        explanation: "Use inversion (auxiliary verb + subject + main verb) after 'Not until' at the beginning of a sentence."
    },
    {
        question: "He advised me ______ smoking.",
        options: ["to stop", "stopping", "stop", "of stopping"],
        answerIndex: 0,
        explanation: "The verb 'advise' is typically followed by the infinitive with 'to' when the object is a person."
    },
    {
        question: "By the end of next year, I ______ my degree.",
        options: ["will finish", "will have finished", "am finishing", "finish"],
        answerIndex: 1,
        explanation: "Use the future perfect ('will have finished') for an action that will be completed by a specific time in the future."
    },
    {
        question: "He said that he ______ the day before.",
        options: ["arrived", "had arrived", "has arrived", "was arriving"],
        answerIndex: 1,
        explanation: "Backshift the past simple ('arrived') to the past perfect ('had arrived') in reported speech when the original statement was in the past."
    },
    {
        question: "______ all his money, he decided to look for a job.",
        options: ["Spending", "Spent", "Having spent", "To spend"],
        answerIndex: 2,
        explanation: "'Having spent' is a perfect participle phrase, indicating an action completed before the main action ('decided')."
    },
    {
        question: "Were I you, I wouldn't do that.",
        options: ["If I was you...", "If I were you...", "If I am you...", "If I had been you..."],
        answerIndex: 1,
        explanation: "This is an inverted conditional structure using the subjunctive 'were' for a hypothetical situation."
    },
    {
        question: "She is accustomed ______ hard.",
        options: ["to work", "to working", "work", "working"],
        answerIndex: 1,
        explanation: "'Accustomed to' is followed by a gerund (-ing form) or a noun."
    },
    {
        question: "He must ______ the train; he's not here.",
        options: ["miss", "have missed", "had missed", "be missing"],
        answerIndex: 1,
        explanation: "Use 'must have' + past participle to express a strong deduction about a past event."
    },
    {
        question: "The problem is that he doesn't know ______.",
        options: ["what should he do", "what he should do", "what to do", "both B and C"],
        answerIndex: 3,
        explanation: "Both 'what he should do' (indirect question) and 'what to do' (infinitive phrase) are correct ways to complete the sentence."
    },
    {
        question: "Despite ______ the late hour, they decided to go out.",
        options: ["of", "the", "it being", "being"],
        answerIndex: 1,
        explanation: "'Despite' is followed by a noun phrase or a gerund phrase. 'The late hour' is a noun phrase."
    },
    {
        question: "Never before ______ such a beautiful sight.",
        options: ["I have seen", "have I seen", "I saw", "did I seen"],
        answerIndex: 1,
        explanation: "Use inversion (auxiliary verb + subject + main verb) after negative adverbs like 'never before' at the beginning of a sentence."
    },
    {
        question: "She congratulated me ______ passing my exam.",
        options: ["for", "on", "about", "with"],
        answerIndex: 1,
        explanation: "The correct preposition with 'congratulate' is 'on'."
    },
    {
        question: "If I ______ known you were coming, I would have baked a cake.",
        options: ["have", "had", "would have", "did"],
        answerIndex: 1,
        explanation: "This is a Type 3 conditional. The 'if' clause uses the past perfect ('had known')."
    },
    {
        question: "He apologised ______ causing so much trouble.",
        options: ["for", "of", "about", "with"],
        answerIndex: 0,
        explanation: "The correct preposition is 'apologised for'."
    },
    {
        question: "The report is expected ______ tomorrow.",
        options: ["to publish", "to be published", "publish", "be published"],
        answerIndex: 1,
        explanation: "Use the passive infinitive ('to be published') after 'expected' when the subject of 'expected' is the report itself (which is passive)."
    },
     {
        question: "Only after he left ______ I realize what had happened.",
        options: ["did", "had", "have", "do"],
        answerIndex: 0,
        explanation: "Use inversion (auxiliary verb + subject + main verb) after phrases like 'Only after' at the beginning of a sentence."
    },
    {
        question: "She is used ______ in a busy environment.",
        options: ["to work", "to working", "work", "working"],
        answerIndex: 1,
        explanation: "'Used to' followed by the base verb means a past habit. 'Be used to' or 'get used to' followed by a gerund/noun means accustomed to."
    },
    {
        question: "He could ______ the train if he had hurried.",
        options: ["catch", "have caught", "had caught", "caught"],
        answerIndex: 1,
        explanation: "In the result clause of a Type 3 conditional, use 'could have' + past participle."
    },
    {
        question: "She asked me ______ I was happy.",
        options: ["if", "whether", "that", "both A and B"],
        answerIndex: 3,
        explanation: "Both 'if' and 'whether' can be used to introduce reported yes/no questions."
    },
    {
        question: "______ being rich, he is not happy.",
        options: ["Despite", "Although", "In spite", "In spite of"],
        answerIndex: 3,
        explanation: "'In spite of' is followed by a noun phrase or a gerund phrase. 'Although' is followed by a clause."
    },
     {
        question: "Little ______ he know about the surprise party.",
        options: ["did", "had", "does", "will"],
        answerIndex: 0,
        explanation: "Use inversion (auxiliary verb + subject + main verb) after negative adverbs like 'little' at the beginning of a sentence."
    },
    {
        question: "He is capable ______ doing the job.",
        options: ["of", "for", "with", "in"],
        answerIndex: 0,
        explanation: "The correct preposition is 'capable of'."
    },
    {
        question: "I regret ______ harder in school.",
        options: ["not studying", "not to study", "don't study", "didn't study"],
        answerIndex: 0,
        explanation: "The verb 'regret' followed by a gerund (-ing form) refers to regretting a past action."
    },
    {
        question: "The decision ______ yesterday was controversial.",
        options: ["making", "made", "was made", "that made"],
        answerIndex: 1,
        explanation: "'Made' is a past participle used as an adjective (reduced relative clause of 'that was made')."
    },
    {
        question: "He insisted that she ______ the money.",
        options: ["pays", "pay", "paid", "to pay"],
        answerIndex: 1,
        explanation: "After verbs like 'insist', 'suggest', 'recommend', 'demand' followed by 'that' clause, use the subjunctive mood (base form of the verb)."
    },
     {
        question: "Nowhere ______ a more beautiful sunset.",
        options: ["else have I seen", "else I have seen", "I have seen else", "else I saw"],
        answerIndex: 0,
        explanation: "Use inversion (adverb + auxiliary + subject + main verb) after negative adverbs like 'Nowhere else' at the beginning of a sentence."
    },
    {
        question: "He looks ______ a good opportunity.",
        options: ["for", "at", "after", "forward to"],
        answerIndex: 0,
        explanation: "The phrasal verb 'look for' means to search."
    },
    {
        question: "She proposed ______ the meeting until next week.",
        options: ["to postpone", "postponing", "postpone", "of postponing"],
        answerIndex: 1,
        explanation: "The verb 'propose' (meaning suggest) is followed by a gerund (-ing form)."
    },
    {
        question: "He said he ______ me the next day.",
        options: ["will call", "would call", "calls", "called"],
        answerIndex: 1,
        explanation: "Backshift 'will call' to 'would call' in reported speech."
    },
    {
        question: "______ by the noise, he couldn't sleep.",
        options: ["Disturbing", "Disturbed", "To disturb", "Having disturbed"],
        answerIndex: 1,
        explanation: "'Disturbed' is a past participle used in a participle phrase (reduced relative clause of 'who was disturbed')."
    },
     {
        question: "Had he studied, he would have passed.",
        options: ["If he studied...", "If he had studied...", "If he would have studied...", "If he studies..."],
        answerIndex: 1,
        explanation: "This is an inverted Type 3 conditional structure ('Had' + subject + past participle)."
    },
    {
        question: "She is dedicated ______ her job.",
        options: ["for", "to", "in", "with"],
        answerIndex: 1,
        explanation: "The correct preposition is 'dedicated to'."
    },
    {
        question: "I can't help ______ when I see him.",
        options: ["to laugh", "laughing", "laugh", "of laughing"],
        answerIndex: 1,
        explanation: "The phrase 'can't help' is followed by a gerund (-ing form)."
    },
    {
        question: "The article ______ by the journalist was controversial.",
        options: ["writing", "written", "was written", "that writing"],
        answerIndex: 1,
        explanation: "'Written' is a past participle used as an adjective (reduced relative clause of 'that was written')."
    },
    {
        question: "It's time we ______.",
        options: ["go", "went", "will go", "have gone"],
        answerIndex: 1,
        explanation: "After 'It's time', use the past tense to indicate that something should be done now or very soon."
    },
     {
        question: "Under no circumstances ______ you open this box.",
        options: ["can", "you can", "could", "you could"],
        answerIndex: 0,
        explanation: "Use inversion (auxiliary verb + subject) after negative phrases like 'Under no circumstances' at the beginning of a sentence."
    },
    {
        question: "He is accustomed ______ up early.",
        options: ["to getting", "to get", "getting", "get"],
        answerIndex: 0,
        explanation: "'Accustomed to' is followed by a gerund (-ing form)."
    },
    {
        question: "She advised ______ a doctor.",
        options: ["to see", "seeing", "see", "of seeing"],
        answerIndex: 1,
        explanation: "When 'advise' has no object, it is followed by a gerund (-ing form)."
    },
    {
        question: "By the time he finishes, I ______.",
        options: ["will leave", "will have left", "am leaving", "leave"],
        answerIndex: 1,
        explanation: "Use the future perfect ('will have left') for an action that will be completed by a specific time/event in the future."
    },
    {
        question: "He claimed ______ the best student.",
        options: ["to be", "being", "is", "was"],
        answerIndex: 0,
        explanation: "The verb 'claim' is typically followed by the infinitive with 'to'."
    },
     {
        question: "Only then ______ the truth.",
        options: ["did he realize", "he did realize", "he realized", "had he realized"],
        answerIndex: 0,
        explanation: "Use inversion (auxiliary verb + subject + main verb) after phrases like 'Only then' at the beginning of a sentence."
    },
    {
        question: "She is committed ______ her promises.",
        options: ["for", "to", "in", "with"],
        answerIndex: 1,
        explanation: "The correct phrase is 'committed to'."
    },
    {
        question: "I don't mind ______ you.",
        options: ["to help", "helping", "help", "of helping"],
        answerIndex: 1,
        explanation: "The verb 'mind' is followed by a gerund (-ing form)."
    },
    {
        question: "The book ______ on the table is mine.",
        options: ["laying", "lying", "lied", "that laying"],
        answerIndex: 1,
        explanation: "Use the present participle 'lying' (meaning resting horizontally) in a reduced relative clause ('that is lying')."
    },
    {
        question: "It's about time he ______.",
        options: ["arrives", "arrived", "will arrive", "has arrived"],
        answerIndex: 1,
        explanation: "After 'It's about time', use the past tense."
    },
     {
        question: "Seldom ______ such enthusiasm.",
        options: ["do I see", "I do see", "I see", "have I seen"],
        answerIndex: 0,
        explanation: "Use inversion (auxiliary verb + subject + main verb) after negative adverbs like 'seldom' at the beginning of a sentence."
    },
    {
        question: "He apologised ______ interrupting.",
        options: ["for", "of", "about", "with"],
        answerIndex: 0,
        explanation: "The correct preposition is 'apologised for'."
    },
    {
        question: "She recommended ______ to the new restaurant.",
        options: ["to go", "going", "go", "of going"],
        answerIndex: 1,
        explanation: "The verb 'recommend' is followed by a gerund (-ing form)."
    },
    {
        question: "He told me he ______ feeling well.",
        options: ["isn't", "wasn't", "hasn't been", "hadn't been"],
        answerIndex: 1,
        explanation: "Backshift 'isn't feeling well' to 'wasn't feeling well' in reported speech."
    },
    {
        question: "______ the report, he felt relieved.",
        options: ["Finishing", "Finished", "Having finished", "To finish"],
        answerIndex: 2,
        explanation: "'Having finished' is a perfect participle phrase, indicating an action completed before the main action ('felt relieved')."
    },
     {
        question: "So successful ______ that he opened more branches.",
        options: ["his business was", "was his business", "his business had been", "had his business been"],
        answerIndex: 1,
        explanation: "Use inversion (adjective + linking verb + subject) after phrases like 'So successful' at the beginning of a sentence."
    },
    {
        question: "She is grateful ______ your help.",
        options: ["of", "for", "about", "with"],
        answerIndex: 1,
        explanation: "The correct preposition is 'grateful for'."
    },
    {
        question: "I suggest that he ______ a break.",
        options: ["takes", "take", "took", "will take"],
        answerIndex: 1,
        explanation: "After verbs like 'suggest' followed by 'that' clause, use the subjunctive mood (base form of the verb)."
    },
    {
        question: "The package ______ last week has arrived.",
        options: ["sending", "sent", "was sent", "that sending"],
        answerIndex: 1,
        explanation: "'Sent' is a past participle used as an adjective (reduced relative clause of 'that was sent')."
    },
    {
        question: "It's time for us ______.",
        options: ["go", "to go", "going", "went"],
        answerIndex: 1,
        explanation: "After 'It's time for [object]', use the infinitive with 'to'."
    },
     {
        question: "Hardly ever ______ out on weekdays.",
        options: ["do they go", "they do go", "they go", "have they gone"],
        answerIndex: 0,
        explanation: "Use inversion (auxiliary verb + subject + main verb) after negative adverbs like 'hardly ever' at the beginning of a sentence."
    },
    {
        question: "He is responsible ______ ensuring the safety of the team.",
        options: ["of", "for", "in", "with"],
        answerIndex: 1,
        explanation: "The correct phrase is 'responsible for'."
    },
    {
        question: "She avoids ______ out alone at night.",
        options: ["to go", "going", "go", "of going"],
        answerIndex: 1,
        explanation: "The verb 'avoid' is followed by a gerund (-ing form)."
    },
    {
        question: "He promised that he ______ me the next day.",
        options: ["will help", "would help", "helps", "helped"],
        answerIndex: 1,
        explanation: "Backshift 'will help' to 'would help' in reported speech."
    },
    {
        question: "______ carefully, the old man crossed the street.",
        options: ["Walked", "Walking", "To walk", "Having walked"],
        answerIndex: 1,
        explanation: "'Walking carefully' is a present participle phrase acting adverbially."
    },
     {
        question: "Never in my life ______ such a thing.",
        options: ["I have heard", "have I heard", "I heard", "did I heard"],
        answerIndex: 1,
        explanation: "Use inversion (adverbial phrase + auxiliary + subject + main verb) after negative phrases like 'Never in my life'."
    },
    {
        question: "He is keen ______ learning new skills.",
        options: ["at", "in", "on", "for"],
        answerIndex: 2,
        explanation: "The correct preposition is 'keen on'."
    },
    {
        question: "I remember ______ him before.",
        options: ["to see", "seeing", "saw", "be seen"],
        answerIndex: 1,
        explanation: "The verb 'remember' followed by a gerund (-ing form) refers to a past memory."
    },
    {
        question: "The rules ______ by the committee were strict.",
        options: ["making", "made", "were made", "that making"],
        answerIndex: 1,
        explanation: "'Made' is a past participle used as an adjective (reduced relative clause of 'that were made')."
    },
    {
        question: "It's high time the government ______ action.",
        options: ["take", "takes", "took", "has taken"],
        answerIndex: 2,
        explanation: "After 'It's high time', use the past tense."
    },
     {
        question: "So tired ______ that she fell asleep immediately.",
        options: ["she was", "was she", "she had been", "had she been"],
        answerIndex: 1,
        explanation: "Use inversion (adjective + linking verb + subject) after phrases like 'So tired' at the beginning of a sentence."
    },
    {
        question: "She is aware ______ the risks.",
        options: ["of", "for", "about", "with"],
        answerIndex: 0,
        explanation: "The correct preposition is 'aware of'."
    },
    {
        question: "He admits ______ a mistake.",
        options: ["to make", "making", "made", "of making"],
        answerIndex: 1,
        explanation: "The verb 'admit' is followed by a gerund (-ing form)."
    },
    {
        question: "He asked me ______ I could help him.",
        options: ["that", "if", "whether", "both B and C"],
        answerIndex: 3,
        explanation: "Both 'if' and 'whether' can introduce reported yes/no questions."
    },
    {
        question: "______ the rain, we went for a walk.",
        options: ["Despite", "Although", "In spite", "In spite of"],
        answerIndex: 3,
        explanation: "'In spite of' is followed by a noun phrase."
    },
    {
        question: "Rarely ______ so happy.",
        options: ["I feel", "do I feel", "I am feeling", "am I feeling"],
        answerIndex: 1,
        explanation: "Use inversion (auxiliary verb + subject + main verb) after negative adverbs like 'rarely'."
    },
     {
        question: "He is addicted ______ gambling.",
        options: ["for", "to", "in", "with"],
        answerIndex: 1,
        explanation: "The correct preposition is 'addicted to'."
    },
    {
        question: "I forgot ______ him about the meeting.",
        options: ["to tell", "telling", "told", "of telling"],
        answerIndex: 0,
        explanation: "The verb 'forgot' followed by an infinitive ('to tell') means failing to remember to perform an action."
    },
    {
        question: "The language ______ in the document is complex.",
        options: ["using", "used", "was used", "that using"],
        answerIndex: 1,
        explanation: "'Used' is a past participle used as an adjective (reduced relative clause of 'that is used')."
    },
    {
        question: "It would be better if you ______ now.",
        options: ["leave", "left", "will leave", "have left"],
        answerIndex: 1,
        explanation: "After 'It would be better if', use the past tense."
    },
     {
        question: "By the time you read this, I ______.",
        options: ["will leave", "will have left", "am leaving", "leave"],
        answerIndex: 1,
        explanation: "Use the future perfect ('will have left') for an action completed before a future time/event."
    },
    {
        question: "He is dependent ______ his parents.",
        options: ["of", "from", "on", "with"],
        answerIndex: 2,
        explanation: "The correct preposition is 'dependent on'."
    },
    {
        question: "She considered ______ abroad.",
        options: ["to study", "studying", "study", "of studying"],
        answerIndex: 1,
        explanation: "The verb 'consider' is followed by a gerund (-ing form)."
    },
    {
        question: "He confessed ______ the vase.",
        options: ["to break", "breaking", "broke", "of breaking"],
        answerIndex: 1,
        explanation: "The verb 'confess' is followed by a gerund (-ing form)."
    },
     {
        question: "Not only ______ the report, but he also gave a presentation.",
        options: ["he wrote", "did he write", "he did write", "wrote he"],
        answerIndex: 1,
        explanation: "Use inversion (auxiliary verb + subject + main verb) after 'Not only' at the beginning of a sentence."
    },
    {
        question: "He is fond ______ classical music.",
        options: ["at", "in", "on", "of"],
        answerIndex: 3,
        explanation: "The correct phrase is 'fond of'."
    },
    {
        question: "I remember ______ the park when I was a child.",
        options: ["to visit", "visiting", "visit", "of visiting"],
        answerIndex: 1,
        explanation: "The verb 'remember' followed by a gerund (-ing form) refers to recalling a past event."
    },
    {
        question: "The decision ______ was announced this morning.",
        options: ["making", "made", "was made", "that making"],
        answerIndex: 1,
        explanation: "'Made' is a past participle used as an adjective (reduced relative clause of 'that was made')."
    },
    {
        question: "If he ______ less, he would be healthier.",
        options: ["ate", "eats", "had eaten", "would eat"],
        answerIndex: 0,
        explanation: "This is a Type 2 conditional sentence (present unreal). The structure is If + past simple, would + base verb."
    },
     {
        question: "Hardly had I finished dinner ______ the doorbell rang.",
        options: ["when", "than", "then", "that"],
        answerIndex: 0,
        explanation: "The correct correlative conjunction with 'Hardly had... / Scarcely had...' is 'when'."
    },
    {
        question: "He is confident ______ winning.",
        options: ["of", "for", "about", "in"],
        answerIndex: 0,
        explanation: "The correct preposition is 'confident of'."
    },
    {
        question: "She avoided ______ his questions.",
        options: ["to answer", "answering", "answer", "of answering"],
        answerIndex: 1,
        explanation: "The verb 'avoid' is followed by a gerund (-ing form)."
    },
    {
        question: "He told me his name ______.",
        options: ["is John", "was John", "had been John", "is being John"],
        answerIndex: 1,
        explanation: "Backshift the present simple ('is') to the past simple ('was') in reported speech."
    },
    {
        question: "______ money, he couldn't buy the car.",
        options: ["Lacking", "Lacked", "Having lacked", "To lack"],
        answerIndex: 0,
        explanation: "'Lacking money' is a present participle phrase acting adverbially to explain why he couldn't buy the car."
    },
     {
        question: "Neither of the statements ______ true.",
        options: ["is", "are", "be", "were"],
        answerIndex: 0,
        explanation: "With 'neither of the...', the verb is singular ('is')."
    },
    {
        question: "He is involved ______ the project.",
        options: ["of", "for", "in", "with"],
        answerIndex: 2,
        explanation: "The correct phrase is 'involved in'."
    },
    {
        question: "I need ______ coffee.",
        options: ["a few", "a little", "many", "few"],
        answerIndex: 1,
        explanation: "'Coffee' is typically treated as an uncountable noun. Use 'a little' with uncountable nouns."
    },
    {
        question: "The method ______ is outdated.",
        options: ["using", "used", "was used", "that using"],
        answerIndex: 1,
        explanation: "'Used' is a past participle used as an adjective (reduced relative clause of 'that is used')."
    },
    {
        question: "If she ______ time, she would help you.",
        options: ["has", "had", "would have", "have had"],
        answerIndex: 1,
        explanation: "This is a Type 2 conditional. The 'if' clause uses the past simple ('had')."
    },
     {
        question: "No sooner had he arrived ______ the problems started.",
        options: ["when", "than", "then", "that"],
        answerIndex: 1,
        explanation: "The correct correlative conjunction with 'No sooner had...' is 'than'."
    },
    {
        question: "He is prohibited ______ entering the building.",
        options: ["for", "to", "from", "in"],
        answerIndex: 2,
        explanation: "The correct phrase is 'prohibited from'."
    },
    {
        question: "She admitted ______ the cake.",
        options: ["to eat", "eating", "ate", "of eating"],
        answerIndex: 1,
        explanation: "The verb 'admit' is followed by a gerund (-ing form)."
    },
    {
        question: "He explained that he ______ stuck in traffic.",
        options: ["is", "was", "has been", "had been"],
        answerIndex: 1,
        explanation: "Backshift the tense in reported speech. If the original statement was 'I am stuck', it becomes 'he was stuck'. If it was 'I was stuck', it could become 'he had been stuck', but 'was' is also common."
    },
     {
        question: "Only by working hard ______ successful.",
        options: ["you will be", "will you be", "you are", "are you"],
        answerIndex: 1,
        explanation: "Use inversion (auxiliary verb + subject + main verb) after phrases like 'Only by working hard'."
    },
    {
        question: "He is opposed ______ the new policy.",
        options: ["for", "to", "with", "against"],
        answerIndex: 1,
        explanation: "The correct phrase is 'opposed to'."
    },
    {
        question: "I tried ______ the key, but I couldn't.",
        options: ["to find", "finding", "find", "of finding"],
        answerIndex: 0,
        explanation: "The verb 'try' followed by an infinitive ('to find') means making an effort to do something."
    },
     {
        question: "The research ______ last year showed significant results.",
        options: ["conducting", "conducted", "was conducted", "that conducting"],
        answerIndex: 1,
        explanation: "'Conducted' is a past participle used as an adjective (reduced relative clause of 'that was conducted')."
    },
    {
        question: "Were they to arrive, they would be welcome.",
        options: ["If they arrive...", "If they arrived...", "If they had arrived...", "If they were to arrive..."],
        answerIndex: 3,
        explanation: "This is an inverted conditional structure (Type 2 variation) using 'were to'."
    }
];

        // --- End of Pre-defined Questions ---

        let availableQuestionLists = {
            'basicGrammar': basicGrammarList,
            'advanceGrammar': advanceGrammarList
        };

        let currentQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;
        let correctCount = 0;
        let incorrectCount = 0;
        let timedOutCount = 0;
        let missedQuestions = [];

        let timer;
        const TIME_PER_QUESTION = 15; // Time limit in seconds
        let timeLeft = TIME_PER_QUESTION;
        let highScores = loadHighScores(); // Load high scores from local storage
        let currentQuizListName = 'basicGrammar'; // Default to the first sample list

        // --- Variables for List Creation/Editing (Simplified for Import Only) ---
        let newQuestionList = [];
        // editingQuestionIndex is no longer needed for individual question editing
        // let editingQuestionIndex = -1; // -1 means not editing

        // --- Initialize ---
        updateHighScoreDisplay();
        loadQuestionLists(); // Load user lists on page load
        populateQuestionListSelect();
        loadAndDisplayNewListPreview(); // Load any unsaved list in preview on start

        // --- Event Listeners ---
        startQuizBtn.addEventListener('click', () => {
            startArea.classList.add('hidden');
            listManagementArea.classList.add('hidden'); // Hide list management during game
            endSummaryEl.classList.add('hidden'); // Hide summary if visible from a previous game
            gameArea.classList.remove('hidden');
            startNewQuiz();
        });

        nextQuestionBtn.addEventListener('click', () => {
             if (!nextQuestionBtn.classList.contains('hidden')) { // Prevent double clicking
                currentQuestionIndex++;
                if (currentQuestionIndex < currentQuestions.length) {
                    displayNextQuestion();
                } else {
                    endQuiz();
                }
            }
        });

        // Listener for the new End Test button
        endTestBtn.addEventListener('click', () => {
            // Confirm with the user before ending the test early
            if (confirm("Are you sure you want to end the test early? Your current progress will be summarized.")) {
                endQuiz(); // Immediately end the quiz
            }
        });


         // Listen for Enter key press for next question
         document.addEventListener('keypress', (event) => {
             // Only trigger if game area is visible and next button is not hidden
             if (!gameArea.classList.contains('hidden') && !nextQuestionBtn.classList.contains('hidden')) {
                if (event.key === 'Enter') {
                     nextQuestionBtn.click(); // Trigger click on the next button
                     event.preventDefault(); // Prevent default Enter key behavior (like form submission)
                }
            }
         });


        restartGameBtn.addEventListener('click', () => {
            gameArea.classList.add('hidden');
            startArea.classList.remove('hidden');
            listManagementArea.classList.remove('hidden'); // Show list management again
            resetQuiz(); // Reset score and index but don't start a new quiz immediately
        });

         // New listener for Play Again (Same List) button
         playAgainSameListBtn.addEventListener('click', () => {
            endSummaryEl.classList.add('hidden'); // Hide summary
             restartQuizSameList(); // Restart quiz with the same list
         });


        loadListBtn.addEventListener('click', () => {
            currentQuizListName = questionListSelect.value;
            updateHighScoreDisplay(); // Update high score for the newly selected list
            alert(`"${currentQuizListName}" list loaded for the next quiz.`);
        });

         deleteListBtn.addEventListener('click', () => {
            const listToDelete = questionListSelect.value;
            // Check against the new sample list names
            if (listToDelete === 'basicGrammar' || listToDelete === 'advanceGrammar') {
                alert("You cannot delete the default sample lists.");
                return;
            }
             if (confirm(`Are you sure you want to delete the list "${listToDelete}"? This cannot be undone.`)) {
                delete availableQuestionLists[listToDelete];
                saveQuestionLists();
                populateQuestionListSelect();
                 if (currentQuizListName === listToDelete) {
                     currentQuizListName = 'basicGrammar'; // Reset current selection if deleted
                     questionListSelect.value = 'basicGrammar'; // Default to first sample
                     updateHighScoreDisplay(); // Update high score
                 }
                // Also remove high score for this list
                if (highScores[listToDelete]) {
                    delete highScores[listToDelete];
                    saveHighScores();
                    updateHighScoreDisplay(); // Update display based on new current list
                }
                alert(`List "${listToDelete}" deleted.`);
             }
         });

        // Removed event listeners for individual question creation buttons
        // addQuestionBtn.addEventListener('click', addQuestionToNewList);
        // updateQuestionBtn.addEventListener('click', updateQuestionInNewList);

        saveNewListBtn.addEventListener('click', saveNewQuestionList);
        clearNewListBtn.addEventListener('click', clearNewListPreview);
        newListNameInput.addEventListener('input', updatePreviewListName); // Keep this for imported list name

         // Export/Import Listeners
         exportListBtn.addEventListener('click', exportSelectedList);
         importListBtn.addEventListener('click', importListFromJson);
         importFromFileBtn.addEventListener('click', () => importFileInput.click()); // Trigger file input
         importFileInput.addEventListener('change', importListFromFile);


        // --- Quiz Logic Functions ---
        function startNewQuiz() {
            score = 0;
            correctCount = 0; // Reset counts
            incorrectCount = 0;
            timedOutCount = 0;
            missedQuestions = []; // Clear missed questions list
            currentQuestionIndex = 0;
            // Shuffle questions at the start of a new quiz
            currentQuestions = shuffleArray([...availableQuestionLists[currentQuizListName]]); // Use selected list
            totalQuestionsEl.textContent = currentQuestions.length;
            updateScoreDisplay();
            feedbackEl.textContent = '';
            feedbackEl.className = '';
            nextQuestionBtn.classList.add('hidden');
            restartGameBtn.classList.remove('hidden'); // Show restart button
            playAgainSameListBtn.classList.add('hidden'); // Hide play again same button initially
            timerArea.classList.remove('hidden'); // Show timer
            endSummaryEl.classList.add('hidden'); // Hide summary at start of new quiz
            endTestBtn.classList.remove('hidden'); // Show End Test button
            displayNextQuestion();
        }

        // New function to restart quiz with the same list
         function restartQuizSameList() {
            score = 0;
            correctCount = 0; // Reset counts
            incorrectCount = 0;
            timedOutCount = 0;
             missedQuestions = []; // Clear missed questions list
            currentQuestionIndex = 0;
             // Re-shuffle the current list for a fresh game
             currentQuestions = shuffleArray([...availableQuestionLists[currentQuizListName]]);
            totalQuestionsEl.textContent = currentQuestions.length;
            updateScoreDisplay();
            feedbackEl.textContent = '';
            feedbackEl.className = '';
            nextQuestionBtn.classList.add('hidden');
            restartGameBtn.classList.remove('hidden');
             playAgainSameListBtn.classList.add('hidden');
            timerArea.classList.remove('hidden');
             endSummaryEl.classList.add('hidden'); // Hide summary
            endTestBtn.classList.remove('hidden'); // Show End Test button
            displayNextQuestion(); // Start displaying questions immediately
         }


        function displayNextQuestion() {
            if (currentQuestionIndex >= currentQuestions.length) {
                endQuiz();
                return;
            }

            resetTimer(); // Reset timer for the new question
            startTimer(); // Start timer

            const questionData = currentQuestions[currentQuestionIndex];
            // Use innerHTML to allow for basic formatting in questions if needed
            questionTextEl.innerHTML = questionData.question;
            optionsContainer.innerHTML = ''; // Clear previous options

            // Shuffle options for additional randomization
            const shuffledOptions = shuffleArray(questionData.options.map((opt, idx) => ({ text: opt, originalIndex: idx })));

            shuffledOptions.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option.text;
                // Store the original index so we know if it's the correct answer
                button.dataset.originalIndex = option.originalIndex;
                button.addEventListener('click', handleAnswer);
                optionsContainer.appendChild(button);
            });

            questionNumberEl.textContent = currentQuestionIndex + 1;
            feedbackEl.textContent = '';
            feedbackEl.className = '';
            nextQuestionBtn.classList.add('hidden');
            //nextQuestionBtn.textContent = "Next Question"; // Reset button text
        }

        function handleAnswer(event) {
            stopTimer(); // Stop the timer once an answer is selected

            // Get the original index of the selected option
            const selectedOriginalIndex = parseInt(event.target.dataset.originalIndex);
            const questionData = currentQuestions[currentQuestionIndex];
            const correctOriginalIndex = questionData.answerIndex; // This is the original index

            // Disable all option buttons
            const optionButtons = optionsContainer.querySelectorAll('button');
            optionButtons.forEach(btn => btn.disabled = true);

            if (selectedOriginalIndex === correctOriginalIndex) {
                event.target.classList.add('correct');
                feedbackEl.textContent = "Correct! " + (questionData.explanation || "");
                feedbackEl.className = 'feedback-correct';
                score++;
                correctCount++; // Increment correct count
            } else {
                event.target.classList.add('incorrect');
                // Highlight the correct answer using its original index
                optionButtons.forEach(btn => {
                    if (parseInt(btn.dataset.originalIndex) === correctOriginalIndex) {
                        btn.classList.add('revealed-correct');
                    }
                });
                feedbackEl.innerHTML = `Incorrect. The correct answer was "<strong>${questionData.options[correctOriginalIndex]}</strong>".<br>${questionData.explanation || ""}`;
                feedbackEl.className = 'feedback-incorrect';
                 incorrectCount++; // Increment incorrect count
                 missedQuestions.push({ // Record missed question details
                     question: questionData.question,
                     // Store original options and indices for accurate summary display
                     options: questionData.options,
                     yourAnswer: questionData.options[selectedOriginalIndex],
                     correctAnswer: questionData.options[correctOriginalIndex],
                     explanation: questionData.explanation || 'No explanation provided.' // Default explanation
                 });
            }
            updateScoreDisplay();
            nextQuestionBtn.classList.remove('hidden');
            if (currentQuestionIndex >= currentQuestions.length - 1) {
                nextQuestionBtn.textContent = "Show Final Score";
            } else {
                nextQuestionBtn.textContent = "Next Question";
            }
        }

        function endQuiz() {
            stopTimer(); // Ensure timer stops at the end
            timerArea.classList.add('hidden'); // Hide timer area
            endTestBtn.classList.add('hidden'); // Hide End Test button

            questionTextEl.textContent = "Quiz Finished!";
            optionsContainer.innerHTML = '';
            feedbackEl.textContent = ''; // Clear regular feedback

            // Display the end summary
            endSummaryEl.classList.remove('hidden');
            summaryTotalEl.textContent = currentQuestions.length;
            summaryCorrectEl.textContent = correctCount;
            summaryIncorrectEl.textContent = incorrectCount;
            summaryTimedOutEl.textContent = timedOutCount;

            // Display missed questions
            summaryMissedQuestionsEl.innerHTML = ''; // Clear previous list
            if (missedQuestions.length > 0) {
                 document.getElementById('summary-missed-questions').classList.remove('hidden'); // Show the heading if there are missed questions
                 missedQuestions.forEach((item, index) => {
                     const li = document.createElement('li');
                      // Try to find the original question index in the *current* quiz questions array
                      // This is safer than relying on the order in missedQuestions array
                      const originalQuizIndex = currentQuestions.findIndex(q =>
                          q.question === item.question &&
                          JSON.stringify(q.options) === JSON.stringify(item.options) &&
                          q.answerIndex === item.options.indexOf(item.correctAnswer) // Verify correct answer matches original data
                      );
                     const qNumber = originalQuizIndex !== -1 ? originalQuizIndex + 1 : 'N/A';

                     li.innerHTML = `<strong>Q${qNumber}:</strong> ${item.question}<br>
                                      You answered: <span class="incorrect-answer">${item.yourAnswer}</span><br>
                                      Correct answer: <span class="correct-answer">${item.correctAnswer}</span>`;
                     if (item.explanation && item.explanation !== 'No explanation provided.') { // Only show if a real explanation exists
                         li.innerHTML += `<br>Explanation: ${item.explanation}`;
                     }
                     summaryMissedQuestionsEl.appendChild(li);
                 });
            } else {
                 document.getElementById('summary-missed-questions').classList.add('hidden'); // Hide if no missed questions
            }


            nextQuestionBtn.classList.add('hidden');
            restartGameBtn.classList.remove('hidden');
            playAgainSameListBtn.classList.remove('hidden'); // Show "Play Again (Same List)" button
            //restartGameBtn.textContent = "Play Again"; // This button goes back to start screen

            updateHighScore(score); // Check and update high score
        }

         function resetQuiz() {
             score = 0;
             correctCount = 0;
             incorrectCount = 0;
             timedOutCount = 0;
             missedQuestions = [];
             currentQuestionIndex = 0;
             updateScoreDisplay();
             feedbackEl.textContent = '';
             feedbackEl.className = '';
             questionTextEl.textContent = ''; // Clear question text
             optionsContainer.innerHTML = ''; // Clear options
             endSummaryEl.classList.add('hidden'); // Hide summary
             nextQuestionBtn.classList.add('hidden');
             endTestBtn.classList.add('hidden'); // Hide End Test button
             restartGameBtn.classList.add('hidden'); // Hide restart until game ends or starts again
              playAgainSameListBtn.classList.add('hidden'); // Hide the new button too
              timerArea.classList.add('hidden'); // Hide timer
             stopTimer(); // Stop timer just in case
             resetTimer(); // Reset timer display
         }


        function updateScoreDisplay() {
            scoreEl.textContent = score;
        }

        // Generic shuffle function
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // --- Timer Functions ---
        function startTimer() {
             // Clear any existing timer first
            stopTimer();
             // Set initial color
            timerArea.style.color = '#424242';

            timer = setInterval(() => {
                timeLeft--;
                timeEl.textContent = timeLeft;
                if (timeLeft <= 5) { // Highlight timer when low
                    timerArea.style.color = '#d32f2f'; // Red
                } else {
                     timerArea.style.color = '#424242'; // Default dark grey
                }
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    handleTimerEnd();
                }
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timer);
        }

        function resetTimer() {
            stopTimer();
            timeLeft = TIME_PER_QUESTION;
            timeEl.textContent = timeLeft;
             timerArea.style.color = '#424242'; // Reset color
        }

        function handleTimerEnd() {
            stopTimer(); // Ensure timer is stopped
            timedOutCount++; // Increment timed out count

            // Automatically mark the question as incorrect and move on
            const questionData = currentQuestions[currentQuestionIndex];
            const correctOriginalIndex = questionData.answerIndex; // Correct index in original options
            const optionButtons = optionsContainer.querySelectorAll('button');

            // Disable all option buttons
            optionButtons.forEach(btn => btn.disabled = true);

            // Highlight the correct answer using its original index
             optionButtons.forEach(btn => {
                if (parseInt(btn.dataset.originalIndex) === correctOriginalIndex) {
                    btn.classList.add('revealed-correct');
                }
            });

            feedbackEl.innerHTML = `Time's up! The correct answer was "<strong>${questionData.options[correctOriginalIndex]}</strong>".<br>${questionData.explanation || ""}`;
            feedbackEl.className = 'feedback-incorrect';

            updateScoreDisplay(); // Score doesn't increase on timeout

             // Record missed question details (timed out counts as missed)
             missedQuestions.push({
                 question: questionData.question,
                 options: questionData.options, // Store original options
                 yourAnswer: 'Timed Out', // Indicate it was a timeout
                 correctAnswer: questionData.options[correctOriginalIndex],
                 explanation: questionData.explanation || 'No explanation provided.'
             });

            nextQuestionBtn.classList.remove('hidden');
            if (currentQuestionIndex >= currentQuestions.length - 1) {
                nextQuestionBtn.textContent = "Show Final Score";
            } else {
                 nextQuestionBtn.textContent = "Next Question";
            }
        }

        // --- High Score Functions ---
        function loadHighScores() {
            const highScoresJson = localStorage.getItem('quizHighScores'); // Changed storage key
            return highScoresJson ? JSON.parse(highScoresJson) : {};
        }

        function saveHighScores() {
            localStorage.setItem('quizHighScores', JSON.stringify(highScores)); // Changed storage key
        }

        function updateHighScore(finalScore) {
             // Only update if the list has questions
             if (!currentQuestions || currentQuestions.length === 0) return;

            if (!highScores[currentQuizListName] || finalScore > highScores[currentQuizListName]) {
                highScores[currentQuizListName] = finalScore;
                saveHighScores();
                updateHighScoreDisplay();
                // Use a more subtle notification than alert
                const highScoreNotification = document.createElement('div');
                highScoreNotification.textContent = `New High Score for "${currentQuizListName}": ${finalScore}!`;
                highScoreNotification.style.cssText = `
                    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
                    background-color: #4caf50; color: white; padding: 10px 20px;
                    border-radius: 8px; z-index: 100; font-size: 1.1rem;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2); opacity: 1; transition: opacity 1s ease-in-out;
                `;
                document.body.appendChild(highScoreNotification);
                setTimeout(() => {
                    highScoreNotification.style.opacity = 0;
                    highScoreNotification.addEventListener('transitionend', () => highScoreNotification.remove());
                }, 3000); // Show for 3 seconds
            }
        }

         function updateHighScoreDisplay() {
              const currentListHighScore = highScores[currentQuizListName];
              // Also check if the current list exists and has questions before displaying a score of 0 potentially misleadingly
              if (!availableQuestionLists[currentQuizListName] || !Array.isArray(availableQuestionLists[currentQuizListName]) || availableQuestionLists[currentQuizListName].length === 0) {
                  highScoreEl.textContent = 'N/A (Empty List)';
              } else if (currentListHighScore === undefined) {
                  highScoreEl.textContent = '0'; // Show 0 if list exists but no score yet
              } else {
                   highScoreEl.textContent = currentListHighScore;
              }
         }

         // --- List Management Functions ---
         function loadQuestionLists() {
            const storedLists = localStorage.getItem('userQuizQuestionLists'); // Changed storage key
            if (storedLists) {
                try { // Use try-catch for parsing
                    const userLists = JSON.parse(storedLists);
                     // Basic validation to ensure it's an object and contains arrays
                     if (typeof userLists === 'object' && userLists !== null) {
                         const loadedLists = {};
                         for (const listName in userLists) {
                             const list = userLists[listName];
                             if (Array.isArray(list)) {
                                 // Validate array items - check if each item looks like a question
                                 const questionsValid = list.every(q =>
                                     typeof q === 'object' && q !== null &&
                                     typeof q.question === 'string' && q.question.length > 0 &&
                                     Array.isArray(q.options) && q.options.length >= 2 &&
                                     q.options.every(opt => typeof opt === 'string' && opt.length > 0) &&
                                     typeof q.answerIndex === 'number' && q.answerIndex >= 0 && q.answerIndex < q.options.length
                                     // explanation is optional, no need to check
                                 );
                                 if (questionsValid) {
                                     loadedLists[listName] = list; // Add valid list
                                 } else {
                                     console.warn(`List "${listName}" contains invalid question data and was not loaded.`);
                                 }
                             } else {
                                 console.warn(`Item "${listName}" in stored lists is not an array and was skipped.`);
                             }
                         }
                         // Merge valid loaded lists with default lists
                        availableQuestionLists = { ...availableQuestionLists, ...loadedLists };

                     } else {
                        console.error("Stored user lists are not in expected format (not an object). Loading defaults only.");
                        // Optionally clear invalid data
                        // localStorage.removeItem('userQuizQuestionLists');
                     }
                } catch (e) {
                    console.error("Failed to parse user question lists from local storage:", e);
                    // Optionally clear corrupted data
                    // localStorage.removeItem('userQuizQuestionLists');
                }
            }
             // Ensure default lists are always present even if storage is empty/corrupted
             if (!availableQuestionLists['basicGrammar']) availableQuestionLists['basicGrammar'] = basicGrammarList;
             if (!availableQuestionLists['advanceGrammar']) availableQuestionLists['advanceGrammar'] = advanceGrammarList;

         }

         function saveQuestionLists() {
            // Only save user-created lists, not the defaults
            const userListsToSave = {};
            for (const listName in availableQuestionLists) {
                if (listName !== 'basicGrammar' && listName !== 'advanceGrammar') {
                    userListsToSave[listName] = availableQuestionLists[listName];
                }
            }
            localStorage.setItem('userQuizQuestionLists', JSON.stringify(userListsToSave)); // Changed storage key
         }

         function populateQuestionListSelect() {
            questionListSelect.innerHTML = ''; // Clear existing options
            // loadQuestionLists(); // Already called in initialization

            // Sort list names alphabetically, keeping sample lists at the top
            const listNames = Object.keys(availableQuestionLists).sort((a, b) => {
                if (a.startsWith('Sample Quiz') && !b.startsWith('Sample Quiz')) return -1;
                if (!a.startsWith('Sample Quiz') && b.startsWith('Sample Quiz')) return 1;
                return a.localeCompare(b); // Alphabetical sort for others
            });


            listNames.forEach(listName => {
                 const list = availableQuestionLists[listName];
                 // Only add lists that are arrays and have at least one question
                 if (Array.isArray(list) && list.length > 0) {
                    const option = document.createElement('option');
                    option.value = listName;
                    option.textContent = `${listName} (${list.length} questions)`;
                    questionListSelect.appendChild(option);
                 }
            });

             // Ensure at least the default sample lists are available if others were invalid/empty
             if (questionListSelect.options.length === 0) {
                  if (Array.isArray(sampleQuizList1) && sampleQuizList1.length > 0) {
                       const option1 = document.createElement('option');
                        option1.value = 'basicGrammar';
                        option1.textContent = `basicGrammar (${sampleQuizList1.length} questions)`;
                        questionListSelect.appendChild(option1);
                  }
                  if (Array.isArray(sampleQuizList2) && sampleQuizList2.length > 0) {
                       const option2 = document.createElement('option');
                        option2.value = 'advanceGrammar';
                        option2.textContent = `advanceGrammar (${sampleQuizList2.length} questions)`;
                        questionListSelect.appendChild(option2);
                  }
             }


             // Set the select value back to the current quiz list if it still exists and is valid
             if (availableQuestionLists[currentQuizListName] && Array.isArray(availableQuestionLists[currentQuizListName]) && availableQuestionLists[currentQuizListName].length > 0) {
                 questionListSelect.value = currentQuizListName;
             } else if (questionListSelect.options.length > 0) {
                  // If current list is no longer valid, select the first available list
                  currentQuizListName = questionListSelect.value; // Set to the first option's value
             } else {
                 // Fallback if no lists are available (shouldn't happen if default exists)
                 currentQuizListName = 'basicGrammar'; // Default to first sample
             }
             updateHighScoreDisplay(); // Update high score display based on the selected list
         }


        // Removed addQuestionToNewList and updateQuestionInNewList functions

        // Removed startEditingQuestion and stopEditing functions

        // Removed deleteQuestionFromNewList function (individual deletion is gone)
        // The preview will now only show questions added via import before saving.

         function displayNewListPreview() {
            previewQuestionsListEl.innerHTML = ''; // Clear existing preview
            previewListNameEl.textContent = newListNameInput.value.trim() || 'Unnamed';

            if (newQuestionList.length === 0) {
                previewQuestionsListEl.innerHTML = '<li>Import a list to see questions here before saving.</li>'; // Updated placeholder
                return;
            }

            newQuestionList.forEach((q, index) => {
                const listItem = document.createElement('li');
                 // Use innerHTML for question text in case it contains HTML entities or structure
                listItem.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question}<br>
                                      <strong>Options:</strong> ${q.options.join(', ')}<br>
                                      <strong>Correct Index:</strong> ${q.answerIndex}`;
                 if (q.explanation) {
                     listItem.innerHTML += `<br><strong>Explanation:</strong> ${q.explanation}`;
                 }

                 // Removed Edit and Delete buttons for individual items
                 // The preview is now just a display before saving the imported list.

                previewQuestionsListEl.appendChild(listItem);
            });
         }

         function clearNewQuestionInputs() {
            newListNameInput.value = ''; // Clear list name input
            // Removed individual question input clearing
            // newQuestionInput.value = '';
            // newOptionsInput.value = '';
            // newAnswerIndexInput.value = '0';
            // newExplanationInput.value = '';
            // stopEditing(); // Ensure editing state is reset (no longer relevant)
         }

         function saveNewQuestionList() {
            const listName = newListNameInput.value.trim();
             if (!listName) {
                 alert("Please enter a name for your new list.");
                 return;
             }
              // Validate list name uniqueness (case-insensitive check might be good)
             // Check if name exists AND it's not the list we are currently building (which is newQuestionList)
             // If a list with this name exists and it's *not* the current newQuestionList object, prompt to overwrite.
             if (availableQuestionLists[listName] && availableQuestionLists[listName] !== newQuestionList) {
                 if (!confirm(`A list named "${listName}" already exists. Do you want to overwrite it?`)) {
                     return;
                 }
             } else if (listName === 'basicGrammar' || listName === 'advanceGrammar') { // Check against new sample names
                  alert(`"${listName}" is a reserved name. Please choose a different name.`);
                 return;
             }


            if (newQuestionList.length === 0) {
                alert("Import questions before saving the list."); // Updated message
                return;
            }

            availableQuestionLists[listName] = newQuestionList; // Assign the new list to the available lists
            saveQuestionLists(); // Save *all* user lists to local storage
            populateQuestionListSelect(); // Refresh the dropdown
            alert(`List "${listName}" saved successfully!`);
            clearNewListPreview(); // Clear the preview after saving (resets newQuestionList)
             localStorage.removeItem('unsavedNewListPreview'); // Clear unsaved list data
         }

         function clearNewListPreview() {
             // Check if there's anything in the preview to clear
             if (newQuestionList.length > 0 || newListNameInput.value.trim()) {
                 if (!confirm("Are you sure you want to clear the current new list preview? Any unsaved imported questions will be lost.")) { // Updated message
                     return;
                 }
             }
             newListNameInput.value = '';
             newQuestionList = []; // Clear the list data
             displayNewListPreview(); // Update the display to show empty
             // clearNewQuestionInputs(); // This just clears name now
              localStorage.removeItem('unsavedNewListPreview'); // Clear unsaved list data
         }

         function updatePreviewListName() {
            previewListNameEl.textContent = newListNameInput.value.trim() || 'Unnamed';
             saveNewListPreview(); // Save name change
         }

         // Save/Load New List Preview to Local Storage (in case of accidental page close)
         // This saves the state of the list being built (via import), including the name.
         function saveNewListPreview() {
             const previewState = {
                 name: newListNameInput.value.trim(),
                 list: newQuestionList,
                 // editingIndex is no longer relevant for individual question editing
                 // editingIndex: editingQuestionIndex
             };
              // Only save if there's actually something in the list or a name entered
             if (previewState.list.length > 0 || previewState.name) {
                 localStorage.setItem('unsavedNewListPreview', JSON.stringify(previewState)); // Changed storage key
             } else {
                 localStorage.removeItem('unsavedNewListPreview'); // Changed storage key
             }
         }

         function loadAndDisplayNewListPreview() {
             const savedStateJson = localStorage.getItem('unsavedNewListPreview'); // Changed storage key
             if (savedStateJson) {
                 try {
                     const savedState = JSON.parse(savedStateJson);
                     // Validate the loaded state structure
                     if (savedState && Array.isArray(savedState.list)) {
                         newQuestionList = savedState.list;
                         if (savedState.name) {
                             newListNameInput.value = savedState.name;
                             previewListNameEl.textContent = savedState.name; // Update display immediately
                         }
                         // editingIndex is no longer relevant for individual question editing
                         // if (savedState.editingIndex !== -1 && savedState.editingIndex < newQuestionList.length) {
                         //      displayNewListPreview(); // Display first so elements exist
                         //      setTimeout(() => {
                         //          // startEditingQuestion(savedState.editingIndex); // This will also populate inputs and manage buttons
                         //          // This functionality is removed, so we just display the list.
                         //      }, 50); // Short delay
                         // } else {
                             displayNewListPreview(); // Just display the loaded list
                             // Ensure editing state is correctly reset if it wasn't saved properly (not relevant now)
                             // stopEditing();
                         // }
                         alert("Unsaved list preview loaded. Remember to save your list!");
                     } else {
                          console.error("Unsaved list preview data is not in expected format.");
                           localStorage.removeItem('unsavedNewListPreview'); // Clear invalid data (changed key)
                           // stopEditing(); // Ensure state is reset (not relevant now)
                     }
                 } catch (e) {
                    console.error("Failed to parse unsaved list preview from local storage:", e);
                     localStorage.removeItem('unsavedNewListPreview'); // Clear corrupted data (changed key)
                     // stopEditing(); // Ensure state is reset (not relevant now)
                 }
             } else {
                  // If no unsaved list, ensure inputs are clear and preview is empty
                  clearNewQuestionInputs(); // This clears name input
                  displayNewListPreview(); // Show empty preview
             }
         }

        // --- Export / Import Functions ---
        function exportSelectedList() {
            const listToExportName = questionListSelect.value;
            const listToExport = availableQuestionLists[listToExportName];

            if (!listToExport || !Array.isArray(listToExport) || listToExport.length === 0) {
                alert(`Please select a list with questions to export.`);
                importExportJsonTextarea.value = "";
                return;
            }

             // Check against the new sample list names
             if (listToExportName === 'basicGrammar' || listToExportName === 'advanceGrammar') {
                 alert(`Exporting built-in list: "${listToExportName}".`);
             } else {
                  alert(`Exporting user list: "${listToExportName}".`);
             }

            try {
                // Include the list name in the export JSON structure
                const exportData = {
                    name: listToExportName,
                    questions: listToExport
                };
                const listJson = JSON.stringify(exportData, null, 2); // Use null, 2 for pretty printing
                importExportJsonTextarea.value = listJson;
                importExportJsonTextarea.select(); // Select the text for easy copying

                alert(`JSON for list "${listToExportName}" is now in the text area below. Copy the text to save your list. You can also use "Import from File" on another device/browser with this JSON.`);

            } catch (e) {
                console.error("Error exporting list:", e);
                alert("Failed to export list. Check console for details.");
                importExportJsonTextarea.value = "Error exporting list.";
            }
        }

         function importListFromJson() {
            const jsonString = importExportJsonTextarea.value.trim();
            if (!jsonString) {
                alert("Please paste JSON data into the text area.");
                return;
            }

             try {
                const importedData = JSON.parse(jsonString);

                // Validation: Check if it's an object with 'name' (string) and 'questions' (array)
                if (typeof importedData !== 'object' || importedData === null ||
                    typeof importedData.name !== 'string' || importedData.name.trim() === '' ||
                    !Array.isArray(importedData.questions) || importedData.questions.length === 0)
                {
                    alert("Invalid JSON format. Expected an object with 'name' (string) and 'questions' (non-empty array).");
                    return;
                }

                const importedList = importedData.questions;
                let newListName = importedData.name.trim();


                // Validate the questions array content
                 const isValid = importedList.every(q =>
                     typeof q === 'object' && q !== null &&
                     typeof q.question === 'string' && q.question.length > 0 &&
                     Array.isArray(q.options) && q.options.length >= 2 &&
                     q.options.every(opt => typeof opt === 'string' && opt.length > 0) &&
                     typeof q.answerIndex === 'number' && q.answerIndex >= 0 && q.answerIndex < q.options.length
                     // explanation is optional, no need to check
                 );

                 if (!isValid) {
                     alert("Invalid question structure found in the JSON 'questions' array. Please check each item.");
                     return;
                 }

                // Check if the imported list name is a reserved name (using new sample names)
                 if (newListName === 'basicGrammar' || newListName === 'advanceGrammar') {
                      alert(`"${newListName}" is a reserved name. Please choose a different name when importing.`);
                      // Prompt for a new name here instead of cancelling
                      let tempName = prompt(`The imported list name "${newListName}" is reserved. Please enter a new name for this list:`);
                      if (tempName) {
                          newListName = tempName.trim();
                           if (newListName === 'basicGrammar' || newListName === 'advanceGrammar' || newListName === '') {
                               alert("Invalid new name. Import cancelled.");
                               return;
                           }
                       } else {
                           alert("Import cancelled. A valid name is required.");
                           return;
                       }
                 }


                // Check for name conflict after handling reserved names
                if (availableQuestionLists[newListName]) {
                     if (!confirm(`A list named "${newListName}" already exists. Do you want to overwrite it?`)) {
                         alert("Import cancelled.");
                         return;
                     }
                 }

                 // Set the imported list to the newQuestionList variable first
                 newQuestionList = importedList;
                 newListNameInput.value = newListName; // Put the name in the input
                 displayNewListPreview(); // Display the imported list in the preview

                 // Prompt user to save the imported list
                 alert(`List "${newListName}" loaded into preview. Review the questions and click "Save New List" to add it to your available lists.`);
                 importExportJsonTextarea.value = ""; // Clear the textarea

                 // We don't automatically save or select the list here.
                 // The user must click "Save New List" to confirm.
                 // questionListSelect.value = newListName; // Don't select automatically
                 // updateHighScoreDisplay(); // Don't update high score yet

             } catch (e) {
                console.error("Error importing list:", e);
                alert("Failed to import JSON data. Please check the format.");
             }
         }

         function importListFromFile(event) {
            const file = event.target.files[0];
            if (!file) {
                return; // User cancelled file selection
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const jsonString = e.target.result;
                importExportJsonTextarea.value = jsonString; // Put content in textarea
                importListFromJson(); // Trigger import from textarea
                importFileInput.value = ''; // Clear the file input after use
            };
            reader.onerror = (e) => {
                console.error("Error reading file:", e);
                alert("Error reading file. Please try again.");
                importFileInput.value = ''; // Clear the file input
            };

            reader.readAsText(file); // Read the file as text
         }


        // Initial load of question lists
        // loadQuestionLists(); // Already done above initialization
        // populateQuestionListSelect(); // Already done above initialization
