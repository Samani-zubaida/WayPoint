import React, { useState, useEffect, useMemo, useCallback } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Camera,
  Film,
  UploadCloud,
  Sparkles,
  Compass,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  Mountain,
  Globe2,
  Trees,
  Building2,
  UtensilsCrossed,
  Landmark,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "Mountains",
    label: "Mountains",
    icon: Mountain,
    color: "bg-sky-100 text-sky-700",
  },
  {
    id: "Beaches",
    label: "Beaches",
    icon: Globe2,
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    id: "Nature",
    label: "Nature",
    icon: Trees,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "Cities",
    label: "Cities",
    icon: Building2,
    color: "bg-slate-100 text-slate-700",
  },
  {
    id: "Food",
    label: "Food",
    icon: UtensilsCrossed,
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "Historical",
    label: "Historical",
    icon: Landmark,
    color: "bg-yellow-100 text-yellow-700",
  },
];

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const floatingBlob = {
  animate: {
    x: [0, 15, 0],
    y: [0, -30, 0],
    transition: {
      repeat: Infinity,
      duration: 9,
      ease: "easeInOut",
    },
  },
};

const revokeUrls = (urls) => {
  urls.forEach((url) => URL.revokeObjectURL(url));
};

function FloatingInput({
  label,
  icon: Icon,
  as = "input",
  className = "",
  ...props
}) {
  const Component = as;

  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />
      )}

      <Component
        {...props}
        placeholder=" "
        className={`
          peer
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-white/70
          backdrop-blur-xl
          outline-none
          transition-all
          duration-300
          focus:border-sky-400
          focus:ring-4
          focus:ring-sky-200
          ${Icon ? "pl-12" : "pl-5"}
          ${as === "textarea" ? "h-36 pt-7 pb-4" : "h-16 pt-6"}
          ${className}
        `}
      />

      <label
        className={`
          absolute
          top-5
          pointer-events-none
          text-slate-500
          transition-all
          duration-300
          ${Icon ? "left-12" : "left-5"}

          peer-focus:-translate-y-3
          peer-focus:text-xs
          peer-focus:text-sky-600

          peer-[:not(:placeholder-shown)]:-translate-y-3
          peer-[:not(:placeholder-shown)]:text-xs
        `}
      >
        {label}
      </label>
    </div>
  );
}

