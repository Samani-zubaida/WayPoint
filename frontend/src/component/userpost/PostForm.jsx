import { useState } from "react";

const PostForm = ({
  title,
  setTitle,
  description,
  setDescription,
  place,
  setPlace,
  category,
  setCategory,
  images,
  setImages,
  video,
  setVideo,
  onSubmit,
  loading,
  error,
  submitText,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (!validFiles.length) {
      alert("Only JPG, JPEG and PNG images are allowed");
      return;
    }

    setImages((prev) => {
      const allImages = [...prev, ...validFiles];

      if (allImages.length > 10) {
        alert("Maximum 10 images allowed");
        return prev;
      }

      return allImages;
    });

    setVideo(null);
  };
  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only MP4, WEBM and MOV videos are allowed");
      return;
    }

    setVideo(file);
    setImages([]);
  };

  return (
    <div className="h-[calc(100vh-96px)] overflow-hidden bg-[#f5f4f2] relative">
      {/* Background */}
      <div className="absolute top-16 left-16 h-80 w-80 rounded-full bg-stone-300/20 blur-3xl" />
      <div className="absolute bottom-10 right-16 h-96 w-96 rounded-full bg-zinc-300/20 blur-3xl" />

      <div className="relative z-10 h-full max-w-7xl mx-auto p-6">
        <div className="h-full grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          {/* PREVIEW */}
          <div
            className="
              hidden lg:flex
              bg-white/45
              backdrop-blur-2xl
              border border-white/40
              rounded-[32px]
              shadow-[0_8px_40px_rgba(0,0,0,0.06)]
              p-6
              items-center
              justify-center
              overflow-hidden
            "
          >
            {images.length === 0 && !video && (
              <div
                className="
                  h-full w-full
                  rounded-[24px]
                  border border-dashed border-stone-300
                  bg-white/30
                  flex flex-col items-center justify-center
                  text-stone-400
                "
              >
                <div className="text-7xl mb-4">🌎</div>

                <p className="text-xl font-medium">Media Preview</p>

                <p className="mt-2 text-sm">Upload photos or videos.</p>
              </div>
            )}

            {images.length > 0 && (
              <div className="relative h-full w-full">
                <img
                  src={URL.createObjectURL(images[currentImage])}
                  alt=""
                  className="
                    h-full
                    w-full
                    object-contain
                    rounded-[24px]
                  "
                />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentImage(
                          (prev) => (prev - 1 + images.length) % images.length,
                        )
                      }
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        h-10
                        w-10
                        rounded-full
                        bg-black/30
                        text-white
                        backdrop-blur-md
                      "
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentImage((prev) => (prev + 1) % images.length)
                      }
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        h-10
                        w-10
                        rounded-full
                        bg-black/30
                        text-white
                        backdrop-blur-md
                      "
                    >
                      →
                    </button>

                    {/* Dots */}
                    <div
                      className="
                        absolute
                        bottom-5
                        left-1/2
                        -translate-x-1/2
                        flex gap-2
                      "
                    >
                      {images.map((_, i) => (
                        <div
                          key={i}
                          className={`
                            h-2 rounded-full transition-all duration-300
                            ${
                              i === currentImage
                                ? "w-6 bg-white"
                                : "w-2 bg-white/50"
                            }
                          `}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {video && (
              <video
                controls
                className="
                  h-full
                  w-full
                  object-contain
                  rounded-[24px]
                "
              >
                <source src={URL.createObjectURL(video)} />
              </video>
            )}
          </div>

          {/* FORM */}
          <form
            onSubmit={onSubmit}
            className="
              bg-white/45
              backdrop-blur-2xl
              border border-white/40
              rounded-[32px]
              shadow-[0_8px_40px_rgba(0,0,0,0.06)]
              p-8 lg:p-10
              overflow-y-auto
            "
          >
            <h1 className="text-4xl font-semibold tracking-tight text-stone-900">
              {submitText}
            </h1>

            <p className="mt-2 text-stone-500">
              Share your favorite places and experiences.
            </p>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-500">
                {error}
              </div>
            )}

            <div className="mt-10 space-y-7">
              {/* TITLE */}
              <div>
                <label className="text-sm font-medium text-stone-600">
                  Title
                </label>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Amazing sunset in Bali"
                  className="
                    mt-2
                    w-full
                    rounded-2xl
                    border border-stone-200
                    bg-white/50
                    px-5 py-3.5
                    text-stone-800
                    placeholder:text-stone-400
                    focus:outline-none
                    focus:ring-4
                    focus:ring-stone-200/50
                    focus:border-stone-400
                  "
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-medium text-stone-600">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell everyone about your experience..."
                  className="
                    mt-2
                    h-36
                    w-full
                    resize-none
                    rounded-2xl
                    border border-stone-200
                    bg-white/50
                    px-5 py-4
                    text-stone-800
                    placeholder:text-stone-400
                    focus:outline-none
                    focus:ring-4
                    focus:ring-stone-200/50
                    focus:border-stone-400
                  "
                />
              </div>

              {/* PLACE */}
              {/* PLACE */}
              <div>
                <label className="text-sm font-medium text-stone-600">
                  Place
                </label>

                <input
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Paris, France"
                  className="
      mt-2
      w-full
      rounded-2xl
      border border-stone-200
      bg-white/50
      px-5 py-3.5
      text-stone-800
      placeholder:text-stone-400
      focus:outline-none
      focus:ring-4
      focus:ring-stone-200/50
      focus:border-stone-400
    "
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm font-medium text-stone-600">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="
      mt-2
      w-full
      rounded-2xl
      border border-stone-200
      bg-white/50
      px-5 py-3.5
      text-stone-800
      focus:outline-none
      focus:ring-4
      focus:ring-stone-200/50
      focus:border-stone-400
    "
                >
                  <option value="">Select Category</option>

                  <option value="Mountains">🏔 Mountains</option>

                  <option value="Beaches">🏖 Beaches</option>

                  <option value="Nature">🌿 Nature</option>

                  <option value="Cities">🌆 Cities</option>

                  <option value="Food">🍜 Food</option>

                  <option value="Historical">🏛 Historical</option>
                </select>
              </div>

              {/* UPLOADS */}
              <div>
                <label className="text-sm font-medium text-stone-600">
                  Upload Media
                </label>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <label
                    className="
                      cursor-pointer
                      rounded-[24px]
                      border border-stone-200
                      bg-white/40
                      p-6
                      text-center
                      hover:bg-white/60
                      transition
                    "
                  >
                    <div className="text-4xl">📸</div>

                    <p className="mt-3 font-medium text-stone-700">Photos</p>

                    <p className="mt-1 text-xs text-stone-400">
                      Multiple images
                    </p>

                    {images.length > 0 && (
                      <p className="mt-3 text-xs text-stone-500">
                        {images.length} selected
                      </p>
                    )}

                    <input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png"
                      onChange={handleImageChange}
                      disabled={!!video}
                      className="hidden"
                    />
                  </label>

                  <label
                    className="
                      cursor-pointer
                      rounded-[24px]
                      border border-stone-200
                      bg-white/40
                      p-6
                      text-center
                      hover:bg-white/60
                      transition
                    "
                  >
                    <div className="text-4xl">🎥</div>

                    <p className="mt-3 font-medium text-stone-700">Video</p>

                    <p className="mt-1 text-xs text-stone-400">
                      MP4, WEBM, MOV
                    </p>

                    {video && (
                      <p className="mt-3 text-xs text-stone-500">
                        Video selected
                      </p>
                    )}

                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      disabled={images.length > 0}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <button
                disabled={loading}
                className="
                  w-full
                  rounded-2xl
                  bg-stone-900
                  py-4
                  text-white
                  font-medium
                  tracking-wide
                  transition
                  hover:bg-stone-800
                  hover:scale-[1.01]
                  disabled:opacity-50
                "
              >
                {loading ? "Saving..." : submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
