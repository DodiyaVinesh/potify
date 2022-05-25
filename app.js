const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use(express.static(__dirname + "/client/dist/client"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/client/dist/client/index.html"));
});

app.listen(port, () => {
  console.log("Listning to port " + port);
});
