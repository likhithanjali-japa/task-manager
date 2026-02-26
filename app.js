let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.title + " ";
        
        const prioritySpan = document.createElement("span");
        prioritySpan.textContent = task.priority;
        prioritySpan.classList.add("priority-" + task.priority.toLowerCase());

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(index);

        li.appendChild(span);
        li.appendChild(prioritySpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function addTask() {
    const title = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (title === "") return;

    tasks.push({
        title,
        priority
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newTitle = prompt("Edit task:", tasks[index].title);
    if (newTitle !== null && newTitle.trim() !== "") {
        tasks[index].title = newTitle.trim();
        saveTasks();
        renderTasks();
    }
}

addTaskBtn.addEventListener("click", addTask);

renderTasks();