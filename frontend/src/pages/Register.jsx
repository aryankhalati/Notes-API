import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  
  const [error, setError] = useState('')

 
  const { register } = useAuth()

  
  const navigate =  useNavigate()

  
  const handleSubmit = async (e) => {
    e.preventDefault() // stops page reload

    try {

      await register (name, email, password)

      // redirect to home page
      navigate('/')
    } catch (err) {
      // show error message
      setError('Invalid name or email or password')
    }
  }

  return (
    <div>
      <h2>Register</h2>

      {/* show error if there is one */}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register