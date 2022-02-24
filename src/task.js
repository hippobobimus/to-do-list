class Task {
  static #counter;

  constructor() {
    this.id = Task.#nextId;
    this.name = "New Task";
    this.desc = "test";
    this.dueDate = new Date().toISOString().substring(0, 10);
    this.priority = 1;
    this.complete = false;
  }

  static get #nextId() {
    Task.#counter = (Task.#counter || 0) + 1;
    return Task.#counter;
  }

  static fromJSON(json) {
    // ensure counter takes account of largest id
    Task.#counter = Math.max(json.id, Task.#counter);

    return Object.assign(new Task(), json);
  }
}

export default Task;

