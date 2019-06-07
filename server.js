// importing modules that will help my app run
const express = require('express');

// importing files that will route my api
const actionRouter = require('./data/helpers/actionRouter');
const projectRouter = require('./data/helpers/projectRouter');

// creating server and connecting it to modules
const server = express();

// connecting server to use parts of modules
server.use(express.json());

// connecting server to imported files
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

// setting basic endpoint
server.get('/', (req, res) => {
    res.send(`
        <h1>Push forever onwards!</h1>
        <h3>Grab the vvvvVictory you desire!</h3>
    `)
})

// exporting server to index
module.exports = server;