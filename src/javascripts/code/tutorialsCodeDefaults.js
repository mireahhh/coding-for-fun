export const defaultCodeByRuntime = {
  vanilla: `const app = document.getElementById("app");

app.innerHTML = "";
app.style.width = "100%";
app.style.height = "100%";
app.style.display = "flex";
app.style.alignItems = "center";
app.style.justifyContent = "center";
app.style.background = "#F3F4F6";

const box = document.createElement("div");
box.textContent = "Vanilla JS works";
box.style.padding = "16px 20px";
box.style.borderRadius = "16px";
box.style.background = "#111827";
box.style.color = "#FFFFFF";
box.style.fontFamily = "sans-serif";
box.style.fontSize = "18px";

app.appendChild(box);`,

  p5: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(255);

  let step = 40;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      fill(20);
      rect(x, y, step * 0.8, step * 0.8);
    }
  }
}`,

  three: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 3;

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// resize
function onResize() {
  const width = app.clientWidth;
  const height = app.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener("resize", onResize);

// анимация
let animationId;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);

  geometry.dispose();
  material.dispose();
  renderer.dispose();
};`,
};

const previewCodeVanilla = `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let animationId;
let speedFactor = 0;
let targetSpeedFactor = 0;
let virtualTime = 0;
let lastTime = 0;

app.innerHTML = "";
app.style.width = "100%";
app.style.height = "100%";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
}

function playAnimation() {
  targetSpeedFactor = 1;
}

function pauseAnimation() {
  targetSpeedFactor = 0;
}

function handlePreviewHover(event) {
  if (event.data?.type !== "coding-for-fun-preview-hover") return;
  if (event.data.isHovered) {
    playAnimation();
  } else {
    pauseAnimation();
  }
}

function draw(time) {
  const deltaTime = time - lastTime;
  lastTime = time;

  speedFactor += (targetSpeedFactor - speedFactor) * Math.min(deltaTime / 2000, 1);
  virtualTime += deltaTime * speedFactor * 0.04;

  const width = canvas.width;
  const height = canvas.height;
  const size = Math.min(width, height) / 5;

  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 9; i += 1) {
    const angle = virtualTime + i * 0.7;
    const x = width / 2 + Math.cos(angle) * size * 1.4;
    const y = height / 2 + Math.sin(angle * 1.3) * size;

    ctx.fillStyle = i % 2 ? "#ff86db" : "#2fd3e6";
    ctx.beginPath();
    ctx.arc(x, y, size * (0.28 + i * 0.025), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#111827";
  ctx.font = "600 14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Vanilla запущен", width / 2, height - 22);

  animationId = requestAnimationFrame(draw);
}

window.addEventListener("message", handlePreviewHover);
canvas.addEventListener("mouseenter", playAnimation);
canvas.addEventListener("mouseleave", pauseAnimation);
window.addEventListener("resize", resize);
resize();
draw(0);

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("message", handlePreviewHover);
  canvas.removeEventListener("mouseenter", playAnimation);
  canvas.removeEventListener("mouseleave", pauseAnimation);
  window.removeEventListener("resize", resize);
};`;

const previewCodeP5 = `let speedFactor = 0;
let targetSpeedFactor = 0;
let virtualTime = 0;

function playAnimation() {
  targetSpeedFactor = 1;
}

function pauseAnimation() {
  targetSpeedFactor = 0;
}

function handlePreviewHover(event) {
  if (event.data?.type !== "coding-for-fun-preview-hover") return;
  if (event.data.isHovered) {
    playAnimation();
  } else {
    pauseAnimation();
  }
}

function setup() {
  const canvas = createCanvas(app.clientWidth, app.clientHeight);
  canvas.parent("app");
  canvas.mouseOver(playAnimation);
  canvas.mouseOut(pauseAnimation);
  window.addEventListener("message", handlePreviewHover);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  speedFactor += (targetSpeedFactor - speedFactor) * min(deltaTime / 2000, 1);
  virtualTime += deltaTime * speedFactor * 0.035;
  background(248);

  const radius = min(width, height) * 0.28;

  for (let i = 0; i < 12; i += 1) {
    const angle = virtualTime + i * TWO_PI / 12;
    const x = width / 2 + cos(angle) * radius;
    const y = height / 2 + sin(angle * 1.6) * radius * 0.65;

    fill(i % 2 ? "#2fd3e6" : "#ff86db");
    circle(x, y, 22 + sin(virtualTime * 2 + i) * 10);
  }

  fill("#111827");
  textAlign(CENTER, CENTER);
  textSize(14);
  text("p5.js запущен", width / 2, height - 24);
}`;

const previewCodeThree = `const width = app.clientWidth;
const height = app.clientHeight;

let speedFactor = 0;
let targetSpeedFactor = 0;
let lastTime = 0;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.set(0, 0, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

const group = new THREE.Group();
scene.add(group);

const geometry = new THREE.TorusKnotGeometry(0.7, 0.22, 96, 12);
const material = new THREE.MeshNormalMaterial();
const knot = new THREE.Mesh(geometry, material);
group.add(knot);

const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(2, 3, 4);
scene.add(light);

function onResize() {
  const width = app.clientWidth;
  const height = app.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function playAnimation() {
  targetSpeedFactor = 1;
}

function pauseAnimation() {
  targetSpeedFactor = 0;
}

function handlePreviewHover(event) {
  if (event.data?.type !== "coding-for-fun-preview-hover") return;
  if (event.data.isHovered) {
    playAnimation();
  } else {
    pauseAnimation();
  }
}

let animationId;

function animate(time) {
  const deltaTime = time - lastTime;
  lastTime = time;

  speedFactor += (targetSpeedFactor - speedFactor) * Math.min(deltaTime / 2000, 1);

  knot.rotation.x += 0.018 * speedFactor;
  knot.rotation.y += 0.026 * speedFactor;
  group.rotation.z += 0.006 * speedFactor;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

window.addEventListener("resize", onResize);
window.addEventListener("message", handlePreviewHover);
renderer.domElement.addEventListener("mouseenter", playAnimation);
renderer.domElement.addEventListener("mouseleave", pauseAnimation);
animate(0);

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);
  window.removeEventListener("message", handlePreviewHover);
  renderer.domElement.removeEventListener("mouseenter", playAnimation);
  renderer.domElement.removeEventListener("mouseleave", pauseAnimation);
  geometry.dispose();
  material.dispose();
  renderer.dispose();
};`;

export const previewCodeById = {
  handbookPart1Module1Preview: previewCodeVanilla,
  handbookPart1Module2Preview: previewCodeVanilla,
  handbookPart2Module1Preview: previewCodeVanilla,
  handbookPart2Module2Preview: previewCodeP5,
  handbookPart2Module3Preview: previewCodeThree,
  handbookPart3Module1Preview: previewCodeVanilla,
  handbookPart3Module2Preview: previewCodeP5,
  handbookPart3Module3Preview: previewCodeThree,
  landingPart1Preview: previewCodeVanilla,
  landingPart2Preview: previewCodeP5,
  landingPart3Preview: previewCodeThree,
  landingBoringPracticePreview: previewCodeVanilla,
  landingBoringLibrariesPreview: previewCodeP5,
  landingBoringPortfolioPreview: previewCodeThree,
  landingBoringGalleryPreview: previewCodeVanilla,
};

export const sandboxCodeByRuntime = {
  vanilla: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let animationId;

let speedFactor = 1;
let targetSpeedFactor = 1;
let virtualTime = 0;
let lastTime = 0;

app.innerHTML = "";
app.style.width = "100%";
app.style.height = "100%";
app.style.background = "#ffffff";

app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
}

function drawBackground() {
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;

  for (let x = 0; x < canvas.width; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y < canvas.height; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function animate(time) {
  const deltaTime = time - lastTime;
  lastTime = time;

  speedFactor += (targetSpeedFactor - speedFactor) * Math.min(deltaTime / 2000, 1);
  virtualTime += deltaTime * speedFactor;

  drawBackground();

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const orbit = Math.min(canvas.width, canvas.height) * 0.25;
  const x = centerX + Math.cos(virtualTime * 0.002 + Math.PI) * orbit;
  const y = centerY + Math.sin(virtualTime * 0.002 + Math.PI) * orbit;

  ctx.fillStyle = "#2fd3e6";
  ctx.beginPath();
  ctx.arc(centerX, centerY, 72, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ff86db";
  ctx.fillRect(x - 36, y - 36, 72, 72);

  animationId = requestAnimationFrame(animate);
}

function pauseAnimation() {
  targetSpeedFactor = 0;
}

function playAnimation() {
  targetSpeedFactor = 1;
}

canvas.addEventListener("mouseenter", pauseAnimation);
canvas.addEventListener("mouseleave", playAnimation);
window.addEventListener("resize", resize);

resize();
animate(0);

return () => {
  cancelAnimationFrame(animationId);
  canvas.removeEventListener("mouseenter", pauseAnimation);
  canvas.removeEventListener("mouseleave", playAnimation);
  window.removeEventListener("resize", resize);
};`,

  p5: `let speedFactor = 1;
let targetSpeedFactor = 1;
let virtualFrame = 0;

function setup() {
  const app = document.getElementById("app");
  const canvas = createCanvas(app.clientWidth, app.clientHeight);
  canvas.mouseOver(() => targetSpeedFactor = 0);
  canvas.mouseOut(() => targetSpeedFactor = 1);

  noStroke();
}

function windowResized() {
  const app = document.getElementById("app");
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function drawGrid() {
  stroke("#e5e7eb");
  strokeWeight(1);

  for (let x = 0; x < width; x += 32) {
    line(x, 0, x, height);
  }

  for (let y = 0; y < height; y += 32) {
    line(0, y, width, y);
  }

  noStroke();
}

function draw() {
  speedFactor += (targetSpeedFactor - speedFactor) * (deltaTime / 2000);
  virtualFrame += speedFactor;

  background(248);
  drawGrid();

  const orbit = min(width, height) * 0.25;
  const x = width / 2 + cos(virtualFrame * 0.03 + PI) * orbit;
  const y = height / 2 + sin(virtualFrame * 0.03 + PI) * orbit;

  fill("#2fd3e6");
  ellipse(width / 2, height / 2, 144);

  fill("#ff86db");
  rectMode(CENTER);
  rect(x, y, 72, 72, 16);
}`,

  three: `const width = app.clientWidth;
const height = app.clientHeight;

let speedFactor = 1;
let targetSpeedFactor = 1;
let lastTime = 0;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 4 * Math.max(width / height, height / width);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

const group = new THREE.Group();
scene.add(group);

const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const cubeMaterial = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -0.9;
group.add(cube);

const sphereGeometry = new THREE.SphereGeometry(0.55, 32, 32);
const sphereMaterial = new THREE.MeshNormalMaterial();
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 0.5;
group.add(sphere);

function onResize() {
  const width = app.clientWidth;
  const height = app.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function pauseAnimation() {
  targetSpeedFactor = 0;
}

function playAnimation() {
  targetSpeedFactor = 1;
}

window.addEventListener("resize", onResize);
renderer.domElement.addEventListener("mouseenter", pauseAnimation);
renderer.domElement.addEventListener("mouseleave", playAnimation);

let animationId;

function animate(time) {
  const deltaTime = time - lastTime;
  lastTime = time;

  speedFactor += (targetSpeedFactor - speedFactor) * Math.min(deltaTime / 2000, 1);

  cube.rotation.x += 0.01 * speedFactor;
  cube.rotation.y += 0.02 * speedFactor;
  sphere.rotation.y -= 0.015 * speedFactor;
  group.rotation.y += 0.006 * speedFactor;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate(0);

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);
  renderer.domElement.removeEventListener("mouseenter", pauseAnimation);
  renderer.domElement.removeEventListener("mouseleave", playAnimation);

  cubeGeometry.dispose();
  cubeMaterial.dispose();
  sphereGeometry.dispose();
  sphereMaterial.dispose();
  renderer.dispose();
};`,
};

export const sandboxEmptyCodeByRuntime = {
  vanilla: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

app.innerHTML = "";
app.style.width = "100%";
app.style.height = "100%";
app.style.background = "#ffffff";

app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
  draw();
}

function draw() {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", resize);
resize();

return () => {
  window.removeEventListener("resize", resize);
};`,

  p5: `function setup() {
  const app = document.getElementById("app");
  createCanvas(app.clientWidth, app.clientHeight);
}

function windowResized() {
  const app = document.getElementById("app");
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background(255);
}`,

  three: `const width = app.clientWidth;
const height = app.clientHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

function onResize() {
  const width = app.clientWidth;
  const height = app.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener("resize", onResize);
renderer.render(scene, camera);

return () => {
  window.removeEventListener("resize", onResize);
  renderer.dispose();
};`,
};

export const sandboxCodeById = {
  sandboxTestWindowSize: `// Диагностика размеров в p5.
// createCanvas(app.clientWidth, app.clientHeight) берёт размер видимой области песочницы.
// Этот скетч выводит несколько вариантов, чтобы можно было проверить размеры.

function setup() {
  const app = document.getElementById('app');
  createCanvas(app.clientWidth, app.clientHeight);
  textFont('monospace');
  textSize(15);
  noLoop();
}

function windowResized() {
  const app = document.getElementById('app');
  resizeCanvas(app.clientWidth, app.clientHeight);
  redraw();
}

function formatSize(name, w, h) {
  return name + ': ' + round(w || 0) + ', ' + round(h || 0);
}

function draw() {
  const app = document.getElementById('app');
  const appRect = app.getBoundingClientRect();
  const parent = app.parentElement;
  const parentRect = parent ? parent.getBoundingClientRect() : null;
  const root = document.documentElement;
  const body = document.body;
  const visual = window.visualViewport;
    const canvas = document.querySelector('canvas');

  const rows = [
    'Проверь значения для createCanvas(width, height):',
    formatSize('(windowWidth, windowHeight)', windowWidth, windowHeight),
    formatSize('(window.innerWidth, window.innerHeight)', window.innerWidth, window.innerHeight),
    formatSize('(document.documentElement.clientWidth, document.documentElement.clientHeight)', root.clientWidth, root.clientHeight),
    formatSize('(document.body.clientWidth, document.body.clientHeight)', body.clientWidth, body.clientHeight),
    formatSize('(app.clientWidth, app.clientHeight)', app.clientWidth, app.clientHeight),
    formatSize('(app.offsetWidth, app.offsetHeight)', app.offsetWidth, app.offsetHeight),
    formatSize('(app.getBoundingClientRect().width, app.getBoundingClientRect().height)', appRect.width, appRect.height),
    parentRect ? formatSize('(app.parentElement rect width, height)', parentRect.width, parentRect.height) : 'app.parentElement: нет',
    visual ? formatSize('(visualViewport.width, visualViewport.height)', visual.width, visual.height) : 'visualViewport: нет',
    formatSize('(screen.width, screen.height)', screen.width, screen.height),
    '',
    'Фактический canvas сейчас:',
    formatSize('(p5 width, height)', width, height),
    canvas ? formatSize('(canvas.width, canvas.height)', canvas.width, canvas.height) : 'canvas: не найден',
    canvas ? formatSize('(canvas.clientWidth, canvas.clientHeight)', canvas.clientWidth, canvas.clientHeight) : 'canvas.client: не найден'
  ];

  background(255);
  fill('#111827');
  noStroke();
  textLeading(22);
  text(rows.join('\\n'), 20, 32);
}`,
};

export const defaultCodeById = {
  patr1module1tutorial1code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight); // создаём холст размера окна
  // но можно указывать просто числа
  noStroke();
}

function draw() {
  background(248);

  let step = width  / 6; // 6 шаров в сетке

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {

      fill('#2fd3e6');
      // ellipse(x, y, step); // это рисовало бы без сдвига
      ellipse(x + step / 2, y + step / 2, step);

    }
  }

  noLoop();
}`,
  patr1module1tutorial1code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = width / 6;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {

      let size = step + random(-10, 10);

      fill('#ff86db');
      ellipse(x + step / 2, y + step / 2, size);

    }
  }

  noLoop();
}`,
  patr1module1tutorial1code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = width / 7;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {

      // базовый вариант
      let size = step;

      // попробуй раскомментировать:
      // size = step * (x / width);
      // size = step * (y / height);
      // size = step * (x / width) * (y / height);
      // size = step * random();

      fill('#37e87a');
      ellipse(x + step / 2, y + step / 2, size);

    }
  }

  noLoop();
}`,
  patr1module1tutorial2code1: `let x = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  fill('#2fd3e6');
  ellipse(x, height / 2, 80);

  x += 2;
}`,
  patr1module1tutorial2code2: `let x = 0;
