import React from "react";
import Input from "./Input";
import "./App.css";

const Form = (props) => {
  return (
    <form className="todo-form" onSubmit={props.handler}>
      <div className="form-group">
        <Input
          name="text"
          placeholder="Enter text"
          labelName="First Name"
          handleChange={props.handleChange}
          // value={props.isEditForm ? props.employee.firstName : props.value}
          value={props.todo.text}
        />

        <button type="submit" className="btn">
          {/* {!props.isEditForm ? "Add" : "Update"} */}
          {!props.isEditForm ? "Add" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default Form;
