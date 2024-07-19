import React, { useEffect, useState } from "react";
import "./Create.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit from "./Edit";
import axios from "axios";

const Create = () => {
    
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);
  const [id, setId] = useState(sessionStorage.getItem("id"));
  const [toUpdateArray, setToUpdateArray] = useState(null);

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

  const submit = async () => {
    try {
      if (id) {
        await axios.post("http://localhost:1000/api/v2/addTask", {
          title: Inputs.title,
          body: Inputs.body,
          id: id,
        });
        setInputs({ title: "", body: "" });
        fetchTasks();
        toast.success("Task added successfully");
      } else {
        toast.error("Please sign up first!");
      }
    } catch (error) {
      toast.error("Failed to add task. Please try again.");
      console.error("Error adding task:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (Inputs.title.trim() !== "" && Inputs.body.trim() !== "") {
        submit();
      }
    }
  };

  const del = async (Cardid) => {
    if (id) {
      try {
        await axios.delete(
          `http://localhost:1000/api/v2/deleteTask/${Cardid}`,
          {
            data: { id: id },
          }
        );
        toast.success("Task deleted successfully");
        setArray(Array.filter((item) => item._id !== Cardid));
      } catch (error) {
        toast.error("Failed to delete task. Please try again.");
        console.error("Error deleting task:", error);
      }
    } else {
      toast.error("Please sign up first!");
    }
  };

  const dis = (value) => {
    document.getElementById("todo-edit").style.display = value;
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/v2/getTasks/${id}`
      );
      if (response.status === 200 && response.data.list.length > 0) {
        setArray(response.data.list);
      } else {
        setArray([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setArray([]);
      }
    }
  };

  const update = (index) => {
    setToUpdateArray(Array[index]);
  };

  const handleUpdateSuccess = () => {
    toast.success("Task Updated successfully");
    fetchTasks();
  };


  useEffect(() => {
    setId(sessionStorage.getItem("id"));
  }, []);

  useEffect(() => {
    if (id) {
      fetchTasks();
    }
  }, [id]);

  return (
    <>
      <div className="create">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
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
              {Array.map((item, index) => (
                <div className="col-lg-3 col-10 mx-5 my-1 columnn" key={index}>
                  <TodoCards
                    title={item.title}
                    body={item.body}
                    isChecked={item.isChecked}
                    id={item._id}
                    delid={del}
                    display={dis}
                    Id={index}
                    toBeUpdate={update}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-edit" id="todo-edit">
        <div className="container">
          {toUpdateArray && (
            <Edit display={dis} update={toUpdateArray} onUpdateSuccess={handleUpdateSuccess} />
          )}
        </div>
      </div>
    </>
  );
};

export default Create;
