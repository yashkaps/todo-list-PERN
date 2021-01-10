import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {

  const [todos, set_todos] = useState([]);

  // delete todo
  const delete_todo = async(id) => {
    try {
      const del = await fetch("http://localhost:5000/todos/" + id, {
        method: "DELETE"
      });

      // console.log(del);
      set_todos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const get_todos = async() => {
    try {

      const response = await fetch("http://localhost:5000/todos");
      const json_data = await response.json();

      // console.log(json_data);
      set_todos(json_data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    get_todos();
  }, []);

  console.log(todos)

  return (
    <Fragment>
    <table className="table mt-5 text-center">
      <thead>
        <tr>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {/* <tr>
          <td>John</td>
          <td>Doe</td>
          <td>john@example.com</td>
        </tr> */}
        {todos.map(todo => (
          <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td><EditTodo todo={todo}/></td>
            <td><button className="btn btn-danger" onClick={() => delete_todo(todo.todo_id)}>Delete</button></td>
          </tr>
        ))}

      </tbody>
    </table>
    </Fragment>
  );
};

export default ListTodos;
