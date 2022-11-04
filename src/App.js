import './App.css'
import ToDoList from './components/ToDoData/ToDoList';
import ToDoForm from './components/toDoForm/ToDoForm';
import UseToDoStore from './stores/zustandToDoStore';


function App() {
  // Functions to Call in zustandStore
  const setToDoText = UseToDoStore((state) => state.setInputText);
  const addToList = UseToDoStore((state) => state.updateToDoData);
  // const clearData = UseToDoStore((state) => state.removeAllItems);
  const clearCurrentViewData = UseToDoStore((state) => state.removeCurrentView);
  const removeAnItem = UseToDoStore((state) => state.removeAnItem )
  const updateCompeletionStatus = UseToDoStore((state) => state.updateCompletionStatus);
  const updateFilterInfo = UseToDoStore((state) => state.updateFilterType); 
  // Force a state update when different modules are updating, i.e. we press clear in the ToDoForm and we want the ToDoList to update
  const filterUpdate= UseToDoStore((state) => state.refreshList);
  // Functions will handle updating a todo-item 
  const perpareItemUpdate = UseToDoStore((state) => state.prepareForItemUpdate); 
  const setUpdateText= UseToDoStore((state) => state.setUpdateItemText); 
  const submitItemNameUpdate = UseToDoStore((state) => state.updateItemName);
  // This will be used to determine whether an update is allowd and also if one item is currently being updated
  const updateStatus = {itemUpdateAllowed : UseToDoStore((state) => state.updateAllowed), updateInProgress : UseToDoStore((state) => state.updateInProgress)}
  // Just our update text
  const updateText = UseToDoStore((state) => state.updateInputText);



  // State Variables
  const toDoText = UseToDoStore((state) => state.toDoInputText);
  const filteredData = UseToDoStore((state) => state.filteredItems);
  const filterSettting = UseToDoStore((state) => state.filterType);

  return (
    <div className="App">
      <h1>Welcome!</h1>
      <div className='input-area'>
      <ToDoForm onNewItem={addToList} setToDoText={setToDoText} clearData={clearCurrentViewData} 
      toDoText = {toDoText} setFilter={updateFilterInfo}
      filterSetting={filterSettting}
      triggerListRefresh={filterUpdate}
      ></ToDoForm>
      </div>
      <div className='todo-list-area'>
      <ToDoList toDoItems={filteredData} removeHandler={removeAnItem} completeItemHandler={updateCompeletionStatus}
      updateItemName={perpareItemUpdate} 
      setUpdateText={setUpdateText} 
      finalizeUpdate={submitItemNameUpdate}
      updateAllowed={updateStatus}
      updateInputText={updateText}
      refreshList={filterUpdate}
      />
      </div>
    </div>
  );
}

export default App;
