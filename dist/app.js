"use strict";
const title = document.getElementById('title');
const desc = document.getElementById('desc');
const date = document.getElementById('date');
const btn = document.getElementById('create-btn');
const content = document.querySelector('.content1');
const uncompleted = document.querySelector('.completed');
let updating = -1;
const Todos = [{
        id: 123,
        Title: 'Todo1',
        Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident cum',
        Date: '20/01/2023',
        Completed: false
    }];
function checkbtn() {
    console.log(updating);
    if (updating != -1) {
        btn.textContent = 'Update';
    }
    else {
        btn.textContent = 'Create Todo';
    }
}
btn.addEventListener('click', addorupdate);
function addorupdate() {
    if (updating >= 0) {
        console.log('Here' + updating);
        let todo = Todos[updating];
        const Title = title.value;
        const Description = desc.value;
        const Date = date.value;
        Todos[updating] = Object.assign(Object.assign({}, todo), { Title, Date, Description });
        showtodos();
        updating = -1;
        checkbtn();
        title.value = '';
        desc.value = '';
        date.value = '';
    }
    else {
        const Title = title.value;
        const Description = desc.value;
        const Date = date.value;
        if (Title == '' || Description == '' || Date == '') {
            const p = document.createElement('p');
            p.textContent = 'Please fill in all Fields';
            p.style.color = 'red';
            p.id = 'error-message';
            content.insertAdjacentElement('afterbegin', p);
            setTimeout(() => {
                p.style.display = 'none';
            }, 4000);
        }
        else {
            let singleTodo = { Title, Description, Date, Completed: false, id: Math.random() * 10000 };
            Todos.push(singleTodo);
            showtodos();
            console.log(Todos);
        }
    }
}
showtodos();
function showtodos() {
    const todos = Todos.filter(a => a.Completed === false);
    if (todos.length == 0) {
        uncompleted.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = 'No Todos Add One !!';
        p.style.color = 'Black';
        uncompleted.insertAdjacentElement('afterbegin', p);
    }
    else {
        uncompleted.innerHTML = '';
        todos.forEach((a) => {
            let html = `
            <div class="todo" onclick="deleteTodo(${a.id}">
                <h1>${a.Title}</h1>
                <p>${a.Description}</p>
                <div class="btn">
                    <button onclick="updateTodo(${a.id})" >update</button>
                   
                    <button>Complete</button>
                </div>
            </div>
            `;
            uncompleted.innerHTML += html;
        });
    }
}
function deleteTodo(id) {
    const index = Todos.findIndex(a => a.id === id);
    console.log(index);
    Todos.splice(index, 1);
    showtodos();
}
function updateTodo(id) {
    const index = Todos.findIndex(a => a.id === id);
    let todo = Todos[index];
    //Prepopopulate Form
    title.value = todo.Title;
    desc.value = todo.Description;
    date.value = todo.Date;
    // btn.textContent="Update"
    updating = index;
    checkbtn();
    console.log(updating);
}
