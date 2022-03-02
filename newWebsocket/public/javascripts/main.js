Quill.register('modules/cursors', QuillCursors);
const fileNameList = document.getElementById('foldertree');


const quill = new Quill('#editor', {
  theme: 'snow',
    placeholder: 'Compose an epic...',
  modules: {
    cursors: {
      transformOnTextChange: true,
    },
    syntax: true,              // Include syntax module
    toolbar: ['code-block'] 
  },
});

//파일목록 새로고침, 로드하는 함수
function fileNameListLoad() {
    $.ajax({
    type: 'POST',
    url: 'https://toastool-yftor.run.goorm.io/load',
    data:{'load' : "load"},
    //dataType:'json'
    })
    .done(function(data){
        quill.setText(data.contents);
        
        var fileList = data.fileList;
        fileNameList.innerText = fileList + "\n"; //.replace(',', '\n'); //,대신 엔터넣고싶은데 안되려나
    })
    .fail(function(request, status, error){
        alert("에러: "+ error);
    });

}


//페이지가 로드될때
window.onload = function() {
    fileNameListLoad();
}


//$(".ajaxSend").on("click", function(){
document.querySelector('#ajaxsend').addEventListener('click',function(){
    var data = quill.getContents(); 
    //JSON.stringify(obj1) === JSON.stringify(obj2)
    //: 객체를 string 으로 변경 후 비교하는 방법.
    //오브젝트 비교 angular 설치 필요
    //if(angular.equals(data2, JSON.parse({'code-block' : true}))) {
        //console.log("me"); 
    //}
    //var data = "jihyeon babo";\
    //약간 코드블럭 주위로 무조건 합쳐지는거 같기도 하고?
    //근데 밑은 안그런거 같던거 같기도 한데..
    console.log(data);
    var getContent = "";
    var codeblockTrueJson = {'code-block' : true};
    for(var i = 0; i < data.ops.length; i++) {
        // if(JSON.stringify(data.ops[i].attributes) === JSON.stringify(codeblockTrueJson)) {
        //     getContent = getContent + data.ops[i-1].insert +  data.ops[i].insert;
        // }
        if(data.ops[i].insert === undefined) 
            continue;
        getContent += data.ops[i].insert;

        console.log(getContent);
    }
    sendAjax('https://toastool-yftor.run.goorm.io/form', getContent); 
});

function sendAjax(url, data){
    var dataJson = { "code" : data };
    var dataJsonString = JSON.stringify(dataJson);
    //console.log(data + "\n" + dataJson + "\n" + dataJsonString);
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type','application/json');   
    console.log(dataJsonString);
    xhr.send(dataJsonString);
 
    //혹시 이것도 위에처럼 $().on('load')...는 아닐텐데...
    xhr.onload = function() {
        console.log(xhr.responseText);
        var resultData = JSON.parse(xhr.responseText);
        //var resultData2 = JSON.parse(resultData);
        console.log(resultData);
        if(resultData.result != "ok") return;
        console.log(resultData.output);
        
        document.getElementById('output').value=resultData.output;
    };
}

//저장 버튼
document.querySelector('#save').addEventListener('click',function(){
    var saveContents = quill.getContents(); 
    var pasingContent = "";
    var codeblockTrueJson = {'code-block' : true};
    for(var i = 0; i < saveContents.ops.length; i++) {
        // if(JSON.stringify(data.ops[i].attributes) === JSON.stringify(codeblockTrueJson)) {
        //     getContent = getContent + data.ops[i-1].insert +  data.ops[i].insert;
        // }
        if(saveContents.ops[i].insert === undefined) 
            continue;
        pasingContent += saveContents.ops[i].insert;

        console.log(pasingContent);
    }
    
    $.ajax({
    type: 'POST',
    url: 'https://toastool-yftor.run.goorm.io/save',
    data:{'saveContents' : pasingContent},
    //dataType:'json'
    })
    .done(function(result){
        alert("저장 되었습니다.");
    })
    .fail(function(request, status, error){
        alert("에러: "+ error);
    });

});

//모달창이 뜨고
//거기서 파일명, 확장자 입력하면 **
const open = () => {
	document.querySelector(".modal").classList.remove("hidden");
} //모달이 켜지는 그 ... 그거 함수 ...?
const close = () => {
	document.querySelector(".modal").classList.add("hidden");
} //이건 모달 꺼지는 거

document.querySelector("#plus").addEventListener('click', open);
document.querySelector(".closeBtn").addEventListener('click', close);
document.querySelector(".bg").addEventListener('click', close); // 요기까지 해서 모달 키고 끄는 거 마무리 해서

