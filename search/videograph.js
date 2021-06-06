import React, { useState } from "react";

import Navbar from "../components/Navbars/AuthNavbar.js";
import Footer from "../components/Footers/Footer.js";
import Body4 from '../body/videographyBody'
import {useRouter} from 'next/router'
import axios from 'axios'
import {getUser} from '../fetchdata/registerFetcher'

export default function Videography({id, logins}) {
  const router = useRouter()
  const {register, isLoading, isError} = getUser(id)
  const [form, setForm] = useState(
    {
    username: '',
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
  if(isLoading){return (<h1>loading..</h1>)}

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
  



  return (
    <>
      
      <Navbar transparent />
        <Body4 register={register} onfollow={onfollow}/>
      <Footer />
    </>
  );
}
