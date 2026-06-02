export const defaultCodeByRuntime = {
  vanilla: `const app = document.getElementById("app");

app.innerHTML = "";
app.style.width = "100%";
app.style.height = "100%";
app.style.display = "flex";
app.style.alignItems = "center";
app.style.justifyContent = "center";
app.style.background = "#FFFFFF";

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
  background("#FFFFFF");

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

  ctx.fillStyle = "#ffffff";
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
  background("#FFFFFF");

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
scene.background = new THREE.Color(0xffffff);

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

const handbookPart1Module1Preview = `let t = 0;
let hoverAmount = 0;
let isHovering = false;

function updateHoverState(value) {
  isHovering = value;
}

function handlePreviewHover(event) {
  if (event.data?.type !== "coding-for-fun-preview-hover") return;
  updateHoverState(event.data.isHovered);
}

function setup() {
  const canvas = createCanvas(app.clientWidth, app.clientHeight);
  canvas.parent("app");

  canvas.mouseOver(() => {
    updateHoverState(true);
  });

  canvas.mouseOut(() => {
    updateHoverState(false);
  });

  noStroke();
  window.addEventListener("message", handlePreviewHover);
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const target = isHovering ? 1 : 0;
  const easing = isHovering ? 0.18 : 0.055;
  hoverAmount = lerp(hoverAmount, target, easing);

  // без ховера — почти статично, на ховере — плавное движение
  t += 0.004 + hoverAmount * 0.012;

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = min(width, height) * 0.28;

  // лёгкое дыхание большой формы
  const basePulse = 1 + sin(t * 0.8) * (0.015 + hoverAmount * 0.03);
  const orbitRadius = radius * (1 + sin(t * 0.6) * hoverAmount * 0.05);

  // орбита мягко ускоряется на ховере
  const angle = t * (0.45 + hoverAmount * 0.7);

  fill("#FF86DB");
  circle(centerX, centerY, radius * 1.15 * basePulse);

  fill("#2FD3E6");
  circle(
    centerX + cos(angle) * orbitRadius,
    centerY + sin(angle) * orbitRadius,
    64 + sin(t * 1.4) * hoverAmount * 6
  );

  fill("#FFC300");
  circle(
    centerX + cos(angle + PI) * orbitRadius,
    centerY + sin(angle + PI) * orbitRadius,
    40 + cos(t * 1.2) * hoverAmount * 4
  );
}`;

const handbookPart1Module2Preview = `let t = 0;
let hoverAmount = 0;
let isHovering = false;

function updateHoverState(value) {
  isHovering = value;
}

function handlePreviewHover(event) {
  if (event.data?.type !== "coding-for-fun-preview-hover") return;
  updateHoverState(event.data.isHovered);
}

function setup() {
  const canvas = createCanvas(app.clientWidth, app.clientHeight);
  canvas.parent("app");

  canvas.mouseOver(() => {
    updateHoverState(true);
  });

  canvas.mouseOut(() => {
    updateHoverState(false);
  });

  noStroke();
  window.addEventListener("message", handlePreviewHover);
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const target = isHovering ? 1 : 0;
  const easing = isHovering ? 0.18 : 0.055;
  hoverAmount = lerp(hoverAmount, target, easing);

  // Без ховера движение почти незаметное, на ховере — быстрее
  t += 0.006 + hoverAmount * 0.035;

  const padding = 40;
  const count = 11;
  const step = (width - padding * 2) / (count - 1);

  for (let i = 0; i < count; i += 1) {
    const x = padding + i * step;

    // Еле заметное движение в покое, бодрое на ховере
    const waveHeight = 10 + hoverAmount * 52;
    const sizePulse = 2 + hoverAmount * 10;

    const y = height / 2 + sin(t + i * 0.65) * waveHeight;
    const size = 34 + cos(t + i) * sizePulse;

    fill(i % 2 === 0 ? "#FF86DB" : "#FFC300");
    circle(x, y, size);
  }
}`;

const handbookPart2Module1Preview = `const width = app.clientWidth;
const height = app.clientHeight;

let speedFactor = 0;
let targetSpeedFactor = 0;
let lastTime = 0;
let t = 0;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

const group = new THREE.Group();
scene.add(group);

const colors = [0xff86db, 0x2fd3e6];
const geometry = new THREE.BoxGeometry(0.42, 0.42, 0.42);
const materials = colors.map(
  (color) => new THREE.MeshStandardMaterial({ color, roughness: 0.55 })
);

for (let x = -2; x <= 2; x += 1) {
  for (let y = -1; y <= 1; y += 1) {
    const cube = new THREE.Mesh(geometry, materials[(x + y + 4) % 2]);
    cube.position.set(x * 0.64, y * 0.64, 0);
    group.add(cube);
  }
}

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(2, 3, 4);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 1.2));

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

  const easing = targetSpeedFactor > speedFactor ? 0.18 : 0.06;
  speedFactor += (targetSpeedFactor - speedFactor) * Math.min(deltaTime / 120, 1) * easing * 6;

  t += 0.01 + speedFactor * 0.03;

  // лёгкое "плавание" без ховера
  group.position.x = Math.sin(t * 0.8) * 0.06;
  group.position.y = Math.cos(t * 0.95) * 0.05;

  // спокойное вращение в покое + ускорение на ховере
  group.rotation.x += 0.002 + speedFactor * 0.008;
  group.rotation.y += 0.004 + speedFactor * 0.014;
  group.rotation.z = Math.sin(t * 0.6) * 0.06;

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
  materials.forEach((material) => material.dispose());
  renderer.dispose();
};`;

const handbookPart2Module2Preview = `const particles = [];

let t = 0;
let hoverAmount = 0;
let isHovering = false;

function updateHoverState(value) {
  isHovering = value;
}

function handlePreviewHover(event) {
  if (event.data?.type !== "coding-for-fun-preview-hover") return;
  updateHoverState(event.data.isHovered);
}

function setup() {
  const canvas = createCanvas(app.clientWidth, app.clientHeight);
  canvas.parent("app");

  canvas.mouseOver(() => {
    updateHoverState(true);
  });

  canvas.mouseOut(() => {
    updateHoverState(false);
  });

  noStroke();

  for (let i = 0; i < 36; i += 1) {
    particles.push({
      angle: (i * TWO_PI) / 36,
      radius: 32 + (i % 6) * 16,
    });
  }

  window.addEventListener("message", handlePreviewHover);
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const target = isHovering ? 1 : 0;
  const easing = isHovering ? 0.18 : 0.055;
  hoverAmount = lerp(hoverAmount, target, easing);

  t += 0.008 + hoverAmount * 0.025;

  for (let i = 0; i < particles.length; i += 1) {
    const p = particles[i];

    // Без ховера — еле шевелится, на ховере — бодрее
    p.angle += 0.003 + (i % 5) * 0.0008 + hoverAmount * (0.012 + (i % 5) * 0.002);

    const animatedRadius =
      p.radius * (1 + sin(t * 1.2 + i * 0.35) * (0.02 + hoverAmount * 0.06));

    const x = width / 2 + cos(p.angle) * animatedRadius;
    const y = height / 2 + sin(p.angle * 1.4) * animatedRadius;

    const size = 16 + (i % 4) * 4 + sin(t * 1.6 + i) * hoverAmount * 1.8;

    fill(i % 2 === 0 ? "#FFC300" : "#FF86DB");
    circle(x, y, size);
  }
}`;

const handbookPart2Module3Preview = `const width = app.clientWidth;
const height = app.clientHeight;

let speedFactor = 0;
let targetSpeedFactor = 0;
let lastTime = 0;
let t = 0;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// камера
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.set(0, 0, 4);
camera.lookAt(0, 0, 0);

// рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// группа
const group = new THREE.Group();
scene.add(group);

// куб
const geometry = new THREE.BoxGeometry(1.35, 1.35, 1.35);

const material = new THREE.MeshStandardMaterial({
  color: 0xff86db,
  roughness: 0.42,
  metalness: 0.08,
});

const cube = new THREE.Mesh(geometry, material);
cube.rotation.set(-0.35, 0.55, 0.12);
group.add(cube);

// свет
const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 1.7);
mainLight.position.set(2.5, 3, 4);
scene.add(mainLight);

const fillLight = new THREE.DirectionalLight(0xff86db, 0.45);
fillLight.position.set(-3, -1, 2);
scene.add(fillLight);

