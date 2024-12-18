
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const User = require('./models/usermode.js');
const Signup=require('./models/Signupmodel.js')
const Photo = require('./models/Photomodel.js');
const Pdf = require('./models/Pdfmodel.js');
const fs = require("fs");



const multer  = require('multer')
const app = express();
const bodyParser = require("body-parser");



app.use(cors());
app.use(express.json()); 

app.use('/imguploads', express.static(path.join(__dirname, 'imguploads')));
app.use('/pdfuploads', express.static(path.join(__dirname, 'pdfuploads')));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect 

app.get('/', async (req, res) => {
  res.send(" hello from node api sandalu thushan ");
})

app.post('/adduser', async (req, res) => {
  try {
    
    const { name, email,password,address,age } = req.body;
    const newuser = new User({ name, email, password,age, address });
    const saveduser = await newuser.save();

    res.status(200).json(saveduser);
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/signup', async (req, res) => {
  try {
  
    const { name, email,password,confirmPassword } = req.body;

    const newuser = new Signup({ name, email, password,confirmPassword});
    const saveduser = await newuser.save();

    res.status(200).json(saveduser);
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signup.findOne({ email });s
    if (!user) {
      return res.json({ err: "User Not Found" });
    }
    if (user.password === password) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ status: "Incorrect Password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server Error" });
  }
});

// upload Images

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imguploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imguploads = multer({ storage });

// GET route to fetch all photos
app.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).json({ status: 200, data: photos });
  } catch (error) {
    console.error('Error fetching photos:', error.message);
    res.status(500).json({ status: 500, message: 'Internal server error' });
  }
});


app.post('/uploadphoto', imguploads.single('file'), async (req, res) => {
  try {
    const { title } = req.body;
    const filePath = `http://localhost:3001/uploads/${req.file.filename}`;

    const newPhoto = new Photo({ title, url: filePath ,image: filePath,});
    await newPhoto.save();

    res.status(200).json({ status: 200, message: 'Photo uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading photo:', error.message);
    res.status(500).json({ status: 500, message: 'Internal server error' });
  }
});


//Send PdfImage


 // Routes

// Multer configuration
const storages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'pdfuploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const pdfs  = multer({ 
  storages,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
});

// Routes
const pdfuploads = multer({ storages });

// Upload a PDF
app.post('/uploadpdf', pdfuploads.single('file'), async (req, res) => {
  try {
    const { title } = req.body;
    const url = `http://localhost:3001/uploads/${req.file.filename}`;

    const newPdf = new Pdf({ title, url });
    await newPdf.save();

    res.status(200).json({ status: 200, message: 'PDF uploaded successfully!', data: newPdf });
  } catch (error) {
    console.error('Error uploading PDF:', error.message);
    res.status(500).json({ status: 500, message: 'Error uploading PDF', error: error.message });
  }
});

// Get All PDFs
app.get('/pdfs', async (req, res) => {
  try {
    const pdfs = await Pdf.find();
    res.status(200).json({ status: 200, data: pdfs });
  } catch (error) {
    console.error('Error fetching PDFs:', error.message);
    res.status(500).json({ status: 500, message: 'Error fetching PDFs', error: error.message });
  }
});


app.get('/users', async (req, res) => {
  try {
      // Retrieve all products from the database
      const users = await User.find({}); // Find all products

      // Respond with the list of products
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
})

app.get('/edituser/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  try {
      const user = await User.findById(id); // Find the product by ID
      if (!user) {
          return res.status(404).json({ message: 'User not found' }); // Return 404 if not found
      }
      res.status(200).json(user); // Return the found product
  } catch (error) {
      res.status(500).json({ message: error.message }); // Handle any errors
  }
});

app.delete('/user/:id', async (req, res) => {
  const { id } = req.params; 
  try {
      const deleteduser = await User.findByIdAndDelete(id); 
      if (!deleteduser) {
          return res.status(404).json({ message: 'User not found' }); 
      }
      res.status(200).json({ message: 'User deleted successfully' }); 
  } catch (error) {
      res.status(500).json({ message: error.message }); 
  }
});

 

app.put('/edituser/:id', async (req, res) => {
  try {
      const { id } = req.params;

      const user = await User.findByIdAndUpdate(id, req.body);

      if (!user) {
          return res.status(404).json({ message: "user not found" });
      }

      const updateduser = await User.findById(id);
      res.status(200).json(updateduser);

  } catch (error) {
      res.status(500).json({ message: error.message }); // Handle any errors
  }
});


mongoose.connect('mongodb+srv://user1:Thush12213@cluster0.9qwykfs.mongodb.net/MERN2?retryWrites=true&w=majority&appName=Cluster0', {
  
}).then(() => {

      console.log("connected to the database sandalu 🚀🚀🚀🚀");

       app.listen(3001,()=>{
        console.log("server is running on port 3001");
    
    });
      
})
.catch((err) => {
    console.error("Database connection error:", err);
});


//create schema add new schema


