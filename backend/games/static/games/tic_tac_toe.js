class TicTacToe {
    constructor() {
        this.cells = document.querySelectorAll('.cell');
        this.resetButton = document.querySelector('button[onclick="resetGame()"]');
        this.messageDisplay = document.querySelector('.message');
        this.currentPlayer = 'X';
        this.board = Array(9).fill('');
        
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        this.initialize();
    }

    initialize() {
        this.updateMessage(`Player ${this.currentPlayer}'s turn`);
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        this.resetButton.addEventListener('click', () => this.resetGame());
    }

    updateMessage(message) {
        this.messageDisplay.textContent = message;
    }

    handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

        // Ignore if cell is already filled
        if (this.board[cellIndex]) return;

        // Update board state and UI
        this.board[cellIndex] = this.currentPlayer;
        clickedCell.textContent = this.currentPlayer;

        // Check game status
        if (this.checkWinner()) {
            this.updateMessage(`Player ${this.currentPlayer} wins!`);
            this.endGame();
            return;
        }

        if (this.isBoardFull()) {
            this.updateMessage("It's a draw!");
            this.endGame();
            return;
        }

        // Switch players
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
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        this.updateMessage(`Player ${this.currentPlayer}'s turn`);
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new TicTacToe();
});