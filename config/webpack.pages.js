const HtmlWebpackPlugin = require("html-webpack-plugin");

function createPages(template, filename, chunks) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: filename,
    chunks: chunks,
  });
}

const htmlPages = [
  createPages("./src/index.html", "./index.html", ["main"]),
  createPages("./src/pages/handbook.html", "./pages/handbook.html", [
    "main"
  ]),
  createPages("./src/pages/gallery.html", "./pages/gallery.html", ["main"]),
  createPages("./src/pages/about.html", "./pages/about.html", ["main"]),
  createPages("./src/pages/add_work.html", "./pages/add_work.html", ["main"]),
  createPages("./src/pages/add_tutorial.html", "./pages/add_tutorial.html", [
    "main",
  ]),
  createPages("./src/pages/rules.html", "./pages/rules.html", ["main"]),

  // Галерея ./works
  createPages("./src/pages/works/work_1.html", "./pages/works/work_1.html", [
    "main",
  ]),

  // Часть_1 Модуль_1 ./part_1/module_1
  createPages(
    "./src/pages/parts/part_1/module_1.html",
    "./pages/parts/part_1/module_1.html",
    ["main"],
  ),
  createPages(
    "./src/pages/parts/part_1/module_1/tutorial_1.html",
    "./pages/parts/part_1/module_1/tutorial_1.html",
    ["main"],
  ),
  createPages(
    "./src/pages/parts/part_1/module_1/tutorial_2.html",
    "./pages/parts/part_1/module_1/tutorial_2.html",
    ["main"],
  ),
  createPages(
    "./src/pages/parts/part_1/module_1/tutorial_3.html",
    "./pages/parts/part_1/module_1/tutorial_3.html",
    ["main"],
  ),
];

module.exports = htmlPages;
