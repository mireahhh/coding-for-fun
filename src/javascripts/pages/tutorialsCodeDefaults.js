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
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
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
};