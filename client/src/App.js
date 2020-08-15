import React from "react";
import TodoAPI from "./TodoAPI";
import ListItems from "./components/Listitems";
// import Input from "./components/Input";
import Form from "./components/Form";
import "./components/App.css";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import { store } from "react-notifications-component";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isEditForm: false,
      todo: {
        text: "",
      },
    };

    this.deleteHandler = this.deleteHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
  }

  componentDidMount() {
    TodoAPI.getTodos().then((data) => {
      this.setState({ todos: data.response });
    });
  }

  resetForm() {
    this.setState({
      todo: {
        text: "",
      },
    });
  }

  handleChange(e) {
    this.setState({
      todo: {
        ...this.state.todo,
        [e.target.name]: e.target.value,
        // text: e.target.value,
      },
    });
  }

  showEditForm(todo) {
    this.setState({
      isEditForm: true,
      todo: todo,
    });
  }

  async deleteHandler(id) {
    const deleteData = await TodoAPI.deleteTodo(id);
    const message = deleteData;
    if (message.msgError) {
      this.setState({ message });
      this.showMsg(message);
    } else {
      const data = await TodoAPI.getTodos();
      this.setState({ message, todos: data.response });
      this.showMsg(message);
    }
    this.resetForm();
  }

  async updateHandler(e) {
    e.preventDefault();
    // console.log(this.state.todo._id);
    const updateData = await TodoAPI.updateTodo(this.state.todo);
    const message = updateData;
    if (message.msgError) {
      this.setState({ message });
      this.showMsg(message);
    } else {
      const data = await TodoAPI.getTodos();
      this.setState({ message, todos: data.response });
      this.showMsg(message);
    }
    this.setState({ isEditForm: false });
    this.resetForm();
  }

  async addHandler(e) {
    e.preventDefault();

    const postData = await TodoAPI.createTodo(this.state.todo);
    const message = postData;
    if (message.msgError) {
      this.setState({ message });
      this.showMsg(message);
    } else {
      const data = await TodoAPI.getTodos();
      this.setState({ message, todos: data.response });
      this.showMsg(message);
    }
    this.resetForm();
  }

  renderForm() {
    return (
      <Form
        isEditForm={this.state.isEditForm}
        todo={this.state.todo}
        handleChange={this.handleChange}
        handler={!this.state.isEditForm ? this.addHandler : this.updateHandler}
      />
    );
  }

  showMsg(msg) {
    store.addNotification({
      title: `${"Message alert"}`,
      message: `${msg.msgBody}`,
      type: `${msg.msgError ? "warning" : "success"}`,
      container: "top-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 1500,
      },
    });
  }

  render() {
    return (
      <div className="container" id="container">
        <div className="App">
          <header>{this.renderForm()}</header>
          <ListItems
            todos={this.state.todos}
            showEditForm={this.showEditForm}
            deleteHandler={this.deleteHandler.bind(this)}
          ></ListItems>
          <ReactNotification />
        </div>
      </div>
    );
  }
}

export default App;
