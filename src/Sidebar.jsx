import "./sidebar.css";
import { myContext } from "./myContext.jsx";
import { useContext, useEffect, useState} from "react";
import {v1 as uuidv1} from "uuid";
import logo from './assets/logo.png';

function Sidebar(){


    const {allThreads, SetAllThreads, currThreadId, SetnewChat, Setpromt, Setreply, SetcurrThreadId, SetprevChats} = useContext(myContext);

    const [isOpen, setIsOpen] = useState(false); // ✅ Sidebar visibility

    const toggleSidebar = () => setIsOpen(!isOpen);

     const getAllThreads = async () => {
        try {
            const response = await fetch("https://primegpt-backend.onrender.com/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            //console.log(filteredData);
            SetAllThreads(filteredData);
        } catch(err) {
            console.log(err);
        }
       };

    
     useEffect(() => {
        getAllThreads();
    }, [currThreadId])


    const createNewChat = () => {
        SetnewChat(true);
        Setpromt("");
        Setreply(null);
        SetcurrThreadId(uuidv1());
        SetprevChats([]);

    }


    const changeThread = async (newThreadId) => {
        SetcurrThreadId(newThreadId);

        try {
            const response = await fetch(`https://primegpt-backend.onrender.com/api/thread/${newThreadId}`);
            const res = await response.json();
            console.log(res);
            SetprevChats(res);
            console.log(res);
            console.log("Threads from backend:", res);
            SetnewChat(false);
            Setreply(null);
        } catch(err) {
            console.log(err);
        }
    }  

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`https://primegpt-backend.onrender.com/api/thread/${threadId}`, {method: "DELETE"});
            const res = await response.json();
            console.log(res);

            //updated threads re-render
            SetAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if(threadId === currThreadId) {
                createNewChat();
            }

        } catch(err) {
            console.log(err);
        }
    }


        
    return(
        <>
               
        <button className="menu-toggle" onClick={toggleSidebar}>
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>

        {isOpen && <div className="sidebar-backdrop" onClick={toggleSidebar} />}
        <section className={`sidebar ${isOpen ? "open" : ""}`}>
            <button onClick={createNewChat}>
                <img src={logo} alt="gpt logo" className="logo" />
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>
        {/* // <section className="sidebar">
        //     <button onClick={createNewChat} >
        //         <img src="src/assets/logo.png" alt="gpt logo" className="logo"></img>
        //         <span><i className="fa-solid fa-pen-to-square"></i></span>
        //     </button> */}


            <ul className="history">
                {
                     allThreads?.map((thread, idx) => (
                        <li key={idx} 
                            onClick={(e) => changeThread(thread.threadId)}
                           className={thread.threadId === currThreadId ? "highlighted": " "}
                        >
                            {thread.title}
                            <i className="fa-solid fa-trash"
                                onClick={(e) => {
                                    e.stopPropagation(); //stop event bubbling
                                    deleteThread(thread.threadId);
                                }}
                            ></i>
                        </li>
                    ))
                }
                    
                    
                
            </ul>
 
            <div className="sign">
                <p>By Sakshi Sahu &hearts;</p>
            </div>
        </section>
        </>
    )
}

export default Sidebar;