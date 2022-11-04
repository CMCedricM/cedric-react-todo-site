import create from "zustand"; 
import {devtools,persist} from "zustand/middleware";



// Global State Management of to do data 
const ToDoStore = (set) => ({
  toDoInputText : '',
  toDoListData : [], //Each element will follow this format: {itemName : 'itemName', completed: false, id: uuid()};
  toDoCount : 0,
  // Variables to manage filtering
  filterType : 'none', //0 Will indicate 'All', 1 Will Indicate 'Completed', 2 Will Indicate 'Incomplete'
  filteredItems : [],
  // Variables to allow editing of a to-do-item
  updateInputText : '', 
  updateAllowed : null, //We need this cause I am not going to allow more than one item to be edited at a time
  setInputText : (inputText) => set((state) => ({toDoInputText : inputText.trim().length === 0 ? '' : inputText})),
  // Create function to add data to a to do list 
  updateToDoData : (aNewToDoItem) => set((state) => ({toDoListData : [aNewToDoItem, ...state.toDoListData], 
    filteredItems : addDataHelper(state.toDoListData, aNewToDoItem, state.filterType), 
    toDoCount : (state.toDoListData).length, toDoInputText : ''})), 
  //Handling deletion of data 
  // Create function that will clear toDoList
  removeAllItems: () => set((state) => ({toDoListData: [], filteredItems: [] , toDoCount : 0 , toDoInputText : '', filterType : 'none', updateAllowed: true} )),
  // remove a single item
  removeAnItem: (itemId) => {
    set((state) => ({
      toDoListData : state.toDoListData.filter((item) => (item.id !== itemId)), 
      filteredItems : removeAnItemHelper(state.toDoListData, state.filterType, itemId),
      toDoCount : state.toDoListData.length,
      }))
  },
  removeCurrentView: () => set((state) => ({toDoListData : state.filterType === 'none' ? [] : removeViewHelper(state.toDoListData, state.filterType), filteredItems : state.filterType !== 'none' ? filterData(state.toDoListData, state.filterType) : state.toDoListData})),
   // On update submit allow any updates
  prepareForItemUpdate: (itemID) => set((state) => ({updateAllowed : false, updateInputText: state.toDoListData.find((item) => item.id === itemID ? item : '') })),
  setUpdateItemText: (updateText) => set((state) => ({updateInputText : updateText})), 
  // Finalize update and allow new updates
  updateItemName: (itemID) => set((state) => ({toDoListData :  state.toDoListData.map((t) => t.id === itemID ? {...t, itemName : state.updateInputText} : t), 
   updateInputText: '', updateAllowed: true })),
  refreshList: () => set((state) => ({ filteredItems : state.filterType !== 'none' ? filterData(state.toDoListData, state.filterType) : state.toDoListData})),
  // Update Complete Status of an Item 
  updateCompletionStatus: (itemID) => set((state) => ({toDoListData : state.toDoListData.map((t) => t.id === itemID ? {...t, completed : !t.completed} : t ), filteredItems: updateCompletionHelper(state.toDoListData, itemID, state.filterType)})),
  updateFilterType : (filterStatus) => set((state) => ({filterType : filterStatus, filteredItems : filterStatus !== 'none' ?  filterData(state.toDoListData, filterStatus) : state.toDoListData})),
})

// This is to be called every time we add new data, this function returns a new array to the filteredItems variable, so that when I add items these new items respect the current filter
// i.e. if our current filter is filter: Complete, then we should not add the item to the current view
const addDataHelper = (data, aNewItem, filterType) => {
  let ptr = filterType !== 'none' ? filterData(data, filterType) : [aNewItem, ...data]; 
  return ptr; 
}

// This function helps with instantly updating the current view to respect the current filter, 
// i.e. if our current filter is filter: Complete, and we set an item to INcomplete, the item should be removed from view
const updateCompletionHelper = (data, itemID, filterType) => {
    let ptr = data.map((t) => t.id === itemID ? {...t, completed : !t.completed} : t); 
    ptr = filterType !== 'none' ? filterData(ptr, filterType) : ptr;  
    return ptr;
}

const removeViewHelper = (data, filterType) => {
  if (filterType === 'completed'){ return data.filter((item) => (item.completed !== true)); }
  else if(filterType === 'incomplete'){ return data.filter((item) => (item.completed !== false)); }
  return data;
}

// This is an important function as it allows me to return data to the calling var in which the data returned respects a given filter setting
const filterData = (data, filterType) => {
  console.log(filterType)
  if (filterType === 'completed'){ return data.filter((item) => (item.completed === true)); }
  else if(filterType === 'incomplete'){ return data.filter((item) => (item.completed === false)); }
  ToDoStore.refreshList();
  return data;
}

const UseToDoStore = create(devtools(persist(ToDoStore, {
  name: 'localToDoData',
})))


const removeAnItemHelper = (data, filterType, itemID) =>{
  let ptr = data.filter((t) => t.id !== itemID); 
  return filterData(ptr, filterType); 

}
  

export default UseToDoStore;