import {LocationMarkerIcon} from "@heroicons/react/outline"
import { useState } from "react"
import Profilebox from "./Profilebox"

function Profiletweet({session, data}) {
    const [change, setChange] = useState(false)


    return (
        <div>
            <div className="flex justify-between px-7 mt-5 items-start py-7 border-2 shadow-lg rounded-lg">
                <div>
                   
                   <div className=" flex justify-between w-full items-center">
                        <img src={session.user.profilePicture} alt="Profile picture" className="cursor-pointer h-20 w-20 rounded-full mt-5 object-cover" /><br/>
                        <div className="">
                             <h1 className="border-2 hover:text-green-600 text-blue-600 w-full cursor-pointer rounded-l-full rounded-r-full  px-2 py-2 text-base text-center align-baseline">Edit profile</h1>
                        </div>
                   </div>
                  
                  
                   <span className="text-sm font-bold -mt-4">{session.user.username}</span><br/>
                   <span className="font-extralight text-gray-600 text-xs">@{session.user.email}</span><br/>
                   <span className="text-sm font-semibold ml-5 p-5">{session.user.description ? session.user.description : "A musco User"}</span>
                   <br />

                   <span className="font-extralight text-gray-600 mt-1 text-xs flex items-center">
                     <div><LocationMarkerIcon className="h-4 w-4 "/></div>
                     <div><h1 className="font-extralight text-gray-600 text-xs">London, United Kingdom</h1></div>
                   </span>

                   <br />

                   <div className="flex items-center space-x-3">
                     <div><h1 className="text-extralight text-gray-600 text-xs"><span className="font-semibold text-black text-sm">{session.user.following.length}</span> Following</h1></div>
                     <div><h1 className="text-extralight text-gray-600 text-xs"><span className="font-semibold text-black text-sm">{session.user.followers.length}</span> Followers</h1></div>
                  
                   </div>
                </div>

              
            </div>


            <div className="flex flex-col justify between px-7 mt-3 border-2 shadow-lg rounded-lg">
                <div className="border-b-2 h-8 flex items-center w-full">
                    <div className="w-1/2 text-center ">
                       <h1 onClick={() => setChange(false)} className={`text-base font-semibold h-full ${!change && "text-blue-500"} cursor-pointer`}>Tweets</h1>
                   </div>
                    <div className="w-1/2 text-center">
                      <h1 onClick={() => setChange(true)} className={`text-base font-semibold cursor-pointer ${change && "text-blue-500"}`}>Media</h1>
                    </div>
                </div>

                <div>
                    {
                        data.map((content) => (
                            <Profilebox data={content} session={session} />
                        ))
                    }
                    
                   
                </div>
                

            </div>
        </div>
    )
}

export default Profiletweet
