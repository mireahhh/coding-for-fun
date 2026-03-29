const HtmlWebpackPlugin = require("html-webpack-plugin");

function createPages(template, filename, chunks) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: filename,
    chunks: chunks,
  });
}

const htmlPages = [
  createPages("./src/index.html", "./index.html", ["index"]),
  createPages("./src/pages/handbook.html", "./pages/handbook.html", [
    "index",
    "handbook",
  ]),
  createPages("./src/pages/gallery.html", "./pages/gallery.html", [
    "index",
    "gallery",
  ]),
  createPages("./src/pages/work.html", "./pages/work.html", ["index"]),
  createPages("./src/pages/about.html", "./pages/about.html", ["index"]),
  createPages("./src/pages/addWork.html", "./pages/addWork.html", ["index"]),
  createPages("./src/pages/addTutorial.html", "./pages/addTutorial.html", [
    "index",
  ]),

  // Часть1 Модуль1 ./part1/module1
  createPages(
    "./src/pages/parts/part1/module1.html",
    "./pages/parts/part1/module1.html",
    ["index"],
  ),
  createPages(
    "./src/pages/parts/part1/module1/tutorial1.html",
    "./pages/parts/part1/module1/tutorial1.html",
    ["index"],
  ),
  createPages(
    "./src/pages/parts/part1/module1/tutorial2.html",
    "./pages/parts/part1/module1/tutorial2.html",
    ["index"],
  ),
  createPages(
    "./src/pages/parts/part1/module1/tutorial3.html",
    "./pages/parts/part1/module1/tutorial3.html",
    ["index"],
  ),
];

module.exports = htmlPages;
