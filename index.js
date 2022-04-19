// jshint esversion:6

const http = require("http");
const path = require("path");
const fs = require("fs");
const app = express();

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : `${req.url}.html`);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, "utf-8");
      });
      } else {
        res.end(`server error ${err.code}`);
      }      
    } else {
      res.end(content, "utf-8");
    }
  });
});

const PORT = 8008;

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
