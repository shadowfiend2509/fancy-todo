// $(window).load(function() {
//     // Animate loader off screen
//     $(".se-pre-con").fadeOut("slow");;
// });

//==============================================================================================================
var baseUrl = 'http://localhost:3000'
var globalToken = localStorage.getItem('token');
//==============================================================================================================
if(globalToken === null){
    $('#signout').hide();
    // $('#container').show()
}
$('#main-container').hide();
$('#main-container').hide();
$('#register').hide();
$('#signout').show();
// $('#signout').hide()
//==============================================================================================================
//GOOGLE OAuth 2  

////// function looping todo
function checkTodo(id){
    let getid = id;
    $.ajax({
        method : 'put',
        url : 'http://localhost:3000/todos',
        data : {
            todoId : getid
        }
    })
        .done(function(success){
            persentase=0;
            $('.progress').append(`
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${persentase}%">${persentase}%</div>    
            `)
            $(`#todo-message${getid}`).append(`${success.msg}`)
            $(`#${id}`).hide();
        })
        .fail(console.log)
}

var persentanse = 0;
var truee
function showTodo(data){
    $('#inputTodo').empty();
    $('.progress-bar').empty();
    let falsee = 0;
    let status ='';
    let classs = '';
    for(let i=0;i<data.todoList.length;i++){
        if(data.todoList[i].status == false){
            classs='blue';
            status='To Do';
            falsee++;
        }else if(data.todoList[i].status == true){
            classs ='redd'
            status='Done';
            truee++;
        }
        $('#inputTodo').append(`
            <div class="card border-success mb-5" style="max-width: 18rem; text-align:center">
                <div class="card-header bg-transparent border-success ${classs}"  style='font-size: 40px;'>${status}</div>
                <div class="card-body text-success" id='addButton${data.todoList[i].todoId}'>
                <h5 class="card-title" style='font-size:35px;'>${data.todoList[i].title}</h5>
                <p class='card-text' style='font-size:25px;'>${data.todoList[i].description}</p>
                <p class="card-text">${data.todoList[i].createdAt}</p>
                <p id='todo-message${data.todoList[i].todoId}' style='color:gold'></p>
                </div>
                <div class="card-footer bg-transparent border-success">${data.todoList[i].due_date}</div>
            </div>
        `)
        if(data.todoList[i].status==true){
            $(`#addButton${data.todoList[i].todoId}`).append(`
            <button type="button" class="btn btn-danger"><a id='${data.todoList[i].todId}' onclick='deleteTodo("${data.todoList[i].todoId}")'>Delete Todo</button>
            `)
        }else if(data.todoList[i].status==false){
            $(`#addButton${data.todoList[i].todoId}`).append(`
                <button type="button" class="btn btn-success" ><a id='${data.todoList[i].todoId}' onclick='checkTodo("${data.todoList[i].todoId}")'>checkList</a></button>
            `)
        }
    }
    // console.log(`diatasss proses persentase => ${persentase}`)
    persentase = 0;
    persentase = Math.round((falsee/data.todoList.length) * 100);
    $('.progress').append(`
    <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${100-persentase}%">${100-persentase}%</div>  
    <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${persentase}%">${persentase}%</div>  

    `)

    console.log(`setelah masuk kedalam persentase => ${persentase}`)
}


///

function login(data) {
    $('#row1').empty();
    $('#row2').empty();
    const {serverToken, photo, name} = data
    localStorage.setItem('token', serverToken);
    $('#row1').append(
        `
    <img src="${photo}" class='img-profile' style="height:240px; margin: 6px 25px;width:200px;">
    <button><a class='bg-secondary' id='dontClick' onclick='whyClick()'>Dont Click</a></button>
    `
    )
    $('#row2').append(
        `
    <marquee scrollamount="15" direction="left" style='font-size: 50px; font-family:'cursive'>Welcome ${name}</marquee>
    `
    )
    $('#container').hide();
    $('#main-container').show();
    $('#signout').show();
}
function whyClick(){
    $('#row1').empty();
    $.ajax({
        method : 'get',
        url : 'http://localhost:3000/animals'
    })
        .done(function(animal){
            $('#row1').empty;
            $('#row1').append(`
                <img src="${animal.message}" style="height:240px; margin: 6px 25px;width:200px;">
                <a class='bg-secondary' >eh masih di click</a>
            `)
        })
}
//masih ngerror
// function uploadPhoto(photo){
//     let getpicture = $('#customFile').val();
//     $.ajax({
//         method : 'put',
//         url : 'http://localhost:3000/todos/upload',
//         data : {
//             photo : photo,
//             newPhoto : getpicture
//         }
//     })
//         .done(function(){

