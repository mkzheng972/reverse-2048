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
    // const newGrid = initializeGrid()
    const newGrid = [
      [null, 3, null, null],
      [null, null, null, 3],
      [3, 3, 3, 2],
      [2, 3, 3, 3],
    ]
    setGrid(newGrid)

    console.log(newGrid)

    // let savedScore = localStorage.getItem('topScore')
    // if (savedScore) {
    //   setTopScore(savedScore)
    // }
  }, [])

  // runs when gridChange variable is changes, updates grid state
  useEffect(() => {
    if (gridChange) {
      setGridChange(false)
      setGrid(grid)
    }
  }, [gridChange])

  // {data.map((datum, index) => (
  //   // This will render a row for each data element.
  //   <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
  //     <View style={{ flex: 1, alignSelf: 'stretch' }} />
  //     {datum}
  //     {/* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
  //     <View style={{ flex: 1, alignSelf: 'stretch' }} />
  //     <View style={{ flex: 1, alignSelf: 'stretch' }} />
  //     <View style={{ flex: 1, alignSelf: 'stretch' }} />
  //     <View style={{ flex: 1, alignSelf: 'stretch' }} />
  //   </View>
  // ))}

  return (
    <View style={styles.container}>
      <Text>This is where the grid will be</Text>
      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
      <View style={styles.gridContainer}>
        {grid.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.gridRow}>
            {row.map((cell, cellIdx) => (
              <View key={cellIdx} style={styles.gridCell}>
                {cell}
              </View>
            ))}
          </View>
        ))}
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
  gridCell: {
    flex: 1,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
    color: 'white',
  },
  gridContainer: {
    backgroundColor: 'green',
    // backgroundColor: '#f0e4d3',
    // borderRadius: '5px',
    // outline: none;
    // touch-action: none;
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridRow: {
    flexDirection: 'row',
  },
})
