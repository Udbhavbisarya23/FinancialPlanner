import React, { useState } from 'react'

export default () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  return (
    <div className = ' mh6'>
      <div className='row row bg-light-green b pa5 ma0 tc br2-ns ba b--black-10'>
        <div className='six columns'>
          <label className = "ph3">Password:</label>
          <input
            className='u-full-width required'
            placeholder='Password'
            type='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
            autoFocus
          />
        </div>
      </div>
      <div className='row bg-light-green b pa5 ma0 tc br2-ns ba b--black-10'>
        <div className='six columns'>
          <label className = "ph3">Confirm password:</label>
          <input
            className='u-full-width'
            placeholder='Confirm Password'
            type='password'
            onChange={e => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
        </div>
      </div>
    </div>
  )
}