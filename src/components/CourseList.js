import React from "react";

import './CourseList.css';

const CourseList = props => {
    console.log(props.goals)
    return <ul className="course-list">{[<li>Hi</li>, <li>This works</li>]}</ul>;
};

export default CourseList;