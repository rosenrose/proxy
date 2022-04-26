const http = require("http");
const express = require("express");
const axios = require("axios").default;
const PORT = process.env.PORT || 3000;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.resolve(error.response);
  }
);

const app = express();
app.get("/data", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const url = decodeURIComponent(req.query.url);

  axios(encodeURI(url)).then((response) => {
    res.send(response.data);
  });
});

app.get("/status", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const url = decodeURIComponent(req.query.url);

  axios(encodeURI(url)).then((response) => {
    // console.log(response);
    res.send(response.status);
  });
});

const server = http.createServer(app);
server.listen(PORT);
