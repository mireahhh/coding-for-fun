export const months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

export const filters = {
  "filterComplexityInitial": "Начальная",
  "filterComplexityMiddle": "Средняя",
  "filterComplexityAdvanced": "Продвинутая",
  "filterLibraryVanillajs": "Vanilla js",
  "filterLibraryP5js": "P5.js",
  "filterLibraryThreejs": "Three.js",
  "filterVerificationExpert": "Экспертная",
  "filterVerificationAuthorial": "Авторская",
}

export const works = [
  // {
  //   id: -1,
  //   state: 1,
  //   official: "",
  //   date: ["20260327"],
  //   title: "Название работы",
  //   author: "Автор",
  //   complexity: "filterComplexityInitial; filterComplexityMiddle; filterComplexityAdvanced",
  //   library: ["filterLibraryVanillajs; filterLibraryP5js; filterLibraryThreejs"],
  //   verification: "filterVerificationAuthorial; filterVerificationExpert",
  //   tags: [
  //     "Генеративная графика",
  //     "Шум",
  //     "Фракталы",
  //     "Волны",
  //     "Частицы",
  //     "Паттерны",
  //     "Геометрические алгоритмы",
  //     "Параметрические системы",
  //     "Рекурсия",
  //     "Случайность",
  //     "Поля векторов",
  //     "Симуляции",
  //     "Клеточные автоматы",
  //     "L-системы",
  //     "Процедурная генерация",
  //     "Алгоритмическая анимация",
  //     "Интерактивные системы",
  //     "Аудиореактивная графика",
  //   ],
  //   description:
  //     "Авторское описание",
  //   link: "Ссылка на код",
  //   codeRun: `Исполняемый код`,
  //   codePreview: `Отображаемый код`,
  //   extension: "png/mp4",
  //   canvasPreview: "",
  // },

  {
    id: 0,
    state: 1,
    official: "",
    date: ["20260415"],
    title: "Flower Power",
    author: "Katarina Lingat",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Паттерны",
      "Алгоритмическая анимация",
      "Интерактивные системы",
    ],
    description:
      "Наслаждайся цветочной поляной, создавай собственные визуальные комбинации и составляй композиции из одного цвета. В работе используется процедурная генерация случайных узоров и комбинаций цветов, а также HTML Canvas для динамического рендеринга графики.",
    link: "https://geokash.com/flower-power/",
    codeRun: `const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function drawFlower(x, y, radius, petals) {
  for (let i = 0; i < petals; i++) {
    ctx.beginPath();
    ctx.arc(x, y, radius, (i * Math.PI) / 3, ((i + 1) * Math.PI) / 3);
    ctx.fill();
  }
}

drawFlower(100, 100, 20, 6);`,
    codePreview: `<canvas id="flowerCanvas" width="400" height="400"></canvas>
<script>
  // Реализованный выше код JS для рисования цветка
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 1,
    state: 1,
    official: "",
    date: ["20260414"],
    title: "Sandspiel",
    author: "digger21orange",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Симуляции",
      "Клеточные автоматы",
      "Процедурная генерация",
      "Интерактивные системы",
      "Паттерны",
    ],
    description:
      "Интерактивная песочница с элементами клеточного автомата, где пользователь создает природные сцены: деревья, песок, воду и другие материалы. Используется моделирование поведения частиц и простые физические правила для генерации сложных визуальных эффектов.",
    link: "https://studio.sandspiel.club/post/7247",
    codeRun: `function updateSand(grid, x, y) {
  if (grid[y + 1] && grid[y + 1][x] === 0) {
    grid[y + 1][x] = 1;
    grid[y][x] = 0;
  }
}`,
    codePreview: `<canvas id="sand"></canvas>
<script>
  // базовая симуляция песка
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 2,
    state: 1,
    official: "",
    date: ["20260413"],
    title: "SPACE TYPE",
    author: "kielm",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryP5js"],
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Параметрические системы",
      "Интерактивные системы",
      "Алгоритмическая анимация",
      "Паттерны",
    ],
    description:
      "Генеративная типографика, где текст формируется и искажается параметрическими правилами. Работа исследует визуальные структуры букв через алгоритмы и интерактивное управление параметрами.",
    link: "https://spacetypegenerator.com/field.html",
    codeRun: `function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255);
  textSize(random(10, 20));
  text("TYPE", width / 2, height / 2);
}`,
    codePreview: `<script src="p5.js"></script>
<script>
  // генерация типографики
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 3,
    state: 1,
    official: "",
    date: ["20260412"],
    title: "The Game of Life",
    author: "Sam Twidale",
    complexity: "filterComplexityAdvanced",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Клеточные автоматы",
      "Симуляции",
      "Паттерны",
      "Процедурная генерация",
    ],
    description:
      "Классическая реализация клеточного автомата «Игра жизни» Конвея. Система эволюционирует по заданным правилам, создавая сложные самоорганизующиеся паттерны из простых состояний.",
    link: "https://www.samcodes.co.uk/project/game-of-life/",
    codeRun: `function nextGen(grid) {
  const next = grid.map(row => [...row]);

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let neighbors = 0;

      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          if (i === 0 && j === 0) continue;
          const ny = y + j;
          const nx = x + i;

          if (grid[ny] && grid[ny][nx]) neighbors++;
        }
      }

      if (grid[y][x] && (neighbors < 2 || neighbors > 3)) next[y][x] = 0;
      if (!grid[y][x] && neighbors === 3) next[y][x] = 1;
    }
  }

  return next;
}`,
    codePreview: `<canvas id="life"></canvas>
