document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Функция добавления задачи
    function addTask() {
        if (taskInput.value.trim() === "") return;

        const li = document.createElement("li");
        li.classList.add("task-item");

        // Создаем чекбокс
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");

        // Создаем текст задачи (с возможностью редактирования)
        const taskText = document.createElement("span");
        taskText.textContent = taskInput.value;
        taskText.classList.add("task-text");

        // Создаем кнопку удаления
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.classList.add("delete-btn");

        // Добавляем элементы в <li>
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        // Очищаем поле ввода
        taskInput.value = "";

        // Чекбокс: зачёркивание текста
        checkbox.addEventListener("change", () => {
            taskText.style.textDecoration = checkbox.checked ? "line-through" : "none";
        });

        // Удаление задачи
        deleteBtn.addEventListener("click", () => {
            li.remove();
        });

        // Редактирование задачи (по одному клику)
        taskText.addEventListener("click", () => {
            const input = document.createElement("input");
            input.type = "text";
            input.value = taskText.textContent;
            input.classList.add("edit-input");

            li.replaceChild(input, taskText);
            input.focus();

            // Сохранение редактирования по Enter или потере фокуса
            function saveEdit() {
                taskText.textContent = input.value.trim() || "Без названия";
                li.replaceChild(taskText, input);
            }

            input.addEventListener("keypress", (e) => {
                if (e.key === "Enter") saveEdit();
            });

            input.addEventListener("blur", saveEdit);
        });
    }

    // Добавление задачи по кнопке
    addTaskBtn.addEventListener("click", addTask);

    // Добавление задачи по Enter
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });
});