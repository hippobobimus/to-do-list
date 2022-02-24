import "./task-display.css";

class TaskDisplay {
  #btnParams;
  #root;
  #tasks;
  #updateEvent;

  constructor(rootElem, btnParams, updateEvent) {
    this.#root = rootElem;
    this.#btnParams = btnParams;
    this.#updateEvent = updateEvent;

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
      let dateLabel = document.createElement("label");
      let date = document.createElement("input");
      let priorityLabel = document.createElement("label");
      let priority = document.createElement("select");

      let highPriority = document.createElement("option");
      let standardPriority = document.createElement("option");
      let lowPriority = document.createElement("option");

      priority.appendChild(highPriority);
      priority.appendChild(standardPriority);
      priority.appendChild(lowPriority);

      card.appendChild(complete);
      card.appendChild(name);
      card.appendChild(dateLabel);
      card.appendChild(date);
      card.appendChild(priorityLabel);
      card.appendChild(priority);

      this.#tasks.appendChild(card);

      card.classList.add("task");
      card.dataset.taskId = task.id;

      complete.type = "checkbox";
      complete.checked = task.complete;

      name.type = "text";
      name.value = task.name;

      dateLabel.innerText = "Due:"
      dateLabel.htmlFor = "date-" + task.id;

      date.id = "date-" + task.id;
      date.type = "date";
      date.value = task.dueDate;

      priorityLabel.innerText = "Priority:"
      priorityLabel.htmlFor = "priority-" + task.id;

      priority.id = "priority-" + task.id;
      priority.value = task.priority;
      priority.options.item(task.priority).selected = true;
      highPriority.innerText = "High";
      standardPriority.innerText = "Standard";
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

      complete.onblur = (e) => {
        let taskId = e.target.parentElement.getAttribute("data-task-id");
        this.#updateEvent.trigger(taskId, "complete", complete.checked);
      };

      name.onblur = (e) => {
        let taskId = e.target.parentElement.getAttribute("data-task-id");
        this.#updateEvent.trigger(taskId, "name", name.value);
      };

      date.onblur = (e) => {
        let taskId = e.target.parentElement.getAttribute("data-task-id");
        this.#updateEvent.trigger(taskId, "dueDate", date.value);
      };

      priority.onblur = (e) => {
        let taskId = e.target.parentElement.getAttribute("data-task-id");
        this.#updateEvent.trigger(taskId, "priority", parseInt(priority.selectedIndex));
      };
    }
  }
}

export default TaskDisplay;
