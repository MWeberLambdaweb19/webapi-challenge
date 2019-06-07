const express = require('express');

const Actions = require('./actionModel');

const router = express.Router();

// CREATE
router.post('/', (req, res) => {
    const {project_id} = req.body
    const {description} = req.body
    const {notes} = req.body
    if (!project_id) {
        res.status(422).json({message: "Missing fields: project_id."})
    }
    if (!description) {
        res.status(422).json({message: "Missing fields: description."})
    }
    if (!notes) {
        res.status(422).json({message: "Missing fields: notes."})
    }
    const body = req.body
    Actions.insert(body)
    .then(body => {
        res.status(201).json(body)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})



// READ
router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Actions.get(id)
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
    const {project_id} = req.body
    const {description} = req.body
    const {notes} = req.body
    if (!project_id) {
        res.status(422).json({message: "Missing updated fields: project_id."})
    }
    if (!description) {
        res.status(422).json({message: "Missing updated fields: description."})
    }
    if (!notes) {
        res.status(422).json({message: "Missing updated fields: notes."})
    }
    const changes = req.body
    Actions.update(id, changes)
    .then(updated => {
        if (updated) {
            res.status(200).json({success: true, updated})
        } else {
            res.status(404).json({message: "The action could not be updated as it does not exist."})
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
    Actions.remove(id)
    .then(removed => {
        if(removed) {
            res.status(204).json()
        } else {
            res.status(404).json({
                success: false,
                message: "The action with the specified ID does not exist"
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