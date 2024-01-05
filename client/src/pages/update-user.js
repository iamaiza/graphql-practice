import { CURRENT_USER, UPDATE_USER } from "@/client&query";
import UserForm from "@/components/user-form";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const UpdateUser = () => {
    const { data } = useQuery(CURRENT_USER)
    const me = data?.me
    const [name, setName] = useState(me?.name);
    const [email, setEmail] = useState(me?.email);
    const [password, setPassword] = useState(me?.password);
    const [imgUrl, setImgUrl] = useState(me?.imgUrl || "");
    const [updateUserMutation] = useMutation(UPDATE_USER, {
        variables: {
            id: me?.id
        }
    });
    const router = useRouter();
    const updateUserHandler = async (e) => {
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

            const { data } = await updateUserMutation({
                variables: {
                    data: {
                        name,
                        email,
                        password,
                        imgUrl,
                    },
                },
            });
            console.log(data);
            setName("");
            setEmail("");
            setPassword("");
            setImgUrl("");
            router.push("/profile");
        } catch (error) {
            console.log(error);
        }
    }
    const props = {
        name,
        email,
        password,
        imgUrl,
        setName,
        setEmail,
        setPassword,
        setImgUrl,
        formSubmitHandler: updateUserHandler,
        register: false
    }

    return (
        <UserForm data={props} />
    )
}

export default UpdateUser;