export default function PostForm({
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

  submitText = "Publish Journey",
}) {
  /* ==========================================================
     STATES
  ========================================================== */

  const [currentImage, setCurrentImage] = useState(0);

  const [dragging, setDragging] = useState(false);

  const [shake, setShake] = useState(false);

  const [toast, setToast] = useState("");

  /* ==========================================================
     IMAGE URLS
  ========================================================== */

  const imageUrls = useMemo(() => {
    return images.map((file) => URL.createObjectURL(file));
  }, [images]);

  useEffect(() => {
    return () => {
      revokeUrls(imageUrls);
    };
  }, [imageUrls]);

  /* ==========================================================
     VIDEO URL
  ========================================================== */

  const videoUrl = useMemo(() => {
    return video ? URL.createObjectURL(video) : null;
  }, [video]);

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  /* ==========================================================
     RESET CAROUSEL
  ========================================================== */

  useEffect(() => {
    if (currentImage >= images.length) {
      setCurrentImage(0);
    }
  }, [images, currentImage]);

  /* ==========================================================
     AUTO HIDE TOAST
  ========================================================== */

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  /* ==========================================================
     ADD IMAGES
  ========================================================== */

  const addImages = useCallback(
    (files) => {
      const selected = Array.from(files || []);

      if (!selected.length) return;

      const valid = selected.filter((file) => IMAGE_TYPES.includes(file.type));

      if (!valid.length) {
        setToast("Only JPG and PNG images are allowed.");
        return;
      }

      setImages((prev) => {
        const merged = [...prev, ...valid];

        if (merged.length > 10) {
          setToast("Maximum 10 images allowed.");
          return prev;
        }

        return merged;
      });

      setVideo(null);
    },
    [setImages, setVideo],
  );

  /* ==========================================================
     ADD VIDEO
  ========================================================== */

  const addVideo = useCallback(
    (files) => {
      const file = files?.[0];

      if (!file) return;

      if (!VIDEO_TYPES.includes(file.type)) {
        setToast("Only MP4, WEBM and MOV videos are allowed.");
        return;
      }

      setVideo(file);

      setImages([]);
    },
    [setVideo, setImages],
  );

  /* ==========================================================
     REMOVE IMAGE
  ========================================================== */

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /* ==========================================================
     DRAG & DROP
  ========================================================== */

  const dragProps = (type) => ({
    onDragOver: (e) => {
      e.preventDefault();
      setDragging(type);
    },

    onDragLeave: () => {
      setDragging(false);
    },

    onDrop: (e) => {
      e.preventDefault();

      setDragging(false);

      if (type === "image") {
        addImages(e.dataTransfer.files);
      } else {
        addVideo(e.dataTransfer.files);
      }
    },
  });

  /* ==========================================================
     SUBMIT
  ========================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !place.trim() || !category) {
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 500);

      setToast("Please complete all required fields.");

      return;
    }

    onSubmit(e);
  };

  /* ==========================================================
     JSX STARTS HERE
  ========================================================== */

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F5F9FF]">
      {/* ================================================= */}
      {/* Background */}
      {/* ================================================= */}

      <motion.div
        variants={floatingBlob}
        animate="animate"
        className="
      absolute
      -top-44
      -left-44
      h-[520px]
      w-[520px]
      rounded-full
      bg-sky-300/25
      blur-[150px]
    "
      />

      <motion.div
        variants={floatingBlob}
        animate="animate"
        transition={{ delay: 2 }}
        className="
      absolute
      top-44
      -right-36
      h-[420px]
      w-[420px]
      rounded-full
      bg-cyan-300/25
      blur-[140px]
    "
      />

      <motion.div
        variants={floatingBlob}
        animate="animate"
        transition={{ delay: 4 }}
        className="
      absolute
      -bottom-36
      left-1/3
      h-[520px]
      w-[520px]
      rounded-full
      bg-blue-200/30
      blur-[160px]
    "
      />

      <div
        className="
      absolute
      inset-0
      opacity-[0.04]
      bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]
      bg-[size:50px_50px]
    "
      />

      {/* ================================================= */}
      {/* Layout */}
      {/* ================================================= */}

      <div
        className="
    relative
    z-10
    h-[calc(100vh-90px)]
    max-w-[1800px]
    mx-auto
    px-10
    py-6
  "
      >
        <motion.div
          className="