let speed = 7;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  fill('#ff86db');
  ellipse(x, height / 2, 80);

  x += speed;
}`,
  patr1module1tutorial2code3: `let x = 0;
let speed = 2;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let y = height / 2;

  // попробуй раскомментировать:
  // y = mouseY;
  // y = height / 2 + sin(frameCount * 0.05) * 100;

  fill('#37e87a');
  ellipse(x, y, 80);

  x += speed;

  // попробуй:
  // speed = 1;
  // speed = random(1, 5);
}`,
  patr1module1tutorial3code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = min(width, height) / 6;
  let size = step * 0.72;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      fill('#ffc300');
      ellipse(x + step / 2, y + step / 2, size);
    }
  }

  noLoop();
}`,
  patr1module1tutorial3code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = min(width, height) / 6;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      let cx = x + step / 2;
      let cy = y + step / 2;

      fill('#cfcfcf'); // светло-серый фон формы
      rect(cx - step * 0.28, cy - step * 0.28, step * 0.56, step * 0.56);

      fill('#4a4a4a'); // тёмный акцент
      ellipse(cx, cy, step * 0.42);
    }
  }

  noLoop();
}`,
  patr1module1tutorial3code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = min(width, height) / 6;
  let size = step * 0.55;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      let cx = x + step / 2;
      let cy = y + step / 2;

      fill('#37e87a');

      // базовый вариант
      ellipse(cx, cy, size);

      // попробуй раскомментировать:
      // rect(cx - size / 2, cy - size / 2, size, size);
      // ellipse(cx, cy, size * (x / width));
      // ellipse(cx, cy, size * (y / height));
      // fill('#ff86db');
    }
  }

  noLoop();
}`,
  patr1module2tutorial1code1: `const app = document.getElementById("app");
app.innerHTML = "";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = app.clientWidth;
canvas.height = app.clientHeight;
app.appendChild(canvas);

let step = canvas.width / 6;
let size = step * 0.6;

for (let y = 0; y < canvas.height; y += step) {
  for (let x = 0; x < canvas.width; x += step) {
    ctx.fillStyle = "#2c2c2c";
    ctx.beginPath();
    ctx.arc(x + step / 2, y + step / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}`,
  patr1module2tutorial1code2: `const app = document.getElementById("app");
app.innerHTML = "";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = app.clientWidth;
canvas.height = app.clientHeight;
app.appendChild(canvas);

let step = canvas.width / 6;
let size = step * 0.6;

for (let y = 0; y < canvas.height; y += step) {
  for (let x = 0; x < canvas.width; x += step) {
    if (x < canvas.width / 2) {
      ctx.fillStyle = "#bdbdbd";
    } else {
      ctx.fillStyle = "#2c2c2c";
    }

    ctx.beginPath();
    ctx.arc(x + step / 2, y + step / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}`,
  patr1module2tutorial1code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = width / 6;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      fill('#2c2c2c');
      ellipse(x + step / 2, y + step / 2, step * 0.6);
    }
  }

  noLoop();
}`,
  patr1module2tutorial1code4: `const app = document.getElementById("app");
app.innerHTML = "";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = app.clientWidth;
canvas.height = app.clientHeight;
app.appendChild(canvas);

let step = canvas.width / 6;

for (let y = 0; y < canvas.height; y += step) {
  for (let x = 0; x < canvas.width; x += step) {
    ctx.fillStyle = "#2c2c2c";
    ctx.beginPath();
    ctx.arc(x + step / 2, y + step / 2, (step * 0.6) / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}`,
  patr1module2tutorial1code5: `const app = document.getElementById("app");
app.innerHTML = "";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = app.clientWidth;
canvas.height = app.clientHeight;
app.appendChild(canvas);

let step = canvas.width / 6;
let baseSize = step * 0.6;

for (let y = 0; y < canvas.height; y += step) {
  for (let x = 0; x < canvas.width; x += step) {
    let size = baseSize;
    ctx.fillStyle = "#2c2c2c";

    // попробуй раскомментировать:

    // if (y < canvas.height / 2) {
    //   ctx.fillStyle = "#858585";
    // }

    // if ((x + y) % (step * 2) === 0) {
    //   ctx.fillStyle = "#cfcfcf";
    // }

    // if (x > canvas.width / 2) {
    //   size = step * 0.3;
    // }

    ctx.beginPath();
    ctx.arc(x + step / 2, y + step / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}`,
  patr1module2tutorial2code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = width / 6;
  let size = step * 0.65;
  let y = height / 2;

  for (let x = 0; x < width; x += step) {
    fill('#2fd3e6');
    ellipse(x + step / 2, y, size);
  }

  noLoop();
}`,
  patr1module2tutorial2code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = min(width, height) / 6;
  let size = step * 0.62;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      fill('#1f1f1f');
      ellipse(x + step / 2, y + step / 2, size);
    }
  }

  noLoop();
}`,
  patr1module2tutorial2code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = min(width, height) / 6;
  let size = step * 0.62;

  // попробуй раскомментировать:
  // step = width / 8;
  // size = step * 0.4;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      let currentSize = size;

      // попробуй раскомментировать:
      // if (x > width / 2) {
      //   currentSize = step * 0.28;
      // }

      fill('#858585');
      ellipse(x + step / 2, y + step / 2, currentSize);
    }
  }

  noLoop();
}`,
  patr1module2tutorial3code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

let items = [];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);

  for (let i = 0; i < 20; i++) {
    items.push({
      x: random(width),
      y: random(height),
      size: 40
    });
  }
}

function draw() {
  background(248);

  for (let item of items) {
    fill('#2c2c2c');
    ellipse(item.x, item.y, item.size);
  }

  noLoop();
}`,
  patr1module2tutorial3code2: `let items = [];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();

  for (let i = 0; i < 25; i++) {
    items.push({
      x: random(width),
      y: random(height),
      size: random(20, 80)
    });
  }
}

function draw() {
  background(248);

  for (let item of items) {
    fill('#858585');
    ellipse(item.x, item.y, item.size);
  }

  noLoop();
}`,
  patr1module2tutorial3code3: `let items = [];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();

  for (let i = 0; i < 30; i++) {
    items.push({
      x: random(width),
      y: random(height),
      size: random(20, 60),
      color: '#2c2c2c'
    });
  }
}

function draw() {
  background(248);

  for (let item of items) {

    // попробуй раскомментировать:

    // item.size = random(10, 80);
    // item.color = random(['#2c2c2c', '#858585', '#cfcfcf']);

    fill(item.color);
    ellipse(item.x, item.y, item.size);
  }

  noLoop();
}`,
  patr1module2tutorial4code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = width / 6;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {

      let size = random(step * 0.3, step * 0.9);

      fill('#2c2c2c');
      ellipse(x + step / 2, y + step / 2, size);
    }
  }

  noLoop();
}`,
  patr1module2tutorial4code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = width / 6;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {

      let offsetX = random(-step * 0.3, step * 0.3);
      let offsetY = random(-step * 0.3, step * 0.3);

      fill('#858585');
      ellipse(
        x + step / 2 + offsetX,
        y + step / 2 + offsetY,
        step * 0.6
      );
    }
  }

  noLoop();
}`,
  patr1module2tutorial4code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = width / 6;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {

      if (random() > 0.5) {
        fill('#2c2c2c');
        ellipse(x + step / 2, y + step / 2, step * 0.6);
      } else {
        fill('#cfcfcf');
        rect(
          x + step * 0.2,
          y + step * 0.2,
          step * 0.6,
          step * 0.6
        );
      }

    }
  }

  noLoop();
}`,
  patr1module2tutorial4code4: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = width / 6;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {

      let size = step * 0.6;

      // попробуй раскомментировать:

      // size = random(step * 0.3, step * 0.9);

      // let offset = random(-20, 20);
      // x += offset;
      // y += offset;

      // if (random() > 0.5) {
      //   fill('#2c2c2c');
      // } else {
      //   fill('#cfcfcf');
      // }

      fill('#2c2c2c');
      ellipse(x + step / 2, y + step / 2, size);
    }
  }

  noLoop();
}`,
  patr1module2tutorial5code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = width / 8;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      fill('#d9d9d9');
      ellipse(x + step / 2, y + step / 2, step * 0.5);
    }
  }

  noLoop();
}`,
  patr1module2tutorial5code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = width / 8;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {

      let cx = x + step / 2;
      let cy = y + step / 2;

      fill('#e6e6e6');
      rect(cx - step * 0.25, cy - step * 0.25, step * 0.5, step * 0.5);

      fill('#2c2c2c');
      ellipse(cx, cy, step * 0.3);
    }
  }

  noLoop();
}`,
  patr1module2tutorial5code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = width / 8;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {

      let cx = x + step / 2;
      let cy = y + step / 2;

      if ((x + y) % (step * 2) === 0) {
        fill('#2c2c2c');
        ellipse(cx, cy, step * 0.5);
      } else {
        fill('#bdbdbd');
        rect(cx - step * 0.25, cy - step * 0.25, step * 0.5, step * 0.5);
      }

    }
  }

  noLoop();
}`,
  patr1module2tutorial5code4: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = width / 8;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {

      let cx = x + step / 2;
      let cy = y + step / 2;

      // попробуй раскомментировать:

      // if (x % (step * 2) === 0) {
      //   fill('#2c2c2c');
      // } else {
      //   fill('#cfcfcf');
      // }

      // if (y % (step * 2) === 0) {
      //   ellipse(cx, cy, step * 0.5);
      // } else {
      //   rect(cx - step * 0.25, cy - step * 0.25, step * 0.5, step * 0.5);
      // }

      fill('#858585');
      ellipse(cx, cy, step * 0.5);

    }
  }

  noLoop();
}`,
  patr2module1tutorial1code1: `const app = document.getElementById("app");
