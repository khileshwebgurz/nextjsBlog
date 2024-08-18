// src/app/page.jsx
import SearchablePosts from '../components/SearchablePost'

const Home = async ({ searchParams }) => {
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 10;
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/getData?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const { data } = await response.json();
  // Check the data structure



  return (
    <div>
      <SearchablePosts posts={data} />
      {/* You can also pass pagination info like totalDocuments to SearchablePosts */}
    </div>
  );
};

export default Home;
