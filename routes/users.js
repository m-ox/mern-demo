const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");

let User = require('../models/User');
const config = require('config');
const { json } = require('express');

// GET /
// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()

        res.json(users)
    } catch {
        console.error(err.message)
        res.status(500).send('Could not retrieve users')
        }
    }
)

// GET /:id
// get an individual user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ msg: 'This user cannot be found!'})
        }

        res.json(user)

    } catch(err) {
        console.error(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'This user cannot be found!'})
        }
        res.status(500).send('There was an error getting that user')
    }
})

// POST /users
// add a user
router.post('/',
    check('username', 'Username is required').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const newUser = new User({
                username: req.body.username
            })

            const user = await newUser.save()

            res.json(user)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Could not create new user')
        }  
})


// DELETE /:id
// delete an individual user

module.exports = router