import { Link } from "react-router-dom";
import React from "react";

function Note(props) {
  return (
    <tr>
      <td>{props.note._id}</td>
      <td>{props.note.title}</td>
      <td>{props.note.content}</td>
      <td>
        <Link to={`/edit/${props.note._id}`}>Edit</Link>
      </td>
    </tr>
  );
}

export default Note;
