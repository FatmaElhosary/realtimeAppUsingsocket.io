let socket=io();

socket.on('connect',()=>{
    socket.emit('load');
})


socket.on('replay',(data)=>{
//console.log(data);
displayData(data);   
});


function sendData(){
 const title= document.getElementById('title').value;
const desc=document.getElementById('desc').value;
const article={
    title,
    desc
}

    socket.emit('message', article);
}
function displayData(data){

 let htmlCode=``;   
for (let index = 0; index < data.length; index++) {
    htmlCode+=`
    <div class="col-md-4 my-3">
    <button class="btn btn-danger" onclick="deleteArticle('${data[index]._id}')">Delete</button>
    <button class="btn btn-info" onclick="showEditModal('${data[index]._id}')">Edit</button>
    <div class="card bg-info text-center text-white">
        <h2>${data[index].title}</h2>
        <p>${data[index].desc}</p>
    </div>
</div>
    `
    
}
document.getElementById('row').innerHTML=htmlCode;
}

let articleId=null;
function deleteArticle(_id){
    socket.emit('articleId',_id);
}
function showEditModal(_id){
socket.emit('article_to_edit',_id);
articleId=_id;
}

socket.on('article',article=>{
    document.getElementById('edit_title').value=article.title;
    document.getElementById('edit_desc').value=article.desc;
    $('#exampleModal').modal('show');
    console.log(article);
});

function updateArticle(){
 const title=   document.getElementById('edit_title').value;
 const desc=   document.getElementById('edit_desc').value;
socket.emit('editArticle',{_id:articleId,title,desc});
    $('#exampleModal').modal('hide');

}

function searchArticle(e){
    console.log(e.value);
socket.emit('search',e.value);
}