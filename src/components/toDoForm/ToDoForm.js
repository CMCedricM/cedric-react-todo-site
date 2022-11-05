import React from "react";
import uuid from 'react-uuid';
import './ToDoForm.css'

// This file controls the items of the ToDoForm, which includes the add item bar, add item button, clear button, and the filter selection.
// This also structures the given to do list item so that it follows the format {itemName : str, completed: bool , id: uuid() 
const ToDoForm = ({onNewItem, setToDoText, toDoText, clearData, setFilter, filterSetting, triggerListRefresh}) =>{

    // This will format our to do item for displaying, each item will have a name, a status of whether it is complete or not, and a unique id 
    // For now we are locally saving all this data, may want to upload to a database like firebase for multi users
    /* Each item is as follow {itemName : str, completed: bool , id: uuid() } */
    const formatAndAppend = (event) => {
        event.preventDefault(); 
        if(!toDoText || toDoText === ''){return;}
        let newItem = {itemName : toDoText, completed: false, id: uuid()};
        onNewItem(newItem);
        setFilter('none');
    }

   
    // Sets the filter it the state manager, which will cause the page to show only items with a completion status that matches the 
    // filter in the dropdown.  
    const filterHanlder = (event) => {
        if(event.target.value === 'completed'){ setFilter('completed') }
        else if(event.target.value === 'incomplete') { setFilter('incomplete'); }
        else{ setFilter('none'); }
        return;
    }

    // Clears all items in the current filter view, i.e. filter is set to 'complete' 
    // when the CLEAR button is pressed it will clear all 'completed' items
    const clearViewHandler = (event) => {
        event.preventDefault();
        clearData();
        triggerListRefresh();
    }
    return(
        <div>
        <div className='todo-form'>
        <form> 
            {/* When user presses enter, return, or 'Add Item' automatically append data to their list*/}
            <input value={toDoText} onChange={(e) => setToDoText(e.target.value)} data-testid='todo-item-input-field'type= "text" className="todo-input" placeholder="Type An Item Here" name='toDoInput'/>
            {/* <button className='todo-button' type='submit'>Submit</button> */}
            {/* <button onClick={clearData} className='clear-button'>clear</button> */}
            {/* Manages the filter settings */}
            <select daa-testid='filter-label' value={filterSetting==='none' ? 'all' : filterSetting}label='Filter' onChange={filterHanlder} name='todos' className='filter-todo'> 
                <option value='all'>Filter: All</option>
                <option value='completed'>Completed</option>
                <option  value='incomplete'>Incomplete</option>
            </select>
            {/* This is where the Add Item and Clear Buttons will live in  */}
            <div className='action-area '>
            <button onClick={formatAndAppend} className='btn'>Add Item</button>
            <button onClick={clearViewHandler} className='btn'>Clear</button>
        </div>
        </form>
       
        </div>
        </div>
    );
}

export default ToDoForm; 