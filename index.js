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

  if (path.endsWith("/")) {
    res.send("Test");
  } else if (path.endsWith("/data")) {
    const url = decodeURIComponent(req.query.url);

    axios(encodeURI(url)).then((response) => {
      res.send(response.data);
    });
  } else if (path.endsWith("/status")) {
    const url = decodeURIComponent(req.query.url);

    axios(encodeURI(url)).then((response) => {
      res.send(response.status.toString());
    });
  }
};
