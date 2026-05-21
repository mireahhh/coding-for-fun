const HtmlWebpackPlugin = require("html-webpack-plugin");

function createPages(template, filename, chunks) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: filename,
    chunks: chunks,
  });
}

const htmlPages = [
  createPages("./src/index.html", "./index.html", ["index", "landing"]),
  createPages("./src/pages/handbook.html", "./pages/handbook.html", [
    "index",
    "handbook",
  ]),
  createPages("./src/pages/gallery.html", "./pages/gallery.html", [
    "index",
    "gallery",
  ]),
  createPages("./src/pages/sandbox.html", "./pages/sandbox.html", ["index", "sandbox"]),
  createPages("./src/pages/work.html", "./pages/work.html", ["index", "work"]),
  createPages("./src/pages/about.html", "./pages/about.html", ["index"]),
  createPages("./src/pages/adding.html", "./pages/adding.html", ["index", "adding"]),
  createPages("./src/pages/notFound.html", "./pages/notFound.html", ["index"]),
    createPages("./src/pages/notFound.html", "./404.html", ["index"]),
  createPages(
    "./src/pages/parts/part1/module1/tutorial0.html",
    "./pages/parts/part1/module1/tutorial0.html",
    ["index", "tutorial"],
  ),
  // Часть1 Модуль1 ./part1/module1
  createPages(
    "./src/pages/parts/part1/module1.html",
    "./pages/parts/part1/module1.html",
    ["index", "module"],
  ),
  createPages(
    "./src/pages/parts/part1/module1/tutorial1.html",
    "./pages/parts/part1/module1/tutorial1.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part1/module1/tutorial2.html",
    "./pages/parts/part1/module1/tutorial2.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part1/module1/tutorial3.html",
    "./pages/parts/part1/module1/tutorial3.html",
    ["index", "tutorial"],
  ),
  // Часть1 Модуль2 ./part1/module2
  createPages(
    "./src/pages/parts/part1/module2.html",
    "./pages/parts/part1/module2.html",
    ["index", "module"],
  ),
  createPages(
    "./src/pages/parts/part1/module2/tutorial1.html",
    "./pages/parts/part1/module2/tutorial1.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part1/module2/tutorial2.html",
    "./pages/parts/part1/module2/tutorial2.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part1/module2/tutorial3.html",
    "./pages/parts/part1/module2/tutorial3.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part1/module2/tutorial4.html",
    "./pages/parts/part1/module2/tutorial4.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part1/module2/tutorial5.html",
    "./pages/parts/part1/module2/tutorial5.html",
    ["index", "tutorial"],
  ),
  // Часть2 Модуль1 ./part2/module1
  createPages(
    "./src/pages/parts/part2/module1.html",
    "./pages/parts/part2/module1.html",
    ["index", "module"],
  ),
  createPages(
    "./src/pages/parts/part2/module1/tutorial1.html",
    "./pages/parts/part2/module1/tutorial1.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part2/module1/tutorial2.html",
    "./pages/parts/part2/module1/tutorial2.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part2/module1/tutorial3.html",
    "./pages/parts/part2/module1/tutorial3.html",
    ["index", "tutorial"],
  ),
  // Часть2 Модуль2 ./part2/module2
  createPages(
    "./src/pages/parts/part2/module2.html",
    "./pages/parts/part2/module2.html",
    ["index", "module"],
  ),
  createPages(
    "./src/pages/parts/part2/module2/tutorial1.html",
    "./pages/parts/part2/module2/tutorial1.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part2/module2/tutorial2.html",
    "./pages/parts/part2/module2/tutorial2.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part2/module2/tutorial3.html",
    "./pages/parts/part2/module2/tutorial3.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part2/module2/tutorial4.html",
    "./pages/parts/part2/module2/tutorial4.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part2/module2/tutorial5.html",
    "./pages/parts/part2/module2/tutorial5.html",
    ["index", "tutorial"],
  ),
  // Часть2 Модуль3 ./part2/module3
  createPages(
    "./src/pages/parts/part2/module3.html",
    "./pages/parts/part2/module3.html",
    ["index", "module"],
  ),
  createPages(
    "./src/pages/parts/part2/module3/tutorial1.html",
    "./pages/parts/part2/module3/tutorial1.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part2/module3/tutorial2.html",
    "./pages/parts/part2/module3/tutorial2.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part2/module3/tutorial3.html",
    "./pages/parts/part2/module3/tutorial3.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part2/module3/tutorial4.html",
    "./pages/parts/part2/module3/tutorial4.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part2/module3/tutorial5.html",
    "./pages/parts/part2/module3/tutorial5.html",
    ["index", "tutorial"],
  ),
  // Часть3 Модуль1 ./part3/module1
  createPages(
    "./src/pages/parts/part3/module1.html",
    "./pages/parts/part3/module1.html",
    ["index", "module"],
  ),
  createPages(
    "./src/pages/parts/part3/module1/tutorial1.html",
    "./pages/parts/part3/module1/tutorial1.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part3/module1/tutorial2.html",
    "./pages/parts/part3/module1/tutorial2.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part3/module1/tutorial3.html",
    "./pages/parts/part3/module1/tutorial3.html",
    ["index", "tutorial"],
  ),
    createPages(
    "./src/pages/parts/part3/module1/tutorial4.html",
    "./pages/parts/part3/module1/tutorial4.html",
    ["index", "tutorial"],
  ),
  // Часть3 Модуль2 ./part3/module2
  createPages(
    "./src/pages/parts/part3/module2.html",
    "./pages/parts/part3/module2.html",
    ["index", "module"],
  ),
  createPages(
    "./src/pages/parts/part3/module2/tutorial1.html",
    "./pages/parts/part3/module2/tutorial1.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part3/module2/tutorial2.html",
    "./pages/parts/part3/module2/tutorial2.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part3/module2/tutorial3.html",
    "./pages/parts/part3/module2/tutorial3.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part3/module2/tutorial4.html",
    "./pages/parts/part3/module2/tutorial4.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part3/module2/tutorial5.html",
    "./pages/parts/part3/module2/tutorial5.html",
    ["index", "tutorial"],
  ),
  // Часть3 Модуль3 ./part3/module3
  createPages(
    "./src/pages/parts/part3/module3.html",
    "./pages/parts/part3/module3.html",
    ["index", "module"],
  ),
  createPages(
    "./src/pages/parts/part3/module3/tutorial1.html",
    "./pages/parts/part3/module3/tutorial1.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part3/module3/tutorial2.html",
    "./pages/parts/part3/module3/tutorial2.html",
    ["index", "tutorial"],
  ),
  createPages(
    "./src/pages/parts/part3/module3/tutorial3.html",
    "./pages/parts/part3/module3/tutorial3.html",
    ["index", "tutorial"],
  ),
];


module.exports = htmlPages;
