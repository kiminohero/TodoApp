const requireLogin = require("../../middlewares/requireMiddleware");
const mongoose = require("mongoose");

// const User = mongoose.model("users");
const Todo = require("../../models/Todo");

module.exports = app => {
  app.get("/api/todos", requireLogin, (req, res) => {
    Todo.find({ user: req.user.id })
      .then(todos => {
        res.json(todos);
      })
      .catch(err =>
        res.status(404).json({
          nopostfound: "No Posts Found"
        })
      );
  });

  app.post("/api/todo", requireLogin, async (req, res) => {
    const todo = new Todo({
      description: req.body.description,
      created_at: Date.now(),
      user: req.user.id
    });

    const new_todo = await todo.save();
    res.json(new_todo);
  });

  app.delete("/api/todo/:id", requireLogin, (req, res) => {
    Todo.findByIdAndDelete(req.params.id).then(data => {
      res.send({
        successdelete: "Successfully deleted"
      });
    });
  });

  app.put("/api/todo/done/:id", requireLogin, async (req, res) => {
    const { striked_out } = await Todo.findById(req.params.id);
    Todo.findByIdAndUpdate(
      req.params.id,
      { striked_out: !striked_out },
      { new: true }
    ).then(todo => {
      res.send(todo);
    });
  });

  app.put("/api/todo/:id", requireLogin, (req, res) => {
    Todo.findByIdAndUpdate(
      req.params.id,
      { description: req.body.description },
      { new: true }
    ).then(todo => {
      res.send(todo);
    });
  });
};
