const player1 = createPlayer("X");
const player2 = createPlayer("O");

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = player1.char;
  let boardFull = 0;
  const squares = document.querySelectorAll(".square");
  const getBoard = () => board;
  const updateBoard = (square, player) => {
    board[square] = player.char;
    for (item in board) {
      squares[item].textContent = board[item.char];
    }
  };

  const deleteBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    for (item in squares) {
      squares[item].textContent = "";
      squares[item].style.backgroundColor = "transparent";
    }
  };

  const getPlayer = () => currentPlayer;

  const changePlayer = () => {
    return () => {
      currentPlayer =
        currentPlayer == player2.char ? player1.char : player2.char;
    };
  };
  //Event listener function
  const addEvent = (e) => {
    let swapPlayer = changePlayer();
    e.target.textContent = getPlayer();
    board[e.target.className.slice(14) - 1] = getPlayer();
    checkVictory(player1.char, 1);
    checkVictory(player2.char, 0);
    swapPlayer();
    e.target.removeEventListener("click", addEvent);
  };

  const createBoard = () => {
    const squaresArray = Array.from(squares);

    for (item in squaresArray) {
      squaresArray[item].addEventListener("click", addEvent);
    }
    return addEvent;
  };

  const checkVictory = (player, cont) => {
    const winningCombos = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] === player && board[b] === player && board[c] === player) {
        document.querySelector(`.square-${a + 1}`).style.background = "green";
        document.querySelector(`.square-${b + 1}`).style.background = "green";
        document.querySelector(`.square-${c + 1}`).style.background = "green";

        const squaresArray = Array.from(squares);
        for (item in squaresArray) {
          squaresArray[item].removeEventListener("click", addEvent);
        }
        return;
      }
    }
    boardFull += cont;

    if (boardFull == 9) {
      window.alert("It's a tie");
    }
  };

  return {
    getBoard,
    updateBoard,
    deleteBoard,
    createBoard,
    getPlayer,
    changePlayer,
  };
})();

function createPlayer(char) {
  return { char };
}

Gameboard.createBoard();
