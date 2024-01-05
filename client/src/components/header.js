import { CURRENT_USER, removeHeadersForLogout } from "@/client&query";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import cookies from "../../cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HeaderNavigation = () => {
  const { data } = useQuery(CURRENT_USER);
  const router = useRouter();
  const [hasToken, setHasToken] = useState(true)
  console.log(data);
  useEffect(() => {
    if (hasToken === false) {
      router.push('/login')
    }
  }, [hasToken])

  const logoutUserHandler = async (e) => {
    e.preventDefault();
    // router.push("/login");
    setHasToken(false)
    removeHeadersForLogout();
    cookies.remove("auth-token");
  };
  return (
    <header className="w-full h-fit fixed top-0 left-0 bg-slate-950">
      <div className="px-32 py-2 h-20 flex justify-between items-center gap-5">
        <Link href='/' className="font-semibold italic text-4xl">Blogs</Link>
        <ul className="flex items-center justify-center gap-5 text-lg w-1/2 ml-auto">
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          <li>
            <Link href='/myPosts'>Your Posts</Link>
          </li>
        </ul>
        {data?.me ? (
          <div className="flex items-center gap-3">
            <figure className="w-11 h-11 overflow-hidden rounded-full">
              {data?.me.imgUrl ? (
                <img
                  className="w-full h-full object-cover"
                  src={data?.me?.imgUrl}
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
            <Link className="w-fit bg-slate-800 hover:bg-slate-200 text-slate-200 hover:text-slate-900 px-3 py-1.5 text-center rounded" href="/createPost">Create Post</Link>
            <button
              className="bg-slate-300 hover:bg-slate-900 text-slate-900 hover:text-slate-200 px-3 py-1.5 text-center rounded"
              onClick={logoutUserHandler}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              className="w-24 bg-slate-800 hover:bg-slate-200 text-slate-200 hover:text-slate-900 px-3 py-1.5 text-center rounded"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="w-24 bg-slate-300 hover:bg-slate-900 text-slate-900 hover:text-slate-200 px-3 py-1.5 text-center rounded"
              href="/signup"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderNavigation;
