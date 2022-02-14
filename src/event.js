class AppEvent {
  #listeners;

  constructor() {
    this.#listeners = [];
  }

  addListener(l) {
    this.#listeners.push(l);
  }

  trigger(params) {
    this.#listeners.forEach((l) => l(params));
  }
}

export default AppEvent;
