import { SignOut } from "@/components/buttons/sign-out";
import { auth } from "@/lib/auth";
// import Image from "next/image";
import { redirect } from "next/navigation";

const HomePage = async () => {

  const session = await auth()
  if (!session) redirect('/sign-in')

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>
        <div className="flex justify-center items-center gap-2">
          {/* <div>
            <img src={session.user?.image} alt="profile-image" width={50} height={50} className="rounded-full" />
          </div> */}
          <p className="font-medium">{session.user?.email}</p>

        </div>

      </div>

      <SignOut />
    </>
  );
};

export default HomePage;
