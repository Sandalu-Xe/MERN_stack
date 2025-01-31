
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const connectDB = require('../server/DB/connectedDB.js');
const dotenv = require('dotenv');
// const User = require('./models/usermode.js');
// const Signup=require('./models/Signupmodel.js')

const Photo = require('./models/Photomodel.js');
const Pdf = require('./models/Pdfmodel.js');   
const User = require('./models/user.model.js');   
 
const userscrud= require('./Routes/user.route.js');     


const fs = require("fs");

dotenv.config();
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

const PORT = process.env.PORT ||3001

app.get('/', async (req, res) => {
  res.send(" hello from node api sandalu thushan ");
})

app.use("/",userscrud);


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
// Configure multer for file uploads
const pdfstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'pdfuploads/'); // Directory where PDFs will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Add a timestamp to the filename
  },
});

const pdfuploads = multer({ storage:pdfstorage });
app.use(express.json());


// Upload a PDF
app.post('/uploadpdf', pdfuploads.single('file'), async (req, res) => {
  try {
    const { title } = req.body;
    const filePaths = `http://localhost:3001/uploads/${req.file.filename}`;

    const newPdf = new Pdf({ title, url: filePaths, });
    await newPdf.save();

    res.status(200).json({ status: 200, message: 'PDF uploaded successfully!', data: newPdf });
  } catch (error) {
    console.error('Error uploading PDF:', error.message);
    res.status(500).json({ status: 500, message: 'Error uploading PDF', error: error.message });
  }
});
app.use('/pdfuploads', express.static('pdfuploads')); // Serve PDFs
// Get All PDFs









//create schema add new schema
// mongoose.connect('mongodb+srv://user1:Thush12213@cluster0.9qwykfs.mongodb.net/MERN2?retryWrites=true&w=majority&appName=Cluster0')
// .then(()=>{
//     console.log("connected to the database sandalu 🚀🚀");

//     app.listen(3333,()=>{
//         console.log("server is running on port 3333");
    
//     });
// })


// .catch((err)=>{
//     console.log("connection is faild",err);
// });
app.listen(PORT,()=>{
  connectDB();
  console.log("server is running on port :",PORT);
});


