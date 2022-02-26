import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./note";

function NotesList() {
  const [notes, setNotes] = useState([]);
  // componentDidMount 라이프사이클 메소드 => useEffect로 대체
  useEffect(() => {
    axios
      .get("http://localhost:4000/notes/")
      .then((res) => setNotes((prev) => [...prev, ...res.data]))
      // res.data = [{~}, {~}] -> ...로 변환해줌
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <h3>Notes List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((currentnote, index) => (
            <Note note={currentnote} key={index} />
          ))}
        </tbody>
        {console.log(notes)}
      </table>
    </div>
  );
}

export default NotesList;