//+버튼 누를때
document.querySelector('#create').addEventListener('click',function(){ 
//우리 서버에 userFile/exampleProject/(파일명) 경로로 저장, 현재는 프로젝트이름이 없어서 일단 중간은 안해놨음..
    
    const filename = document.querySelector("#filename").value; 
    
    //파일 생성 요청
    $.ajax({
    type: 'POST',
    url: 'https://toastool-yftor.run.goorm.io/create',
    data:{'filename' : filename},
    //dataType:'json'
    })
    .done(function(result){
        //완료되면 탭으로 추가가되고 그 내용은 아무것도 없다.
        //#filename의 text 안의 내용은 리셋된다.
        fileNameListLoad(); //17번 줄에 있음
		// reloadDivArea();
 
		// function reloadDivArea() {
		// $('#folderwrap').load(location.href+' #folderwrap');
		// } 이게 영역 새로고침하는 함수이긴한데 왜 필요한거지 ???
    })
    .fail(function(request, status, error){
        alert("에러: "+ error);
    });
    
    

    //이부분 지현이가 해줘(?) "해줘"
    //모달창이 닫히면
//왼쪽 fileList는 새로고침이 되고(파일이 추가되고)
//quill안의 내용도 새로고침(없어짐), 결과창 내용도 없어짐(보류)
//이건 지우고 #create 버튼 눌렀을 때 ** 부터 실행할 수 있도록 하면 될거 같아용 이해 안되면 말하기 !!

}); 
                                                     

//소켓을 접속
const socket = io("https://toastool-yftor.run.goorm.io", {transports :['websocket']});

//quill 객체 하나당 아이디가 하나 가능
//==> 그러면 클라이언트 입장이니까 어차피 아이디는 같게, 그리고 사용자이름, 랜덤색상으로 하면
//클라이언트마다 생기지 않나? 아 생각해보니까 id가 한개여야 하니까 중복으로 생성이 안 되었던 것 같아
//==>그 말은 같은 id가 이미 하나 만들어져있으면 다른 클라이언트라도 안 되는 것 아닌가? 일단 확인해보자.
//지금사용자 정보는 없으니까 색깔이 만약에 다른 탭에서 다른 색깔이 되었다면 괜찮은거고,
//아니면... 망ㅇ...

//오!!! 색깔 달라졌어!!!!!! 나이서ㅜㅜㅜ 다행이다 그러면 하나만 생성하면 될 것 같아 ㅇㅇ
//그러면 하나만 생성하도록 하면 될 것 같은데,

