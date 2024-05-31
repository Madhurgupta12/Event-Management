// src/TaskManagement.js

import React, { useState } from 'react';
import { Tree } from 'react-d3-tree';

const TaskManagement = () => {
  const initialData = {
    name: 'Task 1',
    children: [
      { name: 'Task 2' },
      { name: 'Task 3', children: [{ name: 'Task 4' }] },
      { name: 'Task 5',children: [{ name: 'Task 6' }]},
    ],
  };

  const [data, setData] = useState(initialData);
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      const newData = { ...data };
      const selectedNodeCopy = selectedNode ? { ...selectedNode } : newData;
      if (!selectedNodeCopy.children) selectedNodeCopy.children = [];
      selectedNodeCopy.children.push({ name: newTaskName });
      setData(newData);
      setNewTaskName('');
    }
  };

  const handleEditTask = () => {
    if (selectedNode && newTaskName.trim() !== '') {
      const newData = { ...data };
      selectedNode.name = newTaskName;
      setData(newData);
      setNewTaskName('');
    }
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setNewTaskName(node.name);
  };

  return (
    <div  className="h-screen bg-red-200">
        <div className="flex justify-center text-3xl">Dependency Tree</div>
      <div  style={{ width: '100%', height: '600px' }}>
        <Tree
          data={data}
          orientation="vertical"
          translate={{ x: 300, y: 50 }}
          separation={{ siblings: 1, nonSiblings: 2 }}
          onClick={handleNodeClick}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter task name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
        <button onClick={handleEditTask}>Edit Task</button>
      </div>
    </div>
  );
};

export default TaskManagement;
