import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

const TaskListWithReminder = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        fetch("http://localhost:4000/api/showcal", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setTasks(result.task);
            })
            .catch((err) => {
                console.error("Error fetching tasks:", err);
            });
    };

    const handleSetReminder = (id) => {
        if (!selectedDate) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a date and time for the reminder!',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
            return;
        }

        fetch("http://localhost:4000/api/rem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({ id: id, date: selectedDate }),
        })
            .then((res) => res.json())
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your reminder was added successfully.',
                    confirmButtonColor: '#48BB78', // Match with Tailwind's green color
                    confirmButtonText: 'OK',
                });

                console.log(result);
                setSelectedDate(null); // Reset the date picker after setting the reminder
            })
            .catch((err) => {
                console.error("Error setting reminder:", err);
            });
    };

    return (
        <div className="min-h-screen bg-red-300 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center my-8">Task List with Reminders</h1>
            {tasks.map((task) => (
                <div key={task._id} className="bg-white shadow-md rounded-lg p-6 mb-4 w-full md:w-1/2 lg:w-1/3">
                    <h3 className="text-xl font-bold mb-2">{task.name}</h3>
                    <p className="text-gray-700 mb-4">{task.deadline}</p>

                    <DatePicker
                        selected={selectedTaskId === task._id ? selectedDate : null}
                        onChange={(date) => {
                            setSelectedTaskId(task._id);
                            setSelectedDate(date);
                        }}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                    />
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        onClick={() => handleSetReminder(task._id)}
                    >
                        Set Reminder
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TaskListWithReminder;
