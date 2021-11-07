const express = require("express");

const app = express();
const port = 5000;
app.use(express.json());

let tasks = [
  { id: 1, taskName: "walk", isCompleted: false },
  { id: 2, taskName: "programming", isCompleted: false },
  { id: 3, taskName: "sleep", isCompleted: false },
];

app.get("/tasks", (req, res) => {
  res.status(200);
  res.json(tasks);
});

app.get("/task", (req, res) => {
  const { id, name, isCompleted } = req.query;

  if (name !== undefined && isCompleted !== undefined && id !== undefined) {
    const findTask = tasks.find((item) => {
      return (
        item.taskName === name &&
        item.isCompleted + "" === isCompleted &&
        item.id === Number(id)
      );
    });

    if (findTask) {
      res.status(200);
      res.json(findTask);
    }
  } else if (name !== undefined && isCompleted !== undefined) {
    const findTask = tasks.find((item) => {
      return item.taskName === name && item.isCompleted + "" === isCompleted;
    });
    if (findTask) {
      res.status(200);
      res.json(findTask);
    }
  } else if (name !== undefined) {
    const findTask = tasks.find((item) => {
      return item.taskName === name;
    });
    if (findTask) {
      res.status(200);
      res.json(findTask);
    }
  } else if (isCompleted !== undefined) {
    const findTask = tasks.find((item) => {
      return item.isCompleted + "" === isCompleted;
    });
    if (findTask) {
      res.status(200);
      res.json(findTask);
    }
  } else if (id !== undefined) {
    const findTask = tasks.find((item) => {
      return item.id === Number(id);
    });
    if (findTask) {
      res.status(200);
      res.json(findTask);
    }
  }
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let newTask = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== Number(id)) newTask.push(tasks[i]);
  }
  tasks = newTask;
  console.log(newTask);
  res.status(201);
  res.json(tasks);
});

app.delete("/deleteAll", (req, res) => {
  tasks.length = 0;
  res.status(201);
  res.json(tasks);
});

app.post("/create", (req, res) => {
  const { id, task, isCompleted } = req.query;
  const newIsCompleted = isCompleted === "false" ? false : true;
  tasks.push({ id, task, newIsCompleted });
  res.status(201);
  res.json(tasks);
});
app.put("/update", (req, res) => {
  const { id } = req.query;
  tasks[Number(id) - 1].isCompleted = true;
  res.status(201);
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
