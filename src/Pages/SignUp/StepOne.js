import React, { useState } from 'react'

export default () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  return (
    <div className = "mh6">
      <div className='row bg-light-green b pa5 ma0 tc br2-ns ba b--black-10 '>
        <div className='six columns '>
          <label className = "ph4">First Name:</label>
          <input
            className='u-full-width'
            placeholder='First Name'
            type='text'
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
            autoFocus
          />
        </div>
      </div>
      <div className='row bg-light-green b pa5 ma0 tc br2-ns ba b--black-10'>
        <div className='six columns '>
          <label className = "ph4">Last Name:</label>
          <input
            className='u-full-width'
            placeholder='Last Name'
            type='text'
            onChange={e => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
      </div>
    </div>
  )
}
