import React, { useState } from "react";
import "./Create.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit from "./Edit";

const Create = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);
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
    setArray([...Array, Inputs]);
    setInputs({ title: "", body: "" });
    toast.success("Your Task Is Added");
    toast.error("Your Task Is Not Saved! Please SignUp!");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (Inputs.title.trim() !== "" && Inputs.body.trim() !== "") {
        submit();
      }
    }
  };
  const del = (id) => {
    Array.splice(id, "1");
    setArray([...Array]);
  };
  const dis =(value) => {
    document.getElementById("todo-edit").style.display = value;
  };
  return (
    <>
      <div className="create">
        <ToastContainer />
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
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {Array &&
                Array.map((item, index) => (
                  <div
                    className="col-lg-3 col-10 mx-5 my-1 columnn"
                    key={index}
                  >
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={index}
                      delid={del}
                      display={dis}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-edit" id="todo-edit">
        <div className="container">
          {" "}
          <Edit  display={dis} />
        </div>
      </div>
    </>
  );
};

export default Create;
