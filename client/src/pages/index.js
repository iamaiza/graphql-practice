import Blogs from "@/components/blogs";
import HeaderNavigation from "@/components/header";
import { CURRENT_USER } from "@/client&query";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { data } = useQuery(CURRENT_USER);
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(data?.me)
  }, [data])

  return (
    <div className="mb-5">
      <HeaderNavigation />
      {user ? (
        <Blogs />
      ) : (
        <div className="pt-36 text-center px-32 text-xl flex items-center justify-center gap-1.5">
          <span className="text-slate-300">
            You're not authorized. Please login first.
          </span>
          <Link className="text-sky-700 underline" href="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
