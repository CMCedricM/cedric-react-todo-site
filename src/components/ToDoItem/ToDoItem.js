import React from "react";
import './ToDoItem.css'


// This will be the html aspects of each to do item list
const ToDo = ({toDoText, toDo, removeAnItemHandler, completeItemHandler,  updateItemName, updateAllowed, setUpdateText, updateText, finalizeUpdate, refreshList}) => {
   
    const deleteHandler = (e) => { removeAnItemHandler(toDo.id);}

    const completeHandler = (event) => { completeItemHandler(toDo.id); }

    const checkItemStatus = (completionStatus) =>{
        if(completionStatus) return "Incomplete"
        else return "Complete"
    }
    

    // const updateHandler = (event) =>{ 
    //     event.preventDefault();
    //     updateItemName(toDo.id);

    // }

    // const updateFinalizer = () => {
    //     finalizeUpdate(toDo.id);
    //     refreshList();
    // }

    

    return(
        <div className='todo-item-container'> 
            <div className="todo-text">
            <li className={`todo-item${toDo.completed ? '-cross' : ''}`}>{toDoText}</li>
            {/* <input className={`update-item${updateAllowed.updateInProgress ===false && updateAllowed.itemUpdateAllowed===true ? '' : "-hidden"}`} onChange={(e) => setUpdateText(e.target.value)}></input> */}
            </div>
            <span className='button-holder'>
                <button onClick={completeHandler} className='btn-for-item'>{checkItemStatus(toDo.completed)}</button>
                <button onClick={deleteHandler}  className = 'btn-for-item'>Delete</button>
                {/* <button onClick={updateHandler} className='btn-for-item'>Edit</button> */}
            </span>
        </div>
    );
}

export default ToDo; 