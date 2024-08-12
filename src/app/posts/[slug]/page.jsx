// src/app/posts/page.jsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategorySection from '../../../components/CategorySection'

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
  
    console.log(`Comparing: ${PostSlug} with ${Slug}`);
    
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
      <Link href="/">Posts</Link>

      <h2>{post.title}</h2>
      <Image
        src={post.image}
        width={500}
        height={100}
        // className="card-img-top"
        alt={post.title}
      />
      <h4>{post.createdAt.slice(0,10)}</h4>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    <CategorySection/>
      <div className="tags">
        {post.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
