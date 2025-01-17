import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Max Schwarz",
      image:
        "https://www.google.com/imgres?q=beautiful%20scenery&imgurl=https%3A%2F%2Ffreedesignfile.com%2Fupload%2F2018%2F02%2Fmost-beautiful-scenery-of-nature-Stock-Photo-02.jpg&imgrefurl=https%3A%2F%2Fwww.therisingmedicare.com%2F%3Fg%3D91880753970&docid=BywOLgQCtb25vM&tbnid=sazsMTtFYLAHaM&vet=12ahUKEwjG5pDpw_yKAxVWwTgGHVZzBCgQM3oECD0QAA..i&w=600&h=634&hcb=2&ved=2ahUKEwjG5pDpw_yKAxVWwTgGHVZzBCgQM3oECD0QAA",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
