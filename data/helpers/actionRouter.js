const express = require('express');

const Actions = require('./actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        console.log("Actions retrieved!")
        res.status(200).json(action);
    })
    .catch(err => {
        console.log("Failed to retrieve actions!")
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {})

module.exports = router;