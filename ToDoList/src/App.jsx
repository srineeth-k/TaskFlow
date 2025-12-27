import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      settodos(todos);
    }
  }, []);

  function saveTOLS() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function handleAdd() {
    settodos([...todos, { todo, isCompleted: false, id: uuidv4() }]);
    settodo("");
    saveTOLS();
  }

  function handleEdit(e, id) {
    let t = todos.filter((item) => item.id == id);
    settodo(t[0].todo);
    let newtodo = todos.filter((item) => item.id !== id);
    settodos(newtodo);
  }

  function handleDelete(e, id) {
    let newtodo = todos.filter((item) => item.id !== id);
    settodos(newtodo);
    saveTOLS();
  }

  function handleChange(e) {
    settodo(e.target.value);
  }

  function handleCheckbox(e) {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    saveTOLS();
  }

  function toggleFinished() {
    setshowFinished(!showFinished);
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto max-w-4xl bg-violet-100 dark:bg-gray-900 dark:text-white my-8 p-5 rounded-xl min-h-[80vh]">

        {/* Dark Mode Button */}
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className="mb-4 px-3 py-1 rounded-md bg-violet-800 text-white"
        >
          Toggle Dark Mode
        </button>

        {/* App Logo / Name */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-violet-900 dark:text-violet-300">
            TaskFlow
          </h1>
          <p className="text-sm text-violet-700 dark:text-gray-400">
            Organize your day, one task at a time.
          </p>
        </div>

        <div className="addTodo mb-2">
          <h2 className="text-lg font-bold">Add Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            className="bg-white dark:bg-gray-800 dark:text-white w-1/4"
            type="text"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-3 py-1 rounded-lg text-white mx-3 text-sm"
          >
            Save
          </button>
        </div>

        <div className="flex gap-2.5 font-bold text-lg">
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} />
          Show Finished
        </div>

        <h2 className="text-lg font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length == 0 && <div className="p-2">No Todos to display</div>}

          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex w-1/2 justify-between py-1 bg-white dark:bg-gray-800 rounded-md px-2 mb-2"
                >
                  <div className="flex gap-3">
                    <input
                      onClick={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                    />
                    <div className={item.isCompleted ? "line-through text-gray-400" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-3 py-1 rounded-lg text-white mx-1 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-3 py-1 rounded-lg text-white mx-1 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
