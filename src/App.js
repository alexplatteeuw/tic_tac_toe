import { useState } from "react"

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  // JavaScript supports closures which means an inner function (e.g. handleClick) has access
  // to variables and functions defined in an outer function (e.g. Board). The handleClick function 
  // can read the squares state and call the setSquares method because they are both defined inside of
  // the Board function.
  function handleClick(i) {
    if (squares[i]) { return }
    
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
