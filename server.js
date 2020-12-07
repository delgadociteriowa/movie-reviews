const express = require('express'); // node.js built-in to load modules
const connectDB = require('./config/db');

const app = express(); // using express as a library

// Connect Database
connectDB();

// Init Moddleware
app.use(express.json({ extended: false}));

// Do something when / is hit
app.get('/', (req,res) => {
  res.json({ msg: 'Welcome to the Movie Reviews api'})
});

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reviews', require('./routes/reviews'));

// listen to the port

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

