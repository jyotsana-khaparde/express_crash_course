const mongooes = require('mongoose')

let memberSchema = new mongooes.Schema({
    id: {
        type: String,
        required: 'Required'
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: String
    }
})

mongooes.model("members", memberSchema)

let schoolSchema = new mongooes.Schema({
    schoolName: {
        type: String
    },
    className: {
        type: String
    },
})

mongooes.model("school", schoolSchema)