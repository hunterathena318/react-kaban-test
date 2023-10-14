import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
const Container = styled.div`
    border: 1px solid lightgrey;
    padding:8px;
    margin-bottom:8px;
    border-radius:2px;
    background-color:${props => (props.isDragging ? '#e0ffe0' : 'white')};
    position: relative;
`

const DeleteButton = styled.div`
    position: absolute;
    top: -8px;
    right: -4px;
    background: red;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: brown;
`


function Task(props) {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    {props.task.content}
                    <DeleteButton onClick={() => props.handleDeleteTask(props.task.id, props.columnId)}>x</DeleteButton>
                </Container>
            )}
        </Draggable>
    )
}

export default Task