// resize
function onResize() {
  const width = app.clientWidth;
  const height = app.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// hover-анимация
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

// анимация
let animationId;

function animate(time) {
  const deltaTime = time - lastTime;
  lastTime = time;

  // На ховере куб быстро разгоняется, без ховера — мягко успокаивается
  const easing = targetSpeedFactor > speedFactor ? 0.18 : 0.045;
  speedFactor += (targetSpeedFactor - speedFactor) * easing;

  // Время всегда идёт: без ховера медленно, на ховере быстрее
  t += 0.012 + speedFactor * 0.035;

  // Ленивое плавание в невесомости
  group.position.x = Math.sin(t * 0.65) * 0.12;
  group.position.y = Math.cos(t * 0.82) * 0.10;
  group.position.z = Math.sin(t * 0.5) * 0.08;

  // Лёгкое покачивание всегда есть
  group.rotation.x = Math.sin(t * 0.45) * 0.08;
  group.rotation.y = Math.cos(t * 0.38) * 0.08;
  group.rotation.z += 0.0015 + speedFactor * 0.01;

  // Без ховера куб еле крутится, на ховере бодро ускоряется
  cube.rotation.x += 0.002 + speedFactor * 0.026;
  cube.rotation.y += 0.003 + speedFactor * 0.038;
  cube.rotation.z += 0.001 + speedFactor * 0.014;

  // Лёгкий “желейный” акцент при разгоне
  const jelly = 1 + Math.sin(t * 2.4) * speedFactor * 0.035;
  cube.scale.set(jelly, 1 / jelly, 1);

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

const handbookPart3Module1Preview = `const palette = ['#FFC300', '#FF86DB'];

let t = 0;
let hoverAmount = 0;
let isHovering = false;

function updateHoverState(value) {
  isHovering = value;
}

function handlePreviewHover(event) {
  if (event.data?.type !== "coding-for-fun-preview-hover") return;
  updateHoverState(event.data.isHovered);
}

function setup() {
  const canvas = createCanvas(app.clientWidth, app.clientHeight);
  canvas.parent("app");

  canvas.mouseOver(() => {
    updateHoverState(true);
  });

  canvas.mouseOut(() => {
    updateHoverState(false);
  });

  rectMode(CENTER);
  noStroke();
  window.addEventListener("message", handlePreviewHover);
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

  // 1 — мышь наведена, 0 — мышь убрали
  const target = isHovering ? 1 : 0;

  // Чем больше последний параметр, тем быстрее начинается движение
  hoverAmount = lerp(hoverAmount, target, 0.1);

  const count = 140;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = min(width, height) * 0.38;

  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * TWO_PI;
    const radius = triangular() * maxRadius;

    const wave = sin(t + i * 0.18) * 8 * hoverAmount;

    const x = centerX + cos(angle) * (radius + wave);
    const y = centerY + sin(angle) * (radius + wave);

    const size = map(radius, 0, maxRadius, 30, 8);

    fill(palette[i % palette.length]);
    circle(x, y, size);
  }

  // Движение тоже плавно затухает
  t += 0.018 * hoverAmount;
}`;

const handbookPart3Module2Preview = `const palette = {
  pink: "#FF86DB",
  cyan: "#2FD3E6",
};

let t = 0;
let hoverAmount = 0;
let isHovering = false;

function updateHoverState(value) {
  isHovering = value;
}

function handlePreviewHover(event) {
  if (event.data?.type !== "coding-for-fun-preview-hover") return;
  updateHoverState(event.data.isHovered);
}

function setup() {
  const canvas = createCanvas(app.clientWidth, app.clientHeight);
  canvas.parent("app");

  angleMode(RADIANS);
  rectMode(CENTER);

  canvas.mouseOver(() => {
    updateHoverState(true);
  });

  canvas.mouseOut(() => {
    updateHoverState(false);
  });

  window.addEventListener("message", handlePreviewHover);
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  hoverAmount = lerp(hoverAmount, isHovering ? 1 : 0, 0.08);

  const size = min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;

  // Чуть сильнее движение на ховере
  const timeSpeed = 0.012 + hoverAmount * 0.02;
  t += timeSpeed;

  // Размер и плотность
  const baseLength = size * 0.16;
  const branches = 8;

  push();
  translate(centerX, centerY);

  // Общее "дыхание"
  const breathing = 1 + sin(t * 1.5) * (0.02 + hoverAmount * 0.035);
  scale(breathing);

  // Лёгкое вращение всей системы
  rotate(sin(t * 0.55) * (0.03 + hoverAmount * 0.08));

  // Центральное ядро
  noStroke();
  fill(palette.pink);
  circle(0, 0, size * 0.05);

  fill(palette.cyan);
  circle(0, 0, size * 0.022);

  // Радиальные фрактальные ветви
  for (let i = 0; i < branches; i++) {
    push();

    const angle = (TWO_PI / branches) * i;
    rotate(angle + sin(t * 0.9 + i * 0.4) * (0.02 + hoverAmount * 0.05));

    drawFractalBranch(baseLength, 6, i);

    pop();
  }

  pop();
}

function drawFractalBranch(length, depth, index) {
  if (depth <= 0 || length < 5) return;

  const progress = depth / 6;
  const colorMix = index % 2 === 0 ? palette.pink : palette.cyan;

  stroke(colorMix);
  strokeWeight(0.9 + progress * 2.2);
  strokeCap(ROUND);

  // Основная ветвь
  line(0, 0, 0, -length);

  // Узел
  noStroke();
  fill(colorMix);
  circle(0, -length, length * 0.16);

  fill("#FFFFFF");
  circle(0, -length, length * 0.06);

  translate(0, -length);

  // На ховере размах ветвей сильнее
  const baseAngle = 0.48 + hoverAmount * 0.16;
  const animatedAngle = baseAngle + sin(t * 1.3 + depth * 0.7 + index * 0.3) * (0.06 + hoverAmount * 0.08);
  const nextLength = length * 0.67;

  // Левая ветвь
  push();
  rotate(-animatedAngle);
  drawFractalBranch(nextLength, depth - 1, index + 1);
  pop();

  // Правая ветвь
  push();
  rotate(animatedAngle);
  drawFractalBranch(nextLength, depth - 1, index + 2);
  pop();

  // Средняя ветвь — усиливает ощущение фрактала
  if (depth > 2) {
    push();
    rotate(sin(t * 0.8 + index * 0.5) * (0.08 + hoverAmount * 0.06));
    drawFractalBranch(nextLength * 0.72, depth - 2, index + 3);
    pop();
  }
}`;

const landingPart1Preview = `let t = 0;
let hoverAmount = 0;
let isHovering = false;

function updateHoverState(value) {
  isHovering = value;
}

function handlePreviewHover(event) {
  if (event.data?.type !== "coding-for-fun-preview-hover") return;
  updateHoverState(event.data.isHovered);
}

function setup() {
  const canvas = createCanvas(app.clientWidth, app.clientHeight);
  canvas.parent("app");

  canvas.mouseOver(() => {
    updateHoverState(true);
  });

  canvas.mouseOut(() => {
    updateHoverState(false);
  });

  rectMode(CENTER);
  noStroke();

  window.addEventListener("message", handlePreviewHover);
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const target = isHovering ? 1 : 0;
  const easing = isHovering ? 0.18 : 0.055;
  hoverAmount = lerp(hoverAmount, target, easing);

  // В покое — ленивое движение, на ховере — бодрее
  t += 0.008 + hoverAmount * 0.035;

  const step = 48;
  const cols = floor((width - 64) / step);
  const rows = floor((height - 64) / step);
  const startX = width / 2 - ((cols - 1) * step) / 2;
  const startY = height / 2 - ((rows - 1) * step) / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const wave = sin(t + row * 0.8 + col * 0.45);

      // Без ховера сдвиг маленький, на ховере заметнее
      const shiftAmount = step * (0.06 + hoverAmount * 0.18);
      const shift = wave * shiftAmount;

      const x = startX + col * step + shift;
      const y = startY + row * step;

      // Лёгкое дыхание размера на ховере
      const sizePulse = cos(t * 1.2 + row + col) * hoverAmount * 3;
      const size = 24 + ((row + col) % 3) * 4 + sizePulse;

      fill((row + col) % 2 === 0 ? "#37E87A" : "#2FD3E6");
      circle(x, y, size);
    }
  }
}`;

const landingPart2Preview = `let t = 0;
let hoverAmount = 0;
let isHovering = false;

function updateHoverState(value) {
  isHovering = value;
}

function handlePreviewHover(event) {
  if (event.data?.type !== "coding-for-fun-preview-hover") return;
  updateHoverState(event.data.isHovered);
}

function setup() {
  const canvas = createCanvas(app.clientWidth, app.clientHeight);
  canvas.parent("app");

  canvas.mouseOver(() => {
    updateHoverState(true);
  });

  canvas.mouseOut(() => {
    updateHoverState(false);
  });

  noStroke();
  window.addEventListener("message", handlePreviewHover);
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const target = isHovering ? 1 : 0;
  const easing = isHovering ? 0.16 : 0.05;
  hoverAmount = lerp(hoverAmount, target, easing);

  const count = 34;
  const radius = min(width, height) * 0.28;
  const trailStep = 0.11;

  for (let i = count - 1; i >= 0; i -= 1) {
    const a = t - i * trailStep;

    const x = width / 2 + cos(a) * radius;
    const y = height / 2 + sin(a * 1.3) * radius * 0.72;

    // у головы круг большой, в хвосте — очень маленький
    const headProgress = 1 - i / (count - 1);
    const size = lerp(3, 56, pow(headProgress, 1.8));

    fill(i % 2 === 0 ? "#2FD3E6" : "#37E87A");
    circle(x, y, size);
  }

  // без ховера спокойно, на ховере заметно бодрее
  t += 0.012 + hoverAmount * 0.045;
}`;

const landingPart3Preview = `const width = app.clientWidth;
const height = app.clientHeight;

let speedFactor = 0;
let targetSpeedFactor = 0;
let lastTime = 0;
let t = 0;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

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

// группа — составной объект
const group = new THREE.Group();
group.position.y = 0.35;
scene.add(group);

// тело
const bodyGeometry = new THREE.BoxGeometry(1.5, 2, 1);
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x2fd3e6 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 0;
group.add(body);

// голова
const headGeometry = new THREE.BoxGeometry(1, 1, 1);
const headMaterial = new THREE.MeshStandardMaterial({ color: 0x9a9a9a });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 1.5;
group.add(head);

// руки
const armGeometry = new THREE.BoxGeometry(0.35, 1.5, 0.35);
const armMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });

const armLeft = new THREE.Mesh(armGeometry, armMaterial);
armLeft.position.x = -1.1;
armLeft.position.y = 0.2;
group.add(armLeft);

const armRight = new THREE.Mesh(armGeometry, armMaterial);
armRight.position.x = 1.1;
armRight.position.y = 0.2;
group.add(armRight);

// ноги / штаны
const bodyHeight = 2;
const headHeight = 1;
const legHeight = 1.25; // ноги = 3/5 от всей высоты персонажа

const legGeometry = new THREE.BoxGeometry(0.45, legHeight, 0.45);
const legMaterial = new THREE.MeshStandardMaterial({ color: 0x37e87a });

const bodyBottomY = -bodyHeight / 2;
const legCenterY = bodyBottomY - legHeight / 2;

const legLeft = new THREE.Mesh(legGeometry, legMaterial);
legLeft.position.x = -0.4;
legLeft.position.y = legCenterY;
group.add(legLeft);

const legRight = new THREE.Mesh(legGeometry, legMaterial);
legRight.position.x = 0.4;
legRight.position.y = legCenterY;
group.add(legRight);

// небольшой верхний элемент
const hatGeometry = new THREE.ConeGeometry(0.6, 0.7, 4);
const hatMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const hat = new THREE.Mesh(hatGeometry, hatMaterial);
hat.position.y = 2.35;
// group.add(hat);

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

// анимация
let animationId;

function animate(time) {
  const deltaTime = time - lastTime;
  lastTime = time;

  const easing = targetSpeedFactor > speedFactor ? 0.16 : 0.05;
  speedFactor += (targetSpeedFactor - speedFactor) * Math.min(deltaTime / 120, 1) * easing * 6;

  t += 0.01 + speedFactor * 0.035;

  // без ховера — ленивое покачивание
  group.position.y = 0.35 + Math.sin(t * 1.2) * 0.08;
  group.rotation.x = Math.sin(t * 0.7) * 0.03;
  group.rotation.y += 0.004 + speedFactor * 0.035;

  // лёгкое движение рук
  armLeft.rotation.z = Math.sin(t * 1.4) * (0.08 + speedFactor * 0.12);
  armRight.rotation.z = -Math.sin(t * 1.4) * (0.08 + speedFactor * 0.12);

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

window.addEventListener("resize", onResize);
window.addEventListener("message", handlePreviewHover);
renderer.domElement.addEventListener("mouseenter", playAnimation);
renderer.domElement.addEventListener("mouseleave", pauseAnimation);

animate(0);

// cleanup
return () => {
  cancelAnimationFrame(animationId);

  window.removeEventListener("resize", onResize);
  window.removeEventListener("message", handlePreviewHover);
  renderer.domElement.removeEventListener("mouseenter", playAnimation);
  renderer.domElement.removeEventListener("mouseleave", pauseAnimation);

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

  renderer.dispose();
};`;

const landingBoringLibrariesPreview = `const width = app.clientWidth;
const height = app.clientHeight;

let speedFactor = 0;
let targetSpeedFactor = 0;
let lastTime = 0;
let t = 0;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, 0, 7);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

app.innerHTML = "";
app.appendChild(renderer.domElement);

// свет
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 1.4);
mainLight.position.set(3, 4, 5);
scene.add(mainLight);

// общая группа
const group = new THREE.Group();
scene.add(group);

// материалы
const pinkMaterial = new THREE.MeshStandardMaterial({
  color: 0xff86db,
  roughness: 0.45,
  metalness: 0.05,
});

const cyanMaterial = new THREE.MeshStandardMaterial({
  color: 0x2fd3e6,
  roughness: 0.45,
  metalness: 0.05,
});

const greenMaterial = new THREE.MeshStandardMaterial({
  color: 0x37e87a,
  roughness: 0.5,
  metalness: 0.04,
});

const yellowMaterial = new THREE.MeshStandardMaterial({
  color: 0xffc300,
  roughness: 0.5,
  metalness: 0.04,
});

const darkLineMaterial = new THREE.LineBasicMaterial({
  color: 0x1f1f1f,
  transparent: true,
  opacity: 0.5,
});

// 1. Сетка — Vanilla JS
const gridGroup = new THREE.Group();
gridGroup.position.x = -1.55;
group.add(gridGroup);

const gridSize = 1.35;
const gridDivisions = 5;
const gridStep = gridSize / gridDivisions;
const gridPoints = [];

for (let i = 0; i <= gridDivisions; i += 1) {
  const p = -gridSize / 2 + i * gridStep;

  gridPoints.push(new THREE.Vector3(-gridSize / 2, p, 0));
  gridPoints.push(new THREE.Vector3(gridSize / 2, p, 0));

  gridPoints.push(new THREE.Vector3(p, -gridSize / 2, 0));
  gridPoints.push(new THREE.Vector3(p, gridSize / 2, 0));
}

const gridGeometry = new THREE.BufferGeometry().setFromPoints(gridPoints);
const grid = new THREE.LineSegments(gridGeometry, darkLineMaterial);
gridGroup.add(grid);

const cellGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.08);
const gridCells = [];

for (let i = 0; i < 9; i += 1) {
  const col = i % 3;
  const row = Math.floor(i / 3);

  const cell = new THREE.Mesh(
    cellGeometry,
    i % 2 === 0 ? greenMaterial : yellowMaterial
  );

  cell.position.set(
    -gridStep + col * gridStep,
    -gridStep + row * gridStep,
    0.06
  );

  gridCells.push(cell);
  gridGroup.add(cell);
}

// 2. Кружки — p5.js
const circlesGroup = new THREE.Group();
circlesGroup.position.x = 0;
group.add(circlesGroup);

const circleGeometry = new THREE.CircleGeometry(0.12, 32);
const circles = [];

for (let i = 0; i < 12; i += 1) {
  const circle = new THREE.Mesh(
    circleGeometry,
    i % 2 === 0 ? pinkMaterial : cyanMaterial
  );

  circles.push(circle);
  circlesGroup.add(circle);
}

// 3. Куб — Three.js
const cubeGroup = new THREE.Group();
cubeGroup.position.x = 1.55;
group.add(cubeGroup);

const cubeGeometry = new THREE.BoxGeometry(0.95, 0.95, 0.95);
const cube = new THREE.Mesh(cubeGeometry, pinkMaterial);
cube.rotation.set(-0.35, 0.55, 0.12);
cubeGroup.add(cube);

const smallCubeGeometry = new THREE.BoxGeometry(0.24, 0.24, 0.24);

const smallCubeA = new THREE.Mesh(smallCubeGeometry, cyanMaterial);
smallCubeA.position.set(-0.72, -0.68, 0.2);
cubeGroup.add(smallCubeA);

const smallCubeB = new THREE.Mesh(smallCubeGeometry, greenMaterial);
smallCubeB.position.set(0.72, 0.68, -0.15);
cubeGroup.add(smallCubeB);

// resize
function onResize() {
  const width = app.clientWidth;
  const height = app.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// hover
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

// анимация
let animationId;

function animate(time) {
  const deltaTime = time - lastTime;
  lastTime = time;

  const easing = targetSpeedFactor > speedFactor ? 0.16 : 0.055;
  speedFactor += (targetSpeedFactor - speedFactor) * Math.min(deltaTime / 120, 1) * easing * 6;

  // общий темп спокойнее
  t += 0.007 + speedFactor * 0.018;

  // общая ленивость
  group.position.y = Math.sin(t * 0.7) * 0.045;
  group.rotation.z = Math.sin(t * 0.45) * (0.012 + speedFactor * 0.015);

  // сетка слегка качается
  gridGroup.rotation.z = Math.sin(t * 0.8) * (0.055 + speedFactor * 0.06);
  gridGroup.position.y = Math.sin(t * 0.9) * 0.04;

  for (let i = 0; i < gridCells.length; i += 1) {
    const cell = gridCells[i];

    cell.position.z = 0.06 + Math.sin(t * 1.2 + i) * (0.015 + speedFactor * 0.035);
    cell.rotation.z += 0.0015 + speedFactor * 0.006;
  }

  // кружки двигаются спокойнее
  for (let i = 0; i < circles.length; i += 1) {
    const circle = circles[i];
    const angle = t * (0.35 + speedFactor * 0.55) + i * Math.PI * 2 / circles.length;
    const radius = 0.56 + Math.sin(t + i) * (0.02 + speedFactor * 0.035);

    circle.position.x = Math.cos(angle) * radius;
    circle.position.y = Math.sin(angle * 1.2) * radius * 0.72;
    circle.scale.setScalar(1 + Math.sin(t * 1.5 + i) * (0.025 + speedFactor * 0.055));
  }

  circlesGroup.rotation.z += 0.0008 + speedFactor * 0.004;

  // куб теперь крутится бодро, но не как бешеный
  cube.rotation.x += 0.0018 + speedFactor * 0.01;
  cube.rotation.y += 0.0024 + speedFactor * 0.014;

  smallCubeA.rotation.x += 0.002 + speedFactor * 0.012;
  smallCubeA.rotation.y += 0.0015 + speedFactor * 0.008;

  smallCubeB.rotation.x -= 0.0015 + speedFactor * 0.009;
  smallCubeB.rotation.y += 0.002 + speedFactor * 0.011;

  cubeGroup.position.y = Math.cos(t * 0.8) * 0.045;
  cubeGroup.rotation.z = Math.sin(t * 0.5) * (0.04 + speedFactor * 0.035);

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

  gridGeometry.dispose();
  cellGeometry.dispose();
  circleGeometry.dispose();
  cubeGeometry.dispose();
  smallCubeGeometry.dispose();

  pinkMaterial.dispose();
  cyanMaterial.dispose();
  greenMaterial.dispose();
  yellowMaterial.dispose();
  darkLineMaterial.dispose();

  renderer.dispose();
};`;

const landingBoringPortfolioPreview = `const width = app.clientWidth; 
const height = app.clientHeight;

let speedFactor = 0;
let targetSpeedFactor = 0;
let lastTime = 0;
let t = 0;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

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

  // Быстрее разгоняется, мягче успокаивается
  const easing = targetSpeedFactor > speedFactor ? 0.16 : 0.05;
  speedFactor += (targetSpeedFactor - speedFactor) * Math.min(deltaTime / 120, 1) * easing * 6;

  // Время всегда идет, но на ховере заметно быстрее
  t += 0.01 + speedFactor * 0.03;

  // Ленивое плавание без ховера
  group.position.x = Math.sin(t * 0.7) * 0.08;
  group.position.y = Math.cos(t * 0.9) * 0.06;
  group.rotation.z = Math.sin(t * 0.5) * 0.08 + speedFactor * 0.12;

  // Легкое вращение всегда есть
  knot.rotation.x += 0.003 + speedFactor * 0.02;
  knot.rotation.y += 0.004 + speedFactor * 0.03;

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

const landingBoringGalleryPreview = `let sandProgress = 0;
let hoverAmount = 0;
let isHovering = false;
let t = 0;

let isFlipping = false;
let flipAmount = 0;
let side = 1;

function updateHoverState(value) {
  isHovering = value;
}

function handlePreviewHover(event) {
  if (event.data?.type !== "coding-for-fun-preview-hover") return;
  updateHoverState(event.data.isHovered);
}

function setup() {
  const canvas = createCanvas(app.clientWidth, app.clientHeight);
  canvas.parent("app");

  canvas.mouseOver(() => {
    updateHoverState(true);
  });

  canvas.mouseOut(() => {
    updateHoverState(false);
  });

  noStroke();
  window.addEventListener("message", handlePreviewHover);
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function easeInOutCubic(x) {
  if (x < 0.5) {
    return 4 * x * x * x;
  }

  return 1 - pow(-2 * x + 2, 3) / 2;
}

function drawHourglassFrame(glassW, glassH, neckW) {
  stroke("#2FD3E6");
  strokeWeight(4);
  noFill();

  beginShape();
  vertex(-glassW, -glassH);
  vertex(glassW, -glassH);
  vertex(neckW, 0);
  vertex(-neckW, 0);
  endShape(CLOSE);

  beginShape();
  vertex(-neckW, 0);
  vertex(neckW, 0);
  vertex(glassW, glassH);
  vertex(-glassW, glassH);
  endShape(CLOSE);

  stroke("#FF86DB");
  strokeWeight(5);

  line(-glassW - 10, -glassH - 14, -glassW - 10, glassH + 14);
  line(glassW + 10, -glassH - 14, glassW + 10, glassH + 14);

  line(-glassW - 18, -glassH - 18, glassW + 18, -glassH - 18);
  line(-glassW - 18, glassH + 18, glassW + 18, glassH + 18);
}

function drawSourceSand(glassW, glassH, neckW, progress, side) {
  fill("#FFC300");
  noStroke();

  if (side === 1) {
    const ySurface = lerp(-glassH, 0, progress);
    const halfW = lerp(glassW, neckW, progress);

    beginShape();
    vertex(-halfW, ySurface);
    vertex(halfW, ySurface);
    vertex(neckW, 0);
    vertex(-neckW, 0);
    endShape(CLOSE);
  } else {
    const ySurface = lerp(glassH, 0, progress);
    const halfW = lerp(glassW, neckW, progress);

    beginShape();
    vertex(-neckW, 0);
    vertex(neckW, 0);
    vertex(halfW, ySurface);
    vertex(-halfW, ySurface);
    endShape(CLOSE);
  }
}

function drawTargetSand(glassW, glassH, neckW, progress, side) {
  const pileHeight = lerp(0, glassH * 0.88, progress);
  const halfW = lerp(neckW, glassW * 0.94, progress);

  fill("#FFC300");
  noStroke();

  if (side === 1) {
    beginShape();
    vertex(-neckW, 0);
    vertex(0, -8 * (1 - progress));
    vertex(neckW, 0);
    vertex(halfW, pileHeight);
    vertex(-halfW, pileHeight);
    endShape(CLOSE);
  } else {
    beginShape();
    vertex(-neckW, 0);
    vertex(0, 8 * (1 - progress));
    vertex(neckW, 0);
    vertex(halfW, -pileHeight);
    vertex(-halfW, -pileHeight);
    endShape(CLOSE);
  }
}

function drawSandStream(side, hoverAmount) {
  if (isFlipping) return;

  const grains = 16;
  const streamHeight = 92 * 0.8;
  const speed = 1.2 + hoverAmount * 2.4;

  for (let i = 0; i < grains; i += 1) {
    const offset = (t * speed + i * 0.22) % 1;

    const y =
      side === 1
        ? map(offset, 0, 1, -8, streamHeight)
        : map(offset, 0, 1, 8, -streamHeight);

    const size = max(3.6 - i * 0.08, 1.7);

    fill(i % 2 === 0 ? "#FFC300" : "#37E87A");
    circle(sin(t * 2 + i) * 0.6, y, size);
  }
}

function draw() {
  background("#FFFFFF");

  const target = isHovering ? 1 : 0;
  const easing = isHovering ? 0.18 : 0.05;
  hoverAmount = lerp(hoverAmount, target, easing);

  t += 0.012 + hoverAmount * 0.04;

  if (!isFlipping) {
    sandProgress += 0.0022 + hoverAmount * 0.012;

    if (sandProgress >= 1) {
      sandProgress = 1;
      isFlipping = true;
      flipAmount = 0;
    }
  } else {
    flipAmount += 0.028 + hoverAmount * 0.045;

    if (flipAmount >= 1) {
      flipAmount = 0;
      isFlipping = false;
      sandProgress = 0;
      side *= -1;
    }
  }

  const cx = width / 2;
  const cy = height / 2;

  const glassW = min(width, height) * 0.16;
  const glassH = min(width, height) * 0.22;
  const neckW = glassW * 0.18;

  push();
  translate(cx, cy);

  const idleTilt = sin(t * 0.7) * 0.04;
  const hoverTilt = -hoverAmount * 0.24;
  const baseRotation = side === 1 ? 0 : PI;
  const flipRotation = isFlipping ? easeInOutCubic(flipAmount) * PI : 0;

  rotate(baseRotation + flipRotation + idleTilt + hoverTilt);

  translate(sin(t * 0.9) * 4, cos(t * 0.8) * 3);

  drawSourceSand(glassW, glassH, neckW, sandProgress, side);
  drawTargetSand(glassW, glassH, neckW, sandProgress, side);
  drawSandStream(side, hoverAmount);
  drawHourglassFrame(glassW, glassH, neckW);

  pop();
}`;

export const previewCodeById = {
  handbookPart1Module1Preview,
  handbookPart1Module2Preview,
  handbookPart2Module1Preview,
  handbookPart2Module2Preview,
  handbookPart2Module3Preview,
  handbookPart3Module1Preview,
  handbookPart3Module2Preview,
  handbookPart3Module3Preview: previewCodeThree,
  landingPart1Preview,
  landingPart2Preview,
  landingPart3Preview,
  landingBoringPracticePreview: previewCodeVanilla,
  landingBoringLibrariesPreview,
  landingBoringPortfolioPreview,
  landingBoringGalleryPreview,
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
app.style.background = "#FFFFFF";

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

  background("#FFFFFF");
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
app.style.background = "#FFFFFF";

app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
  draw();
}

function draw() {
app.style.background = "#FFFFFF";
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
  background("#FFFFFF");
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

  background("#FFFFFF");
  fill('#111827');
  noStroke();
  textLeading(22);
  text(rows.join('\\n'), 20, 32);
}`,
};

export const defaultCodeById = {
  patr1module1tutorial1code1: `const palette = ["#2FD3E6", "#37E87A"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 5;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(0 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      circle(x, y, size);
    }
  }

  noLoop();
}`,
  patr1module1tutorial1code2: `const palette = ["#FF86DB", "#FFC300"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 5;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(frameCount * 0.02 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      circle(x, y, size);
    }
  }

  noLoop();
}`,
  patr1module1tutorial1code3: `const palette = ["#37E87A", "#2FD3E6"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 6;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(0 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      circle(x, y, size);
    }
  }

  // Измени cols или множитель size, чтобы получить другой ритм.
  noLoop();
}`,
  patr1module1tutorial2code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");
  const radius = min(width, height) * 0.28;
  const angle = frameCount * 0.035;

  fill("#FF86DB");
  circle(width / 2, height / 2, radius * 1.15);

  fill("#2FD3E6");
  circle(width / 2 + cos(angle) * radius, height / 2 + sin(angle) * radius, 64);

  fill("#FFC300");
  circle(width / 2 + cos(angle + PI) * radius, height / 2 + sin(angle + PI) * radius, 40);
}`,
  patr1module1tutorial2code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");
  const padding = 40;
  const count = 11;
  const step = (width - padding * 2) / (count - 1);

  for (let i = 0; i < count; i += 1) {
    const x = padding + i * step;
    const y = height / 2 + sin(frameCount * 0.04 + i * 0.65) * 56;
    const size = 34 + cos(frameCount * 0.04 + i) * 10;

    fill(i % 2 === 0 ? "#FF86DB" : "#FFC300");
    circle(x, y, size);
  }
}`,
  patr1module1tutorial2code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");
  const padding = 40;
  const count = 11;
  const step = (width - padding * 2) / (count - 1);

  for (let i = 0; i < count; i += 1) {
    const x = padding + i * step;
    const y = height / 2 + sin(frameCount * 0.04 + i * 0.65) * 56;
    const size = 34 + cos(frameCount * 0.04 + i) * 10;

    fill(i % 2 === 0 ? "#37E87A" : "#2FD3E6");
    circle(x, y, size);
  }
}`,
  patr1module1tutorial3code1: `const palette = ["#FFC300", "#FF86DB"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 5;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(0 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      circle(x, y, size);
    }
  }

  noLoop();
}`,
  patr1module1tutorial3code2: `const palette = ["#2FD3E6", "#37E87A"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 5;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(0 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      rectMode(CENTER);
      square(x, y, size);
    }
  }

  noLoop();
}`,
  patr1module1tutorial3code3: `const palette = ["#FF86DB", "#FFC300"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 6;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(row * 0.45 + col * 0.2 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      circle(x, y, size);
    }
  }

  // Попробуй заменить square на circle и сравнить характер композиции.
  noLoop();
}`,
  patr1module2tutorial1code1: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
  draw();
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const padding = 32;
  const cols = 6;
  const step = (Math.min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const size = step * (0.36 + (col + row) * 0.015);

      ctx.fillStyle = (row + col) % 2 === 0 ? "#2FD3E6" : "#37E87A";
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

window.addEventListener("resize", resize);
resize();

return () => {
  window.removeEventListener("resize", resize);
};`,
  patr1module2tutorial1code2: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
  draw();
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const padding = 32;
  const cols = 6;
  const step = (Math.min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const size = step * (0.36 + (col + row) * 0.015);

      ctx.fillStyle = (row + col) % 2 === 0 ? "#FF86DB" : "#FFC300";
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

window.addEventListener("resize", resize);
resize();

return () => {
  window.removeEventListener("resize", resize);
};`,
  patr1module2tutorial1code3: `const palette = ["#2FD3E6", "#FF86DB"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 5;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(0 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      circle(x, y, size);
    }
  }

  noLoop();
}`,
  patr1module2tutorial1code4: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
  draw();
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const padding = 32;
  const cols = 6;
  const step = (Math.min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const size = step * (0.36 + (col + row) * 0.015);

      ctx.fillStyle = (row + col) % 2 === 0 ? "#37E87A" : "#2FD3E6";
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    }
  }
}

window.addEventListener("resize", resize);
resize();

return () => {
  window.removeEventListener("resize", resize);
};`,
  patr1module2tutorial1code5: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
  draw();
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const padding = 32;
  const cols = 6;
  const step = (Math.min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const size = step * (0.36 + (col + row) * 0.015);

      ctx.fillStyle = (row + col) % 2 === 0 ? "#FFC300" : "#FF86DB";
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

window.addEventListener("resize", resize);
resize();

return () => {
  window.removeEventListener("resize", resize);
};`,
  patr1module2tutorial2code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");
  const padding = 40;
  const count = 11;
  const step = (width - padding * 2) / (count - 1);

  for (let i = 0; i < count; i += 1) {
    const x = padding + i * step;
    const y = height / 2 + sin(frameCount * 0.04 + i * 0.65) * 56;
    const size = 34 + cos(frameCount * 0.04 + i) * 10;

    fill(i % 2 === 0 ? "#2FD3E6" : "#37E87A");
    circle(x, y, size);
  }
}`,
  patr1module2tutorial2code2: `const palette = ["#FFC300", "#FF86DB"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 6;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(0 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      circle(x, y, size);
    }
  }

  noLoop();
}`,
  patr1module2tutorial2code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const step = 48;
  const cols = floor((width - 64) / step);
  const rows = floor((height - 64) / step);
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (rows - 1) * step / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const shift = sin(frameCount * 0.025 + row * 0.8 + col * 0.45) * step * 0.2;
      const x = startX + col * step + shift;
      const y = startY + row * step;
      const size = 24 + ((row + col) % 3) * 4;

      fill((row + col) % 2 === 0 ? "#37E87A" : "#2FD3E6");
      circle(x, y, size);
    }
  }
}`,
  patr1module2tutorial3code1: `const palette = ["#2FD3E6", "#FF86DB"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 5;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(0 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      circle(x, y, size);
    }
  }

  noLoop();
}`,
  patr1module2tutorial3code2: `const palette = ["#37E87A", "#FFC300"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 5;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(0 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      rectMode(CENTER);
      square(x, y, size);
    }
  }

  noLoop();
}`,
  patr1module2tutorial3code3: `const particles = [];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  for (let i = 0; i < 36; i += 1) {
    particles.push({ angle: i * TWO_PI / 36, radius: 32 + (i % 6) * 16 });
  }
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  for (let i = 0; i < particles.length; i += 1) {
    const p = particles[i];
    p.angle += 0.012 + (i % 5) * 0.002;
    const x = width / 2 + cos(p.angle) * p.radius;
    const y = height / 2 + sin(p.angle * 1.4) * p.radius;

    fill(i % 2 === 0 ? "#FFC300" : "#FF86DB");
    circle(x, y, 16 + (i % 4) * 4);
  }
}`,
  patr1module2tutorial4code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  randomSeed(42); // фиксируем случайность, чтобы композиция не прыгала
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");
  randomSeed(42);

  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = min(width, height) * 0.38;

  for (let i = 0; i < 72; i += 1) {
    const angle = (i / 72) * TWO_PI;
    const radius = random(maxRadius * 0.2, maxRadius);
    const x = centerX + cos(angle) * radius;
    const y = centerY + sin(angle) * radius;
    const size = random(14, 34);

    fill(i % 2 === 0 ? "#FFC300" : "#FF86DB");
    circle(x, y, size);
  }

  noLoop();
}`,
  patr1module2tutorial4code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  randomSeed(42); // фиксируем случайность, чтобы композиция не прыгала
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");
  randomSeed(42);

  const cols = 7;
  const rows = 5;
  const step = min(width / (cols + 1), height / (rows + 1));
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (rows - 1) * step / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const baseX = startX + col * step;
      const baseY = startY + row * step;
      const x = baseX + random(-step * 0.24, step * 0.24);
      const y = baseY + random(-step * 0.24, step * 0.24);
      const size = step * 0.42;

      fill((row + col) % 2 === 0 ? "#37E87A" : "#2FD3E6");
      circle(x, y, size);
    }
  }

  noLoop();
}`,
  patr1module2tutorial4code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  rectMode(CENTER);
  randomSeed(42); // фиксируем случайность, чтобы композиция не прыгала
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");
  randomSeed(42);

  const cols = 7;
  const rows = 5;
  const step = min(width / (cols + 1), height / (rows + 1));
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (rows - 1) * step / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const size = random(step * 0.28, step * 0.58);

      fill(random(["#37E87A", "#2FD3E6", "#FFC300", "#FF86DB"]));
      if (random() > 0.5) {
        circle(x, y, size);
      } else {
        square(x, y, size);
      }
    }
  }
  noLoop();
}`,
  patr1module2tutorial4code4: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  randomSeed(42); // фиксируем случайность, чтобы композиция не прыгала
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");
  randomSeed(42);

  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = min(width, height) * 0.38;

  for (let i = 0; i < 72; i += 1) {
    const angle = (i / 72) * TWO_PI;
    const radius = random(maxRadius * 0.2, maxRadius);
    const x = centerX + cos(angle) * radius;
    const y = centerY + sin(angle) * radius;
    const size = random(14, 34);

    fill(i % 2 === 0 ? "#FFC300" : "#FF86DB");
    circle(x, y, size);
  }

  noLoop();
}`,
  patr1module2tutorial5code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const step = 48;
  const cols = floor((width - 64) / step);
  const rows = floor((height - 64) / step);
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (rows - 1) * step / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const shift = 0;
      const x = startX + col * step + shift;
      const y = startY + row * step;
      const size = 24 + ((row + col) % 3) * 4;

      fill((row + col) % 2 === 0 ? "#37E87A" : "#2FD3E6");
      square(x, y, size);
    }
  }
}`,
  patr1module2tutorial5code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const step = 48;
  const cols = floor((width - 64) / step);
  const rows = floor((height - 64) / step);
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (rows - 1) * step / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const shift = sin(frameCount * 0.025 + row * 0.8 + col * 0.45) * step * 0.2;
      const x = startX + col * step + shift;
      const y = startY + row * step;
      const size = 24 + ((row + col) % 3) * 4;

      fill((row + col) % 2 === 0 ? "#37E87A" : "#2FD3E6");
      circle(x, y, size);
    }
  }
}`,
  patr1module2tutorial5code3: `const palette = ["#FF86DB", "#FFC300"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 6;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(0 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      rectMode(CENTER);
      square(x, y, size);
    }
  }

  noLoop();
}`,
  patr1module2tutorial5code4: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const step = 48;
  const cols = floor((width - 64) / step);
  const rows = floor((height - 64) / step);
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (rows - 1) * step / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const shift = sin(frameCount * 0.025 + row * 0.8 + col * 0.45) * step * 0.2;
      const x = startX + col * step + shift;
      const y = startY + row * step;
      const size = 24 + ((row + col) % 3) * 4;

      fill((row + col) % 2 === 0 ? "#37E87A" : "#2FD3E6");
      circle(x, y, size);
    }
  }
}`,
  patr2module1tutorial1code1: `const app = document.getElementById("app");
app.innerHTML = "";
app.style.position = "relative";
app.style.overflow = "hidden";
app.style.background = "#FFFFFF";

const colors = ["#37E87A", "#2FD3E6"];
const count = 9;
const gap = 48;
const startX = app.clientWidth / 2 - (count - 1) * gap / 2;

for (let i = 0; i < count; i += 1) {
  const dot = document.createElement("div");
  dot.style.position = "absolute";
  dot.style.left = startX + i * gap - 20 + "px";
  dot.style.top = app.clientHeight / 2 + Math.sin(i * 0.7) * 40 - 20 + "px";
  dot.style.width = "40px";
  dot.style.height = "40px";
  dot.style.borderRadius = "50%";
  dot.style.background = colors[i % colors.length];
  dot.style.transition = "transform 0.35s ease, opacity 0.35s ease";
  app.appendChild(dot);

  setTimeout(() => {
    dot.style.transform = "scale(0.62)";
    dot.style.opacity = "0.35";
  }, 500 + i * 45);
}`,
  patr2module1tutorial1code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");
  const padding = 40;
  const count = 11;
  const step = (width - padding * 2) / (count - 1);

  for (let i = 0; i < count; i += 1) {
    const x = padding + i * step;
    const y = height / 2 + sin(frameCount * 0.04 + i * 0.65) * 56;
    const size = 34 + cos(frameCount * 0.04 + i) * 10;

    fill(i % 2 === 0 ? "#37E87A" : "#2FD3E6");
    circle(x, y, size);
  }
}`,
  patr2module1tutorial1code3: `const app = document.getElementById("app");
