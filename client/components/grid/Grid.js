import React, { useState, useEffect } from 'react';
import './Grid.css';
import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  canMove,
  getEmptyCells,
  setRandomNum,
  initializeGrid,
  getHighestScores,
} from './Grid-utils';

import GameEndModal from './GameEndModal';

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [gridChange, setGridChange] = useState(false);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [highestScores, setHighestScores] = useState([
    // { name: 'Mark', score: 100 },
    // { name: 'Ben', score: 120 },
    // { name: 'Tom', score: 100 },
  ]);

  // runs at first page render, sets initial grid state
  useEffect(() => {
    const newGrid = initializeGrid();
    setGrid(newGrid);

    let savedScore = localStorage.getItem('topScore');
    if (savedScore) {
      setTopScore(savedScore);
    }
    handleGameEnd();
  }, []);

  // runs when gridChange variable is changes, updates grid state
  useEffect(() => {
    if (gridChange) {
      setGridChange(false);
      setGrid(grid);
    }
  }, [gridChange]);

  const set = new Set([37, 38, 39, 40]);
  const keyCodeValues = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  };

  function resetGrid() {
    const resetGrid = initializeGrid();
    setGrid(resetGrid);
    setGridChange(true);
    setScore(0);
  }

  /*
  End Game
  TODO:
    - show modal
    - modal shows top 10 scores
    - need to add current score to database
    - need a input field for player name

  */
  async function handleGameEnd() {
    let scores = await getHighestScores();
    setHighestScores(scores);
    console.log('Game Ends');

    $('#myModalCenter').modal({ show: true });
  }

  // for computer inputs
  function handleKey(event) {
    const keycode = event.keyCode;
    if (set.has(keycode)) {
      // fixes page scroll when using arrow keys
      event.preventDefault();

      // get str copy of array before change
      const arrayPreMove = JSON.stringify(grid);
      let sum = 0;

      if (keycode === keyCodeValues.left) {
        console.log('left');
        sum += moveLeft(grid);
      } else if (keycode === keyCodeValues.up) {
        console.log('up');
        sum += moveUp(grid);
      } else if (keycode === keyCodeValues.right) {
        console.log('right');
        sum += moveRight(grid);
      } else if (keycode === keyCodeValues.down) {
        console.log('down');
        sum += moveDown(grid);
      }

      const currScore = score + sum;
      setScore(currScore);

      // check localStorage for highest score, localstorage.getitem() is initially set to null
      if (localStorage.getItem('topScore') === null) {
        localStorage.setItem('topScore', currScore.toString());
      } else {
        const savedTopScore = parseInt(localStorage.getItem('topScore'));
        // current score is greater than saved top score
        if (currScore > savedTopScore) {
          localStorage.setItem('topScore', currScore.toString());
          setTopScore(currScore);
        }
      }

      // get str copy of array after change
      const arrayPostMove = JSON.stringify(grid);
      const emptyCellsArr = getEmptyCells(grid);

      // sets num at random cell only if there are empty cells left and the grid changed
      if (emptyCellsArr.length > 0 && arrayPreMove !== arrayPostMove) {
        setRandomNum(grid, emptyCellsArr);

        // no more empty cells
      } else if (emptyCellsArr.length === 0) {
        // check if there are any valid moves left
        const checkMove = canMove(grid);
        if (checkMove === false) {
          // end the game
          handleGameEnd();
        }
      }
    }

    // set gridchange to true to hit the useEffect to re-set grid to new grid
    if (set.has(keycode)) {
      setGridChange(true);
    }
  }

  /*

  BELOW works for swipes, but not dry
  TODO:
  - fix the sum of points
  - chrome on mobile does not use local storage
  - need to make function dry, and not repeat some how

  refer to link for swipe functionality: https://stackoverflow.com/questions/53192433/how-to-detect-swipe-in-javascript
  */

  let initialX = null;
  let initialY = null;

  // for mobile swipes
  function handleTouchStart(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  }

  function handleTouchEnd(e) {
    e.preventDefault();
    if (initialX === null || initialY === null) {
      return;
    }
    const arrayPreMove = JSON.stringify(grid);
    let sum = 0;
    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;
    let diffX = initialX - currentX;
    let diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // horizontal swipe
      if (diffX > 0) {
        // swiped left
        console.log('swiped left');
        sum += moveLeft(grid);
      } else {
        // swiped right
        console.log('swiped right');
        sum += moveRight(grid);
      }
    } else {
      // vertical swipe
      if (diffY > 0) {
        // swiped up
        console.log('swiped up');
        sum += moveUp(grid);
      } else {
        // swiped down
        console.log('swiped down');
        sum += moveDown(grid);
      }
    }

    const currScore = score + sum;
    setScore(currScore);

    if (localStorage.getItem('topScore') === null) {
      localStorage.setItem('topScore', currScore.toString());
    } else {
      const savedTopScore = parseInt(localStorage.getItem('topScore'));
      if (currScore > savedTopScore) {
        localStorage.setItem('topScore', currScore.toString());
        setTopScore(currScore);
      }
    }

    const arrayPostMove = JSON.stringify(grid);
    const emptyCellsArr = getEmptyCells(grid);

    if (emptyCellsArr.length > 0 && arrayPreMove !== arrayPostMove) {
      setRandomNum(grid, emptyCellsArr);
    } else if (emptyCellsArr.length === 0) {
      const checkMove = canMove(grid);
      if (checkMove === false) {
        handleGameEnd();
      }
    }

    initialX = null;
    initialY = null;
    setGridChange(true);
    e.preventDefault();
  }

  return (
    <div className='game-container'>
      <div className='grid-display'>
        <div className='score grid-display-item'>Score: {score}</div>
        <div className='score grid-display-item'>Top Score: {topScore}</div>
        <div className='grid-display-item'>
          <button
            type='button'
            className='btn btn-secondary reset-button'
            onClick={resetGrid}
          >
            New Game
          </button>
        </div>
      </div>
      <div
        className='grid-container'
        tabIndex={0}
        onKeyDown={handleKey}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchEnd}
      >
        <GameEndModal highestScores={highestScores} />
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className='grid-row'>
            {row.map((cell, cellIdx) => (
              <div key={cellIdx} className='grid-cell'>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
