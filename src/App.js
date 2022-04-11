
import './App.css';
import Header from "./Header";
import Tasks from './Tasks';
import {useState,useEffect} from "react"
import AddTask from "./AddTask"
import { type } from '@testing-library/user-event/dist/type';

function App() {
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks,setTasks]=useState([
    {
      
      "id": 1,
      "text": "Doctors Appointment",
      "day": "25-11-1997",
      "time":"2:30pm",
      "reminder": true
    },
    {
      "id": 2,
      "text": "Meeting at School",
      "day": "4-25-1998",
      "time":"9:30pm",
      "reminder": true
    },
    {
      "id": 3,
      "text": "Grocery Shopping",
      "day": "5-25-1995",
      "time":"12:30pm",
      "reminder": false
    }
  ])

  useEffect(()=> {
    const getTasks = async()=> {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])
  
  //Fetch Tasks
  const fetchTasks = async()=>{
    const res = await fetch("http://localhost:5000/tasks")
    const data= await res.json()
    return data
  }
  //Fetch Task
  const fetchTask = async(id)=>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data= await res.json()
    return data
  }
  

// Add Task
 const addTask=(task)=>{

     const id=Math.floor(Math.random()*10000)+1
     console.log(id);
    const newTask={id,...task}
    setTasks([...tasks,newTask])
}




// Delete Task
const deleteTask=  (id) =>{
 
  setTasks(tasks.filter((task)=> task.id !==id))
}

// Toggle Reminder
const toggleReminder=(id)=>{
  
  setTasks (
    tasks.map((task)=>
    task.id===id? {...task, reminder:!task.reminder}:task
     )
    )
  }





  return (
  
    <div className="container">
    <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
    {showAddTask &&<AddTask  onAdd={addTask}/>}
    {tasks.length>0 ?(<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> ) : ("No task to Show")}
    </div>

  );
}

export default App;
