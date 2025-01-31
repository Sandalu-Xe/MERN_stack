import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import LoginForm from './components/Login'
import Usertable from './components/Usertable';
import NaviBar from './components/NaviBar';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import ContactUs from './components/ContactUs';
import SendPdf from './components/SendPdf';
import PhotoUpload from './components/Uploadphoto';
import WhatsAppSender from './components/WhatsappSender';
import AddToCart from './components/AddtoCart';
import ImageUploader from './components/ImageUpload';
import Map from './components/MapContainer';

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
            <Route path="/users" element={<Usertable />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/conatctus" element={<ContactUs />} />
            <Route path="//uploadpdf" element={<SendPdf />} />
            <Route path="/uploadphoto" element={<PhotoUpload />} />
            <Route path="/sendmessege" element={<WhatsAppSender />} />
            <Route path="/addtocard" element={< AddToCart/>} />
            <Route path="/imagesupload" element={<ImageUploader/>} />
            <Route path="/googlemap" element={<Map/>} />
          </Routes>
        </Container>
      </div>
    </Router>
    </>
  );
}

export default App


