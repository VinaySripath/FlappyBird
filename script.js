const block = document.getElementById("block");
const hole = document.getElementById("hole");
const character = document.getElementById("character");
const b = document.getElementById("play");
const c = document.getElementById("container");
const ch = document.getElementById("character");
const playArea = document.getElementById("playArea");
const score = document.getElementById("score");
const highscore = document.getElementById("highscore");
let jumping = 0;
let counter = 0;
let start = 0;
let high;
//let high = 0;
if (sessionStorage.getItem(high) == null) {
  sessionStorage.setItem(high, 0);
}

hole.addEventListener("animationiteration", () => {
  let random = -(Math.random() * 300 + 150);
  hole.style.top = random + "px";
  counter++;
});
function changecss() {
  b.classList.toggle("playhover");
}
function toggleState() {
  playArea.classList.toggle("flexplay");
  b.classList.toggle("hidden");
  b.classList.toggle("show");
  c.classList.toggle("show");
  c.classList.toggle("hidden");
  ch.classList.toggle("show");
  ch.classList.toggle("hidden");
  score.classList.toggle("hidden");
  highscore.classList.toggle("hidden");
  if (start == 0) {
    start = 1;
  } else {
    start = 0;
  }
}
setInterval(function () {
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  if (jumping == 0 && start == 1) {
    character.style.top = characterTop + 3 + "px";
  }
  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  let cTop = -(500 - characterTop);
  if (
    characterTop > 550 ||
    (blockLeft < 30 &&
      blockLeft > -50 &&
      (cTop < holeTop || cTop > holeTop + 150))
  ) {
    //alert(`Game over... Your Score: ${counter - 1}`);
    toggleState();
    if (counter > sessionStorage.getItem(high)) {
      sessionStorage.setItem(high, counter);
      highscore.innerHTML = "HIGHSCORE!!: " + counter;
    } else {
      highscore.innerHTML = "HIGHSCORE!!:" + sessionStorage.getItem(high);
    }
    score.innerHTML = `Your Score Is: ${counter}`;
    character.style.top = 100 + "px";
    counter = 0;
  }
}, 10);
function jump() {
  let jumpCount = 0;
  jumping = 1;
  let jumpInterval = setInterval(() => {
    let characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue("top")
    );
    if (characterTop > 6) {
      character.style.top = characterTop - 4 + "px";
    }
    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  }, 10);
}
