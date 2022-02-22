import Project from "./project.js";

class Controller {
  #currProjId;
  static #DEFAULT_PROJ_ID = 1;

  constructor(model, view) {
    this.model = model;
    this.view = view;

    // TODO localstorage persistance
    // default project
    this.model.addProject(new Project("General Tasks"));
    this.#currProjId = Controller.#DEFAULT_PROJ_ID;

    // Events

    this.model.updateEvent.addListener(this.onModelUpdate);

    this.view.newProjectEvent.addListener(this.onNewProject);
    this.view.newTaskEvent.addListener(this.onNewTask);
    this.view.deleteProjectEvent.addListener(this.onDeleteProject);
    this.view.deleteTaskEvent.addListener(this.onDeleteTask);
    this.view.selectProjectEvent.addListener(this.onSelectProject);
    this.view.updateFieldEvent.addListener(this.onFieldUpdate);
  }

  reload() {
    this.view.updateSidebar(Controller.#DEFAULT_PROJ_ID, this.model.projects);
    this.view.updateNavbar(this.model.getProject(this.#currProjId).name);
  }

  onNewProject = () => {
    let p = new Project("New Project");

    this.#currProjId = p.id;

    this.model.addProject(p);

    this.reload();
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
  };

  onSelectProject = (id) => {
    id = parseInt(id);

    this.#currProjId = id;

    this.reload();
  };

  onFieldUpdate = (field, newValue) => {
    this.model.getProject(this.#currProjId)[field] = newValue;;

    this.reload();
  };

  onNewTask = () => {
    // TODO
    console.log("new task");
  };

  onDeleteTask = (id) => {
    // TODO
    console.log(`delete task id ${id}`);
  };

  onModelUpdate = (projects) => {
    // TODO
    console.log("model updated");
  }
}

export default Controller;
