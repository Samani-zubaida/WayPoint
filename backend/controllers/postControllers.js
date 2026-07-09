import cloudinary from "../lib/config.js";
import UserPost from "../models/UserPost.js";

/* =========================
   CREATE POST
========================= */
export const createPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      title,
      description,
      location,
      category,
    } = req.body;

    if (!title || !description || !location || !category) {
      return res.status(400).json({
        message: "Title, description, location and category are required.",
      });
    }

    let images = [];
    let video = null;

    // Multiple images
    if (req.files?.images) {
      for (const file of req.files.images) {
        const upload =
          await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString(
              "base64"
            )}`,
            {
              folder: "posts/images",
            }
          );

        images.push(upload.secure_url);
      }
    }

    // Single video
    if (req.files?.video) {
      const file = req.files.video[0];

      const upload =
        await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString(
            "base64"
          )}`,
          {
            folder: "posts/videos",
            resource_type: "video",
          }
        );

      video = upload.secure_url;
    }

    if (!images.length && !video) {
      return res.status(400).json({
        message: "Upload image or video",
      });
    }

    const post = await UserPost.create({
      user: userId,
      title,
      description,
      location: JSON.parse(location),
      category,
      images,
      video,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
/* =========================
   DELETE POST
========================= */
export const deletePost = async (req, res) => {
  try {
    const post = await UserPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // 🧹 Delete media from Cloudinary
    for (const img of post.images) {
      const publicId = img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`posts/images/${publicId}`);
    }

    if (post.video) {
      const publicId = post.video.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`posts/videos/${publicId}`, {
        resource_type: "video",
      });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET ALL POSTS
========================= */
export const getAllPost = async (req, res) => {
  try {
    const posts = await UserPost.find()
      .populate("user", "email name")
      .sort({ createdAt: -1 });

    console.log("this log is fro, getAll post", posts);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

/* =========================
   GET POSTS BY USER
========================= */
export const getPostById = async (req, res) => {
  try {
    const posts = await UserPost.find({ user: req.params.userId })
      .populate("user", "email name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user posts" });
  }
};

/* =========================
   GET SINGLE POST (WITH COMMENTS)
========================= */
// GET SINGLE POST WITH COMMENTS + LIKES
export const getSinglePost = async (req, res) => {
  try {
    const post = await UserPost.findById(req.params.postId)
      .populate("user", "_id email name")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name email",
        },
      });

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


/* =========================
   UPDATE POST
========================= */
export const updatePost = async (req, res) => {
  try {
    const post = await UserPost.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (
      post.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const {
      title,
      description,
      location,
      category,
    } = req.body;

    if (title) post.title = title;
    if (description)
      post.description = description;

    if (location) {
      post.location =
        JSON.parse(location);
    }

    if (category) {
      post.category = category;
    }

    if (req.files?.images) {
      post.images = [];

      for (const file of req.files.images) {
        const upload =
          await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString(
              "base64"
            )}`,
            {
              folder: "posts/images",
            }
          );

        post.images.push(
          upload.secure_url
        );
      }

      post.video = null;
    }

    if (req.files?.video) {
      const file = req.files.video[0];

      const upload =
        await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString(
            "base64"
          )}`,
          {
            folder: "posts/videos",
            resource_type: "video",
          }
        );

      post.video =
        upload.secure_url;

      post.images = [];
    }

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
export const toggleLikePost = async (req, res) => {
  try {
    const post = await UserPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user._id.toString();

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
