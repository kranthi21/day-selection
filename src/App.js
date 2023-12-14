import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TaskList from './components/TaskList';

import './App.css';

const initalState = {
  title : '',
  description : '',
  selectedDate : new Date(),
  day: '',
  tasks: [],
  selectedDay : 'all',
};

const days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


class App extends Component{
  constructor(){
    super();
    this.state = initalState;
  }
  
  handleDateChange = (date) => {
    this.setState({selectedDate : date});
    const dt = new Date(date);
    const dayIndex = dt.getDay();
    const dayName = days[dayIndex];
    this.setState({day:dayName});
  };

  addTask = () => {
    const { title, description, selectedDate, day } = this.state;

    if(!title || !selectedDate){
      alert("Enter required fields");
    }
    else{
      const newTask = {
        id: new Date().getTime(),
        title,
        description,
        selectedDate,
        day
      };

      this.setState((prevState) => ({
        tasks: [...prevState.tasks, newTask],
        title: '',
        description: '',
      }));
    }
  };

  editTask = (id, newTitle, newDescription) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, description: newDescription } : task
      ),
    }));
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...this.state.tasks];
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);

    this.setState({ tasks: updatedTasks });
  };

  filterTasksByDay = () => {
    const { tasks, selectedDay } = this.state;
    if(selectedDay === "all"){
      return tasks;
    }
    return tasks.filter((task) => task.day === selectedDay);
  };

 onDaySelect = (day) => {
  console.log(day);
  this.setState({selectedDay: day});

};
  
  render(){
    const {title, description, selectedDate} = this.state;
    
    const dayArray = days.map((day)=> {
      return (
        <div 
          className='day-div' 
          key ={day} onClick = {()=>this.onDaySelect(day)}>{day}
        </div>
      );
    });
    return(
      <div className="app center">
      
        <div className="input-container ">
          <div className='row'>
            <div className='title-div'>
            <input
              type="text"
              placeholder="Title"
              className='title'
              onChange={(e) => this.setState({title: e.target.value})}
            />
            </div>
            <div className='date-div'>
              <DatePicker 
                className='date' 
                selected={selectedDate} 
                onChange={this.handleDateChange} 
                minDate={new Date()} />
            </div>
          </div>
          <div className='row'>
            <div className='description-div'>
              <input
                type="text"
                placeholder="Description"
                className='description'
                onChange={(e) => this.setState({description: e.target.value})}
              />
            </div>
            <div className='save-div'>
              <button className="save-button" onClick={this.addTask}>Save</button>
            </div>
          </div>
        </div>

      <div className='days-div'>
        {dayArray}
        <div className='all-div'>
        <a  onClick={(e)=>this.setState({selectedDay : 'all'})}>ALL</a>
        </div>
      </div>
      <TaskList
        tasks={this.filterTasksByDay()}
        onEdit={this.editTask}
        onDelete={this.deleteTask}
        onDragEnd={this.onDragEnd}
      />
    </div>
    );
  }
}


export default App;
