import styles from "../../styles/Conversation.module.css"
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Conversation({conversation, currentUser}) {

    const [user, setUser] = useState(null);


    useEffect(() =>{
        const friendId = conversation.members.find((m) => m !== currentUser._id )
        
        const getUser = async () =>{

            try{
                const res = await axios.get("/api/register/" + friendId);
                setUser(res.data);
            }
            catch(err){
                console.log(err)
            }
          
        };
        getUser();

    }, [currentUser, conversation])

    return (
        <div className={styles.conversation}>
            <img className={styles.conversationImg}
             src={user?.profilePicture ? user.profilePicture :"/image/noAvatar.png"}
             alt="profile image"/>
            <span className={styles.conversationName}> {user?.username}</span>
        </div>
    )
}
