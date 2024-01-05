import { SINGLE_POST, UPDATE_POST } from "@/client&query";
import PostForm from "@/components/post-form";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UpdatePost = () => {
    const router = useRouter();
    const { data } = useQuery(SINGLE_POST, {
        variables: {
            id: router.query.id
        }
    })
    const post = data?.post
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [status, setStatus] = useState("");
    const [updatePostMutation] = useMutation(UPDATE_POST);

    useEffect(() => {
        setTitle(post?.title || "")
        setContent(post?.content || "")
        setImgUrl(post?.imgUrl || "")
        setStatus(post?.status || "")
    }, [post])
    
    const updatePostHandler = async(e) => {
        e.preventDefault();
        try {
            if (title === "" || content === "" || imgUrl === "") {
                alert("Invalid input");
                return;
            }
            const { data } = await updatePostMutation({
                variables: {
                    id: post?.id,
                    data: {
                        title,
                        content,
                        imgUrl,
                        status,
                    }
                }
            });
            console.log(data);
            setTitle("");
            setContent("");
            setImgUrl("");
            setStatus("");
            router.push("/myPosts");
        } catch (error) {
            console.log(error);
        }
    }

    const props = {
        title,
        content,
        imgUrl,
        status,
        setTitle,
        setContent,
        setImgUrl,
        setStatus,
        formSubmitHandler: updatePostHandler,
        create: false
    }

    return (
        <PostForm data={props} />
    )
}

export default UpdatePost;