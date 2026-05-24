import PostCard from "./PostCard";

const PostGrid = ({ posts }) => {

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">
          No posts yet
        </h2>
      </div>
    );
  }

  return (

    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-6
      "
    >

      {posts.map((post) => (

        <PostCard key={post._id} post={post}/>

      ))}

    </div>

  );
};

export default PostGrid;