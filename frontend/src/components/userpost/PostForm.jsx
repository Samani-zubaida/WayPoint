const PostForm = ({
  title,
  setTitle,
  description,
  setDescription,
  place,
  setPlace,
  image,
  setImage,
  video,
  setVideo,
  onSubmit,
  loading,
  error,
  submitText,
}) => {

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, JPEG, PNG files are allowed");
      return;
    }

    setImage(file);
    setVideo(null);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only MP4, WEBM, MOV videos are allowed");
      return;
    }

    setVideo(file);
    setImage(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10 py-10
    bg-gradient-to-b from-sky-50 via-blue-50 to-indigo-100">

      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 items-center">

        {/* MEDIA PREVIEW */}
        <div className="flex justify-center">

          {!image && !video && (
            <div className="w-full h-[260px] sm:h-[320px] lg:h-[420px]
            border-2 border-dashed border-gray-300 rounded-2xl
            flex items-center justify-center text-gray-400
            bg-white/40">
              Media Preview
            </div>
          )}

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-full max-h-[420px] object-cover rounded-2xl shadow-xl"
            />
          )}

          {video && (
            <video
              controls
              className="w-full max-h-[420px] rounded-2xl shadow-xl"
            >
              <source src={URL.createObjectURL(video)} />
            </video>
          )}

        </div>

        {/* FORM */}
        <form
          onSubmit={onSubmit}
          className="bg-white/80 backdrop-blur-lg border border-white/40
          shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 space-y-6"
        >

          {/* TITLE */}
          <h1 className="text-2xl sm:text-3xl font-bold
          bg-gradient-to-r from-sky-500 to-indigo-600
          bg-clip-text text-transparent">
            {submitText}
          </h1>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* POST TITLE */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Post Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Amazing sunset in Bali"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300
              focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your experience..."
              className="mt-2 w-full px-4 py-3 h-28 rounded-xl border border-gray-300
              focus:ring-2 focus:ring-sky-400 outline-none resize-none"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Place Location
            </label>

            <input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Paris, France"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300
              focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* MEDIA UPLOAD */}
          <div className="space-y-4">

            <label className="text-sm font-semibold text-gray-600">
              Upload Media
            </label>

            <div className="grid sm:grid-cols-2 gap-4">

              <div className="border-2 border-dashed border-gray-300
              rounded-xl p-4 text-center hover:border-sky-400 transition">

                <p className="text-xs text-gray-500 mb-2">
                  Upload Image / PDF
                </p>

                <input
                  type="file"
                  accept=".pdf,.jpeg,.jpg,.png"
                  onChange={handleImageChange}
                  disabled={!!video}
                  className="text-sm"
                />

                {image && (
                  <p className="text-green-500 text-xs mt-2">
                    Image selected
                  </p>
                )}
              </div>

              <div className="border-2 border-dashed border-gray-300
              rounded-xl p-4 text-center hover:border-indigo-400 transition">

                <p className="text-xs text-gray-500 mb-2">
                  Upload Video
                </p>

                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  disabled={!!image}
                  className="text-sm"
                />

                {video && (
                  <p className="text-green-500 text-xs mt-2">
                    Video selected
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-sky-500 to-indigo-600
            hover:scale-[1.02] transition shadow-lg
            disabled:opacity-60"
          >
            {loading ? "Saving..." : submitText}
          </button>

        </form>

      </div>

    </div>
  );
};

export default PostForm;