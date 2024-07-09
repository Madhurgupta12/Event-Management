// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-sky-600 text-white w-64 flex-shrink-0 p-4">
        <div className="font-bold text-2xl mb-4">Text Editor</div>
        <div className="space-y-4">
          <div className="p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
            <Link to="/kanban" className="block">Kanban Board</Link>
          </div>
          <div className="p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
            <Link to="/editor" className="block">Text Editor</Link>
          </div>
          <div className="p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
            <Link to="/tree" className="block">Visualization of Task</Link>
          </div>
          <div className="p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
            <Link to="/real" className="block">Collab</Link>
          </div>
          <div className="p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
            <Link to="/file" className="block">Upload Files</Link>
          </div>
          <div className="p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
            <Link to="/rem" className="block">Task Remainder </Link>
          </div>
          <div className="p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
            <Link to="/group" className="block">Group Connection</Link>
          </div>
          <div className="p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
            <Link to="/profile" className="block">Your Profile</Link>
          </div>
          
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow p-8 bg-gray-100">
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to Task Management Application</h1>
          <p className="text-xl text-gray-200">A powerful tool for editing and managing your Task with ease.</p>
        </div>

        {/* Images */}
        <div className="flex space-x-4">
          <img src="https://www.techalyst.com/storage/editor-photos/b409a555-636e-4d1b-a608-f26ac7a87ba2.jpg" alt="Text Editor 1" className="rounded shadow-md w-1/2" />
          <img src="https://www.c-sharpcorner.com/article/temp/104285/Images/textEditorUI.png" alt="Text Editor 2" className="rounded shadow-md w-1/2" />
        </div>
        <div className="flex space-x-4 mt-4">
          <img src="https://css-tricks.com/wp-content/uploads/2015/11/drag-drop-upload-1.gif" alt="Text Editor 1" className="rounded shadow-md w-1/2" />
          <img src="https://www.techalyst.com/storage/editor-photos/b409a555-636e-4d1b-a608-f26ac7a87ba2.jpg" alt="Text Editor 2" className="rounded shadow-md w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default Home;
