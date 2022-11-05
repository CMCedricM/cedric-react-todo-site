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
  /*updateInputText : '', 
  updateInProgress : false,
  updateAllowed : true, //We need this cause I am not going to allow more than one item to be edited at a time
  */
  setInputText : (inputText) => set((state) => ({toDoInputText : inputText.trim().length === 0 ? '' : inputText})),
  // Create function to add data to a to do list 
  updateToDoData : (aNewToDoItem) => set((state) => ({toDoListData : [aNewToDoItem, ...state.toDoListData], 
    filteredItems : addDataHelper(state.toDoListData, aNewToDoItem, state.filterType), 
    toDoCount : (state.toDoListData).length, toDoInputText : ''})), 
  //Handling deletion of data 
  // Create function that will clear toDoList
  removeAllItems: () => set((state) => ({toDoListData: [], filteredItems: [] , toDoCount : 0 , toDoInputText : '', filterType : 'none', /*updateAllowed: true*/} )),
  // remove a single item
  removeAnItem: (itemId) => {
    set((state) => ({
      toDoListData : state.toDoListData.filter((item) => (item.id !== itemId)), 
      filteredItems : removeAnItemHelper(state.toDoListData, state.filterType, itemId),
      toDoCount : state.toDoListData.length,
      }))
  },
  removeCurrentView: () => set((state) => ({toDoListData : state.filterType === 'none' ? [] : removeViewHelper(state.toDoListData, state.filterType), 
  filteredItems : state.filterType !== 'none' ? filterData(state.toDoListData, state.filterType) : state.toDoListData,
  filterType : state.filteredItems.length === 0 ? state.filterType : 'none'
  })),
  refreshList: () => set((state) => ({ filteredItems : state.filterType !== 'none' ? filterData(state.toDoListData, state.filterType) : state.toDoListData})),
  /*
  // Setter function to help with item name update (not implemented)
   // On update submit allow any updates
  prepareForItemUpdate: (itemID) => set((state) => ({updateAllowed : !state.updateAllowed, updateInProgress: !state.updateInProgress, updateInputText: updatePrepHelper(state.toDoListData, itemID) })),
  setUpdateItemText: (updateText) => set((state) => ({updateInputText : updateText})), 
  // Finalize update and allow new updates
  updateItemName: (itemID) => set((state) => ({toDoListData :  state.toDoListData.map((t) => t.id === itemID ? {...t, itemName : state.updateInputText} : t), 
   updateInputText: '', updateAllowed: true, updateInProgress: false })),

  */
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

// Aids with removing all items in the current filter view; i.e. if we are in the COMPLETED view
// , then we will clear all items that are marked as 'completed' and return this data without the 'completed'  items.
const removeViewHelper = (data, filterType) => {
  if (filterType === 'completed'){ return data.filter((item) => (item.completed !== true)); }
  else if(filterType === 'incomplete'){ return data.filter((item) => (item.completed !== false)); }
  return data;
}

// Helps with removing a given item from the storage list, what is returned are the 
// elements (without the deleted item) that respect the current filter setting 
const removeAnItemHelper = (data, filterType, itemID) =>{
  let ptr = data.filter((t) => t.id !== itemID); 
  return filterData(ptr, filterType); 

}

// This is an important function as it allows me to return data to the calling var in which the data returned respects a given filter setting
// in other words, ensures all items displayed respect the current filter that is set in the site
const filterData = (data, filterType) => {
  console.log(filterType)
  if (filterType === 'completed'){ return data.filter((item) => (item.completed === true)); }
  else if(filterType === 'incomplete'){ return data.filter((item) => (item.completed === false)); }
  return data;
}


// This function helps with instantly updating the current view to respect the current filter, 
// i.e. if our current filter is filter: Complete, and we set an item to INcomplete, the item should be removed from view
const updateCompletionHelper = (data, itemID, filterType) => {
  let ptr = data.map((t) => t.id === itemID ? {...t, completed : !t.completed} : t); 
  ptr = filterType !== 'none' ? filterData(ptr, filterType) : ptr;  
  return ptr;
}


// BEGIN Functions to help with editing an item (not implemented)
/*
// This function was meant to update a given item's name and append it to the toDoListData array that is displayed in the to do list
const updatePrepHelper = (data, itemID) => {
  let ptr = data.find((item) => item.id === itemID ? item : null); 
  if(!ptr) return ''; 
  return ptr.itemName;
}


// END Functions to help with editing an item (not implemented)
*/



const UseToDoStore = create(devtools(persist(ToDoStore, {
  name: 'localToDoData',
})))


export default UseToDoStore;