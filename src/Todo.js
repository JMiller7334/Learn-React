import React from "react";

export default function Todo({receivedTodo, func_update}){

    function handleUpdate(){
        func_update(receivedTodo.id)
    }

    return (
        <div>
            <label>
                {receivedTodo.name}
                <input onChange={handleUpdate} type="checkbox" checked={receivedTodo.complete}/>
            </label>
        </div>
    )
}