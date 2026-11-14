import { useEffect, useState } from "react";

function ManageUsers() {
  const API_URL = "http://localhost:5000/api/users";

  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  // Get the admin token
  const getToken = () => localStorage.getItem("token");

  // Load all users
  const loadUsers = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not load users.");
      }

      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Clear the form
  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      role: "user"
    });

    setEditingId(null);
  };

  // Create or update a user
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const userData = {
        name: form.name,
        email: form.email,
        role: form.role
      };

      // Password is required when creating an account.
      // When editing, it is optional.
      if (form.password) {
        userData.password = form.password;
      }

      if (!editingId && !form.password) {
        setError("Please enter a password.");
        return;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not save user.");
      }

      setMessage(
        editingId
          ? "User updated successfully!"
          : "User created successfully!"
      );

      resetForm();
      loadUsers();

    } catch (err) {
      setError(err.message);
    }
  };

  // Edit a user
  const handleEdit = (user) => {
    setEditingId(user._id);

    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role
    });

    setMessage("");
    setError("");
  };

  // Delete a user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not delete user.");
      }

      setMessage("User deleted successfully!");

      if (editingId === id) {
        resetForm();
      }

      loadUsers();

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>User Management</h1>

      <p>Manage registered accounts and their permissions.</p>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit User" : "Create New User"}</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>
          {editingId
            ? "New Password (leave blank to keep current password)"
            : "Password"}
        </label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          minLength={8}
          required={!editingId}
        />

        <label>Account Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="button">
          {editingId ? "Update User" : "Create User"}
        </button>

        {editingId && (
          <button
            type="button"
            className="button"
            onClick={resetForm}
          >
            Cancel Editing
          </button>
        )}
      </form>

      <h2>Registered Users</h2>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  <button
                    className="button"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="button"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;