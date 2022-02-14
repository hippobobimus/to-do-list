class Project {
  static #counter;
  #tasks = new Map();

  constructor() {
    this.id = Project.#nextId;
    this.name = "New Project";
  }

  static get #nextId() {
    Project.#counter = (Project.#counter || 0) + 1;
    return Project.#counter;
  }

  get tasks() {
    return Array.from(this.#tasks.values());
  }

  addTask(task) {
    this.#tasks.set(task.id, task);
  }

  deleteTask(id) {
    this.#tasks.delete(parseInt(id));
  }

  getTask(id) {
    return this.#tasks.get(parseInt(id));
  }
}

export default Project;
