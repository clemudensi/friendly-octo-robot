import { Link } from 'react-router-dom'
import { useState } from 'react'
import TextInput from './TextInput'

const Login = ({onLoginRequest}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginRequest = (e) => {
    e.preventDefault()

    if (!username) {
      alert('Please input your username')
      return
    }
    else if (!password) {
      alert('Please input your password')
      return
    }

    onLoginRequest(username, password)
  }

  return (
    <form className='add-form' onSubmit={(e) => loginRequest(e)}>
    <TextInput 
      type={'text'} 
      placeholder={'username'} 
      value={username} 
      onChange={(e) => setUsername(e.target.value)}/>

    <TextInput 
      type={'password'} 
      placeholder={'password'} 
      value={password} 
      onChange={(e) => setPassword(e.target.value)}/>

    <input 
      type='submit' 
      value={'Login'} 
      className='btn btn-block'
       />
  </form>
  )
}

export default Login
