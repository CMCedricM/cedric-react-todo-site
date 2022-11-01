import './App.css';
import ToDoData from './components/ToDoList';
import ToDoForm from './components/ToDoForm';
import UseToDoStore from './stores/zustandToDoStore';


function App() {
  // Functions to Call in zustandStore
  const addToList = UseToDoStore((state) => state.updateToDoData);
  const clearData = UseToDoStore((state) => state.removeAllItems);
  const removeAnItem = UseToDoStore((state) => state.removeAnItem )
  const updateCompeletionStatus = UseToDoStore((state) => state.updateCompletionStatus);
  const updateFilterInfo = UseToDoStore((state) => state.updateFilterType); 
  // const setInputText = UseToDoStore((state) => state.setTempData);
  // State Variables
  const filteredData = UseToDoStore((state) => state.filteredItems);
  
  // useEffect(() => {console.log("hello") }, [filteredHolder] )
  return (
    <div className="App">
    <h1>Cedric's To Do Site</h1>
    <div className='input-area'>
    <ToDoForm onNewItem={addToList} clearData={clearData} setFilter={updateFilterInfo}></ToDoForm>
    <button onClick={clearData} className='clearButton'>Clear</button>
    </div>
    <ToDoData toDoItems={filteredData} removeHandler={removeAnItem} completeItemHandler={updateCompeletionStatus}></ToDoData>
    </div>
  );
}

export default App;
