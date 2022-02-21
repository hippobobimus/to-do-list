import AppEvent from "./event.js";
import Navbar from "./navbar.js";
import Sidebar from "./sidebar.js";
import AddNewIcon from "./icons/plus-circle.svg";
import DeleteIcon from "./icons/delete.svg";

class View {
  #root;
  #navbarRoot;
  #sidebarRoot;

  constructor(rootElemId) {
    // events
    this.newProjectEvent = new AppEvent();
    this.newTaskEvent = new AppEvent();
    this.deleteProjectEvent = new AppEvent();
    this.deleteTaskEvent = new AppEvent();
    this.selectProjectEvent = new AppEvent();

    this.#root = document.getElementById(rootElemId);

    this.#navbarRoot = document.createElement("div");
    this.#sidebarRoot = document.createElement("div");

    this.#root.appendChild(this.#navbarRoot);
    this.#root.appendChild(this.#sidebarRoot);

    this.#navbarRoot.id = "navbar";
    this.#sidebarRoot.id = "sidebar";

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

    this.navbar = new Navbar(this.#navbarRoot, "To-Do List", navbarBtnParams);
    this.sidebar = new Sidebar(
      this.#sidebarRoot,
      "To-Do Lists",
      "Projects",
      sidebarHeaderBtnParams,
      sidebarListItemAction,
      sidebarListBtnParams
    );
  }

  updateSidebar(stickyProjId, projects) {
    this.sidebar.reload(stickyProjId, projects);
  }

  updateNavbar(projName) {
    this.navbar.reload(projName);
  }
}

export default View;
