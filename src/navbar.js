import "./navbar.css";

class Navbar {
  #btns
  #btnParams;
  #name;
  #root;

  constructor(rootElem, btnParams, updateEvent) {
    this.#root = rootElem;
    this.#btnParams = btnParams;

    this.#name = document.createElement("input");
    this.#name.type = "text";
    this.#name.maxLength = 20;

    this.#name.onblur = () => {
      updateEvent.trigger("name", this.#name.value);
    };

    this.#btns = document.createElement("ul");

    this.#root.appendChild(this.#name);
    this.#root.appendChild(this.#btns);

    this.#btns.id = "btns";
  }

  reload(projName) {
    this.#name.value = projName;

    this.#btns.innerHTML = "";
  
    for (let [btnText, action] of Object.entries(this.#btnParams)) {
      let li = document.createElement("li");
      let btn = document.createElement("button");

      this.#btns.appendChild(li);
      li.appendChild(btn);

      btn.innerText = btnText;
      btn.onclick = action;
    }
  }
}

export default Navbar;
