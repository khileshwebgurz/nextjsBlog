// src/app/posts/page.jsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from 'react';

// Define a fallback UI for loading state
const LoadingFallback = () => <div>Loading...</div>;

async function getPost(slug) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/getData?slug=${slug}`
  );
  
  if (!res.ok) {
    return null;
  }

  const posts = await res.json();

  const post = posts.find(post => {
    const PostSlug = post.slug.replace(/\/$/, ''); // Remove trailing slash
    const Slug = slug.replace(/\/$/, ''); // Remove trailing slash from the comparison slug
    return PostSlug === Slug;
  });
  return post;
}

// Server Component
export default async function PostsPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div>
      {/* Link is rendered directly without waiting for data */}
      <Link href="/">Posts</Link>

      {/* If loading state is needed */}
      <React.Suspense fallback={<LoadingFallback />}>
        <h2>{post.title}</h2>
        <Image
          src={post.image}
          width={500}
          height={100}
          alt={post.title}
        />
        <h4>{post.createdAt.slice(0,10)}</h4>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </React.Suspense>
    </div>
  );
}
