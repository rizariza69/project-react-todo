import React from "react";
import axios from "axios";

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

export class Todo extends React.Component {
  state = {
    todos: [],
    value: "tidur",
    showAll: false
  };

  getTodoList = () => {
    getTodos().then(res => {
      this.setState({
        todos: res.data.data
      });
    });
  };

  componentDidMount() {
    this.getTodoList();
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = () => {
    createdTodos(this.state.value).then(() => {
      this.setState({
        value: ""
      });

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
        <input type="submit" onClick={this.handleSubmit} />

        <div>
          <u>
            {this.state.todos.map((item, index) => {
              return (
                <li key="item.id">
                  {index + 1}. {item.content}
                </li>
              );
            })}
          </u>
        </div>
      </div>
    );
  }
}
