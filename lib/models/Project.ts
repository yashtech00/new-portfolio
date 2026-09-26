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
    featuredOrder: {
      type: Number,
      enum: [1, 2, 3, null],
      default: null,
    },
  },
  { timestamps: true }
);

ProjectSchema.index(
  { featuredOrder: 1 },
  {
    unique: true,
    partialFilterExpression: { featuredOrder: { $type: "number" } },
  }
);

export const Project =
  models.Project || mongoose.model("Project", ProjectSchema);
