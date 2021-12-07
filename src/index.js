import './style.css';
import ToDoList from './toDo.js';
import LocalStorage from './storage.js';

function listItemElements(item) {
  const listItem = document.createElement('li');
  listItem.style.order = item.index;
  listItem.classList.add('items_created');
  listItem.innerHTML = `<input type="checkbox" class="check_box"> 
    <input class="itemAdded" value="${item.description}"> 
    <button class="deleteBtn"> <i class="fas fa-trash-alt"></i> </button>`;
  const completed = listItem.querySelector('.check_box');
  completed.checked = item.completed;
  completed.addEventListener('change', (e) => ToDoList.changeStatus(item.index, e.target.checked));
  const addedItem = listItem.querySelector('.itemAdded');
  addedItem.addEventListener('change', (e) => {
    const addedItemValue = e.target.value;
    ToDoList.editForm(addedItemValue, item.index);
  });
  const deleteBtn = listItem.querySelector('.deleteBtn');
  deleteBtn.addEventListener('click', () => {
    ToDoList.deleteItem(item.index);
    listItem.remove();
  });
  return listItem;
}

function component() {
  const element = document.createElement('ul');
  const allItems = document.createElement('ul');
  allItems.className = 'contentsOfTheList';
  allItems.style.order = 2;
  element.appendChild(allItems);
  element.classList.add('items_list');
  const todayList = document.createElement('li');
  todayList.style.order = -1;
  todayList.innerHTML = `<h5>Today's To Do</h5> <button>
            <i class="fa fa-refresh" aria-hidden="true"></i></button> `;
  element.appendChild(todayList);

  const addToList = document.createElement('li');
  addToList.style.order = 0;
  addToList.innerHTML = `<input type="text" class="enteredValue" placeholder="Add to your list..">
            <button class="plusIcon"><i class="fa fa-plus" aria-hidden="true"></i>
            </button>`;

  const addBtn = addToList.querySelector('.plusIcon');
  addBtn.addEventListener('click', () => {
    const inputElement = addToList.querySelector('.enteredValue');
    const inputValue = inputElement.value;
    const receivedItemAdded = ToDoList.addToForm(inputValue);
    if (receivedItemAdded) {
      const listItem = listItemElements(receivedItemAdded);
      allItems.appendChild(listItem);
    }
    inputElement.value = '';
  });
  element.appendChild(addToList);
  const itemArray = LocalStorage.getList();
  itemArray.forEach((item) => {
    const listItem = listItemElements(item);
    allItems.appendChild(listItem);
  });

  const clearCompleted = document.createElement('button');
  clearCompleted.classList.add('clear_completed');
  clearCompleted.style.order = 3;
  clearCompleted.innerHTML = 'Clear all completed';
  clearCompleted.addEventListener('click', () => {
    ToDoList.clearAllCompleted();
    document.querySelectorAll('.check_box').forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.parentElement.remove();
      }
    });
  });
  element.appendChild(clearCompleted);
  return element;
}

document.querySelector('.listContainer').appendChild(component());
