import React, { useDebugValue } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useState, useEffect} from 'react';
import {signOut, useSession } from "next-auth/client";
import Individual from "../../../../search/individualsearch"
import Artist from "../../../../search/artistsearch"
import Label from "../../../../search/labelsearch"
import Videography from "../../../../search/videograph"
import Button from '@material-ui/core/Button';
import {useRouter, withRouter} from 'next/router'
import axios from 'axios';
import Admin from "../../../../components/Admin.js";
import {getLogin} from '../../../../fetchdata/loginFetcher'
import styles from "../../../../assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import Global from '../components/global'
import Recently from '../components/recently'
import Sbody from "../../../../search/bodysearch"
import Oops from "../../../../search/openModal"




const Dashboard = (props) => {
  const router = useRouter()
  const useStyles = makeStyles(styles);
  const classes = useStyles();
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
  else{
    console.log("what are you even doing")
  }
} 



if( typeof window !== "undefined" && loading) return null;

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


if (!session && !loading || session.user.email != props.email  || logins.section != "individual user" ){
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
        <Admin goHome={goHome} onLogout={onLogout}  userName={logins.username} userPicture={session.user.image} onSearch={onSearch}>
          {content && (
            <>
              <Global text1="Nigeria Top ten" text2="See all"/>
        
              <Global text1="Songs you might like" text2="See all"/>
        
              <Recently text1="Recently Played"  text2="See all" /> 
            </>
          )   
         }
          
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
        
      )




 

}

Dashboard.getInitialProps =  ({query}) =>{
  const email = query.sect
  return {
    email : email
  }
}

export default Dashboard;
