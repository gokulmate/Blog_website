import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import BlogAdd from "./components/BlogAdd";
import BlogEdit from "./components/BlogEdit";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">

        <Navbar />

        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<BlogAdd />} />
            <Route path="/edit/:id" element={<BlogEdit />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;