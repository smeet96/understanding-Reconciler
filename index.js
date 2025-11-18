const inputBox = document.getElementById("input-box");
const submitBtn = document.getElementById("submit-btn");
const toDoList = document.querySelector(".list");

submitBtn.onclick = () => {
    const newListItem = document.createElement("li");
    newListItem.textContent = inputBox.value
    
   toDoList.appendChild(newListItem)
}
