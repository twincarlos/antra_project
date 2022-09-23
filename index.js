const todoListDiv = document.getElementById("todo-list-div");

const taskInput = document.getElementById("task-input");
const submitButton = document.getElementById("submit-button");

fetch("http://localhost:3000/todos/")
.then(() => {
    fetch("./db.json")
    .then(res => res.json())
    .then(data => {
        for(let todo of data.todos) {
            const todoSpan = document.createElement("span");
            todoSpan.classList.add("todo-span");

            const todoP = document.createElement("p");
            todoP.classList.add("todo-p");
            todoP.innerText = todo.title;

            const todoEdit = document.createElement("button");
            todoEdit.classList.add("todo-edit");
            todoEdit.innerText = "Edit";
            todoEdit.addEventListener("click", () => {
                const editSpan = document.createElement("span");
                editSpan.classList.add("edit-span");

                const editField = document.createElement("input");
                editField.classList.add("edit-field");
                editField.value = todo.title;

                const editSubmit = document.createElement("button");
                editSubmit.classList.add("edit-submit");
                editSubmit.innerText = "Submit";
                editSubmit.addEventListener("click", () => {
                    fetch(`http://localhost:3000/todos/${todo.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ title: editField.value })
                    });
                });

                const cancelEdit = document.createElement("button");
                cancelEdit.classList.add("cancel-edit");
                cancelEdit.innerText = "Cancel";
                cancelEdit.addEventListener("click", () => {
                    todoListDiv.replaceChild(todoSpan, editSpan);
                });

                editSpan.appendChild(editField);
                editSpan.appendChild(editSubmit);
                editSpan.appendChild(cancelEdit);

                todoListDiv.replaceChild(editSpan, todoSpan);
            });

            const todoDelete = document.createElement("button");
            todoDelete.classList.add("todo-delete");
            todoDelete.innerText = "Delete";
            todoDelete.addEventListener("click", () => {
                fetch(`http://localhost:3000/todos/${todo.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: todo.id})
                });
            });

            todoListDiv.appendChild(todoSpan);
            todoSpan.appendChild(todoP);
            todoSpan.appendChild(todoEdit);
            todoSpan.append(todoDelete);
        };
    });
});

submitButton.addEventListener("click", e => {
    fetch("http://localhost:3000/todos/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: taskInput.value, completed: false })
    });
});