<script>
  // реализация Game of Life
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 4,
    state: 1,
    official: "",
    date: ["20260411"],
    title: "Cell Cycle",
    author: "Nervous System",
    complexity: "filterComplexityAdvanced",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Параметрические системы",
      "Процедурная генерация",
      "Геометрические алгоритмы",
      "Алгоритмическая анимация",
    ],
    description:
      "Генеративная система создания органических форм, вдохновлённая клеточным делением. Алгоритмы роста и повторения формируют сложные замкнутые структуры с высокой степенью детализации.",
    link: "https://n-e-r-v-o-u-s.com/cellCycle/",
    codeRun: `function generateRing(points) {
  const ring = [];

  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];

    ring.push(current);
    ring.push({
      x: (current.x + next.x) / 2 + Math.random() * 8 - 4,
      y: (current.y + next.y) / 2 + Math.random() * 8 - 4,
    });
  }

  return ring;
}`,
    codePreview: `<canvas id="cell"></canvas>
<script>
  // генеративные формы
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 5,
    state: 1,
    official: "",
    date: ["20260410"],
    title: "Untitled",
    author: "Tdimby",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationAuthorial",
    tags: [
      "Шум",
      "Генеративная графика",
      "Случайность",
      "Поля векторов",
      "Паттерны",
    ],
    description:
      "Абстрактная генеративная текстура, основанная на шуме и случайных значениях. Цветовые поля формируются через псевдослучайные распределения, создавая эффект органического градиента.",
    link: "https://studio.sandspiel.club/post/7102",
    codeRun: `for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const n = noise(x * 0.01, y * 0.01);
    set(x, y, color(n * 255));
  }
}`,
    codePreview: `<canvas id="noise"></canvas>
<script>
  // генерация шума
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 6,
    state: 1,
    official: "",
    date: ["20260409"],
    title: "a bunch of cool elements",
    author: "cyclecrash",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationAuthorial",
    tags: [
      "Симуляции",
      "Частицы",
      "Паттерны",
      "Случайность",
      "Генеративная графика",
    ],
    description:
      "Набор различных визуальных элементов, демонстрирующих поведение частиц, текстур и простых симуляций. Работа представляет собой экспериментальную коллекцию эффектов, основанных на случайности и взаимодействии пиксельных структур.",
    link: "https://studio.sandspiel.club/post/7111",
    codeRun: `function update() {
  particles.forEach(p => {
    p.y += Math.random() * 2;
  });
}`,
    codePreview: `<canvas id="elements"></canvas>
<script>
  // генерация разных эффектов
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 7,
    state: 1,
    official: "",
    date: ["20260408"],
    title: "Reflecting on the nature of the human experience",
    author: "Ana Montiel",
    complexity: "filterComplexityAdvanced",
    library: ["filterLibraryThreejs"],
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Поля векторов",
      "Параметрические системы",
      "Алгоритмическая анимация",
      "Интерактивные системы",
    ],
    description:
      "Абстрактная интерактивная визуализация с мягкими градиентными переходами и органическими искажениями формы. Используются шейдеры и параметрические поля для создания текучих визуальных состояний, отражающих эмоциональные состояния.",
    link: "https://anamontiel.com/",
    codeRun: `uniform float time;

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(800.0, 600.0);
  float wave = sin(uv.y * 10.0 + time) * 0.5 + 0.5;
  gl_FragColor = vec4(vec3(wave), 1.0);
}`,
    codePreview: `<canvas id="shader"></canvas>
