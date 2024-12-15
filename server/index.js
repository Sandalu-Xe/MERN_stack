
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const User = require('./models/usermode.js');
const Signup=require('./models/Signupmodel.js')
const Pdfmodel = require('./models/Pdfmodel.js');
const Photo = require('./models/Photomodel.js');



const multer  = require('multer')
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");


app.use(cors());
app.use(express.json()); 
app.use(express.static("uploads")); 
app.use('/imguploads', express.static(path.join(__dirname, 'imguploads')));

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

const uploads = multer({ storage });

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


app.post('/uploadphoto', uploads.single('file'), async (req, res) => {
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

// Directory for uploads
const pdfs = [];

const storages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({
  storages,
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf/; // Accept only PDFs
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"));
    }
  },
});

// Fetch all uploaded PDFs
app.get("/sendfile", (req, res) => {
  res.json({ data: pdfs });
});

// Upload a new PDF
app.post("/uploadfile", upload.single("file"), (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Save metadata
    pdfs.push({
      title,
      filePath: `http://localhost:${PORT}/${req.file.filename}`,
    });

    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
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


