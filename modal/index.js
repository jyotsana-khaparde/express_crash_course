const mongooes = require('mongoose')
mongooes.connect('mongodb://localhost:27017/sample',{ useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        console.log("Error connecting to database");
    } else {
        console.log("Success connected to database");
    }
});

const members = require('./member.modal')