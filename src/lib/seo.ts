import { Metadata } from "next";
import { env } from "@/lib/env";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description = env.NEXT_PUBLIC_APP_DESCRIPTION,
  image = "/og-image.png",
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const baseUrl = env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image.startsWith("http") ? image : `${baseUrl}${image}`;
  
  const seoTitle = title 
    ? `${title} | ${env.NEXT_PUBLIC_APP_NAME}`
    : env.NEXT_PUBLIC_APP_NAME;

  return {
    title: seoTitle,
    description,
    keywords: tags,
    authors: authors?.map(name => ({ name })),
    openGraph: {
      type,
      locale: "en_US",
      url: fullUrl,
      title: seoTitle,
      description,
      siteName: env.NEXT_PUBLIC_APP_NAME,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description,
      images: [fullImage],
      creator: "@bunplate",
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export function generateStructuredData(props: {
  type: "WebSite" | "Organization" | "Article" | "BreadcrumbList";
  data: Record<string, unknown>;
}) {
  const baseUrl = env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": props.type,
    ...props.data,
  };

  switch (props.type) {
    case "WebSite":
      return {
        ...baseStructuredData,
        name: env.NEXT_PUBLIC_APP_NAME,
        url: baseUrl,
        description: env.NEXT_PUBLIC_APP_DESCRIPTION,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      };
      
    case "Organization":
      return {
        ...baseStructuredData,
        name: env.NEXT_PUBLIC_APP_NAME,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: env.NEXT_PUBLIC_APP_DESCRIPTION,
        sameAs: [
          "https://github.com/your-username/bunplate",
          "https://twitter.com/bunplate",
        ],
      };
      
    case "Article":
      return {
        ...baseStructuredData,
        publisher: {
          "@type": "Organization",
          name: env.NEXT_PUBLIC_APP_NAME,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": props.data.url,
        },
      };
      
    default:
      return baseStructuredData;
  }
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}