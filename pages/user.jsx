import Admin from "../components/Admin";
import { signOut, getSession } from "next-auth/client";

function user({ session }) {
  return (
    <Admin
      session={session}
      userPicture={session.user.profilePicture}
      userName={session.user.username}
    >
      <div>
        <h1>User</h1>
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

export default user;
