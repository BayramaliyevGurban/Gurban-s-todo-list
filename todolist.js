let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

let editingIndex = null;

startTodo()

function startTodo() {
    let todoListHTML = ''
    todoList.forEach((todoText, index) => {
        if (index === editingIndex) {
            todoListHTML += `
            <div class="js-list-todo-list">
            <input type="text" class="todo-edit-input js-todo-input-edit-${index}" value="${todoText}">
            <button class="js-save-button" data-index="${index}">Save</button>
            <button class="js-delete-button">Delete</button>
            </div>
            `;
        } else {
            todoListHTML += `
            <div class="js-list-todo-list">
            <div class="js-todo-name">${todoText}</div>
            <button class="js-edit-button" data-index="${index}">Edit</button>
            <button class="js-delete-button">Delete</button>
            </div>
            `;
        };
    });
    document.querySelector('.todolist').innerHTML = todoListHTML;
    
    document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            todoList.splice(index, 1);
            startTodo();
            save();
        });
    });

    document.querySelectorAll('.js-edit-button').forEach((editButton) => {
        editButton.addEventListener('click', () => {
            editingIndex = Number(editButton.dataset.index);
            startTodo();
        });
    });
    
    document.querySelectorAll('.js-save-button').forEach((saveButton) => {
        saveButton.addEventListener('click', () => {
            const index = saveButton.dataset.index;
            const inputElement = document.querySelector(`.js-todo-input-edit-${index}`);
            
            todoList[index] = inputElement.value;
            editingIndex = null;
            startTodo();
            save();
        });
    });
    
    save();
};

let addButton = document.querySelector('.add-button');
addButton.addEventListener('click', () => {
    let inputElement = document.querySelector('.todo-input').value
    if (inputElement) {
        todoList.push(inputElement)
        document.querySelector('.todo-input').value = '';
        startTodo()
        save()
    }
});

function save() {
    localStorage.setItem('todoList', JSON.stringify(todoList))
}