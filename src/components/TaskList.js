import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks" className="tasks">
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
                    <div className='title-detail'>{task.title}</div>
                    <div className='description-detail'>{task.description}</div>
                    <button onClick={() => onEdit(task.id, /* pass new title, new description */)}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(task.id)}>Delete</button>
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
