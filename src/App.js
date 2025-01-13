import React, { useState } from "react";

import CourseList from "./components/Goal/CourseList";

import NewGoal from "./components/NewGoal/NewGoal";

import './App.css';
const App = () => {
  const [courseGoals, setCourseGoals] = useState([
    {id: 'cg1', text: 'Nodejs & ReactJS'},
    {id: 'cg2', text: 'Git'},
    {id: 'cg3', text: 'ExpressJs & MongoDB'}
  ]);

  const addNewGoalHandler = (newGoal) => {
    //setCourseGoals(courseGoals.concat(newGoal));
    setCourseGoals((prevCourseGoals) => prevCourseGoals.concat(newGoal));
  };

  return (
    <div className="course-goals">
      <h2>MERN Stack Course</h2>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <CourseList goals={courseGoals} />
    </div>
  );
  //<h1> Welcome to ReactJS with <span>Git and Nodejs</span></h1>;
};

export default App;