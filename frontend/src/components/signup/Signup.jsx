import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (Inputs.email.trim() !== "" && Inputs.username.trim() !== "" && Inputs.password.trim() !== "") {
        submit();
      }
    }
  };

  const submit = async () => {
    try {
      const response = await axios.post(`${window.location.origin}/api/v1/register`, Inputs);
      if (response.data.message === "User Already Exists") {
      } else if (response.data.message === "Username Already Exists") {
      } else {
        toast.success("Sign Up Done");
        setInputs({ email: "", username: "", password: "" });
        history("/signin");
      }
    } catch (error) {
      toast.info("Failed to register.Email or Username Already Exist!");
    }
  };

  return (
    <div className="signup">
       <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center order-2 order-lg-1">
            <div className="form">
              <input
                className="p-2 my-3"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                required
                value={Inputs.email}
                onChange={change}
              />
              <input
                className="p-2 my-3"
                type="text"
                name="username"
                placeholder="Enter Your Username"
                required
                value={Inputs.username}
                onChange={change}
              />
              <input
                className="p-2 my-3"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                required
                value={Inputs.password}
                onChange={change}
                onKeyPress={handleKeyPress}
              />
              <button
                className="btn-signup p-2 my-3"
                onClick={submit}
                disabled={Inputs.email.trim() === "" || Inputs.username.trim() === "" || Inputs.password.trim() === ""}
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="col-lg-4 column d-flex justify-content-center align-items-center order-1 order-lg-2">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3zAUa45raAKfIlkGx3Bw526HkAf1947OLoLtDq2xZPSn770Bq" alt="signup-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
