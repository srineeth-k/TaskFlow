import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';




function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished,setshowFinished]=useState(true);

  useEffect(()=>{
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  },[])

  function saveTOLS(){
  localStorage.setItem("todos",JSON.stringify(todos))
}

  function handleAdd() {
    settodos([...todos, { todo, isCompleted: false , id:uuidv4()}]);
    settodo("");
    console.log(todos);
    saveTOLS()
  }
  function handleEdit(e,id) {
    let t=todos.filter(item=>item.id==id)
    settodo(t[0].todo)
    let newtodo=todos.filter(item=>{
      return item.id!==id
    })
    settodos(newtodo)
  }
  function handleDelete(e, id) {
    let newtodo=todos.filter(item=>{
      return item.id!==id
    })
    settodos(newtodo)
    saveTOLS()
  }
  function handleChange(e) {
    settodo(e.target.value);
  }

  function handleCheckbox(e){
    let id=e.target.name
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newtodos=[...todos]
    newtodos[index].isCompleted=!newtodos[index].isCompleted
    settodos(newtodos);
    saveTOLS()
  }

  function toggleFinished(e){
    setshowFinished(!showFinished);
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-4xl bg-violet-100  my-8 p-5 rounded-xl min-h-[80vh]">
        <div className="addTodo mb-2">
          <h2 className="text-lg font-bold">Add Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            className=" bg-white w-1/4"
            type="text"
          ></input>
          <button
            onClick={handleAdd} disabled={todo.length<=3}
            className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-3 py-1 rounded-lg text-white mx-3 text-sm"
          >
            Save
          </button>
        </div>
        <div className="flex gap-2.5 font-bold text-lg"><input c onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished</div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length==0 && <div className="p-2">No Todos to display</div>}
          {todos.map((item) => {
             return ( (showFinished || !item.isCompleted) &&
              <div key={item.id} className="todo flex w-1/2 justify-between py-1">
                <div className="flex gap-3">
                <input onClick={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id=""/>
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div></div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e)=>{handleEdit(e,item.id)}}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 rounded-lg text-white mx-1 text-sm"
                  > 
                    Edit
                  </button>
                  <button
                    onClick={(e)=>{{handleDelete(e,item.id)}}}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 rounded-lg text-white mx-1 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
