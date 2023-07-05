const taskList = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
console.log(taskList);
document.getElementById("addtask").addEventListener("click", () => {
    const task = document.getElementById('input');
    addTask(task);
})
function getDate() {
    let a = new Date();
    a = a.toDateString();
    document.getElementById('date').innerHTML = a;
}
function addTask(task) {
    taskList.push(task.value);
    localStorage.setItem("items", JSON.stringify(taskList));
    location.reload();
}
function displayList() {
    let list = "";
    for (let i = 0; i < taskList.length; i++) {
        list += `<div class="task">
                    <div class="input-task">
                        <div class="task-complete">
                            <span class="check-text">
                            </span>
                            <img src="images/checkbefore.png" alt="#" class="completeBtn">
                        </div>
                        <textarea rows="1" disabled>${taskList[i]}</textarea>
                        <div class="delete-task">
                            <img src="images/binbefore.png" alt="#" class="deleteBtn">
                            <span class="delete-text">
                                Delete item from list
                            </span>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById("to-do-list").innerHTML = list;
    activateCompleteBtn()
    activateDeleteBtn()
}
var checkstrike = [];
for (let i = 0; i < taskList.length; i++) {
    checkstrike[i] = 0;
}
function activateCompleteBtn() {
    let cbtn = document.getElementsByClassName("completeBtn");
    let completeBtn = Array.from(cbtn);
    completeBtn.forEach((cb, i) => {
        cb.addEventListener("mouseover", () => {
            if (checkstrike[i] == 0) hoverstrike(i);
            else hoverunstrike(i);
        })
        cb.addEventListener("mouseleave", () => {
            if (checkstrike[i] == 0) unhoverstrike(i);
            else unhoverunstrike(i);
        })
        cb.addEventListener("click", () => {
            if (checkstrike[i] == 0) strikeItem(i);
            else unstrikeItem(i);
        })
    });
}
function hoverstrike(i) {
    let tickbtn = document.querySelectorAll(".completeBtn");
    tickbtn[i].src = "images/checkhoverstrike.png";
    let popuptxt = document.querySelectorAll(".check-text");
    popuptxt[i].innerHTML = "Task Completed!!";
    popuptxt[i].style.visibility = "visible";
}
function hoverunstrike(i) {
    let tickbtn = document.querySelectorAll(".completeBtn");
    tickbtn[i].src = "images/checkhoverunstrike.png";
    let popuptxt = document.querySelectorAll(".check-text");
    popuptxt[i].innerHTML = "Task not yet done";
    popuptxt[i].style.visibility = "visible";
}
function unhoverstrike(i) {
    let tickbtn = document.querySelectorAll(".completeBtn");
    tickbtn[i].src = "images/checkbefore.png";
    let popuptxt = document.querySelectorAll(".check-text");
    popuptxt[i].style.visibility = "hidden";
}
function unhoverunstrike(i) {
    let tickbtn = document.querySelectorAll(".completeBtn");
    tickbtn[i].src = "images/checkafter.png";
    let popuptxt = document.querySelectorAll(".check-text");
    popuptxt[i].style.visibility = "hidden";
}
function strikeItem(i) {
    let tickbtn = document.querySelectorAll(".completeBtn");
    tickbtn[i].src = "images/checkafter.png";
    let txtspc = document.getElementsByTagName("textarea");
    let textspace = Array.from(txtspc);
    textspace[i].style.textDecoration = "line-through";
    checkstrike[i] = 1
}
function unstrikeItem(i) {
    let tickbtn = document.querySelectorAll(".completeBtn");
    tickbtn[i].src = "images/checkbefore.png";
    let txtspc = document.getElementsByTagName("textarea");
    let textspace = Array.from(txtspc);
    textspace[i].style.textDecoration = "none";
    checkstrike[i] = 0;
}
function activateDeleteBtn() {
    let dbtn = document.getElementsByClassName("deleteBtn");
    let deleteBtn = Array.from(dbtn);
    deleteBtn.forEach((db, i) => {
        db.addEventListener("mouseover", () => {
            hoverdelete(i);
        })
        db.addEventListener("mouseleave", () => {
            unhoverdelete(i);
        })
        db.addEventListener("click", () => {
            deleteItem(i);
        })
    });
}
function hoverdelete(i) {
    let delbtn = document.querySelectorAll(".deleteBtn");
    delbtn[i].src = "images/binhover.png"
    let popuptxt = document.querySelectorAll(".delete-text");
    popuptxt[i].style.visibility = "visible";
}
function unhoverdelete(i) {
    let delbtn = document.querySelectorAll(".deleteBtn");
    delbtn[i].src = "images/binbefore.png"
    let popuptxt = document.querySelectorAll(".delete-text");
    popuptxt[i].style.visibility = "hidden";
}
function deleteItem(i) {
    taskList.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(taskList));
    location.reload();
}
window.onload = function () {
    getDate()
    displayList()
}
