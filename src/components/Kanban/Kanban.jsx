import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './Kanban.scss'
import logo from "../../images/success.svg";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Task 1", image: logo,desc:'Bug ID- 2375, Project 13'  },
    "task-2": { id: "task-2", content: "Task 2", checklist: [{ text: "Item 1", checked: false }, { text: "Item 2", checked: false }] ,desc:'Bug ID- 2165, Project 14' },
    "task-3": { id: "task-3", content: "Task 3", desc:'It typically involves a clear objective, specific steps or actions to achieve that objective, and may require the use of certain tools, resources, or collaboration with others' },
    "task-4": { id: "task-4", content: "Task 4", desc:'Deliverables: Functional code with clear comments,A minimal front-end interface for testing the system,Unit tests to verify the functionality of the authentication flo' },
    "task-5": { id: "task-5", content: "Task 5", desc:'Bug ID- 2365, Project 1' },
    "task-6": { id: "task-6", content: "Task 6",desc:'Bug ID- 2885, Project 2'  },
    "task-7": { id: "task-7", content: "Task 7",desc:'Bug ID- 2965, Project 3'  },
    "task-8": { id: "task-8", content: "Task 8",desc:'Bug ID- 2315, Project 4'  },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2","task-8"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-3","task-7"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-4","task-5","task-6"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"]
};

const Kanban = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    console.log(result)
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

   
    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [updatedColumn.id]: updatedColumn,
        },
      });

      return;
    }

   
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const updatedStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(endColumn.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const updatedEndColumn = {
      ...endColumn,
      taskIds: endTaskIds,
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [updatedStartColumn.id]: updatedStartColumn,
        [updatedEndColumn.id]: updatedEndColumn,
      },
    });
  };

  const handleTaskChange = (taskId, newContent, field = 'content') => {
    console.log(data)
    const updatedTasks = { ...data.tasks };
    updatedTasks[taskId] = { ...updatedTasks[taskId], [field]: newContent };
    setData({
      ...data,
      tasks: updatedTasks,
    });
    console.log(data)
  };

  const handleTaskUpdate = (taskId, updatedTask) => {
    const updatedTasks = { ...data.tasks };
    updatedTasks[taskId] = updatedTask;
    setData({
      ...data,
      tasks: updatedTasks,
    });
  };

  const TaskWithChecklist = ({ task, onChange }) => {
    const handleCheckboxChange = (itemIndex, checked) => {
      const updatedTask = { ...task };
      updatedTask.checklist[itemIndex].checked = checked;
      onChange(task.id, updatedTask);
    };

    return (
      <div className="task">
        {task.id}
        {task.checklist && (
          <ul>
            {task.checklist.map((item, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                />
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const TaskWithImage = ({ task, onChange }) => {
    const handleChange = (e) => {
      onChange(task.id, e.target.value);
    };

    return (
      <div className="task">
        {task.id}
        {/* <textarea
          value={task.content}
          onChange={handleChange}
          placeholder="Edit task content"
        /> */}
        {task.image && <img src={task.image} alt="Task" style={{width:"30px"}}/>}
 
        <input
          type="text"
          value={task.content}
          onChange={(e) => onChange(task.id, e.target.value, 'content')}
          placeholder="Description"
        />
      </div>
    );
  };

  const EditableTask = ({ task, onChange }) => {
    const handleChange = (e) => {
      onChange(task.id, e.target.value);
    };

    return (
      <div className="task">
        <textarea
          value={task.content}
          onChange={handleChange}
          placeholder="Edit task content"
        />
      </div>
    );
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="full">
        {
          data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            return (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      border: "1px solid lightgray",
                      borderRadius: "4px",
                      width: "250px",
                      padding: "8px",
                      backgroundColor: "#f7f7f7",
                    }}
                  >
                    <h3 style={{ textAlign: "center" }}>{column.title}</h3>
                    {tasks.map((task, index) => (
                      <Draggable
                        draggableId={task.id}
                        index={index}
                        key={task.id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              padding: "8px",
                              margin: "4px 0",
                              backgroundColor: "white",
                              borderRadius: "4px",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                              ...provided.draggableProps.style,
                            }}
                          >
                
                            {task.image ? (
                              <TaskWithImage task={task} onChange={handleTaskChange} />
                            ) : task.checklist ? (
                              <TaskWithChecklist task={task} onChange={handleTaskUpdate} />
                            ) : (<>

                            <div>Task ID- {task.id}</div>
                            <br></br>
                            <div>Description- {task.desc}</div>
                            </>)}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })
        }
      </div>
    </DragDropContext>
  );
};


export default Kanban;