app.innerHTML = "";
app.style.position = "relative";
app.style.overflow = "hidden";
app.style.background = "#FFFFFF";

const colors = ["#37E87A", "#2FD3E6"];
const count = 9;
const gap = 48;
const startX = app.clientWidth / 2 - (count - 1) * gap / 2;

for (let i = 0; i < count; i += 1) {
  const dot = document.createElement("div");
  dot.style.position = "absolute";
  dot.style.left = startX + i * gap - 20 + "px";
  dot.style.top = app.clientHeight / 2 + Math.sin(i * 0.7) * 40 - 20 + "px";
  dot.style.width = "40px";
  dot.style.height = "40px";
  dot.style.borderRadius = "50%";
  dot.style.background = colors[i % colors.length];
  dot.style.transition = "transform 0.35s ease, opacity 0.35s ease";
  app.appendChild(dot);

  setTimeout(() => {
    dot.style.transform = "scale(0.62)";
    dot.style.opacity = "0.35";
  }, 500 + i * 45);
}`,
  patr2module1tutorial2code1: `const width = app.clientWidth;
const height = app.clientHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.innerHTML = "";
app.appendChild(renderer.domElement);

const group = new THREE.Group();
scene.add(group);

const colors = [0xff86db, 0x2fd3e6];
const geometry = new THREE.BoxGeometry(0.42, 0.42, 0.42);
const materials = colors.map((color) => new THREE.MeshStandardMaterial({ color, roughness: 0.55 }));

