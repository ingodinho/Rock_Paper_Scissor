// HTML ELEMENTS

// radio
const choice5 = document.querySelector('.rounds__choice--5');
const choice10 = document.querySelector('.rounds__choice--10');
const choice15 = document.querySelector('.rounds__choice--15');
const choice20 = document.querySelector('.rounds__choice--20');

// input-controls
const btns = document.querySelector('.controls__btns');
const btnRock = document.querySelector('.controls__btn--rock');
const btnPaper = document.querySelector('.controls__btn--paper');
const btnScissors = document.querySelector('.controls__btn--scissors');
const restart = document.querySelector('.controls__restart');

// rounds-output 
const roundsChoice = document.querySelector('.rounds__grid');
const roundsLabel = document.querySelector('.rounds__label');
const labelRoundsCurrent = document.querySelector('.rounds__label--current-round');
const labelRoundsMax = document.querySelector('.rounds__label--max-round');

// scores-output
const labelScorePlayer = document.querySelector('.result__player-score');
const labelScoreCPU = document.querySelector('.result__cpu-score');

// text-output
const controlsHeadline = document.querySelector('.controls__headline');
const controlsText = document.querySelector('.controls__text');

// startvalues variables
let scorePlayer = 0;
let scoreCPU = 0;
let currentRound = 0;
let maxRound;

// functions

// how many rounds
const rounds = () => {
    let choice;
    if(choice5.checked) choice = 5;  
    else if(choice10.checked) choice = 10;
    else if(choice15.checked) choice = 15;
    else if(choice20.checked) choice = 20;
    return choice;
}

// random choice cpu 
const randomCPU = () => {
    let random = Math.floor((Math.random()*3 + 1));
    if(random === 1) random = 'rock';
    else if (random === 2) random = 'paper';
    else if (random === 3) random = 'scissors';
    return random;
}

// who wins?
const winner = (player, cpu) => {
    let result;
    if(player === cpu) {
        console.log('draw');
        result = 0;
    }
    else if (player === 'rock' && cpu === 'scissors') {
        scorePlayer++;
        console.log('player wins');
        result = 1;
    }
    else if(player === 'rock' && cpu === 'paper') {
        scoreCPU++;
        console.log('cpu wins');
        result = 2;
    }
    else if(player === 'paper' && cpu === 'rock') {
        scorePlayer++;
        console.log('player wins');
        result = 1;
    }
    else if(player === 'paper' && cpu === 'scissors') {
        scoreCPU++;
        console.log('cpu wins');
        result = 2;
    }
    else if(player === 'scissors' && cpu === 'rock') {
        scoreCPU++;
        console.log('cpu wins');
        result = 2;
    }
    else if(player === 'scissors' && cpu === 'paper') {
        scorePlayer++;
        console.log('player wins');
        result = 1;
    }

    if(result === 0) {
        controlsHeadline.innerHTML = `Draw!!! between Player ${player} and CPU ${cpu}`;
    } else if(result === 1) {
        controlsHeadline.innerHTML = `Player won ${player} against CPU ${cpu}`;
    } else if((result === 2)) {
        controlsHeadline.innerHTML = `CPU won ${cpu}  against player ${player}`;
    }
}

// updateUI 
const updateUI = () => {
    labelRoundsCurrent.innerHTML = `${currentRound}`;
    labelRoundsMax.innerHTML = `${maxRound}`;
    labelScorePlayer.innerHTML = scorePlayer;
    labelScoreCPU.innerHTML = scoreCPU;
}

const gameEnd = () => {
    if(scorePlayer === scoreCPU) {
        controlsText.innerHTML = `GAME IS OVER. IT's a DRAW. BOTH LOST`;
    } else if(scorePlayer > scoreCPU) {
        controlsText.innerHTML = `YEAH PLAYER YOU WON WITH ${scorePlayer} to ${scoreCPU}`;
    } else if(scorePlayer < scoreCPU) {
        controlsText.innerHTML = `DAMN Player, you lost with ${scorePlayer} to ${scoreCPU}`;
    }
}

// reset
const reset = () => {
    currentRound = 0;
    scoreCPU = 0;
    scorePlayer = 0;
    roundsChoice.classList.remove('hidden');
    roundsLabel.classList.add('hidden');
    controlsHeadline.innerHTML = `Let's Play`;
    controlsText.innerHTML = 'MAKE YOUR MOVE';
    labelScorePlayer.innerHTML = scorePlayer;
    labelScoreCPU.innerHTML = scoreCPU;
}

// gamelogic
const game = (choicePlayer) => {
    maxRound = rounds();
    currentRound++;
    if(currentRound <= maxRound) {

        // start of the game
        roundsChoice.classList.add('hidden');
        roundsLabel.classList.remove('hidden');

        // whos the winner
        winner(choicePlayer,randomCPU());

        // UI
        updateUI();

        if(currentRound === maxRound) {
            gameEnd();
        }
    }
}

// Event-Listener

btns.addEventListener('click', function(e) {
    e.preventDefault();
    let select = e.target.closest('.controls__btn');
    if(select) {
        if (select === btnRock) {
            select = 'rock';
        } else if ( select === btnPaper) {
            select = 'paper';
        } else if ( select === btnScissors) {
            select = 'scissors';
        }
        game(select);
    }
})

restart.addEventListener('click', reset);