import { useMutation, useQuery } from "@apollo/client";
import Icons from "./icons";
import { CURRENT_USER, DELETE_COMMENT, UPDATE_COMMENT } from "@/client&query";
import { useState } from "react";

const CommentList = ({ comment, deleteCommentHandler }) => {
  const { data } = useQuery(CURRENT_USER);
  // const [deleteCommentMutation] = useMutation(DELETE_COMMENT);
  const user = data?.me;
  const [commentId, setCommentId] = useState(null);
  const [show, setShow] = useState(false);
  const [updateComment, setUpdateComment] = useState(comment?.text);
  const [updateCommentMutation] = useMutation(UPDATE_COMMENT);
  const [updatedComment, setUpdatedComment] = useState(comment?.text);
  const showInput = async () => {
    setCommentId(comment?.id);
    setShow(!show);
  };

  const updateCommentHandler = async (e) => {
    e.preventDefault();

    if (updateComment === "") {
      alert("Invalid input");
      return;
    }
    const { data } = await updateCommentMutation({
      variables: {
        id: comment?.id,
        data: {
          text: updateComment,
        },
      },
    });

    console.log(data);
    setUpdatedComment(data?.updateComment?.text);
    setUpdateComment("");
    setShow(false);
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-5 mb-7">
          <figure className="w-11 h-11 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                comment?.author?.imgUrl
                  ? comment?.author?.imgUrl
                  : "/images/user.png"
              }
            />
          </figure>
          <div>
            <p className="text-lg text-slate-200">
              {updatedComment ? updatedComment : comment?.text}
            </p>
            <small className="text-slate-400 italic text-sm">
              {comment?.author?.name}
            </small>
          </div>
        </div>
        <div className="pt-1">
          {user?.name === comment?.author?.name && (
            <Icons
              id={comment?.id}
              updateHandler={showInput}
              deleteHandler={deleteCommentHandler}
            />
          )}
        </div>
      </div>

      {show && commentId === comment?.id && (
        <div className="flex items-center gap-3 mb-8 pl-10">
          <textarea
            className="flex-1 py-2 px-3 outline-none bg-slate-900 rounded"
            placeholder="Comment"
            value={updateComment}
            onChange={(e) => setUpdateComment(e.target.value)}
          />
          <button
            className="bg-sky-900 hover:bg-sky-950 py-2 px-5 rounded"
            onClick={updateCommentHandler}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentList;
