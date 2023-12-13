import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TaskList from './components/TaskList';

import './App.css';



const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addTask = (title, description) => {
    const newTask = {
      id: new Date().getTime(),
      title,
      description,
    };

    setTasks([...tasks, newTask]);
  };

  const editTask = (id, newTitle, newDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle, description: newDescription } : task
    );

    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);

    setTasks(updatedTasks);
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const dayArray = days.map((day)=> {
    return (
      <div 
        className='day-div' 
        key ={day} onClick = {()=>onDaySelect(day)}>{day}
      </div>
    );
  });

  const onDaySelect = (day) => {
    console.log(day);

  };

  const filterTasksByDate = () => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return (
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };

  return (
    <div className="app center">
      
        <div className="input-container ">
          <div className='row'>
            <div className='title-div'>
            <input
              type="text"
              placeholder="Title"
              className='title'
              // Add logic to handle title input
            />
            </div>
            <div className='date-div'>
              <DatePicker className='date' selected={selectedDate} onChange={handleDateChange} minDate={new Date()} />
            </div>
          </div>
          <div className='row'>
            <div className='description-div'>
              <input
                type="text"
                placeholder="Description"
                className='description'
                // Add logic to handle description input
              />
            </div>
            <div className='save-div'>
              <button className="save-button" onClick={() => addTask(/* pass title and description */)}>Save</button>
            </div>
          </div>
        </div>

      <div className='days-div'>
        {dayArray}
      </div>
      <TaskList
        tasks={filterTasksByDate()}
        onEdit={editTask}
        onDelete={deleteTask}
        onDragEnd={onDragEnd}
      />
    </div>
  );
};

export default App;
