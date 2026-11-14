import { useEffect, useState } from "react";

function ManageContacts() {
  const API_URL = "http://localhost:5000/api/contacts";

  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  async function fetchContacts() {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not load messages.");
      }

      setContacts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleEdit(contact) {
    setEditingId(contact._id);

    setFormData({
      firstname: contact.firstname || "",
      lastname: contact.lastname || "",
      email: contact.email || "",
      subject: contact.subject || "",
      message: contact.message || "",
    });

    setMessage("");
    setError("");
  }

  function resetForm() {
    setEditingId(null);

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Update failed.");
      }

      setMessage("Contact message updated successfully!");
      resetForm();
      fetchContacts();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this message?")) {
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

      setMessage("Contact message deleted successfully!");
      fetchContacts();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth-container">
      <h1>Manage Contact Messages</h1>

      {editingId && (
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Edit Contact Message</h2>

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

          <label>Subject</label>
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          />

          <button className="button" type="submit">
            Update Message
          </button>

          <button className="button" type="button" onClick={resetForm}>
            Cancel
          </button>
        </form>
      )}

      {message && <p>{message}</p>}
      {error && <p role="alert">{error}</p>}

      <h2>Received Messages</h2>

      {loading ? (
        <p>Loading messages...</p>
      ) : contacts.length === 0 ? (
        <p>No contact messages found.</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact._id}>
            <h3>{contact.subject}</h3>

            <p>
              From: {contact.firstname} {contact.lastname}
            </p>

            <p>Email: {contact.email}</p>
            <p>Message: {contact.message}</p>

            <button
              className="button"
              onClick={() => handleEdit(contact)}
            >
              Edit
            </button>

            <button
              className="button"
              onClick={() => handleDelete(contact._id)}
            >
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default ManageContacts;