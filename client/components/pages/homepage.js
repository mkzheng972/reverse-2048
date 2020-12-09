import React from 'react'
import './pages.css'

const Homepage = () => {
  const grid = new Array(4).fill(0).map((el, index) => new Array(4).fill(index))
  return (
    <div className='homepage'>
      <div>This is the homepage</div>
      <div className='game-container'>
        <div className='grid-container'>
          {grid.map((row) => (
            <div className='grid-row'>
              {row.map((cell) => (
                <div className='grid-cell'>{cell}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage
