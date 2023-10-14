import React from 'react'
import styled from 'styled-components'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import AddIcon from './Add.svg'

const Container = styled.div`
    margin: 5px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    width:179px;
    height: 500px;
    display:flex;
    flex-direction: column;
    background-color: #F3F5F8;
`;
const Title = styled.h4`
    padding: 0 1rem;
    margin: 5px 0; 
`;

const SubTitle = styled.h6`
    padding: 0 1rem;
    margin: 1rem 0; 
`;
const TaskList = styled.div`
    padding: 5px;
    background-color: ${props => (props.isDraggingOver ? '#d5f3ff' : 'inherit')};
`;
const AddButton = styled.div`
    display: flex;
    border: none;
    background: transparent;
    justify-content: end;
    padding: 5px;
`

function Column(props) {
    const {column} = props
    return (
        <Draggable draggableId={column.id} index={props.index}>
            {(provided) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <Title {...provided.dragHandleProps}>{column.title}</Title>
                    <SubTitle>{column.subTitle}</SubTitle>
                    <Droppable droppableId={column.id} type='task'>
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {props.tasks.map((task, index) => <Task key={task.id} task={task} columnId={column.id} index={index} handleDeleteTask={props.handleDeleteTask} />)}
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                    <AddButton onClick={() => props.handleAddNewTask(column)}>
                        <img src={AddIcon} alt="" />
                    </AddButton>
                </Container>

            )}
        </Draggable>
    )
}

export default Column
