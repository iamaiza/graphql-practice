const PostForm = (props) => {
  const {
    title,
    content,
    imgUrl,
    status,
    setTitle,
    setContent,
    setStatus,
    setImgUrl,
    formSubmitHandler,
  } = props.data;
  return (
    <div className="px-32 h-dvh w-full flex items-center justify-center">
      <div className="max-w-lg w-full">
        <form className="w-full" onSubmit={formSubmitHandler}>
          <input
            className="w-full block bg-slate-900 py-2 px-3 mb-2 rounded outline-none"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full block bg-slate-900 py-2 px-3 mb-2 rounded outline-none"
            type="text"
            placeholder="Content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            className="w-full block bg-slate-900 py-2 px-3 mb-2 rounded outline-none"
            type="text"
            placeholder="Image Url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <select
            className="w-full block bg-slate-900 py-2 px-3 mb-2 rounded outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <button className="w-full block bg-sky-950 py-2 px-3 mb-2 rounded">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
