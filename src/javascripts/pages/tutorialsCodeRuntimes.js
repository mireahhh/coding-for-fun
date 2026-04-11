export function getBaseStyles(background = "transparent") {
  return `
    * {
      box-sizing: border-box;
    }

    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: ${background};
    }

    body {
      position: relative;
    }

    pre {
      margin: 0;
      padding: 12px;
      white-space: pre-wrap;
      font-family: monospace;
      font-size: 13px;
      line-height: 1.4;
      color: #B91C1C;
    }
  `;
}

export function getEmptyHtml() {
  return `
<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <style>
    ${getBaseStyles("transparent")}
  </style>
</head>
<body></body>
</html>`;
}

export function getUnknownRuntimeHtml(runtimeName) {
  return `
<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <style>
    ${getBaseStyles("#FFFFFF")}
  </style>
</head>
<body>
  <pre>Неизвестный runtime: ${runtimeName}</pre>
</body>
</html>`;
}

export function getVanillaHtml(code) {
  return `
<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <style>
    ${getBaseStyles("#FFFFFF")}

    #app {
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div id="app"></div>

  <script>
    try {
    (function () {
      ${code}
    })();
    } catch (error) {
      document.body.innerHTML = "<pre>" + String(error) + "</pre>";
      console.error(error);
    }
  <\/script>
</body>
</html>`;
}

export function getP5Html(code) {
  return `
<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <style>
    ${getBaseStyles("#FFFFFF")}

    html, body {
      margin: 0 !important;
      padding: 0 !important;
    }

    #app {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: #FFFFFF;
    }

    canvas {
      display: block;
      max-width: 100%;
      max-height: 100%;
      margin: 0 !important;
      padding: 0 !important;
    }
  </style>
</head>
<body>
  <div id="app"></div>

  <script>
    window.onerror = function(message, source, lineno, colno, error) {
      document.body.innerHTML = "<pre>" + String(message) + "</pre>";
      console.error(error || message);
    };
  <\/script>

  <script src="https://cdn.jsdelivr.net/npm/p5/lib/p5.min.js"><\/script>

  <script>
    try {
      ${code}

      if (typeof window.setup === "function") {
        const userSetup = window.setup;
        window.setup = function () {
          const result = userSetup();

          const canvas = document.querySelector("canvas");
          const app = document.getElementById("app");

          if (canvas && app && canvas.parentElement !== app) {
            app.appendChild(canvas);
          }

          return result;
        };
      }
    } catch (error) {
      document.body.innerHTML = "<pre>" + String(error) + "</pre>";
      console.error(error);
    }
  <\/script>
</body>
</html>`;
}

export function getThreeHtml(code) {
  return `
<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <style>
    ${getBaseStyles("#FFFFFF")}

    #app {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #FFFFFF;
      position: relative;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div id="app"></div>

  <script>
    window.onerror = function(message, source, lineno, colno, error) {
      document.body.innerHTML = "<pre>" + String(message) + "</pre>";
      console.error(error || message);
    };
  <\/script>

  <script type="module">
    import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js";

    const app = document.getElementById("app");

    let renderer = null;
    let animationId = null;
    let cleanup = null;

    try {
      const userFunction = new Function("THREE", "app", \`
        ${code}
      \`);

      cleanup = userFunction(THREE, app);
    } catch (error) {
      document.body.innerHTML = "<pre>" + String(error) + "</pre>";
      console.error(error);
    }

    window.addEventListener("beforeunload", () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (typeof cleanup === "function") cleanup();
    });
  <\/script>
</body>
</html>`;
}