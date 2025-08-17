
let turnsPlayed = 0
let turn = 'X'
let gg = false

let grid = Array.from({ length: 3 }, () => Array(3).fill(undefined));
var gameText = document.getElementById('gameText');


const cells = document.querySelectorAll('.cell');
Array.from(cells).forEach((cell, index) => {
    grid[Math.floor(index / 3)][index % 3] = cell
    cell.addEventListener("click", function (e) {
        let symbol = cell.getAttribute("symbol")
        if (symbol === null && !gg) {
            turnsPlayed ++
            cell.setAttribute("symbol", turn);
            cell.textContent = turn
            let winner = getOutcome()
            if (winner != "") {
                console.log("Winner is " + winner)
                declareWinner(winner + " has won.")
                gg = true
                return
            } else if (gameFinished()) {
                console.log("Tie")
                declareWinner("Tie game")
                gg = true
                return
            }
            switchTurn()
        }

    });

});

let resButton = document.getElementById("reset")
resButton.addEventListener("click", function(e) {
    reset()
});

function reset() {
    gameText.textContent = ""
    turnsPlayed = 0
    gg = false
    for (let i = 0; i < 3; i ++) {
        for (let j = 0; j < 3; j ++) {
            grid[i][j].removeAttribute("symbol");
            grid[i][j].textContent = ""
        }
    }
}

function declareWinner(text) {
    gameText.textContent = text;
}

function switchTurn() {
    if (turn === 'X') {
        turn = 'O'
    } else {
        turn = 'X'
    }
}

function gameFinished() {
    return turnsPlayed == 9
}

function getOutcome() {
    //Horizontal
    for (let i = 0; i < 3; i ++) {
        let symbol = grid[i][0].getAttribute("symbol")
        if (symbol != null) {
            for (let j = 0; j < 3; j ++) {
                thisSymbol = grid[i][j].getAttribute("symbol")
                if (thisSymbol != symbol) {
                    break
                } else if (j == 2) {
                    return symbol
                }
            }
        }
    }
    //Vertical
    for (let j = 0; j < 3; j ++) {
        let symbol = grid[0][j].getAttribute("symbol")
        if (symbol != null) {
            for (let i = 0; i < 3; i ++) {
                thisSymbol = grid[i][j].getAttribute("symbol")
                if (thisSymbol != symbol) {
                    break
                } else if (i == 2) {
                    return symbol
                }
            }
        }
    }
    //Diagonal
    let symbol = grid[1][1].getAttribute("symbol")
    if (symbol != null) {
        if (grid[0][0].getAttribute("symbol") == symbol && grid[2][2].getAttribute("symbol") == symbol) {
            return symbol
        }
        if (grid[2][0].getAttribute("symbol") == symbol && grid[0][2].getAttribute("symbol") == symbol) {
            return symbol
        }
    }
    return ""
}