grid
h-full
xl:grid-cols-[1.3fr_0.9fr]
gap-8
"
        >
          {/* ================================================= */}
          {/* LEFT HERO CARD */}
          {/* ================================================= */}

          <motion.div
            variants={fadeLeft}
            className="
          overflow-hidden
          rounded-[34px]
          border
          border-white
          bg-white/70
          backdrop-blur-3xl
          shadow-[0_30px_80px_rgba(0,0,0,.08)]
        "
          >
            {/* Hero Image */}

            <div className="relative h-[620px] overflow-hidden">
              <AnimatePresence mode="wait">
                {images.length > 0 ? (
                  <motion.img
                    key={currentImage}
                    src={imageUrls[currentImage]}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : video ? (
                  <motion.video
                    key="video"
                    controls
                    autoPlay
                    muted
                    loop
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src={videoUrl} />
                  </motion.video>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="
                  absolute
                  inset-0
                  flex
                  flex-col
                  items-center
                  justify-center
                  bg-gradient-to-br
                  from-sky-100
                  via-white
                  to-cyan-100
                "
                  >
                    <Compass size={80} className="text-sky-400" />

                    <h2 className="mt-8 text-4xl font-black text-slate-800">
                      Your Journey Starts Here
                    </h2>

                    <p className="mt-3 text-lg text-slate-500">
                      Upload photos or videos
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Floating Badge */}

              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="
              absolute
              left-8
              top-8
              flex
              items-center
              gap-2
              rounded-full
              bg-white/90
              px-5
              py-3
              backdrop-blur-xl
              shadow-lg
            "
              >
                <Sparkles size={18} className="text-sky-500" />

                <span className="font-semibold">WayPoint Studio</span>
              </motion.div>

              {/* Category */}

              {category && (
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="
                absolute
                right-8
                top-8
                rounded-full
                bg-sky-500
                px-5
                py-2
                font-semibold
                text-white
                shadow-xl
              "
                >
                  {category}
                </motion.div>
              )}

              {/* Bottom */}

              <div className="absolute bottom-10 left-10 right-10">
                <motion.h1
                  layout
                  className="
                text-5xl
                font-black
                leading-tight
                text-white
              "
                >
                  {title || "Untitled Journey"}
                </motion.h1>

                <motion.div
                  layout
                  className="mt-4 flex items-center gap-2 text-lg text-white/90"
                >
                  <MapPin size={18} />
                  {place || "Unknown Destination"}
                </motion.div>

                <motion.p
                  layout
                  className="mt-5 max-w-xl leading-8 text-white/80"
                >
                  {description ||
                    "Share your unforgettable travel memories with explorers around the world."}
                </motion.p>
              </div>
            </div>

            {/* ================================================= */}
            {/* Carousel */}
            {/* ================================================= */}

            {images.length > 1 && (
              <div className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImage(
                        (currentImage - 1 + images.length) % images.length,
                      )
                    }
                    className="h-12 w-12 rounded-full bg-slate-100 hover:bg-slate-200"
                  >
                    <ChevronLeft className="mx-auto" />
                  </button>

                  <div className="flex flex-1 gap-3">
                    {imageUrls.map((img, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`
                      relative
                      h-24
                      flex-1
                      overflow-hidden
                      rounded-2xl
                      transition
                      ${currentImage === index ? "ring-4 ring-sky-400" : ""}
                    `}
                      >
                        <img src={img} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImage((currentImage + 1) % images.length)
                    }
                    className="h-12 w-12 rounded-full bg-slate-100 hover:bg-slate-200"
                  >
                    <ChevronRight className="mx-auto" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* ================================================= */}
          {/* RIGHT PANEL STARTS IN PART 4 */}
          {/* ================================================= */}

          <motion.div
            variants={fadeRight}
            className="
h-full
overflow-y-auto
rounded-[34px]
bg-white/70
backdrop-blur-3xl
border
border-white
shadow-[0_30px_80px_rgba(0,0,0,.08)]
"
          >
            <div
              className={`
    rounded-[34px]
    border
    border-white
    bg-white/70
    backdrop-blur-3xl
    shadow-[0_30px_80px_rgba(0,0,0,.08)]
    overflow-hidden
    ${shake ? "animate-pulse" : ""}
  `}
            >
              {/* ======================= */}
              {/* Header */}
              {/* ======================= */}

              <div className="border-b border-slate-200 px-10 py-8">
                <h2 className="text-3xl font-black text-slate-800">
                  Create Journey
                </h2>

                <p className="mt-2 text-slate-500">
                  Share your travel memories with everyone.
                </p>
              </div>

              {/* ======================= */}
              {/* Error */}
              {/* ======================= */}

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="
          mx-10
          mt-8
          rounded-2xl
          border
          border-red-200
          bg-red-50
          px-5
          py-4
          text-red-600
        "
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ======================= */}
              {/* Inputs */}
              {/* ======================= */}

              <div className="space-y-7 p-10">
                <FloatingInput
                  label="Journey Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <FloatingInput
                  as="textarea"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <FloatingInput
                  icon={MapPin}
                  label="Destination"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </div>

              {/* ======================= */}
              {/* Categories */}
              {/* ======================= */}

              <div className="px-10 pb-10">
                <h3 className="mb-5 text-lg font-bold text-slate-700">
                  Category
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {CATEGORIES.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCategory(item.id)}
                        className={`
              rounded-2xl
              border
              p-5
              text-left
              transition

              ${
                category === item.id
                  ? "border-sky-500 bg-sky-50"
                  : "border-slate-200 bg-white hover:border-sky-300"
              }
            `}
                      >
                        <div
                          className={`
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                ${item.color}
              `}
                        >
                          <Icon size={28} />
                        </div>

                        <h4 className="font-bold">{item.label}</h4>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ======================= */}
              {/* Upload */}
              {/* ======================= */}

              <div className="px-10 pb-10">
                <h3 className="mb-5 text-lg font-bold">Upload Media</h3>

                <div className="grid grid-cols-2 gap-5">
                  <label
                    {...dragProps("image")}
                    className={`
          cursor-pointer
          rounded-3xl
          border-2
          border-dashed
          p-8
          text-center
          transition

          ${
            dragging === "image"
              ? "border-sky-500 bg-sky-50"
              : "border-slate-300"
          }

          ${video ? "pointer-events-none opacity-40" : ""}
        `}
                  >
                    <Camera size={42} className="mx-auto text-sky-500" />

                    <h4 className="mt-5 font-bold">Upload Photos</h4>

                    <p className="mt-2 text-sm text-slate-500">
                      JPG • PNG • Max 10
                    </p>

                    <input
                      hidden
                      multiple
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => addImages(e.target.files)}
                    />
                  </label>

                  <label
                    {...dragProps("video")}
                    className={`
          cursor-pointer
          rounded-3xl
          border-2
          border-dashed
          p-8
          text-center
          transition

          ${
            dragging === "video"
              ? "border-purple-500 bg-purple-50"
              : "border-slate-300"
          }

          ${images.length ? "pointer-events-none opacity-40" : ""}
        `}
                  >
                    <Film size={42} className="mx-auto text-purple-500" />

                    <h4 className="mt-5 font-bold">Upload Video</h4>

                    <p className="mt-2 text-sm text-slate-500">
                      MP4 • WEBM • MOV
                    </p>

                    <input
                      hidden
                      type="file"
                      accept="video/*"
                      onChange={(e) => addVideo(e.target.files)}
                    />
                  </label>
                </div>
              </div>

              {/* ======================= */}
              {/* Image Preview */}
              {/* ======================= */}

              {images.length > 0 && (
                <div className="px-10 pb-10">
                  <h3 className="mb-4 font-bold">Selected Photos</h3>

                  <div className="grid grid-cols-4 gap-3">
                    {imageUrls.map((img, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-2xl"
                      >
                        <img src={img} className="h-28 w-full object-cover" />

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="
                absolute
                right-2
                top-2
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-black/60
                text-white
              "
                        >
                          <X size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ======================= */}
              {/* Video Preview */}
              {/* ======================= */}

              {video && (
                <div className="px-10 pb-10">
                  <h3 className="mb-4 font-bold">Selected Video</h3>

                  <video controls className="w-full rounded-3xl">
                    <source src={videoUrl} />
                  </video>
                </div>
              )}

              {/* ======================= */}
              {/* Submit */}
              {/* ======================= */}

              <div className="border-t border-slate-200 p-10">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  disabled={loading}
                  type="submit"
                  className="
        w-full
        rounded-2xl
        bg-sky-500
        py-5
        text-lg
        font-bold
        text-white
        shadow-xl
        transition
        hover:bg-sky-600
        disabled:opacity-50
      "
                >
                  {loading ? "Publishing..." : submitText}
                </motion.button>
              </div>
            </div>

            {/* ======================= */}
            {/* Toast */}
            {/* ======================= */}

            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  className="
        fixed
        bottom-8
        right-8
        z-50
        rounded-2xl
        bg-slate-900
        px-6
        py-4
        text-white
        shadow-2xl
      "
                >
                  {toast}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
