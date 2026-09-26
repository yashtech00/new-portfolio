import mongoose from "mongoose";
import { uploadToR2 } from "../lib/r2.ts";

const rawProjectsData = [
  {
    title: "EchoLearnAI",
    description:
      "EnglishIQ is an AI-powered English learning platform that helps learners practice writing, get structured feedback, remember recurring mistakes, and track improvement over time.",
    longDescription: `EnglishIQ is an AI-powered English learning platform that helps learners practice writing, get structured feedback, remember recurring mistakes, and track improvement over time.

Features:
• AI writing practice with personalized prompts
• Async writing analysis powered by Google Gemini
• Mistake memory that stores recurring grammar, clarity, tone, spelling, and structure issues
• Detailed writing reports with score, feedback, suggestions, and mistake breakdowns
• Rewrite flow for improving an existing submission
• User onboarding profile for personalized learning
• XP, levels, streaks, recent activity, and progress tracking
• Cookie-based authentication with refresh tokens
• Google OAuth login
• Admin audit-log endpoint
• CSRF protection, rate limiting, request sanitization, and security headers`,
    rawImageUrls: [
      "https://media.licdn.com/dms/image/v2/D562DAQFavbvKJY79RA/profile-treasury-image-shrink_480_480/B56Z6DdU1IKcAU-/0/1780321964337?e=1791025200&v=beta&t=5jH6aREecboQwn0g_FH7nneMnz1Ckk0tpF-JXLcpbKI",
      "https://media.licdn.com/dms/image/v2/D562DAQEGA7uevuYjFw/profile-treasury-image-shrink_480_480/B56Z6DdUxvJMAY-/0/1780321963976?e=1791025200&v=beta&t=ObngnCpIMFvhbm0PWrH_SF9c9GuRoe-N3jkrMhfaVXw",
      "https://media.licdn.com/dms/image/v2/D562DAQEIzgp1kMonIg/profile-treasury-image-shrink_480_480/B56Z6DdUxTHcAU-/0/1780321964104?e=1791025200&v=beta&t=ebV_KxA7EyPIEXCHuYWIpO0QDPqgBKZghJkmPjhkXpM",
    ],
    video: "",
    github: "",
    demo: "",
    tech: ["Next.js", "Artificial Intelligence (AI)", "Google Gemini", "OAuth"],
    order: 0,
  },
  {
    title: "Prabo – Prediction Market & Event Trading Platform",
    description:
      "Built a full-stack prediction market platform where users can trade on real-world events with real-time odds and live updates.",
    longDescription: `Built a full-stack prediction market platform where users can trade on real-world events with real-time odds and live updates. The application supports secure user authentication, event creation and resolution, wallet balance tracking, and a complete trading flow with instant updates via WebSockets.

On the frontend, I developed a responsive and interactive UI using React 19, TypeScript, Tailwind CSS, and Radix UI, with smooth animations powered by Framer Motion and efficient server state handling using React Query. Real-time market changes are reflected instantly using WebSocket connections.

On the backend, I designed and implemented scalable REST APIs using Node.js, Express, and TypeScript, with MongoDB and Mongoose for data modeling. Implemented JWT-based authentication, secure password hashing with bcrypt, wallet and transaction management, and event lifecycle handling. Integrated Cloudinary for image uploads and optimized real-time communication for live trading updates.

This project demonstrates strong skills in full-stack development, real-time systems, API design, authentication, and scalable application architecture.`,
    rawImageUrls: [
      "https://media.licdn.com/dms/image/v2/D562DAQGUN6VIlkXwmw/profile-treasury-image-shrink_480_480/B56ZuIHlEOJMAQ-/0/1767515248301?e=1791025200&v=beta&t=5RhXbLHyV_8mpeFtezDRlcGQQkyQ39zzFP_sdkv8R4I",
    ],
    video:
      "https://drive.google.com/file/d/1Lho0sYlVQDiBJXxNkiXqXCIbHObghYVH/view?usp=sharing&usp=embed_facebook",
    github: "",
    demo: "",
    tech: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "WebSocket",
    ],
    order: 1,
  },
  {
    title: "🚀 CodePlus – Elevate Your Coding Skills!",
    description:
      "Platform to practice DSA with real-time code execution, online code editor, and analytics tracking.",
    longDescription: `✅ Diverse Challenges – Solve a wide range of data structures & algorithms problems.
💡 Sharpen Problem-Solving – Enhance coding proficiency with hands-on practice.
🔥 Challenging Exercises – Designed to push your logical thinking & efficiency.
🗣 Discuss & Learn – Engage with the community through the Discuss feature.
⚡ Boilerplate Generation – Problem seekers can add problem details on GitHub repo, and admins can generate code with one command.
🖥 Online Code Editor – Supports multiple programming languages for solving problems.
⚙️ Judge0 Integration – Real-time code compilation & execution for instant feedback.
🔍 Difficulty Levels – Categorized problems (Easy, Medium, Hard) to match your skill level.
📊 Submission History – Track and analyze your past submissions.

🛠 Tech Stack:
🔹 Next.js & React.js – Modern UI & seamless performance
🔹 Prisma & PostgreSQL – Scalable database management
🔹 Tailwind CSS & ShadCN – Beautiful, responsive design
🔹 NextAuth – Secure authentication
🔹 Judge0 API – Powerful online code compilation & execution`,
    rawImageUrls: [
      "https://media.licdn.com/dms/image/v2/D562DAQEn2kiOb_mgdg/profile-treasury-image-shrink_480_480/B56ZWtCt3XGUAM-/0/1742364926826?e=1791025200&v=beta&t=DY6orlJZZYOa6OAzYtE26G8xmzyYGOA0DjDvLE4626M",
      "https://media.licdn.com/dms/image/v2/D562DAQEqW9v8JguDvg/profile-treasury-image-shrink_480_480/B56ZWtAZTIGUAQ-/0/1742364317896?e=1791025200&v=beta&t=G3n1WQ17j35XR2LF6-bs5ig1OH8QVT_R9DxCjCMT8RY",
      "https://media.licdn.com/dms/image/v2/D562DAQFsszVAwKU2zg/profile-treasury-image-shrink_480_480/B56ZWs_32XGUAY-/0/1742364180673?e=1791025200&v=beta&t=uCy14TIermQDVlZa6AnPtVn3mG7trCNEcEKpQaZcCPY",
    ],
    video: "",
    github: "",
    demo: "",
    tech: [
      "Next.js",
      "React.js",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Judge0 API",
      "NextAuth",
    ],
    order: 2,
  },
  {
    title: "Medeum-Blog",
    description:
      "Dynamic blog website built using Hono.js and React.js where users can create, read, update, and delete blog posts with ease.",
    longDescription: `I built a dynamic blog website using Hono.js and React.js, where users can create, read, update, and delete blog posts with ease. This project helped me strengthen my understanding of full-stack development, backend logic, and RESTful API integration.

Key Features:
✅ User-friendly interface for creating and managing blog posts
✅ Secure and efficient CRUD operations
✅ Dynamic rendering with server-side logic
✅ Built with Honojs, Reactjs, Prisma, PostgreSQL and follows the MVC architecture`,
    rawImageUrls: [
      "https://media.licdn.com/dms/image/sync/v2/D5627AQFE34NBgK7Lew/articleshare-shrink_480/articleshare-shrink_480/0/1772641096059?e=1791025200&v=beta&t=5PPtqFYPn0_XucW-seWgJSngj6bsME0a5SN4EMDeAxw",
    ],
    video: "",
    github: "https://github.com/yashtech00/Medeum-blog",
    demo: "",
    tech: ["TypeScript", "Hono.js", "React.js", "Prisma", "PostgreSQL"],
    order: 3,
  },
  {
    title: "Night-Bites",
    description:
      "Revolutionizing food delivery with a tech-savvy approach, seamless ordering, and personalized cart powered by Swiggy API.",
    longDescription: `🚀 Introducing #FoodPlaza 🏰: Revolutionizing food delivery with a tech-savvy approach!
🍽️ Seamless ordering, user-friendly interface, and personalized Add to Cart feature.
🌐 Powered by Swiggy API for diverse restaurant options, all in a fully responsive design!`,
    rawImageUrls: [
      "https://media.licdn.com/dms/image/v2/D562DAQFfMbp9yPM8_A/profile-treasury-image-shrink_480_480/profile-treasury-image-shrink_480_480/0/1719378241874?e=1791025200&v=beta&t=VGqJV41eUr4vOROm8kaRIRFlGbllxMY5lCUuIMdA7Xw",
    ],
    video: "",
    github: "",
    demo: "",
    tech: ["Redux.js", "JavaScript", "React.js", "Swiggy API"],
    order: 4,
  },
  {
    title: "DesignHub Interior desginer Platform",
    description:
      "Full-stack interior designer marketplace built using the MERN stack that connects professional interior designers with clients.",
    longDescription: `DesignHub is a full-stack interior designer marketplace built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that connects professional interior designers with clients looking to design or renovate their spaces. The platform is designed to replicate real-world service-based hiring workflows with modern, scalable web technologies.

On DesignHub, interior designers can create detailed professional profiles showcasing their expertise, portfolio images, past projects, experience, pricing models, and availability. Designers can manage their profiles, update portfolios, and respond to client inquiries through a dedicated dashboard. This allows designers to build their personal brand and attract potential clients directly through the platform.

Clients can browse and search designers based on categories, location, budget, ratings, and design styles.`,
    rawImageUrls: [
      "https://media.licdn.com/dms/image/v2/D562DAQEAdbUHj5w1mA/profile-treasury-image-shrink_480_480/B56Zt9xdxMGsAM-/0/1767341679530?e=1791025200&v=beta&t=8g3qRaexB2-MkVpYbJZE_sHi-uCfMYi0zg2Q8RJz0vU",
    ],
    video:
      "https://drive.google.com/file/d/1HhwX_jd1MsIgLYeKOz-22-jnz2br9_tL/view?usp=sharing&usp=embed_facebook",
    github: "",
    demo: "",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    order: 5,
  },
  {
    title: "Dream AI-Powered Interior Design",
    description:
      "Full-stack interior design marketplace built using the MERN stack with AI-powered interior visualization and role-based onboarding.",
    longDescription: `Dream is a full-stack interior design marketplace built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that connects clients with professional interior designers through a modern, technology-driven platform. The application is designed to simulate real-world interior design hiring workflows while integrating AI and real-time communication features.

The platform supports role-based onboarding for both clients and designers. Designers can create detailed professional profiles, add portfolios, list design styles, pricing, experience, and availability. Clients, on the other hand, can onboard by sharing their project requirements, preferences, and budget, enabling a more personalized designer discovery experience.

A standout feature of DreamDen is its AI-powered interior visualization system. Clients can upload images of their rooms, and the AI generates interior design concepts by transforming the space with furniture, décor, color themes, and layout ideas.`,
    rawImageUrls: [
      "https://media.licdn.com/dms/image/v2/D562DAQE5LFlMTEbl4w/profile-treasury-image-shrink_480_480/B56Zt9zVigJIAM-/0/1767342169690?e=1791025200&v=beta&t=XBNwlEjX3PobGiP4byodOamjw5WqDZ4CEWy4docb50o",
    ],
    video:
      "https://drive.google.com/file/d/1udzbNgO92x-0f2G1H9xw_o6GQB2pXvw6/view?usp=sharing&usp=embed_facebook",
    github: "",
    demo: "",
    tech: [
      "React.js",
      "MongoDB",
      "Express.js",
      "Node.js",
      "Artificial Intelligence (AI)",
    ],
    order: 6,
  },
  {
    title: "E-commerce for Bombay Palace",
    description:
      "Full-stack e-commerce web application built using the MERN stack for furniture, carpets, sofas, and home décor products.",
    longDescription: `Bombay Palace is a full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js), designed for selling furniture, carpets, sofas, and home décor products.

The platform provides a complete online shopping experience, including product browsing, detailed product pages, cart management, and secure user authentication. It also includes an admin dashboard for managing products, categories, orders, and users. On the frontend, React.js is used to build a responsive and intuitive user interface, ensuring smooth navigation and an engaging shopping experience. The backend is powered by Node.js and Express.js, handling RESTful APIs, authentication, business logic, and order processing. MongoDB is used as the database for storing users, products, orders, and inventory data.

The project follows real-world e-commerce workflows and focuses on scalability, clean architecture, and performance, making it suitable for production-level use and portfolio showcase.`,
    rawImageUrls: [
      "https://media.licdn.com/dms/image/v2/D562DAQEpiqVMTKD9yw/profile-treasury-image-shrink_480_480/B56Zt91u6GJMAM-/0/1767342798997?e=1791025200&v=beta&t=WhEcF4W78GGKllLj3FuQBD_mhc2zan8g_WpGCFOXyQo",
    ],
    video:
      "https://drive.google.com/file/d/1igj9rC1xjwRF2h1UTWi_zQarBN3MbqG-/view?usp=sharing&usp=embed_facebook",
    github: "",
    demo: "",
    tech: ["React.js", "Express.js", "MongoDB", "Node.js"],
    order: 7,
  },
  {
    title: "JobHost",
    description:
      "Comprehensive job portal application designed to connect job seekers with employers with application tracking.",
    longDescription: `JobHost is a comprehensive job portal application designed to connect job seekers with employers. Built using Next.js, React.js, Node.js, PostgreSQL, and Prisma, it provides a seamless experience for job searching, hiring, and application tracking.`,
    rawImageUrls: [
      "https://media.licdn.com/dms/image/v2/D562DAQHgCMxf7L3YJQ/profile-treasury-image-shrink_480_480/B56ZY7H2QRGQAM-/0/1744748636521?e=1791025200&v=beta&t=XSxMJXo_xAdIB0f7rI6sqJ5n9sFzc2qwKlz2cE_48nU",
      "https://media.licdn.com/dms/image/v2/D562DAQG9KMT7wKZI0w/profile-treasury-image-shrink_480_480/B56ZY7H7DfGsAM-/0/1744748655349?e=1791025200&v=beta&t=vOojdYgvuWB-P0zH-9wQ6_mPG8X0Koae4wMEgVA08Bs",
      "https://media.licdn.com/dms/image/v2/D562DAQHXo3IJaQhRYQ/profile-treasury-image-shrink_480_480/B56ZY7H.0oGcAM-/0/1744748671005?e=1791025200&v=beta&t=pec0TvvZRNzU9_m94bvGS_Z8R6p5jN8lU5nQTCh_Vqw",
    ],
    video: "",
    github: "",
    demo: "",
    tech: ["Next.js", "React.js", "Node.js", "PostgreSQL", "Prisma"],
    order: 8,
  },
  {
    title: "TacLink – Transform Your Business with Smart Solutions",
    description:
      "Scalable enterprise management platform featuring modular SHRM, ERP, CMS, and SMS suites.",
    longDescription: `TacLink is a comprehensive enterprise product designed to help organizations streamline operations, improve efficiency, and drive digital transformation through a unified business management platform. Built as a scalable and modular solution, StarLink was developed for a company to manage its internal processes and enterprise workflows in a centralized, secure, and intelligent system.

The product offers a powerful suite of enterprise modules including SHRM (Smart Human Resource Management), ERP (Enterprise Resource Planning), CMS (Content Management System), and SMS (Sales & Service Management System). Each module is designed to work independently while seamlessly integrating with others, providing a complete end-to-end business solution.

The SHRM module manages employee onboarding, attendance, payroll support, roles, permissions, and performance tracking. The ERP module handles core business operations and reporting.`,
    rawImageUrls: [
      "https://media.licdn.com/dms/image/v2/D562DAQE6UchDElO3QQ/profile-treasury-image-shrink_480_480/B56Zt9wSfHJEAM-/0/1767341371060?e=1791025200&v=beta&t=O28aAWDHg6Mo458LyxLLo_kli5nznw6BFWQ-VexgG8E",
      "https://media.licdn.com/dms/image/v2/D562DAQGDMDKBan-RIQ/profile-treasury-image-shrink_480_480/B56Zt9tU2kIcAQ-/0/1767340593720?e=1791025200&v=beta&t=WNn-DoTzEC7tHp9HT54B722aSEJbl9j68SBAhWUrZQw",
    ],
    video:
      "https://drive.google.com/file/d/1BAlVbFz-d-BqI9ortX88pP5_DI_th17f/view?usp=sharing&usp=embed_facebook",
    github: "",
    demo: "",
    tech: ["React.js", "Website Building", "Node.js"],
    order: 9,
  },
  {
    title: "Tic-Tac-Toe",
    description:
      "Real-time multiplayer Tic-Tac-Toe game built with the MERN stack featuring WebSockets for live gameplay and opponent chat.",
    longDescription: `This Tic-Tac-Toe is a real-time multiplayer game built with the MERN stack. It features WebSockets for seamless chat between opponents during matches. The application provides a user-friendly interface and is fully responsive across devices. Enjoy classic gameplay with real-time communication!`,
    rawImageUrls: [
      "https://media.licdn.com/dms/image/v2/D562DAQEr7lLhAHE1YQ/profile-treasury-image-shrink_480_480/B56ZY7LlvuGoAM-/0/1744749617239?e=1791028800&v=beta&t=ZUls3l5e8BNDb31_Gntn61WBT3Q3CrsygTn0dIbYjXM",
      "https://media.licdn.com/dms/image/v2/D562DAQH12NTG0yVkqg/profile-treasury-image-shrink_480_480/B56ZY7LiI0GsAM-/0/1744749602087?e=1791028800&v=beta&t=qJwNDt1CH0L_y47oBJFtFGxPA1mG7ZcEE1LOvSGLEbI",
    ],
    video: "",
    github: "",
    demo: "",
    tech: ["React.js", "Express.js", "Node.js", "MongoDB", "WebSocket"],
    order: 10,
  },
];

