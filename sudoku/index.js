const digits = document.getElementById("digits");
const gameboard = document.getElementById("board");

let numSelected = null;
let tileSelected = null;

let errors = 0;

let board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---",
];

let solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763",
];

const setGame = () => {
    // Digits
    for (let i = 1; i <= 9; i++) {
        let num = document.createElement("div");
        num.id = i;
        num.innerText = i;
        num.addEventListener("click", () => {
            selectNumber(num);
        });
        num.classList.add("number");
        digits.appendChild(num);
    }

    // Board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;

            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tileStart");
            }

            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }

            tile.classList.add("tile");
            tile.addEventListener("click", () => {
                selectTile(tile);
            });
            gameboard.append(tile);
        }
    }

    let arr = [];
    for (let r = 0; r < 9; r++) {
        let arr2 = [];
        for (let c = 0; c < 9; c++) {
            arr2.push(0);
        }
        arr.push(arr2);
    }
    // fillPuzzle(arr);

    console.log(arr);
};

const selectNumber = (num) => {
    if (numSelected != null) {
        numSelected.classList.remove("numberselected");
    }
    numSelected = num;
    numSelected.classList.add("numberselected");
};

const selectTile = (tile) => {
    if (numSelected) {
        if (tile.innerText != "") {
            return;
        }
        let coord = tile.id.split("-");
        const r = parseInt(coord[0]);
        const c = parseInt(coord[1]);

        if (solution[r][c] == numSelected.id) {
            tile.innerText = numSelected.id;
        } else {
            errors++;
            document.getElementById("error").innerText = errors;
        }
    }
};

setGame();
