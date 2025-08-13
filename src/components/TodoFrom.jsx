import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { toast } from 'react-toastify';
function TodoForm() {

    const [todo, setTodo] = useState("")
    const [title, settitle] = useState('')
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()

        if (!todo && !title) return

        addTodo({ todo, title, completed: false })
        setTodo("")
        settitle('')


    }

    return (
        <form onSubmit={add} className="flex flex-col gap-4 items-center ">
            <input
                type="text"
                placeholder="Title..."
                className="w-full border border-black/10 rounded-lg text-start mx-auto px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={title}
                onChange={(e)=>settitle(e.target.value)}
            />
            <textarea
                type="title"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-lg h-55 px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" 
            onClick={()=>{
                toast(` ${title} add successfully`)
            }}
            className="rounded-lg px-3 py-1 bg-green-600 w-25  text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

