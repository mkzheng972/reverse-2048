import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'

import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  canMove,
  getEmptyCells,
  setRandomNum,
  initializeGrid,
} from './Grid-utils'

/*

component
ex:
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hello World!</Text>
      <StatusBar style='auto' />
    </View>
  )
}

...

styles
ex:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

*/

export default function Grid() {
  const [grid, setGrid] = useState([])
  const [gridChange, setGridChange] = useState(false)
  const [score, setScore] = useState(0)
  const [topScore, setTopScore] = useState(0)

  // runs at first page render, sets initial grid state
  useEffect(() => {
    const newGrid = initializeGrid()
    // const newGrid = [
    //   [null, 3, null, null],
    //   [null, null, null, 3],
    //   [3, 3, 3, 2],
    //   [2, 3, 3, 3],
    // ]
    setGrid(newGrid)

    // let savedScore = localStorage.getItem('topScore')
    // if (savedScore) {
    //   setTopScore(savedScore)
    // }
  }, [])

  useEffect(() => {
    if (gridChange) {
      setGridChange(false)
      setGrid(grid)
    }
  }, [gridChange])

  function resetGrid() {
    const resetGrid = initializeGrid()
    setGrid(resetGrid)
    setGridChange(true)
    setScore(0)
  }

  /*

  BELOW works for swipes, but not dry
  TODO:
  - fix the sum of points
  - chrome on mobile does not use local storage
  - need to make function dry, and not repeat some how

  refer to link for swipe functionality: https://stackoverflow.com/questions/53192433/how-to-detect-swipe-in-javascript
  */

  /*
  TODO: two functions, touchStart and touchEnd
  */

  let initialX = null
  let initialY = null

  // for mobile swipes
  function handleTouchStart(e) {
    initialX = e.touches[0].clientX
    initialY = e.touches[0].clientY
  }

  function handleTouchEnd(e) {
    e.preventDefault()
    if (initialX === null || initialY === null) {
      return
    }

    let currentX = e.touches[0].clientX
    let currentY = e.touches[0].clientY

    let diffX = initialX - currentX
    let diffY = initialY - currentY

    const arrayPreMove = JSON.stringify(grid)
    let sum = 0
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // sliding horizontally
      if (diffX > 0) {
        // swiped left
        console.log('swiped left')
        sum += moveLeft(grid)
      } else {
        // swiped right
        console.log('swiped right')
        sum += moveRight(grid)
      }
    } else {
      // sliding vertically
      if (diffY > 0) {
        // swiped up
        console.log('swiped up')
        sum += moveUp(grid)
      } else {
        // swiped down
        console.log('swiped down')
        sum += moveDown(grid)
      }
    }

    const currScore = score + sum
    setScore(currScore)

    if (localStorage.getItem('topScore') === null) {
      localStorage.setItem('topScore', currScore.toString())
    } else {
      const savedTopScore = parseInt(localStorage.getItem('topScore'))
      // current score is greater than saved top score
      if (currScore > savedTopScore) {
        localStorage.setItem('topScore', currScore.toString())
        setTopScore(currScore)
      }
    }

    const arrayPostMove = JSON.stringify(grid)
    const emptyCellsArr = getEmptyCells(grid)

    if (emptyCellsArr.length > 0 && arrayPreMove !== arrayPostMove) {
      setRandomNum(grid, emptyCellsArr)
    } else if (emptyCellsArr.length === 0) {
      const checkMove = canMove(grid)
      if (checkMove === false) {
        handleGameEnd()
      }
    }

    initialX = null
    initialY = null
    setGridChange(true)
    e.preventDefault()
  }

  function onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections

    const arrayPreMove = JSON.stringify(grid)
    let sum = 0

    switch (gestureName) {
      case SWIPE_UP:
        // this.setState({backgroundColor: 'red'});
        sum += moveUp(grid)
        console.log('swiped up')
        break
      case SWIPE_DOWN:
        // this.setState({backgroundColor: 'green'});
        sum += moveDown(grid)
        console.log('swiped down')
        break
      case SWIPE_LEFT:
        // this.setState({backgroundColor: 'blue'});
        sum += moveLeft(grid)
        console.log('swiped left')
        break
      case SWIPE_RIGHT:
        // this.setState({backgroundColor: 'yellow'});
        sum += moveRight(grid)
        console.log('swiped right')
        break
    }

    const currScore = score + sum
    setScore(currScore)
    const arrayPostMove = JSON.stringify(grid)
    const emptyCellsArr = getEmptyCells(grid)

    if (emptyCellsArr.length > 0 && arrayPreMove !== arrayPostMove) {
      setRandomNum(grid, emptyCellsArr)
    } else if (emptyCellsArr.length === 0) {
      const checkMove = canMove(grid)
      if (checkMove === false) {
        handleGameEnd()
      }
    }

    setGridChange(true)
  }

  return (
    <View style={styles.container}>
      <Text>This is where the grid will be</Text>
      <View style={styles.gameContainer}>
        <GestureRecognizer
          style={styles.gridContainer}
          onSwipe={(direction, state) => onSwipe(direction, state)}
        >
          {grid.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.gridRow}>
              {row.map((cell, cellIdx) => (
                <View
                  key={cellIdx}
                  style={
                    cellIdx === 3 ? styles.gridCellLastChild : styles.gridCell
                  }
                >
                  <Text style={styles.cellText}>{cell}</Text>
                </View>
              ))}
            </View>
          ))}
        </GestureRecognizer>
      </View>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    color: '#ffffff',
  },
  gameContainer: {
    // flex: 1,
    borderRadius: 10,
  },
  gridCell: {
    // flex: 1,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 5,
    marginRight: 10,
  },
  gridCellLastChild: {
    // flex: 1,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 5,
  },
  gridContainer: {
    // flex: 1,
    backgroundColor: '#fff000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  gridRow: {
    // flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
})
