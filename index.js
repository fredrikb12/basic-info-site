const http = require("http");
const fs = require("fs");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index";
  }
  if (
    filePath === "./index" ||
    filePath === "./about" ||
    filePath === "./contact"
  ) {
    fs.readFile(filePath + ".html", "utf-8", (err, data) => {
      if (err) console.log(err);
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else {
    fs.readFile("404.html", "utf-8", (err, data) => {
      if (err) console.error(err);
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
