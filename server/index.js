
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/usermode.js');
const Signup=require('./models/Signupmodel.js')
const Pdf=require('./models/Pdfmodel.js')


const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express();


app.use(cors());
app.use(express.json()); 
app.use("/files",express.static("files"));


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
    const user = await Signup.findOne({ email });
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


// images uploader

app.post('/upload', upload.single('images'), async (req, res) => {
  try {
    res.status(200).json({ message: 'File uploaded successfully', filePath: `/files/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const storages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


 


//pdf uploaders

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save file with unique name
  }
});

// Set up multer with the configured storage


app.post("/uploadfile",upload.single('file'),async(req,res)=>{
  console.log(res.file);
  const title = res.body.title;
  const pdf =res.file.filename;
  try{
    await Pdf.create({title:title, pdf:pdf})
    console.log("pdf Uploaded Sucessfully")
    res.send({satus:200});
  }
  catch(err){
    console.log(err);
    res.status(500).send({status: "error"});
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
  const { id } = req.params; // Extract the ID from the request parameters
  try {
      const deleteduser = await User.findByIdAndDelete(id); // Find and delete the product by ID
      if (!deleteduser) {
          return res.status(404).json({ message: 'User not found' }); // Return 404 if product is not found
      }
      res.status(200).json({ message: 'User deleted successfully' }); // Return success message
  } catch (error) {
      res.status(500).json({ message: error.message }); // Handle any errors
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


