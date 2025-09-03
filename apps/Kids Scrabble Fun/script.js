// Define the size of the game board (9x9 for a simpler game)
        const BOARD_SIZE = 9;
        // Define the number of tiles a player holds on their rack
        const RACK_SIZE = 7;
        // Center square coordinates
        const CENTER_ROW = Math.floor(BOARD_SIZE / 2);
        const CENTER_COL = Math.floor(BOARD_SIZE / 2);

        // Simplified letter values for a kid-friendly game
        const LETTER_VALUES = {
            'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
            'D': 2, 'G': 2,
            'B': 3, 'C': 3, 'M': 3, 'P': 3,
            'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
            'K': 5,
            'J': 8, 'X': 8,
            'Q': 10, 'Z': 10,
            'BLANK': 0 // Blank tile has 0 points
        };

        // Tile distribution (simplified for a smaller game and common letters for kids)
        const TILE_DISTRIBUTION = {
            'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9, 'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6, 'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1,
            'BLANK': 2 // Two blank tiles for wildcards
        };

        // A curated list of kid-friendly words (all uppercase for easy validation)
        const KID_FRIENDLY_WORDS = new Set([
            "CAT", "DOG", "SUN", "FUN", "RUN", "JUMP", "PLAY", "BALL", "BOOK", "FISH", "BIRD", "TREE", "CAR", "HAT", "CUP", "SIT", "STAND", "GO", "STOP", "EAT", "DRINK", "SLEEP", "WAKE", "HAPPY", "SAD", "BIG", "SMALL", "HOT", "COLD", "WET", "DRY", "CLEAN", "DIRTY", "FAST", "SLOW", "NEW", "OLD", "GOOD", "BAD", "YES", "NO", "UP", "DOWN", "IN", "OUT", "ON", "OFF", "OVER", "UNDER", "NEAR", "FAR", "COME", "WALK", "TALK", "SEE", "HEAR", "SMELL", "TOUCH", "TASTE", "FEEL", "LOVE", "LIKE", "WANT", "HAVE", "GIVE", "TAKE", "PUT", "GET", "MAKE", "DO", "HELP", "ASK", "TELL", "SHOW", "FIND", "LOSE", "OPEN", "CLOSE", "START", "END", "WIN", "LOSE", "CRY", "LAUGH", "SMILE", "FROWN", "KISS", "HUG", "WAVE", "POINT", "CLAP", "SING", "DANCE", "READ", "WRITE", "DRAW", "PAINT", "BUILD", "FIX", "CUT", "PASTE", "COLOR", "COUNT", "ADD", "SUBTRACT", "MULTIPLY", "DIVIDE", "SHARE", "LEARN", "TEACH", "STUDY", "THINK", "KNOW", "FORGET", "REMEMBER", "FIND", "SEEK", "CHASE", "CATCH", "THROW", "KICK", "HIT", "PUSH", "PULL", "CRAWL", "HOP", "SKIP", "BOUNCE", "SWIM", "FLY", "CLIMB", "SLIDE", "SWING", "RIDE", "DRIVE", "BUILD", "DIG", "PLANT", "GROW", "WATER", "FEED", "WASH", "BRUSH", "COMB", "DRESS", "UNDRESS", "TIE", "UNTIE", "ZIP", "UNZIP", "BUTTON", "UNBUTTON", "FOLD", "UNFOLD", "ROLL", "UNROLL", "BREAK", "MEND", "REPAIR", "CLEANSE", "SWEEP", "MOP", "DUST", "VACUUM", "IRON", "FOLD", "HANG", "LIGHT", "DARK", "BRIGHT", "DIM", "LOUD", "QUIET", "SOFT", "HARD", "SMOOTH", "ROUGH", "SHARP", "BLUNT", "LONG", "SHORT", "TALL", "WIDE", "NARROW", "THICK", "THIN", "HEAVY", "LIGHT", "EMPTY", "FULL", "WHOLE", "BROKEN", "CRACKED", "DAMAGED", "LOST", "FOUND", "READY", "NOT", "TRUE", "FALSE", "REAL", "FAKE", "SURE", "UNSURE", "POSSIBLE", "IMPOSSIBLE", "EASY", "DIFFICULT", "SIMPLE", "COMPLEX", "FUNNY", "SERIOUS", "CUTE", "UGLY", "PRETTY", "HANDSOME", "KIND", "MEAN", "NICE", "NASTY", "POLITE", "RUDE", "BRAVE", "SCARED", "ANGRY", "CALM", "EXCITED", "BORED", "TIRED", "RESTED", "HUNGRY", "THIRSTY", "FULL", "SICK", "WELL", "STRONG", "WEAK", "FAST", "SLOW", "QUICK", "LEISURELY", "EARLY", "LATE", "FIRST", "LAST", "NEXT", "PREVIOUS", "SAME", "DIFFERENT", "ALIKE", "UNLIKE", "ABOUT", "ACROSS", "AFTER", "AGAINST", "ALONG", "AMONG", "AROUND", "AT", "BEFORE", "BEHIND", "BELOW", "BENEATH", "BESIDE", "BETWEEN", "BEYOND", "BUT", "BY", "DESPITE", "DOWN", "DURING", "EXCEPT", "FOR", "FROM", "INTO", "LIKE", "OF", "OFF", "ONTO", "PAST", "PER", "ROUND", "SINCE", "THROUGH", "THROUGHOUT", "TILL", "TO", "TOWARD", "UNDERNEATH", "UNTIL", "UPON", "WITH", "WITHIN", "WITHOUT", "AUNT", "UNCLE", "MOM", "DAD", "BRO", "SIS", "GRAND", "NANA", "PAPA", "COUSIN", "FRIEND", "BABY", "CHILD", "KID", "BOY", "GIRL", "MAN", "WOMAN", "PEOPLE", "FAMILY", "HOME", "HOUSE", "ROOM", "BED", "TABLE", "CHAIR", "SOFA", "LAMP", "CLOCK", "DOOR", "WINDOW", "WALL", "FLOOR", "ROOF", "GARDEN", "YARD", "PARK", "SCHOOL", "STORE", "FARM", "ZOO", "BEACH", "RIVER", "LAKE", "MOUNTAIN", "FOREST", "FIELD", "ROAD", "STREET", "CITY", "TOWN", "VILLAGE", "COUNTRY", "WORLD", "SUN", "MOON", "STAR", "CLOUD", "RAIN", "SNOW", "WIND", "FOG", "ICE", "FIRE", "WATER", "AIR", "EARTH", "SKY", "GRASS", "FLOWER", "LEAF", "BRANCH", "TRUNK", "ROOT", "SEED", "FRUIT", "VEGGIE", "BREAD", "CHEESE", "MILK", "JUICE", "WATER", "CEREAL", "EGGS", "MEAT", "RICE", "PASTA", "SOUP", "SALAD", "PIZZA", "BURGER", "FRIES", "CAKE", "COOKIE", "CANDY", "CHOCO", "ICE CREAM", "TOY", "DOLL", "CAR", "TRUCK", "TRAIN", "PLANE", "BOAT", "BIKE", "SCOOTER", "BALLOON", "KITE", "BLOCK", "PUZZLE", "GAME", "ART", "CRAYON", "PENCIL", "PAPER", "SCISSOR", "GLUE", "PAINT", "BRUSH", "BOOK", "STORY", "SONG", "MUSIC", "DANCE", "PLAY", "SHOW", "MOVIE", "TV", "RADIO", "PHONE", "COMPUTER", "TABLET", "CAMERA", "WATCH", "CLOCK", "CALENDAR", "MAP", "GLOBE", "FLAG", "MONEY", "COIN", "BILL", "CARD", "KEY", "LOCK", "BOX", "BAG", "BASKET", "BOTTLE", "CUP", "PLATE", "FORK", "SPOON", "KNIFE", "TOWEL", "SOAP", "TOOTH", "PASTE", "BRUSH", "SHIRT", "PANTS", "DRESS", "SKIRT", "HAT", "SHOE", "SOCK", "GLOVE", "COAT", "JACKET", "SCARF", "BELT", "BUTTON", "ZIPPER", "POCKET", "COLLAR", "SLEEVE", "HOOD", "RAINCOAT", "SWEATER", "JEANS", "SNEAKER", "BOOT", "SANDAL", "SLIPPER", "PAJAMA", "ROBE", "BATHROBE", "SWIMSUIT", "SUNGLASS", "UMBRELLA", "BACKPACK", "LUNCHBOX", "WATER BOTTLE", "THERMOS", "BLANKET", "PILLOW", "SHEET", "MATTRESS", "CRIB", "BUNK BED", "DESK", "CHAIR", "BOOKCASE", "DRAWER", "CLOSET", "MIRROR", "COMB", "BRUSH", "HAIR", "WASHCLOTH", "SHAMPOO", "CONDITIONER", "LOTION", "POWDER", "DIAPER", "WIPE", "TALCUM", "OINTMENT", "BANDAGE", "MEDICINE", "VITAMIN", "SYRUP", "DROP", "SPRAY", "COTTON", "SWAB", "TAPE", "GEL", "CREAM", "FOAM", "BUBBLE", "SOAP", "SPONGE", "BATH", "SHOWER", "TOILET", "SINK", "FAUCET", "TOWEL RACK", "TOILET PAPER", "TRASH", "CAN", "DUSTPAN", "BROOM", "MOP", "BUCKET", "SPONGE", "WIPER", "CLEANER", "DETERGENT", "BLEACH", "SCOURER", "BRUSH", "RAG", "CLOTH", "NAPKIN", "TISSUE", "PAPER TOWEL", "PLASTIC BAG", "TINFOIL", "WRAP", "CONTAINER", "LID", "BOWL", "PLATE", "CUP", "MUG", "GLASS", "SAUCER", "TRAY", "POT", "PAN", "KETTLE", "TOASTER", "OVEN", "MICROWAVE", "FRIDGE", "FREEZER", "DISHWASHER", "SPOON", "FORK", "KNIFE", "SPATULA", "WHISK", "LADLE", "TONG", "GRATER", "PEELER", "CUTTER", "BOARD", "MAT", "MITT", "APRON", "TEA", "COFFEE", "SUGAR", "SALT", "PEPPER", "HERB", "SPICE", "OIL", "VINEGAR", "MUSTARD", "KETCHUP", "JAM", "HONEY", "SYRUP", "BUTTER", "MARGARINE", "YOGURT", "CREAM", "CHEESE", "EGG", "BACON", "SAUSAGE", "HAM", "CHICKEN", "BEEF", "FISH", "SHRIMP", "CRAB", "TUNA", "SALMON", "TROUT", "COD", "HERRING", "SARDINE", "ANCHOVY", "OYSTER", "CLAM", "MUSSEL", "SCALLOP", "LOBSTER", "CRABMEAT", "PORK", "LAMB", "TURKEY", "DUCK", "GOOSE", "VEAL", "VENISON", "RABBIT", "CORN", "BEAN", "PEA", "CARROT", "POTATO", "TOMATO", "ONION", "GARLIC", "LETTUCE", "SPINACH", "BROCCOLI", "CAULIFLOWER", "CABBAGE", "CELERY", "CUCUMBER", "PEPPER", "MUSHROOM", "OLIVE", "APPLE", "BANANA", "ORANGE", "GRAPE", "BERRY", "STRAWBERRY", "BLUEBERRY", "RASPBERRY", "CHERRY", "PEACH", "PEAR", "PLUM", "KIWI", "MANGO", "PINEAPPLE", "MELON", "WATERMELON", "CANTALOUPE", "HONEYDEW", "LEMON", "LIME", "COCONUT", "NUT", "PEANUT", "ALMOND", "WALNUT", "CASHEW", "PISTACHIO", "CHESTNUT", "HAZELNUT", "SUNFLOWER", "PUMPKIN", "SESAME", "FLAX", "CHIA", "OAT", "WHEAT", "RYE", "BARLEY", "CORN", "RICE", "PASTA", "NOODLE", "BREAD", "ROLL", "BAGEL", "MUFFIN", "DONUT", "CROISSANT", "CRACKER", "BISCUIT", "PRETZEL", "CHIP", "POPCORN", "CANDY", "GUM", "CHOCOLATE", "JELLY", "MARMALADE", "PRESERVE", "JAM", "HONEY", "SYRUP", "MOLASSES", "AGAVE", "MAPLE", "CORN", "SODA", "JUICE", "MILKSHAKE", "SMOOTHIE", "LEMONADE", "ICE TEA", "HOT CHOCOLATE", "COCOA", "CIDER", "BEER", "WINE", "SPIRIT", "WHISKEY", "VODKA", "GIN", "RUM", "BRANDY", "TEQUILA", "LIQUEUR", "COCKTAIL", "MOCKTAIL", "SHAKE", "BLEND", "STIR", "MIX", "POUR", "SIP", "GULP", "CHEW", "SWALLOW", "BITE", "CRUNCH", "MUNCH", "NIBBLE", "LICK", "SLURP", "DRIP", "SPILL", "FILL", "EMPTY", "ADD", "REMOVE", "PUT", "TAKE", "GIVE", "RECEIVE", "BUY", "SELL", "PAY", "SPEND", "SAVE", "BORROW", "LEND", "OWE", "EARN", "WORK", "JOB", "TASK", "CHORE", "DUTY", "ROLE", "PART", "SHARE", "HALF", "WHOLE", "PIECE", "CHUNK", "SLICE", "BIT", "SCRAP", "DROP", "PUDDLE", "STREAM", "RIVER", "LAKE", "POND", "OCEAN", "SEA", "BAY", "GULF", "CANAL", "BRIDGE", "DAM", "WELL", "FOUNTAIN", "PIPE", "FAUCET", "HOSE", "SPRINKLER", "RAINBOW", "SUNSHINE", "THUNDER", "LIGHTNING", "STORM", "TORNADO", "HURRICANE", "EARTHQUAKE", "VOLCANO", "FLOOD", "DROUGHT", "FIRE", "SMOKE", "ASH", "DUST", "FOG", "MIST", "DEW", "FROST", "ICE", "HAIL", "SLEET", "BLIZZARD", "AVALANCHE", "GLACIER", "ICEBERG", "SNOWFLAKE", "ICICLE", "WAVE", "TIDE", "CURRENT", "SURF", "SHORE", "BEACH", "SAND", "GRAVEL", "ROCK", "STONE", "PEBBLE", "BOULDER", "CLIFF", "CAVE", "HILL", "MOUNTAIN", "VALLEY", "PLAIN", "DESERT", "FOREST", "WOODS", "JUNGLE", "SWAMP", "MARSH", "MEADOW", "FIELD", "PASTURE", "FARM", "RANCH", "ORCHARD", "VINEYARD", "GARDEN", "PARK", "ZOO", "SANCTUARY", "RESERVE", "WILDLIFE", "NATURE", "ENVIRONMENT", "POLLUTION", "RECYCLE", "COMPOST", "SAVE", "PROTECT", "CARE", "SHARE", "HELP", "KINDNESS", "LOVE", "PEACE", "HOPE", "JOY", "FUN", "PLAY", "LAUGH", "SMILE", "HUG", "KISS", "FRIEND", "FAMILY", "HOME", "SCHOOL", "LEARN", "GROW", "CHANGE", "EXPLORE", "DISCOVER", "IMAGINE", "DREAM", "BELIEVE", "CREATE", "BUILD", "MAKE", "DO", "GO", "COME", "STOP", "START", "FINISH", "WIN", "LOSE", "TRY", "SUCCEED", "FAIL", "REPEAT", "PRACTICE", "LEARN", "TEACH", "GUIDE", "LEAD", "FOLLOW", "LISTEN", "SPEAK", "TALK", "SING", "READ", "WRITE", "DRAW", "PAINT", "COLOR", "CRAFT", "BUILD", "PLAY", "GAME", "SPORT", "RACE", "JUMP", "RUN", "WALK", "HOP", "SKIP", "DANCE", "SWIM", "FLY", "CLIMB", "RIDE", "DRIVE", "SAIL", "ROW", "FISH", "HUNT", "EXPLORE", "HIKE", "CAMP", "PICNIC", "TRAVEL", "VISIT", "TOUR", "SEE", "WATCH", "LOOK", "OBSERVE", "NOTICE", "FEEL", "TOUCH", "SMELL", "TASTE", "HEAR", "LISTEN", "THINK", "KNOW", "WONDER", "ASK", "ANSWER", "QUESTION", "PROBLEM", "SOLUTION", "IDEA", "PLAN", "GOAL", "DREAM", "WISH", "HOPE", "AIM", "TARGET", "SUCCESS", "FAILURE", "CHALLENGE", "EFFORT", "HARD WORK", "PATIENCE", "PERSEVERE", "COURAGE", "BRAVE", "STRONG", "WEAK", "FAST", "SLOW", "QUICK", "CAREFUL", "GENTLE", "KIND", "NICE", "GOOD", "BAD", "RIGHT", "WRONG", "TRUE", "FALSE", "HAPPY", "SAD", "ANGRY", "CALM", "EXCITED", "BORED", "TIRED", "ENERGETIC", "RESTED", "HUNGRY", "THIRSTY", "FULL", "EMPTY", "CLEAN", "DIRTY", "NEAT", "MESSY", "ORGANIZED", "DISORGANIZED", "SIMPLE", "COMPLEX", "EASY", "DIFFICULT", "BIG", "SMALL", "LARGE", "TINY", "HUGE", "GIANT", "LITTLE", "MINI", "MACRO", "MICRO", "LONG", "SHORT", "TALL", "WIDE", "NARROW", "THICK", "THIN", "HEAVY", "LIGHT", "HARD", "SOFT", "SMOOTH", "ROUGH", "SHARP", "BLUNT", "BRIGHT", "DIM", "DARK", "LIGHT", "COLORFUL", "PLAIN", "NEW", "OLD", "YOUNG", "AGED", "ANCIENT", "MODERN", "CLASSIC", "TRENDY", "FUNNY", "SERIOUS", "SILLY", "WISE", "CLEVER", "SMART", "DUMB", "FOOLISH", "KIND", "CRUEL", "HONEST", "DISHONEST", "FAIR", "UNFAIR", "JUST", "UNJUST", "POLITE", "RUDE", "GRATEFUL", "UNGRATEFUL", "THANKFUL", "SORRY", "PLEASE", "EXCUSE", "PARDON", "HELLO", "GOODBYE", "HI", "BYE", "YES", "NO", "MAYBE", "OKAY", "AGREE", "DISAGREE", "ACCEPT", "DECLINE", "COME", "GO", "STOP", "WAIT", "HURRY", "SLOWLY", "QUIETLY", "LOUDLY", "GENTLY", "CAREFULLY", "FAST", "SLOW", "QUICK", "NEAR", "FAR", "HERE", "THERE", "EVERY", "SOME", "NONE", "ALL", "FEW", "MANY", "MUCH", "MORE", "LESS", "MOST", "LEAST", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ACT", "ADD", "AGE", "AGO", "AID", "AIM", "AIR", "ALE", "ALL", "AND", "ANT", "ANY", "APE", "APT", "ARC", "ARE", "ARK", "ARM", "ART", "ASH", "ASK", "ASP", "ATE", "AWE", "AXE", "BAD", "BAG", "BAM", "BAN", "BAR", "BAT", "BAY", "BED", "BEE", "BEG", "BET", "BID", "BIG", "BIN", "BIO", "BIT", "BOA", "BOB", "BOG", "BOO", "BOX", "BOY", "BRA", "BRO", "BUD", "BUG", "BUM", "BUN", "BUS", "BUT", "BUY", "BYE", "CAB", "CAD", "CAN", "CAP", "CAR", "CAT", "COW", "COY", "CRY", "CUB", "CUD", "CUT", "DAB", "DAD", "DAM", "DAN", "DAY", "DEE", "DEN", "DEW", "DID", "DIE", "DIG", "DIM", "DIN", "DIP", "DOG", "DON", "DOT", "DRY", "DUB", "DUE", "DUG", "DUO", "EAR", "EAT", "EBB", "EGO", "ELF", "ELM", "END", "ERA", "ERG", "ERR", "EVE", "EYE", "FAD", "FAN", "FAR", "FAT", "FAX", "FED", "FEE", "FEN", "FEW", "FIG", "FIN", "FIT", "FIX", "FLU", "FLY", "FOE", "FOG", "FOP", "FOR", "FOX", "FUN", "FUR", "GAG", "GAL", "GAP", "GAS", "GAY", "GEL", "GEM", "GET", "GIN", "GIP", "GOD", "GOG", "GOT", "GUM", "GUN", "GUT", "HAD", "HAG", "HAM", "HAS", "HAT", "HAY", "HEM", "HEN", "HER", "HEW", "HEX", "HEY", "HID", "HIM", "HIP", "HIS", "HIT", "HOB", "HOE", "HOG", "HOP", "HOT", "HOW", "HUB", "HUE", "HUG", "HUM", "HUT", "ICE", "ILL", "IMP", "INK", "INN", "ION", "IRE", "IRK", "IVY", "JAB", "JAG", "JAM", "JAR", "JAW", "JAY", "JET", "JEW", "JIB", "JIG", "JOB", "JOG", "JOT", "JOY", "JUG", "JUN", "KEG", "KEN", "KEY", "KID", "KIN", "KIP", "KIT", "LAB", "LAC", "LAD", "LAG", "LAP", "LAY", "LED", "LEE", "LEG", "LET", "LID", "LIE", "LIP", "LIT", "LOB", "LOG", "LOO", "LOT", "LOW", "LUG", "LUM", "LUX", "MAD", "MAN", "MAP", "MAR", "MAT", "MAX", "MAY", "MEN", "MET", "MEW", "MID", "MIM", "MIX", "MOB", "MOD", "MOL", "MOM", "MON", "MOO", "MOP", "MOW", "MUD", "MUG", "MUM", "NET", "NEW", "NIB", "NIL", "NIP", "NIT", "NOD", "NON", "NOR", "NOS", "NOT", "NOV", "NOW", "NUD", "NUT", "OAK", "OAR", "OAT", "ODD", "ODE", "OFF", "OFT", "OIL", "OLD", "OLE", "ONE", "OPT", "ORB", "ORE", "ORG", "OUR", "OUT", "OWN", "OWL", "PAD", "PAL", "PAN", "PAT", "PAW", "PAY", "PEA", "PEG", "PEN", "PEP", "PER", "PET", "PIE", "PIG", "PIN", "PIP", "PIT", "PLY", "POD", "POE", "POP", "POT", "POW", "PRO", "PRY", "PUB", "PUG", "PUN", "PUP", "PUT", "RAG", "RAM", "RAN", "RAP", "RAT", "RAW", "RAY", "REB", "RED", "REF", "REM", "REP", "RET", "RIB", "RID", "RIG", "RIM", "RIP", "ROB", "ROD", "ROE", "ROT", "ROW", "RUB", "RUE", "RUG", "RUN", "RUT", "SAD", "SAG", "SAL", "SAM", "SAN", "SAP", "SAT", "SAW", "SAY", "SEA", "SEE", "SEL", "SEN", "SET", "SEW", "SIX", "SKY", "SLY", "SOB", "SOD", "SON", "SOP", "SOT", "SOW", "SOY", "SPA", "SPY", "SRI", "STY", "SUE", "SUM", "SUN", "SUP", "TAB", "TAD", "TAG", "TAN", "TAP", "TAR", "TAS", "TAT", "TAX", "TEA", "TED", "TEE", "TEN", "THE", "THY", "TIC", "TIE", "TIN", "TIP", "TIT", "TOE", "TOG", "TON", "TOO", "TOP", "TOR", "TOT", "TOW", "TOY", "TRY", "TUB", "TUG", "TUM", "TUN", "TWO", "USE", "VAN", "VAT", "VAS", "VET", "VIE", "VIM", "VOW", "WAD", "WAG", "WAN", "WAR", "WAS", "WAX", "WAY", "WEB", "WED", "WEE", "WET", "WHO", "WHY", "WIG", "WIN", "WIS", "WIT", "WOE", "WON", "WOO", "WOW", "WRY", "YAM", "YAP", "YAR", "YAW", "YAY", "YES", "YET", "YEW", "YIP", "YOU", "YUM", "ZAP", "ZED", "ZIP", "ZOO", "ABLE", "ACID", "ACRE", "ACTS", "ADDS", "AGES", "AIMS", "AIRS", "AJAR", "ALIT", "ALLY", "ALTO", "AMEN", "AMID", "ANON", "APEX", "ARCH", "AREA", "ARGO", "ARMS", "ARMY", "ARTS", "ATOM", "AURA", "AUTO", "AVEN", "AWED", "AWRY", "BACK", "BAKE", "BALD", "BALE", "BALK", "BALL", "BAND", "BANE", "BANG", "BANK", "BARK", "BARN", "BASE", "BASH", "BASK", "BASS", "BATH", "BATS", "BAYT", "BEAR", "BEAT", "BECK", "BEEF", "BEEN", "BEER", "BELL", "BELT", "BEND", "BENT", "BIAS", "BILE", "BILL", "BIND", "BIRD", "BITE", "BLAB", "BLAH", "BLAM", "BLAT", "BLEB", "BLED", "BLEW", "BLIP", "BLOB", "BLOC", "BLOG", "BLOT", "BLOW", "BLUE", "BLUR", "BOAR", "BOAT", "BODY", "BOIL", "BOLD", "BOLT", "BOMB", "BONA", "BOND", "BONE", "BONG", "BOOK", "BOON", "BOOT", "BORE", "BORN", "BOSS", "BOTH", "BOUT", "BOWL", "BRAN", "BRAS", "BRAT", "BRAY", "BRED", "BREW", "BRIE", "BRIG", "BRIM", "BRIN", "BRIO", "BROS", "BROW", "BUCK", "BUFF", "BULB", "BULK", "BULL", "BUMP", "BUNK", "BUNT", "BUOY", "BURN", "BURY", "BUSH", "BUSS", "BUSY", "BYTE", "CABIN", "CABLE", "CAGE", "CALM", "CAME", "CANE", "CANT", "CARD", "CARE", "CART", "CASE", "CASH", "CAST", "CAVE", "CEIL", "CELL", "CENT", "CHAD", "CHEF", "CHIC", "CHIN", "CHIP", "CHUG", "CITE", "CITY", "CLAN", "CLAP", "CLAW", "CLAY", "CLIP", "CLOG", "CLON", "CLOP", "CLOT", "CLUB", "CLUE", "COAL", "COAT", "CODE", "COIL", "COIN", "COKE", "COLD", "COLT", "COME", "CONE", "CONS", "COOK", "COOL", "COOP", "COPE", "COPY", "CORE", "CORN", "COST", "COTE", "COTS", "CRAP", "CREW", "CRIB", "CROP", "CROW", "CRUX", "CUBA", "CUBE", "CUES", "CUFF", "CULT", "CURB", "CURE", "CURL", "CURT", "CUSP", "CUTE", "CUTT", "DAIS", "DALE", "DAMP", "DANE", "DARE", "DARK", "DARN", "DART", "DASH", "DATA", "DATE", "DAWN", "DAYS", "DEAL", "DEAN", "DEAR", "DEBT", "DECK", "DEED", "DEEP", "DEER", "DEFT", "DELI", "DEMO", "DENT", "DENY", "DESK", "DICE", "DIET", "DIGS", "DIME", "DINE", "DING", "DINT", "DIRT", "DISC", "DISH", "DIVE", "DOCK", "DOLL", "DOME", "DONS", "DOOM", "DOOR", "DOPE", "DORM", "DOSE", "DOTS", "DOWN", "DOZE", "DRAG", "DRAM", "DRAW", "DREW", "DRIP", "DROP", "DRUB", "DRUG", "DRUM", "DRYS", "DUCK", "DUCT", "DUDE", "DULL", "DUMB", "DUMP", "DUNE", "DUNK", "DUSK", "DUST", "DUTY", "EACH", "EARN", "EARS", "EASE", "EAST", "EASY", "EATS", "ECHO", "EDGE", "EELS", "EGAD", "EGGS", "EIGHT", "ELSE", "EMIT", "ENDS", "EPIC", "EVEN", "EVER", "EVIL", "EXIT", "EYES", "FACE", "FACT", "FADE", "FAIL", "FAIR", "FAKE", "FALL", "FAME", "FANG", "FARM", "FAST", "FATE", "FAWN", "FEAR", "FEAT", "FEED", "FEEL", "FEET", "FELL", "FELT", "FEND", "FERN", "FEST", "FETE", "FEUD", "FILE", "FILL", "FILM", "FIND", "FINE", "FINK", "FIRE", "FIRM", "FISH", "FIST", "FITS", "FIVE", "FIZZ", "FLAB", "FLAG", "FLAK", "FLAM", "FLAN", "FLAP", "FLAT", "FLAX", "FLEE", "FLEX", "FLIP", "FLIT", "FLOC", "FLOE", "FLOG", "FLOP", "FLOW", "FLUX", "FOAL", "FOAM", "FOBS", "FOLD", "FOLK", "FOND", "FOOD", "FOOL", "FOOT", "FORK", "FORM", "FORT", "FOUL", "FOUR", "FOWL", "FOXY", "FREE", "FRET", "FROG", "FROM", "FULL", "FUME", "FUND", "FUNK", "FURY", "FUSE", "FUSS", "GAIN", "GAIT", "GALA", "GALL", "GAME", "GANG", "GAPE", "GARB", "GASH", "GATE", "GAZE", "GEAR", "GELD", "GEMS", "GENE", "GENT", "GERM", "GIFT", "GIGS", "GILL", "GILT", "GINS", "GIRD", "GIRL", "GIRT", "GIVE", "GLAD", "GLEE", "GLEN", "GLIB", "GLOB", "GLOP", "GLOW", "GLUE", "GLUT", "GOAT", "GODS", "GOLD", "GOLF", "GONE", "GONG", "GOOD", "GOOF", "GORE", "GOSH", "GOWN", "GRAB", "GRAD", "GRAM", "GRAN", "GRAP", "GRAY", "GREY", "GRID", "GRIM", "GRIN", "GRIP", "GRIT", "GROG", "GROK", "GROS", "GROW", "GRUB", "GULF", "GULP", "GUNS", "GURU", "GUSH", "GUST", "GUTS", "GUYS", "GYMS", "HACK", "HAFT", "HAIR", "HAKE", "HALF", "HALL", "HALO", "HALT", "HAND", "HANG", "HARD", "HARE", "HARK", "HARM", "HARP", "HASH", "HATE", "HATS", "HAUL", "HAVE", "HAZE", "HEAD", "HEAL", "HEAP", "HEAR", "HEAT", "HEED", "HEEL", "HEFT", "HEIR", "HELD", "HELM", "HELP", "HEMP", "HENS", "HERB", "HERD", "HERE", "HERO", "HERS", "HEWN", "HIDE", "HIGH", "HILL", "HILT", "HINT", "HIPS", "HIRE", "HISS", "HITS", "HIVE", "HOAR", "HOAX", "HOBB", "HOCK", "HODS", "HOES", "HOGS", "HOLD", "HOLE", "HOLL", "HOLY", "HOME", "HONE", "HONK", "HOOK", "HOOP", "HOOT", "HOPE", "HOPS", "HORN", "HOSE", "HOST", "HOUR", "HOYA", "HUBS", "HUES", "HUFF", "HUGS", "HULA", "HULK", "HULL", "HUMP", "HUNK", "HUNT", "HURL", "HURT", "HUSH", "HUSK", "HUTS", "HYDE", "HYPE", "HYPO", "IBIS", "ICES", "ICON", "IDEA", "IDLE", "IDLY", "IDOL", "IFFY", "IGLO", "ILLS", "IMPS", "INCH", "INFO", "INKY", "INNS", "INTO", "IOTA", "IRON", "ISLE", "ITCH", "ITEM", "IVAN", "JABS", "JACK", "JADE", "JAGS", "JAIL", "JAKE", "JAMS", "JAPE", "JAWS", "JAZZ", "JEAN", "JEER", "JEEP", "JELL", "JESS", "JEST", "JETS", "JIBE", "JIBS", "JIGS", "JILL", "JILT", "JINX", "JIVE", "JOAN", "JOBS", "JOCK", "JOEY", "JOGS", "JOIN", "JOKE", "JOLY", "JOLT", "JONE", "JOSS", "JOST", "JOTS", "JOUR", "JOVE", "JOYS", "JUCO", "JUDO", "JUGS", "JUJU", "JUKE", "JULY", "JUMP", "JUNE", "JUNK", "JURY", "JUST", "JUTE", "KALE", "KARA", "KARL", "KATA", "KAYS", "KEEL", "KEEN", "KEEP", "KEGS", "KELP", "KENT", "KEYS", "KHAN", "KICK", "KIDS", "KILL", "KILO", "KILT", "KIND", "KING", "KINS", "KIPS", "KIRK", "KISS", "KITS", "KITTY", "KIVI", "KIWI", "KNIT", "KNOB", "KNOP", "KNOT", "KNOW", "KUDO", "KUDU", "KYAT", "KYLE", "KYTE", "LABS", "LACE", "LACK", "LADS", "LADY", "LAGS", "LAID", "LAIR", "LAKE", "LAME", "LAMP", "LAND", "LANE", "LAPS", "LARD", "LARK", "LASH", "LAST", "LATE", "LAUD", "LAVA", "LAVE", "LAWN", "LAWS", "LAYS", "LAZE", "LEAD", "LEAF", "LEAK", "LEAN", "LEAP", "LEAR", "LEAS", "LEFT", "LEGS", "LEND", "LENS", "LENT", "LESS", "LEST", "LETS", "LEWD", "LICE", "LICK", "LIDS", "LIED", "LIES", "LIEU", "LIFE", "LIFT", "LIKE", "LILL", "LILY", "LIMB", "LIME", "LIMN", "LIMP", "LINE", "LING", "LINK", "LINO", "LINS", "LINT", "LION", "LIPS", "LIRA", "LIRE", "LISP", "LIST", "LITE", "LIVE", "LOAD", "LOAF", "LOAM", "LOAN", "LOBE", "LOCK", "LOCO", "LODE", "LOFT", "LOGS", "LOIN", "LOLL", "LOND", "LONE", "LONG", "LOOK", "LOOM", "LOON", "LOOP", "LOOS", "LOOT", "LOPE", "LOPS", "LORD", "LORE", "LOSE", "LOSS", "LOST", "LOTS", "LOUD", "LOUR", "LOUT", "LOVE", "LOWE", "LUCK", "LULL", "LUMP", "LUNA", "LUNE", "LUNG", "LUNK", "LURE", "LUSH", "LUST", "LUTE", "LUXE", "LYME", "LYNX", "LYRA", "LYRE", "MACE", "MADE", "MAGG", "MAID", "MAIL", "MAIN", "MAKE", "MALE", "MALL", "MALT", "MANE", "MANY", "MAPS", "MARE", "MARK", "MARL", "MART", "MASK", "MASS", "MAST", "MATE", "MATH", "MAUL", "MAWK", "MAYA", "MAZE", "MEAN", "MEAT", "MEET", "MELD", "MELT", "MEMO", "MEND", "MENU", "MEOW", "MERE", "MERL", "MESH", "MESS", "METE", "MEWL", "MICE", "MICK", "MICS", "MIDD", "MIDE", "MIEN", "MIKE", "MILD", "MILE", "MILK", "MILL", "MILO", "MIME", "MIND", "MINE", "MING", "MINI", "MINK", "MINT", "MINX", "MIRE", "MIRK", "MIRY", "MISA", "MISS", "MIST", "MITE", "MITT", "MIXED", "MIXT", "MOAN", "MOAT", "MOBS", "MOCK", "MODE", "MOHR", "MOIL", "MOJO", "MOLD", "MOLE", "MOLL", "MOLT", "MONK", "MONS", "MOOD", "MOON", "MOOR", "MOOT", "MOPE", "MOPS", "MORE", "MORN", "MORT", "MOSS", "MOST", "MOTE", "MOTH", "MOVE", "MOWN", "MOZE", "MUCH", "MUCK", "MUDD", "MUFF", "MUGW", "MULL", "MUMM", "MUMP", "MUNG", "MUNI", "MUNK", "MUNT", "MURAL", "MURK", "MURL", "MUSH", "MUSK", "MUST", "MUTE", "MUZH", "MYNA", "MYTH", "NADA", "NAIL", "NAME", "NAPE", "NAPS", "NASH", "NAST", "NATI", "NAVE", "NAVS", "NAYV", "NEAR", "NEAT", "NECK", "NEED", "NEEM", "NEIL", "NELL", "NEON", "NERD", "NESS", "NEST", "NETH", "NEWS", "NEXT", "NICE", "NICK", "NIGH", "NILL", "NILS", "NIMB", "NINE", "NIPP", "NIPS", "NIST", "NITR", "NITS", "NOAH", "NOBS", "NODE", "NODS", "NOEL", "NOGS", "NOIL", "NOIS", "NOLK", "NOLO", "NOMB", "NONE", "NOOK", "NOON", "NOPE", "NORI", "NORM", "NOSE", "NOTH", "NOTE", "NOTT", "NOUG", "NOUN", "NOVA", "NOWS", "NUDE", "NUKE", "NULL", "NUMB", "NUNN", "NURD", "NUTT", "OAFS", "OAKS", "OARS", "OATH", "OATS", "OBEY", "OBIE", "OBOE", "ODDS", "ODOR", "OFFS", "OGLE", "OGRE", "OHMS", "OILS", "OILY", "OINK", "OKAY", "OLDS", "OLID", "OMEN", "OMIT", "ONCE", "ONES", "ONLY", "ONUS", "OOPS", "OPEN", "OPOS", "OPTS", "ORAL", "ORBS", "OREN", "ORES", "ORGAN", "ORIG", "ORIO", "ORIS", "ORLE", "ORLO", "ORNS", "ORPH", "ORRS", "ORSO", "ORTZ", "OSAR", "OSLO", "OTIC", "OTIS", "OTOS", "OUSE", "OUTS", "OVAL", "OVEN", "OVER", "OVID", "OVUM", "OWED", "OWEN", "OWLS", "OWNS", "OXEN", "PACE", "PACK", "PAGE", "PAID", "PAIL", "PAIN", "PAIR", "PALE", "PALL", "PALM", "PANE", "PANS", "PANT", "PARA", "PARE", "PARK", "PARS", "PART", "PASS", "PAST", "PATE", "PATH", "PATS", "PAUL", "PAVE", "PAWS", "PAYS", "PEAK", "PEAL", "PEAR", "PEAS", "PEAT", "PECK", "PEEK", "PEEL", "PEER", "PEGS", "PELT", "PEND", "PENS", "PERK", "PERM", "PERT", "PERU", "PESO", "PEST", "PETS", "PHAS", "PHIZ", "PHOB", "PHOT", "PIAN", "PICK", "PIED", "PIER", "PIGS", "PIKE", "PILE", "PILL", "PINE", "PING", "PINK", "PINS", "PINT", "PIPE", "PIPS", "PIRN", "PISS", "PITH", "PITS", "PITY", "PLAN", "PLAT", "PLAY", "PLEA", "PLED", "PLIE", "PLOD", "PLOT", "PLOW", "PLOY", "PLUG", "PLUS", "POEM", "POET", "POKE", "POLE", "POLL", "POND", "PONS", "PONY", "POOL", "POOP", "POOR", "POPE", "POPS", "PORE", "PORK", "PORT", "POSE", "POSH", "POST", "POTS", "POUR", "POUT", "PRAY", "PREP", "PRES", "PRET", "PREY", "PRIG", "PRIM", "PROB", "PROD", "PROF", "PROM", "PROP", "PROS", "PROV", "PROW", "PUCK", "PUFF", "PULL", "PULP", "PUMA", "PUMP", "PUNK", "PUNT", "PURE", "PURL", "PUSH", "PUTS", "PYRE", "QUAL", "QUAY", "QUEY", "QUID", "QUIP", "QUIT", "QUOD", "RACE", "RACK", "RAGS", "RAID", "RAIL", "RAIN", "RAIS", "RAKE", "RAMP", "RAND", "RANG", "RANK", "RANT", "RARE", "RASH", "RATE", "RATH", "RAVE", "RAWS", "RAYS", "RAZE", "READ", "REAL", "REAP", "REAR", "RECK", "REDS", "REED", "REEF", "REEK", "REEL", "REFS", "REIN", "RELY", "REMOTE", "REND", "RENE", "REPT", "REST", "RETE", "RICE", "RICH", "RICO", "RIDE", "RIFE", "RIFF", "RIFT", "RIGG", "RILE", "RIMS", "RIND", "RING", "RINK", "RINS", "RIOT", "RIPE", "RIPP", "RISE", "RISK", "RITE", "RITZ", "RIVA", "ROAD", "ROAM", "ROAR", "ROBE", "ROBS", "ROCK", "ROCS", "RODE", "RODS", "ROIL", "ROMA", "ROME", "ROMP", "RONE", "ROOF", "ROOK", "ROOM", "ROOT", "ROPE", "ROPS", "ROSE", "ROSY", "ROTE", "ROUG", "ROVE", "ROWS", "RUBB", "RUBY", "RUCS", "RUDE", "RUED", "RUES", "RUFF", "RUGA", "RUGS", "RUIN", "RULE", "RUMP", "RUMS", "RUNG", "RUNS", "RUNT", "RUSH", "RUSK", "RUST", "RUTH", "RUTS", "RYAN", "RYLE", "SACK", "SAFE", "SAGA", "SAGE", "SAID", "SAIL", "SAIN", "SAKE", "SALA", "SALE", "SALL", "SALT", "SAME", "SAND", "SANE", "SANG", "SANK", "SAPS", "SARD", "SARI", "SASH", "SASS", "SATE", "SAVE", "SAWN", "SAWS", "SCAB", "SCAD", "SCAG", "SCAL", "SCAM", "SCAN", "SCAR", "SCAT", "SCOP", "SCOT", "SCOW", "SCUD", "SCUM", "SEAL", "SEAM", "SEAR", "SEAS", "SEAT", "SECT", "SEED", "SEEK", "SEEM", "SEEN", "SEER", "SEES", "SELF", "SELL", "SEND", "SENN", "SENT", "SEPT", "SERF", "SESS", "SETS", "SEWN", "SEWS", "SHAD", "SHAG", "SHAM", "SHAW", "SHEA", "SHED", "SHIN", "SHIP", "SHOE", "SHOP", "SHOT", "SHOW", "SHRI", "SHUT", "SICK", "SIDE", "SIFT", "SIGN", "SILK", "SILL", "SILO", "SILT", "SINE", "SING", "SINK", "SINS", "SITE", "SITS", "SIXTH", "SIZE", "SKEE", "SKID", "SKIM", "SKIN", "SKIP", "SKIT", "SKUA", "SLAB", "SLAG", "SLAM", "SLAP", "SLAT", "SLAW", "SLAY", "SLED", "SLEW", "SLID", "SLIM", "SLIP", "SLIT", "SLOB", "SLOE", "SLOG", "SLOP", "SLOW", "SLUG", "SLUM", "SLUR", "SMOG", "SMUG", "SNAG", "SNAP", "SNAR", "SNEE", "SNIB", "SNIP", "SNIT", "SNOB", "SNOO", "SNOW", "SNUB", "SNUG", "SOAK", "SOAP", "SOAR", "SOBS", "SOCK", "SODA", "SOFA", "SOFT", "SOIL", "SOJO", "SOLD", "SOLE", "SOLO", "SOME", "SONG", "SOON", "SOOT", "SOPS", "SORE", "SORT", "SOUL", "SOUP", "SOUR", "SOWN", "SOWS", "SOYA", "SPAS", "SPAT", "SPAY", "SPEC", "SPED", "SPIN", "SPIT", "SPOT", "SPRY", "SPUD", "SPUR", "SQUA", "STAR", "STAY", "STEM", "STEP", "STEW", "STIC", "STIR", "STOP", "STOW", "STUB", "STUD", "SUMS", "SUNG", "SUNK", "SUNN", "SUPS", "SURE", "SURF", "SWAB", "SWAG", "SWAM", "SWAN", "SWAP", "SWAT", "SWAY", "SWEE", "SWIF", "SWIM", "SWIN", "SWOB", "SWOP", "SWOT", "TABS", "TACK", "TADS", "TAIL", "TAKE", "TALE", "TALK", "TALL", "TAME", "TAMP", "TANG", "TANK", "TANS", "TAPE", "TAPS", "TARD", "TARE", "TARN", "TARO", "TART", "TASK", "TASS", "TATE", "TAUT", "TAXA", "TAXI", "TAYL", "TEAK", "TEAL", "TEAM", "TEAR", "TEAS", "TEAT", "TEDDY", "TEEL", "TEEM", "TEEN", "TELL", "TEMP", "TEND", "TENS", "TENT", "TERM", "TERN", "TEST", "TEXT", "THAN", "THAT", "THAW", "THEM", "THEN", "THEN", "THEY", "THIN", "THIS", "THOU", "THRUM", "THUD", "THUG", "THUS", "TICK", "TIDE", "TIDY", "TIED", "TIES", "TIGE", "TILL", "TILM", "TILT", "TIME", "TINA", "TIND", "TINE", "TING", "TINS", "TINT", "TINY", "TIPS", "TIRE", "TIRL", "TISS", "TITE", "TITS", "TOAD", "TOBY", "TODD", "TOED", "TOES", "TOFF", "TOFU", "TOGA", "TOIL", "TOLD", "TOLL", "TOMO", "TONE", "TONG", "TONS", "TOOK", "TOOL", "TOOT", "TOPE", "TOPS", "TORA", "TORI", "TORN", "TORR", "TORS", "TORT", "TORY", "TOUT", "TOWS", "TOYS", "TRAP", "TRAY", "TREE", "TREK", "TREW", "TRIO", "TRIP", "TROT", "TRUE", "TUBA", "TUBE", "TUCK", "TUFT", "TUGS", "TULP", "TUNA", "TUNE", "TURF", "TURK", "TURN", "TUSH", "TUTS", "TUVE", "TWIN", "TWIT", "TYPE", "TYPO", "TYRE", "UDON", "UGLY", "ULNA", "ULTRA", "UNAP", "UNDR", "UNDO", "UNIT", "UNTO", "UPON", "URAL", "URGE", "URSA", "USED", "USER", "USES", "USSR", "USURP", "UTIL", "UZBE", "VACC", "VADE", "VAGR", "VAIL", "VAIN", "VALE", "VAMP", "VANE", "VANS", "VARI", "VARY", "VASC", "VASE", "VAST", "VATH", "VATS", "VAUX", "VEAL", "VECT", "VEIL", "VEIN", "VEND", "VENT", "VERB", "VERT", "VERY", "VEST", "VETS", "VETO", "VICE", "VIDE", "VIED", "VIER", "VIES", "VIEW", "VILL", "VINE", "VINY", "VIOL", "VIRE", "VIRL", "VISA", "VISE", "VITA", "VITE", "VITI", "VITS", "VIVE", "VIVO", "VIXE", "VOAL", "VOCE", "VOID", "VOIL", "VOLK", "VOLT", "VOMIT", "VOTE", "VOWS", "VULG", "WACK", "WADE", "WADI", "WADS", "WAFT", "WAGE", "WAGS", "WAIF", "WAIL", "WAIN", "WAIT", "WAKE", "WALE", "WALK", "WALL", "WALT", "WAND", "WANE", "WANG", "WANT", "WARM", "WARN", "WARP", "WARS", "WART", "WASH", "WASP", "WAST", "WATS", "WAVE", "WAVY", "WAXED", "WAXEN", "WAXER", "WAXES", "WAXW", "WAYS", "WEAK", "WEAL", "WEAN", "WEAR", "WEAS", "WEAT", "WEBB", "WEDS", "WEED", "WEEK", "WEEP", "WEER", "WEET", "WEFT", "WEIG", "WEIR", "WELD", "WELL", "WELT", "WEND", "WENT", "WERE", "WERT", "WEST", "WETN", "WETS", "WHAT", "WHEN", "WHEW", "WHET", "WHID", "WHIG", "WHIM", "WHIN", "WHIP", "WHIR", "WHIT", "WHIZ", "WHOA", "WHOM", "WHYS", "WICK", "WIDE", "WIFE", "WIGS", "WILD", "WILL", "WILT", "WIND", "WINE", "WING", "WINK", "WINS", "WIPE", "WIRE", "WIRY", "WISE", "WISH", "WISP", "WITH", "WITS", "WOAD", "WOES", "WOKE", "WOLF", "WOMB", "WOMP", "WONT", "WOOD", "WOOF", "WOOL", "WOOS", "WORD", "WORE", "WORK", "WORM", "WORN", "WOVE", "WOWS", "WRAP", "WREN", "WRIT", "WROH", "WROK", "WROX", "WUSS", "WYND", "XENA", "XERO", "YAFF", "YAGE", "YAIR", "YAKK", "YAKS", "YALE", "YAMS", "YANG", "YANK", "YARD", "YARE", "YARN", "YAUR", "YAWN", "YAWS", "YEAH", "YEAR", "YEAS", "YELL", "YELP", "YENS", "YETI", "YETT", "YEWS", "YIPS", "YOBB", "YODL", "YOGI", "YOKS", "YOLK", "YOND", "YONI", "YORE", "YORK", "YOUR", "YOWE", "YOWL", "YOWS", "YUCA", "YUCK", "YUMM", "YUAN", "ZAPS", "ZEAL", "ZECS", "ZEDS", "ZEES", "ZERO", "ZEST", "ZETA", "ZIGZ", "ZING", "ZIPS", "ZITI", "ZITS", "ZONE", "ZOOM", "ZULU"
        ]);

        // Game state variables
        let board = []; // 2D array representing the game board
        let playerRacks = [[], []]; // Array of racks for two players
        let playerScores = [0, 0]; // Scores for two players
        let currentPlayer = 0; // 0 for Player 1, 1 for Player 2
        let tileBag = []; // Array of tile objects remaining in the bag
        let selectedTile = null; // HTML element of the currently selected tile from the rack
        let selectedTileData = null; // Data of the currently selected tile
        let placedTiles = []; // Tiles temporarily placed on the board before "Play Word" is clicked

        // Get DOM elements
        const gameBoardEl = document.getElementById('game-board');
        const playerRackEl = document.getElementById('player-rack');
        const scoreP1El = document.getElementById('score-p1');
        const scoreP2El = document.getElementById('score-p2');
        const playerActualScoreP1El = document.getElementById('player-score-p1'); // New ID for score box
        const playerActualScoreP2El = document.getElementById('player-score-p2'); // New ID for score box
        const currentPlayerTurnEl = document.getElementById('current-player-turn');
        const playWordBtn = document.getElementById('play-word-btn');
        const clearBoardBtn = document.getElementById('clear-board-btn');
        const shuffleRackBtn = document.getElementById('shuffle-rack-btn');
        const passTurnBtn = document.getElementById('pass-turn-btn');
        const showRulesBtn = document.getElementById('show-rules-btn');
        const newGameBtn = document.getElementById('new-game-btn');
        const messageBox = document.getElementById('message-box');
        const messageText = document.getElementById('message-text');
        const messageBoxOkBtn = document.getElementById('message-box-ok-btn');
        const overlay = document.getElementById('overlay'); // Get the overlay element

        /**
         * Displays a custom message box to the user.
         * @param {string} message The message to display.
         */
        function showMessageBox(message) {
            messageText.textContent = message;
            messageBox.classList.add('show');
            overlay.classList.add('show'); // Show the overlay
        }

        /**
         * Hides the custom message box.
         */
        function hideMessageBox() {
            messageBox.classList.remove('show');
            overlay.classList.remove('show'); // Hide the overlay
        }

        /**
         * Initializes the game board with empty cells.
         * Each cell is a div element with data attributes for its row and column.
         */
        function initializeBoard() {
            gameBoardEl.innerHTML = ''; // Clear any existing board elements
            // Create a 2D array filled with nulls to represent empty board squares
            board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

            // Create and append each board square to the DOM
            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    const square = document.createElement('div');
                    square.classList.add('board-square');
                    square.dataset.row = r; // Store row in data attribute
                    square.dataset.col = c; // Store column in data attribute

                    // Mark the center square with a star
                    if (r === CENTER_ROW && c === CENTER_COL) {
                        square.classList.add('center-star');
                    }

                    // Add event listener for clicking on a board square
                    square.addEventListener('click', handleBoardSquareClick);
                    gameBoardEl.appendChild(square);
                }
            }
        }

        /**
         * Creates the initial tile bag based on the predefined TILE_DISTRIBUTION.
         * Assigns a unique ID to each tile.
         */
        function createTileBag() {
            tileBag = []; // Reset tile bag
            let tileIdCounter = 0; // Unique ID for each tile
            for (const letter in TILE_DISTRIBUTION) {
                for (let i = 0; i < TILE_DISTRIBUTION[letter]; i++) {
                    tileBag.push({
                        letter: letter === 'BLANK' ? '' : letter, // Blank tiles start with no letter
                        points: LETTER_VALUES[letter],
                        id: `tile-${tileIdCounter++}`, // Unique ID
                        isBlank: letter === 'BLANK' // Flag to identify blank tiles
                    });
                }
            }
            shuffleArray(tileBag); // Shuffle the bag for randomness
        }

        /**
         * Shuffles an array in place using the Fisher-Yates (Knuth) algorithm.
         * @param {Array} array The array to shuffle.
         */
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
        }

        /**
         * Draws a specified number of tiles from the bag and adds them to the current player's rack.
         * @param {number} numTiles The number of tiles to draw.
         */
        function drawTiles(numTiles) {
            for (let i = 0; i < numTiles; i++) {
                if (tileBag.length > 0) {
                    playerRacks[currentPlayer].push(tileBag.pop()); // Take tile from end of bag
                } else {
                    console.log("Tile bag is empty!");
                    break; // Stop if no more tiles
                }
            }
            renderRack(); // Update the rack display
        }

        /**
         * Renders the current player's tiles on the rack.
         * Creates HTML elements for each tile and attaches click handlers.
         */
        function renderRack() {
            playerRackEl.innerHTML = ''; // Clear existing tiles from the rack display
            playerRacks[currentPlayer].forEach(tileData => {
                const tileEl = document.createElement('div');
                tileEl.classList.add('tile', 'relative'); // 'relative' for points positioning
                tileEl.dataset.id = tileData.id; // Store tile ID in data attribute
                tileEl.textContent = tileData.letter; // Display the letter

                if (tileData.isBlank) {
                    tileEl.classList.add('bg-gray-200'); // Different background for blank tiles
                    tileEl.textContent = ''; // Blank tile initially shows nothing
                }

                const pointsEl = document.createElement('span');
                pointsEl.classList.add('points');
                pointsEl.textContent = tileData.points; // Display points
                tileEl.appendChild(pointsEl);

                // Add event listener for clicking on a tile in the rack
                tileEl.addEventListener('click', () => handleTileClick(tileEl, tileData));
                playerRackEl.appendChild(tileEl);
            });
        }

        /**
         * Handles a click on a tile in the current player's rack.
         * Selects the tile and prompts for a letter if it's a blank tile.
         * @param {HTMLElement} tileEl The clicked tile HTML element.
         * @param {object} tileData The data associated with the tile.
         */
        function handleTileClick(tileEl, tileData) {
            // Deselect any previously selected tile
            if (selectedTile) {
                selectedTile.classList.remove('selected');
            }

            // Select the new tile
            selectedTile = tileEl;
            selectedTileData = tileData;
            selectedTile.classList.add('selected');

            // If it's a blank tile and hasn't been assigned a letter yet, prompt the user
            if (tileData.isBlank && tileData.letter === '') {
                // Use a small delay to allow the 'selected' visual to appear before the prompt
                setTimeout(() => {
                    const chosenLetter = prompt("You picked a BLANK tile! What letter should it be? (A-Z)").toUpperCase();
                    if (chosenLetter && chosenLetter.length === 1 && chosenLetter.match(/[A-Z]/)) {
                        selectedTileData.letter = chosenLetter; // Assign the chosen letter to the blank tile
                        selectedTile.textContent = chosenLetter; // Update the tile's display
                        const pointsEl = document.createElement('span'); // Re-add points span
                        pointsEl.classList.add('points');
                        pointsEl.textContent = '0'; // Blank tiles always score 0 points
                        selectedTile.appendChild(pointsEl);
                    } else {
                        showMessageBox("That's not a valid letter. Please try again.");
                        // Deselect the blank tile if an invalid letter is entered
                        selectedTile.classList.remove('selected');
                        selectedTile = null;
                        selectedTileData = null;
                    }
                }, 100);
            }
        }

        /**
         * Handles a click on a board square.
         * Places the selected tile on the board or removes a temporarily placed tile.
         * @param {Event} event The click event.
         */
        function handleBoardSquareClick(event) {
            // If no tile is selected from the rack, show a message
            if (!selectedTileData) {
                showMessageBox("Please select a tile from your rack first!");
                return;
            }

            const row = parseInt(event.target.dataset.row);
            const col = parseInt(event.target.dataset.col);

            // Check if the square is already occupied by a permanently played tile
            if (board[row][col] && board[row][col].isPlayed) {
                showMessageBox("You can't place a tile on an already played tile!");
                return;
            }

            // If the square is occupied by a temporarily placed tile, remove it and return to rack
            if (board[row][col] && !board[row][col].isPlayed) {
                const tileToReturn = board[row][col];
                playerRacks[currentPlayer].push(tileToReturn); // Add tile back to current player's rack
                board[row][col] = null; // Clear the square on the board
                // Remove the tile from the list of temporarily placed tiles
                placedTiles = placedTiles.filter(t => t.id !== tileToReturn.id);
                renderBoard(); // Update board display
                renderRack(); // Update rack display
                return;
            }

            // Place the selected tile on the board
            // Create a copy of the tile data and add its board position and 'isPlayed' status
            board[row][col] = { ...selectedTileData, row, col, isPlayed: false };
            placedTiles.push(board[row][col]); // Add to temporarily placed tiles

            // Remove the tile from the current player's rack
            playerRacks[currentPlayer] = playerRacks[currentPlayer].filter(tile => tile.id !== selectedTileData.id);

            // Clear the current tile selection
            if (selectedTile) {
                selectedTile.classList.remove('selected');
            }
            selectedTile = null;
            selectedTileData = null;

            renderBoard(); // Update board display
            renderRack(); // Update rack display
        }

        /**
         * Renders the current state of the board.
         * Updates the content and styling of each board square.
         */
        function renderBoard() {
            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    const squareEl = gameBoardEl.children[r * BOARD_SIZE + c];
                    squareEl.innerHTML = ''; // Clear previous content of the square

                    const tileOnBoard = board[r][c];
                    if (tileOnBoard) {
                        // If there's a tile on this square, create and append its HTML element
                        const tileEl = document.createElement('div');
                        tileEl.classList.add('tile', 'relative');
                        // For blank tiles, display the assigned letter or a space if not yet assigned
                        tileEl.textContent = tileOnBoard.letter || (tileOnBoard.isBlank ? ' ' : '');
                        if (tileOnBoard.isBlank) {
                            tileEl.classList.add('bg-gray-200'); // Style blank tiles
                        }
                        if (tileOnBoard.isPlayed) {
                            // If the tile is permanently played, mark the square as occupied
                            squareEl.classList.add('occupied');
                            tileEl.style.cursor = 'default'; // Cannot move played tiles
                        } else {
                            // If the tile is temporarily placed, remove 'occupied' class
                            squareEl.classList.remove('occupied');
                            tileEl.style.cursor = 'pointer'; // Can click to remove temporarily placed tiles
                        }

                        const pointsEl = document.createElement('span');
                        pointsEl.classList.add('points');
                        pointsEl.textContent = tileOnBoard.points;
                        tileEl.appendChild(pointsEl);

                        squareEl.appendChild(tileEl);
                    } else {
                        // If the square is empty, ensure it doesn't have the 'occupied' class
                        squareEl.classList.remove('occupied');
                    }
                }
            }
        }

        /**
         * Calculates the score for a given word.
         * For this simplified kid's game, it's simply the sum of the letter values.
         * @param {Array<object>} wordTiles An array of tile objects forming the word.
         * @returns {number} The calculated score for the word.
         */
        function calculateWordScore(wordTiles) {
            let currentWordScore = 0;
            wordTiles.forEach(tile => {
                currentWordScore += tile.points;
            });
            return currentWordScore;
        }

        /**
         * Validates if a word is present in the predefined kid-friendly dictionary.
         * @param {string} word The word to validate.
         * @returns {boolean} True if the word is valid, false otherwise.
         */
        function validateWord(word) {
            return KID_FRIENDLY_WORDS.has(word.toUpperCase());
        }

        /**
         * Handles the "Play Word" button click event.
         * Validates the word formed by placed tiles, calculates score, and updates game state.
         */
        async function handlePlayWord() {
            // If no tiles are placed, prompt the user
            if (placedTiles.length === 0) {
                showMessageBox("Please place some tiles on the board first!");
                return;
            }

            // Sort placed tiles by row then column to easily check for straight lines
            placedTiles.sort((a, b) => a.row === b.row ? a.col - b.col : a.row - b.row);

            let isHorizontal = true;
            let isVertical = true;

            // Check if tiles form a single horizontal or vertical line
            if (placedTiles.length > 1) {
                const firstRow = placedTiles[0].row;
                const firstCol = placedTiles[0].col;

                // Check if all tiles are in the same row (horizontal)
                for (let i = 1; i < placedTiles.length; i++) {
                    if (placedTiles[i].row !== firstRow) isHorizontal = false;
                    if (placedTiles[i].col !== firstCol) isVertical = false;
                }

                // If not horizontal and not vertical, it's an invalid placement
                if (!isHorizontal && !isVertical) {
                    showMessageBox("Words must be placed in a straight line (horizontal or vertical)!");
                    clearTemporarilyPlacedTiles();
                    return;
                }

                // Check for gaps in the word (only for newly placed tiles)
                if (isHorizontal) {
                    for (let i = placedTiles[0].col; i <= placedTiles[placedTiles.length - 1].col; i++) {
                        if (board[firstRow][i] === null) {
                            showMessageBox("Words cannot have gaps!");
                            clearTemporarilyPlacedTiles();
                            return;
                        }
                    }
                } else if (isVertical) {
                    for (let i = placedTiles[0].row; i <= placedTiles[placedTiles.length - 1].row; i++) {
                        if (board[i][firstCol] === null) {
                            showMessageBox("Words cannot have gaps!");
                            clearTemporarilyPlacedTiles();
                            return;
                        }
                    }
                }
            }

            // Reconstruct the full word formed on the board (including existing tiles)
            let formedWord = "";
            let wordTilesForScoring = []; // Only new tiles contribute to this turn's score

            if (isHorizontal) {
                const row = placedTiles[0].row;
                let startCol = placedTiles[0].col;
                let endCol = placedTiles[placedTiles.length - 1].col;

                // Extend left to capture any existing tiles that are part of the word
                while (startCol > 0 && board[row][startCol - 1]) {
                    startCol--;
                }
                // Extend right to capture any existing tiles that are part of the word
                while (endCol < BOARD_SIZE - 1 && board[row][endCol + 1]) {
                    endCol++;
                }

                for (let c = startCol; c <= endCol; c++) {
                    if (board[row][c]) {
                        formedWord += board[row][c].letter;
                        // Add only newly placed tiles to the scoring array for this turn
                        if (!board[row][c].isPlayed) {
                            wordTilesForScoring.push(board[row][c]);
                        }
                    }
                }
            } else if (isVertical) {
                const col = placedTiles[0].col;
                let startRow = placedTiles[0].row;
                let endRow = placedTiles[placedTiles.length - 1].row;

                // Extend up to capture any existing tiles that are part of the word
                while (startRow > 0 && board[startRow - 1][col]) {
                    startRow--;
                }
                // Extend down to capture any existing tiles that are part of the word
                while (endRow < BOARD_SIZE - 1 && board[endRow + 1][col]) {
                    endRow++;
                }

                for (let r = startRow; r <= endRow; r++) {
                    if (board[r][col]) {
                        formedWord += board[r][col].letter;
                        // Add only newly placed tiles to the scoring array for this turn
                        if (!board[r][col].isPlayed) {
                            wordTilesForScoring.push(board[r][col]);
                        }
                    }
                }
            }

            // Check if the word connects to an existing word (after the first turn)
            let connectedToExisting = false;
            // The very first word played (when score is 0 for both players) must use center
            if (playerScores[0] === 0 && playerScores[1] === 0) {
                const centerRow = Math.floor(BOARD_SIZE / 2);
                const centerCol = Math.floor(BOARD_SIZE / 2);
                let usesCenter = false;
                for (const tile of placedTiles) {
                    if (tile.row === centerRow && tile.col === centerCol) {
                        usesCenter = true;
                        break;
                    }
                }
                if (!usesCenter) {
                    showMessageBox("The first word must use the center square!");
                    clearTemporarilyPlacedTiles();
                    return;
                }
            } else {
                for (const tile of placedTiles) {
                    const r = tile.row;
                    const c = tile.col;
                    // Check all 4 neighbors for already played tiles
                    if ((r > 0 && board[r - 1][c] && board[r - 1][c].isPlayed) ||
                        (r < BOARD_SIZE - 1 && board[r + 1][c] && board[r + 1][c].isPlayed) ||
                        (c > 0 && board[r][c - 1] && board[r][c - 1].isPlayed) ||
                        (c < BOARD_SIZE - 1 && board[r][c + 1] && board[r][c + 1].isPlayed)) {
                        connectedToExisting = true;
                        break;
                    }
                }
                // If no connection to existing tiles and some tiles were placed, it's invalid
                if (!connectedToExisting && placedTiles.length > 0) {
                    showMessageBox("Your word must connect to an existing word on the board!");
                    clearTemporarilyPlacedTiles();
                    return;
                }
            }

            // Validate the formed word ONLY against the kid-friendly dictionary
            const isValid = validateWord(formedWord);

            if (isValid) {
                const wordScore = calculateWordScore(wordTilesForScoring);
                playerScores[currentPlayer] += wordScore; // Add to current player's total score
                updateScoresDisplay(); // Update score display

                // Mark all temporarily placed tiles as permanently played
                placedTiles.forEach(tile => {
                    tile.isPlayed = true;
                });
                placedTiles = []; // Clear the list of temporarily placed tiles

                // Draw new tiles to refill the current player's rack
                drawTiles(RACK_SIZE - playerRacks[currentPlayer].length);
                renderBoard(); // Update board display
                showMessageBox(`Great job, Player ${currentPlayer + 1}! You made "${formedWord}" for ${wordScore} points!`);

                // End turn
                endTurn();

            } else {
                // If the word is not valid, inform the user and clear placed tiles
                showMessageBox(`"${formedWord}" is not in our word list for kids. Try another word!`);
                clearTemporarilyPlacedTiles();
            }
        }

        /**
         * Clears all temporarily placed tiles from the board and returns them to the current player's rack.
         */
        function clearTemporarilyPlacedTiles() {
            placedTiles.forEach(tile => {
                board[tile.row][tile.col] = null; // Remove tile from the board's data structure
                playerRacks[currentPlayer].push(tile); // Add tile back to the current player's rack
            });
            placedTiles = []; // Clear the list of temporarily placed tiles
            renderBoard(); // Update board display
            renderRack(); // Update rack display
            // Deselect any currently selected tile
            if (selectedTile) {
                selectedTile.classList.remove('selected');
                selectedTile = null;
                selectedTileData = null;
            }
        }

        /**
         * Shuffles the tiles currently on the current player's rack.
         */
        function handleShuffleRack() {
            shuffleArray(playerRacks[currentPlayer]); // Shuffle the current player's rack
            renderRack(); // Update the rack display
            showMessageBox(`Player ${currentPlayer + 1}, your tiles have been shuffled!`);
            endTurn(); // Shuffling tiles ends the turn
        }

        /**
         * Handles the "Pass Turn" button click.
         * Clears any placed tiles and switches to the next player.
         */
        function handlePassTurn() {
            if (placedTiles.length > 0) {
                showMessageBox("You have placed tiles. Clear them or play a word before passing.");
                return;
            }
            showMessageBox(`Player ${currentPlayer + 1} passed their turn.`);
            endTurn();
        }

        /**
         * Displays the game rules in a message box.
         */
        function showGameRules() {
            const rulesText = `
                Welcome to Kids Scrabble!

                How to Play:
                1.  **Goal:** Make words on the board to get points!
                2.  **Your Tiles:** You get 7 letter tiles on your rack (the yellow area).
                3.  **Take a Turn:**
                    * Click a tile on your rack to pick it up.
                    * Click an empty spot on the blue board to place your tile.
                    * If you pick a BLANK tile, you can choose any letter for it!
                4.  **Make a Word:**
                    * Place your tiles to make a word in a straight line (across or down).
                    * The first word must be on the ⭐ star in the middle!
                    * After the first word, all new words must connect to words already on the board.
                5.  **Play Word!** When your word is ready, click "Play Word!".
                    * If your word is correct, you get points, and new tiles come to your rack.
                    * If it's not a word from our list, your tiles go back to your rack.
                6.  **Clear Tiles:** Click "Clear Placed Tiles" to put your tiles back if you change your mind.
                7.  **Shuffle Tiles:** Click "Shuffle My Tiles" to mix up the letters on your rack. This ends your turn.
                8.  **Pass Turn:** If you can't make a word, click "Pass Turn" to let the other player go.
                9.  **Next Player:** After you play, shuffle, or pass, it's the other player's turn!
                10. **Winning:** The game ends when there are no more tiles to draw. The player with the most points wins!

                Have fun making words!
            `;
            showMessageBox(rulesText);
        }

        /**
         * Ends the current player's turn and switches to the next player.
         * Checks for game end conditions.
         */
        function endTurn() {
            // Check for game end condition: tile bag is empty and both players' racks are also empty
            if (tileBag.length === 0 && playerRacks[0].length === 0 && playerRacks[1].length === 0) {
                let winnerMessage = '';
                if (playerScores[0] > playerScores[1]) {
                    winnerMessage = `Player 1 wins with ${playerScores[0]} points! Player 2 had ${playerScores[1]} points.`;
                } else if (playerScores[1] > playerScores[0]) {
                    winnerMessage = `Player 2 wins with ${playerScores[1]} points! Player 1 had ${playerScores[0]} points.`;
                } else {
                    winnerMessage = `It's a tie! Both players scored ${playerScores[0]} points.`;
                }
                showMessageBox(`Game Over! ${winnerMessage}`);
                // Disable buttons as the game has ended
                playWordBtn.disabled = true;
                clearBoardBtn.disabled = true;
                shuffleRackBtn.disabled = true;
                passTurnBtn.disabled = true;
                showRulesBtn.disabled = true; // Disable rules button too, as game is over
                return; // Exit if game is over
            }

            // Switch to the next player
            currentPlayer = (currentPlayer + 1) % 2;
            updateCurrentPlayerDisplay();
            renderRack(); // Render the new current player's rack
            // Deselect any currently selected tile
            if (selectedTile) {
                selectedTile.classList.remove('selected');
                selectedTile = null;
                selectedTileData = null;
            }
        }

        /**
         * Updates the display to show whose turn it is.
         */
        function updateCurrentPlayerDisplay() {
            currentPlayerTurnEl.textContent = `Player ${currentPlayer + 1}'s Turn!`;
            // Highlight the active player's score box
            if (currentPlayer === 0) {
                playerActualScoreP1El.classList.add('active-player');
                playerActualScoreP2El.classList.remove('active-player');
            } else {
                playerActualScoreP2El.classList.add('active-player');
                playerActualScoreP1El.classList.remove('active-player');
            }
        }

        /**
         * Updates the score display for both players.
         */
        function updateScoresDisplay() {
            scoreP1El.textContent = playerScores[0];
            scoreP2El.textContent = playerScores[1];
        }

        /**
         * Resets the game to its initial state, starting a new game.
         */
        function resetGame() {
            playerScores = [0, 0]; // Reset scores for both players
            updateScoresDisplay(); // Update score display
            currentPlayer = 0; // Start with Player 1
            updateCurrentPlayerDisplay(); // Update current player display

            selectedTile = null; // Clear any selected tile
            selectedTileData = null;
            placedTiles = []; // Clear placed tiles
            playerRacks = [[], []]; // Clear both players' racks

            createTileBag(); // Recreate and shuffle the tile bag

            // Draw initial tiles for both players
            drawTiles(RACK_SIZE); // Player 1
            currentPlayer = 1; // Temporarily switch to draw for Player 2
            drawTiles(RACK_SIZE); // Player 2
            currentPlayer = 0; // Switch back to Player 1 for the first turn

            initializeBoard(); // Reset and render the empty board
            renderBoard(); // Ensure board is clear and rendered
            renderRack(); // Ensure rack is filled and rendered for Player 1

            // Enable game control buttons
            playWordBtn.disabled = false;
            clearBoardBtn.disabled = false;
            shuffleRackBtn.disabled = false;
            passTurnBtn.disabled = false;
            showRulesBtn.disabled = false; // Enable rules button

            showMessageBox("Welcome to Kids Scrabble! It's a two-player game now! Player 1 starts. Select tiles and place them on the board to make words. Have fun!");
        }

        // Add Event Listeners to buttons
        playWordBtn.addEventListener('click', handlePlayWord);
        clearBoardBtn.addEventListener('click', clearTemporarilyPlacedTiles);
        shuffleRackBtn.addEventListener('click', handleShuffleRack);
        passTurnBtn.addEventListener('click', handlePassTurn);
        showRulesBtn.addEventListener('click', showGameRules);
        newGameBtn.addEventListener('click', resetGame);
        messageBoxOkBtn.addEventListener('click', hideMessageBox);

        // Event listener to close message box when clicking outside it or on the overlay
        document.addEventListener('click', (event) => {
            // Check if the message box is currently shown
            if (messageBox.classList.contains('show')) {
                // If the click is outside the message box AND not on the 'Show Rules' button itself
                if (!messageBox.contains(event.target) && event.target !== showRulesBtn) {
                    hideMessageBox();
                }
            }
        });
        // Also ensure overlay click closes it
        overlay.addEventListener('click', hideMessageBox);


        // Initialize the game when the page finishes loading
        document.addEventListener('DOMContentLoaded', resetGame);