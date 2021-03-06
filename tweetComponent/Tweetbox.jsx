import { HeartIcon, UserIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import ImageViewer from "./imageViewer";

function Tweetbox({ session, data }) {
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);

  // the useEffect getting the user Id
  useEffect(() => {
    const show = async () => {
      try {
        const res = await axios.get(`/api/register/${data?.userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    show();
  }, [data]);

  return (
    <div className="border-2 rounded-lg w-96 lg:w-80 mt-10 mb-10 ">
      {/* Image */}

      {data?.picture && (
        <div onClick={() => setOpen(true)} className="w-full cursor-pointer">
          <img
            src={data.picture}
            className="rounded-lg w-full max-h-40 object-cover cursor-pointer"
          />
        </div>
      )}

      {open && (
        <ImageViewer setOpen={setOpen} open={open} image={data?.picture} />
      )}

      {/* The header */}
      <div className="flex justify-between px-4 mt-2 ">
        <div className="flex space-x-2">
          <img
            src={
              user?.profilePicture
                ? user?.profilePicture
                : "/image/noAvatar.png"
            }
            className="h-10 w-10 object-cover rounded-full"
          />

          <div className="h-6">
            <span className="text-sm font-bold bg-">
              {user?.username}
              <br />
            </span>
            <span className="text-xs font-light">{user?.email}</span>
          </div>
        </div>

        <img src="/twitter.svg" />
      </div>

      {/* The written body */}
      <div className="text-sm font-semibold py-1 px-4 space-x-2">
        {data?.text}
      </div>

      {/* The date */}
      <div className="text-sm font-semibold text-gray-500 px-4 space-x-2">
        <Moment parse="YYYY-MM-DD HH:mm" className="text-xs text-gray-600">
          {data?.date}
        </Moment>
      </div>

      {/* The footer of the card */}
      <div className="flex px-4 py-2 h-11 space-x-2 items-center">
        <div className="flex items-center">
          <div>
            <HeartIcon className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h1 className="text-xs font-extralight">22</h1>
          </div>
        </div>

        <div className="flex items-center">
          <div>
            <UserIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xs font-extralight">{`see ${user?.username} other Tweets`}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweetbox;
