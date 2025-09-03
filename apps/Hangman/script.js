// DOM Elements
        const wordListInput = document.getElementById('word-list');
        const newListInputName = document.getElementById('new-list-name');
        const saveListBtn = document.getElementById('save-list-btn');
        const startGameBtn = document.getElementById('start-game-btn');
        const inputArea = document.getElementById('input-area');
        const gameArea = document.getElementById('game-area');
        const sampleListsAreaContainer = document.getElementById('sample-lists-area');
        const savedListsContainer = document.getElementById('saved-lists-container');

        const hangmanBodyPartIds = ["head", "body-line", "left-arm", "right-arm", "left-leg", "right-leg"];
        const wordDisplayEl = document.getElementById('word-display');
        const lettersGuessedEl = document.getElementById('letters-guessed').querySelector('span');
        const alphabetButtonsEl = document.getElementById('alphabet-buttons');
        const gameStatusEl = document.getElementById('game-status');
        const hintDisplayEl = document.getElementById('hint-display');
        const playAgainBtn = document.getElementById('play-again-btn');
        const backToSetupBtn = document.getElementById('back-to-setup-btn');
        const hintBtn = document.getElementById('hint-btn');

        // Game State Variables & Constants
        let originalWordPool = []; 
        let currentSessionWords = []; 
        let secretWord = ''; 
        let currentHint = ''; 
        let isFromSampleList = false;
        let guessedLetters = [];
        let incorrectGuesses = 0;
        const MAX_INCORRECT_GUESSES = hangmanBodyPartIds.length;
        let hintUsedForCurrentWord = false;
        const DEFAULT_HINT_FOR_CUSTOM_WORD = "Custom word (Hint reveals a letter)";


        // localStorage Keys
        const LAST_ACTIVE_LIST_KEY = 'hangmanUserLastActiveList'; 
        const SAVED_LISTS_KEY = 'hangmanUserSavedNamedLists_v2'; // Incremented version due to data structure change

        const sampleLists = {
            "vegetables": [
                { word: "carrot ", hint: " Bugs Bunny's favorite, often associated with improved night vision myth" },
{ word: "broccoli ", hint: " A floret-filled stalk, sometimes called 'little trees' by children" },
{ word: "potato ", hint: " An underground treasure that can become chips or a creamy mash" },
{ word: "tomato ", hint: " A culinary chameleon, debates its fruit or vegetable status" },
{ word: "onion ", hint: " Its layers can bring tears to your eyes before it flavors your meal" },
{ word: "cabbage ", hint: " A dense head of leaves, essential for a fermented German side dish" },
{ word: "lettuce ", hint: " The crisp foundation of many a Caesar or Cobb" },
{ word: "cucumber ", hint: " A cool gourd relative, often found sliced in spa water or sandwiches" },
{ word: "bell pepper ", hint: " A hollow vessel of sweetness, comes in a traffic light of colors" },
{ word: "cauliflower ", hint: " A pale cousin to broccoli, can be mashed to mimic a starchy side" },
{ word: "eggplant ", hint: " Known for its glossy, deep purple skin and a role in moussaka" },
{ word: "zucchini ", hint: " A prolific summer squash, often grated into breads or 'noodles'" },
{ word: "peas ", hint: " Tiny green orbs often found nestled together in a protective casing" },
{ word: "corn ", hint: " Rows of golden kernels, a staple of summer barbecues and movie nights" },
{ word: "asparagus ", hint: " Spring's spear-like offering, known for its distinct post-digestive aroma" },
{ word: "celery ", hint: " A fibrous stalk with 'strings,' often paired with peanut butter or dip" },
{ word: "radish ", hint: " A small, zesty root that adds a peppery crunch to salads" },
{ word: "kale ", hint: " A 'supergreen' once relegated to garnish, now a smoothie star" },
{ word: "sweet potato ", hint: " An orange-hued root, a healthier alternative for fries or pie" },
{ word: "artichoke ", hint: " You have to work through its thorny exterior to reach its tender core" },
{ word: "brussels sprouts ", hint: " Miniature globes often disliked in youth, but can be delicious when roasted" },
{ word: "green beans ", hint: " Slender pods, sometimes 'snapped' before cooking" },
{ word: "turnip ", hint: " A humble root, historically significant in Halloween traditions before pumpkins" },
{ word: "beetroot ", hint: " Its vibrant juice stains everything, but it's sweet and earthy" },
{ word: "okra ", hint: " A fuzzy green pod known for its mucilaginous texture, popular in Southern US and Indian cuisine" },
{ word: "fennel ", hint: " Aromatic bulb with a licorice-like whisper, often shaved into salads" },
{ word: "kohlrabi ", hint: " A sputnik-shaped stem vegetable, tastes like a mild, sweet turnip" },
{ word: "parsnip ", hint: " A pale, sweet root, often overshadowed by its orange cousin in winter dishes" },
{ word: "rhubarb ", hint: " Legally a vegetable, culinarily a fruit, its stalks are tart and require sweetening" },
{ word: "watercress ", hint: " Peppery aquatic plant, often found gracing elegant tea sandwiches" },
{ word: "butternut squash ", hint: " A gourd with a tan skin and a bell-like base, its flesh is sweet and orange" },
{ word: "swiss chard ", hint: " Leafy green with vibrant, often jewel-toned stalks and veins" },
{ word: "edamame ", hint: " Young soybeans, often served steamed in their pod as an appetizer" },
{ word: "leek ", hint: " A milder, larger relative of the onion, with layers that trap grit" },
{ word: "bok choy ", hint: " A type of Chinese cabbage with white stalks and dark green leaves, doesn't form a tight head" },
{ word: "endive ", hint: " A slightly bitter, boat-shaped leaf, often used for elegant appetizers" },
{ word: "yam ", hint: " Often confused with its sweeter orange cousin, this tuber can be much larger and starchier" },
{ word: "rutabaga ", hint: " A hardy root vegetable, a cross between a turnip and cabbage, sometimes called swede" },
{ word: "nopales ", hint: " The pads of the prickly pear cactus, a staple in Mexican cuisine once de-spined" },
{ word: "romanesco ", hint: " A fractal-like head of mesmerizing spirals, a cousin to cauliflower" },
{ word: "salsify ", hint: " A root vegetable also known as the 'oyster plant' for its faint, similar taste" },
{ word: "jicama ", hint: " A crunchy, sweet, and watery root, often eaten raw with lime and chili" },
{ word: "celeriac ", hint: " The gnarled, bulbous root of a celery variety, with an earthy, celery-parsley flavor" },
{ word: "daikon ", hint: " A large, white East Asian radish, milder than its smaller red cousins" },
{ word: "arugula ", hint: " A peppery leafy green, also known as rocket, popular in Mediterranean cuisine" },
{ word: "tatsoi ", hint: " An Asian green with dark, spoon-shaped leaves, often used in stir-fries or salads" },
{ word: "mache ", hint: " Delicate, nutty-flavored green, also known as lamb's lettuce" },
{ word: "collard greens ", hint: " Large, tough-leafed greens, a staple in Southern US cooking" },
{ word: "mustard greens ", hint: " Peppery and pungent leafy greens, related to the plant whose seeds make a condiment" },
{ word: "water chestnut ", hint: " An aquatic tuber with a crisp, white flesh, often found in Asian cuisine" },
            ],
            "Fruits": [
                { word: "mango ", hint: " The 'king of fruits' in some cultures, with a large flat seed and golden flesh" },
{ word: "pomegranate ", hint: " A jewel-filled orb, its arils burst with tart-sweet juice" },
{ word: "durian ", hint: " Infamous for its potent aroma, this spiky fruit has a creamy, custard-like interior" },
{ word: "lychee ", hint: " A small, rough-skinned fruit that reveals a sweet, translucent white flesh" },
{ word: "passion fruit ", hint: " Its wrinkled exterior hides a vibrant, seed-filled pulp with an intense tropical flavor" },
{ word: "fig ", hint: " A soft, pear-shaped fruit with numerous tiny seeds, often eaten dried or fresh" },
{ word: "persimmon ", hint: " An autumn fruit that can be astringent if unripe, but sweet and honeyed when ready" },
{ word: "guava ", hint: " A tropical fruit with edible seeds, its aroma can be strong and its flesh pink or white" },
{ word: "kiwi ", hint: " Fuzzy brown exterior gives way to a green, starburst-patterned interior with tiny black seeds" },
{ word: "starfruit ", hint: " Sliced, it reveals its namesake shape; has a tart, slightly apple-like taste" },
{ word: "dragon fruit ", hint: " Exotic appearance with vibrant pink or yellow skin and 'scales,' mild taste" },
{ word: "rambutan ", hint: " Spiky, hair-like exterior covers a sweet, translucent flesh similar to lychee" },
{ word: "jackfruit ", hint: " The world's largest tree-borne fruit, its flesh can be a meat substitute when unripe" },
{ word: "kumquat ", hint: " A tiny citrus fruit eaten whole, skin and all, offering a sweet-tart burst" },
{ word: "mulberry ", hint: " A delicate, dark berry that stains easily, grows on trees and resembles a long blackberry" },
{ word: "apple ", hint: " Legendary for keeping doctors away and tempting Eve" },
{ word: "banana ", hint: " A crescent-shaped yellow fruit, a favorite of primates" },
{ word: "orange ", hint: " A citrus sphere that shares its name with its color" },
{ word: "grape ", hint: " Small, round or oval fruit that grows in clusters, key to winemaking" },
{ word: "strawberry ", hint: " A red, heart-shaped fruit dotted with external seeds" },
{ word: "blueberry ", hint: " A small, round, dark blue fruit, rich in antioxidants" },
{ word: "raspberry ", hint: " A delicate, red, aggregate fruit with a hollow core" },
{ word: "lemon ", hint: " A sour yellow citrus, often used for its juice and zest" },
{ word: "lime ", hint: " A small, green, acidic citrus, cousin to the lemon" },
{ word: "pineapple ", hint: " A tropical fruit with a tough, spiky exterior and sweet, juicy interior" },
{ word: "watermelon ", hint: " A large, heavy fruit with a green rind and sweet, watery red flesh" },
{ word: "cantaloupe ", hint: " A type of melon with a netted rind and sweet orange flesh" },
{ word: "honeydew ", hint: " A smooth-skinned melon with sweet, pale green flesh" },
{ word: "peach ", hint: " A fuzzy-skinned stone fruit with sweet, juicy flesh" },
{ word: "plum ", hint: " A smooth-skinned stone fruit, can be purple, red, or yellow" },
{ word: "cherry ", hint: " A small, round stone fruit, often red or black, grows in pairs" },
{ word: "apricot ", hint: " A small, orange stone fruit with a velvety skin" },
{ word: "nectarine ", hint: " A smooth-skinned variety of peach" },
{ word: "pear ", hint: " A teardrop-shaped fruit, often sweet and juicy" },
{ word: "grapefruit ", hint: " A large, tart citrus fruit, often eaten for breakfast" },
{ word: "avocado ", hint: " A creamy green fruit with a large central pit, technically a large berry" },
{ word: "coconut ", hint: " A large, hard-shelled tropical fruit with white flesh and watery liquid" },
{ word: "papaya ", hint: " A tropical fruit with orange flesh and black, peppery seeds" },
{ word: "cranberry ", hint: " A small, tart red berry, often associated with holiday sauces" },
{ word: "date ", hint: " A sweet, chewy fruit from a palm tree, often dried" },
{ word: "elderberry ", hint: " Dark purple berry used in wines, cordials, and pies, often requires cooking" },
{ word: "gooseberry ", hint: " A tart, translucent berry, can be green, red, or yellow" },
{ word: "boysenberry ", hint: " A large, reddish-purple hybrid berry, a mix of raspberry, blackberry, and loganberry" },
{ word: "loganberry ", hint: " A hybrid berry, cross between a raspberry and a blackberry, tart flavor" },
{ word: "currant ", hint: " Small, tart berry, can be black, red, or white" },
{ word: "kiwano ", hint: " Also known as horned melon, with spiky orange rind and jelly-like green flesh" },
{ word: "plantain ", hint: " A starchy, less sweet relative of the banana, usually cooked" },
{ word: "pawpaw ", hint: " Native North American fruit with a tropical, custard-like flavor" },
{ word: "quince ", hint: " A hard, aromatic pome fruit, astringent raw but delicious when cooked" },
{ word: "soursop ", hint: " A spiky green tropical fruit with a creamy, acidic white pulp" },
{ word: "tamarind ", hint: " A tropical tree producing pod-like fruit with a tart, tangy pulp" },
{ word: "ugli fruit ", hint: " A citrus fruit hybrid of a grapefruit, orange, and tangerine, with a rough, yellowish-green rind" },
            ],
            "Hardware Tools": [
                { word: "caliper ", hint: " A precision instrument for measuring internal or external dimensions with two legs" },
{ word: "hacksaw ", hint: " Used for cutting metal, it has a fine-toothed blade held under tension" },
{ word: "level ", hint: " Contains a bubble in liquid to determine true horizontal or vertical alignment" },
{ word: "chisel ", hint: " A long-bladed hand tool with a beveled cutting edge, struck with a hammer or mallet" },
{ word: "ratchet ", hint: " A mechanical device that allows continuous linear or rotary motion in only one direction while preventing motion in the opposite direction" },
{ word: "soldering iron ", hint: " A hand tool used to melt a fusible metal alloy to join electrical components or metal pieces" },
{ word: "utility knife ", hint: " Features a retractable, replaceable blade, often used for general or utility purposes; also known as a Stanley knife or box cutter" },
{ word: "rivet gun ", hint: " A tool used to drive short metal pins or bolts for holding together two plates of metal" },
{ word: "crowbar ", hint: " A heavy iron bar with a U-shaped foot, used for prying things open or apart" },
{ word: "micrometer ", hint: " A gauge which measures small distances or thicknesses with extreme precision, often using a calibrated screw" },
{ word: "planer ", hint: " A tool used for flattening, reducing the thickness of, and imparting a smooth surface to a rough piece of lumber" },
{ word: "torque wrench ", hint: " A tool used to apply a specific rotational force to a fastener such as a nut or bolt" },
{ word: "vise ", hint: " A mechanical screw apparatus used for holding or clamping a workpiece to allow work to be performed on it" },
{ word: "plumb bob ", hint: " A weight, usually with a pointed tip on the bottom, suspended from a string and used as a vertical reference line" },
{ word: "allen wrench ", hint: " An L-shaped hexagonal key used to drive bolts and screws with a hexagonal socket" },
{ word: "hammer ", hint: " Delivers impact to an object, often to drive nails" },
{ word: "screwdriver ", hint: " Designed to insert and tighten, or loosen and remove, fasteners with slotted heads" },
{ word: "pliers ", hint: " Hand-operated tool for holding objects firmly, possibly to bend or compress them" },
{ word: "wrench ", hint: " Used to provide grip and mechanical advantage in applying torque to turn objects—usually rotary fasteners" },
{ word: "drill ", hint: " Creates round holes or drives fasteners with a rotating cutting tool or driver bit" },
{ word: "saw ", hint: " A tool consisting of a tough blade, wire, or chain with a hard-toothed edge, used to cut through material" },
{ word: "tape measure ", hint: " A flexible ruler used to measure size or distance" },
{ word: "axe ", hint: " An implement used to shape, split and cut wood, or harvest timber" },
{ word: "shovel ", hint: " A tool for digging, lifting, and moving bulk materials, such as soil, coal, gravel, snow, sand, or ore" },
{ word: "sledgehammer ", hint: " A large, heavy hammer used for tasks such as breaking concrete or driving posts" },
{ word: "file ", hint: " A tool used to remove fine amounts of material from a workpiece, often for smoothing or shaping" },
{ word: "clamp ", hint: " A fastening device used to hold or secure objects tightly together to prevent movement or separation" },
{ word: "putty knife ", hint: " A specialized tool used when glazing single-glazed windows, to work putty around the edges of each pane of glass" },
{ word: "bolt cutter ", hint: " A tool used for cutting chains, padlocks, bolts and wire mesh" },
{ word: "caulking gun ", hint: " A tool that holds a tube or cartridge that's filled with material used for sealing up gaps and cracks" },
{ word: "grinder ", hint: " A power tool used for cutting, grinding and polishing" },
{ word: "lathe ", hint: " A machine tool that rotates a workpiece about an axis of rotation to perform various operations such as cutting, sanding, knurling, drilling, or deformation" },
{ word: "mallet ", hint: " A kind of hammer, often made of rubber or wood, with a relatively large head" },
{ word: "nail gun ", hint: " A tool used to drive nails into wood or other materials, powered by compressed air, electromagnetism, or flammable gases" },
{ word: "pipe wrench ", hint: " An adjustable wrench used for turning soft iron pipes and fittings with a rounded surface" },
{ word: "sandpaper ", hint: " A type of coated abrasive that consists of sheets of paper or cloth with abrasive material glued to one face" },
{ word: "scraper ", hint: " A tool with a flat blade used for removing paint, wallpaper, or other unwanted substances from surfaces" },
{ word: "socket wrench ", hint: " A type of wrench that has a socket attached at one end, usually used to turn a fastener" },
{ word: "spirit level ", hint: " Another name for a tool that contains a bubble in liquid to determine true horizontal or vertical alignment" },
{ word: "stud finder ", hint: " A handheld device used to locate framing studs hidden behind the final walling surface, usually drywall" },
{ word: "trowel ", hint: " A small handheld tool with a flat, pointed blade, used to apply, spread, and smooth mortar or plaster" },
{ word: "wire stripper ", hint: " A small, hand-held device used to remove the electrical insulation from electric wires" },
{ word: "workbench ", hint: " A sturdy table at which manual work is done" },
{ word: "awl ", hint: " A small pointed tool used for piercing holes, especially in leather or wood" },
{ word: "bevel ", hint: " An instrument for drawing or marking angles" },
{ word: "brace ", hint: " A hand tool used with a bit to drill holes, usually in wood" },
{ word: "countersink ", hint: " A conical hole cut into a manufactured object, or the cutter used to cut such a hole" },
{ word: "die ", hint: " A specialized tool used in manufacturing industries to cut or shape material using a press or a hammer" },
{ word: "gasket scraper ", hint: " A tool with a thin, sharp blade designed to remove old sealant material without damaging the mating surfaces" },
            ],
			"Household Items": [
				{ word: "colander ", hint: " A perforated bowl used to strain off liquid from food after cooking or washing" },
{ word: "ottoman ", hint: " A low upholstered seat without a back or arms, sometimes used as a footrest or coffee table" },
{ word: "remote control ", hint: " The 'magic wand' that commands your electronic entertainment from afar" },
{ word: "corkscrew ", hint: " A spiral-bladed tool for drawing a stopper from a bottle" },
{ word: "thermostat ", hint: " A device that automatically regulates temperature, or that activates a device when the temperature reaches a certain point" },
{ word: "dustpan ", hint: " The flat-handed partner to a brush, used for scooping up floor debris" },
{ word: "clothespin ", hint: " A fastener used to hang up garments for drying, typically on a line" },
{ word: "ladle ", hint: " A large, long-handled spoon with a cup-shaped bowl, used for serving soup or stew" },
{ word: "doorstop ", hint: " A heavy object or a device attached to a door or floor to hold a door open or prevent it from hitting a wall" },
{ word: "ironing board ", hint: " A long, narrow, padded board, often with folding legs, on which clothes are pressed" },
{ word: "extension cord ", hint: " Provides a longer reach for your electrical devices" },
{ word: "picture frame ", hint: " A decorative edging for a visible memory or piece of art" },
{ word: "blinds ", hint: " Window coverings with slats that can be tilted or raised to control light" },
{ word: "umbrella ", hint: " A portable canopy designed to protect against rain or sunlight" },
{ word: "bookshelf ", hint: " A multi-tiered resting place for stories and knowledge" },
{ word: "curtain ", hint: " A piece of material suspended at the top to form a screen, typically movable sideways along a rail" },
{ word: "pillow ", hint: " A rectangular cloth bag stuffed with soft material, used to support the head when lying or sleeping" },
{ word: "blanket ", hint: " A covering made of wool or similar fibrous material, used to keep a person warm in bed or on a couch" },
{ word: "towel ", hint: " An absorbent piece of cloth or paper used for drying or wiping" },
{ word: "soap ", hint: " A substance used with water for washing and cleaning, made of a compound of natural oils or fats with sodium hydroxide or another strong alkali" },
{ word: "shampoo ", hint: " A liquid preparation containing detergent or soap for washing hair" },
{ word: "toothbrush ", hint: " A small brush with a long handle, used for cleaning teeth" },
{ word: "toothpaste ", hint: " A paste or gel dentifrice used with a toothbrush as an accessory to clean and maintain the aesthetics and health of teeth" },
{ word: "mirror ", hint: " A surface, typically of glass coated with a metal amalgam, which reflects a clear image" },
{ word: "lamp ", hint: " A device for giving light, either electric or powered by burning a substance" },
{ word: "chair ", hint: " A separate seat for one person, typically with a back and four legs" },
{ word: "table ", hint: " A piece of furniture with a flat top and one or more legs, providing a level surface for eating, writing, or placing things on" },
{ word: "bed ", hint: " A piece of furniture used for sleeping or resting on" },
{ word: "sofa ", hint: " A long upholstered seat with a back and arms, for two or more people" },
{ word: "rug ", hint: " A floor covering of thick woven material or animal skin, typically rectangular in shape" },
{ word: "vase ", hint: " An open container, typically made of glass or ceramics and decorated, used to hold cut flowers" },
{ word: "clock ", hint: " An instrument to measure, keep, and indicate time" },
{ word: "coathanger ", hint: " A shaped piece of wood, metal, or plastic with a hook at the top, from which clothes may be hung" },
{ word: "broom ", hint: " A long-handled brush of bristles or twigs, used for sweeping" },
{ word: "mop ", hint: " An implement consisting of a sponge or a bundle of thick loose strings attached to a handle, used for wiping floors" },
{ word: "bucket ", hint: " A roughly cylindrical open container with a handle, typically made of metal or plastic, used to hold and carry liquids or other materials" },
{ word: "sponge ", hint: " A piece of a soft, light, porous substance, natural or artificial, used for washing and cleaning" },
{ word: "detergent ", hint: " A chemical substance, usually in powder or liquid form, that is used for cleaning things" },
{ word: "bleach ", hint: " A chemical, typically a solution of sodium hypochlorite or hydrogen peroxide, used to whiten or sterilize materials" },
{ word: "trash can ", hint: " A container for temporary storage of waste, usually made of metal or plastic" },
{ word: "refrigerator ", hint: " An appliance or compartment which is artificially kept cool and used to store food and drink" },
{ word: "oven ", hint: " An enclosed compartment, as in a kitchen range, for cooking and heating food" },
{ word: "microwave ", hint: " An oven that heats and cooks food by exposing it to electromagnetic radiation in a specific frequency range" },
{ word: "toaster ", hint: " An electrical appliance for making bread crisp and brown by exposing it to radiant heat" },
{ word: "blender ", hint: " An electric kitchen appliance used for mixing, puréeing, or emulsifying food and other substances" },
{ word: "kettle ", hint: " A metal or plastic container with a lid, spout, and handle, used for boiling water" },
{ word: "coffee maker ", hint: " An electric machine that automatically makes a hot drink from ground beans" },
{ word: "cutlery ", hint: " Knives, forks, and spoons used for eating or serving food" },
{ word: "crockery ", hint: " Plates, dishes, cups, and other eating and serving tableware, made of baked clay" },

		],
            "Programming": [
				{ word: "variable ", hint: " A named placeholder in memory, its contents can change during execution" },
{ word: "loop ", hint: " A control structure that repeats a block of instructions until a condition is no longer met" },
{ word: "function ", hint: " A self-contained module of code that accomplishes a specific task, often callable by name" },
{ word: "array ", hint: " An ordered collection of elements, typically of the same type, accessed by an index" },
{ word: "boolean", hint: " A data type with only two possible values" },
{ word: "algorithm ", hint: " A step-by-step procedure or formula for solving a problem or achieving a result" },
{ word: "compiler ", hint: " Translates human-readable code into machine-executable instructions all at once" },
{ word: "interpreter ", hint: " Executes instructions written in a programming language directly, one statement at a time" },
{ word: "syntax ", hint: " The set of rules that dictates the grammatically correct structure of code statements" },
{ word: "debugging ", hint: " The process of finding and resolving defects or problems within computer code" },
{ word: "conditional ", hint: " A statement that performs different actions depending on whether a condition is true or false (e.g., if-else)" },
{ word: "recursion ", hint: " A technique where a function calls itself in order to solve a smaller instance of the same problem" },
{ word: "parameter ", hint: " A special kind of variable used in a subroutine to refer to one of the pieces of data passed to it" },
{ word: "class ", hint: " A blueprint for creating objects, providing initial values for state and implementations of behavior" },
{ word: "null ", hint: " Represents the intentional absence of any object value or a non-value" },
{ word: "object ", hint: " An instance of a class, a concrete entity that has state and behavior" },
{ word: "method ", hint: " A procedure associated with a message and an object; an action an object can perform" },
{ word: "inheritance ", hint: " A mechanism where a new class derives properties and methods from an existing class" },
{ word: "polymorphism ", hint: " The ability of an object to take on many forms; often 'one interface, multiple functions'" },
{ word: "encapsulation ", hint: " Bundling data and methods that operate on that data within one unit, and restricting access to some components" },
{ word: "abstraction ", hint: " Hiding complex implementation details and showing only essential features of the object" },
{ word: "integer ", hint: " A whole number, not a fraction or decimal" },
{ word: "float ", hint: " A number that contains a decimal point; represents real numbers" },
{ word: "string ", hint: " A sequence of characters, used to represent text" },
{ word: "character ", hint: " A single letter, number, punctuation mark, or symbol" },
{ word: "operator ", hint: " A symbol that tells the compiler or interpreter to perform specific mathematical, relational, or logical operation" },
{ word: "expression ", hint: " A combination of values, variables, operators, and function calls that evaluates to a single value" },
{ word: "statement ", hint: " A complete unit of execution that performs some action" },
{ word: "comment ", hint: " Explanatory text in code ignored by the compiler/interpreter, for human readers" },
{ word: "library ", hint: " A collection of pre-written code, functions, and routines that can be used by other programs" },
{ word: "framework ", hint: " A pre-defined structure or set of tools that provides a foundation for developing applications" },
{ word: "api ", hint: " A set of rules and protocols that allows different software components to communicate with each other (Application Programming Interface)" },
{ word: "ide ", hint: " A software application that provides comprehensive facilities to programmers for software development (Integrated Development Environment)" },
{ word: "version control ", hint: " A system that records changes to a file or set of files over time so that you can recall specific versions later" },
{ word: "repository ", hint: " A central location in which data is stored and managed, often used with version control" },
{ word: "commit ", hint: " In version control, an operation which saves changes to the local repository" },
{ word: "branch ", hint: " In version control, a parallel line of development allowing work on different features independently" },
{ word: "merge ", hint: " In version control, the process of combining changes from different branches" },
{ word: "database ", hint: " An organized collection of structured information, or data, typically stored electronically" },
{ word: "query ", hint: " A request for data or information from a database table or combination of tables" },
{ word: "index ", hint: " In databases, a data structure that improves the speed of data retrieval operations" },
{ word: "json ", hint: " A lightweight data-interchange format, easy for humans to read/write and machines to parse/generate (JavaScript Object Notation)" },
{ word: "xml ", hint: " A markup language designed to carry data, not to display data (Extensible Markup Language)" },
{ word: "http ", hint: " The protocol used for transmitting hypermedia documents, such as HTML (Hypertext Transfer Protocol)" },
{ word: "url ", hint: " The address of a resource on the Internet (Uniform Resource Locator)" },
{ word: "dns ", hint: " The system that translates human-readable domain names into machine-readable IP addresses (Domain Name System)" },
{ word: "ip address ", hint: " A unique string of numbers separated by periods that identifies each computer using a specific protocol to communicate over a network" },
{ word: "frontend ", hint: " The part of a website or application that the user interacts with directly" },
{ word: "backend ", hint: " The server-side logic and database management part of a website or application" },
        ]
		};

        // --- Initialization ---
        document.addEventListener('DOMContentLoaded', () => {
            loadLastActiveListFromCache();
            renderSampleListButtons();
            renderSavedListsDisplay(); 

            startGameBtn.addEventListener('click', handleStartGame);
            saveListBtn.addEventListener('click', handleSaveCurrentList); 
            playAgainBtn.addEventListener('click', startNewRound);
            backToSetupBtn.addEventListener('click', returnToInputArea);
            hintBtn.addEventListener('click', useHint);
            document.addEventListener('keydown', handleKeyPress);
        });

        function loadLastActiveListFromCache() {
            const cachedList = localStorage.getItem(LAST_ACTIVE_LIST_KEY);
            if (cachedList) {
                wordListInput.value = cachedList;
            }
        }

        function saveLastActiveListToCache(listText) {
            localStorage.setItem(LAST_ACTIVE_LIST_KEY, listText);
        }

        function renderSampleListButtons() {
            const pElement = sampleListsAreaContainer.querySelector('p');
            Object.keys(sampleLists).forEach(category => {
                const button = document.createElement('button');
                button.textContent = category;
                button.setAttribute('aria-label', `Load ${category} sample word list into textarea`);
                button.addEventListener('click', () => loadSampleListIntoTextarea(category));
                pElement.parentNode.insertBefore(button, pElement.nextSibling);
            });
        }

        function loadSampleListIntoTextarea(category) {
            const wordsWithHints = sampleLists[category];
            // Format sample lists for textarea similar to how user would input custom hints
            wordListInput.value = wordsWithHints.map(item => `${item.word} :: ${item.hint}`).join('\n');
            newListInputName.value = category + " (Sample Copy)";
            wordListInput.focus();
        }
        
        // --- Saved Lists Management ---
        function getNamedSavedLists() { 
            const lists = localStorage.getItem(SAVED_LISTS_KEY);
            return lists ? JSON.parse(lists) : {};
        }

        function saveNamedListsToStorage(lists) { 
            localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(lists));
        }

        function handleSaveCurrentList() { 
            const listName = newListInputName.value.trim();
            const listContent = wordListInput.value.trim();

            if (!listName) {
                alert("Please enter a name for your list to save it.");
                newListInputName.focus();
                return;
            }
            if (!listContent) {
                alert("The word list in the textarea is empty. Please add some words before saving.");
                wordListInput.focus();
                return;
            }
            
            const parsedEntries = listContent.split('\n')
                .map(line => {
                    const parts = line.split('::');
                    const word = parts[0].trim().toLowerCase();
                    // If hint part exists and is not empty after trimming, use it. Otherwise, hint is empty string.
                    const hint = (parts.length > 1 && parts[1].trim() !== "") ? parts[1].trim() : ""; 
                    if (word.length > 0 && /^[a-z\s]+$/.test(word)) { // Validate word
                        return { word, hint }; // hint can be ""
                    }
                    return null; 
                }).filter(Boolean); // Remove any null entries from invalid lines
            
            if (parsedEntries.length === 0) {
                alert("No valid words found in the textarea. Please ensure words contain only letters/spaces and optionally a hint after '::'.");
                wordListInput.focus();
                return;
            }

            const savedLists = getNamedSavedLists();
            if (savedLists[listName] && !confirm(`A list named "${listName}" already exists. Overwrite it?`)) {
                newListInputName.focus();
                return;
            }
            savedLists[listName] = parsedEntries; // Save array of {word, hint} objects
            saveNamedListsToStorage(savedLists);
            
            newListInputName.value = ''; 
            alert(`List "${listName}" saved!`);
            renderSavedListsDisplay(); 
        }

        function renderSavedListsDisplay() { 
            savedListsContainer.innerHTML = ''; 
            const savedLists = getNamedSavedLists();
            if (Object.keys(savedLists).length === 0) {
                savedListsContainer.innerHTML = '<p style="text-align:center; color: #777;">No custom lists saved yet.</p>';
                return;
            }

            for (const listName in savedLists) {
                const listItemDiv = document.createElement('div');
                listItemDiv.classList.add('saved-list-item');
                
                const nameSpan = document.createElement('span');
                nameSpan.textContent = listName;
                nameSpan.title = `Load "${listName}" into textarea`;
                nameSpan.setAttribute('role', 'button');
                nameSpan.setAttribute('tabindex', '0'); 
                nameSpan.addEventListener('click', () => loadNamedListIntoTextarea(listName));
                nameSpan.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') loadNamedListIntoTextarea(listName); });

                const buttonsDiv = document.createElement('div');
                const loadBtn = document.createElement('button');
                loadBtn.textContent = 'Load';
                loadBtn.classList.add('small-btn');
                loadBtn.title = `Load "${listName}" into textarea`;
                loadBtn.addEventListener('click', () => loadNamedListIntoTextarea(listName));

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('small-btn', 'danger');
                deleteBtn.title = `Delete "${listName}"`;
                deleteBtn.addEventListener('click', () => handleDeleteNamedList(listName));
                
                buttonsDiv.appendChild(loadBtn);
                buttonsDiv.appendChild(deleteBtn);

                listItemDiv.appendChild(nameSpan);
                listItemDiv.appendChild(buttonsDiv);
                savedListsContainer.appendChild(listItemDiv);
            }
        }
        
        function loadNamedListIntoTextarea(listName) {
            const savedLists = getNamedSavedLists();
            if (savedLists[listName] && Array.isArray(savedLists[listName])) {
                // Reconstruct the textarea content from {word, hint} objects
                wordListInput.value = savedLists[listName].map(item => {
                    return item.hint ? `${item.word} :: ${item.hint}` : item.word;
                }).join('\n');
                newListInputName.value = listName; 
                wordListInput.focus();
            }
        }

        function handleDeleteNamedList(listName) { 
            if (confirm(`Are you sure you want to delete your saved list "${listName}"? This cannot be undone.`)) {
                const savedLists = getNamedSavedLists();
                delete savedLists[listName];
                saveNamedListsToStorage(savedLists);
                renderSavedListsDisplay(); 
            }
        }


        // --- Game Setup & Flow ---
        function handleStartGame() {
            const listText = wordListInput.value.trim();
            if (!listText) {
                alert("The word list in the textarea is empty. Please enter, load a sample, or load a saved list.");
                wordListInput.focus();
                return;
            }

            isFromSampleList = false;
            originalWordPool = [];

            // Check if current textarea content exactly matches a *formatted* sample list
            let potentialSampleCategory = null;
            for (const category in sampleLists) {
                const formattedSampleWords = sampleLists[category].map(item => `${item.word} :: ${item.hint}`).join('\n');
                if (listText.toLowerCase() === formattedSampleWords.toLowerCase()) { 
                    isFromSampleList = true;
                    potentialSampleCategory = category;
                    break;
                }
            }

            if (isFromSampleList && potentialSampleCategory) {
                originalWordPool = JSON.parse(JSON.stringify(sampleLists[potentialSampleCategory]));
            } else { 
                isFromSampleList = false; 
                const parsedEntries = listText.split('\n')
                    .map(line => {
                        const parts = line.split('::');
                        const word = parts[0].trim().toLowerCase();
                        // If hint part exists and is not empty after trimming, use it. 
                        // Otherwise, the hint will be the default.
                        const customHint = (parts.length > 1 && parts[1].trim() !== "") ? parts[1].trim() : "";
                        
                        if (word.length > 0 && /^[a-z\s]+$/.test(word)) {
                            return { word, hint: customHint || DEFAULT_HINT_FOR_CUSTOM_WORD }; 
                        }
                        return null;
                    }).filter(Boolean);
                
                if (parsedEntries.length === 0) {
                     alert("Please ensure words in the textarea contain only letters/spaces, and at least one valid word is provided (optionally with ':: hint').");
                     wordListInput.focus();
                     return;
                 }
                originalWordPool = parsedEntries;
                saveLastActiveListToCache(listText); 
            }
            
            if (originalWordPool.length < 1) { 
                alert("The list for the game is effectively empty. Please provide valid words.");
                wordListInput.focus();
                return;
            }

            currentSessionWords = JSON.parse(JSON.stringify(originalWordPool)); // Deep copy for session

            inputArea.classList.add('hidden');
            gameArea.classList.remove('hidden');
            backToSetupBtn.classList.remove('hidden'); 
            startNewRound();
        }

        function startNewRound() {
            if (currentSessionWords.length === 0) {
                gameStatusEl.textContent = "No more words in this list! Try a new list setup.";
                playAgainBtn.classList.add('hidden');
                hintBtn.classList.add('hidden');
                return;
            }

            const randomIndex = Math.floor(Math.random() * currentSessionWords.length);
            const wordObject = currentSessionWords.splice(randomIndex, 1)[0]; 

            secretWord = wordObject.word; 
            currentHint = wordObject.hint; // This will be the custom hint or DEFAULT_HINT_FOR_CUSTOM_WORD
            
            guessedLetters = [];
            incorrectGuesses = 0;
            hintUsedForCurrentWord = false;

            resetHangmanDrawing();
            updateWordDisplay();
            renderAlphabetButtons();
            lettersGuessedEl.textContent = '';
            gameStatusEl.textContent = '';
            gameStatusEl.className = '';
            hintDisplayEl.textContent = '';
            playAgainBtn.classList.add('hidden');
            hintBtn.classList.remove('hidden');
            hintBtn.disabled = false;
        }

        function returnToInputArea() {
            gameArea.classList.add('hidden');
            inputArea.classList.remove('hidden');
            playAgainBtn.classList.add('hidden');
            hintBtn.classList.add('hidden');
            wordListInput.focus();
        }

        // --- Game Mechanics (largely unchanged) ---
        function updateWordDisplay() {
            let display = '';
            for (const char of secretWord) {
                if (char === ' ') { display += ' '; } 
                else if (guessedLetters.includes(char)) { display += char.toUpperCase(); } 
                else { display += '_'; }
            }
            wordDisplayEl.textContent = display;
            return display.replace(/\s+/g, ''); 
        }

        function resetHangmanDrawing() {
            hangmanBodyPartIds.forEach(partId => {
                const element = document.getElementById(partId);
                if (element) element.style.display = 'none';
            });
        }

        function updateHangmanDrawing() {
            for (let i = 0; i < incorrectGuesses; i++) {
                if (hangmanBodyPartIds[i]) {
                    const element = document.getElementById(hangmanBodyPartIds[i]);
                    if (element) element.style.display = 'block'; 
                }
            }
        }

        function renderAlphabetButtons() {
            alphabetButtonsEl.innerHTML = ''; 
            const alphabet = "abcdefghijklmnopqrstuvwxyz";
            for (const letter of alphabet) {
                const button = document.createElement('button');
                button.classList.add('letter-btn');
                button.textContent = letter.toUpperCase();
                button.dataset.letter = letter;
                button.setAttribute('aria-label', `Guess letter ${letter.toUpperCase()}`);
                button.addEventListener('click', handleGuessClick);
                alphabetButtonsEl.appendChild(button);
            }
        }

        function handleGuessClick(event) {
            const letter = event.target.dataset.letter;
            processGuess(letter, event.target);
        }
        
        function handleKeyPress(event) {
            if (!gameArea.classList.contains('hidden') && !gameStatusEl.textContent) {
                const letter = event.key.toLowerCase();
                if (letter.length === 1 && letter >= 'a' && letter <= 'z') {
                    const button = alphabetButtonsEl.querySelector(`button[data-letter="${letter}"]`);
                    if (button && !button.disabled) {
                        processGuess(letter, button);
                    }
                }
            }
        }

        function processGuess(guessedLetter, buttonElement) {
            if (!buttonElement || buttonElement.disabled || guessedLetters.includes(guessedLetter) || incorrectGuesses >= MAX_INCORRECT_GUESSES || gameStatusEl.textContent) {
                return; 
            }
            guessedLetters.push(guessedLetter);
            buttonElement.disabled = true;

            if (secretWord.includes(guessedLetter)) {
                buttonElement.classList.add('correct');
                const currentDisplay = updateWordDisplay();
                if (!currentDisplay.includes('_')) { endGame(true); }
            } else {
                buttonElement.classList.add('incorrect');
                incorrectGuesses++;
                lettersGuessedEl.textContent += guessedLetter.toUpperCase() + ' ';
                updateHangmanDrawing();
                if (incorrectGuesses >= MAX_INCORRECT_GUESSES) { endGame(false); }
            }
        }
        
        function useHint() {
            if (hintUsedForCurrentWord || !secretWord || gameStatusEl.textContent) return;

            if (currentHint && currentHint !== DEFAULT_HINT_FOR_CUSTOM_WORD) { 
                hintDisplayEl.textContent = `Hint: ${currentHint}`; // Display custom hint
            } else { // Reveal a letter (default hint behavior)
                const uniqueUnguessedLetters = [...new Set(secretWord.split(''))]
                                               .filter(char => char !== ' ' && !guessedLetters.includes(char));
                let revealed = false;
                if (uniqueUnguessedLetters.length > 0) {
                    const charToReveal = uniqueUnguessedLetters[Math.floor(Math.random() * uniqueUnguessedLetters.length)];
                    hintDisplayEl.textContent = `Hint: The word contains the letter '${charToReveal.toUpperCase()}'.`;
                    const button = alphabetButtonsEl.querySelector(`button[data-letter="${charToReveal}"]`);
                    if (button && !button.disabled) { processGuess(charToReveal, button); } 
                    else if (button) { 
                        if (!guessedLetters.includes(charToReveal)) guessedLetters.push(charToReveal);
                        const currentDisplayResult = updateWordDisplay(); 
                        if (!currentDisplayResult.includes('_')) endGame(true);
                    }
                    revealed = true;
                }
                if (!revealed) { 
                    hintDisplayEl.textContent = "Hint: No more letters to reveal or all are guessed!";
                }
            }
            hintUsedForCurrentWord = true;
            hintBtn.disabled = true;
        }

        function endGame(isWin) {
            alphabetButtonsEl.querySelectorAll('.letter-btn').forEach(btn => btn.disabled = true);
            hintBtn.disabled = true; 

            if (isWin) {
                gameStatusEl.textContent = "Congratulations! You guessed it!";
                gameStatusEl.className = 'win';
            } else {
                gameStatusEl.textContent = `Game Over! The word was: ${secretWord.toUpperCase()}`;
                gameStatusEl.className = 'lose';
                let finalDisplay = '';
                 for (const char of secretWord) { 
                    finalDisplay += (char === ' ' ? ' ' : char.toUpperCase()); 
                }
                wordDisplayEl.textContent = finalDisplay.split('').join(' ').replace(/\s\s\s/g, '   '); 
            }
            
            if (currentSessionWords.length > 0) {
                playAgainBtn.classList.remove('hidden');
                playAgainBtn.disabled = false;
                playAgainBtn.textContent = "Play Again (New Word)";
            } else {
                playAgainBtn.classList.remove('hidden');
                playAgainBtn.disabled = true;
                playAgainBtn.textContent = "No More Words in List";
            }
        }