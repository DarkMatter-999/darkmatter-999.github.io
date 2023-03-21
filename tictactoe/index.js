const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let currentPlayer = "X";

let places = ["", "", "", "", "", "", "", "", ""];

const runGame = () => {
    cells.forEach((cell) =>
        cell.addEventListener("click", () => {
            cellClicked(cell);
        })
    );

    statusText.innerText = `${currentPlayer}'s turn`;
};

const cellClicked = (cell) => {
    const cellIndex = cell.getAttribute("cellIndex");
    if (places[cellIndex] != "") {
        return;
    }

    cellUpdate(cell, cellIndex);
    checkWinner();
};
const cellUpdate = (cell, index) => {
    places[index] = currentPlayer;
    cell.innerText = currentPlayer;
};

const changePlayer = () => {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusText.innerText = `${currentPlayer}'s turn`;
};

const checkWinner = () => {
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];

        const cell1 = places[condition[0]];
        const cell2 = places[condition[1]];
        const cell3 = places[condition[2]];

        if (cell1 == "" || cell2 == "" || cell3 == "") {
            continue;
        }

        if (cell1 == cell2 && cell2 == cell3) {
            statusText.innerText = `${currentPlayer} won`;
            return true;
        } else if (!places.includes("")) {
            statusText.innerText = `Draw`;
            return true;
        }
    }
    changePlayer();
    return false;
};

const restart = () => {
    currentPlayer = "X";
    places = ["", "", "", "", "", "", "", "", ""];
    statusText.innerText = `${currentPlayer}'s turn`;
    cells.forEach((cell) => (cell.innerText = ""));
};

runGame();
