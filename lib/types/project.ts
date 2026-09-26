export interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  video?: string;
  github: string;
  demo: string;
  tech: string[];
  featured: boolean;
  order: number;
  featuredOrder?: 1 | 2 | 3 | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  video?: string;
  github: string;
  demo: string;
  tech: string[];
  featured?: boolean;
  order?: number;
  featuredOrder?: 1 | 2 | 3 | null;
}

/** Legacy shape used by static seed data */
export interface LegacyProject {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image?: string[];
  images?: string[];
  github: string;
  demo: string;
  tech: string[];
  video?: string;
  featured?: boolean;
  order?: number;
  featuredOrder?: 1 | 2 | 3 | null;
}

export function toProjectMedia(project: Pick<Project, "images" | "video">) {
  const images = (project.images ?? []).filter(Boolean);
  return { images, video: project.video };
}

/** Normalize API/legacy project for UI components */
export function normalizeProject(
  project:
    | Project
    | LegacyProject
    | (LegacyProject & { _id?: string })
    | (ProjectInput & { id?: number | string; _id?: string })
) {
  const images =
    "images" in project && Array.isArray(project.images)
      ? project.images
      : "image" in project && Array.isArray(project.image)
        ? project.image
        : [];

  const id =
    "_id" in project && project._id
      ? String(project._id)
      : "id" in project
        ? String(project.id)
        : "";

  return {
    id,
    title: project.title,
    description: project.description,
    longDescription: project.longDescription,
    images,
    video: project.video,
    github: project.github,
    demo: project.demo,
    tech: project.tech,
    featured: "featured" in project ? project.featured : true,
    order: "order" in project ? project.order : 0,
    featuredOrder:
      "featuredOrder" in project ? (project.featuredOrder ?? null) : null,
  };
}

export type NormalizedProject = ReturnType<typeof normalizeProject>;
