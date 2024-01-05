import { CURRENT_USER, DELETE_POST, MY_POSTS } from "@/client&query";
import HeaderNavigation from "@/components/header";
import Icons from "@/components/icons";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyPosts = () => {
  const { data: user } = useQuery(CURRENT_USER);
  const { data } = useQuery(MY_POSTS);
  console.log(data);
  const router = useRouter();
  const posts = data?.myPosts;
  const [deletePostMutation] = useMutation(DELETE_POST);

  const switchToUpdatePostHandler = (id) => {
    router.push({
      pathname: "/post/update-post",
      query: { id },
    });
  };

  const removeFromDOM = (id) => {
    const post = document.getElementById(id);
    if (post) post.remove();
  };
  const deletePostHandler = async (id) => {
    await deletePostMutation({
      variables: {
        id: id,
      },
    }).then(() => {
      removeFromDOM(id);
    });
  };

  return (
    <>
      <HeaderNavigation />
      <div className="pt-36 px-32">
        {user?.me ? (
          <ul>
            {posts && posts.length !== 0 ? (
              posts.map((post) => (
                <li
                  className="flex items-center gap-11 mb-7 p-5 shadow-sm shadow-slate-900"
                  key={post?.id}
                  id={post?.id}
                >
                  <figure className="h-56 w-96">
                    <img
                      className="w-full h-full object-cover"
                      src={post?.imgUrl}
                    />
                  </figure>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex-1 text-2xl font-semibold">
                        {post?.title}
                      </div>
                      <div
                        className={`mt-1 italic capitalize ${
                          post?.status === "public"
                            ? "text-green-600"
                            : "text-rose-500"
                        }`}
                      >
                        {post?.status}
                      </div>
                    </div>
                    <div className="mt-7 mb-2">
                      {post?.content.substr(0, 250)}
                      <Link href={`/post/${post?.id}`} className="text-sky-800">
                        {" "}
                        Read more...
                      </Link>
                    </div>
                    <Icons
                      id={post?.id}
                      updateHandler={switchToUpdatePostHandler}
                      deleteHandler={deletePostHandler}
                    />
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center flex items-center justify-center gap-2 text-xl">
                You've not created any post.
                <Link className="text-sky-800 underline" href="/createPost">
                  Create post
                </Link>
              </div>
            )}
          </ul>
        ) : (
          <div className="text-xl text-center">
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

export default MyPosts;
