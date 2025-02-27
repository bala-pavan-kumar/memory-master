const cardSymbols = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍎', '🍌', '🍇', '🍉', '🍒', '🍓'];
let shuffledCards = [];
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = true;
let timer;
let seconds = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffledCards = shuffle(cardSymbols);
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    shuffledCards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="front">${symbol}</div>
            <div class="back"></div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.innerHTML === secondCard.innerHTML;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();

    if (document.querySelectorAll('.card:not(.flip)').length === 0) {
        clearInterval(timer);
        alert('Game Finished!');
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

document.getElementById('start').addEventListener('click', () => {
    lockBoard = false;
    clearInterval(timer);
    timer = setInterval(() => {
        seconds++;
        document.getElementById('timer').innerText = `Time: ${seconds}`;
    }, 1000);
});

document.getElementById('restart').addEventListener('click', () => {
    clearInterval(timer);
    seconds = 0;
    document.getElementById('timer').innerText = `Time: 0`;
    createBoard();
    lockBoard = true;
});

// Initialize the game board
createBoard();
