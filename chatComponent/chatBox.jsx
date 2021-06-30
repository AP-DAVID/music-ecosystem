
import styles from '../styles/Chatbox.module.css'
import Message from '../chatshared/message/Message'
import {useRef, useEffect} from 'react'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import IconButton from "@material-ui/core/IconButton";

export default function Chatbox({handleSubmit, setNewMessage, newMessage, messages, user}){
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

    return(
        <div className={styles.messenger}>
            <div className={styles.chatBox}>
            <div className={styles.chatBoxWrapper}>
                <div className={styles.chatBoxTop}>
                    
                    {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className={styles.chatBoxBottom}>
                    <textarea
                    className={styles.chatMessageInput}
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
                      <SendRoundedIcon style={{ width:90, height : 90}}/>
                    </IconButton> 

                </div>
            </div>
        </div>
      </div>
    )
}