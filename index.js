const http = require("http");
const express = require("express");
const axios = require("axios").default;
const PORT = process.env.PORT || 3000;

const app = express();
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const url = decodeURIComponent(req.query.url);
  axios(encodeURI(url), { responseType: "arraybuffer" }).then((response) => {
    res.send(response.data);
  });
});

const server = http.createServer(app);
server.listen(PORT);
