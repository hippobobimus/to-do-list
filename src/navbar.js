import "./navbar.css";

class Navbar {
  #btns
  #btnParams;
  #heading;
  #root;

  constructor(rootElem, headingString, btnParams) {
    this.#root = rootElem;
    this.#btnParams = btnParams;

    this.#heading = document.createElement("h1");
    this.#btns = document.createElement("ul");

    this.#root.appendChild(this.#heading);
    this.#root.appendChild(this.#btns);

    this.#btns.id = "btns";

    this.reload(headingString);
  }

  reload(headingString) {
    this.#heading.innerText = headingString;

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
