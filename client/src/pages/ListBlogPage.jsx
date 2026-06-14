import { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "../services/api";
import BlogCard from "./BlogCard";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await getAllBlogs();
      setBlogs(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-lg animate-pulse">
          ⏳ Loading amazing blogs...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-10">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Latest Blogs 🚀
        </h1>
        <p className="text-gray-500 mt-2">
          Discover stories, ideas and knowledge
        </p>
      </div>

      {/* EMPTY STATE */}
      {blogs.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          😢 No blogs found
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onDelete={handleDelete}
            />
          ))}

        </div>
      )}

    </div>
  );
}