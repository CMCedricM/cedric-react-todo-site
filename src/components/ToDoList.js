import React from "react";
import ToDo from "./ToDo";
import uuid from "react-uuid";
const ToDoData = ({toDoItems, removeHandler, completeItemHandler}) => {
    return(
        <div className='todo-container'>
            <ul className='todo-list'>
                {toDoItems.map((data) => (<ToDo toDoText={data.itemName} toDo = {data} removeAnItemHandler={removeHandler} completeItemHandler={completeItemHandler} key={data.id ? data.id : uuid()}></ToDo>))}
            </ul>
        </div>
    );
}

export default ToDoData;