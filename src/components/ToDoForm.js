import React from "react";
import uuid from 'react-uuid';

const ToDoForm = ({onNewItem, setInputText, setFilter}) =>{

    // This will format our to do item for displaying, each item will have a name, a status of whether it is complete or not, and a unique id 
    // For now we are locally saving all this data, may want to upload to a database like firebase for multi users
    const formatAndAppend = (event) => {
        event.preventDefault(); 
        if(!event.target.toDoInput.value){return;}
        let newItem = {itemName : event.target.toDoInput.value, completed: false, id: uuid()};
        // console.log(newItem);
        onNewItem(newItem);
        event.target.toDoInput.value = '';  
    }

   
  
    const filterHanlder = (event) => {
        if(event.target.value === 'completed'){ setFilter('completed') }
        else if(event.target.value === 'incomplete') { setFilter('incomplete'); }
        else{ setFilter('none'); }
        return;
    }

    return(
        <div className='todo-form'>
        <form onSubmit={formatAndAppend}> 
            {/* When user presses enter or return automatically append data to their list*/}
            <input type= "text" className="todo-input" placeholder="Type An Item Here" name='toDoInput'/>
            {/* <button className='todo-button' type='submit'>Submit</button> */}
            {/* <button onClick={clearData} className='clear-button'>clear</button> */}
            <select onChange={filterHanlder} name='todos' className='filter-todo'> 
                <option value='all'>Filter: All</option>
                <option value='completed'>Filter: Completed</option>
                <option  value='incomplete'>Filter: Incomplete</option>
            </select>
        </form>

        </div>
    );
}

export default ToDoForm; 