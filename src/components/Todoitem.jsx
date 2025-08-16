import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext';
import { toast } from 'react-toastify';

function Todoitem({ todo }) {
    const [isEditable, setIsTodoEditable] = useState(false)
    const [title, setTitle] = useState(todo.title);
    const [todomsg, settodomsg] = useState(todo.todo)
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todomsg })
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

    return (
        <div className=' flex  flex-col border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black bg-[#ccbed7]' >
            <input
                type="text"
                // placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                readOnly
                // Dynamic width based on whether pasteId is present
                className=' outline-none text-2xl text-center pb-2'
            />
            <div
                className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 items-center shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
                    }`}
            >

                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={todo.completed}
                    onChange={toggleCompleted}
                />
                <textarea
                    type="text"
                    className={`border outline-none w-full bg-transparent rounded-lg ${isEditable ? "border-black/10 px-2" : "border-transparent"
                        } ${todo.completed ? "line-through" : ""}`}
                    value={todomsg}
                    onChange={(e) => settodomsg(e.target.value)}
                    readOnly={!isEditable}
                />
                {/* Edit, Save Button */}
                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                    onClick={() => {
                        if (todo.completed) return;

                        if (isEditable) {
                            editTodo();
                            toast('Update successfully..')
                        } else setIsTodoEditable((prev) => !prev);


                    }}
                    disabled={todo.completed}

                >
                    {isEditable ? "📁" : "✏️"}
                </button>
                {/* Delete Todo Button */}
                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                    onClick={() => {
                        deleteTodo(todo.id)
                        toast('Delete successfully..')
                    }}
                >
                    ❌
                </button>

            </div>
        </div>
    );
}

export default Todoitem;
