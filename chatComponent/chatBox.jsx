
import styles from '../styles/Chatbox.module.css'
import Message from '../chatshared/message/Message'
import {useRef, useEffect, useState} from 'react'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import IconButton from "@material-ui/core/IconButton";
import {PaperAirplaneIcon} from "@heroicons/react/outline"
import findLastIndex from "lodash/findLastIndex"
import axios from 'axios';

export default function Chatbox({handleSubmit, conversations, setNewMessage, newMessage, messages, user}){
    const scrollRef = useRef();
    const [pic, setPic] = useState("")



    useEffect(async () => {
        await scrollRef.current?.scrollIntoView({ behavior: "smooth" });

        const lastIndex = await findLastIndex(messages, v => v.sender != user._id)

        setPic(messages[lastIndex]?.profile)

      }, [messages]);

       
    
  



    return(
        <div className={`${styles.messenger} bg-white h-full w-full`}>
            <div className={styles.chatBox}>
            <div className={styles.chatBoxWrapper}>

                <div className="w-12 h-10 top:0 rounded-full" style={{backgroundColor : "#00838F"}}>
                    <img src={pic ? pic : "/image/noAvatar.png"} className="h-10 w-10 object-cover rounded-full"/>
                </div>
                <div className={`h-full overflow-y-scroll w-full scrollbar-hide`}>
                    
                    {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} user={user} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className={`${styles.chatBoxBottom} mt-6 bottom-0`}>
                    <textarea
                      className="rounded-l-full rounded-tl-none rounded-r-full h-16 sm:h-20 w-11/12 sm:w-5/6"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}

                    ></textarea>
                    {/* <button className={styles.chatSubmitButton} 
                        onClick={handleSubmit}
                    >
                    Send
                    </button> */}
                    <IconButton aria-label="send" onClick={handleSubmit}>
                      <div className="">  <PaperAirplaneIcon style={{backgroundColor: "#00838F"}} className="h-16 sm:h-20 text-center rounded-full px-2 py-1 bg-blue-300 w-15 mr-5 text-white"/> </div>
                    </IconButton> 

                </div>
            </div>
        </div>
      </div>
    )
}