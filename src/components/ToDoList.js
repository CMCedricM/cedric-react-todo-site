import React from "react";
import ToDo from "./ToDo";
const ToDoData = ({toDoItems, removeHandler, completeStatusHandler}) => {
    return(
        <div className='todo-container'>
            <ul className='todo-list'>
                {toDoItems.map((data) => (<ToDo toDoText={data.itemName} toDo = {data} removeAnItemHandler={removeHandler} markCompleteHandler={completeStatusHandler} key={data.id}></ToDo>))}
            </ul>
        </div>
    );
}

export default ToDoData;