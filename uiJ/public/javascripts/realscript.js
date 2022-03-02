let sidebar = document.querySelector(".sidebar");
let project = document.querySelector(".project");
let todo = document.querySelector(".todo");
let calendar = document.querySelector(".calendar");
let closeBtn = document.querySelector("#btn");
let projectBtn = document.querySelector(".projectbtn");
let todoBtn = document.querySelector(".todobtn");
let calendarBtn = document.querySelector(".calendarbtn");

const socket = io("https://toastoolui.run.goorm.io", {transports :['websocket']});
socket.on("connect", function(socket){
     console.log("connected");
 });


projectBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
    if(project.classList.contains("close")){
        project.classList.toggle('close');
    }
    project.classList.toggle("open");
    if(todo.classList.contains("open")){
        todo.classList.toggle('open');
        todo.classList.toggle("close");
    }
    if(calendar.classList.contains("open")){
        calendar.classList.toggle('open');
        calendar.classList.toggle("close");
    }
    //menuBtnChange(); //calling the function(optional)
});

todoBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
    if(todo.classList.contains("close")){
        todo.classList.toggle('close');
    }
    todo.classList.toggle("open");
    if(project.classList.contains("open")){
        project.classList.toggle('open');
        project.classList.toggle("close");
    }
    if(calendar.classList.contains("open")){
        calendar.classList.toggle('open');
        calendar.classList.toggle("close");
    }
    //menuBtnChange(); //calling the function(optional)
});

calendarBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
    if(calendar.classList.contains("close")){
        calendar.classList.toggle('close');
    }
    calendar.classList.toggle("open");
    if(project.classList.contains("open")){
        project.classList.toggle('open');
        project.classList.toggle("close");
    }
    if(todo.classList.contains("open")){
        todo.classList.toggle('open');
        todo.classList.toggle("close");
    }
    //menuBtnChange(); //calling the function(optional)
});