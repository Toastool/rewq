

const todoObjectList1 = [];

$(".menu1").click(function () {
    $(this).addClass('on');
    $(".menu2").removeClass("on");
})

$(".menu2").click(function () {
    $(this).addClass('on');
    $(".menu1").removeClass("on");
})

// project todo
class Todo_Class1 {
    constructor(item) {
        this.ulElement1 = item;
    }

    add() {
        const todoInput1 = document.querySelector("#myInput1").value;
        if (todoInput1 == "") {
            alert("You did not enter any item!")
        } else {
            const todoObject1 = {
                id1: todoObjectList1.length,
                todoText1: todoInput1,
                isDone1: false,
            }

            todoObjectList1.unshift(todoObject1);
            this.display();
            document.querySelector("#myInput1").value = '';

        }
    }

    done_undone(x) {
        const selectedTodoIndex1 = todoObjectList1.findIndex((item) => item.id1 == x);
        console.log(todoObjectList1[selectedTodoIndex1].isDone1);
        todoObjectList1[selectedTodoIndex1].isDone1 == false ? todoObjectList1[selectedTodoIndex1].isDone1 = true : todoObjectList1[selectedTodoIndex1].isDone1 = false;
        this.display();
    }

    deleteElement(z) {
        const selectedDelIndex1 = todoObjectList1.findIndex((item) => item.id1 == z);

        todoObjectList1.splice(selectedDelIndex1, 1);

        this.display();
    }


    display() {
        this.ulElement1.innerHTML = "";

        todoObjectList1.forEach((object_item1) => {

            const liElement1 = document.createElement("li");
            const delBtn1 = document.createElement("i");

            liElement1.innerText = object_item1.todoText1;
            liElement1.setAttribute("data-id1", object_item1.id1);

            delBtn1.setAttribute("data-id1", object_item1.id1);
            delBtn1.classList.add("far", "fa-trash-alt");

            liElement1.appendChild(delBtn1);

            delBtn1.addEventListener("click", function (e) {
                const deleteId1 = e.target.getAttribute("data-id1");
                myTodoList1.deleteElement(deleteId1);
            })

            liElement1.addEventListener("click", function (e) {
                const selectedId1 = e.target.getAttribute("data-id1");
                myTodoList1.done_undone(selectedId1);
            })

            if (object_item1.isDone1) {
                liElement1.classList.add("checked");
            }

            this.ulElement1.appendChild(liElement1);
        })
    }
}

// personal todo

////-----MAIN PROGRAM------------
const listSection1 = document.querySelector("#myUL1");

myTodoList1 = new Todo_Class1(listSection1);

// project todo add
document.querySelector(".addBtn1").addEventListener("click", function () {
    myTodoList1.add()
})

document.querySelector("#myInput1").addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        myTodoList1.add()
    }
})