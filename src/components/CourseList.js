import React from "react";

import './CourseList.css';

const CourseList = props => {
    console.log(props.goals)
    return <ul className="course-list">{
        props.goals.map((goal) => {
            return <li key={goal.id}>{goal.text}</li>;
        })
    }</ul>;
};

export default CourseList;