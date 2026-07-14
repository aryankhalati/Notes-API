import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  // 1. Two pieces of state: email and password
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 2. State for showing an error message
  const [error, setError] = useState('')

  // 3. Get the login function from context
  const { login } = useAuth()

  // 4. Get the navigate function to redirect after login
  const navigate =  useNavigate()

  // 5. Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault() // stops page reload

    try {
      // call login with email and password
      await login (email, password)

      // redirect to home page
      navigate('/')
    } catch (err) {
      // show error message
      setError('Invalid email or password')
    }
  }

  return (
    <div>
      <h2>Login</h2>

      {/* show error if there is one */}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login