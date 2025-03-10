import mongoose from "mongoose";

const userScehma = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    phoneNo: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

export const userModel = mongoose.model('User', userScehma)