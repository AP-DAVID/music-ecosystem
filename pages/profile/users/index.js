import React, { useDebugValue } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useState, useEffect} from 'react';
import {signOut} from "next-auth/client";
import Individual from "../../../search/individualsearch"
import Artist from "../../../search/artistsearch"
import { getSession } from "next-auth/client"
import Label from "../../../search/labelsearch"
import Videography from "../../../search/videograph"
import {useRouter, withRouter} from 'next/router'
import axios from 'axios';
import Admin from "../../../components/Admin.js";
import styles from "../../../assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import Global from './components/global'
import Recently from './components/recently'
import Sbody from "../../../search/bodysearch"
import Oops from "../../../search/openModal"





const Dashboard = ({session}) => {
  const router = useRouter()
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const[load, setLoad] = useState(false);
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

  
  
const onSearch = async(value) =>{
  setLoad(true);
  let res = value.toLowerCase();
  

  if(value != '' && res != session.user.username){
    
    try{
      setForm(form.username = res)
      const response = await axios.get(`/api/search/${res}`)
    

      await setResponse(response);
      setContent(false);
      if(response.data.status === 404){
        setLoad(false)
        setSearch(true)
      }
     


      if (response.data.section === "individual user") {
        setLoad(false)
        setIU(true)
        setMusicart(false)
        setLabel(false)
        setVideogr(false)
        setSearch(false)
      
      };
      if (response.data.section === "music artist") {
        setLoad(false)
        setMusicart(true)
        setIU(false)
        setLabel(false)
        setVideogr(false)
        setSearch(false)
      };
      if (response.data.section === "record label") {
        setLoad(false)
        setLabel(true)
        setMusicart(false)
        setIU(false)
        setVideogr(false)
        setSearch(false)
      };
      if (response.data.section === "videographer") {
        setLoad(false)
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
    setLoad(false)
  }
} 





if (!session || session.user.section != "individual user" ){
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
        <Admin goChat={goChat} goHome={goHome} session={session} onLogout={onLogout} userPicture={session.user.profilePicture}  userName={session.user.username} onSearch={onSearch}>
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

        {load && (
          <>
              <div class="ui segment" style={{display: "flex", flexDirection : "column", justifyContent : "center", height : '100vh' }}>
                <div class="ui active inverted dimmer"style={{display: "flex", flexDirection : "row", justifyContent : "center", height : '100vh' }}>
                  <div class="ui medium text loader">Loading</div>
                 </div>
              <p></p>
              <p></p>
          </div>

          </>
        )}

       </Admin>
        
      )




 

}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}

export default Dashboard;
