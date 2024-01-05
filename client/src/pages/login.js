import { LOGIN_USER } from "@/client&query";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import cookies from "../../cookie";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUserMutation] = useMutation(LOGIN_USER);
  const router = useRouter()
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    if (hasToken) {
      router.push('/')
    }
  }, [hasToken])
  const loginUserHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        email === "" ||
        !email.includes("@") ||
        password === "" ||
        password.length < 6
      ) {
        alert("Invalid input");
        return;
      }
      const { data } = await loginUserMutation({
        variables: {
          data: {
            email,
            password,
          },
        },
      });

      cookies.set("auth-token", data.loginUser.token, { path: "/" });
      setHasToken(true)
      setEmail("");
      setPassword("");
      // router.push('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="max-w-md w-11/12">
        <form className="w-full" onSubmit={loginUserHandler}>
          <input
            className="w-full block bg-slate-900 mb-2 px-3 py-2 rounded outline-none"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full block bg-slate-900 mb-2 px-3 py-2 rounded outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full block bg-sky-950 py-2 px-3 rounded">
            Login
          </button>
        </form>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span>Don't have an account yet?</span>
          <Link className="text-sky-700 underline" href="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
