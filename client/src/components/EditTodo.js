import React, {Fragment, useState} from "react";

const EditTodo = ({ todo }) => {

  const [description, set_description] = useState(todo.description);

  const update_description = async (e) => {
    e.preventDefault()
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos/" + todo.todo_id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      {/* Button to Open the Modal */}
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#id" + todo.todo_id}>
        Edit
      </button>

      {/* The Modal */}
      <div className="modal" id={"id" + todo.todo_id} onClick={() => set_description(todo.description)}>
        <div className="modal-dialog">
          <div className="modal-content">

            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={() => set_description(todo.description)}>&times;</button>
            </div>

            {/* Modal body */}
            <div className="modal-body">
              <input type="text" className="form-control" value={description} onChange={e => set_description(e.target.value)} />
            </div>

            {/* Modal footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => update_description(e)}>Edit</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => set_description(todo.description)}>Close</button>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
