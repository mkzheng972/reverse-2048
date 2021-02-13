import React, { useState, useEffect } from 'react'
import { getHighestScores, addScore } from './Firebase-utils'
// import { getCollection } from './firebaseUtilsClient'

const Scores = () => {
  const [highestScores, setHighestScores] = useState([])

  useEffect(() => {
    async function fetchData() {
      const scores = await getHighestScores('scores')
      scores.sort((a, b) => b.score - a.score)
      setHighestScores(scores.slice(0, 10))
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
