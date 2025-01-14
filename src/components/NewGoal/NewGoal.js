import React from "react";

import "./NewGoal.css";

const NewGoal = props => {
    let enteredText = '';

    const addGoalHandler = event => {
        event.preventDefault();

        const newGoal = {
            id: Math.random().toString(),
            text: enteredText
        };

        console.log(newGoal);

        props.onAddGoal(newGoal);
    };

    const textChangeHandler = event => {
       enteredText = event.target.value;
    };

    return (
        <form className="new-goal" onSubmit={addGoalHandler}>
            <input type="text" onChange={textChangeHandler}/>
            <button type="submit">Add Goal</button>
        </form>
    );
};

export default NewGoal;