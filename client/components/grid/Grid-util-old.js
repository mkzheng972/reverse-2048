function moveLeft(grid) {
  for (let i = 0; i < 4; i++) {
    let p1 = 0 // left
    let p2 = 1 // right

    while (p2 < 4) {
      if (grid[i][p2] !== null && grid[i][p2] === grid[i][p1]) {
        // have values and equal
        grid[i][p1] *= 2
        grid[i][p2] = null
        p1 += 1
      } else if (grid[i][p2] && grid[i][p1]) {
        // both have values, dont equal
        p1 += 1
      } else if (grid[i][p1] === null && grid[i][p2] !== null) {
        // swap
        grid[i][p1] = grid[i][p2]
        grid[i][p2] = null
      }
      if (p2 === 3 && grid[i][p1] === null) {
        grid[i][p1] = grid[i][p2]
        grid[i][p2] = null
      }
      p2 += 1
    }
  }
}

function moveRight(grid) {
  for (let i = 0; i < 4; i++) {
    let p1 = 3 // right
    let p2 = 2 // left

    while (p2 >= 0) {
      if (grid[i][p2] !== null && grid[i][p2] === grid[i][p1]) {
        // have values and equal
        grid[i][p1] *= 2
        grid[i][p2] = null
        p1 -= 1
      } else if (grid[i][p2] && grid[i][p1]) {
        // both have values, dont equal
        p1 -= 1
      } else if (grid[i][p1] === null && grid[i][p2] !== null) {
        // swap
        grid[i][p1] = grid[i][p2]
        grid[i][p2] = null
      }
      if (p2 === 0 && grid[i][p1] === null) {
        grid[i][p1] = grid[i][p2]
        grid[i][p2] = null
      }
      p2 -= 1
    }
  }
}

function moveUp(grid) {
  for (let i = 0; i < 4; i++) {
    let p1 = 0 // top
    let p2 = 1 // bottom

    while (p2 < 4) {
      if (grid[p2][i] !== null && grid[p2][i] === grid[p1][i]) {
        // have values and equal
        grid[p1][i] *= 2
        grid[p2][i] = null
        p1 += 1
      } else if (grid[p2][i] && grid[p1][i]) {
        // both have values, dont equal
        p1 += 1
      } else if (grid[p1][i] === null && grid[p2][i] !== null) {
        // swap
        grid[p1][i] = grid[p2][i]
        grid[p2][i] = null
      }
      if (p2 === 3 && grid[i][p1] === null) {
        grid[p1][i] = grid[p2][i]
        grid[p2][i] = null
      }
      p2 += 1
    }
  }
}

function moveDown(grid) {
  for (let i = 0; i < 4; i++) {
    let p1 = 3 // bottom
    let p2 = 2 // top

    while (p2 >= 0) {
      if (grid[p2][i] !== null && grid[p2][i] === grid[p1][i]) {
        // have values and equal
        grid[p1][i] *= 2
        grid[p2][i] = null
        p1 -= 1
      } else if (grid[p2][i] && grid[p1][i]) {
        // both have values, dont equal
        p1 -= 1
      } else if (grid[p1][i] === null && grid[p2][i] !== null) {
        // swap
        grid[p1][i] = grid[p2][i]
        grid[p2][i] = null
      }
      if (p2 === 0 && grid[i][p1] === null) {
        grid[p1][i] = grid[p2][i]
        grid[p2][i] = null
      }
      p2 -= 1
    }
  }
}
