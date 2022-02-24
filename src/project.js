import Task from "./task.js";

class Project {
  static #counter;
  #tasks = new Map();

  constructor(name) {
    this.id = Project.#nextId;
    this.name = name;
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

  static fromJSON(json) {
    let proj = new Project();

    proj.id = json.id;
    proj.name = json.name;

    // ensure counter takes account of largest id
    Project.#counter = Math.max(proj.id, Project.#counter);

    for (let task of json.tasks) {
      proj.addTask(Task.fromJSON(task));
    }

    return proj;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      tasks: this.tasks,
    };
  }
}

export default Project;
