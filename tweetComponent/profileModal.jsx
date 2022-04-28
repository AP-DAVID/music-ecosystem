import { useSession } from "next-auth/client";

function ProfileModal({ setShowModal }) {
  const [session, loading] = useSession();
  return (
    <>
      <div className="justify-center h-screen w-screen items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-2/3 my-auto mx-auto max-w-full">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Edit Profile</h3>
            </div>
            {/*body*/}

            <img
              src={session?.user?.profilePicture}
              className="ml-2 mt-2  h-20 w-20 object-cover rounded-full cursor-pointer"
            />
            
            {/* form to take credentials of the user */}
            <form className="h-full w-full ml-6 sm:px-5 my-10 sm:mr:10 justify-items-stretch sm:space-x-1 sm:grid md:grid:cols-2 lg:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
              <div>
                <h4 className="text-base text-gray-500">Username</h4>

                <input
                  type="text"
                  className="h-16 w-54 rounded-full bg-gray-200 shadow-md "
                  value={session?.user?.username}
                />
              </div>

              <div>
                <h4 className="text-base text-gray-500">Contact</h4>

                <input
                  type="number"
                  className="h-16 bg-gray-200 shadow-md  w-54 rounded-full "
                  value={session?.user?.phonenumber}
                />
              </div>

              <div>
                <h4 className="text-base text-gray-500">Email</h4>

                <input
                  type="email"
                  className="h-16 bg-gray-200 shadow-md  w-54 rounded-full "
                  value={session?.user?.email}
                />
              </div>

              <div>
                <h4 className="text-base text-gray-500">Age</h4>

                <input
                  type="text"
                  className="h-16 bg-gray-200 shadow-md  w-54 rounded-full "
                  value={session?.user?.age}
                />
              </div>

              <div>
                <h4 className="text-base text-gray-500">State</h4>

                <input
                  type="text"
                  className="h-16 bg-gray-200 shadow-md  w-54 rounded-full "
                />
              </div>

              <div>
                <h4 className="text-base text-gray-500">Country</h4>

                <input
                  type="text"
                  className="h-16 bg-gray-200 shadow-md  w-54 rounded-full "
                />
              </div>
            </form>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="shadow-lg text-red-500 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ProfileModal;
