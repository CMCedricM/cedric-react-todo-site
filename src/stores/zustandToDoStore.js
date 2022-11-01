import create from "zustand"; 
import {devtools,persist} from "zustand/middleware";


// Global State Management of to do data 
const ToDoStore = (set) => ({
  toDoListData : [], //Each element will follow this format: {itemName : 'itemName', completed: false, id: uuid()};
  toDoCount : 0,
  filterType : 'none', //0 Will indicate 'All', 1 Will Indicate 'Completed', 2 Will Indicate 'Incomplete'
  filteredItems : [],
  // Create function to add data to a to do list 
  updateToDoData : (aNewToDoItem) => set((state) => ({toDoListData : [aNewToDoItem, ...state.toDoListData], filteredItems : [aNewToDoItem, ...state.toDoListData], toDoCount : (state.toDoListData).length, tempText : ''})), 
  //Handling deletion of data 
  // Create function that will clear toDoList
  removeAllItems: () => set((state) => ({toDoListData: [], filteredItems: [] , toDoCount : 0 , tempText : '', filterType : 'none'} )),
  // remove a single item
  removeAnItem: (itemId) => {
    set((state) => ({
      toDoListData : state.toDoListData.filter(
        (item) => (item.id !== itemId)),
      filteredItems : state.toDoListData.filter((item) => (item.id !== itemId)), 
      toDoCount : state.toDoListData.length
      }))
  },
  // Update Complete Status of an Item 
  updateCompletionStatus: (itemID) => set((state) => ({toDoListData : state.toDoListData.map((t) => t.id === itemID ? {...t, completed : !t.completed} : t ), filteredItems: updateCompletionHelper(state.toDoListData, itemID, state.filterType)})),
  updateFilterType : (filterStatus) => set((state) => ({filterType : filterStatus, filteredItems : filterStatus !== 'none' ?  filterData(state.toDoListData, filterStatus) : state.toDoListData})),
})



const updateCompletionHelper = (data, itemID, filterType) => {
    let ptr = data.map((t) => t.id === itemID ? {...t, completed : !t.completed} : t); 
    ptr = filterType !== 'none' ? filterData(ptr, filterType) : ptr;  
    return ptr;
}
const filterData = (data, filterType) => {
  if (filterType === 'completed'){ return data.filter((item) => (item.completed === true)); }
  else if(filterType === 'incomplete'){ return data.filter((item) => (item.completed === false)); }
  return data;
}

const UseToDoStore = create(devtools(persist(ToDoStore, {
  name: 'localToDoData',
})))

  

export default UseToDoStore;