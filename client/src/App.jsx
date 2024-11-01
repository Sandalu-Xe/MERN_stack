import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import SignupForm from './components/Signup'
import LoginForm from './components/Login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <div>
        <Container>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignupForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
    </>
  );
}

export default App
