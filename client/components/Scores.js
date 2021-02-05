import React, { useState, useEffect } from 'react'
import { getHighestScores, addScore } from './Firebase-utils'

const Scores = () => {
  const [highestScores, setHighestScores] = useState([])

  useEffect(() => {
    async function fetchData() {
      const scores = await getHighestScores()
      setHighestScores(scores)
    }
    fetchData()
  }, [])

  return (
    <div className='top-scores'>
      {highestScores.map((scoreObj, index) => (
        <div key={index} className='score-item'>{`${index + 1}. ${
          scoreObj.name
        }: ${scoreObj.score}`}</div>
      ))}
    </div>
  )
}

export default Scores
