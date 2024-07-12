import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
const Signup = () => {
  const history =useNavigate();
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
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:1000/api/v1/register", Inputs)
      .then((response) => {
        if (response.data.message === "User Already Exists"){
          alert(response.data.message);
      } else{
        alert(response.data.message);
        setInputs({ email: "", username: "", password: "" });
      history("/signin");}
      });

  };
  return (
    <div className="signup">
      <div className="container ">
        <div className="row">
          <div
            className="col-lg-8 column  d-flex
            justify-content-center
            align-items-center  order-2 order-lg-1"
          >
            <div className="form">
              <input
                className="p-2 my-3"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                required
                onChange={change}
                value={Inputs.email}
              />
              <input
                className="p-2 my-3"
                type="username"
                name="username"
                placeholder="Enter Your Username"
                required
                onChange={change}
                value={Inputs.username}
              />

              <input
                className="p-2 my-3"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                required
                onChange={change}
                value={Inputs.password}
                onKeyPress={handleKeyPress}
              />
              <button className="btn-signup p-2 my-3" onClick={submit}  disabled={Inputs.email.trim() === "" || Inputs.username.trim() === ""|| Inputs.password.trim() === ""}>
                Sign Up
              </button>
            </div>
          </div>
          <div
            className="col-lg-4 column colum col-left d-flex
            justify-content-center
            align-items-center order-1 order-lg-2"
          >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3zAUa45raAKfIlkGx3Bw526HkAf1947OLoLtDq2xZPSn770Bq"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
