 "use client"
import React, { useState } from "react";
import CategorySection from "./CategorySection";
import Link from "next/link";
import Image from "next/image";

const SearchablePosts = ({ posts }) => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 2;
  const normalizedSearchInput = searchInput.toLowerCase();
 
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(normalizedSearchInput) ||
    post.slug.toLowerCase().includes(normalizedSearchInput) ||
    post.tags.some(tag => tag.toLowerCase().includes(normalizedSearchInput))
  );

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Get the posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h1>Most Popular Categories</h1>
      <div className="buttons" style={{ display: 'flex', flexDirection: 'column' }}>
        <Link href='/categories/hubspot'>Hubspot</Link>
        <Link href='/categories/artificial-intelligence'>Artificial Intelligence</Link>
        <Link href='/categories/orm'>ORM</Link>
        <Link href='/categories/seo'>SEO</Link>
      </div>

      {currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <div key={post._id}>
            <Image
              src={post.image } // Provide a fallback image if needed
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
      <CategorySection setSearchInput={setSearchInput} />
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchablePosts;
