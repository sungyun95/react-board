import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

// 2/26
function EditNote() {
  const { id } = useParams(); // URL에서 id 가져옴
  let navigate = useNavigate(); // 버튼 클릭 or Submit 후 홈으로 라우팅
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  // note
  useEffect(() => {
    axios
      .get(`http://localhost:4000/notes/${id}`)
      .then((res) =>
        setNote({
          title: res.data.title,
          content: res.data.content,
        })
      )
      .catch((error) => console.log(error));
  }, [id]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setNote((prev) => {
      return { ...prev, date: Date(), [name]: value };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:4000/notes/update/${id}`, note) // notes/update/:id 로 연결해야 함(server.js)
      .then((res) => console.log(res.data));
    navigate("/");
  };

  return (
    <div className="container">
      <h3 align="center">Update Note</h3>
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
            value="Update Note"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditNote;
