// --- Variable Declarations ---
        const wordListInput = document.getElementById('word-list');
        const startGameBtn = document.getElementById('start-game-btn');
        const inputArea = document.getElementById('input-area');
        const gameArea = document.getElementById('game-area');
        const timerAreaEl = document.getElementById('timer-area');
        const timerEl = document.getElementById('timer');
        const wordDisplayEl = document.getElementById('word-display');
        const optionsContainerEl = document.getElementById('options-container');
        const feedbackEl = document.getElementById('feedback');
        const nextWordBtn = document.getElementById('next-word-btn');
        const restartGameBtn = document.getElementById('restart-game-btn');
        const scoreEl = document.getElementById('score');
        const attemptNumberEl = document.getElementById('attempt-number');
        const totalAttemptsEl = document.getElementById('total-attempts');
        const timerDurationInput = document.getElementById('timer-duration');
        const hintAreaEl = document.getElementById('hint-area');
        const hintEl = document.getElementById('hint');
        const getHintBtn = document.getElementById('get-hint-btn');
        const savedListsSelect = document.getElementById('saved-lists');
        const saveListBtn = document.getElementById('save-list-btn');
        const saveListNameInput = document.getElementById('save-list-name');
        const loadListBtn = document.getElementById('load-list-btn');
        const deleteListBtn = document.getElementById('delete-list-btn');
        const practiceListButtons = document.querySelectorAll('.practice-list-btn');
        const customizeListOptionsDiv = document.getElementById('customize-list-options');
        const sampleListsDiv = document.querySelector('.sample-lists');
        const settingsAreaDiv = document.getElementById('settings-area');
        const highScoreAreaEl = document.getElementById('high-score-area');
        const highScoreEl = document.getElementById('high-score');

        let correctWords = [];
        let gameWords = [];
        let currentWordData = {};
        let score = 0;
        let currentAttempt = 0;
        const MIN_WORD_LENGTH_FOR_MISSPELLING = 5;
        let timeLeft;
        let timerInterval;
        let hintUsed = false;
        const HIGH_SCORE_STORAGE_KEY = 'misspellingHighScore';

        // Practice word lists
        const commonMisspellings = [
            "abandon","abdomen","abductor","description","detain","detention","abet","abortion","absence","deterrent","detonator","development","absolutely","accelerate","acceptance","deviant","deviation","diabetes","access","accessory","accidental","diagonal","diarrhoea","dilemma","accommodate","accomplice","accosted","disagreeable","discrepancy","discriminate","accused","acetylene","acknowledge","dispatcher","disposition","divulge","acquit","acquittal","adjourn","domicile","dominant","drunkenness","admissible","adolescent","adversary","duress","dynamite","dysfunction","affidavit","aggravate","aisle","alcohol","alias","alibi","earnest","efficient","electrocution","Alzheimer's","amalgamation","ambulance","elicit","eligible","eliminate","amended","ammunition","among","embezzle","eminent","enforceable","amphetamine","analyse","annual","entirely","environment","epileptic","anonymous","antiseptic","aorta","equestrian","equivalent","erractic","apparatus","apparent","appearance","escalator","espoinage","ethical","appellant","apprehended","appropriate","evangelist","evidence","exaggerate","arraignment","arrangement","arrears","excessive","excite","execution","arson","artifact","asphyxiate","exhausted","exhibit","extenuating","assailant","assassin","assessment","external","extradited","extremely","assistant","asthma","attachment","attest","attorney","audible","facility","fallacy","falsify","autopsy","auxiliary","fatality","felon","fictitious","flexible","forceps","forcible","bail","bailiff","balaclava","forehead","foreign","forensic","ballistics","barbiturate","barrel","formula","fraudelent","fugitive","barricade","barrister","battalion","bayonet","bazaar","beginning","gambling","gauge","genuine","belligerent","beneficiary","bias","geriatric","gonorrhoea","gouge","bludgeon","bona","fida","boulevard","government","graffitti","grievance","brilliant","bruise","bulletin","grievous","grudge","guarantee","burglarize","business","bystander","guerilla","gymnasium","cadaver","caffeine","calendar","habitual","hallucinate","handcuff","calibre","campaign","cancel","harass","harbour","hazard","canine","cannabis","saliva","capable","hazardous","heroin","homicidal","cardiac","cartridge","cassette","homicide","horizontal","hostile","casualties","category","Caucasian","hygiene","hypodermic","hysteria","censor","changeable","chattel","hysterical","hallucinogen","circumstantial","citation","civilian","cocaine","coerce","cognisance","identical","ideology","illegitimate","coincidence","collateral","colleague","illicit","illustrate","immediate","collusion","comatose","commission","immigrant","imminent","impediment","commitment","committee","compel","impostor","inadmissible","incapable","competent","complainant","complicity","incapacitate","incarcerate","incendiary","conceive","concurrent","condemn","incessant","incite","incoherent","confidential","confiscate","conjugal","inconspicuous","incorrigible","incriminate","consciousness","consensus","conspicuous","indecent","indictment","indispensable","conspirator","constitutional","contagious","inevitable","infanticide","informant","contempt","contraband","contraceptive","infringement","ingenious","initiate","controversy","conviction","convulsion","injunction","inoculate","insolent","coroner","corpse","correspondence","institute","insufficient","interpreter","corroborate","counterfeit","courteous","interrogate","intoxicate","investigator","credibility","cremate","culprit","irrelevant","irresistible","itinerary","custody","cylinder","jamb","jealous","jeopardy","data","base","decapitated","deceased","jewellery","judicial","jurisdiction","decision","defendant","deferred","delegate","deliberate","delinquent","khaki","kidnap","kidnapper","dependant","dependent","descend","kleptomania","knife","knowledge","laboratory","laceration","language","sabotage","sacrifice","salvage","larceny","legislate","legitimate","scenario","schedule","scheme","lenient","liability","liaison","schizophrenic","seize","seniority","libellous","librarian","licentious","sentence","separation","sequence","lien","litigant","lucid","sequester","sergeant","serial","severance","sheriff","magazine","magistrate","maintain","siege","silhouette","simultaneous","malice","malign","management","skeleton","sociopath","solicit","mandatory","manila","manipulate","solicitor","soluble","specimen","manoeuvre","marijuana","massacre","spectator","spontaneous","strenuous","measurements","median","mediation","subpoena","suffocate","suicide","memorandum","menace","methadone","suppress","surrogate","surveillance","mileage","militia","minor","susceptible","suspect","suspension","miscarriage","miscellaneous","misdemeanour","suspicious","symmetrical","symptom","misspelled","mitigating","moccasin","synagogue","syphilis","syringe","monotonous","moratorium","morgue","mortal","mortgage","mortuary","mucous","municipal","mutilate","tactical","tariff","tattoo","muzzle","taut","technique","temperament","tendency","terrorism","testify","narcotics","necessary","negative","testimony","thief","toboggan","negligence","negotiate","neighbour","torture","tournament","trajectory","neutral","nominal","notary","tranquillizer","trauma","trespass","notorious","nuclear","nuisance","truancy","truly","nullify","ultimatum","umbrella","unanimous","obedient","obligation","obscenity","uncooperative","unlawful","unmistakable","occasion","occult","occupant","urinate","useful","utility","occurrence","official","omission","utilize","opponent","ordinance","orient","orthodox","vacuum","vagrancy","validate","vandal","variance","vehicle","parachute","paraffin","parallel","vein","velocity","venereal","paramedic","paraphernalia","pavilion","vengeance","verdict","verify","pedestrian","penitentiary","permissible","version","veterinarian","vicious","persistent","personal","personnel","vigilante","violation","violence","pertinent","phallic","physician","vicinity","viscous","visible","plaintiff","playwright","polygraph","volatile","voluntary","voucher","positive","possession","potential","precede","preliminary","premises","waiver","warrant","weapon","prescription","priority","probable","wedge","wholesale","wiretap","procedure","proceed","prohibition","withdrawal","witness","worship","projectile","prominent","propeller","wound","prophylactic","prosecute","prosecutor","protester","Xray","Xerox","psilocybin","psychiatrist","psychopathic","punitive","pursue","pyromaniac","yacht","yield","youth","quadrant","quadriplegic","quarantine","zealot","zinc","zircon","quarrel","query","questionnaire","quinine","quotation","rabies","racketeer","reasonable","receipt","receding","recidivist","recognizance","recommend","reconcile","reconnaissance","reformatory","refute","reinforcement","relevant","religious","relinquish","remission","rendezvous","repeal","representative","reprieve","rescue","resident","residue","respiration","restaurant","resuscitate","ricochet","ritual","routine","absence","accommodate","accommodation","achieve","across","aggressive","apparently","appearance","argument","assassination","basically","beginning","believe","business","calendar","Caribbean","category","cemetery","colleague","coming","committee","completely","conscience","conscious","copyright","curiosity","definitely","disappear","disappoint","ecstasy","embarrass","environment","existence","familiar","finally","fluorescent","foreign","forty","forward","friend","further","glamorous","government","grammar","gauge","grateful","guard","happened","harass","harassment","honorary","humorous","immediately","incidentally","independent","interrupt","irresistible","knowledge","lightning","medicine","millennium","millennia","misspell","necessary","noticeable","occasion","occurred","occurring","occurrence","parallel","persistent","Philippines","piece","politician","possession","preferred","preferring","privilege","pronunciation","publicly","really","receive","referred","referring","religious","remember","resistance","sense","separate","successful","surprise","tendency","therefore","threshold","tomorrow","tongue","truly","unforeseen","unfortunately","until","vicious","weird","wherever","weather","whether","which","a lot","absence","accommodate","achieve","acquire","address","advice","almost","apparent","arctic","argument","atheist","athlete","awful","becoming","beginning","believe","business","calendar","category","ceiling","cemetery","changeable","chief","collectible","column","coming","committed","conscience","conscious","consensus","coolly","deceive","definitely","desperate","difference","dilemma","disappoint","disastrous","discipline","embarrassment","equipment","exceed","exercise","exhilarate","existence","experience","fascinating","fiery","fluorescent","foreign","forward","friend","gauge","government","grateful","guarantee","guidance","harass","height","hierarchy","humorous","ignorance","immediately","independent","indispensable","inoculate","intelligence","jealous","jewelry","judgment","knowledge","leisure","liaison","library","license","maintenance","mathematics","medieval","memento","millennium","miniature","miniscule","mischievous","misspell","mysterious","necessary","neighbor","noticeable","nuclear","occasionally","occurrence","omission","original","pastime","perceive","perseverance","personally","personnel","piece","playwright","possession","precede","prejudice","presence","privilege","professor","promise","pronunciation","proof","publicly","questionnaire","quiet","quit","quite","really","recommend","reference","referred","relevant","religious","repetition","restaurant","rhyme","rhythm","scissors","secretary","separate","sergeant","shining","similar","sincerely","speech","successful","supersede","surely","surprise","therefore","thorough","through","truly","twelfth","tyranny","until","using","vacuum","weird","withhold","writing"
        ];
        const difficultWords = [
            "Abrogate","Abscond","Abstemious","Accoutrements","Adjudicate","Admonish","Adroit","Adulterate","Adventitious","Adversary","Advocacy","Aegis","Affluent","Alacrity","Alienate","Allay","Allocate","Allude","Amalgamate","Amenable","Anachronism","Anathema","Anecdote","Anomalous","Antecedent","Antipathy","Antithesis","Aplomb","Apocryphal","Apostasy","Apothegm","Appellation","Arbitrary","Arduous","Arrears","Artifice","Ascetic","Asperity","Assiduous","Assuage","Atavistic","Attenuate","Audacious","Auspicious","Austere","Autocratic","Aver","Avocation","Axiomatic","Baleful","Banal","Bellicose","Bemuse","Benign","Bequeath","Berate","Beseech","Besmirch","Biennial","Blithe","Bombastic","Bourgeois","Bovine","Brusque","Bucolic","Bumptious","Bureaucracy","Burgeon","Cacophony","Cajole","Calamity","Callous","Calumny","Capricious","Castigate","Catharsis","Caustic","Cavalier","Cavil","Celerity","Censure","Chagrin","Charlatan","Chary","Chicanery","Chimerical","Choleric","Circumlocution","Circumscribe","Circumspect","Clandestine","Clemency","Coalesce","Cogent","Cognizant","Colloquial","Commensurate","Compendium","Complaisant","Concomitant","Conflagration","Confound","Congenial","Congruent","Connive","Connoisseur","Consanguineous","Consummate","Contiguous","Contrite","Contumacious","Corpulent","Corroborate","Coterie","Covert","Covetous","Craven","Credulous","Crenellated","Cryptic","Culpable","Cupidity","Curmudgeon","Curtail","Cynical","Dearth","Debacle","Debauchery","Debilitate","Defacto","Deign","Deleterious","Delirium","Delineate","Demeanor","Demure","Denigrate","Deprecate","Derelict","Desiccate","Desuetude","Desultory","Deter","Detrimental","Devoid","Dexterity","Diaphanous","Diffident","Digress","Dilapidated","Dilatory","Dilettante","Dirge","Discomfit","Disconcert","Disconsolate","Discursive","Disparage","Disparate","Dissimulate","Dissolute","Dissonance","Distraught","Divulge","Dogmatic","Dolorous","Draconian","Droll","Duplicity","Ebullient","Eclectic","Edify","Effete","Efficacy","Effigy","Effrontery","Egregious","Elegy","Elicit","Emaciated","Embellish","Emollient","Empirical","Encomium","Endemic","Enervate","Enigmatic","Ennui","Enormity","Ephemeral","Epitome","Equanimity","Equivocate","Eradicate","Erudite","Eschew","Esoteric","Espouse","Evanescent","Evince","Exacerbate","Exasperate","Excoriate","Exculpate","Exigent","Exonerate","Exorbitant","Expedient","Expunge","Extemporaneous","Extirpate","Extol","Extradite","Extraneous","Extricate","Facetious","Fallacious","Fastidious","Fatuous","Feasible","Fecund","Felicitous","Feral","Fetid","Fetter","Fiasco","Fickle","Filial","Flagrant","Flippant","Florid","Flout","Foible","Foment","Fortuitous","Fractious","Frenetic","Frivolous","Frugal","Fulminate","Furtive","Futile","Garrulous","Gauche","Genial","Gerrymander","Gesticulate","Gregarious","Grievous","Grotesque","Hackneyed","Halcyon","Hapless","Harangue","Hedonism","Hegemony","Heinous","Heresy","Hermetic","Hiatus","Histrionic","Holistic","Homage","Hubris","Humility","Idiosyncrasy","Ignominious","Illicit","Imbroglio","Imminent","Immutable","Impassive","Impecunious","Impede","Impenitent","Imperious","Impervious","Impetuous","Impinge","Implacable","Implausible","Impregnable","Impromptu","Impugn","Impute","Inadvertent","Inane","Inarticulate","Incandescent","Incendiary","Incessant","Inchoate","Incipient","Incongruous","Inconsequential","Indefatigable","Indelible","Indigent","Indolent","Indubitable","Ineffable","Ineluctable","Inept","Inert","Inexorable","Infamous","Infinitesimal","Ingenuous","Inherent","Inimical","Iniquity","Insidious","Insipid","Insolent","Insouciant","Instigate","Intangible","Intemperate","Interdict","Interpolate","Intransigent","Intrepid","Intrinsic","Inundate","Invective","Inveterate","Irascible","Iridescent","Irksome","Irony","Irrefragable","Irrevocable","Jaundiced","Jejune","Jettison","Jingoism","Jocose","Jocular","Judicious","Juxtapose","Ken","Kinetic","Knave","Kudos","Labile","Lachrymose","Laconic","Laggard","Lambent","Lampoon","Languid","Lassitude","Latent","Laudable","Lax","Lecherous","Legerdemain","Lenient","Lethargic","Levity","Lexicon","Libel","Libertarian","Licentious","Limpid","Lineage","Lissome","Loquacious","Lucid","Lugubrious","Luminary","Lurid","Machiavellian","Maelstrom","Magnanimous","Malevolent","Malinger","Maudlin","Maverick","Mawkish","Meager","Mellifluous","Mendacious","Mendicant","Mercurial","Meretricious","Meticulous","Mettle","Mien","Milieu","Minatory","Misanthrope","Mitigate","Modicum","Mollify","Moratorium","Mordant","Morose","Motley","Mundane","Munificent","Myriad","Nadir","Nascent","Nebulous","Nefarious","Neophyte","Nihilism","Nocturnal","Noisome","Nomenclature","Nonchalant","Nostalgia","Notorious","Novel","Noxious","Nuance","Nugatory","Obdurate","Obfuscate","Oblique","Obliterate","Obsequious","Obstreperous","Obtuse","Obviate","Occlude","Odious","Officious","Ogle","Olfactory","Oligarchy","Ominous","Omnipotent","Omniscient","Onomatopoeia","Onus","Opacity","Opine","Opprobrious","Ornate","Orthodox","Oscillate","Ostensible","Ostentatious","Ostracize","Overt","Palatable","Palliate","Paltry","Panacea","Pandemic","Panegyric","Paradox","Paragon","Pariah","Parity","Parochial","Parsimonious","Partisan","Paucity","Peccadillo","Pecuniary","Pedantic","Pellucid","Penchant","Penitent","Penurious","Peremptory","Perfidious","Perfunctory","Pernicious","Perspicacious","Pertinacious","Pertinent","Perturb","Peruse","Pervasive","Petulant","Philistine","Phlegmatic","Pillage","Pinnacle","Pious","Pique","Placate","Placid","Plagiarism","Platitude","Plethora","Pliable","Plumb","Poignant","Polemic","Ponderous","Portentous","Postulate","Pragmatic","Precarious","Precocious"
        ];

        // --- High Score Functions ---
        // Define High Score functions *before* they are called
        function loadHighScore() {
            const highScore = localStorage.getItem(HIGH_SCORE_STORAGE_KEY);
            highScoreEl.textContent = highScore ? parseInt(highScore, 10) : 0;
        }

        function saveHighScore(newScore) {
            const currentHighScore = parseInt(localStorage.getItem(HIGH_SCORE_STORAGE_KEY) || '0', 10);
            if (newScore > currentHighScore) {
                localStorage.setItem(HIGH_SCORE_STORAGE_KEY, newScore);
                loadHighScore(); // Update display
            }
        }
        // --- End High Score Functions ---

        // --- List Management Functions ---
        // Define loadSavedLists function *before* it is called
         function loadSavedLists() {
            savedListsSelect.innerHTML = '<option value="">-- Select a List --</option>';
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('wordList_')) { // Added check for valid key
                    const listName = key.substring(9);
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = listName;
                    savedListsSelect.appendChild(option);
                }
            }
        }
        // --- End List Management Functions ---


        // --- Initial Calls on Page Load ---
        // Call functions *after* they are defined
        loadSavedLists();
        loadHighScore();
        // --- End Initial Calls ---


        // --- Event Listeners ---
        // Save a word list - removed alert
        saveListBtn.addEventListener('click', () => {
            const listName = saveListNameInput.value.trim();
            const wordListText = wordListInput.value.trim();
            if (listName && wordListText) {
                const words = wordListText.split('\n').map(w => w.trim().toLowerCase()).filter(w => w.length >= 3);
                if (words.length > 0) {
                    localStorage.setItem(`wordList_${listName}`, JSON.stringify(words));
                    saveListNameInput.value = '';
                    // wordListInput.value = ''; // Optional: Clear input after saving
                    loadSavedLists(); // Reload dropdown to show new list
                     // Confirmation handled implicitly by list appearing in dropdown and no error
                } else {
                    // Keep alert for invalid input
                    alert("Please enter at least one valid word (min 3 characters) in the list to save.");
                }
            } else {
                 // Keep alert for empty name/list
                alert("Please enter a name to save the list as and the word list.");
            }
        });

        // Load a saved word list INTO INPUT AREA - removed alert
        loadListBtn.addEventListener('click', () => {
            const selectedKey = savedListsSelect.value;
            if (selectedKey) {
                const storedList = localStorage.getItem(selectedKey);
                if (storedList) {
                    const words = JSON.parse(storedList);
                    wordListInput.value = words.join('\n'); // Populate textarea
                     // Confirmation handled implicitly by text appearing in input area
                }
            } else {
                // Keep alert for no selection
                alert("Please select a list to load.");
            }
        });

        // Delete a saved word list - removed alert (moved confirmation to prompt)
        deleteListBtn.addEventListener('click', () => {
            const selectedKey = savedListsSelect.value;
            if (selectedKey) {
                const listName = savedListsSelect.options[savedListsSelect.selectedIndex].textContent;
                if (confirm(`Are you sure you want to delete the list "${listName}"?`)) {
                    localStorage.removeItem(selectedKey);
                    loadSavedLists();
                     // Confirmation handled implicitly by list disappearing from dropdown
                }
            } else {
                // Keep alert for no selection
                alert("Please select a list to delete.");
            }
        });

        // Load practice lists INTO INPUT AREA - removed alert
        practiceListButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const listType = this.dataset.list;
                let listToLoad = [];
                if (listType === 'common') {
                    listToLoad = commonMisspellings;
                } else if (listType === 'difficult') {
                    listToLoad = difficultWords;
                }
                wordListInput.value = listToLoad.join('\n'); // Populate textarea
                 // Confirmation handled implicitly by text appearing in input area
            });
        });

        startGameBtn.addEventListener('click', () => {
            const listText = wordListInput.value.trim();
            if (!listText) {
                alert("Please enter a word list or load a saved/practice list first.");
                return;
            }

            // Use the text from the input area to define correctWords
            correctWords = listText.split('\n').map(w => w.trim().toLowerCase()).filter(w => w.length >= 3);

            if (correctWords.length < 1) {
                alert("Please enter at least one valid word (min 3 characters).");
                return;
            }

            // Proceed to game
            inputArea.classList.add('hidden');
            customizeListOptionsDiv.classList.add('hidden');
            sampleListsDiv.classList.add('hidden');
            settingsAreaDiv.classList.add('hidden');
            startGameBtn.classList.add('hidden'); // Hide the Start Game button
            gameArea.classList.remove('hidden'); // Show game area
            restartGameBtn.classList.remove('hidden');
            highScoreAreaEl.classList.add('hidden'); // Hide high score during game

            startNewGame();
        });
        // --- End Event Listeners ---


        // --- Game Logic Functions ---
        function startNewGame() {
            score = 0;
            currentAttempt = 0;
            gameWords = shuffleArray([...correctWords]); // Use the list from input
            totalAttemptsEl.textContent = gameWords.length;
            updateScoreDisplay();
            nextWordBtn.classList.add('hidden');
            getHintBtn.classList.remove('hidden'); // Ensure hint button is visible at start of new word
            getHintBtn.disabled = false; // Enable hint button
            hintAreaEl.classList.add('hidden');
            hintUsed = false;
            timeLeft = parseInt(timerDurationInput.value, 10);
            displayNextQuestion(); // Calls the first question
        }

        function displayNextQuestion() {
            if (currentAttempt >= gameWords.length) {
                endGame();
                return;
            }
            const originalWord = gameWords[currentAttempt];
            currentAttempt++;
            attemptNumberEl.textContent = currentAttempt;

            const options = generateOptions(originalWord);
            currentWordData = {
                original: originalWord,
                options: options,
                correctAnswer: originalWord // Correct answer is always the original word
            };

            wordDisplayEl.textContent = "Choose the correct spelling:";
            renderOptions(options);
            feedbackEl.textContent = '';
            feedbackEl.className = '';
            nextWordBtn.classList.add('hidden');
            getHintBtn.classList.remove('hidden');
            getHintBtn.disabled = false; // Enable hint button for next word
            hintAreaEl.classList.add('hidden');
            hintUsed = false;
            startTimer();
        }

        function startTimer() {
            timeLeft = parseInt(timerDurationInput.value, 10);
            timerEl.textContent = timeLeft;
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                timeLeft--;
                timerEl.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    checkAnswer(null); // Time's up, treat as incorrect
                }
            }, 1000);
        }

        function generateOptions(correctWord) {
            const options = [{ text: correctWord, isCorrect: true }];
            const numIncorrectOptions = 3;
            const generatedMisspellings = new Set();
            generatedMisspellings.add(correctWord);

            // Generate incorrect options
            while (options.length < numIncorrectOptions + 1) {
                let misspell = '';
                let attempts = 0;
                // Try generating a misspell multiple times if it's the same as an existing option or too short
                do {
                     misspell = generateMisspelling(correctWord);
                     attempts++;
                } while ((generatedMisspellings.has(misspell) || misspell.length < 2) && attempts < 30); // Increased attempts slightly

                if (!generatedMisspellings.has(misspell)) {
                    options.push({ text: misspell, isCorrect: false });
                    generatedMisspellings.add(misspell);
                } else if (attempts >= 30) {
                     console.warn(`Could not generate enough unique, reasonable misspellings for "${correctWord}".`);
                     // Fallback: add a simple, guaranteed-different option if needed
                     if (options.length < numIncorrectOptions + 1) {
                         const simpleFallback = correctWord + 'z'; // Simple modification
                         if (!generatedMisspellings.has(simpleFallback)) {
                             options.push({ text: simpleFallback, isCorrect: false });
                             generatedMisspellings.add(simpleFallback);
                         } else {
                              options.push({ text: correctWord + 'x', isCorrect: false });
                              generatedMisspellings.add(correctWord + 'x');
                         }
                     }
                }
                 if (options.length === numIncorrectOptions + 1) break; // Stop if enough options generated
            }
            return shuffleArray(options);
        }

        // Simplified Misspelling Generation (Closer to original, but fixed)
        function generateMisspelling(word) {
            const len = word.length;
            if (len < 2) return word + 'a'; // Handle very short words

            let chars = word.split('');
            // Use a mix of simple error types
            const errorTypes = ['swap', 'remove', 'add', 'replace', 'double'];
            const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];

            try {
                const position = Math.floor(Math.random() * len); // Position for error

                if (errorType === 'swap' && len > 1) { // Swap adjacent
                    const i = Math.floor(Math.random() * (len - 1));
                    [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
                } else if (errorType === 'remove' && len > 1) { // Remove a letter
                    const i = Math.floor(Math.random() * len);
                    chars.splice(i, 1);
                } else if (errorType === 'add') { // Add a random letter
                    const i = Math.floor(Math.random() * (len + 1));
                    const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z
                    chars.splice(i, 0, randomLetter);
                } else if (errorType === 'replace' && len > 0) { // Replace a letter
                    const i = Math.floor(Math.random() * len);
                    let newLetter;
                    let replaceAttempts = 0;
                    do {
                        newLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                         replaceAttempts++;
                    } while (newLetter === chars[i] && len > 1 && replaceAttempts < 10); // Ensure it's a different letter with attempts
                    chars[i] = newLetter;
                } else if (errorType === 'double' && len > 0) { // Double a letter
                     const doublePos = Math.floor(Math.random() * len);
                     chars.splice(doublePos, 0, chars[doublePos]);
                }

            } catch (e) {
                console.error("Error during simple misspelling attempt:", e);
                return word + 'x'; // Fallback on error
            }

            let generated = chars.join('');

             // Basic check to ensure it's different from original and not drastically shorter
             let retryCount = 0;
             const maxRetries = 5;
             while ((generated === word || generated.length < Math.max(2, len - 2)) && retryCount < maxRetries) {
                 chars = word.split(''); // Reset to original
                 const retryErrorType = errorTypes[Math.floor(Math.random() * errorTypes.length)]; // Try a different random type
                 const retryPosition = Math.floor(Math.random() * chars.length);

                 try {
                      if (retryErrorType === 'swap' && chars.length > 1) {
                         const i = Math.floor(Math.random() * (chars.length - 1));
                         [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
                     } else if (retryErrorType === 'remove' && chars.length > 1) {
                         const i = Math.floor(Math.random() * chars.length);
                         chars.splice(i, 1);
                     } else if (retryErrorType === 'add') {
                         const i = Math.floor(Math.random() * (chars.length + 1));
                         const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                         chars.splice(i, 0, randomLetter);
                     } else if (retryErrorType === 'replace' && chars.length > 0) {
                         const i = Math.floor(Math.random() * chars.length);
                         let newLetter;
                         do {
                             newLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                         } while (newLetter === chars[i] && chars.length > 1);
                         chars[i] = newLetter;
                     } else if (retryErrorType === 'double' && chars.length > 0) {
                          const doublePos = Math.floor(Math.random() * chars.length);
                          chars.splice(doublePos, 0, chars[doublePos]);
                     }
                      generated = chars.join('');
                     retryCount++;

                 } catch(e) {
                     console.error("Error during misspelling retry:", e);
                     retryCount++; // Still increment to avoid infinite loop
                 }
             }

             // Final guaranteed change if still not different/long enough after retries
            if (generated === word || generated.length < Math.max(2, len - 2)) {
                 console.warn(`Fallback used for "${word}"`);
                 if (len < MIN_WORD_LENGTH_FOR_MISSPELLING) return word + 'y'; // Use a different letter
                 else return word + 'z'; // Another simple guaranteed change
             }


            return generated;
        }


        function renderOptions(options) {
            optionsContainerEl.innerHTML = '';
            options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.textContent = option.text;
                // Pass the isCorrect flag directly to checkAnswer
                button.addEventListener('click', () => checkAnswer(option.isCorrect));
                optionsContainerEl.appendChild(button);
            });
        }

        function checkAnswer(isCorrect) {
            clearInterval(timerInterval);
            const answerButtons = document.querySelectorAll('#options-container .option-button');
            answerButtons.forEach(button => {
                button.disabled = true; // Disable all buttons after an answer is selected or time is up
                if (button.textContent === currentWordData.correctAnswer) {
                    button.style.backgroundColor = '#a5d6a7'; // Highlight correct answer
                } else {
                     // Optionally highlight the user's incorrect choice if they clicked
                    button.style.backgroundColor = '#ef9a9a'; // Indicate incorrect options
                }
            });


            nextWordBtn.classList.remove('hidden'); // Show next button
            getHintBtn.classList.add('hidden'); // Hide hint button once answer is checked
            hintAreaEl.classList.add('hidden'); // Hide hint area


            if (isCorrect === true) {
                feedbackEl.textContent = "Correct!";
                feedbackEl.className = 'correct-feedback';
                score++;
            } else if (isCorrect === false) {
                feedbackEl.textContent = "Incorrect. The correct spelling was: " + currentWordData.correctAnswer;
                feedbackEl.className = 'incorrect-feedback';
            } else { // Time's up (isCorrect is null)
                feedbackEl.textContent = "Time's up! The correct spelling was: " + currentWordData.correctAnswer;
                feedbackEl.className = 'incorrect-feedback';
            }

            updateScoreDisplay();
            if (currentAttempt >= gameWords.length) {
                nextWordBtn.textContent = "Show Final Score";
            } else {
                 nextWordBtn.textContent = "Next Question"; // Reset text for subsequent questions
            }
        }

        nextWordBtn.addEventListener('click', () => {
            if (currentAttempt >= gameWords.length) {
                endGame();
            } else {
                displayNextQuestion();
            }
        });

        restartGameBtn.addEventListener('click', () => {
            clearInterval(timerInterval); // Stop timer on restart
            gameArea.classList.add('hidden');
            inputArea.classList.remove('hidden');
            customizeListOptionsDiv.classList.remove('hidden');
            sampleListsDiv.classList.remove('hidden');
            settingsAreaDiv.classList.remove('hidden');
            startGameBtn.classList.remove('hidden'); // Show the Start Game button again
            highScoreAreaEl.classList.remove('hidden'); // Show high score again
            wordListInput.value = ''; // Clear input area
            correctWords = []; // Clear current word list
            gameWords = []; // Clear game words
            score = 0; // Reset score
            currentAttempt = 0; // Reset attempt counter
            hintUsed = false; // Reset hint flag
            getHintBtn.disabled = false; // Enable hint button
             nextWordBtn.textContent = "Next Question"; // Reset next button text
             feedbackEl.textContent = ''; // Clear feedback
             feedbackEl.className = ''; // Clear feedback class
             wordDisplayEl.textContent = ''; // Clear word display
             optionsContainerEl.innerHTML = ''; // Clear options
             loadHighScore(); // Reload high score display
        });

        function endGame() {
            clearInterval(timerInterval); // Stop timer
            wordDisplayEl.textContent = "Game Over!";
            optionsContainerEl.innerHTML = ''; // Remove option buttons
            feedbackEl.innerHTML = `Your final score is ${score} out of ${gameWords.length}.`;
            feedbackEl.className = score >= gameWords.length / 2 ? 'correct-feedback' : 'incorrect-feedback'; // Simple pass/fail feedback color
            nextWordBtn.classList.add('hidden'); // Hide next button
            getHintBtn.classList.add('hidden'); // Hide hint button
            hintAreaEl.classList.add('hidden'); // Hide hint area

            saveHighScore(score); // Save score if it's a new high score
            highScoreAreaEl.classList.remove('hidden'); // Show high score again at the end
        }

        function updateScoreDisplay() {
            scoreEl.textContent = score;
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Event listener for pressing "Enter" for the next question
        document.addEventListener('keydown', function(event) {
            // Only trigger if game area is visible and next button is not hidden
            if (gameArea.classList.contains('hidden') || nextWordBtn.classList.contains('hidden')) {
                return;
            }
            if (event.key === 'Enter') {
                 event.preventDefault(); // Prevent default Enter key behavior (like submitting forms)
                nextWordBtn.click();
            }
        });

        // Hint functionality
        getHintBtn.addEventListener('click', () => {
            if (!hintUsed && currentWordData.original) {
                const hintText = generateHint(currentWordData.original);
                hintEl.textContent = hintText;
                hintAreaEl.classList.remove('hidden');
                hintUsed = true;
                getHintBtn.disabled = true; // Disable hint button after use
            }
        });

        function generateHint(word) {
            // Provide a simple hint, like showing the first few letters
            const hintLength = Math.min(3, Math.max(1, Math.floor(word.length / 3))); // Show at least 1, max 3, roughly 1/3rd
             if (word.length <= hintLength) return word; // Avoid "... " if word is too short
            return word.substring(0, hintLength) + "...";
        }

         // Removed getAdjacentKeys helper function