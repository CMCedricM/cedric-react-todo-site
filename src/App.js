import './App.css'
import ToDoData from './components/ToDoData/ToDoList';
import ToDoForm from './components/toDoForm/ToDoForm';
import UseToDoStore from './stores/zustandToDoStore';


function App() {
  // Functions to Call in zustandStore
  const setToDoText = UseToDoStore((state) => state.setInputText);
  const addToList = UseToDoStore((state) => state.updateToDoData);
  const clearData = UseToDoStore((state) => state.removeAllItems);
  const removeAnItem = UseToDoStore((state) => state.removeAnItem )
  const updateCompeletionStatus = UseToDoStore((state) => state.updateCompletionStatus);
  const updateFilterInfo = UseToDoStore((state) => state.updateFilterType); 
  // const setInputText = UseToDoStore((state) => state.setTempData);
  // State Variables
  // const testData = UseToDoStore((state) => state.toDoListData)
  const toDoText = UseToDoStore((state) => state.toDoInputText)
  const filteredData = UseToDoStore((state) => state.filteredItems);


  return (
    <div className="App">
      <h1>Cedric's To Do Site</h1>
      <div className='input-area'>
      <ToDoForm onNewItem={addToList} setToDoText={setToDoText} clearData={clearData} toDoText = {toDoText} setFilter={updateFilterInfo}></ToDoForm>
      </div>
      <div className='todo-list-area'>
      <ToDoData toDoItems={filteredData} removeHandler={removeAnItem} completeItemHandler={updateCompeletionStatus}></ToDoData>
      </div>
    </div>
  );
}

export default App;
