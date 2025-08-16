import "./chat.css";
import { myContext } from "./myContext";
import { useContext, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
  
  
  
  function Chat(){
    const {newChat, prevChats, reply} = useContext(myContext);
    const [latestReply, SetlatestReply] = useState(null);



useEffect(() =>{
       if(reply === null ) {
            SetlatestReply(null); //prevchat load
            return;
        }
        //onsole.log("Received prevChats in Chat:", prevChats); 
        if(!prevChats?.length) return;

        const content = reply.split(" "); //individual words

        let idx = 0;
        const interval = setInterval(() => {
          SetlatestReply(content.slice(0, idx+1).join(" "));

            idx++;
            if(idx >= content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);


},[prevChats, reply])


    return(
        <>
        {newChat && prevChats.length === 0 && <h1>Start a New Chat!</h1 >}
        <div className="chats">

                  {prevChats?.slice(0,-1).map((chat, idx) =>
                       
                             <div className={chat.role === "user"?"userDiv" : "gptDiv"} key={idx}>

                                        {
                                          chat.role ==="user" ?
                                          <p className="userMessages "> {chat.content}</p> 
                                          : <ReactMarkdown rehypePlugins={rehypeHighlight}>{chat.content}</ReactMarkdown>
                                        }

                             </div>
                        )
                  }
                  {
                    prevChats.length > 0  && (
                        <>
                            {
                                latestReply === null ? (
                                    <div className="gptDiv" key={"non-typing"} >
                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                                    
                                </div>
                                ) : (
                                    <div className="gptDiv" key={"typing"} >
                                     <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                                </div>
                                )

                            }
                        </>
                    )
                  }

        
        
        </div>
        </>
    )
}

export default Chat;