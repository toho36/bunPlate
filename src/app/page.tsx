import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Github, Zap, Shield, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with Bun runtime and optimized for Vercel's edge network for maximum performance.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security with CSP headers, CSRF protection, and rate limiting out of the box.",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Responsive design with accessibility features and PWA capabilities built-in.",
  },
];

function HeroSection() {
  return (
    <section className="container flex flex-col items-center justify-center gap-4 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Build faster with{" "}
          <span className="gradient-text">BunPlate</span>
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          A modern web application boilerplate built with Bun, Next.js 14+, TypeScript, and Tailwind CSS.
          Optimized for Vercel deployment with best practices built-in.
        </p>
      </div>
      <div className="flex gap-4">
        <Button size="lg" asChild>
          <Link href="/dashboard">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="https://github.com/your-username/bunplate" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </Button>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
          Everything you need to ship fast
        </h2>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Modern tools and best practices to help you build production-ready applications.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-8">
        {features.map((feature) => (
          <Card key={feature.title} className="card-hover">
            <CardHeader>
              <feature.icon className="h-10 w-10 text-primary" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function TechStackSection() {
  const technologies = [
    "Next.js 14+",
    "TypeScript",
    "Tailwind CSS",
    "Bun Runtime",
    "Vercel",
    "Prisma",
    "NextAuth.js",
    "Vitest",
  ];

  return (
    <section className="container py-8 md:py-12 lg:py-24 bg-muted/50">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
          Modern Tech Stack
        </h2>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Built with the latest and greatest tools for modern web development.
        </p>
        <div className="flex flex-wrap gap-2 mt-8">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">BunPlate</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/docs"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Documentation
            </Link>
            <Link
              href="/examples"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Examples
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with ❤️ using{" "}
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Next.js
          </Link>{" "}
          and{" "}
          <Link
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Vercel
          </Link>
          .
        </p>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/your-username/bunplate"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
          <HeroSection />
          <FeaturesSection />
          <TechStackSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}