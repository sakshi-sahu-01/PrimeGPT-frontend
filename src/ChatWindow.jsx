import "./chatWindow.css";
import Chat from "./chat.jsx";
import { myContext } from "./myContext.jsx";
import { useContext, useState, useEffect } from "react";

import {ScaleLoader} from "react-spinners";

function ChatWindow(){
  
    const{ promt, Setpromt, reply, Setreply, currThreadId, SetprevChats} = useContext(myContext);
    const[loading, Setloading] = useState(false);
    const[isOpen, setisOpen] = useState(false);


    
    const getReply = async () =>{
        Setloading(true);
         console.log(promt);
         console.log(currThreadId);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: promt,
                threadId: currThreadId
            })
        };


        try{
                const response= await fetch("http://localhost:8080/api/chat", options);
                const res= await response.json();
            console.log(res);
            Setreply(res.reply);
        }
        catch(err){
            console.log(err);
        }
        Setloading(false);

    }
    


  useEffect(() => {
    if (promt && reply) {
    SetprevChats(prevChats  => [
      ...prevChats ,
      { role: "user", content: promt },
      { role: "assistant", content: reply }
    ]);
     
    Setpromt(""); // ✅ only reset if promt and reply were both set
  }
  }, [reply]);

  const handleProfileClick = () => {
        setisOpen(!isOpen);
    }
    
    return(
        <div className="chatWindow">
            <div className="navbar">
                    <span>PrimeGPT <i className="fa-solid fa-chevron-down"></i></span>
                      <div className="userIcondiv" onClick={handleProfileClick}>
                      <span className="userIcon"> <i className="fa-solid fa-user"></i>  </span> 
                      </div>
            </div>
            {     
                   isOpen &&
                 <div className="dropDown">
                    <div className="dropDownItems" ><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade Plan</div>
                    <div className="dropDownItems"><i className="fa-solid fa-gear"></i>Settings</div>
                     <div className="dropDownItems"><i className="fa-solid fa-arrow-right-from-bracket"></i>Log out </div>
                   
                 </div>

            }
            <Chat></Chat>
            <ScaleLoader color="#fff" loading={loading}>

            </ScaleLoader>
            <div className="chatInput">
                   <div className="inputBox">
                    <input placeholder="Ask Anything"
                    value ={promt}
                    onChange={(e) => Setpromt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
                    >

                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-regular fa-paper-plane"></i> </div>
                   </div>
                   <p className="info">
                        PrimeGPT can make mistakes. Check important info. See Cookie perferences.
                   </p>
            </div>
        </div>
    )
}

export default ChatWindow;