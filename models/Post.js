import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

