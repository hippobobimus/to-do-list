import AppEvent from "./event.js";
import Project from "./project.js";

class Model {
  #projectsMap;

  constructor() {
    this.#projectsMap = new Map();
  }

  // Returns an array of projects sorted by name in alphabetical order.
  get projects() {
    let result = Array.from(this.#projectsMap.values());

    result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }

  addProject(project) {
    this.#projectsMap.set(project.id, project);
  }

  deleteProject(id) {
    id = parseInt(id);

    this.#projectsMap.delete(id);
  }

  getProject(id) {
    id = parseInt(id);

    return this.#projectsMap.get(id);
  }

  static fromJSON(json) {
    let model = new Model();

    for (let proj of json.projects) {
      model.addProject(Project.fromJSON(proj));
    }

    return model;
  }

  toJSON() {
    return {projects: this.projects};
  }
}

export default Model;
