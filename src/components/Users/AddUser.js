import React, { useState, useRef } from "react";

import Card from "../UserInterface/Card";
import Button from "../UserInterface/Button";
import ErrorModal from "../UserInterface/ErrorModal";

import Wrapper from "../Helpers/Wrapper";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const usernameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState("");

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid username and age (non-empty values).",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    usernameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={usernameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