app.innerHTML = "";
app.style.position = "relative";
app.style.background = "#f8f8f8";
app.style.overflow = "hidden";

const count = 8;
const blocks = [];

for (let i = 0; i < count; i++) {
  const block = document.createElement("div");
  block.style.position = "absolute";
  block.style.width = "48px";
  block.style.height = "48px";
  block.style.borderRadius = "999px";
  block.style.background = i % 2 === 0 ? "#1f1f1f" : "#cfcfcf";
  block.style.left = 40 + i * 56 + "px";
  block.style.top = "50%";
  block.style.transform = "translateY(-50%)";
  block.style.transition = "opacity 0.4s ease";
  app.appendChild(block);
  blocks.push(block);
}

setTimeout(() => {
  for (const block of blocks) {
    block.style.opacity = "0";
  }
}, 700);

setTimeout(() => {
  for (const block of blocks) {
    block.remove();
  }
}, 1200);`,
  patr2module1tutorial1code2: `let circles = [];
let timer = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  if (frameCount % 12 === 0 && circles.length < 12) {
    circles.push({
      x: 60 + circles.length * 56,
      y: height / 2,
      size: 42
    });
  }

  for (let circle of circles) {
    fill('#1f1f1f');
    ellipse(circle.x, circle.y, circle.size);
  }

  timer++;

  if (timer > 120) {
    circles = [];
    timer = 0;
  }
}`,
  patr2module1tutorial1code3: `const app = document.getElementById("app");
app.innerHTML = "";
app.style.position = "relative";
app.style.background = "#f8f8f8";
app.style.overflow = "hidden";

const count = 7;
// попробуй раскомментировать:
// const count = 12;

const blocks = [];

for (let i = 0; i < count; i++) {
  const block = document.createElement("div");
  block.style.position = "absolute";
  block.style.width = "44px";
  block.style.height = "44px";
  block.style.borderRadius = "12px";
  block.style.background = "#858585";

  // попробуй раскомментировать:
  // block.style.borderRadius = "999px";
  // block.style.background = i % 2 === 0 ? "#1f1f1f" : "#d6d6d6";

  block.style.left = 36 + i * 52 + "px";
  block.style.top = "50%";
  block.style.transform = "translateY(-50%)";

  app.appendChild(block);
  blocks.push(block);
}

setTimeout(() => {
  for (const block of blocks) {
    // попробуй раскомментировать:
    // block.style.transform = "translateY(-50%) scale(0.6)";
    block.style.opacity = "0";
  }
}, 700);

setTimeout(() => {
  app.innerHTML = "";
}, 1200);`,
  patr2module1tutorial2code1: `(function () {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.style.position = "relative";
  app.style.background = "#f8f8f8";
  app.style.overflow = "hidden";

  const cardsCount = 5;

  for (let i = 0; i < cardsCount; i++) {
    const card = document.createElement("div");

    const offsetX = i * 36 - 72;
    const offsetY = i * 8;
    const angle = i * 6 - 12;

    card.style.position = "absolute";
    card.style.width = "140px";
    card.style.height = "180px";
    card.style.left = "50%";
    card.style.top = "50%";
    card.style.borderRadius = "24px";
    card.style.background = i % 2 === 0 ? "#ffffff" : "#d6d6d6";
    card.style.boxShadow = "0 12px 32px rgba(31, 31, 31, 0.12)";
    card.style.transform =
      "translate(calc(-50% + " + offsetX + "px), calc(-50% + " + offsetY + "px)) rotate(" + angle + "deg)";
    card.style.transition = "transform 0.3s ease";

    card.addEventListener("mouseenter", () => {
      card.style.transform =
        "translate(calc(-50% + " + offsetX + "px), calc(-50% + " + offsetY + "px)) rotate(" + angle + "deg) scale(1.05)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "translate(calc(-50% + " + offsetX + "px), calc(-50% + " + offsetY + "px)) rotate(" + angle + "deg)";
    });

    app.appendChild(card);
  }
})()`,
  patr2module1tutorial2code2: `const app = document.getElementById("app");
app.innerHTML = "";
app.style.position = "relative";
app.style.background = "#f8f8f8";

const card = document.createElement("div");
card.style.position = "absolute";
card.style.width = "140px";
card.style.height = "180px";
card.style.left = "50%";
card.style.top = "50%";
card.style.transform = "translate(-50%, -50%)";
card.style.borderRadius = "24px";
card.style.background = "#ffffff";
card.style.boxShadow = "0 12px 32px rgba(31, 31, 31, 0.12)";

app.appendChild(card);`,
  patr2module1tutorial2code3: `const app = document.getElementById("app");
app.innerHTML = "";
app.style.position = "relative";
app.style.background = "#f8f8f8";
app.style.overflow = "hidden";

const cardsCount = 5;

