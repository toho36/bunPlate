import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: "admin@bunplate.dev" },
    update: {},
    create: {
      email: "admin@bunplate.dev",
      name: "Admin User",
      role: "ADMIN",
    },
  });

  console.log("👤 Created user:", user);

  // Create some sample posts
  const post1 = await prisma.post.upsert({
    where: { slug: "welcome-to-bunplate" },
    update: {},
    create: {
      title: "Welcome to BunPlate",
      content: `# Welcome to BunPlate

This is a sample post to demonstrate the blog functionality. BunPlate is a modern web application boilerplate built with:

- **Bun** - Fast JavaScript runtime
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Prisma** - Next-generation ORM
- **NextAuth.js** - Authentication for Next.js

## Getting Started

You can edit this post or create new ones through the admin interface. The database is automatically seeded with this content on first run.

## Features

- 🚀 Lightning-fast development with Bun
- 🔒 Built-in authentication and authorization
- 📱 Responsive design with dark mode
- 🛡️ Security best practices
- 📈 Performance optimizations
- 🧪 Testing setup with Vitest
- 🚀 One-click deployment to Vercel

Happy coding!`,
      slug: "welcome-to-bunplate",
      published: true,
      authorId: user.id,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { slug: "getting-started-guide" },
    update: {},
    create: {
      title: "Getting Started Guide",
      content: `# Getting Started with BunPlate

This guide will help you get up and running with BunPlate quickly.

## Prerequisites

- Node.js 18+ or Bun 1.0+
- PostgreSQL database
- Git

## Installation

1. Clone the repository
2. Install dependencies with \`bun install\`
3. Copy \`.env.example\` to \`.env.local\`
4. Set up your database connection
5. Run \`bun run db:push\` to set up the database
6. Start the development server with \`bun run dev\`

## Configuration

Update your environment variables:

- \`DATABASE_URL\` - Your PostgreSQL connection string
- \`NEXTAUTH_SECRET\` - A random secret for NextAuth.js
- \`NEXTAUTH_URL\` - Your application URL

## Development

The project uses:

- App Router for routing
- Server Components for performance
- TypeScript for type safety
- Tailwind CSS for styling
- Prisma for database management

Start building your application!`,
      slug: "getting-started-guide",
      published: true,
      authorId: user.id,
    },
  });

  console.log("📝 Created posts:", { post1, post2 });

  console.log("✅ Database seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Database seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });