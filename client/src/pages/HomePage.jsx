import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { getAllBlogs, deleteBlog } from "../services/api";

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs();

      console.log("API Response:", response.data);

      const data = response.data;

      if (Array.isArray(data)) {
        setBlogs(data);
      } else if (Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else if (Array.isArray(data.data)) {
        setBlogs(data.data);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error(error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedBlogId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(selectedBlogId);

      setBlogs((prev) =>
        prev.filter((blog) => blog._id !== selectedBlogId)
      );

      setShowDeleteModal(false);
      setSelectedBlogId(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-xl font-semibold">
          Loading Blogs...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Latest Blogs
        </h1>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
          {Array.isArray(blogs) ? blogs.length : 0} Blogs
        </span>
      </div>

      {!Array.isArray(blogs) || blogs.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-600">
            No Blogs Found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first blog post.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6">

            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🗑️</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-3">
              Delete Blog
            </h2>

            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to delete this blog?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;