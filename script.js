//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
    const playerInput = document.getElementById('player-input');
    const gameBoard = document.getElementById('game-board');
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');
    const submitButton = document.getElementById('submit');
    let player1, player2;
    let currentPlayer;
    let boardState = Array(9).fill(null);

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        return null;
    }

    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = cell.id - 1;

        if (boardState[cellIndex] || checkWinner()) return;

        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            messageDiv.textContent = `${currentPlayer === 'X' ? player1 : player2}, congratulations you won!`;
            return;
        }

        // Check for draw
        if (!boardState.includes(null)) {
            messageDiv.textContent = "It's a draw!";
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageDiv.textContent = `${currentPlayer === 'X' ? player1 : player2}, you're up!`;
    }

    submitButton.addEventListener('click', () => {
        player1 = document.getElementById('player1').value || 'Player 1';
        player2 = document.getElementById('player2').value || 'Player 2';
        currentPlayer = 'X';
        boardState.fill(null);
        cells.forEach(cell => cell.textContent = '');

        playerInput.style.display = 'none';
        gameBoard.style.display = 'block';
        messageDiv.textContent = `${player1}, you're up!`;
    });

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
});
