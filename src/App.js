import './App.css'
import ToDoList from './components/ToDoData/ToDoList';
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

  // Functions will handle updating a todo-item 
  const perpareItemUpdate = UseToDoStore((state) => state.prepareForItemUpdate); 
  const setUpdateText= UseToDoStore((state) => state.setUpdateItemText); 
  const submitItemNameUpdate = UseToDoStore((state) => state.updateItemName);
  const itemUpdateAllowed = UseToDoStore((state) => state.updateAllowed);
  const updateText = UseToDoStore((state) => state.updateInputText);
  const filterUpdate= UseToDoStore((state) => state.refreshList);

  // const setInputText = UseToDoStore((state) => state.setTempData);
  // State Variables
  // const testData = UseToDoStore((state) => state.toDoListData)
  const toDoText = UseToDoStore((state) => state.toDoInputText);
  const filteredData = UseToDoStore((state) => state.filteredItems);
  const filterSettting = UseToDoStore((state) => state.filterType);

  return (
    <div className="App">
      <h1>Cedric's To Do Site</h1>
      <div className='input-area'>
      <ToDoForm onNewItem={addToList} setToDoText={setToDoText} clearData={clearData} 
      toDoText = {toDoText} setFilter={updateFilterInfo}
      filterSetting={filterSettting}
      ></ToDoForm>
      </div>
      <div className='todo-list-area'>
      <ToDoList toDoItems={filteredData} removeHandler={removeAnItem} completeItemHandler={updateCompeletionStatus}
      updateItemName={perpareItemUpdate} 
      setUpdateText={setUpdateText} 
      finalizeUpdate={submitItemNameUpdate}
      updateAllowed={itemUpdateAllowed}
      updateInputText={updateText}
      refreshList={filterUpdate}
      />
      </div>
    </div>
  );
}

export default App;
