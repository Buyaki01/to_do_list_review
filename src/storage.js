export default class LocalStorage {
  // retrieve to-do list
  static getList() {
    let toDoList = JSON.parse(localStorage.getItem('toDoList'));
    if (!toDoList) {
      toDoList = [];
    }
    return toDoList;
  }

  // save list to local storage
  static save(toDoList) {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }
}