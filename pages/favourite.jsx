import Admin from "../components/Admin.js";
import {signOut, getSession } from "next-auth/client";

function favourite({session}) {
    return (
        <Admin session={session} userPicture={session.user.profilePicture} userName={session.user.username}>

            <div>
                 <h1>Favourites</h1>
           </div>

        </Admin>
    )
}



export async function getServerSideProps(ctx) {
    return {
      props: {
        session: await getSession(ctx)
      }
    }
  }
  

export default favourite
