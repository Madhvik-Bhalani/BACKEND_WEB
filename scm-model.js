const unival = require('mongoose-unique-validator')
const validator = require('validator')
const mongoose = require('mongoose')

const scm = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "user",
        minlength: 2,
        maxlength: 25
    },
    mno: {
        type: Number,
        required: true,
        unique: true,
        match: /^([1-9]){1}([0-9]){9}$/
    },
    mail: {
        type: String,
        unique: true,
        required: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('invalid email')
            }
        }

    },
    age: {
        type: Number,
        required: true
    },
    std: {
        type: Number,
        required: true
        
    },
    pass:{
        
        type: Number,
        required: true,
        unique:true
    },
    cpass:{
        
        type: Number,
        required: true,
        unique:true
    }

})

scm.plugin(unival) //plug in for scm

const model = new mongoose.model("database", scm)

module.exports = model