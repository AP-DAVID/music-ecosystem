import React, { useState } from "react";

import Navbar from "../../../components/Navbars/AuthNavbar.js";
import Footer from "../../../components/Footers/Footer.js";
import Admin from "../../../components/Admin.js";
import Body from './components/body'
import Individual from "../../../search/individualsearch"
import Artist from "../../../search/artistsearch"
import Label from "../../../search/labelsearch"
import Videography from "../../../search/videograph"
import {useRouter} from 'next/router'
import {signOut, getSession } from "next-auth/client";
import axios from 'axios';
import Sbody from "../../../search/bodysearch"
import Oops from "../../../search/openModal"

export default function Recordlabel({session}) {
  const router = useRouter()
  const [responsee, setResponse] = useState()
  const[content, setContent] = useState(true);
  const[iu, setIU] = useState(false)
  const[musicart, setMusicart] = useState(false);
  const[label, setLabel] = useState(false);
  const[videogr, setVideogr] = useState(false);
  const[bsearch, setSearch] = useState(false);

  const [form, setForm] = useState(
    {
    username: '',
    email : ''
  }
 )
  

 //search for user
const onSearch = async(value) =>{
  console.log(value);
  let res = value.toLowerCase();

 
  if(value != '' && value != session.user.username){
    try{
      setForm(form.username = res)
      const response = await axios.get(`/api/search/${res}`)

      await setResponse(response);
      setContent(false);
      if(response.data.status === 404){
        setSearch(true)
      }
     

      if (response.data.section === "individual user") {

        setIU(true)
        setMusicart(false)
        setLabel(false)
        setVideogr(false)
        setSearch(false)
      
      };
      if (response.data.section === "music artist") {
        setMusicart(true)
        setIU(false)
        setLabel(false)
        setVideogr(false)
        setSearch(false)
      };
      if (response.data.section === "record label") {
        setLabel(true)
        setMusicart(false)
        setIU(false)
        setVideogr(false)
        setSearch(false)
      };
      if (response.data.section === "videographer") {
        setVideogr(true)
        setLabel(false)
        setMusicart(false)
        setIU(false)
        setSearch(false)
      };
      
      
      
    }catch(error){
        console.log(error)
    }
  }
} 





  if (!session || session.user.section != "record label"){
    return (
        <main>
            <Oops />
        </main>
    )
  }

  const onLogout = async () =>{
    await signOut()
    router.push('/');
  
  }
  
  const goHome = async() =>{
    setContent(true);
    setVideogr(false)
    setLabel(false)
    setMusicart(false)
    setIU(false)
  
    
  }

  const goChat = async() =>{
    router.push({
      pathname: '/messenger/chats',
    
  })
  }
  

  
  return (
    <Admin goChat ={goChat} goHome={goHome} session={session}userPicture={session.user.profilePicture} onLogout = {onLogout} userName={session.user.username} onSearch={onSearch}>
      
       {content && (
        <>
          <Navbar transparent />
            <Body 
               userName={session.user.username} 
               userEmail={session.user.email} 
               description={session.user.description} 
               image={session.user.profilePicture}
               followers={session.user.followers.length}
               following={session.user.following.length}   

            />
          <Footer />

        </>
       )}

        {iu && (
          <>
            <Individual id={responsee.data._id} logins ={session.user} />
          </>
        )}

        {musicart && (
          <>
            <Artist id={responsee.data._id} logins ={session.user} />
          </>
        )}  

        {label && (
          <>
            <Label id={responsee.data._id} logins ={session.user} />
          </>
        )}  

        {videogr && (
          <>
            <Videography id={responsee.data._id} logins ={session.user} />
          </>
        )}  
        {bsearch && (
          <>
            <Sbody svg="/search.svg" />
          </>
        )}  
    
    </Admin>
  );
}


export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}
