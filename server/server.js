const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const mongoose = require('mongoose');
require('dotenv').config();
const UserModel = require('./models/Users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;



const app = express();
const PORT = 5002;

let temperature = 0;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Replace with your new MongoDB URI
const uri = "mongodb+srv://yerzhan:JaCPBssipYZwQWlK@maxcomfort.it4qn.mongodb.net/maxComfort?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));



const userSchema = new mongoose.Schema({
      name: String,
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    });
const User = mongoose.model('User', userSchema);

// Define Schemas and Models
const buildingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    temperatureLimit: { type: Number }
});

const roomSchema = new mongoose.Schema({
    buildingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
    name: { type: String, required: true },
    description: { type: String },
});

const Building = mongoose.model('buildings', buildingSchema);
const Room = mongoose.model('rooms', roomSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});


// Registration Route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password before saving the user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      user = new User({
        name,
        email,
        password: hashedPassword
      });
  
      await user.save();
  
      // Return the user's details after registration
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Authenticate user...
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare passwords and return a token if successful
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});


app.post('/createUser', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(error => res.json(error))
})

app.post('/setTemp', (req, res) => {
    const temp = req.body.temp;
    if (typeof temp === 'number') {
        temperature = temp;
        res.json({ temp: temperature });
    } else {
        res.status(400).json({ error: 'Invalid temperature value' });
    }
});


app.get('/getTemp', (req, res) => {
    res.json({ temp: temperature });
});
// Fetch buildings
// Fetch a single building by ID
app.get('/buildings', (req, res) => {
  // Your logic to fetch buildings from MongoDB
  Building.find({}, (err, buildings) => {
    if (err) return res.status(500).send("Error fetching buildings");
    res.json(buildings);
  });
});



app.get('/buildings/:buildingId', async (req, res) => {
    try {
      const { buildingId } = req.params;
  
      // Validate the buildingId format
      if (!mongoose.Types.ObjectId.isValid(buildingId)) {
        return res.status(400).json({ error: 'Invalid building ID format' });
      }
  
      // Query the database to find the building by its ID
      const building = await Building.findById(buildingId); // Updated from BuildingModel to Building
      if (!building) {
        return res.status(404).json({ error: 'Building not found' });
      }
  
      res.json(building);
    } catch (error) {
      console.error("Error fetching building:", error);
      res.status(500).json({ error: 'Failed to fetch building' });
    }
  });
  

// Add new building
app.post('/buildings', async (req, res) => {
    try {
        const newBuilding = new Building(req.body);
        const savedBuilding = await newBuilding.save();
        res.json(savedBuilding);
    } catch (error) {
        console.error('Error creating building:', error);
        res.status(500).json({ error: 'Failed to create building' });
    }
});

// Delete a building by ID
app.delete('/buildings/:buildingId', async (req, res) => {
  try {
    const { buildingId } = req.params;

    // Validate the buildingId format
    if (!mongoose.Types.ObjectId.isValid(buildingId)) {
      return res.status(400).json({ error: 'Invalid building ID format' });
    }

    // Attempt to delete the building
    const deletedBuilding = await Building.findByIdAndDelete(buildingId);

    if (!deletedBuilding) {
      return res.status(404).json({ error: 'Building not found' });
    }

    res.json({ message: 'Building deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while deleting building' });
  }
});




// Fetch rooms by building ID
app.get('/rooms/:buildingId', async (req, res) => {
    try {
        const rooms = await Room.find({ buildingId: req.params.buildingId });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
});

// Add new room
app.post('/rooms', basicAuth, async (req, res) => {
    try {
        const newRoom = new Room(req.body);
        await newRoom.save();
        res.json(newRoom);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create room' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
