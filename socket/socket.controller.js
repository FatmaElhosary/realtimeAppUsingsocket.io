
const articlesModel=require('../models/articles.model');



function socketController(io){

    //add new article
    io.on('connection',(socket)=>{

        socket.on('message',async(message)=>{

            await articlesModel.insertMany({title:message.title,desc:message.desc});
            const allArticles=await articlesModel.find();
            io.emit('replay',allArticles);
            console.log(message);
        });

//load screen first time then get all articles from DB
socket.on('load',async()=>{
    const allArticles=await articlesModel.find();
    io.emit('replay',allArticles);
});

//delete article
socket.on('articleId',async _id=>{
await articlesModel.deleteOne({_id});
const allArticles=await articlesModel.find();
    io.emit('replay',allArticles);
});

//send  article which will be edit
socket.on('article_to_edit',async (_id)=>{

    const aricle=await articlesModel.findById({_id});
    io.emit('article',aricle)
})
//edit article by get new data as its input 
socket.on('editArticle',async newArticle=>{
await articlesModel.findByIdAndUpdate(newArticle._id,{title:newArticle.title,desc:newArticle.desc});

const allArticles=await articlesModel.find();
    io.emit('replay',allArticles);


});

//search article
socket.on('search',async(value)=>{
const articles=await articlesModel.find({title:{$regex :value,$options:'i'}})
io.emit('replay',articles);

});

    });
}

module.exports=socketController;