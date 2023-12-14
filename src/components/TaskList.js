import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable className="tasks " droppableId="tasks" >
        {(provided) => (
          <div className='inner-tasks' {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task"
                  >

                    <div className='details'>
                      <div className='title-detail'>{task.title}</div>
                      <div className='description-detail'>{task.description}</div>    
                    </div>
                    <div className='detail-button'>
                      <div className='button-div'>
                      <button className='button' onClick={() => onEdit(task.id, task.title, task.description)}>
                        Edit
                      </button>
                      </div>
                      <div className='button-div'>
                      <button className="button" onClick={() => onDelete(task.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
