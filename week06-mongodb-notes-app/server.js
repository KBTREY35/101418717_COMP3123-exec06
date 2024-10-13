const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://rossjaden44:Lolman1234*@clusterexer6.sdwz4.mongodb.net/notesdb?retryWrites=true&w=majority&appName=Clusterexer6";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connect to the MongoDB Atlas Database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the MongoDB Atlas Server.");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Default route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

// Import routes
const noteRoutes = require('./routes/NoteRoutes');
app.use(noteRoutes);

// Start the server
app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
