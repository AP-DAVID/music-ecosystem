import React, { useState } from "react";

import Navbar from "../../../../components/Navbars/AuthNavbar.js";
import Footer from "../../../../components/Footers/Footer.js";
import Admin from "../../../../components/Admin.js";
import Body from '../components/body'
import Individual from "../../../../search/individualsearch"
import Artist from "../../../../search/artistsearch"
import Button from '@material-ui/core/Button';
import Label from "../../../../search/labelsearch"
import Videography from "../../../../search/videograph"
import {useRouter} from 'next/router'
import {signOut, useSession } from "next-auth/client";
import axios from 'axios';
import {getLogin} from '../../../../fetchdata/loginFetcher'
import {getUser} from '../../../../fetchdata/registerFetcher'
import Sbody from "../../../../search/bodysearch"

export default function Recordlabel(props) {
  const router = useRouter()
  const[session, loading] = useSession();
  const {logins, isLoading, isError} = getLogin(props.email) 
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


  const config = {
    headers: {
        "Accept" : "application/json",
        'Content-type' : "application/json"
    }
  }

  if(value != '' && value != logins.username){
    try{
      setForm(form.username = value)
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
    )
  }
  
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

  if (!session && !loading){
    return (
        <main>
            <div>
                <h1>
                    You arent signed in please sign in
                </h1>
                <Button variant="contained" color="primary" onClick ={() => router.push('/')} style={{marginRight : 20}}>
                   Go Home
                </Button>
                <Button variant="contained" color="secondary"  onClick ={() => router.push('/logins/login')}>
                   Login
                </Button>
            </div>
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
    <Admin goHome={goHome} onLogout = {onLogout} userName={logins.username} onSearch={onSearch}>
      
       {content && (
        <>
          <Navbar transparent />
            <Body userName={logins.username} userEmail={logins.email}/>
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

Recordlabel.getInitialProps =  ({query}) =>{
  const email = query.sect
  return {
    email : email
  }
}
