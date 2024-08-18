// src/app/posts/page.jsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

//this function is for normalising the tags. means let say my tags is ai-blog then it will make it "ai blog" which can be comparable with
// my category.
function normalizeString(str) {
  return str
    .toLowerCase()
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .trim(); // Remove leading and trailing whitespace
}

async function getPost(selectedCategory) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getData`);

  if (!res.ok) {
    return null;
  }

  const {data} = await res.json();

  //here we have { category: 'artificial-intelligence' } in this format.
  //   below code extract category key  from selectedCategory , if it is empty instead of throwing error just return empty
  // and if not then converted to lowecase and get trim extra whitespaces from start and end.
  const category = normalizeString(selectedCategory?.category || "");
  // Filter posts where tags include the selectedCategory

  const filteredPosts = data.filter((post) => {
    const postTags = post.tags.map((tag) => normalizeString(tag));

    return postTags.includes(category); // Check if category is in tags
  });

  return filteredPosts;
}

// Server Component
export default async function PostsPage({ params }) {
  const selectedCategory = params;

  const post = await getPost(selectedCategory);
  if (!post) {
    notFound();
  }

  return (
    <div>
       <Link href="/">Back to Home</Link>
      <h1>Posts</h1>
      {post.map((posts, index) => (
        <div key={index}>
          <Image src={posts.image} width={500} height={100} alt={posts.title} />
          <h5 className="card-title">{posts.title}</h5>

          <Link className="btn btn-primary" href={`/posts/${posts.slug}`}>
            Read More
          </Link>
        </div>
      ))}
     
    </div>
  );
}


//need to create buttons for category , when clicked category to be opened. 