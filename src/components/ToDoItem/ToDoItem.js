import React from "react";
import './ToDoItem.css'

// This will be the html aspects of each to do item list
const ToDo = ({toDoText, toDo, removeAnItemHandler, completeItemHandler,  updateItemName, updateAllowed, setUpdateText, updateText, finalizeUpdate, refreshList}) => {
   
    const deleteHandler = () => { removeAnItemHandler(toDo.id); }

    const completeHandler = (event) => { completeItemHandler(toDo.id); }

    const checkItemStatus = (completionStatus) =>{
        if(completionStatus) return "Incomplete"
        else return "Complete"
    }
    

    const updateHandler = (event) =>{ 
        event.preventDefault();
        console.log(`update ${updateAllowed}`)
        if(updateAllowed) updateItemName(toDo.id); console.log(`update ${updateAllowed}`); 
    }

    const updateFinalizer = () => {
        finalizeUpdate(toDo.id);
        refreshList();
    }

    

    return(
        <div className='todo-item-container'> 
            <div className="todo-text">
            <li className={`todo-item${toDo.completed ? '-cross' : ''}`}>{toDoText}</li>
            <div className={`update-item${updateAllowed ? '-show' : ''}`}>
            <input value={updateText} onChange={(e) => setUpdateText(e.target.value)}></input>
            <button className='btn' onClick={updateFinalizer}>Done</button>
            </div>
            </div>
            <span className='button-holder'>
                <button onClick={completeHandler} className='btn'>{checkItemStatus(toDo.completed)}</button>
                <button onClick={deleteHandler}  className = 'btn'>Delete</button>
                {/* <button onClick={updateHandler} className='btn'>Edit</button> */}
            </span>
        </div>
    );
}

export default ToDo; 