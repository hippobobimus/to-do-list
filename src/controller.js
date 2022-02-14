import Project from "./project.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.updateEvent.addListener(this.onModelUpdate);

    this.view.newProjectEvent.addListener(this.onNewProject);
    this.view.newTaskEvent.addListener(this.onNewTask);
    this.view.deleteProjectEvent.addListener(this.onDeleteProject);
    this.view.deleteTaskEvent.addListener(this.onDeleteTask);
  }

  reload() {
    this.view.updateSidebar(this.model.projects);
  }

  onModelUpdate = (projects) => {
    this.view.updateSidebar(projects);
  }

  onNewProject = () => {
    this.model.addProject(new Project());
    this.view.updateSidebar(this.model.projects);
  };

  onDeleteProject = (id) => {
    this.model.deleteProject(id);
    this.view.updateSidebar(this.model.projects);
  };

  onNewTask = () => {
    // TODO
  };

  onDeleteTask = (id) => {
    // TODO
  };
}

export default Controller;
