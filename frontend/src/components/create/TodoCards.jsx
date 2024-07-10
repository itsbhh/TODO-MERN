import React from "react";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, id, delid, display }) => {
  return (
    <div className="p-3 todo-card">
      <div>
        <h5>{title}</h5>
        <p className="p-3 todo-card-p"> {body.split("", 100)}...</p>
      </div>
      <div
        className="d-flex
                justify-content-around card-icon-head"
                onClick={() => {
                    display("block");
                }}
      >
        <div className="card-icon up mx-2 py-1">
          <GrDocumentUpdate />
          Edit
        </div>
        <div
          className="card-icon del mx-2 py-1 text-danger"
          onClick={() => {
            delid(id);
          }}
        >
          <MdDelete />
          Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
