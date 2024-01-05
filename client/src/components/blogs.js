import { ALL_POSTS } from "@/client&query";
import { useQuery } from "@apollo/client";
import Link from "next/link";

const Blogs = () => {
  const { data } = useQuery(ALL_POSTS);
  console.log(data);

  return (
    <div className="pt-36">
      <div className="px-32">
        <h2 className="text-center mb-10 text-4xl font-semibold">All Posts</h2>
        {data?.posts && data?.posts.length !== 0 ? (
          <div className="grid 2xl:grid-cols-3 grid-cols-2 gap-x-5 gap-y-10">
            {data.posts.map((post) => (
              <div className="px-5" key={post?.id}>
                <figure className="w-full h-72">
                  <img
                    className="w-full h-full object-cover"
                    src={post.imgUrl}
                    alt={post.title}
                  />
                </figure>
                <h3 className="mt-5 mb-4 text-2xl font-semibold">
                  {post.title}
                </h3>
                <p className="mb-2">{post.content.substr(0, 191)}...</p>
                <div className="mb-7 text-sm italic text-slate-400">
                  {post?.author.name}
                </div>
                <Link
                  className="bg-slate-300 text-slate-800 py-2 px-3 rounded"
                  href={`/post/${post.id}`}
                >
                  Read more
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-2xl text-slate-300">
            No post available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
