import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="auth-container">
      <h1>Admin Dashboard</h1>

      <p>Welcome to your portfolio administration area.</p>

      <div className="auth-form">
        <Link to="/admin/projects">
          <button className="button">Manage Projects</button>
        </Link>

        <Link to="/admin/education">
          <button className="button">Manage Education</button>
        </Link>

        <Link to="/admin/contacts">
          <button className="button">Manage Contacts</button>
        </Link>
        <Link to="/admin/users">
          <button className="button">Manage Users</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;