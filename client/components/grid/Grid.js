import React, { useState, useEffect } from 'react'
import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  canMove,
  getEmptyCells,
  setRandomNum,
} from './Grid-utils'

const Grid = () => {
  // const grid = new Array(4).fill(0).map((el, index) => new Array(4).fill(null))

  let initialGrid = [
    [2, null, 2, 4],
    [null, 4, 4, 8],
    [4, null, 4, 8],
    [2, 2, 4, 4],
  ]

  const [grid, setGrid] = useState([])
  const [gridChange, setGridChange] = useState(false)

  useEffect(() => {
    setGrid(initialGrid)
  }, [])

  useEffect(() => {
    if (gridChange) {
      setGridChange(false)
      setGrid(grid)
    }
  }, [gridChange])

  const set = new Set([37, 38, 39, 40])
  const keyCodeValues = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  }

  function handleKey(event) {
    // console.log('hit handlekey')
    // console.log(event.keyCode)
    const keycode = event.keyCode
    if (set.has(keycode)) {
      event.preventDefault() // fixes page scroll when using arrow keys
      if (keycode === keyCodeValues.left) {
        console.log('left')
        moveLeft(grid)
      } else if (keycode === keyCodeValues.up) {
        console.log('up')
        moveUp(grid)
      } else if (keycode === keyCodeValues.right) {
        console.log('right')
        moveRight(grid)
      } else if (keycode === keyCodeValues.down) {
        console.log('down')
        moveDown(grid)
      }

      // scan for empty cells
      // add a value to any one empty cell
      // if no empty cels, run canMove to check if there are any moves left

      const emptyCellsArr = getEmptyCells(grid)

      if (emptyCellsArr.length > 0) {
        setRandomNum(grid, emptyCellsArr)
      } else if (emptyCellsArr.length === 0) {
        // no empty cells, check if there are any valid moves left
        let checkMove = canMove(grid)
        if (checkMove === false) {
          // end the game
          console.log('Game Ends')
        }
      }
    }

    // console.log(grid)

    if (set.has(keycode)) {
      setGridChange(true)
    }
  }

  return (
    <div className='grid-container' onKeyDown={handleKey} tabIndex={0}>
      {grid.map((row, index) => (
        <div key={index} className='grid-row'>
          {row.map((cell, index) => (
            <div key={index} className='grid-cell'>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Grid
