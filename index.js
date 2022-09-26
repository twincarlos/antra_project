const todoListDiv = document.getElementById("todo-list-div");
const completedDiv = document.getElementById("completed-div");

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

            const buttonsSpan = document.createElement("span");
            buttonsSpan.classList.add("buttons-span");

            const todoP = document.createElement("p");
            todoP.classList.add("todo-p");
            if (todo.completed) todoP.classList.add("completed-p");
            todoP.innerText = todo.title;
            todoP.addEventListener("click", () => {
                fetch(`http://localhost:3000/todos/${todo.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ completed: !todo.completed })
                });
            });

            const todoEdit = document.createElement("button");
            todoEdit.classList.add("todo-edit");
            todoEdit.innerHTML = "<i class=\"fas fa-pen\"></i>";
            todoEdit.addEventListener("click", () => {
                const editSpan = document.createElement("span");
                editSpan.classList.add("edit-span");

                const editField = document.createElement("input");
                editField.classList.add("edit-field");
                editField.value = todo.title;

                const editSubmit = document.createElement("button");
                editSubmit.classList.add("edit-submit");
                editSubmit.innerHTML = "<i class=\"fas fa-check\"></i>";
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
                cancelEdit.innerHTML = "<i class=\"fas fa-chevron-left\"></i>";
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
            todoDelete.innerHTML = "<i class=\"fas fa-trash-alt\"></i>";
            todoDelete.addEventListener("click", () => {
                fetch(`http://localhost:3000/todos/${todo.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: todo.id})
                });
            });

            todo.completed ? completedDiv.appendChild(todoSpan) : todoListDiv.appendChild(todoSpan);
            todoSpan.appendChild(todoP);
            if (!todo.completed) buttonsSpan.appendChild(todoEdit);
            buttonsSpan.append(todoDelete);
            todoSpan.appendChild(buttonsSpan);
        };

        if (document.getElementsByClassName("completed-p").length > 0) completedDiv.style.visibility = "visible";
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