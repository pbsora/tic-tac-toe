const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const squares = document.querySelectorAll(".square");
  const getBoard = () => board;
  const updateBoard = (square, player) => {
    board[square] = player;
    for (item in board) {
      squares[item].textContent = board[item];
    }
  };

  const deleteBoard = () => {
    for (item in squares) {
      squares[item].textContent = "";
    }
  };

  const getPlayer = (change) => {
    let currentPlayer = player2.char;

    return () => {
      currentPlayer =
        currentPlayer == player2.char ? player1.char : player2.char;
      return currentPlayer;
    };
  };

  const createBoard = () => {
    const squaresArray = Array.from(squares);
    let currentPlayer = getPlayer();
    const addEvent = (e) => {
      e.target.textContent = currentPlayer();
      board[e.target.className.slice(14) - 1] = currentPlayer();
      console.log(board);
      e.target.removeEventListener("click", addEvent);
    };

    for (item in squaresArray) {
      squaresArray[item].addEventListener("click", addEvent);
    }
  };

  return { getBoard, updateBoard, deleteBoard, createBoard, getPlayer };
})();

function createPlayer(char) {
  return { char };
}

const player1 = createPlayer("X");
const player2 = createPlayer("O");

let board = Gameboard.getBoard();

Gameboard.createBoard();

test = Gameboard.getPlayer();
