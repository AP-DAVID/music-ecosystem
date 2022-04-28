import Sidebar from "../../chatComponent/chatSidebar";
import { signOut, getSession } from "next-auth/client";
import Chatbox from "../../chatComponent/chatBox";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Oops from "../../search/openModal";
import { useRouter } from "next/router";

export default function Chat({ session }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();

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
    console.log("hey");
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", session.user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        session.user?.followings?.filter((f) =>
          users.some((u) => u.userId === f)
        )
      );
    });
  }, [session.user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversations/" + session.user?._id);
        console.log(res.data);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [session.user]); //remember the dependency

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

  if (!session) {
    return (
      <main>
        <Oops />
      </main>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: session.user._id,
      text: newMessage,
      conversationId: currentChat._id,
      profile: session.user.profilePicture,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== session.user._id
    );

    socket.current.emit("sendMessage", {
      senderId: session.user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      refreshData();
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <div className="container" style={{ height: "100vh", width: "100hh" }}>
      <Sidebar
        setCurrentChat={setCurrentChat}
        conversations={conversations}
        logins={session.user}
      >
        {/* <Typography variant="h5" style={{fontFamily: "Lora"}}>Hello chat world.. we will create you</Typography> */}
        {currentChat ? (
          <Chatbox
            newMessage={newMessage}
            conversations={conversations} //we do not need this tbh
            setNewMessage={setNewMessage}
            handleSubmit={handleSubmit}
            messages={messages}
            user={session.user}
          />
        ) : (
          <span
            className="noConversationText"
            style={{
              position: "absolute",
              top: "10%",
              fontSize: "50px",
              color: "rgb(224, 220, 220)",
              cursor: "default",
            }}
          >
            Open a conversation to start a chat.
          </span>
        )}
      </Sidebar>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
