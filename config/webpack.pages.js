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
  createPages("./src/pages/handbook.html", "./pages/handbook.html", ["index"]),
  createPages("./src/pages/gallery.html", "./pages/gallery.html", ["index"]),
  createPages("./src/pages/rules.html", "./pages/rules.html", ["index"]),
  createPages("./src/pages/about.html", "./pages/about.html", ["index"]),

  // Галерея ./works
  createPages("./src/pages/works/work_1.html", "./pages/works/work_1.html", [
    "index",
  ]),

  // Часть_1 Модуль_1 ./part_1/module_1
  createPages(
    "./src/pages/parts/part_1/module_1.html",
    "./pages/parts/part_1/module_1.html",
    ["index"],
  ),
  createPages(
    "./src/pages/parts/part_1/module_1/tutorial_1.html",
    "./pages/parts/part_1/module_1/tutorial_1.html",
    ["index"],
  ),
  createPages(
    "./src/pages/parts/part_1/module_1/tutorial_2.html",
    "./pages/parts/part_1/module_1/tutorial_2.html",
    ["index"],
  ),
  createPages(
    "./src/pages/parts/part_1/module_1/tutorial_3.html",
    "./pages/parts/part_1/module_1/tutorial_3.html",
    ["index"],
  ),
];

module.exports = htmlPages;
