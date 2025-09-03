const Game = {
            // --- Elements ---
            elements: {
                itemListInput: document.getElementById('item-list'),
                itemListLabel: document.getElementById('item-list-label'),
                startGameBtn: document.getElementById('start-game-btn'),
                inputArea: document.getElementById('input-area'),
                gameArea: document.getElementById('game-area'),
                jumbledDisplayEl: document.getElementById('jumbled-display'),
                guessInput: document.getElementById('guess-input'),
                submitGuessBtn: document.getElementById('submit-guess-btn'),
                feedbackEl: document.getElementById('feedback'),
                nextItemBtn: document.getElementById('next-item-btn'),
                restartGameBtn: document.getElementById('restart-game-btn'),
                scoreEl: document.getElementById('score'),
                attemptNumberEl: document.getElementById('attempt-number'),
                totalAttemptsEl: document.getElementById('total-attempts'),
                hintBtn: document.getElementById('hint-btn'),
                hintTextEl: document.getElementById('hint-text'),
                gameModeSelect: document.getElementById('game-mode-select'),
                loadSampleWordsBtn1: null,
                loadSampleWordsBtn2: null,
                loadSampleSentencesBtn1: null,
                loadSampleSentencesBtn2: null,
                guessInputPlaceholder: document.getElementById('guess-input'),
                timerDisplayEl: document.getElementById('timer-display'),
                saveListBtn: document.getElementById('save-list-btn'),
                savedListsSelect: document.getElementById('saved-lists-select'),
                highScoreWordsEl: document.getElementById('hs-words'),
                highScoreSentencesEl: document.getElementById('hs-sentences'),
                deleteListBtn: document.getElementById('delete-list-btn'),
                // Add the new timer setting input
                timerSettingInput: document.getElementById('timer-setting'),
            },

            // --- State ---
            state: {
                originalItems: [],
                gameItems: [],
                currentItemIndex: 0,
                score: 0,
                hintUsedThisRound: false,
                currentMode: 'words',
                timerId: null,
                timeRemaining: 0,
                highScores: { words: 0, sentences: 0 },
                userLists: {},
                userTimePerItem: 30, // State variable for user-set time
            },

            // --- Constants ---
            CSS_CLASSES: {
                HIDDEN: 'hidden',
                CORRECT_FEEDBACK: 'correct-feedback',
                INCORRECT_FEEDBACK: 'incorrect-feedback',
                SENTENCE_MODE_DISPLAY: 'sentence-mode'
            },
            CONFIG: {
                // TIME_PER_ITEM: 30, // No longer a fixed constant
                MIN_WORD_LENGTH: 3,
                MAX_WORD_LENGTH: 15,
                MIN_SENTENCE_LENGTH: 6, // characters
                MIN_SENTENCE_WORDS: 2,
                LOCAL_STORAGE_HS_KEY: 'jumbleProHighScores',
                LOCAL_STORAGE_USER_LISTS_KEY: 'jumbleProUserLists'
            },


            // --- Sample Data (Updated with two lists per type) ---
            sampleData: {
                words: {
                    list1: [
                        "across","almost","always","animal","answer","appear","around","arrive","attack","behind","belong","better","bigger","bottle","bottom","branch","breath","bridge","bright","broken","busier","button","camera","campus","cancel","candle","cannot","canvas","career","carpet","carved","casino","castle","casual","celery","cellar","cement","center","change","charge","cheeks","cheers","cheese","cherry","chosen","church","cinema","circle","cities","clever","client","closer","coarse","coffee","collar","colony","column","combat","coming","commit","common","cooker","cookie","cooler","copper","corner","costly","cotton","county","couple","course","cousin","creamy","create","credit","crisis","critic","cruise","custom","cutter","damage","dancer","danger","darken","dealer","debate","decade","decent","decide","defeat","defend","define","degree","delete","demand","dental","depend","depict","deploy","derive","desert","design","desire","detail","detect","device","devote","dialog","differ","digest","dinner","direct","divide","doctor","dollar","domain","donate","donkey","double","dragon","drawer","driver","drowsy","during","duties","easily","eating","edible","editor","effect","effort","eighth","either","eldest","eleven","emerge","employ","enable","endure","engage","engine","enough","enroll","ensure","entire","entity","equals","equity","escape","escort","estate","esteem","ethnic","europe","evenly","exceed","except","excess","excite","excuse","expand","expect","expert","expire","export","expose","extend","extent","fabric","facial","facing","factor","fairly","fallen","family","famous","farmer","faster","father","favour","feeble","fellow","female","fiddle","fierce","figure","filled","filler","filter","finale","finger","finish","finite","firmer","fiscal","fisher","fitted","flavor","fleece","flight","flimsy","floral","flowed","flower","fluent","fluffy","flying","foible","folder","follow","fondly","footed","forbid","forest","forgot","formal","format","former","fossil","foster","fought","fourth","freeze","french","friend","fright","fringe","frisky","frolic","frozen","frugal","fuller","fumble","funded","fungal","funnel","future","gaiety","gained","galaxy","gallon","gamble","gaming","garage","garden","garlic","garter","gather","gayest","gemini","gender","genius","gentle","gently","getter","gifted","ginger","gladly","glance","glider","global","glossy","glowed","gluten","goblin","golden","gospel","gossip","govern","graded","grassy","gratis","gravel","grease","greasy","greedy","grimly","grocer","groove","grotto","ground","grouse","grower","grudge","guided","guilty","guitar","gulped","gutter","guyana","hacker","halted","hamlet","hammer","hamper","handle","hanger","harbor","harder","hardly"
                    ].join('\n'),
                    list2: [
                        "hatbox","hatred","having","hazard","headed","header","health","hearer","heated","heater","heaven","heeled","height","helium","helmet","helper","herbal","hereby","herein","heroic","hidden","hiding","higher","highly","hinted","hiring","hither","hockey","hollow","homely","honest","hooded","hooked","hopper","horror","hostel","hotdog","hotter","hourly","housed","howler","hugely","humane","humble","hunger","hungry","hunter","hybrid","hyphen","icicle","ignite","ignore","impact","import","impose","impure","income","indeed","indoor","induce","infant","infect","inform","inject","injure","injury","inlaid","insane","insect","insert","inside","insist","insult","insure","intact","intake","intend","intent","invade","invent","invest","invite","inward","iodine","ironic","italic","itself","jacket","jagged","jailer","jalopy","jasper","jersey","jigsaw","jockey","jogger","joyful","juggle","jumped","jumper","jungle","junior","junket","karate","kebabs","keenly","keeper","kennel","kernel","kettle","kibble","kidnap","kidney","killer","kimono","kinder","kindle","kindly","kingly","kitten","knight","kosher","kowtow","ladder","lagoon","landed","lapsed","larger","latest","lather","latter","launch","laurel","lavish","lawful","lawyer","laying","lazily","leader","league","leaner","ledger","leeway","legacy","legion","length","lessen","lesser","lesson","letter","levity","liable","lifted","likely","liking","linear","linger","lining","linked","liquid","liquor","listed","listen","litter","little","lively","living","lizard","loaded","loader","loaned","locate","locker","locket","lofted","logger","lonely","longer","looker","looper","looser","losing","lotion","louder","loudly","lounge","lovely","loving","lowest","lumber","lunged","lushly","luxury","magnet","maiden","mainly","making","malice","malign","mallet","mammal","manger","mangle","maniac","mantel","mantle","manual","manure","marble","margin","marine","market","maroon","marrow","martin","marvel","mascot","mashed","master","matrix","matron","matted","matter","mature","mayhem","meadow","meager","meaner","medium","medley","melody","melted","member","memoir","memory","menace","mental","mentor","merely","merger","meteor","method","metric","mewing","midday","middle","midway","mighty","mildew","mingle","minute","mirage","mirror","misery","misfit","missed","mister","mobile","modern","modest","modify","moment","monday","monkey","mopeds","morbid","mortal","mortar","mosaic","mosque","mostly","mother","motion","moving","mowing","muddle","muffin","mumble","murder","murmur","museum","muster","mutant","mutate","mutter","mutton","mutual","muzzle","myself","mystic","namely","napkin","nation","native","nausea","nearby","nearly","neatly","nebula","negate"
                    ].join('\n')
                },
                sentences: {
                    list1: [
                        "The cat is black.","I see a red car.",
"A big dog runs.",
"The sun is up.",
"My hat is blue.",
"Can I have a toy?",
"Look at the hen.",
"It is a small bug.",
"We like to hop.",
"The pig is fat.",
"One, two, three.",
"The ball is round.",
"I can sit.",
"She has a pen.",
"He has a cap.",
"The pot is hot.",
"A cub is in the den.",
"We see a jet.",
"The fan is on.",
"My cup is full.",
"The man has a map.",
"A rat ran by.",
"The box is big.",
"I like jam.",
"See the top spin.",
"The bed is soft.",
"Pat the cat.",
"A sad lad.",
"The log is wet.",
"Can you dig?",
"The mat is flat.",
"Zip the bag.",
"My leg is hurt.",
"A red dot.",
"The kid can jig.",
"Six pink pigs.",
"Ten tiny ants.",
"A blue bib.",
"The mug is new.",
"Rub the tub.",
"A wet wig.",
"The sun can set.",
"Tap the can.",
"A fun run.",
"The van is big.",
"A lit lamp.",
"Yes, I can.",
"No, it is not.",
"This is my mom.",
"That is my dad.",
"The sky is blue.",
"I love my pet.",
"The little green frog jumps high.",
"I like to eat sweet red apples.",
"My mom helps me tie my shoes.",
"We go to the big park to play.",
"Can you see the shiny yellow star?",
"The happy fish swims in the clear water.",
"I have a brand new blue bicycle.",
"She likes to draw funny animal pictures.",
"He can jump over the small puddle.",
"Let's play hide and seek together.",
"The brown bear sleeps in the cave.",
"My teacher reads us good stories.",
"I want to build a tall sandcastle.",
"The pretty butterfly has colorful wings.",
"What is your favorite color?",
"My brother has a fast toy car.",
"We see fluffy white clouds in the sky.",
"The farmer grows yummy vegetables.",
"I can count up to twenty.",
"The cat is sleeping on the soft rug.",
"My friend has a cute little puppy.",
"We sing happy songs in music class.",
"The school bus is big and yellow.",
"I help my dad wash the car.",
"She wears a pink dress to the party.",
"The moon comes out at night.",
"He found a smooth, grey rock.",
"We eat popcorn when we watch movies.",
"The old tree has many green leaves.",
"I love to drink cold chocolate milk.",
"The tiny mouse ran very fast.",
"Can I have another piece of cake?",
"We learn new words every day.",
"The bright sun warms the earth.",
"My teddy bear is soft and cuddly.",
"She helps her mom set the table.",
"He likes to play with building blocks.",
"The bird built a nest in the tree.",
"I can write my name neatly.",
"We saw a rainbow after the rain.",
"The squirrel gathers nuts for winter.",
"My shoes are on the wrong feet",
"The baby bird is learning to fly.",
"We went to the store to buy bread.",
"He shared his crayons with me.",
"The flower smells very sweet.",
"I put my toys away in the box.",
"The train goes choo-choo on the tracks.",
"She can ride her scooter quickly.",
"We clap our hands to the music.",
"The ducklings follow their mother.",
"I lost my red crayon.",
"He is my best friend at school.",
"The fluffy white kitten played happily with a bright red yarn ball.",
"We saw many beautiful, colorful flowers and buzzing bees in the large, green garden.",
"My best friend and I love to build tall, sturdy towers with wooden blocks.",
"The noisy yellow bus takes us to school promptly every morning.",
"I am very happy today because it is my special birthday.",
"She carefully and neatly wrote her full name on the lined paper.",
"The brave, strong knight fought the fierce, fire-breathing dragon.",
"We ate delicious, warm cookies and drank cold, fresh milk for a snack.",
"He can ride his shiny new bicycle very fast without any help.",
"The tiny stars shine brightly in the vast, dark night sky.",
"The playful puppy chased its tail, so we all laughed.",
"I wanted to go outside, but it started to rain heavily.",
"You can have an apple or a banana for your healthy snack.",
"The wise old owl hooted softly from the tall oak tree.",
"My little sister drew a picture of a smiling sun and a happy cloud.",
"We quietly listened while the teacher read an exciting adventure story.",
"He quickly ran to the window when he heard the ice cream truck.",
"The busy ants worked together to carry the big crumb.",
"She wore a lovely blue dress and shiny silver shoes to the party.",
"The clever monkey easily peeled the yellow banana.",
"I helped my mom water the thirsty plants in our pretty backyard.",
"The fast cheetah can run quicker than any other land animal.",
"We are learning about different shapes, like circles, squares, and triangles.",
"The cold wind blew strongly, so we buttoned our warm coats.",
"He found a shiny, smooth pebble on the sandy beach.",
"My brother built an amazing spaceship with his colorful Lego bricks.",
"The gentle rain tapped softly against the window pane.",
"She sings sweetly in the school choir and practices every day.",
"The curious cat slowly crept towards the mysterious box.",
"We can go to the library or play board games this afternoon.",
"The hungry caterpillar ate many green leaves.",
"I like chocolate ice cream, but my sister prefers vanilla.",
"The friendly baker gave us an extra warm pretzel.",
"The red car stopped suddenly at the traffic light.",
"She carefully painted a picture of a beautiful sunset.",
"He shouted loudly when he won the exciting game.",
"The little boat sailed smoothly across the calm blue lake.",
"We packed sandwiches and juice for our fun picnic.",
"The old, creaky door opened slowly.",
"I was tired, so I went to bed early.",
"You can choose the red crayon or the blue one.",
"The diligent student always completes her homework neatly.",
"The playful dolphins leaped gracefully out of the sparkling water.",
"He searched everywhere for his lost, favorite toy soldier.",
"The colourful parrot repeated the funny words we taught it.",
"I brushed my teeth carefully before going to sleep.",
"The brave firefighter quickly climbed the tall ladder.",
"We will visit the museum and the art gallery on our trip.",
"The shy little girl whispered her answer softly.",
"The big, juicy watermelon was very refreshing on a hot day.",
"He could not find his shoes, so his mom helped him look.",
"She is a kind girl, and she always shares her toys.",
"The train was late, but we waited patiently."
                    ].join('\n'),
                     list2: [
                        "Yesterday, our entire class went on an exciting and educational field trip to the city zoo.",
"The incredibly curious monkey was swinging playfully from tree to tree in its large enclosure.",
"I will bring my favorite illustrated storybook to share with everyone during reading time tomorrow.",
"She carefully measured all the ingredients before she started baking a delicious chocolate cake for the party.",
"The strong, gusty wind blew the colorful autumn leaves off the tall trees in the park.",
"He is currently learning to play the acoustic guitar and practices his chords diligently every evening.",
"They are enthusiastically building a fantastic, detailed sandcastle on the sunny, crowded beach.",
"Last week, we learned about the different planets in our vast solar system and their unique characteristics.",
"The clever, quick-witted fox easily outsmarted the hungry, determined wolf in the dense forest.",
"My wonderful family and I will visit my beloved grandparents who live in the countryside next weekend.",
"Because it was a beautiful day, we decided to have our lunch outside in the garden.",
"The students listened attentively while the scientist explained how volcanoes erupt.",
"If you practice regularly, your musical skills will certainly improve a lot.",
"The brave explorers discovered an ancient map hidden inside a dusty, old chest.",
"She felt extremely proud when she finally completed the challenging 1000-piece jigsaw puzzle.",
"The historical museum displayed many fascinating artifacts from ancient civilizations.",
"He enjoys reading fictional adventure stories because they transport him to different worlds.",
"We are planning to organize a surprise birthday party for our best friend next Saturday.",
"The dedicated gardener watered the plants regularly, so they grew healthy and strong.",
"The playful dolphins leaped gracefully through the waves as our boat sailed by.",
"My older sister taught me how to ride my bicycle without training wheels last summer.",
"The community will hold a festival next month with music, food, and games for everyone.",
"The patient fisherman waited for hours before he finally caught a large fish.",
"When the alarm clock rang, I quickly jumped out of bed to get ready for school.",
"The diligent students are researching interesting facts about nocturnal animals for their project.",
"I accidentally dropped the glass, and it shattered into many tiny pieces on the floor.",
"The thoughtful boy helped the elderly woman carry her heavy grocery bags.",
"Next year, my family hopes to travel to a different country for our vacation.",
"The hardworking farmer woke up early to plow the fertile fields before sunrise.",
"She designed a colorful poster to advertise the upcoming school play.",
"If the weather remains pleasant, we will have a barbecue in the backyard.",
"The children giggled uncontrollably when the clown performed his silly tricks.",
"He wants to become an astronaut so he can explore the mysteries of outer space.",
"The recipe said to mix the flour and sugar before adding the wet ingredients.",
"We saw a magnificent eagle soaring high above the rugged mountain peaks.",
"She returned the library book on time because she didn't want to pay a fine.",
"The dedicated teacher always encourages her students to try their best.",
"The tiny seed will eventually grow into a tall, strong tree if it gets enough sunlight and water.",
"He solved the tricky math problem after thinking about it carefully for a long time.",
"The audience applauded enthusiastically after the spectacular musical performance ended.",
"My brother promised he would help me build my model airplane this afternoon.",
"She found a beautiful seashell while she was walking along the seashore.",
"We are learning about the importance of recycling to protect our environment.",
"The hungry bear searched for berries and honey in the vast forest.",
"I will write a thank-you note to my aunt for the lovely birthday present she sent.",
"The volunteers worked tirelessly to clean up the litter from the polluted beach.",
"Because the movie was very funny, we laughed throughout the entire show.",
"The construction workers are building a new bridge across the wide river.",
"She practiced her speech several times so she would feel confident presenting it.",
"The bright full moon illuminated the path as we walked home in the evening.",
"If you study hard for the test, you will likely understand the material better.",
"The resourceful squirrel hid its acorns in various places for the winter.",
"We enjoyed the delicious pizza, even though it was a little spicy.",
"Although it was raining quite heavily, we decided to proceed with our walk, equipped with sturdy umbrellas and waterproof jackets.",
"The dedicated, meticulous scientist conducted numerous complex experiments over several months to find a potential cure for the disease.",
"Learning new and challenging vocabulary words consistently helps to significantly improve your overall reading comprehension and communication skills.",
"The mysterious, ancient map, which was found in a forgotten attic, supposedly showed the location of a hidden treasure buried on a remote island.",
"She was immensely proud of herself for successfully completing the incredibly challenging and intricate puzzle all by herself.",
"While the talented musician played a beautiful and melancholic melody on the grand piano, the captivated audience listened in complete silence.",
"It is critically important to consistently recycle paper, plastic, and glass materials to help protect our fragile global environment.",
"The brave, intrepid explorer journeyed courageously through dense, uncharted jungles and across wide, treacherous rivers for many weeks.",
"Ultimately, he discovered that genuinely helping other people in need made him feel truly happy and fulfilled.",
"If you study diligently and consistently for your exams, you will most likely achieve excellent and rewarding results.",
"Despite facing several unexpected setbacks, the determined team continued working tirelessly on their innovative project.",
"After school, the students often gather in the library to collaborate on their group assignments.",
"Because the weather forecast predicted sunshine, we planned a delightful picnic in the scenic local park.",
"The historical novel vividly described the daily lives of people living during the medieval period.",
"Before making an important decision, it is wise to consider all the possible consequences.",
"The eloquent speaker captivated the audience with her inspiring stories and powerful message.",
"Unless we take proactive measures to conserve water, we might face shortages in the future.",
"The geography lesson focused on the diverse cultures and unique traditions of various countries around the world.",
"Even though the hike was arduous, the breathtaking view from the mountain summit was worth the effort.",
"The resourceful inventor created a clever device that could solve a common household problem.",
"In order to understand the complex issue, we needed to research information from multiple reliable sources.",
"The compassionate students organized a fundraiser to support the local animal shelter and its inhabitants.",
"Whenever I read a compelling mystery novel, I try to guess the ending before I reach it.",
"The ancient ruins, discovered deep within the jungle, offered clues about a long-lost civilization.",
"To prepare for the upcoming debate, each team member researched different aspects of the topic thoroughly.",
"The meteorologist explained how different weather patterns are formed and how they affect our climate.",
"Although he was initially nervous, he delivered his presentation confidently and clearly.",
"The community garden provides fresh fruits and vegetables for many local families throughout the year.",
"Since she had practiced diligently, her performance in the music recital was outstanding.",
"The art exhibition showcased an impressive collection of paintings and sculptures from various contemporary artists.",
"In addition to studying history, he was also fascinated by archaeology and ancient artifacts.",
"The determined athlete trained rigorously every day, hoping to qualify for the national championships.",
"While exploring the old bookstore, I stumbled upon a rare first edition of my favorite novel.",
"It is essential for citizens to participate in democratic processes, such as voting in elections.",
"The wildlife photographer patiently waited for hours to capture the perfect shot of the elusive snow leopard.",
"Because of the heavy snowfall, many schools in the region were closed for the day.",
"The biography detailed the incredible life journey of a famous inventor and her groundbreaking discoveries.",
"If we all work together, we can make a significant positive impact on our local community.",
"The curious students asked many insightful questions after the guest speaker's informative presentation.",
"Despite the initial difficulties, they persevered and eventually achieved their ambitious goal.",
"The national park offers numerous hiking trails, ranging from easy walks to challenging climbs.",
"Before the invention of the printing press, books were painstakingly copied by hand.",
"The investigative journalist uncovered important information that led to significant reforms.",
"Unless everyone cooperates, it will be difficult to solve this complex environmental problem effectively.",
"The historical society is dedicated to preserving and sharing the rich heritage of our town.",
"As the storm approached, the sky grew darker, and the wind began to howl ominously.",
"The charitable organization provides essential resources and support to families in need.",
"In conclusion, the evidence strongly suggests that regular exercise contributes to overall well-being.",
"The young inventor showcased her ingenious creation at the annual science fair, impressing the judges.",
"While some people prefer fiction, others find non-fiction books to be more engaging and informative.",
"The archaeological team carefully excavated the site, hoping to unearth ancient tools and pottery.",
"Considering the amount of evidence, the jury found it difficult to reach a unanimous verdict.",
"If we want to preserve biodiversity, we must protect the natural habitats of endangered species.",
"Although it was raining quite heavily, we decided to proceed with our walk, equipped with sturdy umbrellas and waterproof jackets.",
"The dedicated, meticulous scientist conducted numerous complex experiments over several months to find a potential cure for the disease.",
"Learning new and challenging vocabulary words consistently helps to significantly improve your overall reading comprehension and communication skills.",
"The mysterious, ancient map, which was found in a forgotten attic, supposedly showed the location of a hidden treasure buried on a remote island.",
"She was immensely proud of herself for successfully completing the incredibly challenging and intricate puzzle all by herself.",
"While the talented musician played a beautiful and melancholic melody on the grand piano, the captivated audience listened in complete silence.",
"It is critically important to consistently recycle paper, plastic, and glass materials to help protect our fragile global environment.",
"The brave, intrepid explorer journeyed courageously through dense, uncharted jungles and across wide, treacherous rivers for many weeks.",
"Ultimately, he discovered that genuinely helping other people in need made him feel truly happy and fulfilled.",
"If you study diligently and consistently for your exams, you will most likely achieve excellent and rewarding results.",
"Despite facing several unexpected setbacks, the determined team continued working tirelessly on their innovative project.",
"After school, the students often gather in the library to collaborate on their group assignments.",
"Because the weather forecast predicted sunshine, we planned a delightful picnic in the scenic local park.",
"The historical novel vividly described the daily lives of people living during the medieval period.",
"Before making an important decision, it is wise to consider all the possible consequences.",
"The eloquent speaker captivated the audience with her inspiring stories and powerful message.",
"Unless we take proactive measures to conserve water, we might face shortages in the future.",
"The geography lesson focused on the diverse cultures and unique traditions of various countries around the world.",
"Even though the hike was arduous, the breathtaking view from the mountain summit was worth the effort.",
"The resourceful inventor created a clever device that could solve a common household problem.",
"In order to understand the complex issue, we needed to research information from multiple reliable sources.",
"The compassionate students organized a fundraiser to support the local animal shelter and its inhabitants.",
"Whenever I read a compelling mystery novel, I try to guess the ending before I reach it.",
"The ancient ruins, discovered deep within the jungle, offered clues about a long-lost civilization.",
"To prepare for the upcoming debate, each team member researched different aspects of the topic thoroughly.",
"The meteorologist explained how different weather patterns are formed and how they affect our climate.",
"Although he was initially nervous, he delivered his presentation confidently and clearly.",
"The community garden provides fresh fruits and vegetables for many local families throughout the year.",
"Since she had practiced diligently, her performance in the music recital was outstanding.",
"The art exhibition showcased an impressive collection of paintings and sculptures from various contemporary artists.",
"In addition to studying history, he was also fascinated by archaeology and ancient artifacts.",
"The determined athlete trained rigorously every day, hoping to qualify for the national championships.",
"While exploring the old bookstore, I stumbled upon a rare first edition of my favorite novel.",
"It is essential for citizens to participate in democratic processes, such as voting in elections.",
"The wildlife photographer patiently waited for hours to capture the perfect shot of the elusive snow leopard.",
"Because of the heavy snowfall, many schools in the region were closed for the day.",
"The biography detailed the incredible life journey of a famous inventor and her groundbreaking discoveries.",
"If we all work together, we can make a significant positive impact on our local community.",
"The curious students asked many insightful questions after the guest speaker's informative presentation.",
"Despite the initial difficulties, they persevered and eventually achieved their ambitious goal.",
"The national park offers numerous hiking trails, ranging from easy walks to challenging climbs.",
"Before the invention of the printing press, books were painstakingly copied by hand.",
"The investigative journalist uncovered important information that led to significant reforms.",
"Unless everyone cooperates, it will be difficult to solve this complex environmental problem effectively.",
"The historical society is dedicated to preserving and sharing the rich heritage of our town.",
"As the storm approached, the sky grew darker, and the wind began to howl ominously.",
"The charitable organization provides essential resources and support to families in need.",
"In conclusion, the evidence strongly suggests that regular exercise contributes to overall well-being.",
"The young inventor showcased her ingenious creation at the annual science fair, impressing the judges.",
"While some people prefer fiction, others find non-fiction books to be more engaging and informative.",
"The archaeological team carefully excavated the site, hoping to unearth ancient tools and pottery.",
"Considering the amount of evidence, the jury found it difficult to reach a unanimous verdict.",
"If we want to preserve biodiversity, we must protect the natural habitats of endangered species."

                    ].join('\n')
                }
            },

            // --- Initialization ---
            init() {
                this.elements.startGameBtn.addEventListener('click', () => this.startGame());
                this.elements.submitGuessBtn.addEventListener('click', () => this.handleGuess(false));

                this.elements.guessInput.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        if (!this.elements.submitGuessBtn.disabled) {
                            this.handleGuess(false);
                        } else if (!this.elements.nextItemBtn.classList.contains(this.CSS_CLASSES.HIDDEN) && !this.elements.nextItemBtn.disabled) {
                             this.moveToNextItem();
                        }
                    }
                });

                this.elements.nextItemBtn.addEventListener('click', () => this.moveToNextItem());
                this.elements.restartGameBtn.addEventListener('click', () => this.resetToInputArea());
                this.elements.hintBtn.addEventListener('click', () => this.showHint());

                this.elements.loadSampleWordsBtn1 = document.getElementById('load-sample-words-1');
                this.elements.loadSampleWordsBtn2 = document.getElementById('load-sample-words-2');
                this.elements.loadSampleSentencesBtn1 = document.getElementById('load-sample-sentences-1');
                this.elements.loadSampleSentencesBtn2 = document.getElementById('load-sample-sentences-2');

                this.elements.loadSampleWordsBtn1.addEventListener('click', () => this.loadSample('words', 'list1'));
                this.elements.loadSampleWordsBtn2.addEventListener('click', () => this.loadSample('words', 'list2'));
                this.elements.loadSampleSentencesBtn1.addEventListener('click', () => this.loadSample('sentences', 'list1'));
                this.elements.loadSampleSentencesBtn2.addEventListener('click', () => this.loadSample('sentences', 'list2'));


                this.elements.saveListBtn.addEventListener('click', () => this.saveCurrentList());
                this.elements.savedListsSelect.addEventListener('change', (e) => this.loadSavedList(e.target.value));
                this.elements.deleteListBtn.addEventListener('click', () => this.deleteSelectedList());

                this.loadHighScores();
                this.loadUserLists();
                this.updateInputAreaUIForMode();
                this.showRestartButton();
            },

            // --- Game Flow & Mode ---
            updateInputAreaUIForMode() {
                this.state.currentMode = this.elements.gameModeSelect.value;
                 if (this.state.currentMode === 'words') {
                    this.elements.itemListLabel.textContent = `Enter your word list (one word per line, ${this.CONFIG.MIN_WORD_LENGTH}-${this.CONFIG.MAX_WORD_LENGTH} letters):`;
                    this.elements.itemListInput.placeholder = "e.g.,\nplanet\nobserve\ncreative";
                    this.elements.guessInputPlaceholder.placeholder = "Your word guess...";
                } else {
                    this.elements.itemListLabel.textContent = `Enter your sentence list (one sentence per line, min ${this.CONFIG.MIN_SENTENCE_WORDS} words):`;
                    this.elements.itemListInput.placeholder = "e.g.,\nThe quick brown fox.\nPractice makes perfect.";
                     this.elements.guessInputPlaceholder.placeholder = "Unscramble the sentence...";
                }
            },

            loadSample(type, listKey) {
                this.elements.itemListInput.value = this.sampleData[type][listKey];
                this.elements.itemListInput.focus();
                this.elements.gameModeSelect.value = type;
                this.updateInputAreaUIForMode();
            },

            startGame() {
                this.state.currentMode = this.elements.gameModeSelect.value;
                const listText = this.elements.itemListInput.value.trim();

                // Read and validate user time setting
                const userSetTime = parseInt(this.elements.timerSettingInput.value, 10);
                if (isNaN(userSetTime) || userSetTime < 5) {
                    alert("Please enter a valid time per item (minimum 5 seconds).");
                    this.elements.timerSettingInput.focus();
                    return;
                }
                this.state.userTimePerItem = userSetTime;


                if (!listText) {
                    alert("Please enter a list of items.");
                    return;
                }

                if (this.state.currentMode === 'words') {
                    this.state.originalItems = listText.split('\n')
                        .map(w => w.trim().toLowerCase())
                        .filter(w => w.length >= this.CONFIG.MIN_WORD_LENGTH && w.length <= this.CONFIG.MAX_WORD_LENGTH && /^[a-z]+$/.test(w));
                    if (this.state.originalItems.length < 1) {
                        alert(`Please enter at least one valid word (${this.CONFIG.MIN_WORD_LENGTH}-${this.CONFIG.MAX_WORD_LENGTH} letters, only alphabet).`);
                        return;
                    }
                } else { // sentences
                    this.state.originalItems = listText.split('\n')
                        .map(s => s.trim())
                        .filter(s => s.length >= this.CONFIG.MIN_SENTENCE_LENGTH && s.split(' ').length >= this.CONFIG.MIN_SENTENCE_WORDS);
                    if (this.state.originalItems.length < 1) {
                        alert(`Please enter at least one valid sentence (min ${this.CONFIG.MIN_SENTENCE_LENGTH} chars, min ${this.CONFIG.MIN_SENTENCE_WORDS} words).`);
                        return;
                    }
                }

                this.elements.inputArea.classList.add(this.CSS_CLASSES.HIDDEN);
                this.elements.gameArea.classList.remove(this.CSS_CLASSES.HIDDEN);
                this.startNewRound();
            },

            startNewRound() {
                this.state.score = 0;
                this.state.currentItemIndex = 0;
                this.state.gameItems = this.shuffleArray([...this.state.originalItems]).map(item => ({
                    original: item,
                    jumbled: this.state.currentMode === 'words' ? this.jumbleWord(item) : this.jumbleSentence(item)
                }));
                this.elements.totalAttemptsEl.textContent = this.state.gameItems.length;
                this.updateScoreDisplay();
                this.setGuessingState(true);
                this.displayNextJumbledItem();
            },

            // --- Jumbling Logic ---
            jumbleWord(word) {
                let chars = word.split('');
                let jumbledChars;
                do {
                    for (let i = chars.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [chars[i], chars[j]] = [chars[j], chars[i]];
                    }
                    jumbledChars = chars.join('');
                } while (word.length > 1 && jumbledChars === word);
                return jumbledChars;
            },
            jumbleSentence(sentence) {
                let words = sentence.split(' ');
                if (words.length <= 1) return sentence;
                let jumbledWordsArray;
                do {
                    let tempWords = [...words];
                    for (let i = tempWords.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [tempWords[i], tempWords[j]] = [tempWords[j], tempWords[i]];
                    }
                    jumbledWordsArray = tempWords.join(' ');
                } while (jumbledWordsArray === sentence);
                return jumbledWordsArray;
            },

            // --- Gameplay & Timer ---
            startTimer() {
                this.stopTimer(); // Clear any existing timer
                // Use the user-set time from state
                this.state.timeRemaining = this.state.userTimePerItem;
                this.updateTimerDisplay();
                this.state.timerId = setInterval(() => {
                    this.state.timeRemaining--;
                    this.updateTimerDisplay();
                    if (this.state.timeRemaining <= 0) {
                        this.stopTimer();
                        this.handleGuess(true); // true for timeout
                    }
                }, 1000);
            },
            stopTimer() {
                clearInterval(this.state.timerId);
                this.state.timerId = null;
            },
            updateTimerDisplay() {
                const minutes = Math.floor(this.state.timeRemaining / 60);
                const seconds = this.state.timeRemaining % 60;
                this.elements.timerDisplayEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                this.elements.timerDisplayEl.style.color = this.state.timeRemaining <= 5 ? 'var(--accent-color-incorrect)' : 'var(--accent-color-timer)';
            },

            displayNextJumbledItem() {
                if (this.state.currentItemIndex >= this.state.gameItems.length) {
                    this.endGame();
                    return;
                }
                const currentPair = this.state.gameItems[this.state.currentItemIndex];
                this.elements.jumbledDisplayEl.textContent = this.state.currentMode === 'words' ? currentPair.jumbled.toUpperCase() : currentPair.jumbled;
                this.elements.jumbledDisplayEl.classList.toggle(this.CSS_CLASSES.SENTENCE_MODE_DISPLAY, this.state.currentMode === 'sentences');

                this.elements.guessInput.value = '';
                this.elements.guessInput.focus();
                this.elements.feedbackEl.textContent = '';
                this.elements.feedbackEl.className = '';
                this.elements.attemptNumberEl.textContent = this.state.currentItemIndex + 1;
                this.state.hintUsedThisRound = false;
                this.elements.hintTextEl.textContent = '';
                this.elements.nextItemBtn.textContent = "Next Item";
                this.setGuessingState(true);
                this.startTimer(); // Start timer for the new item
            },

            showHint() {
                 if (this.state.currentItemIndex < this.state.gameItems.length && !this.state.hintUsedThisRound) {
                    const currentOriginalItem = this.state.gameItems[this.state.currentItemIndex].original;
                    let hint = '';
                    if (this.state.currentMode === 'words') {
                        hint = `Hint: Word starts with '${currentOriginalItem.charAt(0).toUpperCase()}', Length: ${currentOriginalItem.length}`;
                    } else { // sentences
                        const firstWord = currentOriginalItem.split(' ')[0];
                        hint = `Hint: Sentence starts with "${firstWord}", Total words: ${currentOriginalItem.split(' ').length}`;
                    }
                    this.elements.hintTextEl.textContent = hint;
                    this.elements.hintBtn.disabled = true;
                    this.state.hintUsedThisRound = true;
                }
            },

            handleGuess(isTimeout) {
                this.stopTimer();
                const userGuess = this.elements.guessInput.value.trim();
                const currentOriginalItem = this.state.gameItems[this.state.currentItemIndex].original;
                let isCorrect = false;

                if (isTimeout) {
                    this.elements.feedbackEl.textContent = `Time's up! The correct answer was: "${currentOriginalItem}"`;
                    this.elements.feedbackEl.className = this.CSS_CLASSES.INCORRECT_FEEDBACK;
                } else {
                    if (!userGuess) {
                        this.elements.feedbackEl.textContent = "Please enter your guess.";
                        this.elements.feedbackEl.className = this.CSS_CLASSES.INCORRECT_FEEDBACK;
                        this.setGuessingState(false);
                        this.elements.guessInput.disabled = false;
                        this.startTimer(); // Restart timer if guess was empty
                        return;
                    }

                    isCorrect = (this.state.currentMode === 'words') ?
                        userGuess.toLowerCase() === currentOriginalItem.toLowerCase() :
                        userGuess.toLowerCase() === currentOriginalItem.toLowerCase();

                    if (isCorrect) {
                        this.elements.feedbackEl.textContent = "Correct! Well done!";
                        this.elements.feedbackEl.className = this.CSS_CLASSES.CORRECT_FEEDBACK;
                        this.state.score += this.state.hintUsedThisRound ? 0.5 : 1;
                        if (this.state.hintUsedThisRound) {
                            this.elements.feedbackEl.textContent += " (Hint was used)";
                        }
                    } else {
                        this.elements.feedbackEl.textContent = `Oops! The correct answer was: "${currentOriginalItem}"`;
                        this.elements.feedbackEl.className = this.CSS_CLASSES.INCORRECT_FEEDBACK;
                    }
                }
                this.setGuessingState(false);
                this.updateScoreDisplay();
                if (this.state.currentItemIndex >= this.state.gameItems.length - 1) {
                    this.elements.nextItemBtn.textContent = "Show Final Score";
                }
            },

            moveToNextItem() {
                this.state.currentItemIndex++;
                if (this.state.currentItemIndex >= this.state.gameItems.length) {
                    this.endGame();
                } else {
                    this.displayNextJumbledItem();
                }
            },

            endGame() {
                this.stopTimer();
                this.elements.jumbledDisplayEl.textContent = "All Items Done!";
                this.setGuessingState(false);
                this.elements.hintBtn.disabled = true;
                this.elements.hintTextEl.textContent = '';
                this.elements.timerDisplayEl.textContent = "Game Over!";
                this.elements.timerDisplayEl.style.color = 'var(--text-color-light)';


                const finalScore = this.state.score;
                let scoreMessage = `Your final score is ${finalScore} out of ${this.state.gameItems.length}`;
                if (finalScore % 1 !== 0) scoreMessage += ' (hints affected score)';
                scoreMessage += '.';

                if (finalScore > this.state.highScores[this.state.currentMode]) {
                    this.state.highScores[this.state.currentMode] = finalScore;
                    this.saveHighScores();
                    this.displayHighScores();
                    scoreMessage += ` New High Score for ${this.state.currentMode === 'words' ? 'Words' : 'Sentences'}!`;
                }

                this.elements.feedbackEl.innerHTML = scoreMessage;
                this.elements.feedbackEl.className = finalScore >= this.state.gameItems.length / 2 ? this.CSS_CLASSES.CORRECT_FEEDBACK : this.CSS_CLASSES.INCORRECT_FEEDBACK;

                this.elements.nextItemBtn.classList.add(this.CSS_CLASSES.HIDDEN);
            },

            resetToInputArea() {
                this.stopTimer();
                this.elements.gameArea.classList.add(this.CSS_CLASSES.HIDDEN);
                this.elements.inputArea.classList.remove(this.CSS_CLASSES.HIDDEN);
                this.elements.itemListInput.focus();
                 // Reset timer display based on current input value or default
                this.elements.timerDisplayEl.textContent = `${String(0).padStart(2, '0')}:${String(parseInt(this.elements.timerSettingInput.value, 10) || 30).padStart(2, '0')}`;
                this.elements.timerDisplayEl.style.color = 'var(--accent-color-timer)';
                this.elements.nextItemBtn.classList.add(this.CSS_CLASSES.HIDDEN);
                this.elements.feedbackEl.textContent = '';
                this.elements.feedbackEl.className = '';
                 this.elements.jumbledDisplayEl.textContent = '';
                 this.setGuessingState(false);
            },

            showRestartButton() {
                 this.elements.restartGameBtn.classList.remove(this.CSS_CLASSES.HIDDEN);
            },


            // --- UI Helpers ---
            updateScoreDisplay() {
                this.elements.scoreEl.textContent = this.state.score;
            },
            setGuessingState(canGuess) {
                this.elements.guessInput.disabled = !canGuess;
                this.elements.submitGuessBtn.disabled = !canGuess;
                this.elements.hintBtn.disabled = !canGuess || this.state.hintUsedThisRound;
                this.elements.nextItemBtn.classList.toggle(this.CSS_CLASSES.HIDDEN, canGuess);
            },

            // --- Local Storage: High Scores ---
            loadHighScores() {
                const storedScores = localStorage.getItem(this.CONFIG.LOCAL_STORAGE_HS_KEY);
                if (storedScores) {
                    this.state.highScores = JSON.parse(storedScores);
                }
                this.displayHighScores();
            },
            saveHighScores() {
                localStorage.setItem(this.CONFIG.LOCAL_STORAGE_HS_KEY, JSON.stringify(this.state.highScores));
            },
            displayHighScores() {
                this.elements.highScoreWordsEl.textContent = this.state.highScores.words || 0;
                this.elements.highScoreSentencesEl.textContent = this.state.highScores.sentences || 0;
            },

            // --- Local Storage: User Lists ---
            loadUserLists() {
                const storedLists = localStorage.getItem(this.CONFIG.LOCAL_STORAGE_USER_LISTS_KEY);
                if (storedLists) {
                    this.state.userLists = JSON.parse(storedLists);
                }
                this.populateSavedListsDropdown();
            },
            saveCurrentList() {
                const listContent = this.elements.itemListInput.value.trim();
                if (!listContent) {
                    alert("List is empty. Nothing to save.");
                    return;
                }
                let listName = prompt("Enter a name for this list:", "");
                if (!listName) {
                    if (listName === "") alert("List name cannot be empty.");
                    return;
                }
                listName = listName.trim();
                if (this.state.userLists[listName]) {
                    if (!confirm(`A list named "${listName}" already exists. Overwrite it?`)) {
                        return;
                    }
                }
                this.state.userLists[listName] = {
                    content: listContent,
                    mode: this.elements.gameModeSelect.value
                };
                localStorage.setItem(this.CONFIG.LOCAL_STORAGE_USER_LISTS_KEY, JSON.stringify(this.state.userLists));
                this.populateSavedListsDropdown();
                alert(`List "${listName}" saved!`);
                this.elements.savedListsSelect.value = listName;
            },
            loadSavedList(listName) {
                if (!listName || listName === "" || !this.state.userLists[listName]) {
                    this.elements.itemListInput.value = "";
                    this.elements.gameModeSelect.value = 'words';
                    this.updateInputAreaUIForMode();
                    return;
                }
                const listData = this.state.userLists[listName];
                this.elements.itemListInput.value = listData.content;
                this.elements.gameModeSelect.value = listData.mode || 'words';
                this.updateInputAreaUIForMode();
            },
            populateSavedListsDropdown() {
                this.elements.savedListsSelect.innerHTML = '<option value="">-- Select a saved list --</option>';
                for (const listName in this.state.userLists) {
                    const option = document.createElement('option');
                    option.value = listName;
                    option.textContent = listName;
                    this.elements.savedListsSelect.appendChild(option);
                }
                 this.elements.deleteListBtn.disabled = Object.keys(this.state.userLists).length === 0;
                 this.elements.savedListsSelect.addEventListener('change', () => {
                     this.elements.deleteListBtn.disabled = !this.elements.savedListsSelect.value;
                 });
                 this.elements.deleteListBtn.disabled = !this.elements.savedListsSelect.value;
            },

            deleteSelectedList() {
                const listName = this.elements.savedListsSelect.value;
                if (!listName || listName === "") {
                    alert("Please select a list to delete.");
                    return;
                }

                if (confirm(`Are you sure you want to delete the list "${listName}"?`)) {
                    delete this.state.userLists[listName];
                    localStorage.setItem(this.CONFIG.LOCAL_STORAGE_USER_LISTS_KEY, JSON.stringify(this.state.userLists));
                    this.populateSavedListsDropdown();
                    this.elements.itemListInput.value = "";
                    this.elements.gameModeSelect.value = 'words';
                    this.updateInputAreaUIForMode();
                    alert(`List "${listName}" deleted.`);
                }
            },

            // --- Utilities ---
            shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
        };

        document.addEventListener('DOMContentLoaded', () => Game.init());
