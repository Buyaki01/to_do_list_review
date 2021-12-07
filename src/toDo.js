import LocalStorage from './storage.js';
import Tasks from './todolistitem.js';

export default class ToDoList {
  // change status(completed) of to-do item
  static addToForm(description) {
    if (description.trim().length > 0) {
      const model = LocalStorage.getList();
      const itemIndex = model.length + 1;
      const task = new Tasks(description, itemIndex);
      model.push(task);
      LocalStorage.save(model);
      return task;
    }
    return false;
  }

  static editForm(description, index) {
    const model = LocalStorage.getList();
    const listItem = model.find((item) => item.index === index);
    listItem.description = description;
    LocalStorage.save(model);
  }

  static deleteItem(index) {
    const model = LocalStorage.getList();
    const newlistItems = model.filter((item) => item.index !== index);
    LocalStorage.save(ToDoList.reAssignIndex(newlistItems));
  }

  static clearAllCompleted() {
    const model = LocalStorage.getList();
    const newlistItems = model.filter((item) => item.completed === false);
    LocalStorage.save(ToDoList.reAssignIndex(newlistItems));
  }

  // Adjusts list index values to match actual index
  static reAssignIndex(model) {
    model.forEach((item, index) => {
      item.index = index + 1;
    });
    return model;
  }

  static changeStatus(index, status) {
    const model = LocalStorage.getList();
    const listItem = model.find((item) => item.index === index);
    listItem.completed = status;
    LocalStorage.save(model);
  }
}