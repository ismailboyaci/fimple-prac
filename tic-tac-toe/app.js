

/* const player = document.getElementById('turn'); */
const boxes = document.querySelectorAll('.box');
const reButton = document.getElementById('restartBtn');
const statusText = document.getElementById('status');
const helpBtn = document.getElementById('helpbtn');
const modal = document.getElementById('myModal');
const closeBtn = document.getElementById('close');

let clicks = Array(9).fill('');
let currentPlayer = 'X';
let running = false;


const winningCombitions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

function runningGame() {
    statusText.innerHTML = `Player ${currentPlayer}'s Turn`;
    boxes.forEach(box => box.addEventListener('click', handleClick));
    reButton.addEventListener('click', restartClick);
    helpBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    running = true;
};

runningGame();

function handleClick(e) {
    const id = e.target.id;
    if (running) {
        clicks[id] = currentPlayer;
        boxes[id].innerHTML = currentPlayer;
        boxes[id].setAttribute('style', 'cursor:default')
    }
    winCheck()
};

function winCheck() {
    let win = false;
    for (let i = 0; i < winningCombitions.length; i++) {
        const comb = winningCombitions[i];
        const cond1 = clicks[comb[0]];
        const cond2 = clicks[comb[1]];
        const cond3 = clicks[comb[2]];
        if (cond1 == "" || cond2 == "" || cond3 == "") {
            continue;
        }
        if (cond1 == cond2 && cond2 == cond3) {
            win = true;
            break;
        }
    }
    if (win) {
        statusText.innerHTML = `Player ${currentPlayer} Win`;
        running = false;
    }
    else if (!clicks.includes("")) {
        statusText.innerHTML = 'Nobody Win';
        running = false;
    }
    else {
        currentPlayer = (currentPlayer == "X") ? "O" : "X";
        statusText.innerHTML = `Player ${currentPlayer}'s Turn`;
    }

}

function restartClick() {
    currentPlayer = 'X';
    clicks.fill('');
    boxes.forEach(box => box.innerHTML = '');
    runningGame();
};

function openModal() {
    modal.style.display = "block";
};
function closeModal() {
    modal.style.display = "none";
};

