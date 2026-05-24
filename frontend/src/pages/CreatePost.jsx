import { useContext } from "react";
import { PostContext } from "../Context/postContext.jsx";
import PostForm from "../components/userpost/PostForm.jsx";

const CreatePost = () => {
  const {
    title, setTitle,
    description, setDescription,
    place, setPlace,
    image, setImage,
    video, setVideo,
    createPost,
    loading, error,
  } = useContext(PostContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("place", place);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    createPost(formData);
  };

  return (
    <PostForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      place={place}
      setPlace={setPlace}
      image={image}
      setImage={setImage}
      video={video}
      setVideo={setVideo}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      submitText="Create Post"
    />
  );
};

export default CreatePost;
