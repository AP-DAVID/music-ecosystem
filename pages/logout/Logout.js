import React, {useEffect} from "react"
import {signOut, useSession} from "next-auth/client";
import  { useRouter }  from 'next/router'


const Logout= () => {
    const [session, loading] = useSession();
    const router = useRouter()
    
    useEffect(() =>{
        
        router.push('/');
    }, session)

    return ( 

        <div>
           
        {
           session && signOut()
           
         }


        </div>
     )
}
 
export default Logout