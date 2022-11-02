import { render, screen, within , cleanup} from '@testing-library/react';
import App from './App';
import user from '@testing-library/user-event'
import renderer from "react-test-renderer"


afterEach(cleanup);

// Watch that I didn't accidently delete any important components from the code
it('matches snapshot', () => {
  const tree = renderer.create(<App></App>).toJSON();
  expect(tree).toMatchSnapshot();

})

// Test Whether The Webpage itself loaded or not
it('renders header', () => {
  render(<App />)
  const linkElement = screen.getByText(/Cedric's To Do Site/i);
  expect(linkElement).toBeInTheDocument();
});

// Test whether the boxes can take input
it('adds data to form, changes filters, and then clears', () => {
  render(<App />)
  user.type(getToDoInputBox(), 'Feed Dog');
  const dropdown = getFilterBox(); 
  user.selectOptions(dropdown, within(dropdown).getByRole('option', {name : 'Completed'}));
  expect(getClearButton()).toBeInTheDocument();
  user.click(getClearButton());
});


const getToDoInputBox = () => {
  return screen.getByRole('textbox');
}

const getFilterBox = () => {
  return screen.getByRole('combobox'); 
}

const getClearButton = () => {
  return screen.getByRole('button', {
      name: /clear/i
    });
}