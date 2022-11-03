import React from "react";
import './ToDoItem.css'

// This will be the html aspects of each to do item list
const ToDo = ({toDoText, toDo, removeAnItemHandler, completeItemHandler}) => {
   

    const deleteHandler = () => {
        removeAnItemHandler(toDo.id);
    }

    const completeHandler = (event) => {
        // markCompleteHandler(toDo.id);
        completeItemHandler(toDo.id);
        
       
    }

    const checkItemStatus = (completionStatus) =>{
        if(completionStatus) return "Incomplete"
        else return "Complete"
    }
    
    return(
        <div className='todo-item-container'> 
            <li className={`todo-item${toDo.completed ? '-cross' : ''}`}>{toDoText}</li>
            <span className='button-holder'>
            <button onClick={completeHandler} style={{ marginLeft: 0}}className='btn'>{checkItemStatus(toDo.completed)}</button>
            <button onClick={deleteHandler} style={{ marginRight: 0}} className = 'btn'>Delete</button>
            </span>
        </div>
    );
}

export default ToDo; 