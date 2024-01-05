import Link from "next/link";

const UserForm = (props) => {
  const {
    name,
    email,
    password,
    imgUrl,
    setName,
    setEmail,
    setPassword,
    setImgUrl,
    formSubmitHandler,
    register,
  } = props.data;
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="max-w-md w-11/12">
        <form className="w-full" onSubmit={formSubmitHandler}>
          <input
            className="w-full block bg-slate-900 mb-2 px-3 py-2 rounded outline-none"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full block bg-slate-900 mb-2 px-3 py-2 rounded outline-none"
            type="email"
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
          <input
            className="w-full block bg-slate-900 mb-2 px-3 py-2 rounded outline-none"
            type="text"
            placeholder="Image Url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <button className="w-full block bg-sky-950 py-2 px-3 rounded">
            {register ? "Sign up" : "Update"}
          </button>
        </form>
        {register && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <span>Already have an account?</span>
            <Link className="text-sky-700 underline" href="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;
