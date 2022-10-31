import React from "react";

// This will be the html aspects of each to do item list
const ToDo = ({toDoText, toDo, removeAnItemHandler, markCompleteHandler}) => {
   
    const deleteHandler = () => {
        removeAnItemHandler(toDo.id);
    }

    const completeHandler = () => {
        markCompleteHandler(toDo.id);
    }

    return(
        <div className='todo'> 
            <li className='todo-item'>{toDoText}</li>
            <button onClick={completeHandler} className='btn'>Complete</button>
            <button onClick={deleteHandler} className = 'btn'>Delete</button>
        </div>
    );
}

export default ToDo; 