class Task {
  static #counter;

  constructor() {
    this.id = Task.#nextId;
    this.name = "New entry";
    this.desc = "test";
    this.dueDate = "12th"
    this.priority = "normal";
  }

  static get #nextId() {
    Task.#counter = (Task.#counter || 0) + 1;
    return Task.#counter;
  }
}

export default Task;

