import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Notes from './pages/Notes'
import NoteDetail from './pages/NoteDetail'
import RequireAuth from './components/RequireAuth'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Notes />
          </RequireAuth>
        }
      />
      <Route
        path="/notes/:id"
        element={
          <RequireAuth>
            <NoteDetail />
          </RequireAuth>
        }
      />
    </Routes>
  )
}

export default App