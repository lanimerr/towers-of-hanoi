//initializing a new board and the proper win condition

function Board() {
    this.board = [
        [5, 4, 3, 2, 1],
        [],
        [],
    ];
    this.winCondition = [5, 4, 3, 2, 1];
}

//prints the state of the board to the console

Board.prototype.displayBoard = function() {
    this.board.forEach(arr => console.log("---" + arr.join(" ")));
};

//resets the board to its intial state and then calls displayBoard

Board.prototype.resetBoard = function() {
    this.board = [
        [5, 4, 3, 2, 1],
        [],
        []
    ];
    this.winCondition = [5, 4, 3, 2, 1];
    this.displayBoard();
};

//this method creates a new board with a specific number of pegs and discs

Board.prototype.createBoard = function(numPegs, numDiscs) {
    this.board = [];
    for (let i = 0; i < numPegs; i++) {
        this.board.push([]);
    }
    this.winCondition = [];
    for (let j = numDiscs; j > 0; j--) {
        this.board[0].push(j);
        this.winCondition.push(j);
    }
    this.displayBoard();
};

//checkWinner checks the current state of the board to see if it matches the winCondition, which will display the win message

Board.prototype.checkWinner = function() {
    const solutionCheck = this.board.slice(1);

    if (solutionCheck.some(arr => arr.toString() === this.winCondition.toString())) {
        console.log("Congratulations! You won");
        console.log("Ready for a new game");
        this.resetBoard();
    } else {
        console.log("Sorry, better luck next time. Try again");
        this.displayBoard();
    }
};

const boardObj = new Board();

boardObj.displayBoard();

//handles the move functions of the discs to and from the pegs

const moveDisc = (fromPeg, toPeg) => {
    const fromArr = boardObj.board[fromPeg - 1];
    const toArr = boardObj.board[toPeg - 1];
    const numOfPegs = boardObj.board.length;

    if (fromPeg < 1 || fromPeg > numOfPegs || !Number.isInteger(fromPeg) || toPeg < 1 || toPeg > numOfPegs || !Number.isInteger(toPeg)) {
        console.log("the peg you entered does not exist. Try again");
    } else if (!fromArr[0]) {
        console.log("There is no disc on this peg. Try again");
    } else if (!toArr[0] || toArr[toArr.length - 1] > fromArr[fromArr.length - 1]) {
        toArr.push(fromArr.pop());
        console.log(`Disc moves to peg ${toPeg}, board is now:`);
    } else {
        console.log("Invalid move: Cannot place a larger disc on a smaller one, board is still:");
    }

    boardObj.displayBoard();

    for (let i = 1; i < boardObj.board.length; i++) {
        if (boardObj.board[i].toString() === boardObj.winCondition.toString()) {
            console.log("Congratulations! you won");
            console.log("The board is ready for a new game");
            boardObj.resetBoard();
        }
    }
};

