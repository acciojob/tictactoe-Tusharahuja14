//your JS code here. If required.
let container = document.querySelector(".container");
let player1 = document.getElementById("player-1");
let player2 = document.getElementById("player-2");
let submit = document.getElementById("submit");
let players = document.querySelector(".players");
let gameContainer=document.querySelector("#gameContainer");
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

const cells = document.querySelectorAll(".cell");
const statustext = document.querySelector("#statustext");
const restart = document.querySelector("#restartBtn");

const winconditions = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [2, 5, 8],
    [6, 7, 8], [1, 4, 7], [3, 4, 5], [2, 4, 6]
];

let option = ["", "", "", "", "", "", "", "", ""];
let currentplayer = "X";
let running = false;

function initializegame() {
	gameContainer.style.display="block";
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
    currentplayer = (currentplayer === "X" ? "O" : "X");
    statustext.textContent = `${currentplayer === "X" ? player1.value : player2.value}, you're up`;
}

function checkingWinner() {
    let roundwon = false;
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
        statustext.textContent = `${currentplayer === "X" ? player1.value : player2.value} congratulations you won!`;
        running = false;
    } else if (!option.includes("")) {
        statustext.textContent = "Draw!";
    } else {
        changePlayer();
    }
}
function highlightWinner(a, b, c) {
    // Get the cell elements and apply a 'winner' class to each
    document.querySelectorAll('.cell')[a].classList.add("winner");
    document.querySelectorAll('.cell')[b].classList.add("winner");
    document.querySelectorAll('.cell')[c].classList.add("winner");
}

function restartGame() {
    players.style.display = "block";
    currentplayer = "X";
    option = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    statustext.textContent = `${player1.value}, you're up`;
    running = true;
}
