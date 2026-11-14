import { useEffect, useState } from "react";

function ManageEducation() {
  const API_URL = "http://localhost:5000/api/qualifications";

  const [qualifications, setQualifications] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  async function fetchQualifications() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Could not load qualifications.");
      }

      setQualifications(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQualifications();
  }, []);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Operation failed.");
      }

      setMessage(
        editingId
          ? "Qualification updated successfully!"
          : "Qualification added successfully!"
      );

      resetForm();
      fetchQualifications();
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEdit(item) {
    setEditingId(item._id);

    setFormData({
      title: item.title || "",
      firstname: item.firstname || "",
      lastname: item.lastname || "",
      email: item.email || "",
      completion: item.completion
        ? new Date(item.completion).toISOString().split("T")[0]
        : "",
      description: item.description || "",
    });
  }

  function resetForm() {
    setEditingId(null);

    setFormData({
      title: "",
      firstname: "",
      lastname: "",
      email: "",
      completion: "",
      description: "",
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this qualification?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Delete failed.");
      }

      setMessage("Qualification deleted successfully!");
      fetchQualifications();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth-container">
      <h1>Manage Education</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Qualification Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>First Name</label>
        <input
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />

        <label>Last Name</label>
        <input
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Completion Date</label>
        <input
          type="date"
          name="completion"
          value={formData.completion}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
        />

        <button className="button" type="submit">
          {editingId ? "Update Qualification" : "Add Qualification"}
        </button>

        {editingId && (
          <button className="button" type="button" onClick={resetForm}>
            Cancel Editing
          </button>
        )}
      </form>

      {message && <p>{message}</p>}
      {error && <p role="alert">{error}</p>}

      <h2>Existing Qualifications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : qualifications.length === 0 ? (
        <p>No qualifications found.</p>
      ) : (
        qualifications.map((item) => (
          <div key={item._id}>
            <h3>{item.title}</h3>
            <p>
              {item.firstname} {item.lastname}
            </p>
            <p>{item.email}</p>
            <p>
              Completion:{" "}
              {item.completion
                ? new Date(item.completion).toLocaleDateString()
                : ""}
            </p>
            <p>{item.description}</p>

            <button className="button" onClick={() => handleEdit(item)}>
              Edit
            </button>

            <button
              className="button"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ManageEducation;