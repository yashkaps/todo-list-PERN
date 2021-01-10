const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());


// ROUTES

// create a todo
app.post("/todos", async(req,res) => {
  try {

    const {description} = req.body;
    const new_todo = await pool.query("insert into todo (description) values ($1) returning *", [description]);

    res.json(new_todo.rows[0]);

  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get("/todos", async(req,res) => {
  try {
    const all_todos = await pool.query("select * from todo");

    res.json(all_todos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get("/todos/:id", async(req,res) => {
  try {
    const {id} = req.params;
    const td = await pool.query("select * from todo where todo_id = $1", [id]);

    res.json(td.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put("/todos/:id", async(req,res) => {
  try {
    const {id} = req.params;
    const {description} = req.body;
    const update_todo = await pool.query("update todo set description = $1 where todo_id = $2", [description, id])

    res.json("todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/todos/:id", async(req,res) => {
  const {id} = req.params;
  const delete_todo = await pool.query("delete from todo where todo_id = $1", [id]);

  res.json("todo was deleted!");
})


app.listen(5000, () => {
  console.log("server has started on port 5000");
});
