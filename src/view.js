import AppEvent from "./event.js";
import Navbar from "./navbar.js";
import Sidebar from "./sidebar.js";
import TaskDisplay from "./task-display.js";
import AddNewIcon from "./icons/plus-circle.svg";
import DeleteIcon from "./icons/delete.svg";

class View {
  #root;
  #navbarRoot;
  #sidebarRoot;
  #taskDisplayRoot;
  
  constructor(rootElemId) {
    // events
    this.newProjectEvent = new AppEvent();
    this.newTaskEvent = new AppEvent();
    this.deleteProjectEvent = new AppEvent();
    this.deleteTaskEvent = new AppEvent();
    this.selectProjectEvent = new AppEvent();
    this.updateProjectFieldEvent = new AppEvent();
    this.updateTaskFieldEvent = new AppEvent();

    this.#root = document.getElementById(rootElemId);

    this.#navbarRoot = document.createElement("div");
    this.#sidebarRoot = document.createElement("div");
    this.#taskDisplayRoot = document.createElement("div");

    this.#root.appendChild(this.#navbarRoot);
    this.#root.appendChild(this.#sidebarRoot);
    this.#root.appendChild(this.#taskDisplayRoot);

    this.#navbarRoot.id = "navbar";
    this.#sidebarRoot.id = "sidebar";
    this.#taskDisplayRoot.id = "tasks";

    let navbarBtnParams = {
      "New Task": () => this.newTaskEvent.trigger(),
    };

    let sidebarHeaderBtnParams = {
      "add-new": [AddNewIcon, () => this.newProjectEvent.trigger()],
    };

    let sidebarListBtnParams = {
      "delete": [
        DeleteIcon,
        (e) => {
          this.deleteProjectEvent.trigger(e.target.getAttribute("data-proj-id"));
        },
      ],
    };

    let sidebarListItemAction = (e) => {
      this.selectProjectEvent.trigger(e.target.getAttribute("data-proj-id"));
    };

    let taskBtnParams = {
      "delete": [
        DeleteIcon,
        (e) => {
          this.deleteTaskEvent.trigger(e.target.getAttribute("data-task-id"));
        },
      ],
    };

    this.navbar = new Navbar(
      this.#navbarRoot,
      navbarBtnParams,
      this.updateProjectFieldEvent,
    );

    this.sidebar = new Sidebar(
      this.#sidebarRoot,
      "To-Do Lists",
      "Projects",
      sidebarHeaderBtnParams,
      sidebarListItemAction,
      sidebarListBtnParams
    );

    this.taskDisplay = new TaskDisplay(this.#taskDisplayRoot, taskBtnParams, this.updateTaskFieldEvent);
  }

  updateSidebar(stickyProjId, projects) {
    this.sidebar.reload(stickyProjId, projects);
  }

  updateNavbar(projName) {
    this.navbar.reload(projName);
  }

  updateTaskDisplay(project) {
    this.taskDisplay.reload(project);
  }
}

export default View;