for (let i = 0; i < cardsCount; i++) {
  const card = document.createElement("div");

  card.style.position = "absolute";
  card.style.width = "140px";
  card.style.height = "180px";
  card.style.left = "50%";
  card.style.top = "50%";
  card.style.boxShadow = "0 12px 32px rgba(31, 31, 31, 0.12)";
  card.style.borderRadius = "24px";
  card.style.background = "#d6d6d6";
  card.style.transform = \`translate(calc(-50% + \${i * 36 - 72}px), calc(-50% + \${i * 8}px))\`;

  app.appendChild(card);
}`,
  patr2module1tutorial2code4: `const app = document.getElementById("app");
app.innerHTML = "";
app.style.position = "relative";
app.style.background = "#f8f8f8";
app.style.overflow = "hidden";

const cardsCount = 5;

for (let i = 0; i < cardsCount; i++) {
  const card = document.createElement("div");

  card.style.position = "absolute";
  card.style.width = "140px";
  card.style.height = "180px";
  card.style.left = "50%";
  card.style.top = "50%";
  card.style.borderRadius = "24px";
  card.style.background = i % 2 === 0 ? "#ffffff" : "#d6d6d6";
  card.style.boxShadow = "0 12px 32px rgba(31, 31, 31, 0.12)";
  card.style.transform = \`translate(calc(-50% + \${i * 36 - 72}px), calc(-50% + \${i * 8}px)) rotate(\${i * 6 - 12}deg)\`;
  card.style.transition = "transform 0.3s ease";

  card.addEventListener("mouseenter", () => {
    card.style.transform = \`translate(calc(-50% + \${i * 36 - 72}px), calc(-50% + \${i * 8}px)) rotate(\${i * 6 - 12}deg) scale(1.05)\`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = \`translate(calc(-50% + \${i * 36 - 72}px), calc(-50% + \${i * 8}px)) rotate(\${i * 6 - 12}deg)\`;
  });

  app.appendChild(card);
}`,
  patr2module1tutorial2code5: `(function () {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.style.position = "relative";
  app.style.background = "#f8f8f8";
  app.style.overflow = "hidden";

  const cardsCount = 5;

  for (let i = 0; i < cardsCount; i++) {
    const card = document.createElement("div");

    card.style.position = "absolute";
    card.style.width = "140px";
    card.style.height = "180px";
    card.style.left = "50%";
    card.style.top = "50%";
    card.style.borderRadius = "24px";
    card.style.background = "#858585";
    card.style.boxShadow = "0 12px 32px rgba(31, 31, 31, 0.12)";
    card.style.transition = "transform 0.3s ease, background 0.3s ease";

    let offsetX = i * 32 - 64;
    let offsetY = i * 10;
    let angle = i * 5 - 10;

    // попробуй раскомментировать:
    // angle = i * 10 - 20;
    // offsetX = i * 24 - 48;
    // card.style.background = i % 2 === 0 ? "#ffffff" : "#f8f8f8";

    card.style.transform = \`translate(calc(-50% + \${offsetX}px), calc(-50% + \${offsetY}px)) rotate(\${angle}deg)\`;

    card.addEventListener("mouseenter", () => {
      // попробуй раскомментировать:
      // card.style.background = "#ffffff";
      // card.style.transform = \`translate(calc(-50% + \${offsetX}px), calc(-50% + \${offsetY}px)) rotate(\${angle}deg) scale(1.08)\`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = \`translate(calc(-50% + \${offsetX}px), calc(-50% + \${offsetY}px)) rotate(\${angle}deg)\`;
    });

    app.appendChild(card);
  }
})()`,
  patr2module1tutorial3code1: `(function () {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.style.position = "relative";
  app.style.background = "#f8f8f8";
  app.style.overflow = "hidden";
  app.style.cursor = "pointer";

  const ball = document.createElement("div");
  ball.style.position = "absolute";
  ball.style.width = "64px";
  ball.style.height = "64px";
  ball.style.left = "50%";
  ball.style.top = "50%";
  ball.style.borderRadius = "999px";
  ball.style.background = "#1f1f1f";
  ball.style.transform = "translate(-50%, -50%)";
  ball.style.transition = "left 0.4s ease, top 0.4s ease";

  app.appendChild(ball);

  app.addEventListener("click", (event) => {
    const rect = app.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ball.style.left = x + "px";
    ball.style.top = y + "px";
  });
})();`,
  patr2module1tutorial3code2: `(function () {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.style.position = "relative";
  app.style.background = "#f8f8f8";
  app.style.overflow = "hidden";
  app.style.cursor = "pointer";

  const ball = document.createElement("div");
  ball.style.position = "absolute";
  ball.style.width = "64px";
  ball.style.height = "64px";
  ball.style.left = "50%";
  ball.style.top = "50%";
  ball.style.borderRadius = "999px";
  ball.style.background = "#858585";
  ball.style.transform = "translate(-50%, -50%) scale(1)";
  ball.style.transition = "left 0.45s ease, top 0.45s ease, transform 0.25s ease, background 0.25s ease";

  app.appendChild(ball);

  app.addEventListener("click", (event) => {
    const rect = app.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ball.style.left = x + "px";
    ball.style.top = y + "px";
    ball.style.background = "#1f1f1f";
    ball.style.transform = "translate(-50%, -50%) scale(1.18)";

    setTimeout(() => {
      ball.style.background = "#858585";
      ball.style.transform = "translate(-50%, -50%) scale(1)";
    }, 220);
  });
})();`,
  patr2module1tutorial3code3: `(function () {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.style.position = "relative";
  app.style.background = "#f8f8f8";
  app.style.overflow = "hidden";
  app.style.cursor = "pointer";

  const ball = document.createElement("div");
  ball.style.position = "absolute";
  ball.style.width = "64px";
  ball.style.height = "64px";
  ball.style.left = "50%";
  ball.style.top = "50%";
  ball.style.borderRadius = "999px";
  ball.style.background = "#858585";
  ball.style.transform = "translate(-50%, -50%) scale(1)";
  ball.style.transition = "left 0.45s ease, top 0.45s ease, transform 0.25s ease, background 0.25s ease";

  // попробуй раскомментировать:
  // ball.style.transition = "left 0.2s ease, top 0.2s ease, transform 0.2s ease, background 0.2s ease";
  // ball.style.borderRadius = "18px";

  app.appendChild(ball);

  app.addEventListener("click", (event) => {
    const rect = app.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ball.style.left = x + "px";
    ball.style.top = y + "px";
    ball.style.background = "#1f1f1f";
    ball.style.transform = "translate(-50%, -50%) scale(1.18)";

    // попробуй раскомментировать:
    // ball.style.transform = "translate(-50%, -50%) rotate(18deg) scale(1.12)";
    // ball.style.background = "#d6d6d6";

    setTimeout(() => {
      ball.style.background = "#858585";
      ball.style.transform = "translate(-50%, -50%) scale(1)";
    }, 220);
  });
})();`,
  patr2module2tutorial1code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let x = width / 2 + sin(frameCount * 0.05) * 90;
  let y = height / 2;

  fill(30);
  ellipse(x, y, 80);
}`,
  patr2module2tutorial1code2: `(function () {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.style.position = "relative";
  app.style.background = "#f8f8f8";
  app.style.overflow = "hidden";

  const ball = document.createElement("div");
  ball.style.position = "absolute";
  ball.style.width = "80px";
  ball.style.height = "80px";
  ball.style.borderRadius = "999px";
  ball.style.background = "#1f1f1f";

  app.appendChild(ball);

  let t = 0;

  function draw() {
    const x = app.clientWidth / 2 + Math.sin(t) * 90;
    const y = app.clientHeight / 2;

    ball.style.left = x + "px";
    ball.style.top = y + "px";
    ball.style.transform = "translate(-50%, -50%)";

    t += 0.05;

    requestAnimationFrame(draw);
  }

  draw();
})();`,
  patr2module2tutorial1code3: `(function () {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.style.position = "relative";
  app.style.background = "#f8f8f8";
  app.style.overflow = "hidden";

  const style = document.createElement("style");
  style.innerHTML = \`
    @keyframes move {
      0% { transform: translate(-50%, -50%) translateX(-90px); }
      50% { transform: translate(-50%, -50%) translateX(90px); }
      100% { transform: translate(-50%, -50%) translateX(-90px); }
    }
  \`;
  document.head.appendChild(style);

  const ball = document.createElement("div");
  ball.style.position = "absolute";
  ball.style.left = "50%";
  ball.style.top = "50%";
  ball.style.width = "80px";
  ball.style.height = "80px";
  ball.style.borderRadius = "999px";
  ball.style.background = "#1f1f1f";
  ball.style.animation = "move 2s ease-in-out infinite";

  app.appendChild(ball);
})();`,
  patr2module2tutorial1code4: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let x = width / 2 + sin(frameCount * 0.05) * 90;
  let y = height / 2;

  fill(30);
  ellipse(x, y, 80);
}`,
  patr2module2tutorial2code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let size = map(mouseX, 0, width, 20, 200);

  fill(30);
  ellipse(mouseX, mouseY, size);
}`,
  patr2module2tutorial2code2: `let isDark = true;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let size = map(mouseX, 0, width, 20, 200);

  fill(isDark ? 30 : 180);
  ellipse(mouseX, mouseY, size);
}

function keyPressed() {
  isDark = !isDark;
}`,
  patr2module2tutorial2code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

let isDark = true;

function draw() {
  background(248);

  let size = map(mouseX, 0, width, 20, 200);

  // базовый цвет
  fill(30);

  // попробуй раскомментировать:

  // цвет зависит от позиции мыши
  // fill(mouseX / width * 255, mouseY / height * 255, 150);

  // цвет меняется по клавише
  // fill(isDark ? 30 : 180);

  ellipse(mouseX, mouseY, size);

  // эффект "следа"
  // background(248, 20);
}

function keyPressed() {
  // переключение цвета
  isDark = !isDark;
}

function mousePressed() {
  // при клике появляется круг фиксированного размера
  // fill(255, 100, 100);
  // ellipse(mouseX, mouseY, 40);
}`,
  patr2module2tutorial3code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = min(width, height) / 10;
  let size = step * 0.42;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      let offsetX = sin(y * 0.04 + frameCount * 0.04) * step * 0.35;
      let offsetY = cos(x * 0.04 + frameCount * 0.03) * step * 0.2;

      fill(31);
      ellipse(
        x + step / 2 + offsetX,
        y + step / 2 + offsetY,
        size
      );
    }
  }
}`,
  patr2module2tutorial3code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = min(width, height) / 10;
  let size = step * 0.42;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      fill(140);
      ellipse(
        x + step / 2,
        y + step / 2,
        size
      );
    }
  }
}`,
  patr2module2tutorial3code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = min(width, height) / 10;
  let size = step * 0.42;

  for (let y = 0; y < height; y += step) {
    let offsetX = sin(y * 0.04 + frameCount * 0.04) * step * 0.35;

    for (let x = 0; x < width; x += step) {
      fill(90);
      ellipse(
        x + step / 2 + offsetX,
        y + step / 2,
        size
      );
    }
  }
}`,
  patr2module2tutorial3code4: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = min(width, height) / 10;
  let size = step * 0.42;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      // сначала смещаем строку по горизонтали
      let offsetX = sin(y * 0.04 + frameCount * 0.04) * step * 0.35;

      // потом добавляем более тонкое смещение по вертикали
      let offsetY = cos(x * 0.04 + frameCount * 0.03) * step * 0.2;

      fill(50);
      ellipse(
        x + step / 2 + offsetX,
        y + step / 2 + offsetY,
        size
      );
    }
  }
}`,
  patr2module2tutorial3code5: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = min(width, height) / 10;
  let size = step * 0.42;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      let offsetX = sin(y * 0.04 + frameCount * 0.04) * step * 0.35;
      let offsetY = cos(x * 0.04 + frameCount * 0.03) * step * 0.2;
      let currentSize = size;

      // попробуй раскомментировать:

      // сделать вертикальное смещение сильнее
      // offsetY = cos(x * 0.04 + frameCount * 0.03) * step * 0.35;

      // менять размер элементов
      // currentSize = map(sin(x * 0.03 + frameCount * 0.05), -1, 1, step * 0.2, step * 0.6);

      // заменить круги на квадраты
      // rectMode(CENTER);

      fill(31);

      // для квадратов:
      // rect(
      //   x + step / 2 + offsetX,
      //   y + step / 2 + offsetY,
      //   currentSize,
      //   currentSize
      // );

      ellipse(
        x + step / 2 + offsetX,
        y + step / 2 + offsetY,
        currentSize
      );
    }
  }
}`,
  patr2module2tutorial4code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let x = width / 2 + sin(frameCount * 0.05) * 85;
  let y = height / 2;

  fill(31);
  ellipse(x, y, 84);
}`,
  patr2module2tutorial4code2: `(function () {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.style.position = "relative";
  app.style.background = "#f8f8f8";
  app.style.overflow = "hidden";

  const ball = document.createElement("div");
  ball.style.position = "absolute";
  ball.style.width = "84px";
  ball.style.height = "84px";
  ball.style.borderRadius = "999px";
  ball.style.background = "#1f1f1f";
  ball.style.top = "50%";
  ball.style.transform = "translate(-50%, -50%)";

  app.appendChild(ball);

  let t = 0;

  function animate() {
    const x = app.clientWidth / 2 + Math.sin(t) * 85;
    ball.style.left = x + "px";

    t += 0.05;
    requestAnimationFrame(animate);
  }

  animate();
})();`,
  patr2module2tutorial4code3: `(function () {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.style.position = "relative";
  app.style.background = "#f8f8f8";
  app.style.overflow = "hidden";

  const style = document.createElement("style");
  style.innerHTML = "@keyframes sway {" +
    "0% { transform: translate(-50%, -50%) translateX(-85px); }" +
    "50% { transform: translate(-50%, -50%) translateX(85px); }" +
    "100% { transform: translate(-50%, -50%) translateX(-85px); }" +
  "}";
  document.head.appendChild(style);

  const ball = document.createElement("div");
  ball.style.position = "absolute";
  ball.style.left = "50%";
  ball.style.top = "50%";
  ball.style.width = "84px";
  ball.style.height = "84px";
  ball.style.borderRadius = "999px";
  ball.style.background = "#1f1f1f";
  ball.style.animation = "sway 2.4s ease-in-out infinite";

  app.appendChild(ball);
})();`,
  patr2module2tutorial4code4: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let x = width / 2 + sin(frameCount * 0.05) * 130;
  let y = height / 2;
  let size = 84;

  // попробуй раскомментировать:

  // сделать движение спокойнее
  // x = width / 2 + sin(frameCount * 0.03) * 90;

  // сделать движение резче
  // x = width / 2 + sin(frameCount * 0.08) * 180;

  // добавить изменение размера
  // size = 84 + sin(frameCount * 0.06) * 28;

  // добавить вертикальное движение
  // y = height / 2 + cos(frameCount * 0.04) * 60;

  fill(31);
  ellipse(x, y, size);
}`,
  patr2module2tutorial5code1: `let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function draw() {
  background(248);

  let x = noise(t) * width;
  let y = height / 2;

  fill(31);
  ellipse(x, y, 84);

  t += 0.01;
}`,
  patr2module2tutorial5code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noFill();
  stroke(31);
  strokeWeight(3);
}

function draw() {
  background(248);

  beginShape();

  for (let x = 0; x <= width; x += 24) {
    let y = height / 2 + noise(x * 0.01) * 180 - 90;
    vertex(x, y);
  }

  endShape();
}`,
  patr2module2tutorial5code3: `let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noFill();
  stroke(31);
  strokeWeight(3);
}

function draw() {
  background(248);

  beginShape();

  for (let x = 0; x <= width; x += 24) {
    let y = height / 2 + noise(x * 0.01, t) * 180 - 90;
    vertex(x, y);
  }

  endShape();

  t += 0.01;
}`,
  patr2module2tutorial5code4: `let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noFill();
  stroke(31);
  strokeWeight(3);
}

function draw() {
  background(248);

  let step = 24;
  let amplitude = 180;

  // попробуй раскомментировать:

  // сделать линию плотнее
  // step = 12;

  // увеличить амплитуду
  // amplitude = 260;

  beginShape();

  // попробуй раскомментировать:
  // fill(31, 31, 31, 30);

  for (let x = 0; x <= width; x += step) {
    let y = height / 2 + noise(x * 0.01, t) * amplitude - amplitude / 2;
    vertex(x, y);
  }

  // попробуй раскомментировать:
  // vertex(width, height);
  // vertex(0, height);

  endShape();

  // попробуй изменить скорость:
  // t += 0.02;
  t += 0.01;
}`,
  patr2module3tutorial1code1: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 3;
camera.position.y = 0;
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// resize
function onResize() {
  const width = app.clientWidth;
  const height = app.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener("resize", onResize);

// анимация
let animationId;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);

  geometry.dispose();
  material.dispose();
  renderer.dispose();
};`,
  patr2module3tutorial1code2: `const width = app.clientWidth; // ширина области вывода
const height = app.clientHeight; // высота области вывода

const scene = new THREE.Scene(); // создаём 3D-сцену
scene.background = new THREE.Color(0xf8f8f8); // задаём цвет фона

const camera = new THREE.PerspectiveCamera(
  50, // угол обзора
  width / height, // соотношение сторон
  0.1, // ближняя плоскость отсечения
  1000 // дальняя плоскость отсечения
);

const renderer = new THREE.WebGLRenderer({ antialias: true }); // создаём рендерер
renderer.setSize(width, height); // подгоняем его под размер контейнера

app.innerHTML = ""; // очищаем прошлый результат
app.appendChild(renderer.domElement); // добавляем canvas в контейнер

renderer.render(scene, camera); // показываем сцену через камеру `,
  patr2module3tutorial1code3: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(
  50,
  width / height,
  0.1,
  1000
);
camera.position.z = 3;
camera.position.y = 0;
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// вывод
renderer.render(scene, camera); `,
  patr2module3tutorial1code4: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(
  50,
  width / height,
  0.1,
  1000
);
camera.position.z = 3;
camera.position.y = 0;
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// вывод
renderer.render(scene, camera); `,
  patr2module3tutorial1code5: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// попробуй раскомментировать:
// scene.background = new THREE.Color(0xe9e9e9);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 3;
camera.position.y = 0;
// попробуй поднять камеру
// camera.position.z = 3;
// camera.position.y = 0.2;

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// объект
let geometry = new THREE.BoxGeometry(1, 1, 1);

// попробуй раскомментировать:
// geometry = new THREE.SphereGeometry(0.8, 32, 32);

let material = new THREE.MeshNormalMaterial();

// попробуй раскомментировать:
// material = new THREE.MeshBasicMaterial({color: 0x1f1f1f });
// material = new THREE.MeshBasicMaterial({color: 0xbdbdbd, wireframe: true });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// resize
function onResize() {
  const width = app.clientWidth;
  const height = app.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener("resize", onResize);

// анимация
let animationId;

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  // попробуй раскомментировать:
  // mesh.rotation.x += 0.03;
  // mesh.rotation.y += 0.04;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);

  geometry.dispose();
  material.dispose();
  renderer.dispose();
}; `,
  patr2module3tutorial2code1: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 3;
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// анимация
let animationId;

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// вывод
renderer.render(scene, camera);`,
  patr2module3tutorial2code2: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 3;
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// объект
const geometry = new THREE.SphereGeometry(0.8, 32, 32);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// анимация
let animationId;

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// вывод
renderer.render(scene, camera);`,
  patr2module3tutorial2code3: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 3;
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x1f1f1f });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// анимация
let animationId;

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// вывод
renderer.render(scene, camera);`,
  patr2module3tutorial2code4: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 3;
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// объект
let geometry = new THREE.BoxGeometry(1, 1, 1);

// попробуй раскомментировать:
// geometry = new THREE.SphereGeometry(0.8, 32, 32);
// geometry = new THREE.CylinderGeometry(0.7, 0.7, 1.4, 32);

let material = new THREE.MeshBasicMaterial({ color: 0x1f1f1f });

