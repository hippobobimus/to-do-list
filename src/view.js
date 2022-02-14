import AppEvent from "./event.js";
import Navbar from "./navbar.js";
import Sidebar from "./sidebar.js";
import AddNewIcon from "./icons/plus-circle.svg";
import DeleteIcon from "./icons/delete.svg";

class View {
  #root;
  #navbarRoot;
  #sidebarRoot;
  #navbarBtnParams = {
    "New Task": () => this.newTaskEvent.trigger(),
  };
  #sidebarHeaderBtnParams = {
    "add-new": [AddNewIcon, () => this.newProjectEvent.trigger()],
  };
  #sidebarListBtnParams = {
    "delete": [DeleteIcon, (e) => this.deleteProjectEvent.trigger(e.target.getAttribute("data-proj-id"))],
  };

  constructor(rootElemId) {
    // events
    this.newProjectEvent = new AppEvent();
    this.newTaskEvent = new AppEvent();
    this.deleteProjectEvent = new AppEvent();
    this.deleteTaskEvent = new AppEvent();

    this.#root = document.getElementById(rootElemId);

    this.#navbarRoot = document.createElement("div");
    this.#sidebarRoot = document.createElement("div");

    this.#root.appendChild(this.#navbarRoot);
    this.#root.appendChild(this.#sidebarRoot);

    this.#navbarRoot.id = "navbar";
    this.#sidebarRoot.id = "sidebar";

    this.navbar = new Navbar(this.#navbarRoot, "To-Do List", this.#navbarBtnParams);
    this.sidebar = new Sidebar(this.#sidebarRoot, "Projects", this.#sidebarHeaderBtnParams, this.#sidebarListBtnParams);
  }

  updateSidebar(projects) {
    this.sidebar.reload(projects);
  }

  updateNavbar(projName) {
    this.navbar.reload(projName);
  }
}

export default View;