<script>
  // shader-based animation
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 8,
    state: 1,
    official: "",
    date: ["20260407"],
    title: "When We Love",
    author: "Chia Amisola",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryP5js"],
    verification: "filterVerificationExpert",
    tags: [
      "Интерактивные системы",
      "Генеративная графика",
      "Алгоритмическая анимация",
      "Параметрические системы",
    ],
    description:
      "Интерактивный поэтический интерфейс, где визуальные элементы и текст реагируют на действия пользователя. Комбинирует генеративную графику, текст и мягкие визуальные эффекты для создания эмоционального опыта.",
    link: "https://whenwe.love/",
    codeRun: `function draw() {
  background(240);
  ellipse(mouseX, mouseY, 50);
}`,
    codePreview: `<script src="p5.js"></script>
<script>
  // интерактивная сцена
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 9,
    state: 1,
    official: "",
    date: ["20260406"],
    title: "Raising Questions",
    author: "Munken",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Паттерны",
      "Алгоритмическая анимация",
      "Интерактивные системы",
    ],
    description:
      "Типографическая генеративная система, где текст динамически размножается, масштабируется и искажается, создавая хаотичные композиции. Исследует поведение текста как визуального материала.",
    link: "https://colab.munken.com/munkencreator",
    codeRun: `function drawText() {
  ctx.fillText("Questions", Math.random() * 300, Math.random() * 300);
}`,
    codePreview: `<canvas id="type"></canvas>
<script>
  // генеративная типографика
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 10,
    state: 1,
    official: "",
    date: ["20260405"],
    title: "patterns A v1.0",
    author: "Eri_pl",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationAuthorial",
    tags: [
      "Паттерны",
      "Генеративная графика",
      "Шум",
      "Процедурная генерация",
      "Геометрические алгоритмы",
    ],
    description:
      "Коллаж из различных процедурно сгенерированных паттернов и текстур. Работа демонстрирует разнообразие алгоритмов — от шума и градиентов до геометрических разбиений.",
    link: "https://studio.sandspiel.club/post/3801",
    codeRun: `for (let i = 0; i < 1000; i++) {
  ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
}`,
    codePreview: `<canvas id="patterns"></canvas>
<script>
  // генерация паттернов
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 11,
    state: 1,
    official: "",
    date: ["20260404"],
    title: "a website could be",
    author: "polina",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Параметрические системы",
      "Интерактивные системы",
      "Паттерны",
    ],
    description:
      "Экспериментальный веб-интерфейс, где элементы страницы трансформируются в генеративную систему. Работа исследует, как сайт может быть не статичной структурой, а изменяемым визуальным пространством.",
    link: "https://the-personalized-web.digitale-grafik.com/polina/",
    codeRun: `document.querySelectorAll('div').forEach(el => {
  el.style.transform = \`scale(\${Math.random()})\`;
});`,
    codePreview: `<div class="grid"></div>
<script>
  // генеративный интерфейс
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 12,
    state: 1,
    official: "",
    date: ["20260403"],
    title: "dumpling huge home-caption",
    author: "Vera van de Seyp",
    complexity: "filterComplexityAdvanced",
    library: ["filterLibraryP5js"],
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Геометрические алгоритмы",
      "Паттерны",
      "Алгоритмическая анимация",
    ],
    description:
      "Генеративная типографика с использованием модульных форм, создающих сложные визуальные структуры. Алгоритм повторяет и масштабирует элементы, формируя ритмичные композиции.",
    link: "https://veravandeseyp.com/",
    codeRun: `for (let x = 0; x < width; x += 20) {
  rect(x, 0, 10, height);
}`,
    codePreview: `<script src="p5.js"></script>
<script>
  // генерация модульных форм
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 13,
    state: 1,
    official: "",
    date: ["20260402"],
    title: "No Archive Will Restore You",
    author: "fernanda",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Интерактивные системы",
      "Генеративная графика",
      "Паттерны",
    ],
    description:
      "Текстово-визуальный проект, исследующий тему архивирования и памяти. Контент страницы динамически компонуется, создавая ощущение фрагментированного цифрового архива.",
    link: "https://the-personalized-web.digitale-grafik.com/fernanda/",
    codeRun: `document.body.innerHTML += "<p>" + Math.random() + "</p>";`,
    codePreview: `<div id="text"></div>
<script>
  // генерация текста
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 14,
    state: 1,
    official: "",
    date: ["20260401"],
    title: "Lines",
    author: "TheBoxCreeper",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationAuthorial",
    tags: [
      "Поля векторов",
      "Паттерны",
      "Генеративная графика",
      "Алгоритмическая анимация",
    ],
    description:
      "Генерация линий на основе направленных полей, формирующих органические структуры, напоминающие карты или контуры. Используются алгоритмы трассировки и шумовые функции.",
    link: "https://studio.sandspiel.club/post/20149",
    codeRun: `function drawLine(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + Math.random() * 10, y + Math.random() * 10);
  ctx.stroke();
}`,
    codePreview: `<canvas id="lines"></canvas>
