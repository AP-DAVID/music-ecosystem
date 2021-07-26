import bg5 from '../../assets/img/bg5.jpg'
import { Input } from 'antd';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {signOut, useSession } from "next-auth/client";
import axios from 'axios';
import {getUser} from '../../fetchdata/registerFetcher'
import {motion} from 'framer-motion'

import { Form, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';


const Details = () => {

    const { TextArea } = Input;
    const router = useRouter()
    const[session, loading] = useSession();

    const { id } = router.query
     const {register, isLoading, isError} = getUser(id)
    const [form, setForm] = useState(
      {
      userId : id,
      description: '', 
      phonenumber: 0,
      age: 0,
      
    }
  )

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
 

  const handleChange =(e) => {
    setForm({
        ...form,
        [e.target.name] : e.target.value
    })
}

const handleSubmit = async(e) =>{
  setForm(form.userId = id);
  const config = {
    headers: {
        "Accept" : "application/json",
        'Content-type' : "application/json"
    }
  }
  console.log(form);

    try{
      const response = await axios.put(`/api/register/${id}`, form, config)
      if(!session){
        router.push('/logins/login')
      }
      if(session){
        router.push('/logins/login')
      }

     
      
    }catch(error){
        console.log(error)
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


    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 70,
          }}
        >
          <Option value="86">+234</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>
    );

    



    return (
      <div className="bg-cover bg-center ..." style={{height:"100vh", backgroundImage:`url(${bg5})` }}>
         <motion.div 
          className="container mx-auto px-4 h-full"
          variants = {containerVariants}
          initial = "hidden"
          animate="visible"
          exit="exit"
         >
          <div className="flex content-center items-center justify-center h-full">
        
          <div className="w-full lg:w-4/12 px-4">
           
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Form name="register"
                      
                >
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      style={{color : "#ffff"}}
                    >
                      Enter your description/bio
                    </label>

                    <TextArea
                      className=" placeholder-black-300 text-black-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      showCount
                      maxLength={100} 
                      style={{width : "100%"}}
                      value= {form.description}
                      onChange={handleChange}
                      name= 'description'
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      style={{color : "#ffff"}}
                    >
                      enter your Phone number
                    </label>
                    <Input
                      type="number"
                      addonBefore={prefixSelector}
                      placeholder="Phone number"
                      name ='phonenumber'
                      onChange={handleChange}
                     
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      style={{color : "#ffff"}}
                    >
                      enter your Age
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-black-300 text-black-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Age"
                      name= 'age'
                      onChange={handleChange}
                     
                    />
                  </div>

                  <div className="text-center mt-6">
                    <motion.button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSubmit}
                      whileHover = {{
                        scale : 1.0,
                        textShadow : "0px 0px 8px rgb(255,255,255)",
                      }}
                      transition = {{type : "spring", stiffness : 300}}
                    >
                      Submit
                    </motion.button>

                  </div>
                 
      
                  
                </Form>
                </div>
                
              </div>
            </div>
       
            </motion.div>
          </div>

    );
}
 
export default Details;