/*
배열없이 그냥 객체 하나에 이름은 사용자이름 받아오고, 색은 랜덤
그걸로 어떻게 움직일 수 있는지는 알아봐야...

생각해보자.
커서에 아이디는 같고, 이름은 다르고 색깔이다르다.
그리고 예제를 분석해보면,
handler에 다른 객체를 줘서 아이디가 cursor인 애를 range만큼 움직인다
==>이 말은 그 객체가 무엇이든(id가 cursor이면) 그 객체를 움직임.

그러면, handler안에 넣는 객체에 따라 움직이는 커서가 다름.
==> 그러면 이벤트를 보낼 때 handler에 넣어야하나?
아니지 handler안에 넣는 객체가 다른 곳에서 온 객체여야함
==> 그러면 이벤트가 온 곳의 객체가 들어가야 한다는 말
==>굳이 따지면 emit부분이 아니라 on부분에서 객체를 받아서 해야한다는 말인데,
그러면 emit에서 자기 객체 정보를 보내고, on에서 다른사람의 객체(이벤트가 온 객체)정보를 받아옴

그러면 emit(본인의 이벤트를 보내기)
selectionHandler(본인 커서),

서버에서 받아와서 broadcast

quill.on이나 socket.on인데

아 quill.on은 다른 사람이 socket으로 써도 실행되는건가? 본인이 발생하지 않은 이벤트여도 quill.on이 실행되는건가
==>그건 아닌듯 다른 곳에 쓰여지면 콘솔창에 안뜨니까

그러면 quill.on부분은 직접 이벤트를 발생시키면 실행되고,
socket.on은 서버로부터 받아온 이벤트가 있으면 실행됨

==>그러면 quill.on에서 이벤트를 발생시킬 때 cursor를 보내고
socket.on에서 받아와서 그것을 움직인다.

==>여태 같은 소리 하고 있긴 한데 아무튼 이렇게 정리해야함
아니ㅜㅜ 너무 복잡해서 계속 정리하게 되네

아무튼 그래서 지금 하려고 하는것은
quill.on에서(사용자가 이벤ㅇ트를 발생시킬 때) cursor객체를 직접 보내면 stackoverflow생기니까
handler를 만들어서, 거기로 cursor객체를 보내고, socket.on에서 그 객체의 정보를 받아와서 움직이기..!
엥 그러면 그냥 전역변수로 선언해놨으니까 움직이면.. 아 .. 본인거가 움직여지는구나 ==> 엥 이게 맞지 않나
전역변수로 선언해놨으니까 그냥 본인이 이벤트 발생시키면, 다른 곳에서 본인꺼가 움직여져야하니까?
어차피 socket.on은 본인꺼가 아닌 다른 사람의 이벤트를 받아오는 곳이고
아 근데 본인이벤트가 아니라 다른사람 이벤트를 받아온다고 치면 이렇게 하면 안되긴 하지
다른 사람 이벤트를 받아온다고 생각하면서 하자.

class를 만들어야겠는데?
거기에 cursor받아와서 set하고
socket.on에서 cursor get해서 그걸 사용하는느낌? 아니지 클래스가 아니라.. 아니지 이것도 약간 싱클톤인가..?

그냥 함수로 하면 얘가 실행이되니까..아닌가.... 아냐 클래스가 맞는거같아
클래스에서 cursor객체 정보 담고, set으로 이벤트객체 넣고, get으로 받아와서 움직이기!
그러면 싱글톤으로 해야할까...? 생각해보자...굳이 싱글톤은 아니어도 될 것 같은데
객체 생성을 하면 안되니까 막아둘까 일단 검색해보자

근데 못쓰겠어ㅜㅜ 머리아파ㅠㅠㅠㅠㅠ js에서 쓰는거 봐도 모르겠서..

내가하려고 하는건
class의 instance로 이 커서의 정보를 set하고, get할 수만 있으면 되니까
cursor 속성이랑 get set만 있으면 돼

잠시만 생각해봤는데 여기는 클라이언트 부분이라
여기서 set하면 다른 클라이언트에서는 바뀌지 않아..

그러면 서버에서 관리하거나 클라이언트끼리 자원공유를 해야하는데 ==> 이게 서버긴 하지

서버에 전송을 못하는게 스택오버플로우가 뜸... 
이건 그러면 방법이 없는데..?

와 아이디가 같아야 움직이는 이유
: 예제 분석해보면 moveCursor('cursor', range)로 되어있음 그러니까
애초에 id가 cursor인 것들만 움직일 수 있게 만들어 놧음
==> 그러면 아이디를 사용자 아이디로 만들고, 받아와서 움직일 수 있게 하려면
근데 그 객체가 여기도 있어야함
그러니까 이벤트를 발생시킨 객체 정보를 가지고 움직이려면 그 객체가 클라이언트 내에 있어야 한다는...오류가...생김...
어.... 모르겟네... 그러면 어차피 id가 cursor로 같으니까 아무거나 넣으면 되게끔 만들어놓은 것 같은데..
우리는 그 넣는 객체가 뭘 넣어야 하는지 모르니까

차라리 id를다르게 해야하나
근데 어차피 클라이언트마다 다르게 나오던데 그럴 필요가 있나?

id를 다르게 만들려면 그 객체가 클라이언트에 있어야 하고 ==> 그러면 받아온 이벤트발생지의 id로 여기서 생성해야하나?
id를 같게 하고 어차피 다르게 생긴 걔들을 움직이려면 서버에 커서를 보내야해(왜냐면 이벤트 발생지의 정보를 클라이언트가 공유해야하니까)

여기서 생성하면 어떻게 되는거지? 나쁘지 않은가? 나쁘지 않을지도?

그러면 여기서, id를 같게 할 것이냐 다르게 할 것이냐.
==> 상관 없을 것 같아 id를 같게해도 그 정보로 다시 만드는 거니까 음...
==>아니지 달라야 할 것 같아. 왜냐ㅐ면 같은 id로 만든다고 치면
클라이언트 내부에서는 이미 그 아이디로 만든 커서가 있을 것이고,
그거랑 겹치면 create가 안되니까
*/
// const singletonCursorClass = (function() {
// 	var instance;
// 	var cursor;
	
// 	function init() {
// 		return {

// 		}
// 	}
	
// 	SetCursor(cursor) {
// 		this.cursor = cursor;
// 	}
	
// 	Getcursor() {
// 		return cursor;
// 	}
	
// 	return {
// 		getInstance: function() {
// 			if(!instance)
// 				instance = init();
// 			return instance;
// 		}
// 	};
// })();

// const SingletonClass = (function() {
//   let instance;

//   function init(){ // 싱글톤 객체를 리턴할 비공개 함수
//     return {
//       publictMethod: function() {
//         return 'public method';
//       },
//       publicProp: 'public variable',
//     };
//   }

