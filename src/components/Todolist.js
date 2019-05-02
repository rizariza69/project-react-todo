import React from "react";
import axios from "axios";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

//API server connect for Show All
const getTodos = () => {
  return axios.get(
    "https://us-central1-coba-23d3c.cloudfunctions.net/v1/todos"
  );
};

//API Sserver connect for CREATE ==> create todo, take body ("content: <param>"")
const createdTodos = todo => {
  return axios.post(
    "https://us-central1-coba-23d3c.cloudfunctions.net/v1/todos",
    {
      content: todo
    }
  );
};

// API Updates connect server
const updatesTodos = (id, content) => {
  return axios.put(
    `https://us-central1-coba-23d3c.cloudfunctions.net/v1/todos/?id=${id}`,
    {
      content
    }
  );
};

//API delete todos connect server use ?id={id}
const deleteTodos = id => {
  return axios.delete(
    `https://us-central1-coba-23d3c.cloudfunctions.net/v1/todos?id=${id}`
  );
};

export class Todo extends React.Component {
  state = {
    todos: [],
    value: "",
    showAll: false,
    modal: false,
    isUpdate: false,
    id: ""
  };

  getTodoList = () => {
    getTodos().then(res => {
      this.setState({
        //res from data on server and data from todos (res.data.data)
        todos: res.data.data
      });
    });
  };

  componentDidMount() {
    //ambil data dari getTodoList, maka menggunakan this.
    this.getTodoList();
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = () => {
    if (this.state.isUpdate) {
      updatesTodos(this.state.id, this.state.value).then(() => {
        alert("Sukses Bos");

        this.setState({
          value: "",
          isUpdate: false
        });

        this.getTodoList();
      });
    } else {
      createdTodos(this.state.value).then(() => {
        this.setState({
          value: ""
        });

        this.getTodoList();
      });
    }
  };

  handleUpdate = index => {
    const selected = this.state.todos[index];
    this.setState({
      value: selected.content,
      isUpdate: true,
      id: selected.id
    });
  };

  //for delete handle
  handleDelete = id => {
    deleteTodos(id).then(() => {
      //after that prnt get all a todo list
      this.getTodoList();
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>
          {this.state.isUpdate ? "Update" : "Submit"}
        </button>

        <div>
          <u>
            {this.state.todos.map((item, index) => {
              return (
                <li key={item.id}>
                  {index + 1}. {item.content}
                  <button onClick={() => this.handleUpdate(index)}>
                    UPDATE
                  </button>{" "}
                  |
                  <button
                    color="denger"
                    onClick={() => this.handleDelete(item.id)}
                  >
                    {/* use arrow funtion with params */}
                    DELETE
                  </button>
                </li>
              );
            })}
          </u>
        </div>
        {/* <div>
          <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>
                Do Something
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div> */}
      </div>
    );
  }
}
