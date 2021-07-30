import Link from "next/link";
import { Header } from 'semantic-ui-react'
import Image from 'next/image'

import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useRouter } from 'next/router'

import {signIn, signOut, useSession} from "next-auth/client";
import {motion} from 'framer-motion';
// layout for page

import Auth from "../../layouts/Auth.js";

export default function Login() {
  const [validation, setValidation] = useState("") 
  const [session, loading] = useSession();
  const router = useRouter()
  const [responsee, setResponse] = useState()
  
  const [form, setForm] = useState(
    {
    email: '',
    password: ''
  }
 )

  const [form2, setForm2] = useState({
    email : '',
    password : ''
  })


 const handleChange =(e) => {
  setForm({
      ...form,
      [e.target.name] : e.target.value
  })

  // if( form.email !== '' && form.password !== ''){
  //   setAbled(false)
  // }else{
  //   setAbled(true)
  // }
}



const handleSubmit = async(e) =>{
      const config = {
        headers: {
            "Accept" : "application/json",
            'Content-type' : "application/json"
        }
      }
      
      if( form.email !== '' && form.password !== ''){

        try{
          
          const response = await axios.post('/api/login', JSON.stringify(form) , config)
          if(response.data === "User not found"){
            setValidation("Omo e be like say your user no exist, on G");
          }
          else if(response.data === "Wrong Password"){
            setValidation("omo guy you no go like put correct password?");
          }
          else{
              signIn("email-login", {email: form.email, password : form.password})
          }
          

          

          

        }catch(error){
          console.log(error);
        }
     
      }else{
        setValidation("Please enter the required inputs")
      }
  
      
      
    
}

const handlegit = async(e) =>{
  signIn("auth0");
}

useEffect(() =>{

  if(session){
    const bom = async () => {
  
    
      const config = {
      headers: {
          "Accept" : "application/json",
          'Content-type' : "application/json"
      }
    }
  
      try{
        setForm2(form2.email = session.user.email)
        console.log(form.email)
        const response = await axios.post('/api/users/', JSON.stringify(form2) , config)
    
      if(response.data.section === "individual user"){
        router.push({
          pathname: '/profile_pages/users_profile/profile',
          query: {sect : session.user.email}
      })
      }
      
      if(response.data.section === "music artist"){
        router.push({
          pathname: '/profile_pages/artist_profile/profile',
          query: {sect : session.user.email}
      })
      
      }
      
      if(response.data.section === "record label"){
        router.push({
          pathname: '/profile_pages/label_profile/profile',
          query: {sect : session.user.email}
      })
      }
  
      if(response.data.section === "videographer"){
        router.push({
          pathname: '/profile_pages/videographer_profile/profile',
          query: {sect : session.user.email}
      })
      }
        
        
      }catch(error){
          console.log(error)
      }
  }
  bom()
  }
  else{
    console.log("no session yet")
  }
},[session])


const containerVariants ={
  hidden :{
     opacity : 0,
  },

  visible : {
      opacity : 1,
      transition : {delay : 5.0, duration : 2}
  },
  exit : {
    x : '-100vw',
    transition : {ease : 'easeInOut', duration : 0.5}

  }
}





    
  
  return (
    <div>
    {!session && (
      <Auth>
      <motion.div 
       className="container mx-auto px-4 h-full"
       variants = {containerVariants}
        initial = "hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex content-center items-center justify-center h-full">
        
          <div className="w-full lg:w-4/12 px-4">
           
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            
      
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                {/* <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={handlegit}
                  >
                    <svg className="w-5 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    Github 
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                   <svg   className="w-5 mr-1"  width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M22.288 21h-20.576c-.945 0-1.712-.767-1.712-1.712v-13.576c0-.945.767-1.712 1.712-1.712h20.576c.945 0 1.712.767 1.712 1.712v13.576c0 .945-.767 1.712-1.712 1.712zm-10.288-6.086l-9.342-6.483-.02 11.569h18.684v-11.569l-9.322 6.483zm8.869-9.914h-17.789l8.92 6.229s6.252-4.406 8.869-6.229z"/></svg>
                    Google
                  </button>
                </div> */}
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <div className="text-red-600 text-center mb-3 font-bold">
                  <small>{validation}</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={form.email}
                      name= 'email'
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={form.password}
                      name= 'password'
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <motion.button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSubmit}
                      whileHover={{
                        scale : 1.0,
                        textShadow : "0px 0px 8px rgb(255,255,255)",
                        
                      }}
                    >
                      Sign In
                    </motion.button>
                    {/* <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                     OR
                    </label>
                    
                    <button 
                     className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                     type="button"
                     onClick={() => signIn("Auth0")}>
                       Sign In with next/auth
                    </button> */}

                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/registers">
                  <a href="/registers" className="text-blueGray-200">
                    <small>Create new account</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
     </Auth>
    )}

        {
           session && (
            

          <div class="ui segment" style={{display: "flex", flexDirection : "column", justifyContent : "center", height : '100vh' }}>
            <div class="ui active dimmer"style={{display: "flex", flexDirection : "row", justifyContent : "center", height : '100vh' }}>
              <div class="ui huge text loader">Loading</div>
            </div>
          <p></p>
          <p></p>
          </div>

           )
            
           
         }
    </div>

  );
}

Login.layout = Auth;
