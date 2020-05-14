import React, { useState } from 'react'

const StepTwo =  () => {
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')

  return (
    <div className = 'mh6'>
      <div className='row bg-light-green b pa5 ma0 tc br2-ns ba b--black-10'>
        <div className='six columns'>
          <label className = "ph4">Your email:   </label>
          <input
            className='u-full-width required'
            placeholder='test@mailbox.com'
            type='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
            autoFocus
          />
        </div>
      </div>
      <div className='row bg-light-green b pa5 ma0 tc br2-ns ba b--black-10'>
        <div className='six columns'>
          <label className = "ph4">Confirm email:</label>
          <input
            className='u-full-width'
            placeholder='Confirm email'
            type='email'
            onChange={e => setEmailConfirm(e.target.value)}
            value={emailConfirm}
          />
        </div>
      </div>
    </div>
  )
}
export default StepTwo;