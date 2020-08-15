import React from "react";
import "./App.css";

const Input = (props) => {
  return (
    <>
      <input
        type="text"
        className="form-control"
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        value={props.value}
      ></input>
    </>
  );
};

export default Input;
