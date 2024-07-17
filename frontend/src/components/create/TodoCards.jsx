import React from "react";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";


const TodoCards = ({
  title,
  body,
  isChecked,
  id,
  delid,
  display,
  Id,
  toBeUpdate,
}) => {
  const truncateBody = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  return (
    <div className="p-3 todo-card">
      <div className="d-flex align-items-center check">
        <input
          type="checkbox"
          checked={isChecked}
          disabled
          className="checkbox-custom"
          style={{ marginRight: "10px" }}
        />
        <h5
          className="ml-3"
          style={{
            textDecoration: isChecked ? "line-through" : "none",
            maxWidth: "calc(100% - 30px)",
            overflowWrap: "break-word",
          }}
        >
          {title}
        </h5>
      </div>
      <p
        className="p-3 todo-card-p"
        style={{
          textDecoration: isChecked ? "line-through" : "none",
          maxWidth: "100%",
          overflowWrap: "break-word",
        }}
      >
         {truncateBody(body, 80)} 
      </p>
      <div className="d-flex justify-content-around card-icon-head">
        <div
          className="card-icon up mx-2 py-1"
          onClick={() => {
            display("block");
            toBeUpdate(Id);
          }}
        >
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
