import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaCheck,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { CreateTask, deleteTasksById, getAllTasks, updateTasksById } from "./Api";
import { notify } from "./Utils";

function TaskManager() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copytasks, setCopyTasks] = useState([]);
  const [updatetask, setUpdateTasks] = useState(null);

  const handleTask = ()=>{
    if(updatetask && input){
      //update  api call
      console.log('update api call');
      const obj = {
        taskName: input,
        isDone: updatetask.isDone,
        _id: updatetask._id
      }
      handleUpdateItem(obj);
    }else if(updatetask === null && input ){
      //create api call
      console.log('create api call');
      handleAddTask();
    }
    setInput("");
  };

  useEffect(()=>{
    if(updatetask)
      setInput(updatetask.taskName);
  },[updatetask])

  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };

    try {
      const { success, message } = await CreateTask(obj);

      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const fetchAllTasks = async () => {
    try {
      const { data } = await getAllTasks();
      setTasks(data);
      setCopyTasks(data);
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleDeleteTasks = async (id) =>{
    try {
      const { success, message } = await deleteTasksById(id);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  }

  const handleCheckAndncheck = async (item) =>{
    const {_id, isDone, taskName} = item;
    const obj = {
      taskName,isDone: !isDone
    }
    try {
      const { success, message } = await updateTasksById(_id, obj);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  }

  const handleUpdateItem = async (item) =>{
    const {_id, isDone, taskName} = item;
    const obj = {
      taskName, isDone: isDone
    }
    try {
      const { success, message } = await updateTasksById(_id, obj);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  }

  const handleSearch = (e) =>{
    const term = e.target.value.toLowerCase();
    const oldTask = [...copytasks]
    const results = oldTask.filter((item)=> item.taskName.toLowerCase().includes(term))
    setTasks(results)
  }

  return (
    <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
      <h1 className="mb-4">Task Manager App</h1>
      {/* Inputs and Search box */}
      <div className="d-flex justify-content-between align-item-center mb-4 w-100">
        <div className="input-group flex-grow-1 me-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control me-1"
            placeholder="Add A New Task"
          />
          <button
            onClick={handleTask}
            className="btn btn-success btn-sm me-2"
          >
            <FaPlus className="m-2" />
          </button>
        </div>
        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks"
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* List of items */}
      <div className="d-flex flex-column w-100">
        {tasks.map((item) => (
          <div key={item._id} className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-item-center">
            <span className= {item.isDone ? 'text-decoration-line-through': ''}>
              {item.taskName}
            </span>
            <div className="">
              <button type="button" onClick={()=>handleCheckAndncheck(item)} className="btn btn-success btn-sm me-2">
                <FaCheck />
              </button>
              <button type="button" onClick={()=>setUpdateTasks(item)} className="btn btn-primary btn-sm me-2">
                <FaPencilAlt />
              </button>
              <button type="button" onClick={()=>{handleDeleteTasks(item._id)}} className="btn btn-danger btn-sm me-2">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default TaskManager;
