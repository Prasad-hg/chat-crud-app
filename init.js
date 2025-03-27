const mongoose = require('mongoose');
const chat = require('./models/chat.js');
main().then((res)=>{
    console.log('connection to db is successful');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats=[
    {
        from:'vivek',
        to:'vade',
        msg:'whats new bro',
        created_at:new Date()
    },
    {
        from:'diniesh',
        to:'vinesh',
        msg:'ohh wow ',
        created_at:new Date()
    },
    {
        from:'bimba',
        to:'simba',
        msg:'go and have it .',
        created_at:new Date()
    },
    {
        from:'suver',
        to:'sumitra',
        msg:'later on',
        created_at:new Date()
    }
]
chat.insertMany(allchats);