// попробуй раскомментировать:
// material = new THREE.MeshBasicMaterial({ color: 0xbdbdbd });
// material = new THREE.MeshBasicMaterial({ color: 0x1f1f1f, wireframe: true });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// анимация
let animationId;

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// вывод
renderer.render(scene, camera);`,
  patr2module3tutorial3code1: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 3;
camera.position.y = 0;
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x858585 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// свет
const light = new THREE.DirectionalLight(0xffffff, 1.4);
light.position.set(2, 2, 3);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

// анимация
let animationId;

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);
  geometry.dispose();
  material.dispose();
  renderer.dispose();
};`,
  patr2module3tutorial3code2: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 3;
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x1f1f1f });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// анимация
let animationId;

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);
  geometry.dispose();
  material.dispose();
  renderer.dispose();
};`,
  patr2module3tutorial3code3: `<div class="U_FontC2-Code W_TutorialCopyItem">
  <p class="A_TutorialCopyText">
    const width = app.clientWidth;<br>
    const height = app.clientHeight;<br>
    <br>
    const scene = new THREE.Scene();<br>
    scene.background = new THREE.Color(0xf8f8f8);<br>
    <br>
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);<br>
    camera.position.z = 3;<br>
    camera.lookAt(0, 0, 0);<br>
    <br>
    const renderer = new THREE.WebGLRenderer({ antialias: true });<br>
    renderer.setSize(width, height);<br>
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));<br>
    <br>
    app.innerHTML = "";<br>
    app.appendChild(renderer.domElement);<br>
    <br>
    const geometry = new THREE.BoxGeometry(1, 1, 1);<br>
    const material = new THREE.MeshStandardMaterial({ color: 0x858585 });<br>
    const mesh = new THREE.Mesh(geometry, material);<br>
    scene.add(mesh);<br>
    <br>
    renderer.render(scene, camera);
  </p>
  <button class="U_ButtonIcon A_TutorialCopyButton">
    <img class="Q_TutorialCopyIcon" src="../../../../images/icons/copy.svg" alt="Копировать">
  </button>
</div>
`,
  patr2module3tutorial3code4: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 3;
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x858585 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// свет
const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(2, 2, 3);
scene.add(light);

// анимация
let animationId;

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);
  geometry.dispose();
  material.dispose();
  renderer.dispose();
};`,
  patr2module3tutorial3code5: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// попробуй раскомментировать:
// scene.background = new THREE.Color(0xe9e9e9);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 3;
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// объект
let geometry = new THREE.BoxGeometry(1, 1, 1);

// попробуй раскомментировать:
// geometry = new THREE.SphereGeometry(0.8, 32, 32);

let material = new THREE.MeshStandardMaterial({ color: 0x858585 });

// попробуй раскомментировать:
// material = new THREE.MeshStandardMaterial({ color: 0x1f1f1f });
// material = new THREE.MeshStandardMaterial({ color: 0xbdbdbd });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// свет
let light = new THREE.DirectionalLight(0xffffff, 1.2);

// попробуй раскомментировать:
// light = new THREE.DirectionalLight(0xffffff, 2);

light.position.set(2, 2, 3);
scene.add(light);

// попробуй раскомментировать:
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// анимация
let animationId;

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);
  geometry.dispose();
  material.dispose();
  renderer.dispose();
};`,
  patr2module3tutorial4code1: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.set(0, 2.2, 5);
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// свет
const light = new THREE.DirectionalLight(0xffffff, 1.4);
light.position.set(2, 3, 4);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// пол
const floorGeometry = new THREE.PlaneGeometry(8, 8);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xd6d6d6 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
scene.add(floor);

// куб
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x858585 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// анимация
let animationId;
let t = 0;

function animate() {
  t += 0.02;

  mesh.position.x = Math.sin(t) * 1.6;
  mesh.position.y = -0.2;
  mesh.rotation.y += 0.03;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);
  geometry.dispose();
  material.dispose();
  floorGeometry.dispose();
  floorMaterial.dispose();
  renderer.dispose();
};`,
  patr2module3tutorial4code2: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.set(2.2, 2.4, 4.2);
camera.lookAt(0, -0.2, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// свет
const light = new THREE.DirectionalLight(0xffffff, 1.4);
light.position.set(2, 3, 4);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// пол
const floorGeometry = new THREE.PlaneGeometry(8, 8);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xd6d6d6 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
scene.add(floor);

// куб
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x858585 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// анимация
let animationId;
let t = 0;

function animate() {
  t += 0.02;

  mesh.position.x = Math.sin(t) * 1.6;
  mesh.position.y = -0.2;
  mesh.rotation.y += 0.03;

  camera.lookAt(0, -0.2, 0);

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);
  geometry.dispose();
  material.dispose();
  floorGeometry.dispose();
  floorMaterial.dispose();
  renderer.dispose();
};`,
  patr2module3tutorial4code3: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// свет
const light = new THREE.DirectionalLight(0xffffff, 1.4);
light.position.set(2, 3, 4);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// пол
const floorGeometry = new THREE.PlaneGeometry(8, 8);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xd6d6d6 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
scene.add(floor);

// куб
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x858585 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// анимация
let animationId;
let t = 0;

function animate() {
  t += 0.02;

  mesh.position.x = Math.sin(t) * 1.6;
  mesh.position.y = -0.2;
  mesh.rotation.y += 0.03;

  camera.position.x = Math.cos(t * 0.6) * 4;
  camera.position.z = Math.sin(t * 0.6) * 4;
  camera.position.y = 2.2;
  camera.lookAt(0, -0.2, 0);

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);
  geometry.dispose();
  material.dispose();
  floorGeometry.dispose();
  floorMaterial.dispose();
  renderer.dispose();
};`,
  patr2module3tutorial4code4: `const width = app.clientWidth;
const height = app.clientHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.set(2.2, 2.2, 4.4);
camera.lookAt(0, -0.2, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1.4);
light.position.set(2, 3, 4);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const floorGeometry = new THREE.PlaneGeometry(8, 8);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xd6d6d6 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
scene.add(floor);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x858585 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let animationId;
let t = 0;

function animate() {
  t += 0.02;

  mesh.position.x = Math.sin(t) * 1.8;
  mesh.position.y = -0.2 + Math.abs(Math.sin(t * 2)) * 0.25;
  mesh.rotation.x += 0.02;
  mesh.rotation.y += 0.03;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

return () => {
  cancelAnimationFrame(animationId);
  geometry.dispose();
  material.dispose();
  floorGeometry.dispose();
  floorMaterial.dispose();
  renderer.dispose();
};`,
  patr2module3tutorial4code5: `const width = app.clientWidth;
const height = app.clientHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1.4);
light.position.set(2, 3, 4);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const floorGeometry = new THREE.PlaneGeometry(8, 8);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xd6d6d6 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
scene.add(floor);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x858585 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = -0.2;
scene.add(mesh);

let animationId;
let t = 0;

function animate() {
  t += 0.02;

  mesh.rotation.y += 0.01;

  camera.position.x = Math.cos(t * 0.7) * 4;
  camera.position.z = Math.sin(t * 0.7) * 4;
  camera.position.y = 2.1 + Math.sin(t * 0.4) * 0.3;
  camera.lookAt(0, -0.2, 0);

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

return () => {
  cancelAnimationFrame(animationId);
  geometry.dispose();
  material.dispose();
  floorGeometry.dispose();
  floorMaterial.dispose();
  renderer.dispose();
};`,
  patr2module3tutorial4code6: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// свет
const light = new THREE.DirectionalLight(0xffffff, 1.4);
light.position.set(2, 3, 4);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// пол
const floorGeometry = new THREE.PlaneGeometry(8, 8);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xd6d6d6 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
scene.add(floor);

// куб
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x858585 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// анимация
let animationId;
let t = 0;

function animate() {
  t += 0.02;

  // базовое движение куба
  mesh.position.x = Math.sin(t) * 1.6;
  mesh.position.y = -0.2;
  mesh.rotation.y += 0.03;

  // попробуй раскомментировать:

  // сделать движение куба активнее
  // mesh.position.x = Math.sin(t * 1.6) * 2.2;

  // добавить подпрыгивание
  // mesh.position.y = -0.2 + Math.abs(Math.sin(t * 2.2)) * 0.35;

  // усилить вращение
  // mesh.rotation.x += 0.03;

  // движение камеры по кругу
  camera.position.x = Math.cos(t * 0.6) * 4;
  camera.position.z = Math.sin(t * 0.6) * 4;
  camera.position.y = 2.2;

  // попробуй раскомментировать:

  // сделать круг камеры шире
  // camera.position.x = Math.cos(t * 0.6) * 5.5;
  // camera.position.z = Math.sin(t * 0.6) * 5.5;

  // добавить плавное движение камеры по высоте
  // camera.position.y = 2.2 + Math.sin(t * 0.5) * 0.4;

  camera.lookAt(0, -0.2, 0);

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);
  geometry.dispose();
  material.dispose();
  floorGeometry.dispose();
  floorMaterial.dispose();
  renderer.dispose();
};`,
  patr2module3tutorial5code1: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
camera.position.set(0, 0.75, 5);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// свет
const light = new THREE.DirectionalLight(0xffffff, 1.4);
light.position.set(3, 4, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// группа (наш будущий объект)
const group = new THREE.Group();
scene.add(group);

// тело
const body = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 2, 1),
  new THREE.MeshStandardMaterial({ color: 0x7a7a7a })
);
group.add(body);

// голова
const head = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x9a9a9a })
);
head.position.y = 1.5;
group.add(head);

// руки
const armLeft = new THREE.Mesh(
  new THREE.BoxGeometry(0.4, 1.6, 0.4),
  new THREE.MeshStandardMaterial({ color: 0x666666 })
);
armLeft.position.x = -1.1;
armLeft.position.y = 0.3;
group.add(armLeft);

const armRight = armLeft.clone();
armRight.position.x = 1.1;
group.add(armRight);

// анимация
let animationId;

function animate() {
  group.rotation.y += 0.02;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);
  renderer.dispose();
};`,
  patr2module3tutorial5code2: `// создаём несколько отдельных объектов

const body = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 2, 1),
  new THREE.MeshStandardMaterial({ color: 0x7a7a7a })
);

const head = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x9a9a9a })
);

head.position.y = 1.5;

scene.add(body);
scene.add(head);`,
  patr2module3tutorial5code5: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.set(3.2, 2.4, 5.2);
camera.lookAt(0, 0.8, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// свет
const light = new THREE.DirectionalLight(0xffffff, 1.4);
light.position.set(3, 4, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
scene.add(ambientLight);

// пол
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xe9e9e9 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.2;
scene.add(floor);

// группа — будущий составной объект
const group = new THREE.Group();
scene.add(group);

// тело
const bodyGeometry = new THREE.BoxGeometry(1.5, 2, 1);
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x7a7a7a });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 0;
group.add(body);

// голова
const headGeometry = new THREE.BoxGeometry(1, 1, 1);
const headMaterial = new THREE.MeshStandardMaterial({ color: 0x9a9a9a });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 1.5;
group.add(head);

// левая рука
const armGeometry = new THREE.BoxGeometry(0.35, 1.5, 0.35);
const armMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
const armLeft = new THREE.Mesh(armGeometry, armMaterial);
armLeft.position.x = -1.1;
armLeft.position.y = 0.2;
group.add(armLeft);

// правая рука
const armRight = new THREE.Mesh(armGeometry, armMaterial);
armRight.position.x = 1.1;
armRight.position.y = 0.2;
group.add(armRight);

// левая нога
const legGeometry = new THREE.BoxGeometry(0.45, 1.3, 0.45);
const legMaterial = new THREE.MeshStandardMaterial({ color: 0x5a5a5a });
const legLeft = new THREE.Mesh(legGeometry, legMaterial);
legLeft.position.x = -0.4;
legLeft.position.y = -1.55;
group.add(legLeft);

// правая нога
const legRight = new THREE.Mesh(legGeometry, legMaterial);
legRight.position.x = 0.4;
legRight.position.y = -1.55;
group.add(legRight);

// небольшой верхний элемент
const hatGeometry = new THREE.ConeGeometry(0.6, 0.7, 4);
const hatMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const hat = new THREE.Mesh(hatGeometry, hatMaterial);
hat.position.y = 2.35;
// group.add(hat);

// анимация
let animationId;

