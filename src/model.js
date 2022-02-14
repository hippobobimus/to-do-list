import AppEvent from "./event.js";

class Model {
  #projectsMap;

  constructor() {
    this.#projectsMap = new Map();

    this.updateEvent = new AppEvent();
  }

  // Returns an array of projects sorted by name in alphabetical order.
  get projects() {
    let result = Array.from(this.#projectsMap.values());

    result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }

  addProject(project) {
    this.#projectsMap.set(project.id, project);

    this.updateEvent.trigger(this.projects);
  }

  deleteProject(id) {
    this.#projectsMap.delete(parseInt(id));

    this.updateEvent.trigger(this.projects);
  }

  getProject(id) {
    return this.#projectsMap.get(id);
  }
}

export default Model;
