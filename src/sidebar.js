import "./sidebar.css";

class Sidebar {
  #listBtnParams;
  #index;
  #root;

  constructor(rootElem, headingString, headerBtnParams, listBtnParams) {
    this.#root = rootElem;
    this.#listBtnParams = listBtnParams;
  
    let header = document.createElement("div");
    this.#index = document.createElement("ul");

    let heading = document.createElement("h2");
    let headerBtns = document.createElement("div");

    this.#root.appendChild(header);
    this.#root.appendChild(this.#index);
    header.appendChild(heading);
    header.appendChild(headerBtns);

    header.classList.add("sidebar-header");
    headerBtns.classList.add("sidebar-header-btns");

    heading.innerText = headingString;

    for (let [btnClass, [iconPath, action]] of Object.entries(headerBtnParams)) {
      let btn = document.createElement("img");

      headerBtns.appendChild(btn);

      btn.classList.add(btnClass);
      btn.src = iconPath;
      btn.onclick = action;
    }
  }

  reload(projects) {
    this.#index.innerHTML = "";

    projects.forEach(p => {
      let li = document.createElement("li");
      let name = document.createElement("span");
      let btns = document.createElement("div");

      this.#index.appendChild(li);
      li.appendChild(name);
      li.appendChild(btns);

      name.classList.add("name");
      name.dataset.projId = p.id;
      name.innerText = p.name;

      btns.classList.add("btns");

      for (let [btnClass, [iconPath, action]] of Object.entries(this.#listBtnParams)) {
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
