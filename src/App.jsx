// import './App.css'
// import Sidebar from "../sidebar.jsx"
// import ChatWindow from "./chatWindow.jsx"
// import {myContext } from "./myContext.jsx"
// import { useState } from 'react'
// import {v1 as uuidv1} from "uuid"


// function App() {
//   const [promt, Setpromt] = useState("");
//   const [reply, Setreply] = useState("");
//   const [currThreadId, SetcurrThreadId] = useState(uuidv1());
//   const [prevChats, SetprevChats] = useState([]);
//     const [newChat, SetnewChat] = useState(true);
//     const [allThreads, SetAllThreads] = useState([]);
    
  
//   const providerValues = {
//     promt, Setpromt,
//     reply, Setreply,
//     currThreadId, SetcurrThreadId,
//     newChat,SetnewChat,
//     prevChats, SetprevChats,
//     allThreads, SetAllThreads
    
//   };

//   return (
//     <div className="app">
//       <myContext.Provider value = {providerValues }>
//        <Sidebar></Sidebar>
//          <ChatWindow></ChatWindow>
//     </myContext.Provider>
//     </div>
//   )
// }



// export default App;
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (msg) => {
    try {
      const res = await fetch("https://primegpt-backend.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, threadId: "123" })
      });

      const data = await res.json();

      // ✅ Ensure data is an array before using .map
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (err) {
      console.error("Error calling API:", err);
    }
  };

  return (
    <div>
      <h1>PrimeGPT Chat</h1>
      <button onClick={() => sendMessage("Hello")}>Send</button>

      <div>
        {Array.isArray(messages) &&
   messages.map((m, i) => (
            <p key={i}>
              <strong>{m.role}:</strong> {m.content}
            </p>
          ))}
      </div>
    </div>
  );
}

export default App;

