export const works = [
  {
    id: 0,
    state: 1,
    official: "",
    date: ["27032026"],
    title: "Flower Power",
    author: "Katarina Lingat",
    complexity: "filterComplexityMiddle",
    library: "filterLibraryVanillajs",
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Паттерны",
      "Алгоритмическая анимация",
      "Интерактивные системы",
    ],
    description:
      "Расслабляющее пространство, в котором вы можете взаимодействовать с окружающим миром. Выбирайте цветы, составляйте из них композиции и экспериментируйте с оттенками, создавая успокаивающую атмосферу. Цель проекта — способствовать спокойствию через взаимодействие, предоставляя пространство для творческого самовыражения и релаксации. Наслаждайтесь цветочной поляной, создавайте собственные визуальные комбинации и составлять композиции из одного цвета. В работе используется процедурная генерация случайных узоров и комбинаций цветов, а также HTML Canvas для динамического рендеринга графики.",
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
    canvasExtension: "png",
    canvasPreviewName: "0.png",
  },
  {
    id: 1,
    state: 1,
    official: "",
    date: ["27032026"],
    title: "Flower Power",
    author: "Katarina Lingat",
    complexity: "filterComplexityMiddle",
    library: "filterLibraryVanillajs",
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Паттерны",
      "Алгоритмическая анимация",
      "Интерактивные системы",
    ],
    description:
      "Расслабляющее пространство, в котором вы можете взаимодействовать с окружающим миром. Выбирайте цветы, составляйте из них композиции и экспериментируйте с оттенками, создавая успокаивающую атмосферу. Цель проекта — способствовать спокойствию через взаимодействие, предоставляя пространство для творческого самовыражения и релаксации. Наслаждайтесь цветочной поляной, создавайте собственные визуальные комбинации и составлять композиции из одного цвета. В работе используется процедурная генерация случайных узоров и комбинаций цветов, а также HTML Canvas для динамического рендеринга графики.",
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
    canvasPreview: "1.mp4",
  },
  {
    id: 2,
    state: 0,
    official: "",
    date: ["27032026"],
    title: "Flower Power",
    author: "Katarina Lingat",
    complexity: "filterComplexityMiddle",
    library: "filterLibraryVanillajs",
    verification: "filterVerificationExpert",
    tags: [
      "Генеративная графика",
      "Паттерны",
      "Алгоритмическая анимация",
      "Интерактивные системы",
    ],
    description:
      "Расслабляющее пространство, в котором вы можете взаимодействовать с окружающим миром. Выбирайте цветы, составляйте из них композиции и экспериментируйте с оттенками, создавая успокаивающую атмосферу. Цель проекта — способствовать спокойствию через взаимодействие, предоставляя пространство для творческого самовыражения и релаксации. Наслаждайтесь цветочной поляной, создавайте собственные визуальные комбинации и составлять композиции из одного цвета. В работе используется процедурная генерация случайных узоров и комбинаций цветов, а также HTML Canvas для динамического рендеринга графики.",
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
    extension: "png",
    canvasPreview: "2.png",
  },
];
