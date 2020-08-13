const express = require('express')
const router = express.Router()
const members = require('../../members')


/**
 * GETs all members 
 * 1. science we use /api/members in app.use inside the index.js file so no need to
 * write (app.get('/api/members') & app.get('/api/members/:id))
 * instead we can use app.get('/') and app.get('/:id')
 * 2. previously we (use app.get) but when we use router we can us (router.get)
 */
router.get('/', (req, res) => {
    res.json(members)
})

// GETs single members
router.get('/:id', (req, res) => {
    const fount = members.some(member => member.id === parseInt(req.params.id))
    if (fount) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
       res.status(400).json({message: `No member with  the id of ${req.params.id}`}) 
    }
})

// Create member
router.post('/', (req, res) => {
    const newMember = {
        id: 4,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email) {
        res.status(400).json({message: 'Please include name and email'})
    } else {
        members.push(newMember)
        res.json(members)
    }
})

module.exports = router;