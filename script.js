document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    // Загружаем сохранённые задачи    
    loadTasks();
    // Добавление задачи    
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        addTask(taskText);
        saveTasks();
        taskInput.value = "";
    });
    // Функция добавления задачи в список    
    function addTask(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;
    // Кнопка удаления        
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });
    // Отметка выполненного задания        
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}
    // Сохранение задач в localStorage    
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(li => {
            tasks.push({
                text: li.textContent.replace("Удалить", "").trim(),
                completed: li.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    // Загрузка задач из localStorage    
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => {
            addTask(task.text);
            if (task.completed) {
                taskList.lastChild.classList.add("completed");
            }
        });
    }
});