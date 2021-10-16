// import Image from "next/image"
import {CameraIcon} from "@heroicons/react/outline"
import { Input } from 'antd';
import { Image } from 'semantic-ui-react'
import { useState } from "react";
import axios from "axios";

const { TextArea } = Input;

function TweetModal({setShowModal, session, refreshData}) {


    const url = "https://api.cloudinary.com/v1_1/blytetech/image/upload"
    const preset = "dufgjx3z"
    const [image, setImage] = useState("");
    const [imagee, setImagee] = useState("");
    const [valid, setValid] = useState(false);
    const [message, setMessage] = useState("");

    const [form, setForm] = useState(
        {
            userId: session?.user?._id, 
            picture : "", 
            music : "",
            text : "",
        
      }
    )

    const handleChange =(e) => {
        setMessage("");
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }


const handleSubmit = async() => {

        if(form.text === ""){
            setMessage("please enter text")
            return

        }

        else{   

        
        if(imagee != ""){

            try{
              
                setValid(true)

                var fd = new FormData();
                fd.append("upload_preset", preset);
                fd.append("file", imagee);
                const config2 = {
                headers: { "X-Requested-With": "XMLHttpRequest" },
                };
            
            
                const res = await axios.post(url, fd, config2)
                        
                await setForm(form.picture = res.data.secure_url);
                const imageUrl = await res.data.secure_url;
                
                await setForm({...form, picture : imageUrl});
            
            }catch(error){
                setValid(false)
                setMessage("invalid image type")
                console.log(error)
            }
        }


        try{
            setValid(true);
            const config = {
                headers: {
                    "Accept" : "application/json",
                    'Content-type' : "application/json"
                }
              }
       
            
            try{
                const response = await axios.post(`/api/tweet`, form, config)
                console.log(response)
                refreshData();
                setValid(false);
                setShowModal(false)
                
                
            }catch(error){
                setMessage("Music Tweet not sent")
                setValid(false)
                console.log(error)
            }


        }catch(error){
            setMessage("Music Tweet not sent")
            setValid(false);
            console.log(error)
        }

       }

    }

    return (
        <>
        <div
          className="justify-center h-screen w-screen items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative sm:w-2/3 my-auto mx-auto max-w-full">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
               
               <div><h3 className="text-3xl font-semibold">
                      Tweet
                   </h3></div> 

                <div><img src="/twitter.svg" className="h-14 w-14"  /></div>
                
              </div>
              {/*body*/}

                 <div><h1 className="text-center text-red-400 text-base ">{message}</h1> </div>
                
                 <div className="flex space-x-5 items-center">

                    <div className=" items-center ">
                        <div> 
                            
                            <img src={session?.user?.profilePicture} className="ml-2 mt-2 mb-2 h-16 w-16 object-cover rounded-full cursor-pointer"/>
                        </div>
                        <div>
                            <h1 className="ml-4 text-sm text-blue-500">{session?.user?.username}</h1>
                        </div>
                    </div>

                    <div>
                        <TextArea 
                           showCount 
                           cols="100"
                           maxLength={250} 
                           allowClear 
                           className="w-full placeholder-gray-400"
                           placeholder="What are you thinking?"
                           style={{width: "100%"}}
                           bordered={false}
                           required
                           value= {form.text}
                           onChange={handleChange}
                           name= 'text'
                           autoSize=  {{ minRows: 2, maxRows: 7 }}
                        />

                        <div className="flex flex-col space-y-4 align-middle text-center">
                            {image && (<Image className="object-contain w-96 rounded-xl max-h-52" src={image ? image :  'https://react.semantic-ui.com/images/wireframe/square-image.png'} bordered size='small' />)}
                            
                        </div>
                        
                    </div>
                
                 </div>  
                  

               
                   
              
              {/*footer*/}
              <div className="flex w-full items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                
                <div className="w-10 ">
                       <label
                            className="items-center">
                                <CameraIcon className="h-10 text-blue-500 hover:text-red-500 w-10 cursor-pointer"/>
                                <input type='file' name='image' accept="image/*"
                                
                                onChange = {(e) => {
                                    setImagee(event.target.files[0]);
                                    setImage(URL.createObjectURL(event.target.files[0]))
                                }} className="invisible" />
                      </label>
                </div>

               



                <div className="flex items-center space-x-2">

                    <button
                    className="text-red-500 h-11 bg-gray-200 rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                    >
                    Close
                    </button>
                    
                    {/* tweet button */}
                    <button type="button" onClick={handleSubmit} className="shadow-lg bg-white text-red-500 flex items-center active:bg-emerald-600 font-bold uppercase text-sm px-3 py-3 sm:px-6 sm:py-3 rounded hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        <div> <h1 className="text-blue-500 text-sm">Tweet</h1> </div>
                        <div> 
                                <img
                                    src="/twitter.svg" className=" h-8 w-8 sm:h-10 sm:w-10" 
                                
                                />
                        </div>

                    </button>




                </div>
            
              </div>

              <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css" integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM=" crossorigin="anonymous" />


                {valid &&  <div class="w-full h-full  fixed block top-0 left-0 bg-white opacity-75 z-50">
                                <span class="text-blue-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{top : "50%"}} 
                                >
                                    <i class="fab fa-twitter fa-spin fa-5x"></i>
                                    {/* <DotsCircleHorizontalIcon className="h-40 w-40 animate-spin" /> */}
                                </span>
                </div>}


            </div>

            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    )
}



export default TweetModal
