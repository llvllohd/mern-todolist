const express = require("express");
const todoRouter = express.Router();
const Todo = require("../model/Todo");

//  CRUD OPERATIONS

// READ
todoRouter.get("/", (req, res) => {
  Todo.find({}, (err, response) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to get the data",
          msgError: true,
        },
      });
    else res.status(200).json({ response });
  });
});

// CREATE
todoRouter.post("/", (req, res) => {
  const todo = new Todo(req.body);
  todo.save((err, document) => {
    if (err)
      res.status(500).json({
        msgBody: "Unable to add the data",
        msgError: true,
      });
    else
      res.status(200).json({
        msgBody: "Successfully added the data",
        msgError: false,
      });
  });
});

// DELETE
todoRouter.delete("/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id, (err) => {
    if (err)
      res.status(500).json({
        msgBody: "Unable to delete the data",
        msgError: true,
      });
    else
      res.status(200).json({
        msgBody: "Successfully deleted the data",
        msgError: false,
      });
  });
});

// DELETE
todoRouter.put("/:id", (req, res) => {
  // console.log();
  Todo.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { runValidators: true },
    (err, response) => {
      if (err)
        res.status(500).json({
          msgBody: "Unable to update the data",
          msgError: true,
        });
      else
        res.status(200).json({
          msgBody: "Successfully updated the data",
          msgError: false,
        });
    }
  );
});

module.exports = todoRouter;
