import React from 'react'
import { useHistory } from 'react-router-dom'

function Login(props) {
  const history = useHistory()
  function handleGoHome() {
    history.push('/about')
  }
  return (
    <div className='login'>
      <div>login page</div>
      <button onClick={handleGoHome}>登录</button>
    </div>
  )
}

export default Login
