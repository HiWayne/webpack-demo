const fastify = require("fastify");
const dotenv = require("dotenv");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const { createElement } = require("react");
const { renderToString } = require("react-dom/server.js");

dotenv.config();

const convertComponentFilePath = (path, lastPath) => {
  path = path.replace(/(\.html)?\/?$/, "");
  if (fs.existsSync(path + ".js")) {
    return path + ".js";
  } else if (fs.existsSync(path + "/index.js")) {
    return path + "/index.js";
  } else if (fs.existsSync(`${path}/${lastPath}.js`)) {
    return `${path}/${lastPath}.js`;
  } else if (fs.existsSync(path + ".mjs")) {
    return path + ".mjs";
  } else if (fs.existsSync(path + "/index.mjs")) {
    return path + "/index.mjs";
  } else if (fs.existsSync(`${path}/${lastPath}.mjs`)) {
    return `${path}/${lastPath}.mjs`;
  } else if (fs.existsSync(path + ".cjs")) {
    return path + ".cjs";
  } else if (fs.existsSync(path + "/index.cjs")) {
    return path + "/index.cjs";
  } else if (fs.existsSync(`${path}/${lastPath}.cjs`)) {
    return `${path}/${lastPath}.cjs`;
  } else {
    return false;
  }
};

const server = fastify();

const fileTypeMap = {
  js: "utf-8",
  css: "utf-8",
  html: "utf-8",
};

const contentTypeMap = {
  js: "application/javascript; charset=utf-8",
  css: "text/css",
  html: "text/html;charset=utf-8",
  txt: "text/plain",
  // 图片
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  gif_jpeg: "image/gif_jpeg",
  gif_png: "image/gif_png",
  gif_webp: "image/gif_webp",
  tiff: "image/tiff",
  gif: "image/gif",
  raw: "image/raw",
  eps: "image/eps",
  svg: "image/svg",
  bmp: "image/bmp",
  // 字体
  ttf: "font/ttf",
  otf: "font/otf",
  fnt: "font/fnt",
  woff: "font/woff",
  woff2: "font/woff2",
  // 二进制
  binary: "application/octet-stream",
};

const staticServer = (
  subpath,
  root = path.join(__dirname, "/dist/server/")
) => {
  const filePath = root + subpath;
  if (fs.existsSync(filePath)) {
    const extRegExp = /(?<=\.)[^\.]+$/;
    const match = filePath.match(extRegExp);
    try {
      if (match) {
        const ext = match[0];
        return {
          type: contentTypeMap[ext] || contentTypeMap["binary"],
          data: fs.readFileSync(filePath, fileTypeMap[ext]),
        };
      } else {
        return {
          type: contentTypeMap["binary"],
          data: fs.readFileSync(filePath),
        };
      }
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

server.get("/*", async (request, reply) => {
  const route = request.params["*"] || "cartoon";
  const componentName = route.split("/")[0].replace(/(\.html)?\/?$/, "");
  const componentPath = convertComponentFilePath(
    `./dist/server/${route}`,
    componentName
  );
  if (componentPath) {
    try {
      const Page = require(componentPath).default;
      const getInitialProps = Page.getInitialProps;
      let props;
      if (typeof getInitialProps === "function") {
        const context = {
          req: request,
          query: request.query,
        };
        props = await getInitialProps(context);
      }
      const hydrate = renderToString(createElement(Page, props));

      const htmlTemplate = fs.readFileSync(
        path.join(__dirname, `/dist/server/${componentName}.html`),
        "utf-8"
      );

      const response = htmlTemplate.replace(
        "<!-- HTML_PLACEHOLDER -->",
        hydrate
      );
      reply
        .code(200)
        .headers({
          "content-type": "text/html",
        })
        .send(response);
    } catch (e) {
      console.log(e);
      reply.code(500).send("Bad Response");
    }
  } else {
    const result = staticServer(route);
    if (result) {
      const { type, data } = result;
      reply
        .code(200)
        .headers({
          "content-type": type,
        })
        .send(data);
    } else {
      reply.code(404).send();
    }
  }
});

server.listen(
  process.env.BACKEND_PORT,
  process.env.HOST,
  undefined,
  (err, address) => {
    if (!err) {
      console.log(chalk.green(`server is running, listen ${address}`));
    } else {
      console.log(chalk.red(err));
    }
  }
);
