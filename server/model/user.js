import mongoose from "mongoose"
//creating schema for user object
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
const user = mongoose.model("user", userSchema)
export default user;