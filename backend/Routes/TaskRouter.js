const router = require('express').Router();
const {createTask, FetchAlltask, UpdateTasksById, DeleteTasksById} = require('../Controllers/TaskController')

//to get all the tasks
router.get("/", FetchAlltask)

// to create tasks
router.post("/", createTask);

// to update tasks
router.put("/:id", UpdateTasksById);

// to delete tasks
router.delete("/:id", DeleteTasksById);

module.exports = router;