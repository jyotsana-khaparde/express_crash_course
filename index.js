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

// use method use to when we want to include middleware
// set static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { 
    console.log('Server started on port: ', PORT);
})