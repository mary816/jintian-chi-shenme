export function createHomeController({ showHome, showDraw, showPlaceholder }) {
  return {
    openHome() {
      showHome();
    },
    openDraw() {
      showDraw();
    },
    openPlaceholder(message) {
      showPlaceholder(message);
    },
  };
}
