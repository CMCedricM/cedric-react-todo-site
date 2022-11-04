import React from "react";
import uuid from 'react-uuid';
import './ToDoForm.css'

const ToDoForm = ({onNewItem, setToDoText, toDoText, clearData, setFilter}) =>{

    // This will format our to do item for displaying, each item will have a name, a status of whether it is complete or not, and a unique id 
    // For now we are locally saving all this data, may want to upload to a database like firebase for multi users
    const formatAndAppend = (event) => {
        event.preventDefault(); 
        if(!toDoText || toDoText === ''){return;}
        let newItem = {itemName : toDoText, completed: false, id: uuid()};
        onNewItem(newItem);
    }

   
  
    const filterHanlder = (event) => {
        if(event.target.value === 'completed'){ setFilter('completed') }
        else if(event.target.value === 'incomplete') { setFilter('incomplete'); }
        else{ setFilter('none'); }
        return;
    }

    return(
        <div>
        <div className='todo-form'>
        <form> 
            {/* When user presses enter or return automatically append data to their list*/}
            <input onChange={(e) => setToDoText(e.target.value)} data-testid='todo-item-input-field'type= "text" className="todo-input" placeholder="Type An Item Here" name='toDoInput'/>
            {/* <button className='todo-button' type='submit'>Submit</button> */}
            {/* <button onClick={clearData} className='clear-button'>clear</button> */}
            <select daa-testid='filter-label' label='Filter' onChange={filterHanlder} name='todos' className='filter-todo'> 
                <option value='all'>Filter: All</option>
                <option value='completed'>Completed</option>
                <option  value='incomplete'>Incomplete</option>
            </select>
            <div className='action-area '>
            <button onClick={formatAndAppend} className='btn'>Add Item</button>
            <button onClick={clearData} className='btn'>Clear</button>
        </div>
        </form>
       
        </div>
        </div>
    );
}

export default ToDoForm; 