import { CREATE_COMMENT, CURRENT_USER, DELETE_COMMENT, SINGLE_POST } from "@/client&query";
import CommentInput from "@/components/comment-input";
import CommentList from "@/components/comment-list";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PostDetailPage = () => {
  const router = useRouter();
  const { data: user } = useQuery(CURRENT_USER);
  const { data } = useQuery(SINGLE_POST, {
    variables: {
      id: router.query.slug,
    },
  });
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT);
  const post = data?.post;
  const [allComment, setAllComment] = useState([]);
  const deleteCommentHandler = async (id) => {
    const { data } = await deleteCommentMutation({
      variables: {
        id: id,
      },
    });

    console.log(data);
    setAllComment(allComment.filter((comment) => comment?.id !== id));
  };

  return (
    <div className="mt-24 mb-5 px-32">
      <div className="flex justify-center items-center gap-5">
        <div className="w-[35rem]">
          <h1 className="font-semibold text-4xl text-slate-200 mb-5">
            {post?.title}
          </h1>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-slate-300">Author:</span>
            <span className="text-slate-400 font-semibold">
              {post?.author.name}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-slate-300">Created At:</span>
            <span className="text-slate-400 font-semibold">
              {post?.createdAt.split("T")[0]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Status:</span>
            <span className="text-slate-400 font-semibold capitalize">
              {post?.status}
            </span>
          </div>
        </div>
        <figure className="h-72 w-[27rem]">
          <img className="w-full h-full object-cover" src={post?.imgUrl} />
        </figure>
      </div>
      <p className="mt-10 text-justify">{post?.content}</p>
      {post?.status === "public" && (
        <>
          {user?.me ? (
            <div className="mt-10">
              <h2 className="font-semibold text-3xl mb-5">Comments</h2>
              <CommentInput
                user={user}
                setAllComment={setAllComment}
                post={post}
              />
              {allComment && allComment.length !== 0 ? (
                allComment.map((comment) => (
                  <CommentList
                    comment={comment}
                    deleteCommentHandler={deleteCommentHandler}
                  />
                ))
              ) : (
                <div className="text-slate-400 text-lg">
                  There's no comment on this post.
                </div>
              )}
            </div>
          ) : (
            <div className="text-xl flex items-center gap-3">
              {post?.status}
              You cann't comment because you're not logged in.{" "}
              <Link className="text-sky-800 underline" href="/login">
                Login
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostDetailPage;
