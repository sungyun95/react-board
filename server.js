const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

// Mongoose Setup
mongoose.connect("mongodb://localhost:27017/noteDB", { useNewUrlParser: true });

const noteSchema = {
  title: String,
  content: String,
};

const Note = mongoose.model("Note", noteSchema);

// GET
app.get("/notes", (req, res) => {
  Note.find((err, foundnotes) => {
    console.log(foundnotes);
    res.send(!err ? foundnotes : err);
  });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
