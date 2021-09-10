import React, {useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/router'
import {signIn,  signOut, useSession} from "next-auth/client";
import {motion} from 'framer-motion';


// layout for page

import Auth from "../../layouts/Auth.js";

export default function Register() {
  const[session, loading] = useSession();
  const router = useRouter()
  const [validation, setValidation] = useState('')
  const [form, setForm] = useState(
    {
    username: '', 
    email: '',
    password: '',
    section: "individual user"
  }
)

  const handleChange =(e) => {

      setForm({
          ...form,
          [e.target.name] : e.target.value
      })
  }

  const handleSubmit = async(e) =>{
    if(session){
      await signOut()
    }
    
    const config = {
      headers: {
          "Accept" : "application/json",
          'Content-type' : "application/json"
      }
    }

      try{
        const response = await axios.post('/api/register', JSON.stringify(form) , config)
        
        setForm(form.username = '');
        setForm(form.password = '');
        setForm(form.email = '');
        
        if(response.data === "User found"){
          setValidation("User Exists")
        }
        if(response.data === "email exist"){
          setValidation("Emai exists")
        }
        if(response.data._id){
          router.push(`/details/${response.data._id}`)
        }

      }catch(error){
          console.log(error)
      }
      
     
      
  }


  const containerVariants ={
    hidden :{
       opacity : 0,
    },

    visible : {
        opacity : 1,
        transition : {delay : 0.5, duration : 1}
    },
    exit : {
      x : '-100vw',
      transition : {ease : 'easeInOut', duration : 0.5}

    }
}



  return (
    <Auth>
      <motion.div 
       className="container mx-auto px-4 h-full"
       variants = {containerVariants}
        initial = "hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">

                  <motion.button
                    whileHover={{ scale : 1.1, originX : 0, color : '#fe8112'}}
                    transition={{ type: 'spring', stiffness : 300}}
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                    Github
                  </motion.button>


                  <motion.button
                    whileHover={{ scale : 1.1, originX : 0, color : '#fe8112'}}
                    transition={{ type: 'spring', stiffness : 300}}
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </motion.button>



                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <div className="text-red-500 text-center mb-3 font-bold">
                  <medium>{validation}</medium>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      value={form.username || ''}
                      name= 'username'
                      onChange={handleChange}

                    />
                  </div>

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
                      value={form.email || ''}
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
                      value={form.password || ''}
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
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
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
                      Create Account
                    </motion.button>
                  </div>

                 

                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Auth>
  );
}

Register.layout = Auth;
