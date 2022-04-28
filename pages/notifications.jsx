import Admin from "../components/Admin.js";
import { signOut, getSession } from "next-auth/client";

function notifications({ session }) {
  return (
    <Admin
      session={session}
      userPicture={session.user.profilePicture}
      userName={session.user.username}
    >
      <div>
        <h1>Notifications</h1>
      </div>
    </Admin>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}

export default notifications;
