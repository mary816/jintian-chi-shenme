import { foodPool } from "./food-data.js";
import { createSplashController } from "./splash.js";

const TRANSITION_MS = 320;
const DEFAULT_SUBTITLE = "触碰卡牌或下方按钮开启抽选";

export function selectFood(pool, random = Math.random) {
  if (!Array.isArray(pool) || pool.length === 0) {
    throw new Error("Food pool must contain at least one item");
  }

  return pool[Math.floor(random() * pool.length)];
}

export function createDrawController({ pool, elements, wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) }) {
  let isFlipped = false;
  let isTransitioning = false;

  function updateFood(food) {
    elements.foodName.textContent = food.name;
    elements.foodTag.textContent = food.tag;
    elements.foodDesc.textContent = food.desc;
    elements.illustration.innerHTML = food.svg;
  }

  function draw() {
    if (isTransitioning) return undefined;

    isTransitioning = true;
    if (!isFlipped) {
      updateFood(selectFood(pool));
      elements.card.classList.add("is-flipped");
      isFlipped = true;
      return wait(TRANSITION_MS).then(() => {
        elements.subtitle.textContent = "美味已揭晓，祝你用餐愉快";
        elements.buttonText.textContent = "重新抽取";
        isTransitioning = false;
      });
    }

    elements.card.classList.remove("is-flipped");
    isFlipped = false;
    return wait(TRANSITION_MS).then(() => {
      elements.subtitle.textContent = DEFAULT_SUBTITLE;
      elements.buttonText.textContent = "抽取今日美味";
      isTransitioning = false;
    });
  }

  return { draw };
}

if (typeof document !== "undefined") {
  const splash = document.querySelector("#splash-screen");
  if (splash) {
    createSplashController({ splash }).start();
  }

  const elements = {
    card: document.querySelector("#card-box"),
    foodName: document.querySelector("#food-name"),
    foodTag: document.querySelector("#food-tag"),
    foodDesc: document.querySelector("#food-desc"),
    illustration: document.querySelector("#illustration-stage"),
    subtitle: document.querySelector("#page-subtitle"),
    buttonText: document.querySelector("#btn-text"),
  };
  const button = document.querySelector("#btn-draw");
  const controller = createDrawController({ pool: foodPool, elements });
  const draw = () => controller.draw();

  elements.card.addEventListener("click", draw);
  button.addEventListener("click", draw);
}
