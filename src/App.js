import { useState } from "react"

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // JavaScript supports closures which means an inner function (e.g. handleClick) has access
  // to variables and functions defined in an outer function (e.g. Board). The handleClick function 
  // can read the squares state and call the setSquares method because they are both defined inside of
  // the Board function.
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) ) { return }

    // We make a copy of the current state (squares) instead of changing it directly.
    // This is important because React state is immutable: mutating it directly
    // (e.g. squares[i] = "X") would keep the same array reference, and React might
    // not re-render. By creating a new array and updating it, React can detect the
    // change and update the UI correctly.
    const nextSquares = squares.slice()
    xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "0"

    setSquares(nextSquares)
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        < Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        < Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        < Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        < Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        < Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        < Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        < Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        < Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        < Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    // check if there is a non-empty symbol (X or O) in square a, and is that same symbol also in squares b and c
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
