import React from "react";

import CourseList from "./components/CourseList";

import './App.css';
const App = () => {
  return <div className="course-goals">
    <h2>MERN Stack Course</h2>
    <CourseList/>
  </div>
  //<h1> Welcome to ReactJS with <span>Git and Nodejs</span></h1>;
};

export default App;