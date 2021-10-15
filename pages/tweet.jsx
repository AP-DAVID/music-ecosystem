import Admin from "../components/Admin"
import {signOut, getSession } from "next-auth/client"
import Tweetbox from "../components/Tweetbox"
import { Icon } from 'semantic-ui-react'
import { useState } from "react"
import Profiletweet from "../components/Profiletweet"
import TweetModal from "../tweetComponent/tweetModal"
import { useRouter } from 'next/router';

function tweet({session, data}) {

   const [change, setChange] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const router = useRouter();



  const refreshData = () => {
    router.replace(router.asPath);
  }

    return (
        <Admin session={session} userPicture={session.user.profilePicture} userName={session.user.username}>


            <div>
                <h1>Tweets</h1>
                

                <div className="flex cursor-pointer items-center align-middle h-12 bg-gray-100 w-96 rounded-r-full rounded-l-full border-2">
                    <div onClick={()=> setChange(false)}  className={`flex cursor-pointer h-full w-1/2 justify-center rounded-r-full rounded-l-full items-center align-middle ${!change ? "shadow-md bg-gray-900 " : "bg-gray-100"}`}>
                      <h2 className={`text-md cursor-pointer ${!change? "text-white" : "text-black"} font-medium`}>Feeds</h2>
                    </div>
                    <div onClick={() => setChange(true)} className={`flex cursor-pointer rounded-r-full rounded-l-full h-full w-1/2 justify-center items-center align-middle ${change ? "shadow-md bg-gray-900" : "bg-gray-100"}`}>
                       <h2 className={`text-md cursor-pointer ${change? "text-white" : "text-black"} font-medium`}>Profile</h2>
                    </div>
                </div>

               {!change ? ( <div className="sm:px-5  my-10 sm:mr:10 justify-items-stretch sm:space-x-3 sm:grid md:grid:cols-2 lg:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
                  
                  
              {typeof data !== 'undefined' && data.length === 0 ? 
                  
                  (
                    <h1 className="text-gray-500 text-center mt-16">follow a user to view their tweets</h1>
                  ):
                  

                
                  data?.map((content) =>
                      
                      (

                         <Tweetbox data={content} session={session}/>
                         
                      )

                  )
  
                    
                     
                  
                    
                    
              }
              

                </div>) : (<Profiletweet data={data} session={session}/>)}

            </div>



            <div onClick={() => setShowModal(true)} className="px-2 py-2 rounded-full  cursor-pointer fixed p-14 bottom-8 right-6 space-y-2 text-align group">
                  <div className="invisible group-hover:visible  "><h1 className="text-sm text-gray-500 font-md">tweet</h1></div>
                  <div><Icon className="hover:animate-spin" circular inverted color='teal' name='twitter'  size='big'/></div>
            </div>


            {showModal && (<TweetModal setShowModal={setShowModal} refreshData={refreshData} session={session}/>)}

        </Admin>
    )
}

export async function getServerSideProps(ctx) {

  const session = await getSession(ctx);

  const res = await fetch(`https://musco.herokuapp.com/api/tweet/${session.user._id}`)
  const dataa = await res.json()
  const data = dataa.reverse();



    return {
      props: {
        session,
        data,
      }
    }
  }
  

export default tweet
