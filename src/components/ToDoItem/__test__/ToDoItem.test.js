import React from 'react';
import ToDoItem from '../ToDoItem';
import user from '@testing-library/user-event'
import { cleanup, render, screen} from '@testing-library/react';

afterEach(cleanup); 

const testItem = {itemName : 'Feed The Dog', completed: false, id: 12345678, deleted:false }
const testCompleteHandler = (itemID) =>{testItem.deleted = !testItem.deleted; }
const testRemoveAnItemHandler = (itemID) => { !testItem.deleted ? testItem.deleted = !testItem.deleted : testItem.deleted = true; }

it('renders the created todo-item', () => {
    render(<ToDoItem toDoText={testItem.itemName} toDo={testItem} removeAnItemHandler = {testItem.deleted=!testItem.deleted} completeItemHandler={testItem.completed = !testItem.completed}></ToDoItem>)
    expect(getCompleteButton()).toBeInTheDocument(); 
    expect(getDeletionButton()).toBeInTheDocument();
    expect(getTextHolder()).toBeInTheDocument();
})

it('buttons are active', () => {
    render(<ToDoItem toDoText={testItem.itemName} toDo={testItem} removeAnItemHandler = {testRemoveAnItemHandler} completeItemHandler={testCompleteHandler}></ToDoItem>)
    user.click(getCompleteButton());
    user.click(getDeletionButton());
})



const getTextHolder = () => {
    return screen.getByRole('listitem');
}

const getCompleteButton = () => {
     return screen.getByRole('button', {
        name: /complete/i
      })
}

const getDeletionButton = () => {
    return screen.getByRole('button', {
        name: /delete/i
      });
}
