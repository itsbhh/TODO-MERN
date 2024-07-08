import React, { useState } from "react";
import "./Create.css";
const Create = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const show = () => {
    document.getElementById("textarea").style.display = "block";
    document.querySelector(".btn-create").style.display = "block";
    const todoMainDiv = document.querySelector(".todo-main");
    todoMainDiv.style.height = "400px";
    todoMainDiv.style.width = "70%";
  };
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = () => {
    console.log(Inputs);
    setInputs({ title: "", body: "" });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (Inputs.title.trim() !== "" && Inputs.body.trim() !== "") {
        submit();
      }
    }
  };
  return (
    <div className="create">
      <div
        className="todo-main container d-flex
                justify-content-center
                align-items-center flex-column"
      >
        <div className="d-flex flex-column todo-inputs-div">
          <input
            type="text"
            placeholder="TITLE"
            className="my-2 p-2 todo-inputs"
            required
            onClick={show}
            name="title"
            value={Inputs.title}
            onChange={change}
          />
          <textarea
            id="textarea"
            type="text"
            placeholder="BODY"
            className="p-2 todo-inputs"
            required
            name="body"
            value={Inputs.body}
            onChange={change}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="w-100">
          {" "}
          <button
            className="btn-create p-2 my-3"
            onClick={submit}
            disabled={Inputs.title.trim() === "" || Inputs.body.trim() === ""}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
