require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const routes = require('./routes/routes')

app.use(bodyParser.json());



const rootUrl = '/api/v1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    })

//PORT 
const PORT = process.env.PORT || 3000


app.get('/api/status', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api/v1', routes)



// Listen to the specified port, otherwise 3080
const server = app.listen(PORT, () => {
    console.log(`Server Running: http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server Close: Process Terminated!');
    });
});