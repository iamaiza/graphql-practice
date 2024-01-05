import { CURRENT_USER } from "@/client&query";
import HeaderNavigation from "@/components/header";
import { useQuery } from "@apollo/client";
import Link from "next/link";

const ProfilePage = () => {
  const { data } = useQuery(CURRENT_USER);
  return (
    <>
      <HeaderNavigation />
      <div className="pt-32 px-32 text-center">
        {data?.me ? (
          <>
            <figure className="w-36 h-36 mx-auto overflow-hidden rounded-full">
              {data?.me.imgUrl ? (
                <img
                  className="w-full h-full object-cover"
                  src={data.me.imgUrl}
                  alt={data?.me.name}
                />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src="/images/user.png"
                  alt={data?.me.name}
                />
              )}
            </figure>
            <div className="font-semibold italic text-2xl mt-5">
              {data?.me.name}
            </div>
            <div className="text-lg mt-1 mb-5">{data?.me.email}</div>
            <Link href='/update-user' className="bg-sky-950 py-2 px-5 rounded">
              Update Profile
            </Link>
          </>
        ) : (
          <div className="text-xl">
            You're not authenticated.{" "}
            <Link className="text-sky-800 underline" href="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
