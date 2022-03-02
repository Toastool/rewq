


const scriptsInEvents = {

		async LoginEvent_Event10_Act1(runtime, localVars)
		{
			alert("회원 정보를 모두 입력해주세요");
		},

		async AttendanceCheckEvent_Event14_Act1(runtime, localVars)
		{
			alert("출석 정보 다시 확인해주세요.");
			
		},

		async AttendanceCheckEvent_Event15_Act1(runtime, localVars)
		{
			alert("출석 정보가 입력완료 되었습니다.");
		}

};

self.C3.ScriptsInEvents = scriptsInEvents;

