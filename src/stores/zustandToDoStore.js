import create from "zustand"; 
import {devtools,persist} from "zustand/middleware";


// Global State Management of to do data 
const ToDoStore = (set) => ({
  toDoListData : [{}],
  tempText : '',
  toDoCount : 0, 
  // Create function to add data to a to do list 
  updateToDoData : (aNewToDoItem) => set((state) => ({toDoListData : [aNewToDoItem, ...state.toDoListData], toDoCount : (state.toDoListData).length, tempText : ''})), 
  // Create function that will clear toDoList
  removeAllItems: () => set((state) => ({toDoListData: [], toDoCount : 0 , tempText : ''} )),
  // remove a single item
  removeAnItem: (itemId) => {
    set((state) => ({
      toDoListData : state.toDoListData.filter(
        (itemIDNo) => (itemIDNo.id !== itemId))
      }))
  }

})

const UseToDoStore = create(devtools(persist(ToDoStore, {
  name: 'localToDoData',
})))

  

export default UseToDoStore;