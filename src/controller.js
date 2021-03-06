import Model from "./model.js";
import Project from "./project.js";
import Task from "./task.js";
import View from "./view.js";

class Controller {
  static #DEFAULT_PROJ_ID = 1;
  #currProjId;
  #storage;

  constructor(root) {
    this.#storage = window.localStorage;

    this.view = new View(root);

    let storedModel = this.loadModel();

    if (storedModel) {
      this.model = storedModel;
    } else {
      this.model = new Model();

      // default project
      this.model.addProject(new Project("General Tasks"));
    }

    this.#currProjId = Controller.#DEFAULT_PROJ_ID;

    // Events

    this.view.newProjectEvent.addListener(this.onNewProject);
    this.view.newTaskEvent.addListener(this.onNewTask);
    this.view.deleteProjectEvent.addListener(this.onDeleteProject);
    this.view.deleteTaskEvent.addListener(this.onDeleteTask);
    this.view.selectProjectEvent.addListener(this.onSelectProject);
    this.view.updateProjectFieldEvent.addListener(this.onProjectFieldUpdate);
    this.view.updateTaskFieldEvent.addListener(this.onTaskFieldUpdate);
  }

  loadModel() {
    let storedModel = this.#storage.getItem("model");

    if (storedModel) {
      let parsed = JSON.parse(storedModel);
      return Model.fromJSON(parsed);
    }

    return false;
  }

  storeModel() {
    this.#storage.setItem("model", JSON.stringify(this.model));
  }

  reload() {
    let proj = this.model.getProject(this.#currProjId);
    this.view.updateSidebar(Controller.#DEFAULT_PROJ_ID, this.model.projects);
    this.view.updateNavbar(proj.name);
    this.view.updateTaskDisplay(proj);
  }

  onNewProject = () => {
    let p = new Project("New Project");

    this.#currProjId = p.id;

    this.model.addProject(p);

    this.reload();
    this.storeModel();
  };

  onDeleteProject = (id) => {
    id = parseInt(id);

    if (id === Controller.#DEFAULT_PROJ_ID) {
      console.log("Cannot delete default project");
      return;
    }

    if (id === this.#currProjId) {
      this.#currProjId = Controller.#DEFAULT_PROJ_ID;
    }

    this.model.deleteProject(id);
    
    this.reload();
    this.storeModel();
  };

  onSelectProject = (id) => {
    id = parseInt(id);

    this.#currProjId = id;

    this.reload();
  };

  onProjectFieldUpdate = (field, newValue) => {
    this.model.getProject(this.#currProjId)[field] = newValue;

    this.reload();
    this.storeModel();
  };

  onTaskFieldUpdate = (taskId, field, newValue) => {
    let task = this.model.getProject(this.#currProjId).getTask(parseInt(taskId));

    task[field] = newValue;

    this.reload();
    this.storeModel();
  };

  onNewTask = () => {
    this.model.getProject(this.#currProjId).addTask(new Task());

    this.reload();
    this.storeModel();
  };

  onDeleteTask = (id) => {
    id = parseInt(id);

    this.model.getProject(this.#currProjId).deleteTask(id);

    this.reload();
    this.storeModel();
  };
}

export default Controller;
