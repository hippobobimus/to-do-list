import "./sidebar.css";

class Sidebar {
  #itemBtnParams;
  #index;
  #itemAction;
  #root;
  #stickyIndex;

  constructor(rootElem, mainHeadingStr, indexHeadingStr, indexHeaderBtnParams, itemAction, itemBtnParams) {
    this.#root = rootElem;
    this.#itemAction = itemAction;
    this.#itemBtnParams = itemBtnParams;
  
    let mainHeader = document.createElement("div");
    this.#stickyIndex = document.createElement("ul");
    let indexHeader = document.createElement("div");
    this.#index = document.createElement("ul");

    let mainHeading = document.createElement("h2");
    let indexHeading = document.createElement("h3");

    let indexHeaderBtns = document.createElement("div");

    this.#root.appendChild(mainHeader);
    this.#root.appendChild(this.#stickyIndex);
    this.#root.appendChild(indexHeader);
    this.#root.appendChild(this.#index);
    mainHeader.appendChild(mainHeading);
    indexHeader.appendChild(indexHeading);
    indexHeader.appendChild(indexHeaderBtns);

    mainHeader.classList.add("sidebar-header");
    indexHeader.classList.add("sidebar-header");
    indexHeaderBtns.classList.add("sidebar-header-btns");

    mainHeading.innerText = mainHeadingStr;
    indexHeading.innerText = indexHeadingStr;

    for (let [btnClass, [iconPath, action]] of Object.entries(indexHeaderBtnParams)) {
      let btn = document.createElement("img");

      indexHeaderBtns.appendChild(btn);

      btn.classList.add(btnClass);
      btn.src = iconPath;
      btn.onclick = action;
    }
  }

  reload(stickyProjId, projects) {
    this.#stickyIndex.innerHTML = "";
    this.#index.innerHTML = "";

    projects.forEach(p => {
      let li = document.createElement("li");
      let name = document.createElement("span");
      let btns = document.createElement("div");

      li.appendChild(name);
      li.appendChild(btns);

      name.classList.add("name");
      name.dataset.projId = p.id;
      name.innerText = p.name;
      name.onclick = this.#itemAction;

      if (p.id === stickyProjId) {
        this.#stickyIndex.appendChild(li);
        // no buttons to add so return early.
        return;
      } else {
        this.#index.appendChild(li);
      }

      btns.classList.add("btns");

      for (let [btnClass, [iconPath, action]] of Object.entries(this.#itemBtnParams)) {
        let btn = document.createElement("img");

        btns.appendChild(btn);

        btn.dataset.projId = p.id;
        btn.classList.add(btnClass);
        btn.src = iconPath;
        btn.onclick = action;
      }
    });
  }
}

export default Sidebar;
