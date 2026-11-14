import { useEffect, useState } from "react";

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:5000/api/projects";

  const token = localStorage.getItem("token");

  // Get all projects
  async function fetchProjects() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Could not load projects.");
      }

      setProjects(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // Add or update a project
  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    const projectData = {
      title,
      description,
    };

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(projectData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Operation failed.");
      }

      setMessage(editingId ? "Project updated successfully!" : "Project added successfully!");

      setTitle("");
      setDescription("");
      setEditingId(null);

      fetchProjects();
    } catch (error) {
      setError(error.message);
    }
  }

  // Select a project for editing
  function handleEdit(project) {
    setEditingId(project._id);
    setTitle(project.title || "");
    setDescription(project.description || "");
    setMessage("");
    setError("");
  }

  // Delete a project
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Could not delete project.");
      }

      setMessage("Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth-container">
      <h1>Manage Projects</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Project Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter project title"
          required
        />

        <label htmlFor="description">Project Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter project description"
          required
        />

        <button className="button" type="submit">
          {editingId ? "Update Project" : "Add Project"}
        </button>

        {editingId && (
          <button
            className="button"
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setDescription("");
            }}
          >
            Cancel Editing
          </button>
        )}
      </form>

      {message && <p>{message}</p>}
      {error && <p role="alert">{error}</p>}

      <h2>Existing Projects</h2>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <button
              className="button"
              onClick={() => handleEdit(project)}
            >
              Edit
            </button>

            <button
              className="button"
              onClick={() => handleDelete(project._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ManageProjects;