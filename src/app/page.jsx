// src/app/page.jsx
import Image from "next/image";
import Link from "next/link";
import CategorySection from "../components/CategorySection";
// Server Component
const Home = async () => {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/getData`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await response.json();

    return (
      <div>
        <h1>Most Popular Categories</h1>
        <div className="buttons" style={{display:'flex', flexDirection:'column'}}>
          <Link href='/categories/hubspot'>Hubspot</Link> 
          <Link href='/categories/artificial-intelligence'>Artificial Intelligence</Link> 
          <Link href='/categories/orm'>ORM</Link> 
          <Link href='/categories/seo'>SEO</Link> 
         
        </div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id}>
              <Image
                src={post.image}
                width={100}
                height={100}
                alt={post.title}
              />
              <h5 className="card-title">{post.title}</h5>

              <Link className="btn btn-primary" href={`/posts/${post.slug}`}>
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
        <CategorySection />
      </div>
    );
  } catch (error) {
    return <p>Error: {error.message}</p>;
  }
};

export default Home;