function animate() {
  group.rotation.y += 0.02;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

// cleanup
return () => {
  cancelAnimationFrame(animationId);

  bodyGeometry.dispose();
  bodyMaterial.dispose();

  headGeometry.dispose();
  headMaterial.dispose();

  armGeometry.dispose();
  armMaterial.dispose();

  legGeometry.dispose();
  legMaterial.dispose();

  hatGeometry.dispose();
  hatMaterial.dispose();

  floorGeometry.dispose();
  floorMaterial.dispose();

  renderer.dispose();
};`,
  patr3module1tutorial1code1: `let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function getCenteredGrid(step, padding) {
  const cols = floor((width - padding * 2) / step) + 1;
  const rows = floor((height - padding * 2) / step) + 1;

  return {
    cols,
    rows,
    startX: (width - (cols - 1) * step) / 2,
    startY: (height - (rows - 1) * step) / 2,
  };
}

function drawCell(cx, cy, step, value, index) {
  const wave = sin(t + value * TWO_PI);
  const size = map(value, 0, 1, step * 0.28, step * 0.86);
  const shift = wave * step * 0.18;

  push();
  translate(cx + shift, cy - shift * 0.5);
  rotate(value * PI + t * 0.15);

  fill(index % 2 === 0 ? '#FF86DB' : '#2FD3E6');
  if (value > 0.52) {
    circle(0, 0, size);
  } else {
    rect(0, 0, size, size, step * 0.16);
  }

  pop();
}

function draw() {
  background('#FFFFFF');

  const step = 48;
  const grid = getCenteredGrid(step, 32);
  let index = 0;

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const n = noise(x * 0.009, y * 0.009, t * 0.25);
      drawCell(x, y, step, n, index);
      index += 1;
    }
  }

  t += 0.01;
}`,
  patr3module1tutorial1code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
  noLoop();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
  redraw();
}

function getCenteredGrid(step, padding) {
  const cols = floor((width - padding * 2) / step) + 1;
  const rows = floor((height - padding * 2) / step) + 1;

  return {
    cols,
    rows,
    startX: (width - (cols - 1) * step) / 2,
    startY: (height - (rows - 1) * step) / 2,
  };
}

function draw() {
  background('#FFFFFF');

  const step = 48;
  const grid = getCenteredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;

      fill('#2FD3E6');
      circle(x, y, step * 0.62);
    }
  }
}`,
  patr3module1tutorial1code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
  noLoop();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
  redraw();
}

function getCenteredGrid(step, padding) {
  const cols = floor((width - padding * 2) / step) + 1;
  const rows = floor((height - padding * 2) / step) + 1;

  return {
    cols,
    rows,
    startX: (width - (cols - 1) * step) / 2,
    startY: (height - (rows - 1) * step) / 2,
  };
}

function draw() {
  background('#FFFFFF');

  const step = 48;
  const grid = getCenteredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const jitterX = random(-8, 8);
      const jitterY = random(-8, 8);
      const size = random(step * 0.36, step * 0.78);

      fill(random() > 0.5 ? '#FF86DB' : '#2FD3E6');
      if (random() > 0.5) {
        circle(x + jitterX, y + jitterY, size);
      } else {
        rect(x + jitterX, y + jitterY, size, size, step * 0.12);
      }
    }
  }
}`,
  patr3module1tutorial1code4: `let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function getCenteredGrid(step, padding) {
  const cols = floor((width - padding * 2) / step) + 1;
  const rows = floor((height - padding * 2) / step) + 1;

  return {
    cols,
    rows,
    startX: (width - (cols - 1) * step) / 2,
    startY: (height - (rows - 1) * step) / 2,
  };
}

function draw() {
  background('#FFFFFF');

  const step = 40;
  const grid = getCenteredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const field = noise(x * 0.012, y * 0.012, t);
      const direction = noise(x * 0.006 + 20, y * 0.006 + 20, t) * TWO_PI;
      const size = map(field, 0, 1, step * 0.18, step * 0.88);
      const offset = map(field, 0, 1, -10, 10);

      push();
      translate(x + cos(direction) * offset, y + sin(direction) * offset);
      rotate(direction * 0.35);
      fill(field > 0.5 ? '#FF86DB' : '#2FD3E6');

      if ((col + row) % 3 === 0) {
        rect(0, 0, size, size, step * 0.14);
      } else {
        circle(0, 0, size);
      }
      pop();
    }
  }

  t += 0.006;
}`,
  patr3module1tutorial1code5: `const app = document.getElementById('app');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let animationId;
let time = 0;

app.innerHTML = '';
app.style.width = '100%';
app.style.height = '100%';
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
}

function getCenteredGrid(step, padding) {
  const cols = Math.floor((canvas.width - padding * 2) / step) + 1;
  const rows = Math.floor((canvas.height - padding * 2) / step) + 1;

  return {
    cols,
    rows,
    startX: (canvas.width - (cols - 1) * step) / 2,
    startY: (canvas.height - (rows - 1) * step) / 2,
  };
}

function smoothNoise(x, y, t) {
  return (Math.sin(x * 1.7 + t) + Math.sin(y * 1.35 - t * 1.2) + Math.sin((x + y) * 0.9 + t * 0.7)) / 6 + 0.5;
}

function roundedRect(x, y, size, radius) {
  ctx.beginPath();
  ctx.roundRect(x - size / 2, y - size / 2, size, size, radius);
  ctx.fill();
}

function draw() {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const step = 48;
  const grid = getCenteredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const n = smoothNoise(x * 0.018, y * 0.018, time);
      const size = step * (0.24 + n * 0.56);
      const shift = (n - 0.5) * 18;

      ctx.save();
      ctx.translate(x + shift, y - shift * 0.5);
      ctx.rotate(n * Math.PI + time * 0.2);
      ctx.fillStyle = n > 0.5 ? '#FF86DB' : '#2FD3E6';

      if ((col + row) % 3 === 0) {
        roundedRect(0, 0, size, step * 0.14);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  time += 0.012;
  animationId = requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
};`,
  patr3module1tutorial1code6: `let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function getCenteredGrid(step, padding) {
  const cols = floor((width - padding * 2) / step) + 1;
  const rows = floor((height - padding * 2) / step) + 1;

  return {
    cols,
    rows,
    startX: (width - (cols - 1) * step) / 2,
    startY: (height - (rows - 1) * step) / 2,
  };
}

function draw() {
  background('#FFFFFF');

  const step = 48;
  const grid = getCenteredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const n = noise(x * 0.018, y * 0.018, t);
      const size = step * (0.24 + n * 0.56);
      const shift = (n - 0.5) * 18;

      push();
      translate(x + shift, y - shift * 0.5);
      rotate(n * PI + t * 0.8);
      fill(n > 0.5 ? '#FF86DB' : '#2FD3E6');

      if ((col + row) % 3 === 0) {
        rect(0, 0, size, size, step * 0.14);
      } else {
        circle(0, 0, size);
      }

      pop();
    }
  }

  t += 0.01;
}`,
  patr3module1tutorial1code7: `const width = app.clientWidth;
const height = app.clientHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
camera.position.set(0, 6.5, 8.5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.innerHTML = '';
app.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 2.4);
light.position.set(3, 7, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 1.8));

const group = new THREE.Group();
scene.add(group);

function smoothNoise(x, y, t) {
  return (Math.sin(x * 1.7 + t) + Math.sin(y * 1.35 - t * 1.2) + Math.sin((x + y) * 0.9 + t * 0.7)) / 6 + 0.5;
}

const pink = new THREE.MeshStandardMaterial({ color: 0xff86db, roughness: 0.55 });
const cyan = new THREE.MeshStandardMaterial({ color: 0x2fd3e6, roughness: 0.55 });
const squareGeometry = new THREE.BoxGeometry(0.62, 0.62, 0.18);
const circleGeometry = new THREE.CylinderGeometry(0.34, 0.34, 0.2, 40);
const cells = [];
const cols = 9;
const rows = 7;
const gap = 0.82;

for (let j = 0; j < rows; j += 1) {
  for (let i = 0; i < cols; i += 1) {
    const useSquare = (i + j) % 3 === 0;
    const mesh = new THREE.Mesh(useSquare ? squareGeometry : circleGeometry, (i + j) % 2 === 0 ? pink : cyan);
    mesh.position.x = (i - (cols - 1) / 2) * gap;
    mesh.position.z = (j - (rows - 1) / 2) * gap;
    group.add(mesh);
    cells.push({ mesh, i, j, useSquare });
  }
}

function onResize() {
  const nextWidth = app.clientWidth;
  const nextHeight = app.clientHeight;
  camera.aspect = nextWidth / nextHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(nextWidth, nextHeight);
}

window.addEventListener('resize', onResize);
let animationId;
let time = 0;

function animate() {
  time += 0.012;

  cells.forEach(({ mesh, i, j }) => {
    const n = smoothNoise(i * 0.55, j * 0.55, time);
    mesh.position.y = (n - 0.5) * 1.3;
    mesh.scale.setScalar(0.7 + n * 0.8);
    mesh.rotation.y = n * Math.PI + time * 0.3;
  });

  group.rotation.y = Math.sin(time * 0.35) * 0.18;
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', onResize);
  squareGeometry.dispose();
  circleGeometry.dispose();
  pink.dispose();
  cyan.dispose();
  renderer.dispose();
};`,
  patr3module1tutorial1code8: `let t = 0;
let noiseScale = 0.012;
let step = 48;
let shapeMode = 'mixed';
let useRandomGlitch = false;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function getCenteredGrid(step, padding) {
  const cols = floor((width - padding * 2) / step) + 1;
  const rows = floor((height - padding * 2) / step) + 1;

  return {
    cols,
    rows,
    startX: (width - (cols - 1) * step) / 2,
    startY: (height - (rows - 1) * step) / 2,
  };
}

function draw() {
  background('#FFFFFF');

  // Эксперимент 1: масштаб шума.
  // noiseScale = 0.006; // крупные спокойные волны
  // noiseScale = 0.02;  // дробный декоративный шум

  // Эксперимент 2: плотность сетки.
  // step = 40;
  // step = 56;

  // Эксперимент 3: логика формы.
  // shapeMode = 'circles';
  // shapeMode = 'squares';
  // shapeMode = 'mixed';

  // Эксперимент 4: сравнение с резкой случайностью.
  // useRandomGlitch = true;

  const grid = getCenteredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const n = noise(x * noiseScale, y * noiseScale, t);
      const randomOffset = useRandomGlitch ? random(-12, 12) : 0;
      const size = map(n, 0, 1, step * 0.18, step * 0.84);
      const shift = map(n, 0, 1, -step * 0.18, step * 0.18) + randomOffset;
      const shouldDrawSquare = shapeMode === 'squares' || (shapeMode === 'mixed' && (row + col) % 3 === 0);

      push();
      translate(x + shift, y - shift * 0.5);
      rotate(n * PI + t * 0.45);
      fill(n > 0.5 ? '#FF86DB' : '#2FD3E6');

      if (shapeMode === 'circles' || !shouldDrawSquare) {
        circle(0, 0, size);
      } else {
        rect(0, 0, size, size, step * 0.14);
      }

      pop();
    }
  }

  t += 0.008;
}`,
  patr3module1tutorial2code1: `// Seed — номер сохранённой версии.
// Поменяй 38 на другое число и перезапусти скетч.
const seed = 38;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
  noLoop();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
  redraw();
}

function centeredGrid(step, padding) {
  const cols = floor((width - padding * 2) / step) + 1;
  const rows = floor((height - padding * 2) / step) + 1;
  return {
    cols,
    rows,
    startX: (width - (cols - 1) * step) / 2,
    startY: (height - (rows - 1) * step) / 2,
  };
}

function draw() {
  background('#FFFFFF');

  // Эти строки делают random() и noise() повторяемыми.
  randomSeed(seed);
  noiseSeed(seed);

  const step = 48;
  const grid = centeredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      // noise() даёт плавное поле, а random() выбирает детали ячейки.
      const n = noise(col * 0.32, row * 0.32);
      const size = random(step * 0.28, step * 0.86) * (0.72 + n * 0.36);
      const shift = (n - 0.5) * step * 0.42;
      const color = random() > 0.46 ? '#FFC300' : '#2FD3E6';

      push();
      translate(x + shift, y - shift * 0.5);
      rotate(random(-0.8, 0.8));
      fill(color);

      if (random() > 0.58) {
        rect(0, 0, size, size, step * 0.14);
      } else {
        circle(0, 0, size);
      }
      pop();
    }
  }
}`,
  patr3module1tutorial2code2: `// Vanilla JS: своего randomSeed() нет, поэтому создаём генератор сами.
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
app.innerHTML = '';
app.appendChild(canvas);

