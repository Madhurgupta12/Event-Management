import React, { useState } from 'react';
import dragula from 'dragula';
import 'dragula/dist/dragula.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: ["Order #1", "Order #2", "Order #3", "Order #4"],
    doing: ["Order 10", "Order 15", "Order 21", "Order 25"],
    done: ["Order 1000", "Order 500"],
    trash: ["Order #2132", "Order #222"]
  });

  const addTask = () => {
    const taskText = document.getElementById('taskText').value;
    if (taskText) {
      setTasks({
        ...tasks,
        todo: [...tasks.todo, taskText]
      });
      document.getElementById('taskText').value = '';
    }
  };

  const emptyTrash = () => {
    setTasks({
      ...tasks,
      trash: []
    });
  };

  React.useEffect(() => {
    dragula([
      document.getElementById("todo"),
      document.getElementById("doing"),
      document.getElementById("done"),
      document.getElementById("trash")
    ]);
  }, []);

  return (
    <div className=" bg-red-300  h-screen container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">KT Kanban Board</h1>
      </header>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          maxLength="12"
          id="taskText"
          placeholder="New Task..."
          onKeyDown={(e) => e.keyCode === 13 && addTask()}
          className="border p-2 rounded mr-2"
        />
        <button onClick={addTask} className="bg-yellow-400 p-2 rounded">Add New Task</button>
      </div>

      <div className="flex space-x-4">
        {["todo", "doing", "done", "trash"].map((column) => (
          <div key={column} className="w-1/4">
            <div className={`p-2 mb-4 text-center rounded ${column === "todo" ? "bg-orange-400" : column === "doing" ? "bg-blue-400" : column === "done" ? "bg-green-400" : "bg-red-400"}`}>
              <h4>{column.charAt(0).toUpperCase() + column.slice(1)}</h4>
            </div>
            <ul className="p-2 border rounded h-64 overflow-y-auto" id={column}>
              {tasks[column].map((task, index) => (
                <li key={index} className="bg-white p-2 mb-2 rounded shadow">{task}</li>
              ))}
            </ul>
            {column === "trash" && (
              <div className="text-center mt-4">
                <button onClick={emptyTrash} className="bg-red-400 p-2 rounded">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default KanbanBoard;
