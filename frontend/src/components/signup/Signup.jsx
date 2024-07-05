import React from "react";
import "./Signup.css";
const Signup = () => {
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
              />
              <input
                className="p-2 my-3"
                type="username"
                name="username"
                placeholder="Enter Your Username"
                required
              />

              <input
                className="p-2 my-3"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                required
              />
              <button className="btn-signup p-2 my-3">Sign Up</button>
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
