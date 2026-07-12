import { useContext } from "react";
import { PostContext } from "../Context/postContext.jsx";
import PostForm from "../component/userpost/PostForm.jsx";

const CreatePost = () => {
  
  const {
    title, setTitle,
    description, setDescription,
    place, setPlace,
    images, setImages,
    video, setVideo,
    category, setCategory,
    createPost,
    loading, error,
  } = useContext(PostContext);
  
const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("place", place);
  formData.append("category", category);
  images.forEach((img) => {
    formData.append("images", img);
  });

  if (video) {
    formData.append("video", video);
  }

  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  console.log({
  title,
  description,
  place,
  category,
  images,
  video,
});

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
      images={images}
      setImages={setImages}
      video={video}
      setVideo={setVideo} 
      category={category}
      setCategory={setCategory}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      submitText="Create Post"
    />
  );
};

export default CreatePost;
