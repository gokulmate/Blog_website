import { useState, useEffect } from "react";
import { getAllBlogs } from "../services/api";
import BlogCard from "./BlogCard";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();

      if (response.data.success) {
        setBlogs(response.data.data);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch blogs. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = (blogId) => {
    setBlogs(blogs.filter((blog) => blog._id !== blogId));
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-gray-500 animate-pulse">
          ⏳ Loading blogs...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          📚 All Blogs
        </h1>
        <p className="text-gray-500 mt-2">
          Discover amazing stories and articles
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      {/* SEARCH */}
      {blogs.length > 0 && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search blogs by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>
      )}

      {/* EMPTY STATE */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-20 text-gray-500">

          {blogs.length === 0 ? (
            <>
              <h2 className="text-2xl font-semibold">
                📝 No blogs yet!
              </h2>
              <p className="mt-2">Be the first to create a blog.</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">
                🔍 No blogs found
              </h2>
              <p className="mt-2">Try different keywords.</p>
            </>
          )}

        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onDelete={handleDeleteBlog}
              />
            ))}
          </div>

          {/* COUNT */}
          <div className="text-center mt-8 text-sm text-gray-500">
            Showing {filteredBlogs.length} of {blogs.length} blogs
          </div>
        </>
      )}

    </div>
  );
}

export default BlogList;