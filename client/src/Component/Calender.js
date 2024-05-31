import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';

const Calendar = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/show')
            .then(response => setTasks(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleDateClick = (info) => {
        const title = prompt('Enter task title:');
        const description = prompt('Enter task description:');
        const deadline = info.dateStr;

        if (title) {
            const newTask = { title, description, deadline };
            axios.post('http://localhost:3000/tasks', newTask)
                .then(response => setTasks([...tasks, response.data]))
                .catch(error => console.log(error));
        }
    };

    const events = tasks.map(task => ({
        title: task.title,
        start: task.deadline,
        id: task._id,
        description: task.description
    }));

    const handleEventClick = (info) => {
        const task = tasks.find(task => task._id === info.event.id);
        if (task) {
            const updatedTitle = prompt('Edit task title:', task.title);
            const updatedDescription = prompt('Edit task description:', task.description);
            if (updatedTitle) {
                const updatedTask = { ...task, title: updatedTitle, description: updatedDescription };
                axios.put(`http://localhost:3000/tasks/${task._id}`, updatedTask)
                    .then(response => setTasks(tasks.map(t => t._id === task._id ? response.data : t)))
                    .catch(error => console.log(error));
            }
        }
    };

    return (
        <div>
            <FullCalendar
                id="calendar"
                defaultView="month"
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
            />
        </div>
    );
};

export default Calendar;
