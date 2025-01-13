import React from "react";

import CourseList from "./components/Course/CourseList";

import './App.css';
const App = () => {
  const courseGoals = [
    {id: 'cg1', text: 'Nodejs & ReactJS'},
    {id: 'cg2', text: 'Git'},
    {id: 'cg3', text: 'ExpressJs & MongoDB'}
  ];
  return <div className="course-goals">
    <h2>MERN Stack Course</h2>
    <CourseList goals={courseGoals}/>
  </div>
  //<h1> Welcome to ReactJS with <span>Git and Nodejs</span></h1>;
};

export default App;