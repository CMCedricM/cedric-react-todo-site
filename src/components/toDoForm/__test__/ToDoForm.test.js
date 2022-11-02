import React from 'react';
import ToDoForm from '../ToDoForm';
import { cleanup, render, screen} from '@testing-library/react';

afterEach(cleanup);

// Test basic rendering, if the boxes elements themselves will render
it('renders input box and filter box', () => {
    render(<ToDoForm />);
    expect(getToDoInputBox()).toBeInTheDocument();
    expect(getFilterBox()).toBeInTheDocument();
  });
  


const getToDoInputBox = () => {
    return screen.getByRole('textbox');
}
const getFilterBox = () => {
    return screen.getByRole('combobox'); 
}


