import React, { useState } from "react";
import styled from "styled-components";
import dataset from "./dataset";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Container = styled.div`
    display : flex;
`;

const App = () => {
  const [data, setData] = useState(dataset);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  const handleAddNewTask = (column) => {
    const keyNewTask = `task-${Object.keys(data.tasks).length + 1}`;
    const content = {
      id: keyNewTask,
      content: `Content for ${keyNewTask}`,
    };
    const newData = { ...data };
    newData.tasks[keyNewTask] = content;
    // eslint-disable-next-line no-unused-expressions
    newData.columns[`${column.id}`].taskIds.push(keyNewTask);
    console.log(newData);
    setData(newData);
  };


  const handleDeleteTask = (taskId, columnId) => {
    const newData = { ...data };
    delete newData.tasks[taskId];
    const updateTask = newData.columns[columnId].taskIds.filter(f => f !== taskId);
    newData.columns[columnId].taskIds = updateTask
    console.log(newData)
    setData(newData)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.columnOrder.map((id, index) => {
              const column = data.columns[id];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                  handleAddNewTask={() => handleAddNewTask(column)}
                  handleDeleteTask={handleDeleteTask}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
