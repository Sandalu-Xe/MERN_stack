import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import SignupForm from './components/Signup'
import LoginForm from './components/Login'
import Usertable from './components/Usertable';
import NaviBar from './components/NaviBar';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import ContactUs from './components/ContactUs';
import SendPdf from './components/SendPdf';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <NaviBar />
      <div>
        <Container>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/users" element={<Usertable />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/conatctus" element={<ContactUs />} />
            <Route path="/sendpdf" element={<SendPdf />} />
          </Routes>
        </Container>
      </div>
    </Router>
    </>
  );
}

export default App
