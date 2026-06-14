import { Link } from "react-router-dom";

function BlogCard({ blog, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={blog.image || "https://placehold.co/600x400"}
        alt={blog.title}
        className="w-full h-52 object-cover"
        onError={(e) => {
          e.target.src = "https://placehold.co/600x400";
        }}
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
          {blog.title}
        </h2>

        <p className="text-gray-600 mb-3 line-clamp-3">
          {blog.description}
        </p>

        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>✍️ {blog.author || "Unknown"}</span>

          <span>
            📅{" "}
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : "No Date"}
          </span>
        </div>

        <div className="flex gap-2">
          {/* Read More */}
          <Link
            to={`/blog/${blog._id}`}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            📖 Read More
          </Link>

          {/* Edit */}
          <Link
            to={`/edit/${blog._id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            ✏️ Edit
          </Link>

          {/* Delete */}
          <button
            onClick={() => onDelete(blog._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;