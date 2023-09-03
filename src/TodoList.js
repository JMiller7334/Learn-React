import React from "react";
import Todo from "./Todo";

// This file returns html to my react app.
/*This is where all the todo items are placed and returned to the react app */


export default function TodoList({ arrayTodos, func_update }) {
    console.log("List-func - recieved list:" + arrayTodos)
    return (
        arrayTodos.map(v => {
            return <Todo key={v.id} receivedTodo={v} func_update={func_update} />
        })
    );
}