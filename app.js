const express = require("express");
const path = require("path");
const cors = require("cors");
const yts = require("yt-search");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.static(__dirname + "/client/dist/client"));

app.get("/search", (req, res) => {
  console.log("requrest recieved");
  let query = req.query.query;
  console.log(query);
  if (!query) return;
  yts(query, (err, data) => {
    if (err) return;
    console.log(data.videos);
    res.send({ data: data.videos });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/client/dist/client/index.html"));
});

app.listen(port, () => {
  console.log("Listning to port " + port);
});
