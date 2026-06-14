import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/api";

function BlogAdd() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.title.trim() || !formData.description.trim()) {
        setError("Title and description are required!");
        return;
      }

      if (formData.title.trim().length < 3) {
        setError("Title must be at least 3 characters long!");
        return;
      }

      if (formData.description.trim().length < 10) {
        setError("Description must be at least 10 characters long!");
        return;
      }

      const response = await createBlog(formData);

      if (response.data.success) {
        // reset after success
        setFormData({
          title: "",
          description: "",
          author: "",
          image: ""
        });

        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          ✍️ Create New Blog
        </h2>
        <p className="text-gray-500 mt-2">
          Share your thoughts with the world
        </p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 space-y-5"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="w-full p-3 border rounded-xl"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="6"
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-3 border rounded-xl"
        />

        {/* IMAGE INPUT (kept but safe) */}
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 border rounded-xl"
        />

        {/* IMAGE PREVIEW (FIXED — no blank flicker) */}
        {formData.image.trim() !== "" && (
          <div className="w-full">
            <img
              src={formData.image}
              alt="preview"
              className="w-full h-60 object-cover rounded-xl border"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}

export default BlogAdd;