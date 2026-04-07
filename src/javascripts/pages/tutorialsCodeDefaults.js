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
}`
};

export const defaultCodeById = {
  patr1module1tutorial1code1: `function setup() {
  createCanvas(windowWidth, windowHeight); // создаём холст размера окна
  noStroke(); // убираем обводку у фигур
}

function draw() {
  background(144); // очищаем фон (белый)

  let step = 40; // шаг сетки — расстояние между элементами

  // идём по вертикали
  for (let y = 0; y < height; y += step) {
    // для каждой строки идём по горизонтали
    for (let x = 0; x < width; x += step) {
      rect(x, y, step * 0.8); // рисуем квадрат чуть меньше шага
    }
  }
}`,
  patr1module1tutorial1code2: `function setup() {
  createCanvas(320, 320);
  noStroke();
}

function draw() {
  background(144);

  let step = 40;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {

      // генерируем случайный размер для каждой фигуры
      let size = step * random(0.3, 1);

      rect(x, y, size); // теперь каждая ячейка выглядит по-разному
    }
  }

  noLoop();
}`,
patr1module1tutorial1code3: `function setup() {
  createCanvas(320, 320);
  noStroke();
}

function draw() {
  background(144);

  let step = 40;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {

      // попробуй менять это:
      let size = step;

      // идеи:
      // size = step * (x / width);
      // size = step * (y / height);
      // size = step * random();

      rect(x, y, size);
    }
  }

  noLoop();
}`,
};