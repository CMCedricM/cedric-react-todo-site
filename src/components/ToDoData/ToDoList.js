import React from "react";
import ToDo from "../ToDoItem/ToDoItem";
import "./ToDoList.css"
import uuid from "react-uuid";

// This function will take all items from the toDoListData state and place them into the todo-list display

const ToDoList = ({toDoItems, removeHandler, completeItemHandler,refreshList}) =>{// updateItemName, setUpdateText, finalizeUpdate, updateAllowed, updateText, refreshList}) => {
    
    return(
        <div className='todo-container'>
            <ul className='todo-list'>
                {/* Add appropriate html and functions to each element of the toDoItems array */}
                {toDoItems.map((data) => (<ToDo toDoText={data.itemName} toDo = {data} 
                removeAnItemHandler={removeHandler} 
                completeItemHandler={completeItemHandler} 
                // updateItemName={updateItemName}
                // setUpdateText={setUpdateText}
                // finalizeUpdate={finalizeUpdate} 
                // updateAllowed={updateAllowed}
                // updateText={updateText}
                refreshList={refreshList}
                key={data.id ? data.id : uuid()}></ToDo>))}
            </ul>
        </div>
    );
}

export default ToDoList;