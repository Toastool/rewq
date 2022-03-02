const todoObjectList2 = [];

$(".menu1").click(function(){
    $(this).addClass('on');
    $(".menu2").removeClass("on");
})

$(".menu2").click(function(){
    $(this).addClass('on');
    $(".menu1").removeClass("on");
})

class Todo_Class2 {
    constructor(item){
        this.ulElement2 =item;
    }

    add() {
        const todoInput2 = document.querySelector("#myInput2").value;
        if (todoInput2 == "") {
            alert("You did not enter any item!") 
        } else {
            const todoObject2 = {
                id2 : todoObjectList2.length,
                todoText2 : todoInput2,
                isDone2 : false,
            }

        todoObjectList2.unshift(todoObject2);
        this.display();
        document.querySelector("#myInput2").value = '';

        }
    }

    done_undone(x) {
        const selectedTodoIndex2 = todoObjectList2.findIndex((item)=> item.id2 == x);
        console.log(todoObjectList2[selectedTodoIndex2].isDone2);
        todoObjectList2[selectedTodoIndex2].isDone2 == false ? todoObjectList2[selectedTodoIndex2].isDone2 = true : todoObjectList2[selectedTodoIndex2].isDone2 = false;
        this.display();
    }

    deleteElement(z) {
        const selectedDelIndex2 = todoObjectList2.findIndex((item)=> item.id2 == z);

        todoObjectList2.splice(selectedDelIndex2,1);

        this.display();
    }


    display() {
        this.ulElement2.innerHTML = "";

        todoObjectList2.forEach((object_item2) => {

            const liElement2 = document.createElement("li");
            const delBtn2 = document.createElement("i");

            liElement2.innerText = object_item2.todoText2;
            liElement2.setAttribute("data-id2", object_item2.id2);

            delBtn2.setAttribute("data-id2", object_item2.id2);
            delBtn2.classList.add("far", "fa-trash-alt");

            liElement2.appendChild(delBtn2);
            
            delBtn2.addEventListener("click", function(e) {
                const deleteId2 = e.target.getAttribute("data-id2");
                myTodoList2.deleteElement(deleteId2);
            })
            
            liElement2.addEventListener("click", function(e) {
                const selectedId2 = e.target.getAttribute("data-id2");
                myTodoList2.done_undone(selectedId2);
            })

            if (object_item2.isDone2) {
                liElement2.classList.add("checked");
            }

            this.ulElement2.appendChild(liElement2);
        })
    }
}


// personal todo add
const listSection2 = document.querySelector("#myUL2");

myTodoList2 = new Todo_Class2(listSection2);


document.querySelector(".addBtn2").addEventListener("click", function() {
    myTodoList2.add()
})

document.querySelector("#myInput2").addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
        myTodoList2.add()
    }
})