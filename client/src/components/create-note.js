import React, { useState } from "react";
import axios from "axios";

function CreateNote() {
  const [note, setNote] = useState({
    date: "",
    title: "",
    content: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setNote((prev) => {
      return { ...prev, date: Date(), [name]: value };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(note);

    // axios.post 메소드를 사용하여 백엔드 엔드포인트 http://localhost:4000/notes/add 에 HTTP POST 요청
    axios
      .post("http://localhost:4000/notes/add", note)
      .then((res) => console.log(res.data));

    setNote({
      date: "",
      title: "",
      content: "",
    });
  };

  return (
    <div className="container" style={{ marginTop: 10 }}>
      <h3>Create New Note</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>title : </label>
          <input
            type="text"
            className="form-control"
            style={{ marginBottom: 10 }}
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>content : </label>
          <textarea
            type="text"
            className="form-control"
            id="content"
            name="content"
            value={note.content}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            style={{ marginTop: 10 }}
            type="submit"
            value="Create Note"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateNote;
