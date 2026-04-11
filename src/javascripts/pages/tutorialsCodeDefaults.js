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
  createCanvas(windowWidth, windowHeight);
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

export const defaultCodeById = {
  patr1module1tutorial1code1: `function setup() {
  createCanvas(windowWidth, windowHeight); // создаём холст размера окна
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

};