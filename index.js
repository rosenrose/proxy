const http = require("http");
const express = require("express");
const axios = require("axios").default;
const PORT = process.env.PORT || 3000;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.resolve(error);
  }
);

const app = express();
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const url = decodeURIComponent(req.query.url);
  axios(encodeURI(url)).then((response) => {
    res.send(response);
  });
});

const server = http.createServer(app);
server.listen(PORT);
