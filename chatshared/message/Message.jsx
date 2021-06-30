import styles from "../../styles/Message.module.css"
import {format} from "timeago.js"


export default function Message({message, own}) {
    return (
        <div className = {own ? "message own" : styles.message}>
            <div className={styles.messageTop}>
              <div style={{display:'flex',flexDirection : "row"}}>
               {own && ( <img className = {styles.messageImg} src="/image/nope.jpg" alt=""/>)}
                <p className = "messageText">{message.text}</p>
                {!own && ( <img className = {styles.messageImg} src="/image/nope.jpg" alt=""/>)}
             </div>
                
                <div className="messageBottom">
                  {format(message.createdAt)}
                </div>
            </div>
            
        </div>
    )
}