function seededRandom(seed) {
  // value хранит состояние генератора между вызовами rnd().
  let value = seed;
  return function () {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function resize() {
  canvas.width = app.clientWidth * window.devicePixelRatio;
  canvas.height = app.clientHeight * window.devicePixelRatio;
  canvas.style.width = app.clientWidth + 'px';
  canvas.style.height = app.clientHeight + 'px';
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  draw();
}

function drawBlob(cx, cy, radius, turns, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(turns);
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const angle = (Math.PI * 2 * i) / 10;
    const r = radius * (i % 2 === 0 ? 1 : 0.58);
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function draw() {
  const width = app.clientWidth;
  const height = app.clientHeight;
  // Каждый draw() начинается с одного seed, поэтому рисунок повторяется.
  const rnd = seededRandom(124);
  const step = 48;
  const padding = 32;
  const cols = Math.floor((width - padding * 2) / step) + 1;
  const rows = Math.floor((height - padding * 2) / step) + 1;
  const startX = (width - (cols - 1) * step) / 2;
  const startY = (height - (rows - 1) * step) / 2;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      // rnd() заменяет Math.random(): значения случайные, но повторяемые.
      const wave = Math.sin(col * 0.9 + row * 0.6 + rnd() * 2.4);
      const size = step * (0.24 + rnd() * 0.54);
      const dx = wave * 8;
      const dy = Math.cos(row * 0.8 + rnd()) * 8;
      const color = rnd() > 0.5 ? '#FF86DB' : '#37E87A';

      if (rnd() > 0.68) {
        drawBlob(x + dx, y + dy, size * 0.55, rnd() * Math.PI, color);
      } else {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x + dx, y + dy, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

resize();
window.addEventListener('resize', resize);

return () => {
  window.removeEventListener('resize', resize);
};`,
  patr3module1tutorial2code3: `// Three.js: seed один раз собирает рельеф сцены.
const width = app.clientWidth;
const height = app.clientHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
camera.position.set(0, 7.5, 9.5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.innerHTML = '';
app.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 1.8));
const light = new THREE.DirectionalLight(0xffffff, 2.5);
light.position.set(3, 7, 6);
scene.add(light);

function seededRandom(seed) {
  let value = seed;
  return function () {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

// Вся 3D-сетка будет зависеть от этого числа.
const rnd = seededRandom(72);
const group = new THREE.Group();
scene.add(group);

const cyan = new THREE.MeshStandardMaterial({ color: 0x2fd3e6, roughness: 0.5 });
const yellow = new THREE.MeshStandardMaterial({ color: 0xffc300, roughness: 0.55 });
const box = new THREE.BoxGeometry(0.58, 0.58, 0.58);
const cylinder = new THREE.CylinderGeometry(0.34, 0.34, 0.52, 40);
const cells = [];
const cols = 9;
const rows = 7;
const gap = 0.82;

for (let row = 0; row < rows; row += 1) {
  for (let col = 0; col < cols; col += 1) {
    // Seed выбирает форму, цвет, высоту и поворот каждого объекта.
    const isCylinder = rnd() > 0.42;
    const material = rnd() > 0.5 ? cyan : yellow;
    const mesh = new THREE.Mesh(isCylinder ? cylinder : box, material);
    const wave = Math.sin(col * 0.7 + row * 0.9 + rnd() * 2);
    const height = 0.45 + rnd() * 1.55;

    mesh.position.set((col - (cols - 1) / 2) * gap, height * 0.28 + wave * 0.14, (row - (rows - 1) / 2) * gap);
    mesh.scale.set(0.72 + rnd() * 0.48, height, 0.72 + rnd() * 0.48);
    mesh.rotation.y = rnd() * Math.PI;
    group.add(mesh);
    cells.push({ mesh, baseY: mesh.position.y, phase: rnd() * Math.PI * 2, spin: rnd() * 0.018 + 0.004 });
  }
}

function resize() {
  const nextWidth = app.clientWidth;
  const nextHeight = app.clientHeight;
  camera.aspect = nextWidth / nextHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(nextWidth, nextHeight);
}

window.addEventListener('resize', resize);
let animationId;
let time = 0;

function animate() {
  time += 0.016;

  // Анимация не пересоздаёт random, а двигает сохранённые параметры.
  cells.forEach(({ mesh, baseY, phase, spin }) => {
    mesh.position.y = baseY + Math.sin(time + phase) * 0.12;
    mesh.rotation.y += spin;
  });
  group.rotation.y = Math.sin(time * 0.3) * 0.22;
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
  box.dispose();
  cylinder.dispose();
  cyan.dispose();
  yellow.dispose();
  renderer.dispose();
};`,
  patr3module1tutorial2code4: `// Задание: собери серию постеров на одном алгоритме.
let posterSeed = 58;
let preset = 'balanced';
let motionMode = 'slow';
let t = 0;

// Пресеты меняют характер работы, но seed всё равно сохраняет версию.
const presets = {
  calm: { step: 56, scale: 0.009, colors: ['#2FD3E6', '#37E87A'], density: 0.58 },
  balanced: { step: 48, scale: 0.014, colors: ['#FF86DB', '#FFC300'], density: 0.72 },
  contrast: { step: 40, scale: 0.02, colors: ['#FF86DB', '#2FD3E6'], density: 0.86 },
};

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function centeredGrid(step, padding) {
  const cols = floor((width - padding * 2) / step) + 1;
  const rows = floor((height - padding * 2) / step) + 1;
  return {
    cols,
    rows,
    startX: (width - (cols - 1) * step) / 2,
    startY: (height - (rows - 1) * step) / 2,
  };
}

function draw() {
  // Версии серии.
  // posterSeed = 19;
  // posterSeed = 58;
  // posterSeed = 143;

  // Пресеты характера.
  // preset = 'calm';
  // preset = 'balanced';
  // preset = 'contrast';

  // Режим движения.
  // motionMode = 'still';
  // motionMode = 'slow';

  const settings = presets[preset];

  // Сначала фиксируем генераторы, потом рисуем композицию.
  randomSeed(posterSeed);
  noiseSeed(posterSeed);
  background('#FFFFFF');

  const grid = centeredGrid(settings.step, 32);
  const time = motionMode === 'still' ? 0 : t;

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * settings.step;
      const y = grid.startY + row * settings.step;
      // noise() отвечает за плавное движение и размер, random() — за отбор ячеек.
      const n = noise(col * settings.scale * 42, row * settings.scale * 42, time * 0.35);
      const shouldDraw = random() < settings.density;
      if (!shouldDraw) continue;

      const size = settings.step * (0.18 + n * 0.72);
      const drift = map(n, 0, 1, -settings.step * 0.22, settings.step * 0.22);
      const color = settings.colors[random() > 0.5 ? 0 : 1];

      push();
      translate(x + drift, y - drift * 0.5);
      rotate(n * PI + time * 0.28);
      fill(color);

      if ((row + col + floor(random(0, 3))) % 3 === 0) {
        rect(0, 0, size, size, settings.step * 0.16);
      } else {
        circle(0, 0, size);
      }
      pop();
    }
  }

  t += 0.008;
}`,
  patr3module1tutorial2code5: `// Движение: сначала сохраняем параметры, потом анимируем их.
const seed = 91;
let t = 0;
const cells = [];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
  buildCells();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
  buildCells();
}

function centeredGrid(step, padding) {
  const cols = floor((width - padding * 2) / step) + 1;
  const rows = floor((height - padding * 2) / step) + 1;
  return {
    cols,
    rows,
    startX: (width - (cols - 1) * step) / 2,
    startY: (height - (rows - 1) * step) / 2,
  };
}

function buildCells() {
  // Пересобираем массив при старте и ресайзе, но с тем же seed.
  cells.length = 0;
  randomSeed(seed);
  noiseSeed(seed);

  const step = 48;
  const grid = centeredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const field = noise(col * 0.25, row * 0.25);
      // В массив записываем постоянные параметры ячейки.
      cells.push({
        x,
        y,
        step,
        phase: random(TWO_PI),
        size: step * random(0.32, 0.78),
        color: random() > 0.5 ? '#FF86DB' : '#37E87A',
        square: random() > 0.62,
        drift: map(field, 0, 1, -step * 0.24, step * 0.24),
      });
    }
  }
}

function draw() {
  background('#FFFFFF');

  cells.forEach((cell) => {
    // Движение меняется во времени, но cell.phase и cell.size уже сохранены.
    const wave = sin(t + cell.phase);
    const lift = cos(t * 0.7 + cell.phase) * 6;

    push();
    translate(cell.x + cell.drift * wave, cell.y - cell.drift * 0.5 + lift);
    rotate(cell.phase * 0.3 + wave * 0.45);
    fill(cell.color);

    if (cell.square) {
      rect(0, 0, cell.size, cell.size, cell.step * 0.14);
    } else {
      circle(0, 0, cell.size);
    }
    pop();
  });

  t += 0.012;
}`,
  patr3module1tutorial2code6: `// Орбиты: плотная, но контролируемая композиция.
const seed = 214;
let t = 0;
let rings = [];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
  buildRings();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
  buildRings();
}

function buildRings() {
  // Один seed фиксирует количество элементов, их размер, фазу и цвет.
  randomSeed(seed);
  noiseSeed(seed);
  rings = [];

  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = min(width, height) * 0.37;

  for (let ring = 0; ring < 6; ring += 1) {
    // Радиусы разведены, но элементов больше: композиция плотная без сильных наложений.
    const radius = map(ring, 0, 5, maxRadius * 0.24, maxRadius);
    const count = 8 + ring * 4;

    for (let i = 0; i < count; i += 1) {
      const angle = (TWO_PI * i) / count;
      const n = noise(ring * 0.45, i * 0.12);

      rings.push({
        radius,
        angle,
        phase: random(TWO_PI),
        // Размер подобран средним: элементы заметные, но не перекрывают всю орбиту.
        size: map(n, 0, 1, 9, 21),
        color: ring % 2 === 0 ? '#2FD3E6' : '#FFC300',
        centerX,
        centerY,
        speed: random(0.12, 0.34),
        square: random() > 0.55,
      });
    }
  }
}

function draw() {
  background('#FFFFFF');

  rings.forEach((item) => {
    // Анимация двигает элементы мягко: seed не пересоздаётся в draw().
    const pulse = sin(t * item.speed + item.phase);
    const direction = item.radius % 2 === 0 ? 1 : -1;
    const orbit = item.angle + t * 0.09 * direction;
    const radius = item.radius + pulse * 5;
    const x = item.centerX + cos(orbit) * radius;
    const y = item.centerY + sin(orbit) * radius;

    push();
    translate(x, y);
    rotate(orbit + pulse * 0.35);
    fill(item.color);

    if (item.square) {
      rect(0, 0, item.size, item.size, 5);
    } else {
      circle(0, 0, item.size * 1.12);
    }
    pop();
  });

  fill('#FF86DB');
  circle(width / 2, height / 2, 24 + sin(t) * 4);

  t += 0.014;
}`,
  patr3module1tutorial3code1: `const palette = ['#FF86DB', '#2FD3E6'];
const step = 48;
const padding = 32;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  noLoop();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
  redraw();
}

function centeredGrid() {
  const cols = floor((width - padding * 2) / step);
  const rows = floor((height - padding * 2) / step);

  return {
    cols,
    rows,
    startX: (width - (cols - 1) * step) / 2,
    startY: (height - (rows - 1) * step) / 2,
  };
}

function draw() {
  background('#FFFFFF');
  randomSeed(12);

  const grid = centeredGrid();

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step + random(-12, 12);
      const y = grid.startY + row * step + random(-12, 12);
      const size = random(10, 30);

      fill(palette[(row + col) % palette.length]);
      circle(x, y, size);
    }
  }
}`,
  patr3module1tutorial3code2: `const palette = ['#FFC300', '#FF86DB'];
let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function triangular() {
  // Средние значения появляются чаще, чем края.
  return (random() + random()) / 2;
}

function draw() {
  background('#FFFFFF');
  randomSeed(24);

  const count = 140;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = min(width, height) * 0.38;

  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * TWO_PI;
    const radius = triangular() * maxRadius;
    const wave = sin(t + i * 0.18) * 8;
    const x = centerX + cos(angle) * (radius + wave);
    const y = centerY + sin(angle) * (radius + wave);
    const size = map(radius, 0, maxRadius, 30, 8);

    fill(palette[i % 2]);
    circle(x, y, size);
  }

  t += 0.018;
}`,
  patr3module1tutorial3code3: `const palette = ['#37E87A', '#2FD3E6'];
let particles = [];
let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  createCloud();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
  createCloud();
}

function createCloud() {
  randomSeed(42);
  particles = [];

  const deviation = min(width, height) * 0.16;

  for (let i = 0; i < 220; i += 1) {
    particles.push({
      x: randomGaussian(width / 2, deviation),
      y: randomGaussian(height / 2, deviation),
      r: randomGaussian(16, 4),
      phase: random(TWO_PI),
      color: random(1) < 0.72 ? palette[0] : palette[1],
    });
  }
}

function draw() {
  background('#FFFFFF');

  for (const p of particles) {
    const orbit = sin(t + p.phase) * 10;
    const angle = atan2(p.y - height / 2, p.x - width / 2);
    const x = p.x + cos(angle + HALF_PI) * orbit;
    const y = p.y + sin(angle + HALF_PI) * orbit;
    const size = constrain(p.r, 6, 28);

    fill(p.color);
    circle(x, y, size);
  }

  t += 0.02;
}`,
  patr3module1tutorial3code4: `const variants = [
  { color: '#2FD3E6', shape: 'circle', weight: 0.62 },
  { color: '#FF86DB', shape: 'square', weight: 0.28 },
  { color: '#FFC300', shape: 'triangle', weight: 0.10 },
];
const step = 40;
const padding = 32;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
  noLoop();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
  redraw();
}

function weightedChoice(items) {
  let cursor = random(1);

  for (const item of items) {
    cursor -= item.weight;
    if (cursor <= 0) return item;
  }

  return items[items.length - 1];
}

