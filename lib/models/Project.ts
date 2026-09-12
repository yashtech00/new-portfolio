import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    images: { type: [String], default: [] },
    video: { type: String, default: "" },
    github: { type: String, default: "#" },
    demo: { type: String, default: "#" },
    tech: { type: [String], default: [] },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project =
  models.Project || mongoose.model("Project", ProjectSchema);
