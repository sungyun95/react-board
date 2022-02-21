const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 4000;

//
const noteRoutes = express.Router();
app.use("/notes", noteRoutes);
// console.log(noteRoutes.params);

app.set("view engine", "ejs");
app.use(cors()); // ?

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

// Mongoose Setup
mongoose.connect("mongodb://localhost:27017/noteDB", { useNewUrlParser: true });

const noteSchema = {
  data: String,
  title: String,
  content: String,
};

const Note = mongoose.model("Note", noteSchema);

// 우선 사용 가능한 모든 할일 항목을 전달하는 엔드포인트를 추가해야 합니다.
noteRoutes.route("/").get(function (req, res) {
  Note.find((err, notes) => {
    !err ? console.log(err) : console.log(notes);
  });
});

// 구현해야 하는 다음 끝점은 /:id 입니다. 이 경로 확장은 ID를 제공하여 할 일 항목을 검색하는 데 사용됩니다.
noteRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Note.findById(id, (err, note) => res.json(note));
});

// 다음으로 HTTP 게시 요청( /add ) 을 보내 새 할 일 항목을 추가하는 데 필요한 경로를 추가해 보겠습니다 .
noteRoutes.route("/add").post((req, res) => {
  let note = new Note(req.body);
  note
    .save()
    .then((note) => {
      res.status(200).json({ note: "note가 성공적으로 추가되었습니다" });
    })
    .catch((err) => {
      res.status(400).send("note 추가 실패");
    });
});

noteRoutes.route("/update/:id").post((req, res) => {
  Note.findById(req.params.id, (err, note) => {
    if (!note) res.status(404).send("data is not found");
    else
      (note.title = req.body.title),
        (note.content = req.body.content),
        note
          .save()
          .then((note) => {
            res.json("Note updated!");
          })
          .catch((err) => res.status(400).send("Update not possible"));
  });
});

// GET
// app.get("/notes", (req, res) => {
//   Note.find((err, foundnotes) => {
//     console.log(foundnotes);
//     res.send(!err ? foundnotes : err);
//   });
// });

app.listen(PORT, () => {
  console.log("Server started on port 4000");
});
