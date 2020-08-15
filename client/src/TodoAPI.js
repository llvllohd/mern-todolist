export default {
  getTodos: () => {
    return fetch("/todo")
      .then((res) => res.json())
      .then((data) => data);
  },
  deleteTodo: (_id) => {
    return fetch(`/todo/${_id}`, { method: "delete" })
      .then((res) => res.json())
      .then((data) => data);
  },

  updateTodo: (todo) => {
    // console.log(todo._id);
    return fetch(`/todo/${todo._id}`, {
      method: "put",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  createTodo: (todo) => {
    // console.log(todo);
    return fetch("/todo", {
      method: "post",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
};
