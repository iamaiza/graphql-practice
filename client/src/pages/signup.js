import Link from "next/link";
import { useEffect, useState } from "react";
import { SIGN_USER } from "@/client&query";
import { useMutation } from "@apollo/client";
import cookies from "../../cookie";
import { useRouter } from "next/router";
import UserForm from "@/components/user-form";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [signupUserMutation] = useMutation(SIGN_USER);
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false)
  useEffect(() => {
    if (hasToken) {
      router.push('/')
    }
  }, [hasToken])

  const signupUserHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        email === "" ||
        !email.includes("@") ||
        name === "" ||
        password === "" ||
        password.length < 6
      ) {
        alert("Please fill all the fields");
        return;
      }

      const { data } = await signupUserMutation({
        variables: {
          data: {
            name,
            email,
            password,
            imgUrl,
          },
        },
      });
      cookies.set("auth-token", data.signupUser.token, { path: "/" });
      setHasToken(true)
      setName("");
      setEmail("");
      setPassword("");
      setImgUrl("");
    } catch (error) {
      console.log(error);
    }
  };

  const props = {
    name,
    email,
    password,
    imgUrl,
    setName,
    setEmail,
    setPassword,
    setImgUrl,
    formSubmitHandler: signupUserHandler,
    register: true
  }

  return (
    <UserForm data={props} />
  );
};

export default SignupPage;
