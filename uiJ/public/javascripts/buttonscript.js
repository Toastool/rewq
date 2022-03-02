console.log('why00');
// Modal을 가져옵니다.
var modals = document.getElementsByClassName('modal');
// Modal을 띄우는 클래스 이름을 가져옵니다.
var btns = document.getElementsByClassName('btn');
// Modal을 닫는 kick 클래스를 가져옵니다.
var spanes = document.getElementsByClassName('kick');
var funcs = [];

// Modal을 띄우고 닫는 클릭 이벤트를 정의한 함수
function Modal(num) {
    return function () {
        // 해당 클래스의 내용을 클릭하면 Modal을 띄웁니다.
        btns[num].onclick = function () {
            modals[num].style.display = 'block';
            console.log(num);
        };

        // <span> 태그(X 버튼)를 클릭하면 Modal이 닫습니다.
        spanes[num].onclick = function () {
            modals[num].style.display = 'none';
        };
    };
}

// 원하는 Modal 수만큼 Modal 함수를 호출해서 funcs 함수에 정의합니다.
for (var i = 0; i < btns.length; i++) {
    funcs[i] = Modal(i);
}

// 원하는 Modal 수만큼 funcs 함수를 호출합니다.
for (var j = 0; j < btns.length; j++) {
    funcs[j]();
}

// Modal 영역 밖을 클릭하면 Modal을 닫습니다.
window.onclick = function (event) {
    if (event.target.className == 'modal') {
        event.target.style.display = 'none';
    }
};

function insert(query, table, data) {
    axios
        .post('https://toastoolui.run.goorm.io/insert', {
            query: query,
            table: table,
            data: data,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        });
}

const projectObjectList = [];
const friendObjectList = [];
class Project_Class {
    constructor(item) {
        this.ulElement = item;
    }

    insert(query) {
        axios
            .post('https://toastoolui.run.goorm.io/insert', {
                query: query,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    padd() {
        const projectInput = document.querySelector('#projectname').value;
        const projectPass = document.querySelector('#projectpw').value;

        if (projectInput == '') {
            alert('프로젝트 이름을 입력하세요.');
        } else if (projectPass == '') {
            alert('프로젝트 비밀번호를 입력하세요.');
        } else {
            const projectObject = {
                id: projectObjectList.length,
                projectText: projectInput,
                projectLock: projectPass,
            };

            this.insert(
                "insert into Toast_project(id, name, member, projectPW) values('" +
                    projectObjectList.length +
                    "', '" +
                    projectInput +
                    "','example', '" +
                    projectPass +
                    "')"
            );

            projectObjectList.unshift(projectObject);
            this.pdisplay();

            document.querySelector('#projectname').value = '';
            document.querySelector('#projectpw').value = '';
        }
    }

    fadd() {
        const friendInput = document.querySelector('#friendname').value;
        if (friendInput == '') {
            alert('친구의 ID를 입력하세요.');
        } else {
            const friendObject = {
                id: friendObjectList.length,
                friendText: friendInput,
            };

            friendObjectList.unshift(friendObject);
            this.fdisplay();
            document.querySelector('#friendname').value = '';
        }
    }

    pdisplay() {
        const newprojectInput = document.querySelector('#newprojectname').value;
        const newprojectPass = document.querySelector('#newprojectpw').value;
        const exitprojectInput = document.querySelector('#exitprojectname').value;
        const exitprojectPass = document.querySelector('#exitprojectpw').value;
        this.ulElement.innerHTML = '';

        projectObjectList.forEach((object_item) => {
            const liElement = document.createElement('li');

            liElement.innerText = object_item.projectText;
            liElement.setAttribute('data-id1', object_item.id);

            //document.getElementById('tabwrap1').appendChild(liElement);
            //console.log('li 1');
            console.log(object_item.projectText);
            this.ulElement.appendChild(liElement);

            console.log(newprojectInput);
            /*for(var count = 0; count < projectObjectList.length; count++){                

            }*/

            var option = $('<option>' + object_item.projectText + '</option>');
            $('#select2').append(option);

            if (object_item.projectText == exitprojectInput) {
                console.log('true');
                console.log(object_item.newprojectInput);
                liElement.innerText = newprojectInput;
                document.querySelector('#newprojectname').value = '';
                document.querySelector('#newprojectpw').value = '';
                document.querySelector('#exitprojectname').value = '';
                document.querySelector('#exitprojectpw').value = '';
                liElement.setAttribute('data-id1', object_item.id);

                document.querySelector('#friendname').value = ''; //document.getElementById('tabwrap1').appendChild(liElement);
                console.log('li 1');
                console.log(object_item);
                this.ulElement.appendChild(liElement);
            }
        });
    }

    fdisplay() {
        this.ulElement.innerHTML = '';
        friendObjectList.forEach((object_item) => {
            const liElement2 = document.createElement('li');

            liElement2.innerText = object_item.friendText;
            liElement2.setAttribute('data-id2', object_item.id);

            //document.getElementById('tabwrap2').appendChild(liElement2);
            console.log('li 2');
            this.ulElement.appendChild(liElement2);
        });
    }
}

// 프로젝트 추가

////-----MAIN PROGRAM------------
const plistSection = document.querySelector('#myUL3');
myProjectList = new Project_Class(plistSection);

document.querySelector('.pnew').addEventListener('click', function () {
    myProjectList.padd();
});

document.querySelector('#projectname').addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        myProjectList.padd();
    }
});

document.querySelector('#projectpw').addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        myProjectList.padd();
    }
});

document.querySelector('.pmodify').addEventListener('click', function () {
    myProjectList.pdisplay();
});