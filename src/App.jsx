import { useEffect, useState } from 'react'
import { Todoprovider } from './context/index'
import './App.css'
import TodoForm from './components/TodoFrom'
import Todoitem from './components/Todoitem'

function App() {

  const [todos, settodos] = useState([])

  const addTodo = (todo,todotitle) => {
    settodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

   
      const [currentDateTime, setCurrentDateTime] = useState(new Date());

      useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
      }, []);


  const updateTodo = (id, todo) => {
    settodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo)))
  }
  const deleteTodo = (id) => {
    settodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    settodos((prev) =>
      prev.map((prevtodo) =>
        prevtodo.id === id ?
          { ...prevtodo, completed: !prevtodo.completed } : prevtodo))

    console.log(id)
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length > 0) {
      settodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (

    <Todoprovider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <div className='flex justify-around '> 
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>

          <h1 
          // onChange={time}
          className='text-2xl rounded-2xl font-bold text-center mb-8 mt-2'>{currentDateTime.toLocaleTimeString()}</h1></div>
         
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <Todoitem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  )
}

export default App
