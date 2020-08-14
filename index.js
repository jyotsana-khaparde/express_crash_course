const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger')
const connection = require('./modal') // it creates the db connection to node project

// create an express application
const app = express()

// init middleware
app.use(logger)

// handlebars middleware - first thing you need to set the engine(not usng in this project)
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

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
// app.listen is use to listen for connection
app.listen(PORT, () => { 
    console.log('Server started on port: ', PORT);
})