//         })
//         .fail(console.log)
// }
function onSignIn(googleUser) {
    const id_token = googleUser
        .getAuthResponse()
        .id_token;
    $
        .ajax({
            method: 'post',
            url: `${baseUrl}/users/signinG`,
            data: {
                id_token: id_token
            }
        })
        .done(function (data) {
            $('.progress').empty()
            persentase = 0
            login(data)
            if (data.todoList !== undefined) {
                showTodo(data)
            } else {
                $('#inputTodo').empty();
                $('#inputTodo').append(`
                `)
            }
        })
        .fail(console.log);
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token');
        $('#register').hide();
        $('#main-container').hide();
        $('#container').show();
        persentase = 0;
        console.log(`user signout persentase nya => ${persentase}`)
        $('.progress-bar').empty();
        $('##addFile h5').empty();
        console.log('User signed out.');
    });
}
//==============================================================================================================
//lempar-lempar
function scriptRegister(){
    $('#container').hide();
    $('#main-container').hide();
    $('#register').show();
}
function scriptSignin(){
    $('#main-container').hide();
    $('#register').hide();
    $('#container').show();
}

//==============================================================================================================
//create register

function createRegister(){
    $('#text-errorregister').empty()
    let username = $('#text-username').val();
    let password = $('#text-password').val();
    let confirm = $('#text-confirm').val();
    let email = $('#text-email').val();
    if(password !== confirm){
        $('#text-errorregister').append(`<span class="badge badge-pill badge-danger">Pastikan pass dan confirm sama</span>`)
        $('#text-username').val('');
        $('#text-password').val('');
        $('#text-confirm').val('');
        $('#text-email').val('');
    }else{
        $.ajax({
            method : 'post',
            url : `${baseUrl}/users/signup`,
            data : {
                username,
                password,
                email
            }
        })
            .done(function(success){
                empty();
                scriptSignin();
                $('#text-errorlogin').append(`Success Register`)
            })
            .fail(function(err){
                $('#text-errorregister').append(`
                    <span class="badge badge-pill badge-danger">${err.responseJSON.msg}</span>
                    
                `)
            })
    }
}

//==============================================================================================================
//login


function signIn(){
    $('#text-errorlogin').empty();
    let username = $('#text-usernamel').val();
    let password = $('#text-passwordl').val();
    $.ajax({
        method : 'post',
        url : `${baseUrl}/users/signin`,
        data : {
            username,
            password,
            globalToken
        }
    })
        .done(function(data){
            $('.progress').empty()
            persentase = 0
            let serverToken = data.getToken;
            let name = data.username;
            let photo = '../picture/blue-profile-1-e1538567682109.png';
            let todoList = data.todoList;
            login({
                serverToken,
                photo,
                name
            })
            showTodo(data)
            empty()
        })
        .fail(function(err){
            $('#text-errorlogin').append(`${err.responseJSON.msg}`)
            empty();
        })
}



//picture

let temp = [
    "https://cdn.pixabay.com/photo/2015/11/14/20/27/luxury-sports-car-1043627__480.jpg",
    "https://cdn.pixabay.com/photo/2013/08/28/11/19/lamborghini-176700__480.jpg",
    "https://cdn.pixabay.com/photo/2015/01/31/10/06/lamborghini-618337__480.jpg",
    "https://cdn.pixabay.com/photo/2018/01/13/17/30/lamborghini-huracan-3080405__480.jpg",
    "https://cdn.pixabay.com/photo/2014/09/07/22/33/lamborghini-438462__480.jpg",
    "https://cdn.pixabay.com/photo/2017/12/04/00/17/lamborghini-huracan-2996107__480.jpg",
    "https://images.unsplash.com/photo-1558979074-128fb894743a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1507482757963-ef4548a0198d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
]


temp.forEach(el=>{
    $('.carousel-inner').append(`
    <div class="carousel-item">
    <img src="${el}" class="d-block w-100" alt="...">
    </div>
    `)
})