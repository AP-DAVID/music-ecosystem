import React, { useState } from "react";

import Navbar from "../../../../components/Navbars/AuthNavbar.js";
import Footer from "../../../../components/Footers/Footer.js";
import Admin from "../../../../components/Admin.js";
import Body from '../components/body'
import Individual from "../../../../search/individualsearch"
import Artist from "../../../../search/artistsearch"
import Label from "../../../../search/labelsearch"
import Videography from "../../../../search/videograph"
import Openmodal from "../../../../search/openModal"
import {useRouter} from 'next/router'
import {signOut, useSession } from "next-auth/client";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {getLogin} from '../../../../fetchdata/loginFetcher'
import {getUser} from '../../../../fetchdata/registerFetcher'
import Sbody from "../../../../search/bodysearch"
import Oops from "../../../../search/openModal"

export default function Videographer(props) {
  const router = useRouter()
  const [onmodal, setOnmodal] = useState(false);
  const[session, loading] = useSession();
  const {logins, isLoading, isError} = getLogin(props.email) 
  const [responsee, setResponse] = useState()
  const[bsearch, setSearch] = useState(false);
  const[content, setContent] = useState(true);
  const[iu, setIU] = useState(false)
  const[musicart, setMusicart] = useState(false);
  const[label, setLabel] = useState(false);
  const[videogr, setVideogr] = useState(false);


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

  const config = {
    headers: {
        "Accept" : "application/json",
        'Content-type' : "application/json"
    }
  }
  
  if(value != ''&& value != logins.username){
    try{
      setForm(form.username = res)
      const response = await axios.post('/api/search', JSON.stringify(form) , config)
      setForm({
        ...form,
        username : '',
        email : ''
    })
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

  } else {
    console.log("empty search")
  }
} 



  if(isError){return (<p>An error Occured</p>)}
  if(isLoading){
    return (
      <div class="ui segment" style={{display: "flex", flexDirection : "column", justifyContent : "center", height : '100vh' }}>
            <div class="ui active dimmer"style={{display: "flex", flexDirection : "row", justifyContent : "center", height : '100vh' }}>
              <div class="ui huge text loader">Loading</div>
            </div>
          <p></p>
          <p></p>
      </div>
    )}

  if(loading){
    return (
      <div class="ui segment" style={{display: "flex", flexDirection : "column", justifyContent : "center", height : '100vh' }}>
            <div class="ui active dimmer"style={{display: "flex", flexDirection : "row", justifyContent : "center", height : '100vh' }}>
              <div class="ui huge text loader">Loading</div>
            </div>
          <p></p>
          <p></p>
      </div>
  )
  }


  if (!session && !loading || session.user.email != props.email || logins.section != "videographer"){
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
  



  
  return (
    <Admin goHome={goHome} onLogout={onLogout} userName={logins.username} onSearch={onSearch}>
      
       {content && (
        <>
          <Navbar transparent />
            <Body 
               userName={logins.username} 
               userEmail={logins.email}
               description={logins.description} 
               followers={logins.followers.length}
               following={logins.following.length}   
            />
          <Footer />

        </>
       )}

        {iu && (
          <>
            <Individual id={responsee.data._id} logins ={logins} />
          </>
        )}

        {musicart && (
          <>
            <Artist id={responsee.data._id} logins ={logins} />
          </>
        )}  

        {label && (
          <>
            <Label id={responsee.data._id} logins ={logins} />
          </>
        )}  

        {videogr && (
          <>
            <Videography id={responsee.data._id} logins ={logins} />
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

Videographer.getInitialProps =  ({query}) =>{
  const email = query.sect
  return {
    email : email
  }
}