<script>
  // генерация линий
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 15,
    state: 1,
    official: "",
    date: ["20260331"],
    title: "Night Voyagers",
    author: "Andy Wallace",
    complexity: "filterComplexityAdvanced",
    library: ["filterLibraryThreejs"],
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Шум",
      "Поля векторов",
      "Алгоритмическая анимация",
    ],
    description:
      "Глитч-эстетика и процедурные текстуры формируют динамическую визуальную среду. Используются шумовые функции и постобработка для создания цифровых артефактов.",
    link: "https://taper.badquar.to/7/night_voyagers.html",
    codeRun: `float noiseValue = sin(x * 10.0 + time);
color += noiseValue;`,
    codePreview: `<canvas id="glitch"></canvas>
<script>
  // shader/glitch эффект
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 16,
    state: 1,
    official: "",
    date: ["20260330"],
    title: "Vector Halftone",
    author: "Xoihazard",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Геометрические алгоритмы",
      "Паттерны",
      "Параметрические системы",
    ],
    description:
      "Инструмент для создания векторного халфтон-эффекта, где изображение преобразуется в набор точек разного размера. Основан на анализе яркости и параметрическом управлении формами.",
    link: "https://halftone.xoihazard.com/",
    codeRun: `let size = brightness(pixel) / 255 * maxSize;
ctx.beginPath();
ctx.arc(x, y, size, 0, Math.PI * 2);
ctx.fill();`,
    codePreview: `<canvas id="halftone"></canvas>
<script>
  // генерация точек
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 17,
    state: 1,
    official: "",
    date: ["20260329"],
    title: "people as computers; poetry as code",
    author: "poetic computer",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Интерактивные системы",
      "Генеративная графика",
      "Параметрические системы",
    ],
    description:
      "Исследовательский проект, соединяющий поэзию и программирование. Интерфейс объединяет текст, схемы и визуальные элементы, формируя нелинейное повествование.",
    link: "https://poetic.computer/",
    codeRun: `function showNode(node) {
  node.style.display = "block";
}`,
    codePreview: `<div class="node"></div>
<script>
  // интерактивная структура
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 18,
    state: 1,
    official: "",
    date: ["20260328"],
    title: "Life Universe",
    author: "Rezmason",
    complexity: "filterComplexityAdvanced",
    library: ["filterLibraryThreejs"],
    verification: "filterVerificationExpert",
    tags: [
      "Клеточные автоматы",
      "Симуляции",
      "Процедурная генерация",
      "Алгоритмическая анимация",
    ],
    description:
      "Расширенная визуализация клеточного автомата с многослойной структурой. Система создает сложные эволюционные паттерны, напоминающие цифровую вселенную.",
    link: "https://oimo.io/works/life/",
    codeRun: `function step(grid) {
  const next = [];

  for (let y = 0; y < grid.length; y++) {
    next[y] = [];
    for (let x = 0; x < grid[y].length; x++) {
      next[y][x] = grid[y][x];
    }
  }

  return next;
}`,
    codePreview: `<canvas id="lifeUniverse"></canvas>
