import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2"

const Calendar = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState(new Date());

  const handleAddTask = async () => {
    const token = localStorage.getItem('jwt');
    try {
      const response = await axios.post(
        'http://localhost:4000/api/addcal',
        { name: taskName, deadline },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your Task Added   successfully.',
        confirmButtonColor: '#48BB78', // Match with Tailwind's green color
        confirmButtonText: 'OK'
      })
      console.log(response);
      setDeadline(new Date());

      // Reload the task list after task is added
      fetchTasks();
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  const fetchTasks = () => {
    fetch("http://localhost:4000/api/showcal", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTasks(result.task);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const action=(name)=>{
    const res= fetch("http://localhost:4000/api/deletecal",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({name:name})
    })
    .then(res=>res.json())
    .then(result=>{
        if(result.success)
        {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your Task Deleted   successfully.',
                confirmButtonColor: '#48BB78', // Match with Tailwind's green color
                confirmButtonText: 'OK'
              })
             window.location.reload();
        }
        else
        {
            Swal.fire({
                icon: 'failure',
                title: 'failure!',
                text: 'Error.',
                confirmButtonColor: '#48BB78', // Match with Tailwind's green color
                confirmButtonText: 'OK'
              })
              console.log(result);
              fetchTasks();
        }
       
    })
    .catch((error)=>{
        console.log(error);

    })

}

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Task List</h2>
        <ul className="list-disc pl-5">
          {tasks?.length > 0 ? (
            tasks.map((task) => (
              <li key={task._id} className="mb-2">
                <span className="font-semibold">{task.name}</span> - {new Date(task.deadline).toLocaleDateString()}
                <button onClick={() => action(task.name)} className="text-red-500 ml-2 border border-red-500 px-2 py-1 rounded">Remove</button>
              </li>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </ul>
      </div>
      <div className="w-3/4 ml-4 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
        <div className="flex flex-col md:flex-row items-center mb-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task Name"
            className="border rounded p-2 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
          />
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="border rounded p-2 mb-2 md:mb-0 md:mr-2"
          />
          <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 rounded">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
