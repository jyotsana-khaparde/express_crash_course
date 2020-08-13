const express = require('express')
const path = require('path')
const members = require('./members')
const logger = require('./middleware/logger')

// create an express application
const app = express()

// init middleware
app.use(logger)

// GETs all members
app.get('/api/members', (req, res) => {
    res.json(members)
})

// GETs single members
app.get('/api/members/:id', (req, res) => {
    const fount = members.some(member => member.id === parseInt(req.params.id))
    if (fount) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
       res.status(400).json({message: `No member with  the id of ${req.params.id}`}) 
    }
})

// use method use to when we want to include middleware
// set static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { 
    console.log('Server started on port: ', PORT);
})