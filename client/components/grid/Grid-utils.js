/*

  // let num = 1
  // const grid = []
  // for (let i = 0; i < 4; i++) {
  //   grid.push([])
  //   for (let j = 0; j < 4; j++) {
  //     grid[i].push(num)
  //     num += 1
  //   }
  // }

  // let initialGrid = [
  //   [2, null, 2, 4],
  //   [null, 4, 4, 8],
  //   [4, null, 4, 8],
  //   [2, 2, 4, 4],
  // ]

  functions required: (things I need to add)

  1. move left
  2. move right
  3. move up
  4. move down
  5. check board if there are any more moves to make aka empty
  6. if theres an empty cell, randomize cell and add a value in
  7. initialize grid with two nums at random two cells
  8. new game button: resets the grid -> ** (actually this can be done with initialize grid)
  9. localstorage for top score (no localstroage for react-native)

  needs:
  sum up the new value to add to the score, the 4 move functions return a sum number


  TODO:
  - need to initialize the board with 2 or 4
  - add sum number to the score

  */

export function moveLeft(grid) {
  let sum = 0
  for (let row = 0; row < 4; row++) {
    /*
    p1 = null p2 = null   // do nothing
    p1 = 4    p2 = 4
    p1 = 2    p2 = 4
    p1 = null p2 = 4
    p1 = 2    p2 = null   // do nothing
    j is left, starts at 0
    i is right, starts at 1
  */
    let j = 0
    for (let i = 1; i < 4; i++) {
      let p1 = grid[row][j]
      let p2 = grid[row][i]
      if (p1 && p2) {
        // both values are not null
        if (p1 === p2) {
          // the same value
          grid[row][j] *= 2
          // add the new value to the score
          sum += grid[row][j]
          grid[row][i] = null
          j += 1
        } else {
          // different values
          // make index at j+1 equal to p2
          grid[row][i] = null
          grid[row][j + 1] = p2
          j += 1
          // if (j+1 !== i) {
          //   grid[row][j+1] = p2
          //   grid[row][i] = null
          //   j += 1
          // }
        }
      } else {
        // one of the values is null
        if (p1 === null && p2 !== null) {
          grid[row][i] = null
          grid[row][j] = p2
        }
      }
    }
  }

  return sum
}

export function moveUp(grid) {
  let sum = 0
  for (let col = 0; col < 4; col++) {
    let j = 0
    for (let i = 1; i < 4; i++) {
      let p1 = grid[j][col]
      let p2 = grid[i][col]
      if (p1 && p2) {
        if (p1 === p2) {
          grid[j][col] *= 2
          sum += grid[j][col]
          grid[i][col] = null
          j += 1
        } else {
          grid[i][col] = null
          grid[j + 1][col] = p2
          j += 1
        }
      } else {
        if (p1 === null && p2 !== null) {
          grid[i][col] = null
          grid[j][col] = p2
        }
      }
    }
  }
  return sum
}

export function moveRight(grid) {
  let sum = 0
  for (let row = 0; row < 4; row++) {
    let j = 3
    for (let i = 2; i >= 0; i--) {
      let p1 = grid[row][j]
      let p2 = grid[row][i]
      if (p1 && p2) {
        if (p1 === p2) {
          grid[row][j] *= 2
          sum += grid[row][j]
          grid[row][i] = null
          j -= 1
        } else {
          grid[row][i] = null
          grid[row][j - 1] = p2
          j -= 1
        }
      } else {
        if (p1 === null && p2 !== null) {
          grid[row][i] = null
          grid[row][j] = p2
        }
      }
    }
  }
  return sum
}

export function moveDown(grid) {
  let sum = 0
  for (let col = 0; col < 4; col++) {
    let j = 3
    for (let i = 2; i >= 0; i--) {
      let p1 = grid[j][col]
      let p2 = grid[i][col]
      if (p1 && p2) {
        if (p1 === p2) {
          grid[j][col] *= 2
          sum += grid[j][col]
          grid[i][col] = null
          j -= 1
        } else {
          grid[i][col] = null
          grid[j - 1][col] = p2
          j -= 1
        }
      } else {
        if (p1 === null && p2 !== null) {
          grid[i][col] = null
          grid[j][col] = p2
        }
      }
    }
  }
  return sum
}

export function canMove(grid) {
  // loop thru the grid and check if there are any matches left
  // at each cell, check each 4 directions to see if there are matches
  // this function only runs when there are no empty cells
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  let matches = false
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let currentNum = grid[row][col]
      for (let dir of dirs) {
        let [x, y] = dir
        let newRow = row + x
        let newCol = col + y
        if (inBounds(newRow, newCol, grid)) {
          // in bounds, check if they match
          if (currentNum === grid[newRow][newCol]) {
            matches = true
            return matches
          }
        }
      }
    }
  }
  return false
}

export function inBounds(row, col, grid) {
  if (row >= 0 && row < grid.length && col >= 0 && col <= grid[0].length) {
    return true
  } else {
    return false
  }
}

export function getEmptyCells(grid) {
  let emptyCells = []
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === null) {
        emptyCells.push([row, col])
      }
    }
  }
  return emptyCells
}

// only generate random num if the grid changes and grid has empty cells
export function setRandomNum(grid, emptyCellsArr) {
  let selectedIndex = Math.floor(Math.random() * emptyCellsArr.length)
  let selectedCell = emptyCellsArr[selectedIndex]
  let [row, col] = selectedCell
  grid[row][col] = 2
}

// perhaps we can pass in the length of the grid if we decide to dynamically set grid length
export function initializeGrid() {
  /*

  this function will set two cells to value of 2,
  need to think of how to set it so the two random values are not the same

  */

  let grid = new Array(4).fill(null).map(() => new Array(4).fill(null))
  let emptyCells = getEmptyCells(grid)
  setRandomNum(grid, emptyCells)
  emptyCells = getEmptyCells(grid)
  setRandomNum(grid, emptyCells)
  return grid
}

export function startTouch(e) {
  const initialX = e.touches[0].clientX
  const initialY = e.touches[0].clientY
  return
}
