import Admin from "../components/Admin"
import {signOut, getSession, useSession } from "next-auth/client"
import Tweetbox from "../tweetComponent/Tweetbox"
import { Icon } from 'semantic-ui-react'
import { useEffect, useState } from "react"
import Profiletweet from "../tweetComponent/Profiletweet"
import TweetModal from "../tweetComponent/tweetModal"
import { useRouter } from 'next/router';
import Oops from "../search/openModal"
import axios from "axios"
import {RefreshIcon} from "@heroicons/react/outline"

function tweet() {

   const [change, setChange] = useState(false);
   const [data, setData] = useState();
   const [session, loading] = useSession();
   const [spin, setSpin] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const router = useRouter();



   useEffect(() => {
     
     const datta = async() => {

      const res = await axios.get(`/api/tweet/${session?.user?._id}`)
      
      setData(res.data.reverse());
      
     }

     datta();
     
   },[session, router])


   if(loading){
    return (
        
      <div class="w-full h-full  fixed block top-0 left-0 bg-white opacity-75 z-50">
                      <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css" integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM=" crossorigin="anonymous" />
                      <span class="text-blue-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{top : "50%"}} 
                      >
                          <i class="fab fa-twitter fa-spin fa-5x"></i>
                          {/* <DotsCircleHorizontalIcon className="h-40 w-40 animate-spin" /> */}
                      </span>
      </div>
    )
  }
  
  
    if (!session && !loading){
      return (
          <main>
              <Oops />
          </main>
      )
    }



  const refreshData = () => {
    router.replace(router.asPath);
  }

  const refreshNow = async() => {
    setSpin(true)
    await router.replace(router.asPath);
    setSpin(false);
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

                <RefreshIcon onClick={refreshNow} className={`h-7 ml-3 mt-3 w-7 text-right ${spin? "animate-spin" : "animate-none"} text-blue-500`}/>

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

// export async function getStaticProps(ctx) {

//   const session = await getSession(ctx);

//   const res = await fetch(`https://muscotest5a.vercel.app/api/tweet/${session.user._id}`)
//   const dataa = await res.json()
//   const data = dataa.reverse();



//     return {
//       props: {
//         session,
//         data,
//       }
//     }
//   }
  

export default tweet