for (let x = -2; x <= 2; x += 1) {
  for (let y = -1; y <= 1; y += 1) {
    const cube = new THREE.Mesh(geometry, materials[(x + y + 4) % 2]);
    cube.position.set(x * 0.64, y * 0.64, 0);
    group.add(cube);
  }
}

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(2, 3, 4);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 1.2));

function onResize() {
  const width = app.clientWidth;
  const height = app.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

let animationId;
function animate() {
  group.rotation.x += 0.006;
  group.rotation.y += 0.012;
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

window.addEventListener("resize", onResize);
animate();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);
  geometry.dispose();
  materials.forEach((material) => material.dispose());
  renderer.dispose();
};`,
  patr2module1tutorial2code2: `const app = document.getElementById("app");
app.innerHTML = "";
app.style.position = "relative";
app.style.overflow = "hidden";
app.style.background = "#FFFFFF";

const colors = ["#FF86DB", "#2FD3E6"];
const count = 5;
const gap = 56;
const cardWidth = 104;
const startX = app.clientWidth / 2 - ((count - 1) * gap + cardWidth) / 2;

for (let i = 0; i < count; i += 1) {
  const card = document.createElement("div");

  card.style.position = "absolute";
  card.style.left = startX + i * gap + "px";
  card.style.top = "50%";
  card.style.width = cardWidth + "px";
  card.style.height = "136px";
  card.style.borderRadius = "28px";
  card.style.background = colors[i % colors.length];
  card.style.transform = "translateY(-50%) rotate(" + ((i - 2) * 6) + "deg)";
  card.style.transition = "transform 0.3s ease";

  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-58%) rotate(" + ((i - 2) * 6) + "deg)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(-50%) rotate(" + ((i - 2) * 6) + "deg)";
  });

  app.appendChild(card);
}`,
  patr2module1tutorial2code3: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
  draw();
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const padding = 32;
  const cols = 6;
  const step = (Math.min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const size = step * (0.36 + (col + row) * 0.015);

      ctx.fillStyle = (row + col) % 2 === 0 ? "#FF86DB" : "#2FD3E6";
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    }
  }
}

window.addEventListener("resize", resize);
resize();

return () => {
  window.removeEventListener("resize", resize);
};`,
  patr2module1tutorial2code4: `const app = document.getElementById("app");
app.innerHTML = "";
app.style.position = "relative";
app.style.overflow = "hidden";
app.style.background = "#FFFFFF";

const colors = ["#FF86DB", "#2FD3E6"];
const count = 5;
const gap = 56;
const cardWidth = 104;
const startX = app.clientWidth / 2 - ((count - 1) * gap + cardWidth) / 2;

for (let i = 0; i < count; i += 1) {
  const card = document.createElement("div");
  card.style.position = "absolute";
  card.style.left = startX + i * gap + "px";
  card.style.top = "50%";
  card.style.width = cardWidth + "px";
  card.style.height = "136px";
  card.style.borderRadius = "28px";
  card.style.background = colors[i % colors.length];
  card.style.transform = "translateY(-50%) rotate(" + ((i - 2) * 6) + "deg)";
  card.style.transition = "transform 0.3s ease";

  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-58%) rotate(" + ((i - 2) * 6) + "deg)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(-50%) rotate(" + ((i - 2) * 6) + "deg)";
  });

  app.appendChild(card);
}`,
  patr2module1tutorial2code5: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let animationId;
let t = 0;
let pointerX = 0.5;

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
}

function onPointerMove(event) {
  const rect = canvas.getBoundingClientRect();
  pointerX = (event.clientX - rect.left) / rect.width;
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const count = 10;
  const padding = 40;
  const step = (width - padding * 2) / (count - 1);

  for (let i = 0; i < count; i += 1) {
    const x = padding + i * step;
    const y = height / 2 + Math.sin(t + i * 0.6) * (24 + pointerX * 56);
    const size = 28 + Math.cos(t + i) * 8;

    ctx.fillStyle = i % 2 === 0 ? "#FFC300" : "#FF86DB";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  t += 0.04;
  animationId = requestAnimationFrame(draw);
}

canvas.addEventListener("pointermove", onPointerMove);
window.addEventListener("resize", resize);
resize();
draw();

return () => {
  cancelAnimationFrame(animationId);
  canvas.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("resize", resize);
};`,
  patr2module1tutorial3code1: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let animationId;
let t = 0;
let pointerX = 0.5;

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
}

function onPointerMove(event) {
  const rect = canvas.getBoundingClientRect();
  pointerX = (event.clientX - rect.left) / rect.width;
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const count = 10;
  const padding = 40;
  const step = (width - padding * 2) / (count - 1);

  for (let i = 0; i < count; i += 1) {
    const x = padding + i * step;
    const y = height / 2 + Math.sin(t + i * 0.6) * (24 + pointerX * 56);
    const size = 28 + Math.cos(t + i) * 8;

    ctx.fillStyle = i % 2 === 0 ? "#FFC300" : "#FF86DB";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  t += 0.04;
  animationId = requestAnimationFrame(draw);
}

canvas.addEventListener("pointermove", onPointerMove);
window.addEventListener("resize", resize);

resize();
draw();

return () => {
  cancelAnimationFrame(animationId);
  canvas.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("resize", resize);
};`,
  patr2module1tutorial3code2: `const app = document.getElementById("app");
app.innerHTML = "";
app.style.position = "relative";
app.style.overflow = "hidden";
app.style.background = "#FFFFFF";

const colors = ["#37E87A", "#2FD3E6"];
const count = 9;
const gap = 48;
const startX = app.clientWidth / 2 - (count - 1) * gap / 2;

for (let i = 0; i < count; i += 1) {
  const dot = document.createElement("div");
  dot.style.position = "absolute";
  dot.style.left = startX + i * gap - 20 + "px";
  dot.style.top = app.clientHeight / 2 + Math.sin(i * 0.7) * 40 - 20 + "px";
  dot.style.width = "40px";
  dot.style.height = "40px";
  dot.style.borderRadius = "50%";
  dot.style.background = colors[i % colors.length];
  dot.style.transition = "transform 0.35s ease, opacity 0.35s ease";
  app.appendChild(dot);

  setTimeout(() => {
    dot.style.transform = "scale(0.62)";
    dot.style.opacity = "0.35";
  }, 500 + i * 45);
}`,
  patr2module1tutorial3code3: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let animationId;
let t = 0;
let pointerX = 0.5;

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
}

function onPointerMove(event) {
  const rect = canvas.getBoundingClientRect();
  pointerX = (event.clientX - rect.left) / rect.width;
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const count = 10;
  const padding = 40;
  const step = (width - padding * 2) / (count - 1);

  for (let i = 0; i < count; i += 1) {
    const x = padding + i * step;
    const y = height / 2 + Math.sin(t + i * 0.6) * (24 + pointerX * 56);
    const size = 28 + Math.cos(t + i) * 8;

    ctx.fillStyle = i % 2 === 0 ? "#FFC300" : "#FF86DB";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  t += 0.04;
  animationId = requestAnimationFrame(draw);
}

canvas.addEventListener("pointermove", onPointerMove);
window.addEventListener("resize", resize);
resize();
draw();

return () => {
  cancelAnimationFrame(animationId);
  canvas.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("resize", resize);
};`,
  patr2module2tutorial1code1: `const palette = ["#2FD3E6", "#FF86DB"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 5;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(0 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      circle(x, y, size);
    }
  }

  noLoop();
}`,
  patr2module2tutorial1code2: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
  draw();
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const padding = 32;
  const cols = 6;
  const step = (Math.min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const size = step * (0.36 + (col + row) * 0.015);

      ctx.fillStyle = (row + col) % 2 === 0 ? "#37E87A" : "#2FD3E6";
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

window.addEventListener("resize", resize);
resize();

return () => {
  window.removeEventListener("resize", resize);
};`,
  patr2module2tutorial1code3: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
  draw();
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const padding = 32;
  const cols = 6;
  const step = (Math.min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const size = step * (0.36 + (col + row) * 0.015);

      ctx.fillStyle = (row + col) % 2 === 0 ? "#FFC300" : "#FF86DB";
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    }
  }
}

window.addEventListener("resize", resize);
resize();

return () => {
  window.removeEventListener("resize", resize);
};`,
  patr2module2tutorial1code4: `const palette = ["#2FD3E6", "#37E87A"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 6;
  const step = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const wave = sin(frameCount * 0.025 + row * 0.7 + col * 0.4) * step * 0.12;
      const size = step * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      circle(x, y, size);
    }
  }

  noLoop();
}`,
  patr2module2tutorial2code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const centerX = constrain(mouseX, 40, width - 40);
  const centerY = constrain(mouseY, 40, height - 40);
  const radius = min(width, height) * 0.22;

  fill("#2FD3E6");
  circle(width / 2, height / 2, radius * 1.5);

  fill("#FF86DB");
  circle(centerX, centerY, radius * 0.65);

  fill("#FFC300");
  circle(width - centerX, height - centerY, radius * 0.38);
}`,
  patr2module2tutorial2code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");
  const padding = 40;
  const count = 11;
  const step = (width - padding * 2) / (count - 1);

  for (let i = 0; i < count; i += 1) {
    const x = padding + i * step;
    const y = height / 2 + sin(frameCount * 0.04 + i * 0.65) * 56;
    const size = 34 + cos(frameCount * 0.04 + i) * 10;

    fill(i % 2 === 0 ? "#FF86DB" : "#FFC300");
    circle(x, y, size);
  }
}`,
  patr2module2tutorial2code3: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const centerX = constrain(mouseX, 40, width - 40);
  const centerY = constrain(mouseY, 40, height - 40);
  const radius = min(width, height) * 0.22;

  fill("#2FD3E6");
  circle(width / 2, height / 2, radius * 1.5);

  fill("#FF86DB");
  circle(centerX, centerY, radius * 0.65);

  fill("#FFC300");
  circle(width - centerX, height - centerY, radius * 0.38);
}`,
  patr2module2tutorial3code1: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const step = 48;
  const cols = floor((width - 64) / step);
  const rows = floor((height - 64) / step);
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (rows - 1) * step / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const shift = 0;
      const x = startX + col * step + shift;
      const y = startY + row * step;
      const size = 24 + ((row + col) % 3) * 4;

      fill((row + col) % 2 === 0 ? "#37E87A" : "#2FD3E6");
      square(x, y, size);
    }
  }
}`,
  patr2module2tutorial3code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const step = 48;
  const cols = floor((width - 64) / step);
  const rows = floor((height - 64) / step);
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (rows - 1) * step / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const shift = sin(frameCount * 0.025 + row * 0.8 + col * 0.45) * step * 0.2;
      const x = startX + col * step + shift;
      const y = startY + row * step;
      const size = 24 + ((row + col) % 3) * 4;

      fill((row + col) % 2 === 0 ? "#37E87A" : "#2FD3E6");
      circle(x, y, size);
    }
  }
}`,
  patr2module2tutorial3code3: `const palette = ["#37E87A", "#2FD3E6"];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  rectMode(CENTER);
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const padding = 32;
  const cols = 6;
  const cellStep = (min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * cellStep / 2;
  const startY = height / 2 - (cols - 1) * cellStep / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * cellStep;
      const y = startY + row * cellStep;
      const wave = sin(row * 0.7 + col * 0.4) * cellStep * 0.12;
      const size = cellStep * 0.52 + wave;

      fill(palette[(row + col) % palette.length]);
      square(x, y, size);
    }
  }

  noLoop();
}`,
  patr2module2tutorial3code4: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const step = 48;
  const cols = floor((width - 64) / step);
  const rows = floor((height - 64) / step);
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (rows - 1) * step / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const shift = sin(frameCount * 0.025 + row * 0.8 + col * 0.45) * step * 0.2;
      const x = startX + col * step + shift;
      const y = startY + row * step;
      const size = 24 + ((row + col) % 3) * 4;

      fill((row + col) % 2 === 0 ? "#37E87A" : "#2FD3E6");
      circle(x, y, size);
    }
  }
}`,
  patr2module2tutorial3code5: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const step = 48;
  const cols = floor((width - 64) / step);
  const rows = floor((height - 64) / step);
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (rows - 1) * step / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const shift = sin(frameCount * 0.025 + row * 0.8 + col * 0.45) * step * 0.2;
      const x = startX + col * step + shift;
      const y = startY + row * step;
      const size = 24 + ((row + col) % 3) * 4;

      fill((row + col) % 2 === 0 ? "#37E87A" : "#2FD3E6");
      circle(x, y, size);
    }
  }
}`,
  patr2module2tutorial4code1: `let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const count = 14;
  const radius = min(width, height) * 0.28;
  for (let i = count - 1; i >= 0; i -= 1) {
    const a = t - i * 0.18;
    const x = width / 2 + cos(a) * radius;
    const y = height / 2 + sin(a * 1.3) * radius * 0.72;
    const size = 56 - i * 2;

    fill(i % 2 === 0 ? "#2FD3E6" : "#37E87A");
    circle(x, y, size);
  }

  t += 0.035;
}`,
  patr2module2tutorial4code2: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let animationId;
