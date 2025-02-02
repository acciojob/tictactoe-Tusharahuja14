let container = document.querySelector(".container");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let submit = document.getElementById("submit");
let players = document.querySelector(".players");
let gameContainer = document.querySelector("#gameContainer");
let statustext = document.querySelector("#statustext");
let cells = document.querySelectorAll(".cell");
let restart = document.querySelector("#restartBtn");

let option = ["", "", "", "", "", "", "", "", ""];
let currentplayer = "x";
let running = false;

submit.addEventListener("click", getname);

function getname() {
    let errormessage = document.querySelector(".error_message");
    if (errormessage) errormessage.remove();

    if (player1.value.trim() !== "" && player2.value.trim() !== "") {
        initializegame();
    } else {
        let error = document.createElement("h3");
        error.textContent = "Enter Both Player's name";
        error.setAttribute("class", "error_message");
        players.appendChild(error);
    }
}

function initializegame() {
    gameContainer.style.display = "block";
    players.style.display = "none";
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restart.addEventListener("click", restartGame);
    statustext.textContent = `${player1.value}, you're up`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellindex");
    if (option[cellIndex] !== "" || !running) return;
    
    updateCell(this, cellIndex);
    checkingWinner();
}

function updateCell(cell, index) {
    option[index] = currentplayer;
    cell.textContent = currentplayer;
}

function changePlayer() {
    currentplayer = (currentplayer === "x" ? "o" : "x");
    statustext.textContent = `${currentplayer === "x" ? player1.value : player2.value}, you're up`;
}

function checkingWinner() {
    let roundwon = false;
    const winconditions = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8], [2, 5, 8],
        [6, 7, 8], [1, 4, 7], [3, 4, 5], [2, 4, 6]
    ];

    for (let i = 0; i < winconditions.length; i++) {
        let [a, b, c] = winconditions[i];
        if (option[a] === "" || option[b] === "" || option[c] === "") continue;
        if (option[a] === option[b] && option[b] === option[c]) {
            roundwon = true;
            highlightWinner(a, b, c);
            break;
        }
    }

    if (roundwon) {
        statustext.textContent = `${currentplayer === "x" ? player1.value : player2.value} congratulations you won!`;
        running = false;
    } else if (!option.includes("")) {
        statustext.textContent = "Draw!";
    } else {
        changePlayer();
    }
}

function highlightWinner(a, b, c) {
    document.querySelectorAll('.cell')[a].classList.add("winner");
    document.querySelectorAll('.cell')[b].classList.add("winner");
    document.querySelectorAll('.cell')[c].classList.add("winner");
}

function restartGame() {
    players.style.display = "block";
    currentplayer = "x";
    option = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    statustext.textContent = `${player1.value}, you're up`;
    running = true;
}
