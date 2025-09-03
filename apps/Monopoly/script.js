// Game state variables
        let numPlayers = 2; // Default number of players for better initial experience
        const JAIL_FINE = 50; // Cost to get out of jail
        const MAX_JAIL_TURNS = 3; // Max turns in jail before automatic release
        const LOCAL_STORAGE_KEY = 'kidsMonopolyGameState'; // Key for local storage
        const GO_MONEY_AMOUNT = 200; // Money collected for passing GO
        const HOUSE_LIMIT_PER_PROPERTY = 4; // Max houses before a hotel
        const HOUSE_SYMBOL = '🏠';
        const HOTEL_SYMBOL = '🏨';


        let players = [];
        let currentPlayerIndex = 0;
        let gameBoardCells = []; // Array to hold references to board cell elements
        let isModalOpen = false; // To prevent actions while modal is open
        let gameActive = true; // New: Flag to control game flow

        // Player colors (used for tokens and info cards) - MOVED TO TOP
        const playerColors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b']; // Red, Blue, Green, Orange

        // Store the original board data as a template for new games
        const originalBoardCellsData = [
            { id: 0, name: "START", type: "corner", color: "", price: 0, rent: [0], owner: null, colorGroup: null, houses: 0, housePrice: 0 },
            { id: 1, name: "Candy Store", type: "property", color: "#9333ea", price: 60, rent: [5, 10, 20, 40, 80, 150], owner: null, colorGroup: "purple", houses: 0, housePrice: 50 },
            { id: 2, name: "Chance", type: "chance", color: "", price: 0, rent: [0], owner: null, colorGroup: null, houses: 0, housePrice: 0 },
            { id: 3, name: "Toy Shop", type: "property", color: "#9333ea", price: 60, rent: [5, 10, 20, 40, 80, 150], owner: null, colorGroup: "purple", houses: 0, housePrice: 50 },
            { id: 4, name: "Train Station", type: "transport", color: "#6b7280", price: 200, rent: [25, 50, 100, 200], owner: null, colorGroup: "transport", houses: 0, housePrice: 0 }, // Rent array for transports
            { id: 5, name: "Park", "type": "property", color: "#22d3ee", price: 100, rent: [8, 16, 32, 64, 128, 250], owner: null, colorGroup: "lightblue", houses: 0, housePrice: 50 },
            { id: 6, name: "Community Chest", type: "community", color: "", price: 0, rent: [0], owner: null, colorGroup: null, houses: 0, housePrice: 0 },
            { id: 7, name: "Zoo", type: "property", color: "#22d3ee", price: 100, rent: [8, 16, 32, 64, 128, 250], owner: null, colorGroup: "lightblue", houses: 0, housePrice: 50 },
            { id: 8, name: "Just Visiting", type: "corner", color: "", price: 0, rent: [0], owner: null, colorGroup: null, houses: 0, housePrice: 0 }, // This is the Jail cell
            { id: 9, name: "Ice Cream Parlor", type: "property", color: "#f97316", price: 140, rent: [10, 20, 40, 80, 160, 300], owner: null, colorGroup: "orange", houses: 0, housePrice: 100 },
            { id: 10, name: "Chance", type: "chance", color: "", price: 0, rent: [0], owner: null, colorGroup: null, houses: 0, housePrice: 0 },
            { id: 11, name: "Book Store", type: "property", color: "#f97316", price: 140, rent: [10, 20, 40, 80, 160, 300], owner: null, colorGroup: "orange", houses: 0, housePrice: 100 },
            { id: 12, name: "Bus Stop", type: "transport", color: "#6b7280", price: 200, rent: [25, 50, 100, 200], owner: null, colorGroup: "transport", houses: 0, housePrice: 0 },
            { id: 13, name: "Pizza Place", type: "property", color: "#ef4444", price: 180, rent: [12, 24, 48, 96, 192, 350], owner: null, colorGroup: "red", houses: 0, housePrice: 100 },
            { id: 14, name: "Community Chest", type: "community", color: "", price: 0, rent: [0], owner: null, colorGroup: null, houses: 0, housePrice: 0 },
            { id: 15, name: "Arcade", type: "property", color: "#ef4444", price: 180, rent: [12, 24, 48, 96, 192, 350], owner: null, colorGroup: "red", houses: 0, housePrice: 100 },
            { id: 16, name: "Go to Jail", type: "corner", color: "", price: 0, rent: [0], owner: null, colorGroup: null, houses: 0, housePrice: 0 }, // This sends players to jail
            { id: 17, name: "Movie Theater", type: "property", color: "#eab308", price: 220, rent: [15, 30, 60, 120, 240, 450], owner: null, colorGroup: "yellow", houses: 0, housePrice: 150 },
            { id: 18, name: "Chance", type: "chance", color: "", price: 0, rent: [0], owner: null, colorGroup: null, houses: 0, housePrice: 0 },
            { id: 19, name: "Museum", type: "property", color: "#eab308", price: 220, rent: [15, 30, 60, 120, 240, 450], owner: null, colorGroup: "yellow", houses: 0, housePrice: 150 },
            { id: 20, name: "Airport", type: "transport", color: "#6b7280", price: 200, rent: [25, 50, 100, 200], owner: null, colorGroup: "transport", houses: 0, housePrice: 0 },
            { id: 21, name: "Sports Arena", type: "property", color: "#22c55e", price: 260, rent: [18, 36, 72, 144, 288, 550], owner: null, colorGroup: "green", houses: 0, housePrice: 150 },
            { id: 22, name: "Community Chest", type: "community", color: "", price: 0, rent: [0], owner: null, colorGroup: null, houses: 0, housePrice: 0 },
            { id: 23, name: "Concert Hall", type: "property", color: "#22c55e", price: 260, rent: [18, 36, 72, 144, 288, 550], owner: null, colorGroup: "green", houses: 0, housePrice: 150 },
            { id: 24, name: "Free Parking", type: "corner", color: "", price: 0, rent: [0], owner: null, colorGroup: null, houses: 0, housePrice: 0 },
            { id: 25, name: "Bakery", type: "property", color: "#3b82f6", price: 300, rent: [20, 40, 80, 160, 320, 600], owner: null, colorGroup: "blue", houses: 0, housePrice: 200 },
            { id: 26, name: "Chance", type: "chance", color: "", price: 0, rent: [0], owner: null, colorGroup: null, houses: 0, housePrice: 0 },
            { id: 27, name: "Library", type: "property", color: "#3b82f6", price: 300, rent: [20, 40, 80, 160, 320, 600], owner: null, colorGroup: "blue", houses: 0, housePrice: 200 },
            { id: 28, name: "Subway", type: "transport", color: "#6b7280", price: 200, rent: [25, 50, 100, 200], owner: null, colorGroup: "transport", houses: 0, housePrice: 0 },
            { id: 29, name: "Pet Shop", type: "property", color: "#a855f7", price: 350, rent: [25, 50, 100, 200, 400, 750], owner: null, colorGroup: "violet", houses: 0, housePrice: 200 },
            { id: 30, name: "Community Chest", type: "community", color: "", price: 0, rent: [0], owner: null, colorGroup: null, houses: 0, housePrice: 0 },
            { id: 31, name: "Toy Store", type: "property", color: "#a855f7", price: 400, rent: [35, 70, 140, 280, 560, 1000], owner: null, colorGroup: "violet", houses: 0, housePrice: 200 },
        ];
        // This variable will hold the current mutable state of the board, initialized from originalBoardCellsData
        let boardCellsData = JSON.parse(JSON.stringify(originalBoardCellsData));

        // DOM elements (declared here so they are globally accessible after DOMContentLoaded)
        let gameBoardElement;
        let die1Element;
        let die2Element;
        let rollDiceButton;
        let managePropertiesButton; // New button
        let nextTurnButton;
        let endGameButton;
        let newGameButton;
        let rulesButton;
        let settingsButton;
        let playerInfoContainer;
        let gameLogElement;
        let gameModalOverlay;
        let modalTitle;
        let modalMessage;
        let modalActions;


        // Chance Cards (no changes needed to actions for now)
        const chanceCards = [
            {
                text: "You found $50 on the street! Collect $50.",
                action: (player) => { player.money += 50; logGameEvent(`${player.name} collected $50.`); }
            },
            {
                text: "Go back 3 spaces.",
                action: async (player) => {
                    const oldPos = player.position;
                    player.position = (player.position - 3 + boardCellsData.length) % boardCellsData.length; // Ensure positive position
                    logGameEvent(`${player.name} moved back to ${boardCellsData[player.position].name}.`);
                    updatePlayerPositions();
                    await handleLandingOnSpace(player, boardCellsData[player.position]);
                }
            },
            {
                text: "Pay $20 for new toys.",
                action: (player) => { player.money -= 20; logGameEvent(`${player.name} paid $20 for new toys.`); }
            },
            {
                text: "Advance to GO. Collect $200.",
                action: async (player) => {
                    player.position = 0; // Move to GO
                    player.money += GO_MONEY_AMOUNT; // Collect $200
                    logGameEvent(`${player.name} advanced to GO and collected $${GO_MONEY_AMOUNT}.`);
                    updatePlayerInfoDisplay(); // Update money immediately
                    updatePlayerPositions();
                    await handleLandingOnSpace(player, boardCellsData[player.position]); // In case GO ever had an action
                }
            },
            {
                text: "Your pet needs a vet visit. Pay $30.",
                action: (player) => { player.money -= 30; logGameEvent(`${player.name} paid $30 for a vet visit.`); }
            },
            {
                text: "Go to Jail! Go directly to Jail. Do not pass GO, do not collect $200.",
                action: (player) => {
                    sendPlayerToJail(player);
                }
            }
        ];

        // Community Chest Cards (no changes needed to actions for now)
        const communityChestCards = [
            {
                text: "Bank error in your favor. Collect $100.",
                action: (player) => { player.money += 100; logGameEvent(`${player.name} collected $100.`); }
            },
            {
                text: "School fees. Pay $50.",
                action: (player) => { player.money -= 50; logGameEvent(`${player.name} paid $50 for school fees.`); }
            },
            {
                text: "It's your birthday! Collect $10 from each player.",
                action: (player) => {
                    let collected = 0;
                    players.forEach(p => {
                        if (p.id !== player.id && !p.isBankrupt) {
                            const amountToCollect = Math.min(10, p.money); // Cannot collect more than they have
                            p.money -= amountToCollect;
                            player.money += amountToCollect;
                            collected += amountToCollect;
                        }
                    });
                    logGameEvent(`${player.name} collected $${collected} from other players for their birthday!`);
                    updatePlayerInfoDisplay();
                }
            },
            {
                text: "You won a drawing contest! Collect $75.",
                action: (player) => { player.money += 75; logGameEvent(`${player.name} collected $75.`); }
            },
            {
                text: "Doctor's fees. Pay $20.",
                action: (player) => { player.money -= 20; logGameEvent(`${player.name} paid $20 for doctor's fees.`); }
            },
            {
                text: "Go to Jail! Go directly to Jail. Do not pass GO, do not collect $200.",
                action: (player) => {
                    sendPlayerToJail(player);
                }
            }
        ];

        // Function to log game events
        function logGameEvent(message) {
            const logEntry = document.createElement('p');
            logEntry.classList.add('game-log-entry');
            logEntry.textContent = message;
            gameLogElement.prepend(logEntry); // Add to top
            if (gameLogElement.children.length > 50) { // Keep log from getting too long
                gameLogElement.removeChild(gameLogElement.lastChild);
            }
            logEntry.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to latest log entry
        }

        // Function to show the modal
        function showModal(title, message, buttons) {
            modalTitle.textContent = title;
            modalMessage.innerHTML = message;
            modalActions.innerHTML = ''; // Clear existing buttons

            buttons.forEach(btn => {
                const buttonElement = document.createElement('button');
                buttonElement.classList.add('modal-button', btn.class);
                buttonElement.textContent = btn.text;
                buttonElement.onclick = async () => {
                    hideModal(); // Hide modal first
                    if (btn.handler) {
                        await btn.handler(); // Await the handler if it's async (e.g., movePlayer)
                    }
                    updateTurnButtonsState(); // Crucial: after modal action, re-evaluate button states
                };
                modalActions.appendChild(buttonElement);
            });

            gameModalOverlay.classList.add('active');
            isModalOpen = true;
            disableActionButtons(true); // Disable *primary* action buttons while modal is open
        }

        // Function to hide the modal
        function hideModal() {
            gameModalOverlay.classList.remove('active');
            isModalOpen = false;
        }

        // Function to disable only the primary action buttons (Roll/Next/Manage)
        // Pass 'force' true to disable, false to re-enable
        function disableActionButtons(force) {
            rollDiceButton.disabled = force;
            nextTurnButton.disabled = force;
            managePropertiesButton.disabled = force;
        }

        // Function to disable ALL game buttons (e.g., when game ends)
        function disableAllGameButtons() {
            rollDiceButton.disabled = true;
            managePropertiesButton.disabled = true;
            nextTurnButton.disabled = true;
            endGameButton.disabled = true;
            newGameButton.disabled = false; // Always allow new game
            rulesButton.disabled = false;   // Always allow rules
            settingsButton.disabled = false; // Always allow settings
        }

        // New function to manage roll and next turn buttons based on current game state
        function updateTurnButtonsState() {
            if (!gameActive) { // If game is over
                disableAllGameButtons();
                return;
            }

            // Always ensure general game buttons are active if game is active
            endGameButton.disabled = false;
            newGameButton.disabled = false;
            rulesButton.disabled = false;
            settingsButton.disabled = false;

            // If a modal is open, primary action buttons should be disabled.
            if (isModalOpen) {
                disableActionButtons(true);
                return;
            }

            const currentPlayer = players[currentPlayerIndex];

            if (currentPlayer.isBankrupt) {
                rollDiceButton.disabled = true;
                managePropertiesButton.disabled = true;
                nextTurnButton.disabled = false; // Allow advancing past bankrupt player
                rollDiceButton.textContent = "Roll Dice";
                logGameEvent(`${currentPlayer.name} is bankrupt. Advancing to next player.`);
                return;
            }

            // Normal turn flow:
            // At the start of a turn, roll button is active, next turn is disabled.
            // After rolling, roll button is disabled, next turn is enabled.
            // If player is in jail, roll button text changes.
            if (currentPlayer.hasRolledThisTurn) { // Added a flag for current player's turn state
                rollDiceButton.disabled = true;
                managePropertiesButton.disabled = false; // Can manage properties after rolling
                nextTurnButton.disabled = false;
            } else {
                rollDiceButton.disabled = false;
                managePropertiesButton.disabled = true; // Cannot manage before rolling
                nextTurnButton.disabled = true;
            }


            if (currentPlayer.isInJail) {
                rollDiceButton.textContent = `Roll for Doubles (Turn ${currentPlayer.jailTurns}/${MAX_JAIL_TURNS})`;
            } else {
                rollDiceButton.textContent = "Roll Dice";
            }
        }

        // Function to create the game board visually
        function createGameBoard(currentBoardData) {
            gameBoardElement.innerHTML = ''; // Clear existing board
            gameBoardCells = Array(originalBoardCellsData.length).fill(null);

            const gridElements = Array(9).fill(null).map(() => Array(9).fill(null));

            const centerArea = document.createElement('div');
            centerArea.classList.add('center-area');
            centerArea.innerHTML = `
                <h3 class="text-xl font-bold text-gray-700">Monopoly Fun!</h3>
                <p class="text-gray-600 text-sm mt-2">Roll the dice to start!</p>
            `;

            const logicalIndexToGridMap = new Map();
            logicalIndexToGridMap.set(0, [8, 8]); logicalIndexToGridMap.set(1, [8, 7]);
            logicalIndexToGridMap.set(2, [8, 6]); logicalIndexToGridMap.set(3, [8, 5]);
            logicalIndexToGridMap.set(4, [8, 4]); logicalIndexToGridMap.set(5, [8, 3]);
            logicalIndexToGridMap.set(6, [8, 2]); logicalIndexToGridMap.set(7, [8, 1]);
            logicalIndexToGridMap.set(8, [8, 0]); logicalIndexToGridMap.set(9, [7, 0]);
            logicalIndexToGridMap.set(10, [6, 0]); logicalIndexToGridMap.set(11, [5, 0]);
            logicalIndexToGridMap.set(12, [4, 0]); logicalIndexToGridMap.set(13, [3, 0]);
            logicalIndexToGridMap.set(14, [2, 0]); logicalIndexToGridMap.set(15, [1, 0]);
            logicalIndexToGridMap.set(16, [0, 0]); logicalIndexToGridMap.set(17, [0, 1]);
            logicalIndexToGridMap.set(18, [0, 2]); logicalIndexToGridMap.set(19, [0, 3]);
            logicalIndexToGridMap.set(20, [0, 4]); logicalIndexToGridMap.set(21, [0, 5]);
            logicalIndexToGridMap.set(22, [0, 6]); logicalIndexToGridMap.set(23, [0, 7]);
            logicalIndexToGridMap.set(24, [0, 8]); logicalIndexToGridMap.set(25, [1, 8]);
            logicalIndexToGridMap.set(26, [2, 8]); logicalIndexToGridMap.set(27, [3, 8]);
            logicalIndexToGridMap.set(28, [4, 8]); logicalIndexToGridMap.set(29, [5, 8]);
            logicalIndexToGridMap.set(30, [6, 8]); logicalIndexToGridMap.set(31, [7, 8]);


            for (let r = 0; r < 9; r++) {
                for (let c = 0; c < 9; c++) {
                    const cellDiv = document.createElement('div');
                    cellDiv.classList.add('board-cell');
                    gridElements[r][c] = cellDiv;
                    gameBoardElement.appendChild(cellDiv);
                }
            }

            currentBoardData.forEach(cellData => {
                const gridCoords = logicalIndexToGridMap.get(cellData.id);
                if (!gridCoords) {
                    console.error(`createGameBoard: No grid coordinates found for logical ID ${cellData.id}`);
                    return;
                }
                const [row, col] = gridCoords;
                const cellDiv = gridElements[row][col];

                if (!cellDiv) {
                    console.error(`createGameBoard: Cell div at grid [${row},${col}] not found for logical ID ${cellData.id}. This indicates an error in grid setup.`);
                    return;
                }

                cellDiv.setAttribute('data-board-index', cellData.id);

                let innerHTML = `<div class="text-xs font-semibold">${cellData.name}</div>`;
                if (cellData.type === 'property' || cellData.type === 'transport') {
                    innerHTML += `<div class="property-color-bar" style="background-color: ${cellData.color};"></div>`;
                    innerHTML += `<div class="text-xs mt-1">$${cellData.price}</div>`;
                    innerHTML += `<div class="text-xs">Rent: $${cellData.rent[0]}</div>`; // Display base rent
                }

                cellDiv.innerHTML = innerHTML;

                if (cellData.type === 'corner') {
                    cellDiv.classList.add('corner-cell');
                    if (cellData.name === "Just Visiting") {
                        cellDiv.innerHTML = `<div class="text-xs font-semibold">Just Visiting / Jail</div><img src="https://placehold.co/40x40/6B7280/FFFFFF?text=JAIL" alt="Jail" class="w-8 h-8 mt-1">`;
                    } else if (cellData.name === "Go to Jail") {
                        cellDiv.innerHTML = `<div class="text-xs font-semibold">Go to Jail</div><img src="https://placehold.co/40x40/EF4444/FFFFFF?text=GO+TO+JAIL" alt="Go to Jail" class="w-8 h-8 mt-1">`;
                    } else if (cellData.name === "START") {
                        cellDiv.innerHTML = `<div class="text-xs font-semibold">START</div><img src="https://placehold.co/40x40/22C55E/FFFFFF?text=GO" alt="Start" class="w-8 h-8 mt-1">`;
                    } else if (cellData.name === "Free Parking") {
                        cellDiv.innerHTML = `<div class="text-xs font-semibold">Free Parking</div><img src="https://placehold.co/40x40/F59E0B/FFFFFF?text=PARK" alt="Free Parking" class="w-8 h-8 mt-1">`;
                    }
                } else if (cellData.type === 'chance') {
                    cellDiv.innerHTML = `<div class="text-xs font-semibold">Chance</div><img src="https://placehold.co/40x40/FFD700/000000?text=?" alt="Chance" class="w-8 h-8 mt-1">`;
                } else if (cellData.type === 'community') {
                    cellDiv.innerHTML = `<div class="text-xs font-semibold">Community Chest</div><img src="https://placehold.co/40x40/ADD8E6/000000?text=CC" alt="Community Chest" class="w-8 h-8 mt-1">`;
                }

                const tokensContainer = document.createElement('div');
                tokensContainer.classList.add('player-tokens-container');
                cellDiv.appendChild(tokensContainer);

                // Add container for houses/hotels
                if (cellData.type === 'property') {
                    const housesContainer = document.createElement('div');
                    housesContainer.classList.add('property-houses-container');
                    cellDiv.appendChild(housesContainer);
                }


                gameBoardCells[cellData.id] = cellDiv;
                if (cellData.owner !== null) {
                    updateCellOwnerDisplay(cellData); // This will call updatePropertyDevelopmentDisplay
                }
            });

            gameBoardElement.appendChild(centerArea);
        }

        // Function to initialize players
        function initializePlayers(initialPlayersData = null, customPlayerNames = null) {
            players = [];
            playerInfoContainer.innerHTML = ''; // Clear existing player info

            if (initialPlayersData) {
                initialPlayersData.forEach(pData => {
                    const player = {
                        id: pData.id,
                        name: pData.name,
                        money: pData.money,
                        position: pData.position,
                        properties: pData.properties,
                        isInJail: pData.isInJail,
                        jailTurns: pData.jailTurns,
                        isBankrupt: pData.isBankrupt,
                        hasRolledThisTurn: pData.hasRolledThisTurn || false, // Load this state
                        tokenElement: null,
                        infoCardElement: null
                    };
                    players.push(player);
                    const token = document.createElement('div');
                    token.classList.add('player-token', `player-token-${player.id}`);
                    token.textContent = `${player.id + 1}`;
                    player.tokenElement = token;

                    const infoCard = document.createElement('div');
                    infoCard.classList.add('player-info-card', 'w-full');
                    infoCard.innerHTML = `
                        <div class="player-info-color rounded-full" style="background-color: ${playerColors[player.id]}"></div>
                        <span class="font-semibold">${player.name}:</span>
                        <span id="money-p${player.id}" class="text-green-700 font-bold">$${player.money}</span>
                    `;
                    player.infoCardElement = infoCard;
                    playerInfoContainer.appendChild(infoCard);
                });
            } else {
                for (let i = 0; i < numPlayers; i++) {
                    const playerName = customPlayerNames && customPlayerNames[i] ? customPlayerNames[i] : `Player ${i + 1}`;
                    const player = {
                        id: i,
                        name: playerName,
                        money: 1500, // Starting money
                        position: 0,
                        properties: [],
                        isInJail: false,
                        jailTurns: 0,
                        isBankrupt: false,
                        hasRolledThisTurn: false, // New: flag to track if player has rolled this turn
                        tokenElement: null,
                        infoCardElement: null
                    };
                    players.push(player);

                    const token = document.createElement('div');
                    token.classList.add('player-token', `player-token-${i}`);
                    token.textContent = `${i + 1}`;
                    player.tokenElement = token;

                    const infoCard = document.createElement('div');
                    infoCard.classList.add('player-info-card', 'w-full');
                    infoCard.innerHTML = `
                        <div class="player-info-color rounded-full" style="background-color: ${playerColors[i]}"></div>
                        <span class="font-semibold">${player.name}:</span>
                        <span id="money-p${player.id}" class="text-green-700 font-bold">$${player.money}</span>
                    `;
                    player.infoCardElement = infoCard;
                    playerInfoContainer.appendChild(infoCard);
                }
            }
            updatePlayerPositions();
            updatePlayerInfoDisplay();
        }

        // Function to update player positions on the board
        function updatePlayerPositions() {
            document.querySelectorAll('.player-tokens-container').forEach(container => {
                container.innerHTML = '';
            });

            players.forEach(player => {
                if (!player.isBankrupt) {
                    const currentCell = gameBoardCells[player.position];
                    if (currentCell) {
                        const tokensContainer = currentCell.querySelector('.player-tokens-container');
                        if (tokensContainer) {
                            tokensContainer.appendChild(player.tokenElement);
                        } else {
                            console.error(`Player tokens container not found in cell ${player.position}`);
                        }
                    } else {
                        console.error(`Cell at position ${player.position} not found for player ${player.name}. This is critical for token placement.`);
                    }
                }
            });
        }

        // Function to update player info display (money, active player, bankrupt status)
        function updatePlayerInfoDisplay() {
            players.forEach((player, index) => {
                const moneySpan = player.infoCardElement.querySelector(`#money-p${player.id}`);
                const oldMoney = parseInt(moneySpan.textContent.replace('$', ''));
                if (moneySpan) {
                    moneySpan.textContent = `$${player.money}`;
                    // Money flash animation
                    if (player.money > oldMoney) {
                        moneySpan.classList.add('money-flash-green');
                        setTimeout(() => moneySpan.classList.remove('money-flash-green'), 500);
                    } else if (player.money < oldMoney) {
                        moneySpan.classList.add('money-flash-red');
                        setTimeout(() => moneySpan.classList.remove('money-flash-red'), 500);
                    }

                    if (player.money < 0) {
                        moneySpan.classList.remove('text-green-700');
                        moneySpan.classList.add('text-red-700');
                    } else {
                        moneySpan.classList.remove('text-red-700');
                        moneySpan.classList.add('text-green-700');
                    }
                }
                if (index === currentPlayerIndex && !player.isBankrupt) {
                    player.infoCardElement.classList.add('active-player');
                } else {
                    player.infoCardElement.classList.remove('active-player');
                }
                if (player.isBankrupt) {
                    player.infoCardElement.classList.add('bankrupt');
                    if (player.tokenElement && player.tokenElement.parentElement) player.tokenElement.remove();
                } else {
                    player.infoCardElement.classList.remove('bankrupt');
                }
            });
        }

        // Function to roll the dice
        async function rollDice() {
            if (isModalOpen || !gameActive) return;

            const currentPlayer = players[currentPlayerIndex];
            if (currentPlayer.hasRolledThisTurn) {
                logGameEvent(`${currentPlayer.name} has already rolled this turn.`);
                return;
            }

            // Dice animation
            die1Element.classList.add('shake');
            die2Element.classList.add('shake');
            rollDiceButton.disabled = true; // Disable immediately to prevent re-roll

            // Small delay for animation
            await new Promise(resolve => setTimeout(resolve, 300));

            const die1Value = Math.floor(Math.random() * 6) + 1;
            const die2Value = Math.floor(Math.random() * 6) + 1;
            const totalRoll = die1Value + die2Value;

            die1Element.textContent = die1Value;
            die2Element.textContent = die2Value;
            die1Element.classList.remove('shake');
            die2Element.classList.remove('shake');

            logGameEvent(`${currentPlayer.name} rolled a ${die1Value} and a ${die2Value} (Total: ${totalRoll}).`);

            currentPlayer.hasRolledThisTurn = true; // Mark that player has rolled

            // Handle jail turn if player is in jail
            if (currentPlayer.isInJail) {
                await handleJailTurn(currentPlayer, die1Value === die2Value, totalRoll);
            } else {
                await movePlayer(currentPlayer, totalRoll);
            }

            if (!isModalOpen && gameActive) {
                updateTurnButtonsState(); // Re-evaluate button state after all actions
            }
        }

        // Function to move a player
        async function movePlayer(player, steps) {
            const oldPosition = player.position;
            const initialJailState = player.isInJail; // Check if player was in jail before this move
            const hasPassedGo = (player.position + steps) >= boardCellsData.length;

            player.position = (player.position + steps) % boardCellsData.length;

            if (hasPassedGo && !initialJailState) { // Only collect if not coming directly from "Go to Jail" square
                player.money += GO_MONEY_AMOUNT;
                logGameEvent(`${player.name} passed GO and collected $${GO_MONEY_AMOUNT}!`);
                updatePlayerInfoDisplay();
            }

            logGameEvent(`${player.name} moved from ${boardCellsData[oldPosition].name} to ${boardCellsData[player.position].name}.`);

            updatePlayerPositions();
            await handleLandingOnSpace(player, boardCellsData[player.position]);
        }

        // Function to send a player to jail
        function sendPlayerToJail(player) {
            player.position = 8; // Move to "Just Visiting" (Jail) cell
            player.isInJail = true;
            player.jailTurns = 0; // Reset jail turns
            updatePlayerPositions();
            logGameEvent(`${player.name} was sent to Jail!`);
            updatePlayerInfoDisplay();

            showModal("Go to Jail!",
                `${player.name}, you are in Jail! You can try to roll doubles on your next turn, or pay $${JAIL_FINE} to get out.`,
                [{
                    text: "Okay",
                    class: "primary",
                    handler: () => {} // No specific action needed here, just dismiss modal
                }]
            );
        }

        // Function to handle a player's turn when they are in jail
        async function handleJailTurn(player, rolledDoubles, totalRoll) {
            player.jailTurns++;
            logGameEvent(`${player.name} is in Jail. Turn ${player.jailTurns}/${MAX_JAIL_TURNS}.`);

            return new Promise(resolve => {
                const afterGettingOutOfJail = async (movedByRoll = true) => {
                    player.isInJail = false;
                    player.jailTurns = 0;
                    logGameEvent(`${player.name} is free from Jail!`);
                    updatePlayerInfoDisplay();
                    if (movedByRoll) {
                        await movePlayer(player, totalRoll); // Move by the dice roll
                    }
                    resolve(true);
                };

                if (rolledDoubles) {
                    showModal("Out of Jail!", `${player.name} rolled doubles and is free!`, [
                        {
                            text: "Okay, Move!",
                            class: "primary",
                            handler: afterGettingOutOfJail
                        }
                    ]);
                } else if (player.jailTurns >= MAX_JAIL_TURNS) {
                    if (player.money >= JAIL_FINE) {
                        player.money -= JAIL_FINE;
                        logGameEvent(`${player.name} paid $${JAIL_FINE} to get out of Jail after ${MAX_JAIL_TURNS} turns.`);
                        showModal("Out of Jail!", `${player.name} paid $${JAIL_FINE} and is free!`, [
                            {
                                text: "Okay, Move!",
                                class: "primary",
                                handler: afterGettingOutOfJail
                            }
                        ]);
                    } else {
                        logGameEvent(`${player.name} cannot pay $${JAIL_FINE} jail fine and is bankrupt!`);
                        declareBankruptcy(player);
                        resolve(true);
                    }
                } else {
                    showModal("Still in Jail!", `${player.name} did not roll doubles. You have ${MAX_JAIL_TURNS - player.jailTurns} tries left, or pay $${JAIL_FINE}.`, [
                        {
                            text: "Stay in Jail & End Turn",
                            class: "secondary",
                            handler: () => {
                                resolve(true); // Player stays in jail, turn ends
                            }
                        },
                        {
                            text: `Pay $${JAIL_FINE} to Get Out and Move`,
                            class: "primary",
                            handler: async () => {
                                if (player.money >= JAIL_FINE) {
                                    player.money -= JAIL_FINE;
                                    logGameEvent(`${player.name} paid $${JAIL_FINE} to get out of Jail.`);
                                    await afterGettingOutOfJail(); // Move by the dice roll
                                } else {
                                    logGameEvent(`${player.name} doesn't have enough money to pay the jail fine and is bankrupt!`);
                                    declareBankruptcy(player);
                                    resolve(true);
                                }
                            }
                        }
                    ]);
                }
            });
        }


        // Function to check if a player owns all properties in a color group
        function checkMonopoly(ownerId, colorGroup) {
            if (!colorGroup || colorGroup === "transport") return false; // Transports don't get monopoly rent boost for general properties

            const groupProperties = boardCellsData.filter(cell => cell.colorGroup === colorGroup && (cell.type === 'property'));
            if (groupProperties.length === 0) return false;

            const ownedInGroup = groupProperties.filter(cell => cell.owner === ownerId);
            return ownedInGroup.length === groupProperties.length;
        }

        // Function to get the correct rent amount
        function getRentAmount(cell, ownerId) {
            if (cell.type === 'property') {
                const isMonopoly = checkMonopoly(ownerId, cell.colorGroup);
                // If a monopoly and no houses built, double the base rent (rent[0])
                if (isMonopoly && cell.houses === 0) {
                    return cell.rent[0] * 2;
                }
                // Otherwise, return rent based on houses built
                return cell.rent[cell.houses];
            } else if (cell.type === 'transport') {
                const owner = players.find(p => p.id === ownerId);
                if (!owner) return cell.rent[0]; // Should not happen
                const ownedTransports = boardCellsData.filter(
                    (p) => p.type === 'transport' && p.owner === owner.id
                ).length;
                // Rent index for transports: 0 owned = 25, 1 owned = 25, 2 owned = 50, etc.
                // The rent array for transports is [25, 50, 100, 200]
                // So if ownedTransports is 1, index is 0. If 2, index is 1. etc.
                const rentIndex = Math.max(0, ownedTransports - 1);
                return cell.rent[rentIndex];
            }
            return 0; // For other types
        }

        // Function to handle actions when landing on a space
        async function handleLandingOnSpace(player, cell) {
            let message = '';
            let actionResolved = true;

            switch (cell.type) {
                case 'property':
                case 'transport':
                    if (cell.owner === null) {
                        message = `${player.name} landed on ${cell.name}. It costs $${cell.price}. Do you want to buy it?`;
                        actionResolved = await new Promise(resolve => {
                            showModal("Buy Property?", message, [
                                {
                                    text: "Buy ($" + cell.price + ")",
                                    class: "primary",
                                    handler: async () => {
                                        if (player.money >= cell.price) {
                                            player.money -= cell.price;
                                            cell.owner = player.id;
                                            player.properties.push(cell.id);
                                            updatePlayerInfoDisplay();
                                            updateCellOwnerDisplay(cell);
                                            logGameEvent(`${player.name} bought ${cell.name} for $${cell.price}.`);

                                            // Check for monopoly immediately after buying
                                            if (cell.type === 'property' && checkMonopoly(player.id, cell.colorGroup)) {
                                                logGameEvent(`${player.name} now owns a monopoly on ${cell.colorGroup} properties!`);
                                                // Offer to build houses if applicable and money allows
                                                if (player.money >= cell.housePrice) {
                                                    await new Promise(res => { // Wait for house building decision
                                                        showModal("Monopoly Achieved!", `${player.name} owns all ${cell.colorGroup} properties! You can now build houses. Would you like to build a house on ${cell.name} for $${cell.housePrice}?`, [
                                                            { text: "Yes", class: "primary", handler: async () => { await buyHouse(player, cell.id); res(true); } },
                                                            { text: "No", class: "secondary", handler: () => res(true) }
                                                        ]);
                                                    });
                                                }
                                            }
                                            resolve(true);
                                        } else {
                                            logGameEvent(`${player.name} doesn't have enough money to buy ${cell.name}.`);
                                            showModal("Not Enough Money!", "You don't have enough money to buy this property.", [
                                                { text: "Okay", class: "primary", handler: () => resolve(true) }
                                            ]);
                                        }
                                    }
                                },
                                {
                                    text: "Don't Buy",
                                    class: "secondary",
                                    handler: () => {
                                        logGameEvent(`${player.name} chose not to buy ${cell.name}.`);
                                        resolve(true);
                                    }
                                }
                            ]);
                        });
                    } else if (cell.owner === player.id) {
                        message = `${player.name} landed on their own property, ${cell.name}.`;
                        logGameEvent(message);
                        actionResolved = true;
                    } else {
                        const owner = players[cell.owner];
                        const rentAmount = getRentAmount(cell, owner.id); // Use the new function
                        message = `${player.name} landed on ${owner.name}'s property, ${cell.name}. Pay $${rentAmount} rent!`;

                        actionResolved = await new Promise(resolve => {
                            showModal("Pay Rent!", message, [
                                {
                                    text: "Pay Rent ($" + rentAmount + ")",
                                    class: "primary",
                                    handler: () => {
                                        if (player.money >= rentAmount) {
                                            player.money -= rentAmount;
                                            owner.money += rentAmount;
                                            updatePlayerInfoDisplay();
                                            logGameEvent(`${player.name} paid $${rentAmount} rent to ${owner.name}.`);
                                            resolve(true);
                                        } else {
                                            logGameEvent(`${player.name} cannot pay $${rentAmount} rent to ${owner.name} and is bankrupt!`);
                                            declareBankruptcy(player);
                                            resolve(true);
                                        }
                                    }
                                }
                            ]);
                        });
                    }
                    break;
                case 'chance':
                    actionResolved = await new Promise(resolve => {
                        const card = chanceCards[Math.floor(Math.random() * chanceCards.length)];
                        showModal("Chance Card!", card.text, [
                            {
                                text: "Okay",
                                class: "primary",
                                handler: async () => {
                                    await card.action(player);
                                    updatePlayerInfoDisplay();
                                    if (player.money < 0 && !player.isBankrupt) {
                                        declareBankruptcy(player);
                                    }
                                    resolve(true);
                                }
                            }
                        ]);
                    });
                    break;
                case 'community':
                    actionResolved = await new Promise(resolve => {
                        const card = communityChestCards[Math.floor(Math.random() * communityChestCards.length)];
                        showModal("Community Chest Card!", card.text, [
                            {
                                text: "Okay",
                                class: "primary",
                                handler: async () => {
                                    await card.action(player);
                                    updatePlayerInfoDisplay();
                                    if (player.money < 0 && !player.isBankrupt) {
                                        declareBankruptcy(player);
                                    }
                                    resolve(true);
                                }
                            }
                        ]);
                    });
                    break;
                case 'corner':
                    if (cell.name === "START") {
                        message = `${player.name} is on START.`;
                        logGameEvent(message);
                        actionResolved = true;
                    } else if (cell.name === "Just Visiting") {
                        message = `${player.name} is just visiting Jail.`;
                        logGameEvent(message);
                        actionResolved = true;
                    }
                    else if (cell.name === "Go to Jail") {
                        sendPlayerToJail(player);
                        actionResolved = true;
                    } else if (cell.name === "Free Parking") {
                        message = `${player.name} landed on Free Parking. Nothing happens!`;
                        logGameEvent(message);
                        actionResolved = true;
                    }
                    else {
                        message = `${player.name} landed on ${cell.name}.`;
                        logGameEvent(message);
                        actionResolved = true;
                    }
                    break;
                default:
                    message = `${player.name} landed on an unknown space.`;
                    logGameEvent(message);
                    actionResolved = true;
            }
            return actionResolved;
        }

        // Function to handle property management (buying houses)
        async function manageProperties() {
            if (isModalOpen || !gameActive) return; // Prevent managing while modal is open or game is over

            const currentPlayer = players[currentPlayerIndex];
            if (currentPlayer.isBankrupt) {
                showModal("Cannot Manage Properties", "You are bankrupt and cannot manage properties.", [{ text: "Okay", class: "primary", handler: () => {} }]);
                return;
            }

            const ownedColorGroups = new Map(); // Map: colorGroup -> Array of owned properties
            currentPlayer.properties.forEach(propId => {
                const prop = boardCellsData.find(c => c.id === propId);
                if (prop && prop.type === 'property' && prop.colorGroup) {
                    if (!ownedColorGroups.has(prop.colorGroup)) {
                        ownedColorGroups.set(prop.colorGroup, []);
                    }
                    ownedColorGroups.get(prop.colorGroup).push(prop);
                }
            });

            let propertiesToBuildOn = [];
            for (const [colorGroup, properties] of ownedColorGroups.entries()) {
                if (checkMonopoly(currentPlayer.id, colorGroup)) {
                    properties.forEach(prop => {
                        // Can build if not already a hotel
                        if (prop.houses < HOUSE_LIMIT_PER_PROPERTY + 1) {
                            propertiesToBuildOn.push(prop);
                        }
                    });
                }
            }

            if (propertiesToBuildOn.length === 0) {
                showModal("Manage Properties", "You don't own any monopolies or cannot build houses at the moment.", [{ text: "Okay", class: "primary", handler: () => {} }]);
                return;
            }

            // Sort properties to suggest building evenly
            propertiesToBuildOn.sort((a, b) => a.houses - b.houses || a.name.localeCompare(b.name));

            let optionsHtml = '<p class="mb-4">Select a property to build a house:</p><div class="flex flex-col gap-2">';
            propertiesToBuildOn.forEach(prop => {
                const currentHouses = prop.houses < HOUSE_LIMIT_PER_PROPERTY ? prop.houses : 'Hotel';
                const nextBuilding = prop.houses < HOUSE_LIMIT_PER_PROPERTY ? `House ${prop.houses + 1}` : 'Hotel';
                const cost = prop.housePrice;
                const canAfford = currentPlayer.money >= cost;

                optionsHtml += `
                    <button class="modal-button ${canAfford ? 'primary' : 'secondary disabled'}" ${canAfford ? '' : 'disabled'}
                        onclick="buyHouseAndRefreshModal(${currentPlayer.id}, ${prop.id})">
                        ${prop.name} (${currentHouses}) - Build ${nextBuilding} ($${cost})
                    </button>
                `;
            });
            optionsHtml += '</div>';

            showModal("Manage Properties", optionsHtml, [
                { text: "Done", class: "secondary", handler: () => {} }
            ]);
        }

        // Helper function for modal button, to re-open property manage modal
        async function buyHouseAndRefreshModal(playerId, cellId) {
            const player = players.find(p => p.id === playerId);
            const success = await buyHouse(player, cellId);
            if (success) {
                 // Close the current modal and re-open to show updated options
                hideModal();
                await new Promise(resolve => setTimeout(resolve, 300)); // Small delay for visual effect
                manageProperties();
            }
            updateTurnButtonsState(); // Crucial for button state consistency
        }


        async function buyHouse(player, cellId) {
            const cell = boardCellsData.find(c => c.id === cellId);
            if (!cell || cell.owner !== player.id || cell.type !== 'property' || !checkMonopoly(player.id, cell.colorGroup)) {
                logGameEvent("Attempted to build on invalid property.");
                return false;
            }

            if (cell.houses >= HOUSE_LIMIT_PER_PROPERTY + 1) { // Already a hotel
                showModal("Cannot Build", `${cell.name} already has a hotel.`, [{ text: "Okay", class: "primary", handler: () => {} }]);
                return false;
            }

            const cost = cell.housePrice;
            if (player.money < cost) {
                showModal("Not Enough Money!", `You need $${cost} to build on ${cell.name}. You only have $${player.money}.`, [{ text: "Okay", class: "primary", handler: () => {} }]);
                return false;
            }

            // Rule: Must build evenly
            const colorGroupProperties = boardCellsData.filter(p => p.colorGroup === cell.colorGroup && p.type === 'property' && p.owner === player.id);
            const minHousesInGroup = Math.min(...colorGroupProperties.map(p => p.houses));

            if (cell.houses > minHousesInGroup) {
                showModal("Build Evenly!", "You must build houses evenly across your monopoly. Build on a property with fewer houses first.", [{ text: "Okay", class: "primary", handler: () => {} }]);
                return false;
            }

            player.money -= cost;
            cell.houses++;
            updatePlayerInfoDisplay();
            updatePropertyDevelopmentDisplay(cell);
            logGameEvent(`${player.name} built a ${cell.houses === 5 ? 'hotel' : 'house'} on ${cell.name} for $${cost}.`);
            saveGameState();
            return true;
        }

        // Function to update the visual display of houses/hotels on a property
        function updatePropertyDevelopmentDisplay(cellData) {
            const cellElement = gameBoardCells[cellData.id];
            if (!cellElement || cellData.type !== 'property') return;

            let housesContainer = cellElement.querySelector('.property-houses-container');
            if (!housesContainer) {
                housesContainer = document.createElement('div');
                housesContainer.classList.add('property-houses-container');
                cellElement.appendChild(housesContainer);
            }
            housesContainer.innerHTML = ''; // Clear existing symbols

            if (cellData.houses > 0) {
                if (cellData.houses === 5) { // Hotel
                    const hotel = document.createElement('span');
                    hotel.classList.add('hotel-symbol');
                    hotel.textContent = HOTEL_SYMBOL;
                    housesContainer.appendChild(hotel);
                } else { // Houses
                    for (let i = 0; i < cellData.houses; i++) {
                        const house = document.createElement('span');
                        house.classList.add('house-symbol');
                        house.textContent = HOUSE_SYMBOL;
                        housesContainer.appendChild(house);
                    }
                }
            }
        }


        // Function to handle player bankruptcy
        function declareBankruptcy(player) {
            player.isBankrupt = true;
            player.money = 0;
            player.isInJail = false;
            player.jailTurns = 0;
            player.properties.forEach(propId => {
                const cell = boardCellsData.find(c => c.id === propId);
                if (cell) {
                    cell.owner = null;
                    cell.houses = 0; // Remove houses if bankrupt
                    updateCellOwnerDisplay(cell); // This calls updatePropertyDevelopmentDisplay
                }
            });
            player.properties = [];

            logGameEvent(`${player.name} is bankrupt and out of the game!`);
            updatePlayerInfoDisplay();

            saveGameState();
            checkForWinner();
        }

        // Function to update the visual display of a cell's owner
        function updateCellOwnerDisplay(cellData) {
            const cellElement = gameBoardCells[cellData.id];
            if (cellElement) {
                let ownerIndicator = cellElement.querySelector('.owner-indicator');
                if (cellData.owner !== null) {
                    const ownerColor = playerColors[cellData.owner];
                    if (!ownerIndicator) {
                        ownerIndicator = document.createElement('div');
                        ownerIndicator.classList.add('owner-indicator');
                        cellElement.appendChild(ownerIndicator);
                    }
                    ownerIndicator.style.backgroundColor = ownerColor;
                } else {
                    if (ownerIndicator) {
                        ownerIndicator.remove();
                    }
                }
                // Always update houses/hotels after owner changes (e.g., if properties are released)
                updatePropertyDevelopmentDisplay(cellData);
            }
        }

        // Function to check for a winner (automatic bankruptcy winner)
        function checkForWinner() {
            const activePlayers = players.filter(p => !p.isBankrupt);
            if (activePlayers.length === 1) {
                gameActive = false;
                const winner = activePlayers[0];
                logGameEvent(`${winner.name} is the last player standing and wins the game!`);
                showModal("Game Over!", `${winner.name} wins the game by bankruptcy!`, [
                    {
                        text: "New Game",
                        class: "primary",
                        handler: () => initializeNewGame()
                    }
                ]);
                disableAllGameButtons();
            } else if (activePlayers.length === 0) {
                logGameEvent("No active players left. Game ended.");
                showModal("Game Over!", "All players are bankrupt! No winner can be declared. Start a new game!", [
                    {
                        text: "New Game",
                        class: "primary",
                        handler: () => initializeNewGame()
                    }
                ]);
                disableAllGameButtons();
            }
        }

        // Function to calculate a player's net worth (for manual end game)
        function calculateNetWorth(player) {
            let netWorth = player.money;
            player.properties.forEach(propId => {
                const property = boardCellsData.find(cell => cell.id === propId);
                if (property) {
                    netWorth += property.price; // Add property value
                    // Add half the cost of houses/hotels for net worth calculation
                    if (property.type === 'property' && property.houses > 0) {
                        netWorth += (property.houses * property.housePrice) / 2; // Often half cost for net worth
                    }
                }
            });
            return netWorth;
        }

        // Function to handle explicit end game and declare winner
        function endGameAndDeclareWinner() {
            if (!gameActive) {
                showModal("Game Already Over", "The game has already ended.", [{ text: "Okay", class: "primary", handler: () => {} }]);
                return;
            }

            const activePlayers = players.filter(p => !p.isBankrupt);

            if (activePlayers.length === 0) {
                showModal("No Winner", "All players are bankrupt. No winner can be declared. Start a New Game!", [{ text: "New Game", class: "primary", handler: () => initializeNewGame() }]);
                return;
            }

            if (activePlayers.length === 1) {
                checkForWinner();
                return;
            }

            showModal("End Game Confirmation", "Are you sure you want to end the game and declare a winner? This cannot be undone.", [
                {
                    text: "Yes, End Game",
                    class: "danger", // Use danger class for destructive action
                    handler: () => {
                        let richestPlayer = activePlayers[0];
                        let maxNetWorth = calculateNetWorth(richestPlayer);

                        for (let i = 1; i < activePlayers.length; i++) {
                            const player = activePlayers[i];
                            const netWorth = calculateNetWorth(player);
                            if (netWorth > maxNetWorth) {
                                maxNetWorth = netWorth;
                                richestPlayer = player;
                            }
                        }

                        gameActive = false;
                        logGameEvent(`Game ended by declaration. ${richestPlayer.name} wins with a net worth of $${Math.round(maxNetWorth)}!`); // Round net worth
                        showModal("Game Ended!", `${richestPlayer.name} is the richest player with $${Math.round(maxNetWorth)} and wins the game!`, [
                            {
                                text: "New Game",
                                class: "primary",
                                handler: () => initializeNewGame()
                            }
                        ]);
                        disableAllGameButtons();
                        saveGameState();
                    }
                },
                { text: "Cancel", class: "secondary", handler: () => updateTurnButtonsState() }
            ]);
        }


        // Function to advance to the next player's turn
        function nextTurn() {
            if (isModalOpen || !gameActive) return;

            // Reset hasRolledThisTurn for the current player before advancing
            players[currentPlayerIndex].hasRolledThisTurn = false;

            saveGameState();

            let nextPlayerFound = false;
            let turnsAttempted = 0;

            do {
                currentPlayerIndex = (currentPlayerIndex + 1) % numPlayers;
                turnsAttempted++;

                if (players.filter(p => !p.isBankrupt).length <= 1) {
                    checkForWinner();
                    return;
                }

                if (!players[currentPlayerIndex].isBankrupt) {
                    nextPlayerFound = true;
                }
            } while (!nextPlayerFound && turnsAttempted < numPlayers * 2);

            if (!nextPlayerFound) {
                console.error("Could not find an active next player. All players might be bankrupt or game logic error.");
                checkForWinner();
                return;
            }

            updatePlayerInfoDisplay();
            logGameEvent(`${players[currentPlayerIndex].name}'s turn!`);
            updateTurnButtonsState();
        }

        // Local Storage functions
        function saveGameState() {
            try {
                const savablePlayers = players.map(player => {
                    const { tokenElement, infoCardElement, ...rest } = player;
                    return rest;
                });

                const savableBoardData = boardCellsData.map(cell => {
                    return {
                        id: cell.id,
                        name: cell.name,
                        type: cell.type,
                        color: cell.color,
                        price: cell.price,
                        rent: cell.rent, // Save rent array
                        owner: cell.owner !== null ? cell.owner : null,
                        colorGroup: cell.colorGroup, // Save color group
                        houses: cell.houses, // Save houses
                        housePrice: cell.housePrice // Save house price
                    };
                });

                const gameState = {
                    players: savablePlayers,
                    currentPlayerIndex: currentPlayerIndex,
                    boardCellsData: savableBoardData,
                    gameActive: gameActive,
                    numPlayers: numPlayers,
                    lastSaved: new Date().toISOString()
                };

                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameState));
                logGameEvent("Game saved automatically to local storage!");
                console.log("Game state saved:", gameState);
            }
            catch (error) {
                console.error("Error saving game state to local storage:", error);
                logGameEvent("Error saving game. Check console.");
            }
        }

        function loadGameState() {
            try {
                const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (storedState) {
                    const loadedState = JSON.parse(storedState);
                    logGameEvent("Game loaded successfully from local storage!");
                    console.log("Game state loaded:", loadedState);
                    return loadedState;
                } else {
                    logGameEvent("No saved game found in local storage. Starting a new game.");
                    return null;
                }
            }
            catch (error) {
                console.error("Error loading game state from local storage:", error);
                logGameEvent("Error loading game. Starting a new game.");
                return null;
            }
        }

        // Function to initialize a brand new game
        function initializeNewGame(customPlayerNames = null) {
            gameActive = true;
            currentPlayerIndex = 0;
            gameLogElement.innerHTML = '';
            logGameEvent("Starting a new game...");

            boardCellsData = JSON.parse(JSON.stringify(originalBoardCellsData));
            boardCellsData.forEach(cell => {
                cell.owner = null;
                if (cell.type === 'property') {
                    cell.houses = 0; // Reset houses
                }
            });
            createGameBoard(boardCellsData);
            initializePlayers(null, customPlayerNames); // Pass custom names if available

            updatePlayerInfoDisplay();
            updatePlayerPositions();
            updateTurnButtonsState();
            saveGameState();
            logGameEvent("New game started. Roll the dice to begin!");
        }

        // Function to load a game or start a new one on initial page load
        function startOrLoadGame() {
            logGameEvent("Attempting to load game from local storage...");
            const loadedState = loadGameState();

            if (loadedState) {
                numPlayers = loadedState.numPlayers || 2; // Default to 2 if not saved
                players = [];
                initializePlayers(loadedState.players);
                currentPlayerIndex = loadedState.currentPlayerIndex;
                gameActive = loadedState.gameActive;

                boardCellsData = JSON.parse(JSON.stringify(loadedState.boardCellsData));
                createGameBoard(boardCellsData); // This will update houses/owners

                updatePlayerInfoDisplay();
                updatePlayerPositions();
                updateTurnButtonsState();
                logGameEvent("Loaded previous game!");
            } else {
                initializeNewGame(); // Start with default 2 players
            }
        }


        // Function to display game rules
        function displayRules() {
            const rulesContent = `
                <p>Welcome to Kids Monopoly! The goal is to be the richest player, or the last one standing!</p>
                <ul>
                    <li><strong>Roll Dice:</strong> On your turn, roll two dice and move your token that many spaces.</li>
                    <li><strong>Buying Properties:</strong> If you land on an unowned property, you can buy it for its price. If you don't buy it, nothing happens.</li>
                    <li><strong>Paying Rent:</strong> If you land on a property owned by another player, you must pay them rent.</li>
                    <li><strong>Monopolies:</strong> Own all properties of a color group to double their base rent!</li>
                    <li><strong>Building Houses:</strong> Once you own a monopoly, you can build up to 4 houses, then a hotel, to greatly increase rent. You must build evenly across your monopoly.</li>
                    <li><strong>Chance & Community Chest:</strong> Land on these spaces to draw a card and follow its instructions (gain money, lose money, move spaces).</li>
                    <li><strong>Passing GO:</strong> Every time you pass or land on "START", you collect $${GO_MONEY_AMOUNT}.</li>
                    <li><strong>Jail:</strong>
                        <ul>
                            <li>Land on "Go to Jail" or draw a "Go to Jail" card, and you'll immediately move to the "Just Visiting/Jail" space.</li>
                            <li>To get out, you can try to roll doubles on your turn (up to 3 tries), or pay a $${JAIL_FINE} fine.</li>
                            <li>If you don't roll doubles after 3 tries, you must pay $${JAIL_FINE} and then move by your last roll.</li>
                        </ul>
                    </li>
                    <li><strong>Bankruptcy:</strong> If you can't pay money you owe, you go bankrupt and are out of the game! All your properties and houses become unowned.</li>
                    <li><strong>Winning:</strong> The game ends when only one player is left (they are the winner!), or you can choose to "End Game & Declare Winner" based on who has the most money + property value.</li>
                </ul>
            `;
            showModal("Kids Monopoly Rules", rulesContent, [
                { text: "Got It!", class: "primary", handler: () => {} }
            ]);
        }

        // Function to display game settings modal
        function displaySettingsModal() {
            let playerInputsHtml = '<p class="mb-4">Enter player names (2-4 players):</p>';
            for(let i = 0; i < 4; i++) { // Always show inputs for 4, enable/disable based on count
                const currentName = players[i] ? players[i].name : `Player ${i + 1}`;
                const checked = i < numPlayers ? 'checked' : '';
                const disabled = i >= numPlayers ? 'disabled' : '';

                playerInputsHtml += `
                    <div class="flex items-center gap-2 mb-2">
                        <input type="radio" class="form-radio text-blue-600 player-count-radio" name="playerCount" value="${i + 1}" id="playerCount${i+1}" ${checked}>
                        <label for="playerCount${i+1}" class="text-gray-700 font-semibold flex-shrink-0">${i + 1} Players:</label>
                        <input type="text" id="playerName${i}" class="flex-grow" value="${currentName}" placeholder="Player ${i + 1} Name" ${disabled}>
                    </div>
                `;
            }

            const settingsContent = `
                ${playerInputsHtml}
            `;

            showModal("Game Settings", settingsContent, [
                {
                    text: "Save Settings & New Game",
                    class: "primary",
                    handler: () => {
                        const selectedCountRadio = document.querySelector('input[name="playerCount"]:checked');
                        const newNumPlayers = selectedCountRadio ? parseInt(selectedCountRadio.value) : numPlayers;

                        const newPlayerNames = [];
                        for(let i = 0; i < newNumPlayers; i++) {
                            const nameInput = document.getElementById(`playerName${i}`);
                            newPlayerNames.push(nameInput.value.trim() || `Player ${i + 1}`);
                        }

                        if (newNumPlayers !== numPlayers || JSON.stringify(newPlayerNames) !== JSON.stringify(players.slice(0, newNumPlayers).map(p => p.name))) {
                            numPlayers = newNumPlayers;
                            localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear saved state to force new game
                            logGameEvent(`Settings changed. Starting new game with ${numPlayers} players.`);
                            initializeNewGame(newPlayerNames); // Start fresh with new settings and names
                        } else {
                            logGameEvent("No settings changes. Resuming current game.");
                        }
                    }
                },
                { text: "Cancel", class: "secondary", handler: () => {
                    // No action needed here, updateTurnButtonsState() will be called on modal close.
                }}
            ]);

            // Add event listeners for radio buttons to enable/disable name inputs
            document.querySelectorAll('.player-count-radio').forEach(radio => {
                radio.addEventListener('change', (event) => {
                    const selectedCount = parseInt(event.target.value);
                    for (let i = 0; i < 4; i++) {
                        const nameInput = document.getElementById(`playerName${i}`);
                        if (i < selectedCount) {
                            nameInput.disabled = false;
                        } else {
                            nameInput.disabled = true;
                            // Optionally clear names for disabled players
                            if (nameInput.value.trim() !== `Player ${i+1}`) { // Only clear if customized
                                nameInput.value = `Player ${i + 1}`;
                            }
                        }
                    }
                });
            });
            // Trigger change for initial setup
            document.querySelector(`input[name="playerCount"][value="${numPlayers}"]`).dispatchEvent(new Event('change'));
        }


        // Event Listeners (assigned inside DOMContentLoaded)
        document.addEventListener('DOMContentLoaded', function() {
            gameBoardElement = document.getElementById('game-board');
            die1Element = document.getElementById('die1');
            die2Element = document.getElementById('die2');
            rollDiceButton = document.getElementById('roll-dice-button');
            managePropertiesButton = document.getElementById('manage-properties-button'); // New
            nextTurnButton = document.getElementById('next-turn-button');
            endGameButton = document.getElementById('end-game-button');
            newGameButton = document.getElementById('new-game-button');
            rulesButton = document.getElementById('rules-button');
            settingsButton = document.getElementById('settings-button');
            playerInfoContainer = document.getElementById('player-info');
            gameLogElement = document.getElementById('game-log');
            gameModalOverlay = document.getElementById('game-modal-overlay');
            modalTitle = document.getElementById('modal-title');
            modalMessage = document.getElementById('modal-message');
            modalActions = document.getElementById('modal-actions');

            rollDiceButton.addEventListener('click', rollDice);
            managePropertiesButton.addEventListener('click', manageProperties); // New
            nextTurnButton.addEventListener('click', nextTurn);
            endGameButton.addEventListener('click', endGameAndDeclareWinner);
            newGameButton.addEventListener('click', () => {
                showModal("Start New Game?", "Are you sure you want to start a new game? Your current progress will be lost.", [
                    { text: "Yes, New Game", class: "danger", handler: () => {
                        localStorage.removeItem(LOCAL_STORAGE_KEY);
                        initializeNewGame();
                    }},
                    { text: "Cancel", class: "secondary", handler: () => {
                        updateTurnButtonsState();
                    }}
                ]);
            });
            rulesButton.addEventListener('click', displayRules);
            settingsButton.addEventListener('click', displaySettingsModal);

            startOrLoadGame();
        });