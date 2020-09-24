const express=require('express');
const app=express();
//const http=require('http').createServer(app);

const path=require('path');
const mongoose=require('mongoose');

app.set('view engine','ejs');
app.use(express.static('public'));

const routing=require('./routes/index');
app.use(routing);
//connect to mongo 
const dbURL='mongodb://localhost:27017/articles';
mongoose.connect(dbURL, { useNewUrlParser: true , useUnifiedTopology: true}).then((result)=>{
    console.log('connected to DB');
const http=app.listen(3000);
const io=require('socket.io')(http);
require('./socket/socket.controller')(io);

}).catch((err)=>{
    console.log(err);
});

