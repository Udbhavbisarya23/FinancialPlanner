import React, { useState } from 'react'

export default () => {
  const [checked, setChecked] = useState('')

  return (
    <div className = 'mh6'>
      <div className='row row bg-light-green b pa5 ma0 tc br2-ns ba b--black-10'>
        <div className='ten columns terms'>
          <span>By clicking "Accept" I agree that:</span>
          <ul className='docs-terms'>
            <li>
              I have read and accepted the <a href='#'>User Agreement</a>
            </li>
            <li>
              I have read and accepted the <a href='#'>Privacy Policy</a>
            </li>
            <li>I am at least 18 years old
            </li>
          </ul>
          <label>
            <input
              type='checkbox'
              //   defaultChecked={this.state.checked}
              checked={checked}
              onChange={e => setChecked(e.target.value)}
              autoFocus
            />
            <span> Accept </span>{' '}
          </label>
        </div>
      </div>
    </div>
  )
}