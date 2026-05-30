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
  const orbit = Math.min(canvas.width, canvas.height) * 0.18;
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

  const orbit = min(width, height) * 0.18;
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
cube.position.x = -0.5;
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
// createCanvas(windowWidth, windowHeight) часто берёт размер iframe,
// а не размер видимой области песочницы. Этот скетч выводит
// несколько вариантов, чтобы можно было выбрать подходящий. 

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

  let step = windowWidth / 6; // 6 шаров в сетке

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
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = windowWidth / 6;

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
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(248);

  let step = windowWidth / 7;

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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

let items = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
  createCanvas(windowWidth, windowHeight);
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
};