import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 shadow-sm">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        
        <h1 className="text-2xl font-bold text-indigo-600">
          MyBlog
        </h1>

        <div className="flex gap-6 text-gray-700 font-medium">
          <Link className="hover:text-indigo-600 transition" to="/">Home</Link>
<Link className="hover:text-indigo-600 transition" to="/add">
  Create Post
</Link>
          <Link className="hover:text-indigo-600 transition" to="/about">About</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;