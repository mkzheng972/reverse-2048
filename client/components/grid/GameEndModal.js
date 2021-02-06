import React, { useState, useEffect } from 'react'
import './Grid.css'
// import { addScore } from '../Firebase-utils'
import { addDocument } from '../firebaseUtilsClient'

/*

End Game Modal only needs to add current score to score list

*/

const GameEndModal = ({ currScore }) => {
  const [name, setName] = useState('')

  function handleSubmit() {
    addDocument('scores', { name: name, score: currScore })
  }

  return (
    <div
      className='modal fade'
      id='endModalCenter'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='exampleModalCenterTitle'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div style={{ textAlign: 'center', fontSize: '24px' }}>
              Game ends
            </div>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <form className='modal-body nameInput'>
            <input
              id='name'
              type='text'
              placeholder='enter name'
              onChange={(event) => setName(event.target.value)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '150px',
              }}
            ></input>
            <button
              type='submit'
              className='btn btn-secondary reset-button'
              style={{ marginLeft: '20px' }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
          <div
            className='modal-body'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Body
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-dismiss='modal'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameEndModal
