const express = require('express');

const Projects = require('./projectModel');

const router = express.Router();

// CREATE
router.post('/', (req, res) => {
    const {name} = req.body
    const {description} = req.body
    if (!description) {
        res.status(422).json({message: "Missing fields: description."})
    }
    if (!name) {
        res.status(422).json({message: "Missing fields: name."})
    }
    const body = req.body
    Projects.insert(body)
    .then(body => {
        res.status(201).json(body)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})



// READ
router.get('/', (req, res) => {
    Projects.get()
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Projects.get(id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id/actions', (req, res) => {
    const {id} = req.params;
    Projects.getProjectActions(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

// UPDATE
router.put('/:id', (req, res) => {
    const {id} = req.params
    const {description} = req.body
    const {name} = req.body
    if (!description) {
        res.status(422).json({message: "Missing updated fields: description."})
    }
    if (!name) {
        res.status(422).json({message: "Missing updated fields: name."})
    }
    const changes = req.body
    Projects.update(id, changes)
    .then(updated => {
        if (updated) {
            res.status(200).json({success: true, updated})
        } else {
            res.status(404).json({message: "The project could not be updated as it does not exist."})
        }
    })
    .catch(err => {
        console.log(changes, id)
        res.status(500).json(err)
    })
})

// DELETE

router.delete('/:id', (req, res) => {
    const {id} = req.params
    Projects.remove(id)
    .then(removed => {
        if(removed) {
            res.status(204).json()
        } else {
            res.status(404).json({
                success: false,
                message: "The project with the specified ID does not exist"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            err
        })
    })
})



module.exports = router;