<script>
  // сложная симуляция
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 19,
    state: 1,
    official: "",
    date: ["20260327"],
    title: "I Heard It In A Magazine",
    author: "One Thousand Birds",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Интерактивные системы",
      "Паттерны",
      "Генеративная графика",
      "Параметрические системы",
    ],
    description:
      "Интерактивный архив звуковых и текстовых фрагментов, представленный в виде цветной сетки. Пользователь исследует контент через визуальную структуру, где каждый элемент связан с медиа.",
    link: "https://hii-mag.com/",
    codeRun: `document.querySelectorAll(".cell").forEach(el => {
  el.style.background = \`hsl(\${Math.random() * 360}, 100%, 50%)\`;
});`,
    codePreview: `<div class="grid"></div>
<script>
  // цветная сетка
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 20,
    state: 1,
    official: "",
    date: ["20260326"],
    title: "THE HTML REVIEW",
    author: "Shelby Wilson",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Интерактивные системы",
      "Генеративная графика",
      "Параметрические системы",
      "Алгоритмическая анимация",
    ],
    description:
      "Типографический интерфейс, где текстовые элементы динамически перемещаются и трансформируются. Создаёт ощущение живого цифрового журнала с нелинейной навигацией.",
    link: "https://thehtml.review/03/",
    codeRun: `elements.forEach(el => {
  el.style.transform = \`rotate(\${Math.random() * 360}deg)\`;
});`,
    codePreview: `<div class="text"></div>
<script>
  // динамическая типографика
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 21,
    state: 1,
    official: "",
    date: ["20260325"],
    title: "Infinite loop",
    author: "Shadow_moom27",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationAuthorial",
    tags: [
      "Симуляции",
      "Шум",
      "Частицы",
      "Случайность",
      "Генеративная графика",
    ],
    description:
      "Абстрактная симуляция с повторяющимися всплесками цвета, создающими эффект бесконечного процесса. Используются шумовые функции и итеративное обновление состояния.",
    link: "https://studio.sandspiel.club/post/10581",
    codeRun: `for (let i = 0; i < particles.length; i++) {
  particles[i].x += Math.random() - 0.5;
}`,
    codePreview: `<canvas id="loop"></canvas>
<script>
  // цикл симуляции
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 22,
    state: 1,
    official: "",
    date: ["20260324"],
    title: "spider of sleep paralysis",
    author: "maker of cool stuff",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationAuthorial",
    tags: [
      "Поля векторов",
      "Алгоритмическая анимация",
      "Симуляции",
      "Генеративная графика",
    ],
    description:
      "Органическая структура, напоминающая паука, формируется за счёт движения линий по полю. Алгоритм создаёт ветвящиеся формы с эффектом роста.",
    link: "https://studio.sandspiel.club/post/18593",
    codeRun: `function step(x, y) {
  return [x + Math.random() * 2, y + Math.random() * 2];
}`,
    codePreview: `<canvas id="spider"></canvas>
<script>
  // генерация ветвлений
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 23,
    state: 1,
    official: "",
    date: ["20260323"],
    title: "distorted dog",
    author: "Nicki Minaj",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationAuthorial",
    tags: [
      "Шум",
      "Генеративная графика",
      "Паттерны",
      "Алгоритмическая анимация",
    ],
    description:
      "Искажение изображения с помощью алгоритмических преобразований и глитч-эффектов. Пиксели смещаются и деформируются, создавая цифровые артефакты.",
    link: "https://studio.sandspiel.club/post/10582",
    codeRun: `let offset = Math.sin(y * 0.1) * 10;
ctx.drawImage(img, x + offset, y);`,
    codePreview: `<canvas id="distort"></canvas>
<script>
  // glitch эффект
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 24,
    state: 1,
    official: "",
    date: ["20260322"],
    title: "svg.wtf",
    author: "Amelia Wattenberger",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Геометрические алгоритмы",
      "Параметрические системы",
      "Интерактивные системы",
      "Генеративная графика",
    ],
    description:
      "Интерактивный инструмент для изучения SVG-графики, позволяющий создавать и изменять формы через параметры. Визуализирует принципы построения векторных элементов.",
    link: "https://svg.wtf/",
    codeRun: `const svg = document.querySelector("svg");
const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle.setAttribute("cx", 120);
circle.setAttribute("cy", 80);
circle.setAttribute("r", 40);
svg.appendChild(circle);`,
    codePreview: `<svg width="300" height="200"></svg>
<script>
  // генерация svg
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 25,
    state: 1,
    official: "",
    date: ["20260321"],
    title: "radix sort or something",
    author: "&lt;Sava&gt;",
    complexity: "filterComplexityAdvanced",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationAuthorial",
    tags: [
      "Алгоритмическая анимация",
      "Паттерны",
      "Генеративная графика",
      "Параметрические системы",
    ],
    description:
      "Визуализация алгоритма сортировки, где данные представлены в виде вертикальных линий. Изменение структуры отражает процесс вычисления и упорядочивания.",
    link: "https://studio.sandspiel.club/post/21859",
    codeRun: `function radixSort(arr) {
  const max = Math.max(...arr);
  let digit = 1;

  while (Math.floor(max / digit) > 0) {
    const buckets = Array.from({ length: 10 }, () => []);

    for (const num of arr) {
      buckets[Math.floor(num / digit) % 10].push(num);
    }

    arr = buckets.flat();
    digit *= 10;
  }

  return arr;
}`,
    codePreview: `<canvas id="sort"></canvas>
<script>
  // визуализация сортировки
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 26,
    state: 1,
    official: "",
    date: ["20260320"],
    title: "Computer Drive",
    author: "Crypto",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationAuthorial",
    tags: [
      "Генеративная графика",
      "Шум",
      "Паттерны",
      "Алгоритмическая анимация",
    ],
    description:
      "Абстрактная работа с вертикальными зелёными линиями и шумовой структурой, напоминающей цифровой сигнал или сбой жёсткого диска. Визуал строится через повторение линий, случайные отклонения и процедурную текстуру.",
    link: "https://studio.sandspiel.club/post/17846",
    codeRun: `for (let x = 0; x < width; x++) {
  const h = random(height);
  ctx.fillRect(x, height - h, 1, h);
}`,
    codePreview: `<canvas id="drive"></canvas>
<script>
  // генерация вертикальных шумовых линий
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 27,
    state: 1,
    official: "",
    date: ["20260319"],
    title: "running car",
    author: ":>",
    complexity: "filterComplexityInitial",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationAuthorial",
    tags: [
      "Алгоритмическая анимация",
      "Интерактивные системы",
      "Паттерны",
    ],
    description:
      "Пиксельная сцена с движущейся машиной на дороге. Работа использует простую покадровую анимацию и базовое смещение объектов, чтобы создать ощущение движения.",
    link: "https://studio.sandspiel.club/post/4939",
    codeRun: `let x = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar(x, 120);
  x += 2;
  requestAnimationFrame(animate);
}`,
    codePreview: `<canvas id="carScene" width="300" height="200"></canvas>
