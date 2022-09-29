/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const axios = require("axios").default;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.resolve(error.response);
  }
);

exports.app = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const [path, search] = req.url.split("?");
  console.log(path, search, req.query);

  if (path.endsWith("/data")) {
    axios(req.query.url, { responseType: "arraybuffer" }).then((response) => {
      res.header("Content-Type", response.headers["content-type"]);
      // res.header("Content-Length", response.headers["content-length"]);
      res.send(response.data);
    });
  } else if (path.endsWith("/status")) {
    axios(req.query.url, { responseType: "arraybuffer" }).then((response) => {
      res.send(response.status.toString());
    });
  } else if (path.endsWith("/")) {
    res.send("Test");
  }
};
