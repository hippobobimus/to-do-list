import "./task-display.css";

class TaskDisplay {
  #btnParams;
  #root;
  #tasks;

  constructor(rootElem, btnParams) {
    this.#root = rootElem;
    this.#btnParams = btnParams;

    this.#tasks = document.createElement("div");

    this.#tasks.classList.add("card");

    this.#root.appendChild(this.#tasks);
  }

  reload(project) {
    this.#tasks.innerHTML = "";

    for (let task of project.tasks) {
      let card = document.createElement("div");

      let complete = document.createElement("input");
      let name = document.createElement("input");
      let date = document.createElement("input");
      let priority = document.createElement("select");

      let highPriority = document.createElement("option");
      let standardPriority = document.createElement("option");
      let lowPriority = document.createElement("option");

      priority.appendChild(highPriority);
      priority.appendChild(standardPriority);
      priority.appendChild(lowPriority);

      card.appendChild(complete);
      card.appendChild(name);
      card.appendChild(date);
      card.appendChild(priority);

      this.#tasks.appendChild(card);

      card.classList.add("task");

      complete.type = "checkbox";
      complete.checked = task.complete;

      name.type = "text";
      name.value = task.name;

      date.type = "date";
      date.value = task.dueDate;

      priority.value = task.priority;
      highPriority.value = "High";
      highPriority.innerText = "High";
      standardPriority.value = "Standard";
      standardPriority.innerText = "Standard";
      lowPriority.value = "Low";
      lowPriority.innerText = "Low";

      let btns = document.createElement("div");
      card.appendChild(btns);
      btns.classList.add("btns");

      for (let [btnClass, [iconPath, action]] of Object.entries(this.#btnParams)) {
        let btn = document.createElement("img");

        btns.appendChild(btn);

        btn.dataset.taskId = task.id;
        btn.classList.add(btnClass);
        btn.src = iconPath;
        btn.onclick = action;
      }
    }
  }
}

export default TaskDisplay;
