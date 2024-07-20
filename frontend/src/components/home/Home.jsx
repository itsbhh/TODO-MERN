import React from "react";
import { Link } from 'react-router-dom';
import "./Home.css";
const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container home d-flex justify-content-center align-items-center flex-column">
        <h1>Effortlessly Organize, <br /> and Enhance Your Life !</h1>
        <p className="para">Designed to help you organize your life with ease and efficiency,
        <br/>this brings a touch of elegance to managing your tasks and deadlines.</p> 
        <Link to="/create" ><button className="home-btn">Create Your List</button></Link></div>
        
    </div>
  );
};

export default Home;
