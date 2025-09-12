// 1. 유저가 값을 입력한다.
// 2. +(plus) 버튼을 클릭하면, 할 일이 추가된다.
// 3. delete 버튼을 누르면 할 일이 삭제된다.
// 4. check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
//  4-1 check 버튼을 클릭하는 순간 true -> false
//  4-2 ture이면 끝난걸로 간주하고 밑줄
//  4-3 false이면 진행중인걸로 간주하고 그대로.
// 5. 진행중 끝남 탭을 누르면 언더바가 이동한다.
// 6. 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 7. 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
// console.log(taskInput);

let addButton = document.getElementById("add-button");
// console.log(addButton);

let tabs = document.querySelectorAll(".task-tabs div"); // 조건에 만족하는 모든 것을 가져옴.
let taskList = [];
let mode = "all";
let filterList = [];

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

addButton.addEventListener("click", addTask);

function addTask() {
  // console.log("clicked");
  // let taskContent = taskInput.value;
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);

  render();
}

function render() {
  // 1. 내가 선택한 탭에 따라서
  let list = [];
  if (mode === "all") {
    //  all taskList
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    // 2. 리스트를 달리 보여준다.
    list = filterList;
  }

  // 3. all => taskList
  // 4. ongoing  done => filterList

  let resultHTML = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
          <div class="task task-done">
            <div>${list[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
    `;
    } else {
      resultHTML += `
          <div class="task task-ongoing">
            <div>${list[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
    `;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id: ", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// 아이템 삭제하기.
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render(); // 값을 업데이트 하면 UI 도 업데이트 하게 한다. -> 자동 "리엑트"
}

function filter(event) {
  //console.log(filter, event.target.id);
  mode = event.target.id;

  // 필터 리스트
  filterList = [];
  if (mode === "all") {
    // 전체 리스트를 보여준다.
    render();
  } else if (mode === "ongoing") {
    // 진행중인 아이템을 보여준다.
    // task.isComplete == false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행중", filterList);
  } else if (mode === "done") {
    // 끝나는 케이스
    // task.isComplete == true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("끝남", filterList);
  }
}
