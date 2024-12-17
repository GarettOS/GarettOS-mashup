class TicTacToe {
    constructor() {
        this.cells = document.querySelectorAll('.cell');
        this.resetButton = document.getElementById('reset-button');
        this.messageDisplay = document.querySelector('.message');
        this.currentPlayer = 'X';
        this.board = Array(9).fill('');
        
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        this.resetButton.addEventListener('click', () => this.resetGame());
        this.initialize();
    }

    initialize() {
        this.updateMessage(`Player ${this.currentPlayer}'s turn`);
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
    }

    updateMessage(message) {
        this.messageDisplay.textContent = message;
    }

    handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (this.board[cellIndex]) return;

        this.board[cellIndex] = this.currentPlayer;
        clickedCell.textContent = this.currentPlayer;
        clickedCell.classList.add(this.currentPlayer.toLowerCase());
        
        clickedCell.style.transform = 'scale(0)';
        setTimeout(() => {
            clickedCell.style.transform = 'scale(1)';
        }, 50);

        if (this.checkWinner()) {
            this.updateMessage(`Player ${this.currentPlayer} wins!`);
            this.highlightWinningCells();
            this.endGame();
            return;
        }

        if (this.isBoardFull()) {
            this.updateMessage("It's a draw!");
            this.endGame();
            return;
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateMessage(`Player ${this.currentPlayer}'s turn`);
    }

    checkWinner() {
        return this.winningCombinations.some(combination => {
            return combination.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }

    isBoardFull() {
        return this.board.every(cell => cell !== '');
    }

    endGame() {
        this.cells.forEach(cell => {
            cell.removeEventListener('click', this.handleCellClick);
        });
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
            cell.style.transform = '';
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        this.updateMessage(`Player ${this.currentPlayer}'s turn`);
    }

    highlightWinningCells() {
        const winningCombo = this.getWinningCombo();
        if (winningCombo) {
            winningCombo.forEach(index => {
                const cell = document.querySelector(`[data-index="${index}"]`);
                cell.classList.add('winner');
            });
        }
    }

    getWinningCombo() {
        for (let combo of this.winningCombinations) {
            if (combo.every(index => this.board[index] === this.currentPlayer)) {
                return combo;
            }
        }
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new TicTacToe();
});

window.resetGame = function() {
    // Reset the board array
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    
    // Reset current player
    currPlayer = 'X';
    
    // Clear all cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
    
    // Reset message
    document.querySelector('.message').textContent = `Player ${currPlayer} turn`;
}