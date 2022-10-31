import create from "zustand"; 
import {devtools,persist} from "zustand/middleware";


// Global State Management of to do data 
const ToDoStore = (set) => ({
  toDoListData : [],
  toDoCount : 0,
  // Create function to add data to a to do list 
  updateToDoData : (aNewToDoItem) => set((state) => ({toDoListData : [aNewToDoItem, ...state.toDoListData], toDoCount : (state.toDoListData).length, tempText : ''})), 
  //Handling deletion of data 
  // Create function that will clear toDoList
  removeAllItems: () => set((state) => ({toDoListData: [], toDoCount : 0 , tempText : ''} )),
  // remove a single item
  removeAnItem: (itemId) => {
    set((state) => ({
      toDoListData : state.toDoListData.filter(
        (item) => (item.id !== itemId)),
      toDoCount : state.toDoListData.length
      }))
  },
  // Update Complete Status of an Item 
  updateCompletionStatus: (itemID) => set((state) => ({toDoListData : modifyAnItem(state.toDoListData, itemID)})),
})

// Helper function to set the completion of an existing item => To Be called in the completeAnItem from zustand store
const modifyAnItem = (data, itemID) => {
 let ptr = data.find((item) => (item.id === itemID))
 ptr.completed = !ptr.completed; 
 return data;
}


const UseToDoStore = create(devtools(persist(ToDoStore, {
  name: 'localToDoData',
})))

  

export default UseToDoStore;