function drawShape(item, x, y, size) {
  fill(item.color);

  if (item.shape === 'circle') {
    circle(x, y, size);
  } else if (item.shape === 'square') {
    rect(x, y, size, size, size * 0.18);
  } else {
    triangle(x, y - size * 0.5, x - size * 0.45, y + size * 0.38, x + size * 0.45, y + size * 0.38);
  }
}

function draw() {
  background('#FFFFFF');
  randomSeed(64);

  const cols = floor((width - padding * 2) / step);
  const rows = floor((height - padding * 2) / step);
  const startX = (width - (cols - 1) * step) / 2;
  const startY = (height - (rows - 1) * step) / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const item = weightedChoice(variants);
      const x = startX + col * step;
      const y = startY + row * step;
      const size = item.shape === 'triangle' ? 28 : random(12, 26);

      drawShape(item, x, y, size);
    }
  }
}`,
  patr3module1tutorial3code5: `const paletteA = ['#FF86DB', '#2FD3E6'];
const paletteB = ['#FFC300', '#37E87A'];
let palette = paletteA;
let mode = 'cloud';
let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function weightedColor() {
  return random(1) < 0.78 ? palette[0] : palette[1];
}

function boundedGaussian(mean, deviation, minValue, maxValue) {
  return constrain(randomGaussian(mean, deviation), minValue, maxValue);
}

function drawPosterPoint(i, count) {
  const centerX = width / 2;
  const centerY = height / 2;
  const safeW = width / 2 - 32;
  const safeH = height / 2 - 32;

  let x = boundedGaussian(centerX, safeW * 0.32, 32, width - 32);
  let y = boundedGaussian(centerY, safeH * 0.32, 32, height - 32);

  // Попробуй другие режимы распределения.
  // mode = 'stripe';
  // mode = 'orbit';
  // palette = paletteB;

  if (mode === 'stripe') {
    x = map(i, 0, count - 1, 32, width - 32);
    y = boundedGaussian(centerY, safeH * 0.22, 32, height - 32);
  }

  if (mode === 'orbit') {
    const angle = (i / count) * TWO_PI * 3;
    const radius = boundedGaussian(min(safeW, safeH) * 0.45, 42, 24, min(safeW, safeH));
    x = centerX + cos(angle + t * 0.5) * radius;
    y = centerY + sin(angle + t * 0.5) * radius;
  }

  const distance = dist(x, y, centerX, centerY);
  const maxDistance = min(width, height) * 0.48;
  const size = map(constrain(distance, 0, maxDistance), 0, maxDistance, 30, 8);
  const spin = noise(i * 0.08, t) * TWO_PI;

  push();
  translate(x, y);
  rotate(spin);
  fill(weightedColor());

  if (random(1) < 0.18) {
    rect(0, 0, size, size, size * 0.2);
  } else {
    circle(0, 0, size);
  }

  pop();
}

function draw() {
  background('#FFFFFF');
  randomSeed(108);

  const count = 260;

  for (let i = 0; i < count; i += 1) {
    drawPosterPoint(i, count);
  }

  t += 0.012;
}`,
  patr3module1tutorial4code1: `const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let animationId;
let time = 0;

app.innerHTML = '';
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
}

function smoothNoise(x, y, t) {
  const a = Math.sin(x * 2.1 + t);
  const b = Math.sin(y * 1.7 - t * 0.8);
  const c = Math.sin((x + y) * 1.15 + t * 0.55);
  return (a + b + c) / 6 + 0.5;
}

function getCenteredGrid(step, padding) {
  const cols = Math.floor((canvas.width - padding * 2) / step) + 1;
  const rows = Math.floor((canvas.height - padding * 2) / step) + 1;

  return {
    cols,
    rows,
    startX: (canvas.width - (cols - 1) * step) / 2,
    startY: (canvas.height - (rows - 1) * step) / 2,
  };
}

function drawCell(x, y, size, n, row, col) {
  const radius = size * (0.22 + n * 0.42);
  const isAccent = n > 0.58;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((n - 0.5) * 0.8);
  ctx.fillStyle = isAccent ? '#FF86DB' : '#FFC300';

  if ((row + col) % 4 === 0) {
    ctx.fillRect(-radius / 2, -radius / 2, radius, radius);
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, radius / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function draw() {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const step = 24;
  const grid = getCenteredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const n = smoothNoise(x * 0.018, y * 0.018, time);
      const shift = (n - 0.5) * 10;
      drawCell(x + shift, y - shift, step, n, row, col);
    }
  }

  time += 0.018;
  animationId = requestAnimationFrame(draw);
}

resize();
window.addEventListener('resize', resize);
draw();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
};`,
  patr3module1tutorial4code2: `let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  pixelDensity(1);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function getCenteredBounds(padding) {
  return {
    left: padding,
    top: padding,
    right: width - padding,
    bottom: height - padding,
  };
}

function draw() {
  background('#FFFFFF');

  const bounds = getCenteredBounds(32);
  const step = 8;
  const levels = [0.34, 0.48, 0.62];

  for (let y = bounds.top; y <= bounds.bottom; y += step) {
    for (let x = bounds.left; x <= bounds.right; x += step) {
      const n = noise(x * 0.012, y * 0.012, t);

      levels.forEach((level, index) => {
        if (abs(n - level) < 0.018) {
          fill(index % 2 === 0 ? '#2FD3E6' : '#37E87A');
          const size = index === 1 ? 6 : 4;
          circle(x, y, size);
        }
      });
    }
  }

  // Центральный знак помогает композиции не распадаться на фон.
  fill('#2FD3E6');
  circle(width / 2, height / 2, 24 + sin(t * 3) * 4);

  t += 0.008;
}`,
  patr3module1tutorial4code3: `let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function getCenteredGrid(step, padding) {
  const cols = floor((width - padding * 2) / step) + 1;
  const rows = floor((height - padding * 2) / step) + 1;

  return {
    cols,
    rows,
    startX: (width - (cols - 1) * step) / 2,
    startY: (height - (rows - 1) * step) / 2,
  };
}

function warpedNoise(x, y, scale, power) {
  const warpX = noise(x * scale, y * scale, t) * power;
  const warpY = noise(x * scale + 30, y * scale - 30, t) * power;
  return noise((x + warpX) * scale, (y + warpY) * scale, t * 0.7);
}

function draw() {
  background('#FFFFFF');

  const step = 32;
  const grid = getCenteredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const n = warpedNoise(x, y, 0.011, 72);
      const band = floor(n * 5);
      const size = step * (0.22 + n * 0.72);
      const offset = map(n, 0, 1, -10, 10);

      push();
      translate(x + offset, y - offset * 0.5);
      rotate(n * TWO_PI + t * 0.4);
      fill(band % 2 === 0 ? '#FF86DB' : '#FFC300');

      if (band === 0 || band === 4) {
        triangle(-size / 2, size / 2, 0, -size / 2, size / 2, size / 2);
      } else if (band === 2) {
        rect(0, 0, size, size, step * 0.16);
      } else {
        circle(0, 0, size);
      }

      pop();
    }
  }

  t += 0.006;
}`,
  patr3module1tutorial4code4: `const width = app.clientWidth;
const height = app.clientHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
camera.position.set(0, 3.6, 7.2);
camera.lookAt(0, 0.4, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(width, height);
app.innerHTML = '';
app.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 1.8));
const light = new THREE.DirectionalLight(0xffffff, 2.2);
light.position.set(3, 5, 4);
scene.add(light);

function waveValue(x, y, seed) {
  const a = Math.sin(x * 0.09 + seed);
  const b = Math.sin(y * 0.11 - seed * 0.7);
  const c = Math.sin((x + y) * 0.055 + seed * 1.4);
  return (a + b + c) / 6 + 0.5;
}

function createNoiseTexture(colorA, colorB, seed, mode) {
  const size = 256;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);

  for (let y = 16; y < size - 16; y += 8) {
    for (let x = 16; x < size - 16; x += 8) {
      const n = waveValue(x, y, seed);
      const nearLine = Math.abs(n - 0.52) < 0.055;
      const radius = mode === 'grain' ? 2 + n * 5 : 3 + n * 7;
      ctx.fillStyle = nearLine ? colorA : colorB;

      if (mode === 'squares' && n > 0.46) {
        ctx.fillRect(x - radius / 2, y - radius / 2, radius, radius);
      } else if (nearLine || mode === 'grain') {
        ctx.beginPath();
        ctx.arc(x, y, radius / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.6, 1.6);
  return texture;
}

const textures = [
  createNoiseTexture('#FF86DB', '#FFC300', 1.2, 'grain'),
  createNoiseTexture('#2FD3E6', '#37E87A', 3.4, 'squares'),
  createNoiseTexture('#FF86DB', '#2FD3E6', 5.8, 'lines'),
];

const materials = textures.map((map) => new THREE.MeshStandardMaterial({
  map,
  roughness: 0.72,
  metalness: 0.02,
}));

const objects = [];
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.95, 48, 32), materials[0]);
sphere.position.set(-2.1, 0.4, 0);
scene.add(sphere);
objects.push(sphere);

const box = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.45, 1.45, 12, 12, 12), materials[1]);
box.position.set(0, 0.25, 0);
scene.add(box);
objects.push(box);

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.25, 28, 80), materials[2]);
torus.position.set(2.15, 0.35, 0);
scene.add(torus);
objects.push(torus);

const floorGeometry = new THREE.PlaneGeometry(5.8, 0.18);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x37e87a });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.18;
scene.add(floor);

function onResize() {
  const nextWidth = app.clientWidth;
  const nextHeight = app.clientHeight;
  camera.aspect = nextWidth / nextHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(nextWidth, nextHeight);
}

window.addEventListener('resize', onResize);
let animationId;
let time = 0;

function animate() {
  time += 0.012;

  objects.forEach((object, index) => {
    object.rotation.x += 0.006 + index * 0.002;
    object.rotation.y += 0.012 + index * 0.003;
    object.position.y = 0.28 + Math.sin(time + index) * 0.12;
  });

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', onResize);
  textures.forEach((texture) => texture.dispose());
  materials.forEach((material) => material.dispose());
  objects.forEach((object) => object.geometry.dispose());
  floorGeometry.dispose();
  floorMaterial.dispose();
  renderer.dispose();
};`,
  patr3module1tutorial4code5: `let t = 0;
let activePreset = 'electricMap';

const presets = {
  softFabric: {
    scale: 0.008,
    warp: 44,
    step: 24,
    levels: 4,
    colors: ['#FF86DB', '#FFC300'],
  },
  electricMap: {
    scale: 0.014,
    warp: 86,
    step: 16,
    levels: 6,
    colors: ['#2FD3E6', '#37E87A'],
  },
  liquidPoster: {
    scale: 0.011,
    warp: 118,
    step: 20,
    levels: 5,
    colors: ['#FF86DB', '#2FD3E6'],
  },
};

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function centeredGrid(step, padding) {
  const cols = floor((width - padding * 2) / step) + 1;
  const rows = floor((height - padding * 2) / step) + 1;
  return {
    cols,
    rows,
    startX: (width - (cols - 1) * step) / 2,
    startY: (height - (rows - 1) * step) / 2,
  };
}

function sampleTexture(x, y, preset) {
  const wx = noise(x * preset.scale, y * preset.scale, t) * preset.warp;
  const wy = noise(x * preset.scale + 70, y * preset.scale - 40, t) * preset.warp;
  return noise((x + wx) * preset.scale, (y + wy) * preset.scale, t * 0.6);
}

function draw() {
  background('#FFFFFF');

  // Выбери стартовый характер серии.
  // activePreset = 'softFabric';
  // activePreset = 'electricMap';
  // activePreset = 'liquidPoster';

  const preset = presets[activePreset];

  // Тонкая настройка: меняй числа и смотри, как меняется материал.
  // preset.scale = 0.006; // крупнее и спокойнее
  // preset.scale = 0.018; // мельче и напряжённее
  // preset.warp = 140;    // сильнее деформация координат
  // preset.levels = 8;    // больше цветовых ступеней

  const grid = centeredGrid(preset.step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * preset.step;
      const y = grid.startY + row * preset.step;
      const n = sampleTexture(x, y, preset);
      const level = floor(n * preset.levels);
      const size = preset.step * (0.22 + n * 0.74);
      const color = preset.colors[level % preset.colors.length];

      push();
      translate(x, y);
      rotate(n * TWO_PI + t * 0.3);
      fill(color);

      if (level % 3 === 0) {
        rect(0, 0, size, size, preset.step * 0.12);
      } else if (level % 3 === 1) {
        circle(0, 0, size);
      } else {
        triangle(-size / 2, size / 2, 0, -size / 2, size / 2, size / 2);
      }

      pop();
    }
  }

  // Небольшой маркер показывает, что это серия, а не случайный фон.
  fill(preset.colors[0]);
  circle(width / 2, height / 2, 18 + sin(t * 2) * 3);

  t += 0.006;
}`,
};