async function seedLinkedInProjects() {
  console.log("=== SEED LINKEDIN PROJECTS -> MONGODB ===");
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  const collection = mongoose.connection.collection("projects");

  console.log("\n--- Step 1: Inspecting Existing Projects in Database ---");
  const existingDocs = await collection.find({}).toArray();
  console.log(`Found ${existingDocs.length} existing project(s) in database:`);
  existingDocs.forEach((d, idx) => {
    console.log(
      `  [${idx + 1}] "${d.title}" | order: ${d.order} | featuredOrder: ${d.featuredOrder} | featured: ${d.featured}`
    );
  });

  console.log("\n--- Step 2: Processing LinkedIn Projects ---");
  let importedCount = 0;
  let updatedCount = 0;
  let r2UploadedCount = 0;
  let r2ReusedCount = 0;

  for (const item of rawProjectsData) {
    console.log(`\nProcessing: "${item.title}"`);

    // Check if project already exists
    const existing = await collection.findOne({ title: item.title });

    // Handle images: check if existing project already has R2 URLs
    const finalR2Images = [];
    const existingImages = Array.isArray(existing?.images) ? existing.images : [];

    for (let i = 0; i < item.rawImageUrls.length; i++) {
      const rawUrl = item.rawImageUrls[i];

      // Check if this image position already has a valid R2 URL in existing doc
      const existingR2 = existingImages[i];
      if (
        existingR2 &&
        typeof existingR2 === "string" &&
        (existingR2.includes(".r2.dev") || existingR2.includes(".r2.cloudflarestorage.com"))
      ) {
        console.log(`  Image #${i + 1}: Reusing existing R2 asset (${existingR2})`);
        finalR2Images.push(existingR2);
        r2ReusedCount++;
        continue;
      }

      // Download from LinkedIn and upload to R2
      console.log(`  Image #${i + 1}: Downloading from LinkedIn...`);
      try {
        const fetchRes = await fetch(rawUrl);
        if (!fetchRes.ok) {
          console.warn(`  Warning: Could not fetch image ${rawUrl}: HTTP ${fetchRes.status}`);
          continue;
        }

        const buffer = Buffer.from(await fetchRes.arrayBuffer());
        const uploadResult = await uploadToR2(buffer, {
          mimeType: "image/jpeg",
          originalFilename: `${item.title.slice(0, 15).toLowerCase().replace(/[^a-z0-9]/g, "-")}-${i + 1}.jpg`,
        });

        // Verify public accessibility
        const verifyRes = await fetch(uploadResult.url);
        if (!verifyRes.ok) {
          throw new Error(`R2 verification failed for ${uploadResult.url}: HTTP ${verifyRes.status}`);
        }

        console.log(`  Image #${i + 1}: Uploaded to R2 -> ${uploadResult.url}`);
        finalR2Images.push(uploadResult.url);
        r2UploadedCount++;
      } catch (err) {
        console.error(`  Error uploading image #${i + 1}:`, err.message);
      }
    }

    // Preserve existing Top 3 / featured status if present
    const isFeatured = existing ? (existing.featured ?? false) : false;
    const featuredOrder = existing ? (existing.featuredOrder ?? null) : null;

    const projectDoc = {
      title: item.title,
      description: item.description,
      longDescription: item.longDescription,
      images: finalR2Images,
      video: item.video,
      github: item.github,
      demo: item.demo,
      tech: item.tech,
      featured: isFeatured,
      featuredOrder: featuredOrder,
      order: item.order,
      updatedAt: new Date(),
    };

    if (existing) {
      await collection.updateOne(
        { _id: existing._id },
        { $set: projectDoc }
      );
      console.log(`  ✓ Updated existing project (ID: ${existing._id})`);
      updatedCount++;
    } else {
      projectDoc.createdAt = new Date();
      const insertRes = await collection.insertOne(projectDoc);
      console.log(`  ✓ Inserted new project (ID: ${insertRes.insertedId})`);
      importedCount++;
    }
  }

  console.log("\n--- Step 3: Verification ---");
  const finalDocs = await collection.find({}).sort({ order: 1 }).toArray();
  console.log(`Total projects in database: ${finalDocs.length}`);
  finalDocs.forEach((d, idx) => {
    console.log(
      `  [${idx + 1}] order: ${d.order} | "${d.title}" | images: ${d.images.length} | top3: ${d.featuredOrder}`
    );
  });

  console.log("\n--- Migration Summary ---");
  console.log(`Total LinkedIn Projects: ${rawProjectsData.length}`);
  console.log(`New projects inserted: ${importedCount}`);
  console.log(`Existing projects updated: ${updatedCount}`);
  console.log(`R2 images freshly uploaded: ${r2UploadedCount}`);
  console.log(`R2 images reused: ${r2ReusedCount}`);

  await mongoose.disconnect();
}

seedLinkedInProjects().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