let t = 0;
let pointerX = 0.5;

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
}

function onPointerMove(event) {
  const rect = canvas.getBoundingClientRect();
  pointerX = (event.clientX - rect.left) / rect.width;
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const count = 10;
  const padding = 40;
  const step = (width - padding * 2) / (count - 1);

  for (let i = 0; i < count; i += 1) {
    const x = padding + i * step;
    const y = height / 2 + Math.sin(t + i * 0.6) * (24 + pointerX * 56);
    const size = 28 + Math.cos(t + i) * 8;

    ctx.fillStyle = i % 2 === 0 ? "#FFC300" : "#FF86DB";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  t += 0.04;
  animationId = requestAnimationFrame(draw);
}

canvas.addEventListener("pointermove", onPointerMove);
window.addEventListener("resize", resize);
resize();
draw();

return () => {
  cancelAnimationFrame(animationId);
  canvas.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("resize", resize);
};`,
  patr2module2tutorial4code3: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
  draw();
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const padding = 32;
  const cols = 6;
  const step = (Math.min(width, height) - padding * 2) / cols;
  const startX = width / 2 - (cols - 1) * step / 2;
  const startY = height / 2 - (cols - 1) * step / 2;

  for (let row = 0; row < cols; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * step;
      const y = startY + row * step;
      const size = step * (0.36 + (col + row) * 0.015);

      ctx.fillStyle = (row + col) % 2 === 0 ? "#2FD3E6" : "#37E87A";
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

window.addEventListener("resize", resize);
resize();

return () => {
  window.removeEventListener("resize", resize);
};`,
  patr2module2tutorial4code4: `const particles = [];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  for (let i = 0; i < 36; i += 1) {
    particles.push({ angle: i * TWO_PI / 36, radius: 32 + (i % 6) * 16 });
  }
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  for (let i = 0; i < particles.length; i += 1) {
    const p = particles[i];
    p.angle += 0.012 + (i % 5) * 0.002;
    const x = width / 2 + cos(p.angle) * p.radius;
    const y = height / 2 + sin(p.angle * 1.4) * p.radius;

    fill(i % 2 === 0 ? "#FFC300" : "#FF86DB");
    circle(x, y, 16 + (i % 4) * 4);
  }
}`,
  patr2module2tutorial5code1: `const particles = [];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  for (let i = 0; i < 58; i += 1) {
    particles.push({ angle: 2 * i * TWO_PI / 36, radius: 42 + (i % 8) * 16 });
  }
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  for (let i = 0; i < particles.length; i += 1) {
    const p = particles[i];
    p.angle += 0.012 + (i % 5) * 0.002;
    const x = width / 2 + cos(p.angle) * p.radius;
    const y = height / 2 + sin(p.angle * 1.4) * p.radius;

    fill(i % 2 === 0 ? "#FFC300" : "#FF86DB");
    circle(x, y, 16 + (i % 4) * 4);
  }
}`,
  patr2module2tutorial5code2: `function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  randomSeed(42); // фиксируем случайность, чтобы композиция не прыгала
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");
  randomSeed(42);

  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = min(width, height) * 0.38;

  for (let i = 0; i < 72; i += 1) {
    const angle = (i / 72) * TWO_PI;
    const radius = random(maxRadius * 0.2, maxRadius);
    const x = centerX + cos(angle) * radius;
    const y = centerY + sin(angle) * radius;
    const size = random(14, 34);

    fill(i % 2 === 0 ? "#FFC300" : "#FF86DB");
    circle(x, y, size);
  }

  noLoop();
}`,
  patr2module2tutorial5code3: `const particles = [];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  for (let i = 0; i < 36; i += 1) {
    particles.push({ angle: i * TWO_PI / 36, radius: 32 + (i % 6) * 16 });
  }
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  for (let i = 0; i < particles.length; i += 1) {
    const p = particles[i];
    p.angle += 0.012 + (i % 5) * 0.002;
    const x = width / 2 + cos(p.angle) * p.radius;
    const y = height / 2 + sin(p.angle * 1.4) * p.radius;

    fill(i % 2 === 0 ? "#FFC300" : "#FF86DB");
    circle(x, y, 16 + (i % 4) * 4);
  }
}`,
  patr2module2tutorial5code4: `const particles = [];

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noStroke();
  for (let i = 0; i < 58; i += 1) {
    particles.push({ angle: 2 * i * TWO_PI / 36, radius: 42 + (i % 8) * 16 });
  }
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  for (let i = 0; i < particles.length; i += 1) {
    const p = particles[i];
    p.angle += 0.012 + (i % 5) * 0.002;
    const x = width / 2 + cos(p.angle) * p.radius;
    const y = height / 2 + sin(p.angle * 1.4) * p.radius;

    fill(i % 2 === 0 ? "#FFC300" : "#FF86DB");
    circle(x, y, 16 + (i % 4) * 4);
  }
}`,
  patr2module3tutorial1code1: `const width = app.clientWidth;
const height = app.clientHeight;

// сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff); // задаём цвет фона

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
// material.color.set(0xbdbdbd);
// material.color.set(0xff86db);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
    scene.background = new THREE.Color(0xffffff);<br>
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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
scene.background = new THREE.Color(0xffffff);

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
  patr3module2tutorial1code1: `const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let animationId;
let time = 0;

app.innerHTML = '';
app.style.width = '100%';
app.style.height = '100%';
app.style.background = '#FFFFFF';
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
}

function drawBranch(x, y, radius, angle, depth) {
  // Базовый случай: мелкие уровни уже не рисуем.
  if (depth <= 0 || radius < 5) return;

  const colors = ['#FF86DB', '#2FD3E6'];
  ctx.fillStyle = colors[depth % colors.length];
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  const nextRadius = radius * 0.62;
  const distance = radius * 1.18;
  const turn = Math.sin(time + depth * 0.7) * 0.32;

  for (let side = -1; side <= 1; side += 2) {
    const nextAngle = angle + side * (0.82 + turn);
    const nextX = x + Math.cos(nextAngle) * distance;
    const nextY = y + Math.sin(nextAngle) * distance;
    drawBranch(nextX, nextY, nextRadius, nextAngle, depth - 1);
  }
}

function draw() {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const size = Math.min(canvas.width, canvas.height);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const startRadius = Math.max(28, size * 0.14);

  // Четыре запуска одной рекурсивной функции создают розетку.
  for (let i = 0; i < 4; i += 1) {
    const angle = time * 0.25 + i * Math.PI / 2;
    drawBranch(centerX, centerY, startRadius, angle, 6);
  }

  time += 0.018;
  animationId = requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
};`,
  patr3module2tutorial1code2: `let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function recursiveOrbit(size, depth) {
  if (depth <= 0 || size < 6) return;

  const palette = ['#FFC300', '#37E87A'];
  fill(palette[depth % palette.length]);
  circle(0, 0, size);

  const branches = 3;
  const nextSize = size * 0.58;
  const distance = size * 0.56;

  for (let i = 0; i < branches; i += 1) {
    push();
    rotate(t + i * TWO_PI / branches);
    translate(distance, 0);
    rotate(-t * 0.65);
    recursiveOrbit(nextSize, depth - 1);
    pop();
  }
}

function draw() {
  background('#FFFFFF');

  const size = min(width, height);
  translate(width / 2, height / 2);
  rotate(t * 0.35);
  recursiveOrbit(size * 0.32, 6);

  t += 0.01;
}`,
  patr3module2tutorial1code3: `const width = app.clientWidth;
const height = app.clientHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 120);
camera.position.set(0, 0, 7);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.innerHTML = '';
app.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 1.8));
const light = new THREE.DirectionalLight(0xffffff, 2.2);
light.position.set(3, 5, 6);
scene.add(light);

const tunnel = new THREE.Group();
scene.add(tunnel);

const pink = new THREE.MeshStandardMaterial({ color: 0xff86db, roughness: 0.46, metalness: 0.04 });
const cyan = new THREE.MeshStandardMaterial({ color: 0x2fd3e6, roughness: 0.5, metalness: 0.04 });
const yellow = new THREE.MeshStandardMaterial({ color: 0xffc300, roughness: 0.52, metalness: 0.02 });
const materials = [pink, cyan, yellow];
const boxGeometry = new THREE.BoxGeometry(1, 1, 0.18);
const ringGeometry = new THREE.TorusGeometry(1, 0.035, 12, 80);
const portals = [];

function buildPortal(level, maxLevel, z) {
  if (level >= maxLevel) return;

  const group = new THREE.Group();
  const scale = 3.7 * Math.pow(0.86, level % 9);
  group.position.z = z - level * 2.4;
  group.rotation.z = level * 0.34;
  group.scale.setScalar(scale);

  const ring = new THREE.Mesh(ringGeometry, materials[level % materials.length]);
  group.add(ring);

  // Четыре квадрата делают портал более графичным.
  for (let i = 0; i < 4; i += 1) {
    const tile = new THREE.Mesh(boxGeometry, materials[(level + i + 1) % materials.length]);
    const angle = i * Math.PI / 2;
    tile.position.set(Math.cos(angle), Math.sin(angle), 0);
    tile.scale.set(0.18, 0.18, 1);
    tile.rotation.z = angle;
    group.add(tile);
  }

  tunnel.add(group);
  portals.push(group);
  buildPortal(level + 1, maxLevel, z);
}

buildPortal(0, 18, 0);

function onResize() {
  const nextWidth = app.clientWidth;
  const nextHeight = app.clientHeight;
  camera.aspect = nextWidth / nextHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(nextWidth, nextHeight);
}

let animationId;
let time = 0;

function animate() {
  time += 0.016;
  camera.position.z -= 0.035;
  tunnel.rotation.z = time * 0.12;

  portals.forEach((portal, index) => {
    portal.rotation.z += 0.004 + index * 0.0004;

    // Когда портал проходит за камерой, переносим его в глубину тоннеля.
    if (portal.position.z > camera.position.z + 2) {
      portal.position.z -= portals.length * 2.4;
    }
  });

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

window.addEventListener('resize', onResize);
animate();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', onResize);
  boxGeometry.dispose();
  ringGeometry.dispose();
  materials.forEach((material) => material.dispose());
  renderer.dispose();
};`,
  patr3module2tutorial1code4: `let t = 0;
let maxDepth = 6;
let scaleStep = 0.64;
let branchAngle = 0.72;
let shapeMode = 'mixed';

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function drawRecursiveBadge(size, depth) {
  if (depth <= 0 || size < 5) return;

  const palette = ['#FF86DB', '#FFC300'];
  fill(palette[depth % palette.length]);

  if (shapeMode === 'squares') {
    rect(0, 0, size, size, size * 0.16);
  } else if (shapeMode === 'circles') {
    circle(0, 0, size);
  } else {
    depth % 2 === 0 ? circle(0, 0, size) : rect(0, 0, size, size, size * 0.14);
  }

  const nextSize = size * scaleStep;
  const distance = size * 0.48;
  const branches = depth % 2 === 0 ? 4 : 3;

  for (let i = 0; i < branches; i += 1) {
    push();
    rotate(i * TWO_PI / branches + branchAngle + sin(t + depth) * 0.08);
    translate(distance, 0);
    rotate(-branchAngle * 0.7);
    drawRecursiveBadge(nextSize, depth - 1);
    pop();
  }
}

function draw() {
  background('#FFFFFF');

  // Эксперимент 1: глубина рекурсии.
  // maxDepth = 4;
  // maxDepth = 8;

  // Эксперимент 2: скорость уменьшения.
  // scaleStep = 0.54;
  // scaleStep = 0.72;

  // Эксперимент 3: угол ветвления.
  // branchAngle = 0.35;
  // branchAngle = 1.05;

  // Эксперимент 4: тип формы.
  // shapeMode = 'circles';
  // shapeMode = 'squares';
  // shapeMode = 'mixed';

  const startSize = min(width, height) * 0.26;
  translate(width / 2, height / 2);
  rotate(t * 0.22);
  drawRecursiveBadge(startSize, maxDepth);

  t += 0.012;
}`,
  patr3module2tutorial2code1: `const palette = {
  pink: "#FF86DB",
  cyan: "#2FD3E6",
};

let t = 0;

function setup() {
  const canvas = createCanvas(app.clientWidth, app.clientHeight);
  canvas.parent("app");

  angleMode(RADIANS);
  rectMode(CENTER);
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
}

function draw() {
  background("#FFFFFF");

  const size = min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;

  // Общий масштаб ограничивает фрактал внутри превью
  const baseLength = size * 0.18;
  const branches = 10;

  t += 0.012;

  translate(centerX, centerY);

  // Небольшое дыхание всей эмблемы
  const breathing = 1 + sin(t * 1.4) * 0.025;
  scale(breathing);

  // Центральный знак, чтобы композиция собиралась в плотное ядро
  noStroke();
  fill(palette.pink);
  circle(0, 0, size * 0.055);

  fill(palette.cyan);
  circle(0, 0, size * 0.028);

  // Радиальные фрактальные ветви
  for (let i = 0; i < branches; i++) {
    push();

    const angle = (TWO_PI / branches) * i;
    rotate(angle + sin(t * 0.8) * 0.025);

    drawFractalBranch(baseLength, 5, i);

    pop();
  }
}

