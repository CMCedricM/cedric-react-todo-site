import './App.css';
import ToDoData from './components/ToDoList';
import ToDoForm from './components/ToDoForm';
import UseToDoStore from './stores/zustandToDoStore';


function App() {
  // Functions to Call in zustandStore
  const addToList = UseToDoStore((state) => state.updateToDoData);
  const clearData = UseToDoStore((state) => state.removeAllItems);
  // Sate Variables
  const testData = UseToDoStore((state) => state.toDoListData);
 
  return (
    <div className="App">
    <h1>Cedric's To Do Site</h1>
    <div className='input-area'>
    <ToDoForm onNewItem={addToList} clearData={clearData}></ToDoForm>
    <button onClick={clearData} className='clearButton'>Clear</button>
    </div>
    <ToDoData></ToDoData>
    </div>
  );
}

export default App;
