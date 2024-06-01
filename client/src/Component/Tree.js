import React, { useState } from 'react';
import { Tree } from 'react-d3-tree';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const TaskManagement = () => {
  const [treeData, setTreeData] = useState({
    name: 'Task 1',
    children: [],
  });
  const [newTaskName, setNewTaskName] = useState('');
  const [parentNode, setParentNode] = useState(null);

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      const newNode = { name: newTaskName, children: [] };
      if (!parentNode) {
        // If no parent node is selected, add the new node to the root
        setTreeData((prevTreeData) => ({
          ...prevTreeData,
          children: [...prevTreeData.children, newNode],
        }));
      } else {
        // If a parent node is selected, add the new node as a child of the selected parent node
        const updatedTreeData = { ...treeData };

        // Find the selected parent node in the tree data
        const findAndAddNode = (node) => {
          if (node.name === parentNode.name) {
            // Add the new node as a child of the selected parent node
            node.children.push(newNode);
            return true; // Indicate that the node was found and modified
          } else if (node.children) {
            // Recursively search through children nodes
            for (let child of node.children) {
              if (findAndAddNode(child)) {
                return true; // Stop searching if the node was found and modified
              }
            }
          }
          return false; // Indicate that the node was not found
        };

        // Call the recursive function to find and add the node
        findAndAddNode(updatedTreeData);

        // Update the state with the modified tree data
        setTreeData(updatedTreeData);
      }
      setNewTaskName('');
    }
  };

  const handleParentNodeChange = (event) => {
    const selectedNodeName = event.target.value;
    const selectedNode = findNode(treeData, selectedNodeName);
    setParentNode(selectedNode);
  };

  const findNode = (node, nodeName) => {
    if (node.name === nodeName) {
      return node;
    }
    if (node.children) {
      for (let child of node.children) {
        const result = findNode(child, nodeName);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const generateNodeOptions = (node) => {
    const options = [];
    const generateOptions = (node, depth) => {
      options.push(
        <option key={node.name} value={node.name}>
          {node.name}
        </option>
      );
      if (node.children) {
        node.children.forEach((child) => {
          generateOptions(child, depth + 1);
        });
      }
    };
    generateOptions(node, 0);
    return options;
  };

  const handleDownloadTree = () => {
    const input = document.getElementById('tree-container');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save('tree.pdf');
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl px-4 py-8 bg-white shadow-lg rounded-lg">
        <div className="mb-6">
          <div className="text-xl font-semibold text-center text-gray-800">
            Task Management
          </div>
          <input
            type="text"
            placeholder="Enter task name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <select
            onChange={handleParentNodeChange}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Parent Node</option>
            {generateNodeOptions(treeData)}
          </select>
          <button
            onClick={handleAddTask}
            className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
          >
            Add Task
          </button>
          <button
            onClick={handleDownloadTree}
            className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none hover:bg-green-600"
          >
            Download Tree as PDF (Image)
          </button>
        </div>
        <div id="tree-container" style={{ width: '100%', height: '400px' }}>
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: 150, y: 50 }}
            separation={{ siblings: 1, nonSiblings: 2 }}
            nodeSize={{ x: 200, y: 100 }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
