import React, { useState } from "react";

function CreateNote() {
  const [note, setNote] = useState({
    id: "",
    title: "",
    content: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setNote((prev) => {
      return { ...prev, id: Math.random(), date: Date(), [name]: value };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(note);
    setNote({
      id: "",
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
            value="Create Todo"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateNote;
