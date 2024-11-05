// Logic for tic tac toe game
document.addEventListener('DOMContentLoaded', ()=> {
    // Get html elements
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.querySelector('button[onclick="resetGame()"]');
    const gameContainer = document.querySelector('.game-container');
    const messageDisplay = document.querySelector('.message');

    // 3x3 board
    let board = [
        '', '', '',
        '', '', '',
        '', '', '' 
    ];

    // X starts first
    let currPlayer = 'X';
    winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    messageDisplay.textContent = `Player ${currPlayer} turn`;

    // Add a listener for each cell to wait for clicks
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    })

    function isBoardFull() {
        return board.every(cell => cell !== '');
    }

    function checkWin() {
        for (let i = 0; i < winConditions.length; i++) {
            if (board[winConditions[i][0]] == currPlayer 
                && board[winConditions[i][1]] == currPlayer
                && board[winConditions[i][2]] == currPlayer) {
                    return true
                }
        }
        return false
    }

    function endGame() {
        // Remove click listeners
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    }

    // When a button is clicked
    function handleCellClick(event) {
        // Get the cell that was clicked
        const clickedCell = event.target
        const cellIndex = parseInt(clickedCell.getAttribute('data-index'));
        if (board[cellIndex] != '') {
            return // cell is already full
        }

        board[cellIndex] = currPlayer;
        clickedCell.textContent = currPlayer;

        if (checkWin()) {
            messageDisplay.textContent = `Player ${currPlayer} wins!`;
            endGame();
            return;
        }

        if (isBoardFull()) {
            messageDisplay.textContent = "It's a draw!";
            endGame();
            return;
        }

        // Now its the next players turn
        if (currPlayer == 'X') {
            currPlayer = 'O';
        } else {
            currPlayer = 'X';
        }
        messageDisplay.textContent = `Player ${currPlayer} turn`;
    }

    function resetGame() {
        // Reset the board array and clear the cell contents
        board = ['', '', '', '', '', '', '', '', ''];
        currPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', handleCellClick); // Re-add listeners
        });
        messageDisplay.textContent = ''; // Clear any messages
    }

    // Attach the resetGame function to the button
    resetButton.addEventListener('click', resetGame);
})