import React from "react";
import ToDo from "../ToDoItem/ToDoItem";
import "./ToDoList.css"
import uuid from "react-uuid";
const ToDoList = ({toDoItems, removeHandler, completeItemHandler, updateItemName, setUpdateText, finalizeUpdate, updateAllowed, updateText, refreshList}) => {
    return(
        <div className='todo-container'>
            <ul className='todo-list'>
                {toDoItems.map((data) => (<ToDo toDoText={data.itemName} toDo = {data} 
                removeAnItemHandler={removeHandler} 
                completeItemHandler={completeItemHandler} 
                updateItemName={updateItemName}
                setUpdateText={setUpdateText}
                finalizeUpdate={finalizeUpdate} 
                updateAllowed={updateAllowed}
                updateText={updateText}
                refreshList={refreshList}
                key={data.id ? data.id : uuid()}></ToDo>))}
            </ul>
        </div>
    );
}

export default ToDoList;