const mongoose= require('mongoose');
const chatSchema = new mongoose.Schema({
    from:{
        type : String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    msg:{
        type : String,
        maxLength:30
    },
    created_at:{
        type:Date,
        required: true
    }

})

const chat = mongoose.model("chat",chatSchema);
module.exports = chat;