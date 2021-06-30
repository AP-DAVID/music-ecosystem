import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbars/AuthNavbar.js";
import Footer from "../components/Footers/Footer.js";
import Body3 from '../body/artistBody'
import Admin from "../components/Admin.js";
import {useRouter} from 'next/router'
import axios from 'axios'
import {getUser} from '../fetchdata/registerFetcher'

export default function Artist({id, logins}) {
  const router = useRouter()
  const {register, isLoading, isError} = getUser(id)
  const [text, setText] = useState("follow")
  const [form, setForm] = useState(
    {
    senderId: logins?._id,
    receiverId : '',
  }
 )

 const [form2, setForm2] = useState(
  {
   userId : logins._id,
  }
)




 const onfollow = async () =>{
  const config = {
    headers: {
        "Accept" : "application/json",
        'Content-type' : "application/json"
    }
  }

    try{
      const response = await axios.put(`/api/followLogic/${id}`, JSON.stringify(form2), config)
      console.log("followed succesfully")

     
      
    }catch(error){
        console.log(error)
    }
    
 }

  if(isError){return (<p>An error Occured</p>)}
  if(isLoading){
    return (
      <div class="ui segment" style={{display: "flex", flexDirection : "column", justifyContent : "center", height : '100vh' }}>
          <div class="ui active inverted dimmer"style={{display: "flex", flexDirection : "row", justifyContent : "center", height : '100vh' }}>
            <div class="ui medium text loader">Searching</div>
          </div>
        <p></p>
        <p></p>
      </div>
    )
  }

  if (!register.username){
    return (
        <main>
            <div>
                <h1>
                    You arent signed in please sign in
                </h1>
            </div>
        </main>
    )
  }
  
  const onChat = async () =>{

    
    setForm(form.receiverId = register._id);

    const config = {
      headers: {
          "Accept" : "application/json",
          'Content-type' : "application/json"
      }
    }

      try{
        const response = await axios.post('/api/conversations', JSON.stringify(form) , config);
        console.log(response);
        router.push({
          pathname: '/messenger/chats',
          query: {email: logins?.email}
      })
      }catch(error){
          console.log(error)
      }
      
  }


 

  return (
    <>
      
      <Navbar transparent />
        <Body3 register={register} onChat={onChat}  text={text}  onfollow={onfollow}/>
      <Footer />
    </>
  );
}
