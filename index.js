const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override')
app.set('views',path.join(__dirname,"views"));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const chat = require('./models/chat.js');

main().then((res)=>{
    console.log('connection to db is successful');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
// INDEX ROUTE
app.get('/chats', async (req,res)=>{
    let chats =  await chat.find();
    // console.log(chats);
    res.render('index.ejs',{chats})
})

// NEW ROUTE
app.get('/chats/new',(req,res)=>{
    res.render('new.ejs')
});

// CREATE ROUTE
app.post('/chats',(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat = new chat({
        from: from,
        to: to,
        msg: msg,
        created_at:new Date()
       
    })
    newChat.save().then((res)=>{
        console.log("chat was saved")
    }).catch((err)=>{
        console.log(err)
    })
    res.redirect('/chats')
})
// EDIT ROUTE
app.get('/chat/:id/edit', async (req,res)=>{
    let {id} =req.params;
    let Chat = await chat.findById(id);
    res.render('edit.ejs',{Chat});
})
// UPDATE ROUTE
app.put('/chats/:id',async (req,res)=>{
    let {id} = req.params;
    let {msg:newMsg}= req.body;
    let updatedChat =await chat.findByIdAndUpdate(id,
        
        {msg:newMsg},
        {runValidators: true,new:true}

    );
    console.log(updatedChat);
    res.redirect('/chats');
})
// DESTROY ROUTE
app.delete('/chats/:id',async (req,res)=>{
    let {id}= req.params;
    let deletedchat = await chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect('/chats');
})
app.get('/',(req,res)=>{
    res.send("root is working");
});

app.listen(8080,()=>{
    console.log('server is listening on port 8080')
});

// let chat1=new chat({
//     from:'shashank patel',
//     to:'samhitha patel',
//     msg:'i miss you',
//     created_at:new Date()
// })

// chat1.save().then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })

