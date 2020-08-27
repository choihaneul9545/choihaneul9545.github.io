const todoForm = document.querySelector('.todoList__form');
const todoInput = document.querySelector('.todoList__input');
const todoList = document.querySelector('.todoList__list');
const newBtn = document.querySelector('.newBtn');
const delBtn = document.querySelector('.todoList__list li button');

let todos = [];

const TODOS_LS = 'todos';

//Create new to do
newBtn.addEventListener('click', function (event) {
  todoForm.classList.toggle('open');
});

//Save all todos in my computer
function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function modifyTodo(text) {
  const btn = event.target;
  const div = btn.parentNode;
  const li = div.parentNode;
  const span = li.querySelector('span');
  const input = document.createElement('input');
  const edit = document.createElement('button');
  const editId = li.appendChild(input);
  li.appendChild(edit);
  input.value = span.innerHTML;
  // 아이콘들 지우기
  li.removeChild(div);
  li.removeChild(span);
  edit.innerHTML = '수정';

  edit.addEventListener('click', function (event) {
    li.appendChild(span);
    li.appendChild(div);
    li.removeChild(input);
    li.removeChild(edit);
    span.innerHTML = input.value;
    console.log(span.innerText);
    console.log(li);
    console.log(todos);
    const outNum = li.id - 1;
    const todoObj = {
      text: input.value,
      id: li.id,
    };

    todos.splice(outNum, 1, todoObj);
    saveTodos();
  });
}

function deleteTodo(event) {
  const btn = event.target;
  const div = btn.parentNode;
  const li = div.parentNode;
  todoList.removeChild(li);
  const cleanTodos = todos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  todos = cleanTodos;
  saveTodos();
}

function makeTodo(text) {
  const li = document.createElement('li');
  const deleteBtn = document.createElement('button');
  const btn = document.createElement('div');
  const span = document.createElement('span');
  const mdfBtn = document.createElement('button');
  const newId = todos.length + 1;
  mdfBtn.innerHTML = '🔧';
  mdfBtn.addEventListener('click', modifyTodo);
  deleteBtn.innerHTML = '🗑';
  deleteBtn.addEventListener('click', deleteTodo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(btn);
  btn.appendChild(deleteBtn);
  btn.appendChild(mdfBtn);
  li.id = newId;
  todoList.appendChild(li);
  const todoObj = {
    text: text,
    id: newId,
  };
  todos.push(todoObj);
  saveTodos();

  todoForm.classList.remove('open');
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  makeTodo(currentValue);
  todoInput.value = '';
}

function loadTodos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach(function (toDo) {
      makeTodo(toDo.text);
    });
  }
}

function init() {
  loadTodos();
  todoForm.addEventListener('submit', handleSubmit);
}

init();