<script>
  // простая анимация машины
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 28,
    state: 1,
    official: "",
    date: ["20260318"],
    title: "Topographic (Contour) Map",
    author: ">LOPPY<",
    complexity: "filterComplexityAdvanced",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Шум",
      "Поля векторов",
      "Геометрические алгоритмы",
      "Паттерны",
    ],
    description:
      "Процедурная карта высот с цветными контурными линиями, напоминающая топографическую визуализацию рельефа. Работа создаётся на основе шумового поля и алгоритмов построения изолиний.",
    link: "https://studio.sandspiel.club/post/21977",
    codeRun: `for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    field[y][x] = noise(x * 0.05, y * 0.05);
  }
}

// далее построение contour lines по уровням`,
    codePreview: `<canvas id="contourMap"></canvas>
<script>
  // шумовое поле + изолинии
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 29,
    state: 1,
    official: "",
    date: ["20260317"],
    title: "Ungainly movements",
    author: "dongseok",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Интерактивные системы",
      "Генеративная графика",
      "Алгоритмическая анимация",
      "Паттерны",
    ],
    description:
      "Экспериментальная типографическая работа, где текстовые элементы смещаются, наслаиваются и теряют устойчивость. Проект исследует неуклюжее движение через поведение шрифта и композиции в веб-среде.",
    link: "https://the-personalized-web.digitale-grafik.com/dongseok/",
    codeRun: `document.querySelectorAll(".word").forEach((el, i) => {
  el.style.transform = \`translate(\${Math.sin(i) * 20}px, \${Math.cos(i) * 10}px) rotate(\${i * 4}deg)\`;
});`,
    codePreview: `<div class="word">Ungainly movements</div>
<script>
  // смещение и деформация текста
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 30,
    state: 1,
    official: "",
    date: ["20260316"],
    title: "(e)motion",
    author: "very",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Интерактивные системы",
      "Генеративная графика",
      "Алгоритмическая анимация",
      "Параметрические системы",
    ],
    description:
      "Кинетическая типографика с крупным текстом и плавающими формами, реагирующими на композицию страницы. Работа соединяет эмоциональное высказывание и программное поведение интерфейса.",
    link: "https://the-personalized-web.digitale-grafik.com/very/",
    codeRun: `function floatShape(el, t) {
  el.style.transform = \`translate(\${Math.sin(t) * 30}px, \${Math.cos(t * 0.7) * 20}px)\`;
}`,
    codePreview: `<div class="headline">(e)motion</div>
<div class="blob"></div>
<script>
  // плавающие формы и анимированный текст
</script>`,
    extension: "mp4",
    canvasPreview: "",
  },

  {
    id: 31,
    state: 1,
    official: "",
    date: ["20260315"],
    title: "MegaPixels",
    author: "Adam Harvey",
    complexity: "filterComplexityAdvanced",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Интерактивные системы",
      "Генеративная графика",
      "Геометрические алгоритмы",
      "Параметрические системы",
    ],
    description:
      "Интерактивный проект о компьютерном зрении, где лицо представляется через ключевые точки и упрощённые геометрические формы. Работа визуализирует принципы распознавания изображений и переводит данные в выразительную графику.",
    link: "https://exposing.ai/",
    codeRun: `const points = detectFaceLandmarks(image);

points.forEach(p => {
  ctx.beginPath();
  ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
  ctx.fill();
});`,
    codePreview: `<canvas id="facePoints"></canvas>
<script>
  // отображение facial landmarks
</script>`,
    extension: "png",
    canvasPreview: "",
  },

  {
    id: 32,
    state: 1,
    official: "",
    date: ["20260314"],
    title: "sandspiel.club",
    author: "Sandspiel",
    complexity: "filterComplexityMiddle",
    library: ["filterLibraryVanillajs"],
    verification: "filterVerificationExpert",
    tags: [
      "Симуляции",
      "Клеточные автоматы",
      "Интерактивные системы",
      "Процедурная генерация",
      "Паттерны",
    ],
    description:
      "Официальная веб-песочница Sandspiel, в которой пользователь может рисовать материалами и наблюдать за их взаимодействием в реальном времени. Работа основана на пиксельной симуляции частиц, правилах поведения веществ и интерактивном управлении через браузер.",
    link: "https://sandspiel.club/",
    codeRun: `function updateParticle(grid, x, y) {
  if (grid[y + 1] && grid[y + 1][x] === EMPTY) {
    grid[y + 1][x] = grid[y][x];
    grid[y][x] = EMPTY;
  }
}`,
    codePreview: `<canvas id="sandspielCanvas" width="400" height="400"></canvas>
<script>
  // базовая симуляция частиц и материалов
</script>`,
    extension: "png",
    canvasPreview: "",
  },
]