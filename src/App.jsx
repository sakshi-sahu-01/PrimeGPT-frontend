import './App.css'
import Sidebar from "../sidebar.jsx";

import ChatWindow from "./chatWindow.jsx"
import {myContext } from "./myContext.jsx"
import { useState } from 'react'
import {v1 as uuidv1} from "uuid"


function App() {
  const [promt, Setpromt] = useState("");
  const [reply, Setreply] = useState("");
  const [currThreadId, SetcurrThreadId] = useState(uuidv1());
  const [prevChats, SetprevChats] = useState([]);
    const [newChat, SetnewChat] = useState(true);
    const [allThreads, SetAllThreads] = useState([]);
    
  
  const providerValues = {
    promt, Setpromt,
    reply, Setreply,
    currThreadId, SetcurrThreadId,
    newChat,SetnewChat,
    prevChats, SetprevChats,
    allThreads, SetAllThreads
    
  };

  return (
    <div className="app">
      <myContext.Provider value = {providerValues }>
       <Sidebar></Sidebar>
         <ChatWindow></ChatWindow>
    </myContext.Provider>
    </div>
  )
}



export default App;

