import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Home Dashboard</h1>

      <p>You are logged in successfully.</p>

      <hr />

      <h3>Features</h3>
      <ul>
        <li>View Profile</li>
        <li>Manage Account</li>
        <li>System Settings</li>
      </ul>

      <br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}