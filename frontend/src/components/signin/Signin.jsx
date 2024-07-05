import React from "react";
import "./Signin.css";

const Signin = () => {
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
              />
              <input
                className="p-2 my-3"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                required
              />
              <button className="btn-signin p-2 my-3">Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
