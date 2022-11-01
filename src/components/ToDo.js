import React from "react";
import UseToDoStore from "../stores/zustandToDoStore";

// This will be the html aspects of each to do item list
const ToDo = ({toDoText, toDo, removeAnItemHandler, completeItemHandler}) => {
   

    const deleteHandler = () => {
        removeAnItemHandler(toDo.id);
    }

    const completeHandler = (event) => {
        // markCompleteHandler(toDo.id);
        completeItemHandler(toDo.id);
        
       
    }

   
    return(
        <div className='todo'> 
            <li className={`todo-item${toDo.completed ? '-cross' : ''}`}>{toDoText}</li>
            <button onClick={completeHandler} className='btn'>Complete</button>
            <button onClick={deleteHandler} className = 'btn'>Delete</button>
        </div>
    );
}

export default ToDo; 