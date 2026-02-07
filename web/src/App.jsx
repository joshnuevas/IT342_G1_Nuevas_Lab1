import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Welcome to Vite + React App</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
