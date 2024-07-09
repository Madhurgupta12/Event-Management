import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupPage = () => {
    const [view, setView] = useState('main');
    const [groupName, setGroupName] = useState('');
    const [groups, setGroups] = useState([]);
    const [groupId, setGroupId] = useState('');
    const [userId, setUserId] = useState('');
    const [createdGroupId, setCreatedGroupId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/groups')
            .then(res => {
                setGroups(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleCreateGroup = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/groups', { name: groupName })
            .then(res => {
                setCreatedGroupId(res.data._id); // Assuming the response contains the created group's ID
                alert('Group created successfully!');
                setGroupName('');
                setView('createdGroup');
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleJoinGroup = () => {
        axios.put(`http://localhost:5000/api/groups/${groupId}/addMember`, { memberId: userId })
            .then(() => {
                alert('Joined group successfully!');
                setGroupId('');
                setUserId('');
                setView('main');
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
            {view === 'main' && (
                <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Group Management</h1>
                    <button onClick={() => setView('create')} className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition duration-300 mr-4">
                        Create a Group
                    </button>
                    <button onClick={() => setView('join')} className="px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition duration-300">
                        Join a Group
                    </button>
                </div>
            )}

            {view === 'create' && (
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Create a Group</h2>
                    <form onSubmit={handleCreateGroup}>
                        <input 
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Group Name"
                            required
                            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition duration-300">
                            Create Group
                        </button>
                    </form>
                    <button onClick={() => setView('main')} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded shadow-md hover:bg-gray-600 transition duration-300">
                        Back
                    </button>
                </div>
            )}

            {view === 'join' && (
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Join a Group</h2>
                    <input
                        type="text"
                        placeholder="Enter Group ID"
                        value={groupId}
                        onChange={(e) => setGroupId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        placeholder="Enter your user ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button onClick={handleJoinGroup} className="w-full px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition duration-300">
                        Join Group
                    </button>
                    <button onClick={() => setView('main')} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded shadow-md hover:bg-gray-600 transition duration-300">
                        Back
                    </button>
                </div>
            )}

            {view === 'createdGroup' && (
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Group Created Successfully!</h2>
                    <p className="mb-4">Your Group ID is:</p>
                    <div className="p-4 bg-gray-200 rounded">{createdGroupId}</div>
                    <button onClick={() => setView('main')} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded shadow-md hover:bg-gray-600 transition duration-300">
                        Back to Main
                    </button>
                </div>
            )}
        </div>
    );
};

export default GroupPage;
