import {Typography} from '@material-ui/core'
import Sidebar from "../../chatComponent/chatSidebar";
import Chatbox from "../../chatComponent/chatBox"
import {useEffect, useState, useRef} from 'react'
import {getLogin} from '../../fetchdata/loginFetcher'
import axios from 'axios'
import { io } from "socket.io-client";
import Loading from './loading';



export default function Chat(props){
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const socket = useRef();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    const [newMessage, setNewMessage] = useState("");
      
    const {logins, isLoading, isError} = getLogin(props.email) 



    useEffect(() => {
      socket.current = io("https://musco-chat.herokuapp.com");
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }, []);

    useEffect(() => {

      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
      console.log("hey")
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
      socket.current.emit("addUser", logins?._id);
      socket.current.on("getUsers", (users) => {
        setOnlineUsers(
           logins?.followings?.filter((f) => users.some((u) => u.userId === f))
        );
      });
    }, [logins]);





    useEffect(() => {
        const getConversations = async () => {
          try {
            const res = await axios.get("/api/conversations/" + logins?._id);
            console.log(res.data)
            setConversations(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getConversations();
      }, [logins]); //remember the dependency


      useEffect(() => {
        const getMessages = async () => {
          try {
            const res = await axios.get("/api/messages/" + currentChat?._id);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currentChat]);



      if(isError){return (<p>An error Occured</p>)}

      if(isLoading){
        return (
          <Loading />
      )}
    
      const handleSubmit = async(e) =>{
          e.preventDefault();
          const message = {
            sender: logins._id,
            text: newMessage,
            conversationId: currentChat._id,
          };

          const receiverId = currentChat.members.find(
            (member) => member !== logins._id
          );
 
          socket.current.emit("sendMessage", {
            senderId: logins?._id,
            receiverId,
            text: newMessage,
          });

          try {
            const res = await axios.post("/api/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
          } catch (err) {
            console.log(err);
          }

      };


     
    return(
       <div className="container" style={{height : "100vh", width : "100hh"}}>
            <Sidebar setCurrentChat={setCurrentChat} conversations={conversations} logins={logins} >
                {/* <Typography variant="h5" style={{fontFamily: "Lora"}}>Hello chat world.. we will create you</Typography> */}
               {currentChat ? (
                 <Chatbox
                   newMessage={newMessage}
                   setNewMessage={setNewMessage} 
                   handleSubmit={handleSubmit} 
                   messages={messages} 
                   user = {logins} />

               ): (
                <span className="noConversationText" style={{position : "absolute", top: "10%", fontSize : "50px", color : "rgb(224, 220, 220)", cursor : "default"}}>
                  Open a conversation to start a chat.
                </span>
              ) }
                
            </Sidebar>
        </div>
    )
}

Chat.getInitialProps =  ({query}) =>{
  const email = query.email
  return {
    email : email
  }
}