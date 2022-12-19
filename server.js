const express = require("express");
const path = require("path");
const port = 3333;

let pathInitial = path.join(__dirname, "assets");

let app = express();
app.use(express.static(pathInitial));

app.get("/", (req, res) => {
  res.sendFile(path.join(pathInitial, "index.html"));
});

app.listen(port, () => {
  console.log(`Server start up on port ${port}`);
});


