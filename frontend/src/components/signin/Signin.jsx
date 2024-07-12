import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const history =useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (Inputs.email.trim() !== "" && Inputs.password.trim() !== "") {
        submit();
      }
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:1000/api/v1/signin", Inputs)
      .then((response) => {
        if (response.data.message === "User Already Exists"){
          alert(response.data.message);
      } else{
        alert(response.data.message);
        setInputs({ email: "",  password: "" });
      history("/create");}
      });
    };
  return (
    <div className="signin">
      <div className="container ">
        <div className="row">
          <div
            className="col-lg-4 column colum col-left d-flex
                justify-content-center
                align-items-center"
          >
            <div className="image">
              <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRj7yLJ4cfaeJqXG7Ye8eTQNAsOr4C9p64nZF53vLNZEUTavYOS"></img>
            </div>
          </div>
          <div
            className="col-lg-8 column  d-flex
                justify-content-center
                align-items-center"
          >
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
                type="password"
                name="password"
                placeholder="Enter Your Password"
                required
                value={Inputs.password}
                onChange={change}
                onKeyPress={handleKeyPress}
              />
              <button className="btn-signin p-2 my-3 "  disabled={Inputs.email.trim() === "" || Inputs.password.trim() === ""}onClick={submit}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
