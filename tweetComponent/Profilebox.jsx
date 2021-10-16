import {ChevronDownIcon, ChatIcon, ArrowsExpandIcon, ChevronUpIcon, HeartIcon} from "@heroicons/react/outline"
import { Content } from "antd/lib/layout/layout";
import { useState } from "react";
import ImageViewer from "./imageViewer";

function Profilebox({session, data}) {
    const [change, setChange] = useState(true);
    const [open, setOpen] = useState(false)
    return (
        <div>
             
        <div className="flex border-b-2 mt-2">

             <img src={session.user.profilePicture} alt="Profile picture" className="cursor pointer h-14 w-14 rounded-full object-cover mr-3" />
             <div className="flex flex-col">
                <div className="flex justify-between items-center w-full">
                    <div>
                        <h1 className="text-sm font-bold">{session.user.username} <span className="text-gray-500 text-xs">@{session.user.email} . 4m</span></h1>
                    </div>

                    <div>
                        {change && (<ChevronDownIcon onClick={() => setChange(false)}  className="h-5 text-blue-600 w-5 cursor-pointer"/>)}

                        {!change && (<ChevronUpIcon onClick={() => setChange(true)}  className="h-5 text-blue-600 ml-5 w-5 cursor-pointer"/>)}
                    </div>
                </div>

                {change && (
                    <div className="mb-5 mt-3">
                      <h1 className="text-sm font-semibold">{data?.text}</h1>
                      
                      {data?.picture && (<img src={data?.picture} onClick={() => setOpen(true)} className="h-48 w-96 cursor-pointer py-2 object-cover rounded-xl"/>)}
                    
                    </div>
                 )}

            {open && (
                <ImageViewer setOpen={setOpen} open={open} image={data?.picture} />
            )}
             
                <div className="flex justify-around w-full mb-3 mr-6">
                    <ChatIcon className="h-5 w-5 text-blue-500"/>

                    <ArrowsExpandIcon className="h-5 w-5 text-blue-500" />

                    <HeartIcon className="h-5 w-5 text-red-500" />


                </div>
             </div>
             

        </div>

        </div>
    )
}

export default Profilebox
