export function createSplashController({ splash, delay = 2000, schedule = setTimeout, cancel = clearTimeout }) {
  let timerId;
  let hasDismissed = false;

  function dismiss() {
    if (hasDismissed) return;
    hasDismissed = true;
    cancel(timerId);
    splash.classList.add("is-leaving");
  }

  function start() {
    splash.addEventListener("click", dismiss, { once: true });
    splash.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        dismiss();
      }
    });
    timerId = schedule(dismiss, delay);
  }

  return { start, dismiss };
}
