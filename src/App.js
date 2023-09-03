/**This project uses uuId librarie: npm i uuid */
// use effect is for making data persistant
/*use ref allows reference users inputs from functions.*/
import React, { useState, useRef, useEffect } from "react"; /*Use state re-renders components when they change.*/
import TodoList from "./TodoList"; //import from the TodoList.js
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

//html is declared here.

function App() {

  //declare the use state for the todos
  // first var represents all todos, the 2nd is the function called to update the todos
  // useState returns the arrays 

  //the state array and state update 
  const [state_todos, state_setTodos] = useState([])
  const todoNameRef = useRef()

  //dat loading
 useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedData != null){
      console.log("load data:" + storedData)
      state_setTodos(storedData)
    }
  },[])
  //data saving
  useEffect(() => {
    if (state_todos.length > 0){ //length check ensure that data does not overwrite with empty array.
      console.log("saved:" + state_todos)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state_todos))
    }
  }, [state_todos])

function updateCompleted(id) {
  const arrayList = [...state_todos]
  const selectedTodo = arrayList.find(v => v.id === id)

  //toggles bool value of the todo
  selectedTodo.complete = !selectedTodo.complete
  console.log("update: todo id:" + selectedTodo.id + "updated to bool: "+ selectedTodo.complete)

  //update the list
  state_setTodos(arrayList)
}

function handleClearTodo() {
  const arrayList = state_todos.filter(v => v.complete === false)
  state_setTodos(arrayList)
}


//function handles adding todos the state array
function handleAddTodo(e) {
    const enteredName = todoNameRef.current.value
    if (enteredName === '') return
    state_setTodos(prevTodos =>{

      //Below defines the basic object or class of todo
      return [...prevTodos, {id: uuidv4(), name: enteredName, complete: false}]
    })
    todoNameRef.current.value = null
  }

  return (
    // <> ... </> declares a fragment that can return multiple html elements.
    <> 
        <TodoList arrayTodos = {state_todos} func_update = {updateCompleted}/>
        <input ref={todoNameRef} type="text"></input>
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleClearTodo}>Clear Completed</button>

        <div>{state_todos.filter(v => !v.complete).length} left</div>
    </>
  );
}

export default App;
