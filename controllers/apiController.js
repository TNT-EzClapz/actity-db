const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://mongodb+srv://philip:free@public.nsauw4d.mongodb.net/ActivityDB?retryWrites=true&w=majority");
connect.then(()=>{
    console.log("ActivityDB connected successfully");
})
.catch(()=>{
    console.log("ActivityDB cannot be connected");
});

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users", LoginSchema)

module.exports = collection;