function drawFractalBranch(length, depth, index) {
  if (depth <= 0 || length < 6) return;

  const progress = depth / 5;
  const colorMix = index % 2 === 0 ? palette.pink : palette.cyan;

  stroke(colorMix);
  strokeWeight(1.2 + progress * 2.4);
  strokeCap(ROUND);

  // Основная линия ветви
  line(0, 0, 0, -length);

  // Узел на конце ветви
  noStroke();
  fill(colorMix);
  circle(0, -length, length * 0.18);

  // Маленький внутренний круг добавляет ощущение логотипа
  fill("#FFFFFF");
  circle(0, -length, length * 0.08);

  translate(0, -length);

  const animatedAngle = 0.42 + sin(t + depth * 0.6) * 0.08;
  const nextLength = length * 0.64;

  // Левая дочерняя ветвь
  push();
  rotate(-animatedAngle);
  drawFractalBranch(nextLength, depth - 1, index + 1);
  pop();

  // Правая дочерняя ветвь
  push();
  rotate(animatedAngle);
  drawFractalBranch(nextLength, depth - 1, index + 2);
  pop();

  // Средняя короткая ветвь уплотняет знак, но не ломает симметрию
  if (depth > 2) {
    push();
    rotate(sin(t * 0.7 + index) * 0.08);
    drawFractalBranch(nextLength * 0.72, depth - 2, index + 3);
    pop();
  }
}`,
  patr3module2tutorial2code2: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

let animationId;
let t = 0;

const palette = {
  pink: "#FF86DB",
  yellow: "#FFC300",
};

app.innerHTML = "";
app.style.width = "100%";
app.style.height = "100%";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  const dpr = window.devicePixelRatio || 1;

  canvas.style.width = app.clientWidth + "px";
  canvas.style.height = app.clientHeight + "px";

  canvas.width = app.clientWidth * dpr;
  canvas.height = app.clientHeight * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawCircle(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawSquare(x, y, size, angle, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.fillStyle = color;
  ctx.fillRect(-size / 2, -size / 2, size, size);

  ctx.restore();
}

function drawRosetteLayer(radius, shapeSize, depth, rotation) {
  if (depth <= 0 || radius < 8 || shapeSize < 3) return;

  const count = 8 + depth * 2;
  const color = depth % 2 === 0 ? palette.pink : palette.yellow;

  for (let i = 0; i < count; i++) {
    const angle = rotation + (Math.PI * 2 / count) * i;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    // Чередуем круги и квадраты, чтобы знак был плотнее и ритмичнее
    if (i % 2 === 0) {
      drawCircle(x, y, shapeSize, color);
    } else {
      drawSquare(x, y, shapeSize * 0.82, angle + t * 0.4, color);
    }

    // Маленькая внутренняя точка добавляет фрактальную детализацию
    if (depth > 2) {
      const innerX = x * 0.72;
      const innerY = y * 0.72;
      const innerColor = depth % 2 === 0 ? palette.yellow : palette.pink;

      drawCircle(innerX, innerY, shapeSize * 0.28, innerColor);
    }
  }

  // Следующий уровень уходит внутрь композиции
  drawRosetteLayer(
    radius * 0.66,
    shapeSize * 0.74,
    depth - 1,
    rotation - 0.28 + Math.sin(t + depth) * 0.035
  );
}

function draw() {
  const width = app.clientWidth;
  const height = app.clientHeight;
  const size = Math.min(width, height);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  t += 0.012;

  const centerX = width / 2;
  const centerY = height / 2;

  // Размер подобран так, чтобы сохранялся аккуратный padding
  const outerRadius = size * 0.34;
  const baseShapeSize = size * 0.07;

  ctx.save();
  ctx.translate(centerX, centerY);

  // Очень лёгкая анимация: знак будто дышит, но не распадается
  const breathing = 1 + Math.sin(t * 1.5) * 0.018;
  ctx.scale(breathing, breathing);
  ctx.rotate(Math.sin(t * 0.7) * 0.035);

  drawRosetteLayer(outerRadius, baseShapeSize, 5, t * 0.18);

  // Центральное ядро собирает все уровни в один знак
  drawCircle(0, 0, size * 0.105, palette.pink);
  drawSquare(0, 0, size * 0.06, Math.PI / 4 + t * 0.25, palette.yellow);
  drawCircle(0, 0, size * 0.034, "#FFFFFF");

  ctx.restore();

  animationId = requestAnimationFrame(draw);
}

resize();
draw();

window.addEventListener("resize", resize);`,
  patr3module2tutorial2code3: `const palette = {
  pink: "#FF86DB",
  cyan: "#2FD3E6",
};

let sentence = "";
let segments = [];
let nodes = [];

let reveal = 0;
let revealSpeed = 1.8;

let drawingScale = 1;
let drawingOffsetX = 0;
let drawingOffsetY = 0;

function setup() {
  const canvasWidth = Math.max(app.clientWidth, 320);
  const canvasHeight = Math.max(app.clientHeight, 240);

  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("app");

  angleMode(RADIANS);

  createLSystem();
  createGeometry();
}

function windowResized() {
  const canvasWidth = Math.max(app.clientWidth, 320);
  const canvasHeight = Math.max(app.clientHeight, 240);

  resizeCanvas(canvasWidth, canvasHeight);
  createGeometry();
}

function createLSystem() {
  sentence = "X";

  const iterations = 4;

  for (let i = 0; i < iterations; i++) {
    let next = "";

    for (let j = 0; j < sentence.length; j++) {
      const char = sentence.charAt(j);

      if (char === "X") {
        next += "F[+X]F[-X]+X";
      } else if (char === "F") {
        next += "FF";
      } else {
        next += char;
      }
    }

    sentence = next;
  }
}

function createGeometry() {
  segments = [];
  nodes = [];

  const step = 12;
  const angleStep = Math.PI / 5.4;

  let x = 0;
  let y = 0;
  let angle = -Math.PI / 2;

  const stack = [];

  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;

  for (let i = 0; i < sentence.length; i++) {
    const char = sentence.charAt(i);

    if (char === "F") {
      const nextX = x + Math.cos(angle) * step;
      const nextY = y + Math.sin(angle) * step;

      segments.push({
        x1: x,
        y1: y,
        x2: nextX,
        y2: nextY,
        depth: stack.length,
      });

      nodes.push({
        x: nextX,
        y: nextY,
        depth: stack.length,
      });

      x = nextX;
      y = nextY;
    }

    if (char === "+") {
      angle += angleStep;
    }

    if (char === "-") {
      angle -= angleStep;
    }

    if (char === "[") {
      stack.push({
        x: x,
        y: y,
        angle: angle,
      });

      nodes.push({
        x: x,
        y: y,
        depth: stack.length,
      });
    }

    if (char === "]") {
      const state = stack.pop();

      if (state) {
        x = state.x;
        y = state.y;
        angle = state.angle;
      }
    }

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  const drawingWidth = Math.max(maxX - minX, 1);
  const drawingHeight = Math.max(maxY - minY, 1);

  const padding = 40;
  const availableWidth = Math.max(width - padding * 2, 1);
  const availableHeight = Math.max(height - padding * 2, 1);

  drawingScale = Math.min(
    availableWidth / drawingWidth,
    availableHeight / drawingHeight
  );

  // Ограничиваем масштаб, чтобы знак не становился слишком огромным
  drawingScale = Math.min(drawingScale, 1.7);

  drawingOffsetX = width / 2 - ((minX + maxX) / 2) * drawingScale;
  drawingOffsetY = height / 2 - ((minY + maxY) / 2) * drawingScale;

  reveal = 0;
}

function drawSegment(segment, index) {
  const color = index % 3 === 0 ? palette.cyan : palette.pink;
  const depth = Math.min(segment.depth, 6);

  stroke(color);
  strokeWeight(Math.max(1.2, 3.4 - depth * 0.35));
  strokeCap(ROUND);

  line(segment.x1, segment.y1, segment.x2, segment.y2);
}

function drawNode(node, index) {
  const color = index % 2 === 0 ? palette.pink : palette.cyan;
  const size = Math.max(3.2, 7 - node.depth * 0.65);

  noStroke();
  fill(color);
  circle(node.x, node.y, size);

  fill("#FFFFFF");
  circle(node.x, node.y, size * 0.42);
}

function draw() {
  background("#FFFFFF");

  if (segments.length === 0) return;

  reveal += revealSpeed;

  if (reveal > segments.length + 70) {
    reveal = 0;
  }

  const visibleSegments = Math.min(Math.floor(reveal), segments.length);

  push();

  translate(drawingOffsetX, drawingOffsetY);

  const breathing = 1 + Math.sin(frameCount * 0.025) * 0.012;
  scale(drawingScale * breathing);

  for (let i = 0; i < visibleSegments; i++) {
    drawSegment(segments[i], i);
  }

  const visibleNodes = Math.min(visibleSegments, nodes.length);

  for (let i = 0; i < visibleNodes; i++) {
    drawNode(nodes[i], i);
  }

  // Стартовая точка, чтобы знак визуально собирался из центра
  noStroke();
  fill(palette.pink);
  circle(0, 0, 9);

  fill(palette.cyan);
  circle(0, 0, 4.5);

  pop();
}`,
  patr3module2tutorial2code4: `const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const palette = {
  pink: "#FF86DB",
  cyan: "#2FD3E6",
};

let sentence = "";
let segments = [];
let nodes = [];

app.innerHTML = "";
app.style.width = "100%";
app.style.height = "100%";
app.style.background = "#FFFFFF";
app.appendChild(canvas);

function resize() {
  const dpr = window.devicePixelRatio || 1;
  const canvasWidth = Math.max(app.clientWidth, 320);
  const canvasHeight = Math.max(app.clientHeight, 240);

  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  buildPoster();
}

function buildLSystem() {
  sentence = "X";

  const iterations = 4;

  for (let i = 0; i < iterations; i++) {
    let next = "";

    for (let j = 0; j < sentence.length; j++) {
      const char = sentence.charAt(j);

      if (char === "X") {
        next += "F[+X]F[-X]+FX";
      } else if (char === "F") {
        next += "FF";
      } else {
        next += char;
      }
    }

    sentence = next;
  }
}

function buildGeometry() {
  segments = [];
  nodes = [];

  const step = 12;
  const angleStep = Math.PI / 5.5;

  let x = 0;
  let y = 0;
  let angle = -Math.PI / 2;

  const stack = [];

  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;

  for (let i = 0; i < sentence.length; i++) {
    const char = sentence.charAt(i);

    if (char === "F") {
      const nextX = x + Math.cos(angle) * step;
      const nextY = y + Math.sin(angle) * step;

      segments.push({
        x1: x,
        y1: y,
        x2: nextX,
        y2: nextY,
        depth: stack.length,
      });

      nodes.push({
        x: nextX,
        y: nextY,
        depth: stack.length,
      });

      x = nextX;
      y = nextY;
    }

    if (char === "+") {
      angle += angleStep;
    }

    if (char === "-") {
      angle -= angleStep;
    }

    if (char === "[") {
      stack.push({
        x: x,
        y: y,
        angle: angle,
      });

      nodes.push({
        x: x,
        y: y,
        depth: stack.length,
      });
    }

    if (char === "]") {
      const state = stack.pop();

      if (state) {
        x = state.x;
        y = state.y;
        angle = state.angle;
      }
    }

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  return {
    minX: minX,
    maxX: maxX,
    minY: minY,
    maxY: maxY,
  };
}

function drawSegment(segment, color, scaleValue) {
  const depth = Math.min(segment.depth, 6);

  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1.1, 3.2 - depth * 0.34) / scaleValue;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(segment.x1, segment.y1);
  ctx.lineTo(segment.x2, segment.y2);
  ctx.stroke();
}

function drawNode(node, color, scaleValue) {
  const depth = Math.min(node.depth, 6);
  const radius = Math.max(2.2, 5.8 - depth * 0.5) / scaleValue;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Белая точка внутри делает узлы более графичными
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius * 0.42, 0, Math.PI * 2);
  ctx.fill();
}

function drawMotif(scaleValue) {
  // Линии сначала, узлы сверху
  for (let i = 0; i < segments.length; i++) {
    const color = i % 3 === 0 ? palette.cyan : palette.pink;
    drawSegment(segments[i], color, scaleValue);
  }

  for (let i = 0; i < nodes.length; i += 2) {
    const color = i % 4 === 0 ? palette.pink : palette.cyan;
    drawNode(nodes[i], color, scaleValue);
  }
}

function buildPoster() {
  const width = Math.max(app.clientWidth, 320);
  const height = Math.max(app.clientHeight, 240);
  const size = Math.min(width, height);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  buildLSystem();
  const bounds = buildGeometry();

  const drawingWidth = Math.max(bounds.maxX - bounds.minX, 1);
  const drawingHeight = Math.max(bounds.maxY - bounds.minY, 1);

  // Белое поле вокруг плаката
  const padding = 42;
  const availableSize = Math.max(size - padding * 2, 1);

  // Мотив повторяется по кругу, поэтому масштаб делаем спокойнее
  let scaleValue = availableSize / Math.max(drawingWidth, drawingHeight * 1.35);
  scaleValue = Math.min(scaleValue, 1.42);

  const centerX = width / 2;
  const centerY = height / 2;

  ctx.save();
  ctx.translate(centerX, centerY);

  // Несколько копий одной L-системы собирают её в орнаментальный знак
  const copies = 6;

  for (let i = 0; i < copies; i++) {
    ctx.save();

    const angle = (Math.PI * 2 / copies) * i;
    ctx.rotate(angle);

    ctx.scale(scaleValue, scaleValue);

    // Центрируем отдельную ветвь относительно своей оси
    const branchCenterX = (bounds.minX + bounds.maxX) / 2;
    ctx.translate(-branchCenterX, size * -0.045);

    drawMotif(scaleValue);

    ctx.restore();
  }

  // Центральное ядро связывает все ветви в один плакатный знак
  ctx.fillStyle = palette.pink;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.045, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = palette.cyan;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.023, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.011, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

resize();

window.addEventListener("resize", resize);`,
  patr3module2tutorial2code5: `const width = Math.max(app.clientWidth, 320);
const height = Math.max(app.clientHeight, 240);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
camera.position.set(0, 4.8, 8.5);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

app.innerHTML = "";
app.style.background = "#FFFFFF";
app.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 2.2);
light.position.set(4, 7, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 1.8));

const group = new THREE.Group();
scene.add(group);

const pink = new THREE.MeshStandardMaterial({
  color: 0xff86db,
  roughness: 0.62,
  metalness: 0,
  flatShading: true,
});

const cyan = new THREE.MeshStandardMaterial({
  color: 0x2fd3e6,
  roughness: 0.62,
  metalness: 0,
  flatShading: true,
});

const white = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});

const branchGeometries = [];
const nodeGeometry = new THREE.SphereGeometry(0.09, 12, 12);
const smallNodeGeometry = new THREE.SphereGeometry(0.04, 10, 10);
const cubeGeometry = new THREE.BoxGeometry(0.13, 0.13, 0.13);

function buildLSystem() {
  let sentence = "X";
  const iterations = 3;

  for (let i = 0; i < iterations; i += 1) {
    let next = "";

    for (let j = 0; j < sentence.length; j += 1) {
      const char = sentence.charAt(j);

      if (char === "X") {
        next += "F[+X][-X][&X][^X]FX";
      } else if (char === "F") {
        next += "FF";
      } else {
        next += char;
      }
    }

    sentence = next;
  }

  return sentence;
}

function addBranch(start, end, radius, material) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();

  if (length < 0.001) return;

  const geometry = new THREE.CylinderGeometry(
    radius * 0.72,
    radius,
    length,
    8,
    1,
    false
  );

  branchGeometries.push(geometry);

  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize()
  );

  group.add(mesh);
}

function addNode(position, size, material, withInnerDot) {
  const node = new THREE.Mesh(nodeGeometry, material);
  node.position.copy(position);
  node.scale.setScalar(size / 0.09);
  group.add(node);

  if (withInnerDot) {
    const inner = new THREE.Mesh(smallNodeGeometry, white);
    inner.position.copy(position);
    inner.scale.setScalar(size / 0.09);
    group.add(inner);
  }
}

function addCube(position, size, material, seed) {
  const cube = new THREE.Mesh(cubeGeometry, material);
  cube.position.copy(position);
  cube.scale.setScalar(size / 0.13);

  cube.rotation.x = seed * 0.7;
  cube.rotation.y = seed * 1.1;
  cube.rotation.z = seed * 0.4;

  group.add(cube);
}

function generateFractal() {
  const sentence = buildLSystem();

  const step = 0.52;
  const angleStep = Math.PI / 5.7;

  let position = new THREE.Vector3(0, 0, 0);
  let rotation = new THREE.Quaternion();

  const stack = [];
  const up = new THREE.Vector3(0, 1, 0);

  addNode(position.clone(), 0.16, pink, false);

  for (let i = 0; i < sentence.length; i += 1) {
    const char = sentence.charAt(i);
    const depth = stack.length;

    if (char === "F") {
      const direction = up.clone().applyQuaternion(rotation).normalize();
      const nextPosition = position.clone().add(direction.multiplyScalar(step));

      const branchMaterial = depth % 2 === 0 ? pink : cyan;
      const nodeMaterial = depth % 2 === 0 ? cyan : pink;

      const branchRadius = Math.max(0.025, 0.085 - depth * 0.011);
      const nodeSize = Math.max(0.045, 0.105 - depth * 0.01);

      addBranch(position, nextPosition, branchRadius, branchMaterial);
      addNode(nextPosition, nodeSize, nodeMaterial, true);

      position = nextPosition;
    }

    if (char === "+") {
      const q = new THREE.Quaternion();
      q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angleStep);
      rotation.multiply(q);
    }

    if (char === "-") {
      const q = new THREE.Quaternion();
      q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -angleStep);
      rotation.multiply(q);
    }

    if (char === "&") {
      const q = new THREE.Quaternion();
      q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), angleStep);
      rotation.multiply(q);
    }

    if (char === "^") {
      const q = new THREE.Quaternion();
      q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -angleStep);
      rotation.multiply(q);
    }

    if (char === "[") {
      stack.push({
        position: position.clone(),
        rotation: rotation.clone(),
      });
    }

    if (char === "]") {
      const state = stack.pop();

      if (state) {
        const cubeMaterial = depth % 2 === 0 ? pink : cyan;
        addCube(position.clone(), Math.max(0.06, 0.12 - depth * 0.01), cubeMaterial, i * 0.12);

        position = state.position.clone();
        rotation = state.rotation.clone();
      }
    }
  }

  // Центрируем объект, чтобы снизу и сверху были нормальные отступы
  const box = new THREE.Box3().setFromObject(group);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();

  box.getCenter(center);
  box.getSize(size);

  group.position.sub(center);

  const maxSize = Math.max(size.x, size.y, size.z, 1);
  const scale = 4.6 / maxSize;
  group.scale.setScalar(scale);

  group.position.y = 0.15;
}

generateFractal();

function onResize() {
  const nextWidth = Math.max(app.clientWidth, 320);
  const nextHeight = Math.max(app.clientHeight, 240);

  camera.aspect = nextWidth / nextHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(nextWidth, nextHeight);
}

window.addEventListener("resize", onResize);

let animationId;
let time = 0;

function animate() {
  time += 0.01;

  camera.position.x = Math.cos(time * 0.45) * 10;
  camera.position.z = Math.sin(time * 0.45) * 10;
  camera.position.y = 7.2 + Math.sin(time * 0.6) * 0.35;
  camera.lookAt(0, 1.4, 0);

  group.rotation.y += 0.003;
  group.rotation.x = Math.sin(time * 0.35) * 0.08;

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

animate();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);

  branchGeometries.forEach((geometry) => {
    geometry.dispose();
  });

  nodeGeometry.dispose();
  smallNodeGeometry.dispose();
  cubeGeometry.dispose();

  pink.dispose();
  cyan.dispose();
  white.dispose();

  renderer.dispose();
};`,
  patr3module2tutorial2code6: `const palettes = [
  {
    first: "#FF86DB",
    second: "#2FD3E6",
  },
  {
    first: "#FFC300",
    second: "#37E87A",
  },
  {
    first: "#FF86DB",
    second: "#FFC300",
  },
];

// Меняй пресет: 0, 1 или 2
let activePreset = 0;

const presets = [
  {
    iterations: 4,
    angle: 24,
    copies: 8,
    step: 13,
    palette: 0,
    shapeMode: "botanic",
  },
  {
    iterations: 4,
    angle: 32,
    copies: 10,
    step: 11,
    palette: 1,
    shapeMode: "crystal",
  },
  {
    iterations: 5,
    angle: 18,
    copies: 6,
    step: 9,
    palette: 2,
    shapeMode: "emblem",
  },
];

let sentence = "";
let totalDrawSteps = 0;
let reveal = 0;
let t = 0;

function setup() {
  const canvasWidth = Math.max(app.clientWidth, 320);
  const canvasHeight = Math.max(app.clientHeight, 240);

  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("app");

  angleMode(RADIANS);
  rectMode(CENTER);
  strokeCap(ROUND);

  buildLSystem();
}

function windowResized() {
  const canvasWidth = Math.max(app.clientWidth, 320);
  const canvasHeight = Math.max(app.clientHeight, 240);

  resizeCanvas(canvasWidth, canvasHeight);
}

function getPreset() {
  return presets[activePreset];
}

function getPalette() {
  return palettes[getPreset().palette];
}

function buildLSystem() {
  const preset = getPreset();

  sentence = "X";

  for (let i = 0; i < preset.iterations; i += 1) {
    let next = "";

    for (let j = 0; j < sentence.length; j += 1) {
      const char = sentence.charAt(j);

      if (char === "X") {
        next += "F[+X][-X]F[+FX]-X";
      } else if (char === "F") {
        next += "FF";
      } else {
        next += char;
      }
    }

    sentence = next;
  }

  totalDrawSteps = 0;

  for (let i = 0; i < sentence.length; i += 1) {
    if (sentence.charAt(i) === "F") {
      totalDrawSteps += 1;
    }
  }

  reveal = 0;
}

function drawNode(x, y, size, index, depth) {
  const preset = getPreset();
  const palette = getPalette();

  const color = index % 2 === 0 ? palette.first : palette.second;

  noStroke();

  if (preset.shapeMode === "crystal") {
    push();
    translate(x, y);
    rotate(PI / 4 + t * 0.4 + index * 0.08);

    fill(color);
    rect(0, 0, size * 0.85, size * 0.85);

    pop();
  } else {
    fill(color);
    circle(x, y, size);

    if (depth < 4) {
      fill("#FFFFFF");
      circle(x, y, size * 0.42);
    }
  }
}

function drawLSystemBranch(copyIndex) {
  const preset = getPreset();
  const palette = getPalette();

  const angleStep = radians(preset.angle);
  const stack = [];

  let visibleLimit = reveal - copyIndex * 10;
  let drawnSteps = 0;

  for (let i = 0; i < sentence.length; i += 1) {
    const char = sentence.charAt(i);
    const depth = stack.length;

    if (char === "F") {
      drawnSteps += 1;

      if (drawnSteps > visibleLimit) {
        break;
      }

      const depthFactor = Math.min(depth, 7);
      const lineColor = drawnSteps % 3 === 0 ? palette.second : palette.first;
      const nodeColorIndex = drawnSteps + copyIndex;

      const weight = Math.max(1.1, 3.8 - depthFactor * 0.42);
      const nodeSize = Math.max(3.2, 8.2 - depthFactor * 0.7);

      stroke(lineColor);
      strokeWeight(weight);

      line(0, 0, 0, -preset.step);

      translate(0, -preset.step);

      if (drawnSteps % 2 === 0 || depth < 2) {
        drawNode(0, 0, nodeSize, nodeColorIndex, depth);
      }
    }

    if (char === "+") {
      rotate(angleStep);
    }

    if (char === "-") {
      rotate(-angleStep);
    }

    if (char === "[") {
      push();
      stack.push(1);
    }

    if (char === "]") {
      if (stack.length > 0) {
        stack.pop();
        pop();
      }
    }
  }

  // На всякий случай закрываем незакрытые push(), если рост оборвался посередине
  while (stack.length > 0) {
    stack.pop();
    pop();
  }
}

function drawCore() {
  const preset = getPreset();
  const palette = getPalette();
  const size = Math.min(width, height);

  noStroke();

  fill(palette.first);
  circle(0, 0, size * 0.075);

  if (preset.shapeMode === "crystal") {
    push();
    rotate(PI / 4 + t * 0.35);
    fill(palette.second);
    rect(0, 0, size * 0.048, size * 0.048);
    pop();
  } else {
    fill(palette.second);
    circle(0, 0, size * 0.04);
  }

  fill("#FFFFFF");
  circle(0, 0, size * 0.018);
}

function draw() {
  background("#FFFFFF");

  const preset = getPreset();
  const size = Math.min(width, height);

  t += 0.012;
  reveal += 2.5;

  const maxReveal = totalDrawSteps + preset.copies * 10 + 90;

  if (reveal > maxReveal) {
    reveal = 0;
  }

  push();

  translate(width / 2, height / 2);

  // Масштаб фиксированный и предсказуемый:
  // знак всегда остаётся внутри превью
  const scaleValue = size / 730;
  const breathing = 1 + Math.sin(t * 1.7) * 0.018;

  scale(scaleValue * breathing);

  rotate(Math.sin(t * 0.5) * 0.035);

  for (let i = 0; i < preset.copies; i += 1) {
    push();

    rotate((TWO_PI / preset.copies) * i);

    // Небольшой отступ от центра, чтобы ветви не слипались в кашу
    translate(0, -10);

    drawLSystemBranch(i);

    pop();
  }

  drawCore();

  pop();
}`,
  patr3module2tutorial3code1: `const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let animationId;
let t = 0;

app.innerHTML = '';
app.style.width = '100%';
app.style.height = '100%';
app.style.background = '#FFFFFF';
app.appendChild(canvas);

function resize() {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
}

function drawTile(x, y, size, row, col) {
  const even = (row + col) % 2 === 0;
  const wave = Math.sin(t + row * 0.55 + col * 0.35);
  const tileSize = size * (0.58 + wave * 0.1);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((even ? 1 : -1) * (Math.PI / 4 + wave * 0.18));
  ctx.fillStyle = even ? '#FF86DB' : '#2FD3E6';

  if (col % 3 === 0) {
    ctx.fillRect(-tileSize / 2, -tileSize / 2, tileSize, tileSize);
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, tileSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  const step = 48;
  const padding = 32;
  const cols = Math.floor((width - padding * 2) / step) + 1;
  const rows = Math.floor((height - padding * 2) / step) + 1;
  const startX = (width - (cols - 1) * step) / 2;
  const startY = (height - (rows - 1) * step) / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      drawTile(startX + col * step, startY + row * step, step, row, col);
    }
  }

  t += 0.018;
  animationId = requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
};`,
  patr3module2tutorial3code2: `let t = 0;

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
  background('#FFFFFF');

  const step = 44;
  const grid = centeredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const wave = sin(t + row * 0.48 + col * 0.42);
      const diagonal = (row + col) % 4;
      const size = step * (0.42 + (wave + 1) * 0.18);

      push();
      translate(x, y);
      rotate(wave * 0.55 + diagonal * HALF_PI / 2);
      fill(diagonal < 2 ? '#FFC300' : '#37E87A');

      if (diagonal === 0 || diagonal === 3) {
        rect(0, 0, size, size, step * 0.12);
      } else {
        circle(0, 0, size);
      }
      pop();
    }
  }

  t += 0.012;
}`,
  patr3module2tutorial3code3: `const width = app.clientWidth;
const height = app.clientHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
camera.position.set(0, 7.5, 9);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.innerHTML = '';
app.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 1.7));
const light = new THREE.DirectionalLight(0xffffff, 2.5);
light.position.set(4, 7, 5);
scene.add(light);

const group = new THREE.Group();
scene.add(group);

const pink = new THREE.MeshStandardMaterial({ color: 0xff86db, roughness: 0.52 });
const cyan = new THREE.MeshStandardMaterial({ color: 0x2fd3e6, roughness: 0.5 });
const yellow = new THREE.MeshStandardMaterial({ color: 0xffc300, roughness: 0.54 });
const materials = [pink, cyan, yellow];
const boxGeometry = new THREE.BoxGeometry(0.72, 0.72, 0.22);
const cylinderGeometry = new THREE.CylinderGeometry(0.38, 0.38, 0.24, 40);
const tiles = [];
const cols = 10;
const rows = 8;
const gap = 0.82;

for (let row = 0; row < rows; row += 1) {
  for (let col = 0; col < cols; col += 1) {
    const useBox = (row + col) % 3 !== 0;
    const mesh = new THREE.Mesh(useBox ? boxGeometry : cylinderGeometry, materials[(row + col) % materials.length]);
    mesh.position.x = (col - (cols - 1) / 2) * gap;
    mesh.position.z = (row - (rows - 1) / 2) * gap;
    group.add(mesh);
    tiles.push({ mesh, row, col });
  }
}

function onResize() {
  const nextWidth = app.clientWidth;
  const nextHeight = app.clientHeight;
  camera.aspect = nextWidth / nextHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(nextWidth, nextHeight);
}

let animationId;
let time = 0;

function animate() {
  time += 0.014;

  tiles.forEach(({ mesh, row, col }) => {
    const wave = Math.sin(time + row * 0.55 + col * 0.42);
    const height = 0.2 + (wave + 1) * 0.55;
    mesh.position.y = height * 0.45;
    mesh.scale.y = height;
    mesh.rotation.y = wave * 0.35;
    mesh.rotation.z = ((row + col) % 2 === 0 ? 1 : -1) * 0.2;
  });

  group.rotation.y = Math.sin(time * 0.35) * 0.18;
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

window.addEventListener('resize', onResize);
animate();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', onResize);
  boxGeometry.dispose();
  cylinderGeometry.dispose();
  materials.forEach((material) => material.dispose());
  renderer.dispose();
};`,
  patr3module2tutorial3code4: `let t = 0;

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

function drawTile(x, y, row, col, step) {
  const centerDistance = dist(x, y, width / 2, height / 2);
  const maxDistance = dist(0, 0, width / 2, height / 2);
  const field = 1 - centerDistance / maxDistance;
  const wave = sin(t + row * 0.45 + col * 0.4);
  const size = step * (0.28 + field * 0.5 + wave * 0.08);
  const shift = wave * step * 0.12;
  const diagonal = (row + col) % 5;

  push();
  translate(x + shift, y - shift);
  rotate(diagonal * PI / 4 + wave * 0.45);
  fill(diagonal < 3 ? '#FF86DB' : '#2FD3E6');

  if (diagonal === 0 || diagonal === 4) {
    rect(0, 0, size, size, step * 0.14);
  } else {
    circle(0, 0, size);
  }
  pop();
}

function draw() {
  background('#FFFFFF');

  const step = 40;
  const grid = centeredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      drawTile(grid.startX + col * step, grid.startY + row * step, row, col, step);
    }
  }

  t += 0.012;
}`,
  patr3module2tutorial3code5: `function setup() {
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

  const step = 48;
  const grid = centeredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      fill('#2FD3E6');
      rect(x, y, step * 0.58, step * 0.58, step * 0.12);
    }
  }
}`,
  patr3module2tutorial3code6: `function setup() {
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

  const step = 48;
  const grid = centeredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const variant = (row + col) % 4;
      const size = variant < 2 ? step * 0.66 : step * 0.46;

      push();
      translate(x, y);
      rotate(variant * HALF_PI / 2);
      fill(variant % 2 === 0 ? '#FF86DB' : '#2FD3E6');

      if (variant === 1 || variant === 3) {
        circle(0, 0, size);
      } else {
        rect(0, 0, size, size, step * 0.12);
      }
      pop();
    }
  }
}`,
  patr3module2tutorial3code7: `let t = 0;

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
  background('#FFFFFF');

  const step = 44;
  const grid = centeredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const d = dist(x, y, width / 2, height / 2);
      const field = map(d, 0, dist(0, 0, width / 2, height / 2), 1, 0);
      const wave = sin(t + row * 0.42 + col * 0.36);
      const size = step * (0.28 + field * 0.48 + wave * 0.08);
      const shift = wave * step * 0.12;
      const variant = (row + col) % 4;

      push();
      translate(x + shift, y - shift);
      rotate(variant * HALF_PI / 2 + wave * 0.35);
      fill(variant % 2 === 0 ? '#FF86DB' : '#2FD3E6');

      if (variant === 1 || variant === 3) {
        circle(0, 0, size);
      } else {
        rect(0, 0, size, size, step * 0.12);
      }
      pop();
    }
  }

  t += 0.012;
}`,
  patr3module2tutorial3code8: `let t = 0;
let step = 42;
let fieldPower = 0.55;
let tileMode = 'mixed';
let motionSpeed = 0.012;

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

function shouldDrawCircle(mode, row, col) {
  if (mode === 'circles') return true;
  if (mode === 'squares') return false;
  return (row + col) % 5 > 1;
}

function draw() {
  background('#FFFFFF');

  // Эксперимент 1: плотность сетки.
  // step = 34;
  // step = 54;

  // Эксперимент 2: сила композиционного поля.
  // fieldPower = 0.2;
  // fieldPower = 0.85;

  // Эксперимент 3: режим формы.
  // tileMode = 'circles';
  // tileMode = 'squares';
  // tileMode = 'mixed';

  // Эксперимент 4: скорость анимации.
  // motionSpeed = 0.004;
  // motionSpeed = 0.02;

  const grid = centeredGrid(step, 32);
  const maxD = dist(0, 0, width / 2, height / 2);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const d = dist(x, y, width / 2, height / 2);
      const field = pow(1 - d / maxD, 1.4) * fieldPower;
      const wave = sin(t + row * 0.45 + col * 0.38);
      const diagonal = (row + col) % 6;
      const size = step * (0.22 + field + (wave + 1) * 0.08);
      const shift = wave * step * 0.1;

      push();
      translate(x + shift, y - shift);
      rotate(diagonal * PI / 6 + wave * 0.42);
      fill(diagonal < 3 ? '#FFC300' : '#37E87A');

      if (shouldDrawCircle(tileMode, row, col)) {
        circle(0, 0, size);
      } else {
        rect(0, 0, size, size, step * 0.14);
      }
      pop();
    }
  }

  t += motionSpeed;
}`,
  patr3module2tutorial4code1: `let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  noFill();
  strokeCap(ROUND);
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

function drawArrow(x, y, angle, length, color) {
  push();
  translate(x, y);
  rotate(angle);
  stroke(color);
  strokeWeight(4);
  line(-length * 0.45, 0, length * 0.45, 0);
  // маленькая круглая головка вместо декоративной стрелки
  noStroke();
  fill(color);
  circle(length * 0.48, 0, 7);
  pop();
}

function draw() {
  background('#FFFFFF');

  const step = 40;
  const grid = centeredGrid(step, 32);

  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const x = grid.startX + col * step;
      const y = grid.startY + row * step;
      const n = noise(col * 0.12, row * 0.12, t);
      const angle = n * TWO_PI * 2 + sin(t + row * 0.4) * 0.4;
      const length = step * (0.42 + n * 0.28);
      const color = (row + col) % 2 === 0 ? '#2FD3E6' : '#FF86DB';

      drawArrow(x, y, angle, length, color);
    }
  }

  t += 0.008;
}`,
  patr3module2tutorial4code2: `const width = app.clientWidth;
const height = app.clientHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
camera.position.set(0, 7.5, 9);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.innerHTML = '';
app.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 1.8));
const light = new THREE.DirectionalLight(0xffffff, 2.4);
light.position.set(4, 7, 5);
scene.add(light);

const group = new THREE.Group();
scene.add(group);

const cyan = new THREE.MeshStandardMaterial({ color: 0x2fd3e6, roughness: 0.5 });
const pink = new THREE.MeshStandardMaterial({ color: 0xff86db, roughness: 0.5 });
const materials = [cyan, pink];
const boxGeometry = new THREE.BoxGeometry(0.68, 0.12, 0.12);
const headGeometry = new THREE.SphereGeometry(0.12, 18, 18);
const arrows = [];
const cols = 11;
const rows = 8;
const gap = 0.72;

for (let row = 0; row < rows; row += 1) {
  for (let col = 0; col < cols; col += 1) {
    const arrow = new THREE.Group();
    const material = materials[(row + col) % materials.length];
    const body = new THREE.Mesh(boxGeometry, material);
    const head = new THREE.Mesh(headGeometry, material);
    head.position.x = 0.4;
    arrow.add(body, head);
    arrow.position.x = (col - (cols - 1) / 2) * gap;
    arrow.position.z = (row - (rows - 1) / 2) * gap;
    group.add(arrow);
    arrows.push({ arrow, row, col });
  }
}

function fieldAngle(col, row, time) {
  return Math.sin(col * 0.55 + time) + Math.cos(row * 0.5 - time * 0.8);
}

function onResize() {
  const nextWidth = app.clientWidth;
  const nextHeight = app.clientHeight;
  camera.aspect = nextWidth / nextHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(nextWidth, nextHeight);
}

let animationId;
let time = 0;

function animate() {
  time += 0.015;

  arrows.forEach(({ arrow, row, col }) => {
    const angle = fieldAngle(col, row, time);
    const lift = Math.sin(time + row * 0.4 + col * 0.25) * 0.35;
    arrow.rotation.y = angle;
    arrow.rotation.z = Math.sin(angle) * 0.45;
    arrow.position.y = lift;
    arrow.scale.setScalar(0.85 + Math.cos(angle) * 0.18);
  });

  group.rotation.y = Math.sin(time * 0.35) * 0.2;
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

window.addEventListener('resize', onResize);
animate();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', onResize);
  boxGeometry.dispose();
  headGeometry.dispose();
  materials.forEach((material) => material.dispose());
  renderer.dispose();
};`,
  patr3module2tutorial4code3: `let particles = [];
let t = 0;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  resetParticles();
  background('#FFFFFF');
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
  resetParticles();
  background('#FFFFFF');
}

function resetParticles() {
  particles = [];
  const count = 420;
  for (let i = 0; i < count; i += 1) {
    const start = createVector(random(width), random(height));
    particles.push({
      position: start.copy(),
      previous: start.copy(),
      color: i % 2 === 0 ? '#FFC300' : '#37E87A',
      speed: random(1.2, 2.4),
    });
  }
}

function fieldAt(position) {
  const scale = 0.0048;
  const center = createVector(width / 2, height / 2);
  const toCenter = p5.Vector.sub(center, position);
  const swirl = atan2(toCenter.y, toCenter.x) + HALF_PI;
  const n = noise(position.x * scale, position.y * scale, t) * TWO_PI * 3;
  const angle = lerp(swirl, n, 0.62);
  return p5.Vector.fromAngle(angle);
}

function wrapParticle(particle) {
  if (particle.position.x < 24 || particle.position.x > width - 24 || particle.position.y < 24 || particle.position.y > height - 24) {
    particle.position.set(random(32, width - 32), random(32, height - 32));
    particle.previous.set(particle.position);
  }
}

function draw() {
  // Полупрозрачный белый слой постепенно стирает старые следы.
  noStroke();
  fill(255, 24);
  rect(0, 0, width, height);

  particles.forEach((particle, index) => {
    const direction = fieldAt(particle.position).mult(particle.speed);
    particle.previous.set(particle.position);
    particle.position.add(direction);

    stroke(particle.color);
    strokeWeight(index % 3 === 0 ? 2.4 : 1.4);
    line(particle.previous.x, particle.previous.y, particle.position.x, particle.position.y);
    wrapParticle(particle);
  });

  t += 0.006;
}`,
  patr3module2tutorial4code4: `const width = app.clientWidth;
const height = app.clientHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, 6.8, 10.5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.innerHTML = '';
app.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 1.7));
const light = new THREE.DirectionalLight(0xffffff, 2.5);
light.position.set(4, 8, 6);
scene.add(light);

const group = new THREE.Group();
scene.add(group);

const cyan = new THREE.MeshStandardMaterial({ color: 0x2fd3e6, roughness: 0.42 });
const yellow = new THREE.MeshStandardMaterial({ color: 0xffc300, roughness: 0.5 });
const pink = new THREE.MeshStandardMaterial({ color: 0xff86db, roughness: 0.48 });
const materials = [cyan, yellow, pink];
const segmentGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.72);
const diskGeometry = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 36);
const elements = [];
const layers = 5;
const cols = 10;
const rows = 7;
const gap = 0.72;

for (let layer = 0; layer < layers; layer += 1) {
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const useDisk = (row + col + layer) % 5 === 0;
      const mesh = new THREE.Mesh(useDisk ? diskGeometry : segmentGeometry, materials[(row + layer) % materials.length]);
      mesh.position.x = (col - (cols - 1) / 2) * gap;
      mesh.position.y = (layer - (layers - 1) / 2) * 0.44;
      mesh.position.z = (row - (rows - 1) / 2) * gap;
      group.add(mesh);
      elements.push({ mesh, row, col, layer, useDisk });
    }
  }
}

function onResize() {
  const nextWidth = app.clientWidth;
  const nextHeight = app.clientHeight;
  camera.aspect = nextWidth / nextHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(nextWidth, nextHeight);
}

let animationId;
let time = 0;

function animate() {
  time += 0.012;

  elements.forEach(({ mesh, row, col, layer, useDisk }) => {
    const wave = Math.sin(time + col * 0.38 + row * 0.5 + layer * 0.7);
    const twist = Math.cos(time * 0.8 + col * 0.3 - row * 0.35);
    mesh.rotation.x = wave * 0.7;
    mesh.rotation.y = twist * 0.8 + layer * 0.22;
    mesh.rotation.z = (wave + twist) * 0.35;
    mesh.scale.setScalar(useDisk ? 0.78 + wave * 0.18 : 0.9 + twist * 0.2);
    mesh.position.y += Math.sin(time + row + col + layer) * 0.0008;
  });

  group.rotation.y = Math.sin(time * 0.28) * 0.28;
  group.rotation.x = Math.cos(time * 0.22) * 0.12;
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
}

window.addEventListener('resize', onResize);
animate();

return () => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', onResize);
  segmentGeometry.dispose();
  diskGeometry.dispose();
  materials.forEach((material) => material.dispose());
  renderer.dispose();
};`,
  patr3module2tutorial4code5: `let particles = [];
let t = 0;
let fieldScale = 0.005;
let particleCount = 360;
let trailAlpha = 28;
let paletteMode = 'mixed';
let centerPull = 0.42;

function setup() {
  createCanvas(app.clientWidth, app.clientHeight);
  resetSketch();
}

function windowResized() {
  resizeCanvas(app.clientWidth, app.clientHeight);
  resetSketch();
}

function resetSketch() {
  background('#FFFFFF');
  particles = [];
  for (let i = 0; i < particleCount; i += 1) {
    const angle = random(TWO_PI);
    const radius = random(min(width, height) * 0.42);
    const start = createVector(width / 2 + cos(angle) * radius, height / 2 + sin(angle) * radius);
    particles.push({
      position: start.copy(),
      previous: start.copy(),
      speed: random(1.1, 2.3),
      offset: random(1000),
    });
  }
}

function pickColor(index) {
  if (paletteMode === 'cold') return index % 2 === 0 ? '#2FD3E6' : '#37E87A';
  if (paletteMode === 'warm') return index % 2 === 0 ? '#FF86DB' : '#FFC300';
  return ['#FF86DB', '#FFC300', '#37E87A', '#2FD3E6'][index % 4];
}

function flowDirection(position, particle) {
  const n = noise(position.x * fieldScale, position.y * fieldScale, particle.offset + t);
  const noiseAngle = n * TWO_PI * 3;
  const center = createVector(width / 2, height / 2);
  const toCenter = p5.Vector.sub(center, position);
  const centerAngle = atan2(toCenter.y, toCenter.x) + HALF_PI;
  return p5.Vector.fromAngle(lerp(noiseAngle, centerAngle, centerPull));
}

function draw() {
  // Эксперимент 1: масштаб поля.
  // fieldScale = 0.0025;
  // fieldScale = 0.012;

  // Эксперимент 2: плотность и след.
  // particleCount = 180; // затем перезапусти скетч
  // particleCount = 620; // затем перезапусти скетч
  // trailAlpha = 12;
  // trailAlpha = 44;

  // Эксперимент 3: палитра.
  // paletteMode = 'cold';
  // paletteMode = 'warm';
  // paletteMode = 'mixed';

  // Эксперимент 4: притяжение к центру.
  // centerPull = 0.12;
  // centerPull = 0.7;

  noStroke();
  fill(255, trailAlpha);
  rect(0, 0, width, height);

  particles.forEach((particle, index) => {
    const direction = flowDirection(particle.position, particle).mult(particle.speed);
    particle.previous.set(particle.position);
    particle.position.add(direction);

    stroke(pickColor(index));
    strokeWeight(index % 4 === 0 ? 2.2 : 1.2);
    line(particle.previous.x, particle.previous.y, particle.position.x, particle.position.y);

    const outside = particle.position.x < 24 || particle.position.x > width - 24 || particle.position.y < 24 || particle.position.y > height - 24;
    if (outside) {
      const angle = random(TWO_PI);
      const radius = random(min(width, height) * 0.36);
      particle.position.set(width / 2 + cos(angle) * radius, height / 2 + sin(angle) * radius);
      particle.previous.set(particle.position);
    }
  });

  t += 0.004;
}`,
};