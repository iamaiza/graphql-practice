import { CREATE_COMMENT } from "@/client&query";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

const CommentInput = ({ post, setAllComment, user }) => {
  const [comment, setComment] = useState("");
  const [createCommentMutation] = useMutation(CREATE_COMMENT);
  useEffect(() => {
    if (post) {
      setAllComment(post?.comments);
    }
  }, [post]);

  const createCommentHandler = async (e) => {
    e.preventDefault();

    try {
      if (comment === "") {
        alert("Invalid input");
        return;
      }

      const { data } = await createCommentMutation({
        variables: {
          data: {
            text: comment,
            author: user?.me.id,
            postId: post?.id,
          },
        },
      });
      const newComment = data?.createComment;
      setAllComment((prevComment) => [...prevComment, newComment]);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-3 mb-8">
      <textarea
        className="flex-1 py-2 px-3 outline-none bg-slate-900 rounded"
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="bg-sky-900 hover:bg-sky-950 py-2 px-5 rounded"
        onClick={createCommentHandler}
      >
        Submit
      </button>
    </div>
  );
};

export default CommentInput;
