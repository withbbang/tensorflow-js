const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/media", (req, res) => {
  res.render("media");
});

app.get("/webcam", (req, res) => {
  res.render("webcam");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