//   return {
//     getInstance: function() {
//       if (instance) {
//         return instance; // 있으면 그냥 반환
//       }
//       instance = init();
//       return instance; // 없으면 객체 생성 후 반환 (이해를 위해 명시적으로 나눔)
//     }
//   };
// })();
// const cursorArray = new Array();
// cursorArray.push(quill.getModule('cursors'));
// cursorArray.push(quill.getModule('cursors'));
// console.log(cursorArray);


// cursorArray[0].createCursor('cursor', 'user1', 'blue');
// cursorArray[1].createCursor('cursor', 'user2', 'red');
// console.log(cursorArray);

const cursor = quill.getModule('cursors');
var cursorColor = Math.round(Math.random() * 0xffffff).toString(16);
var cursorName = "capstone";
var	cursorId = "capstone";
var cursorInfoJson = { id : cursorId, name : cursorName, color : cursorColor };
var senterCursorInfo = null;
cursor.createCursor(cursorId.toString(), cursorName.toString(), cursorColor);
console.log(cursor);


quill.on('editor-change', function(eventName, ...args) {
	console.log(args[0]);
    if (eventName === "text-change") {
        console.log("text-change: ", args[0]);
        //난.. 뭘한것이지..
        
        // console.log(quill.getFormat(args[0].ops[0].retain, args[0].ops[0].retain+1))
        // var codeblockTrueJson = {'code-block' : true};
        // //var codeblockNullJson = {'code-block' : null};
        // if(JSON.stringify(quill.getFormat(args[0].ops[0].retain, args[0].ops[0].retain+1)) === JSON.stringify(codeblockTrueJson)) {
        //     //처음부터 다시 해보자
        //     if(args[0].ops[1].insert === undefined) {
        //         return;
        //     }
        //     getContent += args[0].ops[1].insert;
        //     console.log(getContent);
            
            //     console.log("왜째서..");
        // //if(args[0].ops[1].insert === undefined) {
        //     if(concatFlag == true) {
        //         concatFlag = false;
        //         return;
        //     }
        //     else {
        //         concatFlag = true;
            
        //     }
        // }

        // if(concatFlag === true) {
        //     getContent += args[0].ops[1].insert;
        //     // let [line, offset] = quill.getLine(args[0].ops[0].retain);
        //     // console.log(line.children.tail.text);
        //     // getContent += line.children.tail.text;
        //     console.log(getContent);
        //}

        // args[0] will be delta
      } else if (eventName === "selection-change") {
        // args[0] will be old range
        console.log("selection-change: ", args[0]);
		
      }
        //이벤트가 유저꺼면 서버로 이벤트 전송
        //if(args[2] && args ==="user") 였었다.....
    if(args[2] && args[2] === "user") {
        socket.emit("update", {
            event: eventName,
            delta: args[0],
			cursorInfo: cursorInfoJson,
           });
        }
    });
    
   
// socket.on("connect", function (req) {
//     var ip_addr  = req.header['x-forwarded-for'] || req.connection.remoteAddress;
//     console.log("ip : "+ip_addr);
//     console.log("connected");
// });

socket.on("connect", function(socket){
     console.log("connected");
 });
    
    //이벤트네임과 delta분리
//그럼 여기가 emit해서 서버로 전송해서 서버에서 broadcast해서 내가 아닌 다른사람의 이벤트를 받는 곳
socket.on("update", function (data) {
    const eventName = data.event;
    const delta = data.delta;
	const cursorInfo = data.cursorInfo;
    //const cs = data.cursor;
	console.log(delta);
    
        //text변경이면 delta적용
    if(eventName === "text-change") {
        quill.updateContents(delta);
    }
        
    else if(eventName === "selection-change") {
        var range = quill.getSelection();
        quill.setSelection(range.index, delta.length);
        //quill.setSelection(null, delta.length);
        //quill.setSelection(delta.index, delta.length);
        senterCursorInfo = cursorInfo;
		selectionChangeHandler(senterCursorInfo, delta);
    }
});

//아 매번 생성해야하는 것 같기도 하고
//매번 다른 사람의 이벤트를 받아올 수도 있으니까
function selectionChangeHandler(cursorInfo, delta) {
	const cursor = quill.getModule('cursors');
	cursor.createCursor(cursorInfo.id.toString(), cursorInfo.name.toString(), cursorInfo.color.toString());
	cursor.moveCursor(cursorInfo.id.toString(), { index : delta.index, length : delta.length });
	//지금은 id가 달라서 그런가..? update가 자꾸 내쪽에서만 되네 뭐지 
	cursor.update();
}