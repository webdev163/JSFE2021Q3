const todolist = document.querySelector('#todo-list');
const listitems = todolist.getElementsByTagName('LI');
const closeButtons = todolist.getElementsByClassName('close');
const newtodoInput = document.querySelector('#new-todo');
const newtodoBtn = document.querySelector('.new-todo-btn');
const todolistIcon = document.querySelector('.todolist-icon');
const todolistClose= document.querySelector('.todo-close');
const todolistWrapper= document.querySelector('.todolist-wrapper');
const todolistItems = todolist.getElementsByClassName('todolist-item-text');

let active = false;

if (localStorage.getItem('webdev163-todolist')) {
  todolist.innerHTML = localStorage.getItem('webdev163-todolist');
  todolist.querySelectorAll('.todolist-item-text').forEach(el => el.addEventListener('click', toggleChecked));
  todolist.querySelectorAll('.close').forEach(el => el.addEventListener('click', deleteItem));
}

function newElement() {
  const li = document.createElement('li');
  const inputValue = newtodoInput.value;
  const text = document.createElement('DIV');
  text.textContent = inputValue;
  text.addEventListener('click', toggleChecked)
  text.className = 'todolist-item-text';
  li.className = 'todolist-item';
  li.appendChild(text);
  if (inputValue === '') {
    return 0
  } else {
    todolist.appendChild(li);
  }
  newtodoInput.value = '';

  const close = document.createElement('DIV');
  const span = document.createElement('SPAN');
  const txt = document.createTextNode('\u00D7');
  close.className = 'close';
  span.className = 'close-txt';
  span.appendChild(txt);
  close.appendChild(span);
  li.appendChild(close);
  close.addEventListener('click', deleteItem)
  updateLocalstorage();
}

function updateLocalstorage() {
  localStorage.setItem('webdev163-todolist', todolist.innerHTML);
}

function toggleChecked() {
  this.classList.toggle('checked');
  updateLocalstorage();
}

function deleteItem() {
  this.parentElement.remove();
  updateLocalstorage();
}

function toggleActive() {
  todolistWrapper.classList.toggle('active');
  active === false ? active = true : active = false;
}

newtodoInput.addEventListener('change', newElement);
newtodoBtn.addEventListener('click', newElement);
todolistIcon.addEventListener('click', toggleActive);
todolistClose.addEventListener('click', toggleActive);
window.addEventListener('click', function (e) {
  if (!todolistWrapper.contains(e.target) && (!todolistIcon.contains(e.target)) && !e.target.classList.contains('close-txt') && !e.target.classList.contains('close') && todolistWrapper.classList.contains('active')) {
    toggleActive()
  }
})