import { CREATE_POST, CURRENT_USER } from "@/client&query";
import PostForm from "@/components/post-form";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [status, setStatus] = useState("public");
  const router = useRouter();
  const { data: user } = useQuery(CURRENT_USER);
  const [createPostMutation] = useMutation(CREATE_POST);

  const createPostHandler = async (e) => {
    e.preventDefault();
    try {
      if (title === "" || content === "" || imgUrl === "") {
        alert("Invalid input");
        return;
      }
      const userId = user?.me.id;
      const { data } = await createPostMutation({
        variables: {
          data: {
            title,
            content,
            imgUrl,
            status,
            createdAt: new Date().toISOString(),
            author: userId,
          },
        },
      });
      console.log(data);
      setTitle("");
      setContent("");
      setImgUrl("");
      setStatus("");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const props = {
    title,
    content,
    imgUrl,
    status,
    setTitle,
    setContent,
    setImgUrl,
    setStatus,
    formSubmitHandler: createPostHandler,
    create: true
  }

  return (
    <Fragment>
      {user?.me && (
        <PostForm data={props} />
      )}
    </Fragment>
  );
};

export default CreatePostPage;
