const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')


// create an express application
const app = express()

// init middleware
app.use(logger)

// body parser middleware - to handle raw json
app.use(express.json())

// to handle form submissio - so that we can handle url encoded data
app.use(express.urlencoded({extended: false}))

// use method use, when we want to include middleware
// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// members api Route
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { 
    console.log('Server started on port: ', PORT);
})