import React, { useEffect, useState } from "react";
import axios from "axios";

const Edit = ({ display, update, onUpdateSuccess }) => {
  const [Inputs, setInputs] = useState({ isChecked: false, title: "", body: "" });

  useEffect(() => {
    if (update) {
      setInputs({
        isChecked: update.isChecked,
        title: update.title,
        body: update.body,
      });
    }
  }, [update]);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async () => {
    try {
      if (!update._id) {
        console.error("No valid ID provided for the update task");
        return;
      }

      await axios.put(`http://localhost:1000/api/v2/updateTask/${update._id}`, Inputs);
      onUpdateSuccess(); // Notify parent component of successful update
      display("none"); // Hide edit form on successful update
    } catch (error) {
      console.error("There was an error updating the task!", error);
      // Handle error: display message to user or log it for further investigation
    }
  };

  return (
    <>
      <div className="update d-flex justify-content-center">
        <div className="p-5 d-flex justify-content-center align-items-start flex-column updates">
          <h3>Edit & Update Your Task</h3>
          <div className="d-flex align-items-center check">
            <input
              type="checkbox"
              className="checkbox-custom"
              style={{ transform: "scale(1.5)" }}
              checked={Inputs.isChecked}
              name="isChecked"
              onChange={change}
            />
            <label>If Completed, Please Check</label>
          </div>
          <input
            type="text"
            className="my-2 p-2 todo-inputs"
            value={Inputs.title}
            name="title"
            onChange={change}
          />
          <textarea
            className="p-2 todo-inputs"
            value={Inputs.body}
            name="body"
            onChange={change}
          />
          <div className="w-100 d-flex align-items-start upd">
            <button className="btn-update p-2 my-3" onClick={submit}>
              Update
            </button>
            <button
              className="btn-update p-2 my-3 mx-5 close"
              onClick={() => display("none")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
