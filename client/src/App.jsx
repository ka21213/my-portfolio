import { useState, useEffect } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import AdminDashboard from "./AdminDashboard";
import ManageProjects from "./ManageProjects";
import ManageEducation from "./ManageEducation";
import ManageContacts from "./ManageContacts";
import ManageUsers from "./ManageUsers";

function Navbar({ user, onSignOut }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        My Portfolio
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About Me</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/education">Education</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact Me</Link>

        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            {user.role === "admin" && (
              <Link to="/admin">Admin Dashboard</Link>
            )}
            <button className="button" onClick={onSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// Home page
function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to My Portfolio</h1>

        <h2>Hello! I'm a Web Development Student.</h2>

        <p>
          Welcome to my personal portfolio website. Here you can learn about
          me, explore my projects, discover my education, and see the services
          I offer.
        </p>

        <Link to="/about" className="button">
          Learn More About Me
        </Link>
      </div>
    </section>
  );
}

// About Me page
function About() {
  return (
    <section className="page">
      <h1>About Me</h1>

      <div className="about-container">
        <img
          src="/images/profile.jpg"
          alt="My profile"
          className="profile-image"
        />

        <div>
          <h2>Who Am I?</h2>

          <p>
            My name is Khaled Al Akili. I am a student of Centennial College studying Software Engineering Technology. I am interested in
            I'm interested in technology, programming, and web development.
          </p>

          <p>
            I enjoy learning new skills, solving problems, and developing
            applications that can help people.
          </p>

          <h3>My Goals</h3>

          <p>
            My goal is to improve my programming skills and build professional
            websites and applications.
          </p>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            View My Resume
          </a>
        </div>
      </div>
    </section>
  );
}

// Projects page - retrieves projects from MongoDB
function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("http://localhost:5000/api/projects");

        if (!response.ok) {
          throw new Error("Could not retrieve projects.");
        }

        const data = await response.json();

        setProjects(data);

      } catch (error) {
        setError(error.message);

      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return <section className="page"><h2>Loading projects...</h2></section>;
  }

  if (error) {
    return <section className="page"><p>{error}</p></section>;
  }

  return (
    <section className="page">
      <h1>My Projects</h1>

      <p>
        Here are some projects that demonstrate my learning and development
        skills.
      </p>

      <div className="projects-container">
        {projects.length === 0 ? (
          <p>No projects available yet.</p>
        ) : (
          projects.map((project) => (
            <div className="project-card" key={project._id}>
              <div className="project-content">
                <h2>{project.title}</h2>

                <p>{project.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
// Education page - retrieves qualifications from MongoDB
function Education() {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchQualifications() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/qualifications"
        );

        if (!response.ok) {
          throw new Error("Could not retrieve education information.");
        }

        const data = await response.json();
        setQualifications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQualifications();
  }, []);

  return (
    <section className="page">
      <h1>My Education</h1>

      {loading ? (
        <p>Loading education information...</p>
      ) : error ? (
        <p>{error}</p>
      ) : qualifications.length === 0 ? (
        <p>No education information available yet.</p>
      ) : (
        qualifications.map((item) => (
          <div className="education-card" key={item._id}>
            <h2>{item.title}</h2>

            <p>
              <strong>Completion Date:</strong>{" "}
              {item.completion
                ? new Date(item.completion).toLocaleDateString()
                : "Not specified"}
            </p>

            <p>{item.description}</p>
          </div>
        ))
      )}

      <div className="education-card">
        <h2>Skills and Qualifications</h2>

        <ul>
          <li>HTML and CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Database fundamentals and SQL</li>
          <li>Problem-solving and teamwork</li>
        </ul>
      </div>
    </section>
  );
}

// Services page
function Services() {
  const services = [
    {
      title: "Web Development",
      description:
        "Creating responsive and user-friendly websites.",
    },
    {
      title: "Website Design",
      description:
        "Designing clear and attractive website layouts.",
    },
    {
      title: "Database Development",
      description:
        "Organizing information and working with databases.",
    },
  ];

  return (
    <section className="page">
      <h1>My Services</h1>

      <p>
        These are examples of services related to my current skills and
        learning experience.
      </p>

      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Contact Me page - saves messages to MongoDB
function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    // Split full name into first and last name
    const nameParts = formData.name.trim().split(/\s+/);

    const contactData = {
      firstname: nameParts[0],
      lastname: nameParts.slice(1).join(" ") || nameParts[0],
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not send your message.");
      }

      alert("Thank you! Your message has been sent successfully.");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page">
      <h1>Contact Me</h1>

      <p>
        Please use the form below to get in touch with me.
      </p>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Information</h2>

          <p>
            <strong>Email:</strong> kalakili@my.centennialcollege.ca
          </p>

          <p>
            <strong>Location:</strong> Toronto, Ontario
          </p>

          <p>
            I would be happy to hear from you about projects, collaboration,
            or other opportunities.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="subject">Subject</label>

          <input
            id="subject"
            type="text"
            name="subject"
            placeholder="Enter the subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>

          <textarea
            id="message"
            name="message"
            placeholder="Write your message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

// Footer displayed at the bottom of the website
function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} My Portfolio. All rights reserved.
      </p>
    </footer>
  );
}

// Main application with all six pages
function App() {
    const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          localStorage.removeItem("token");
          return;
        }

        const data = await response.json();
        setUser(data.user || data);
      } catch (error) {
        console.error("Could not verify user:", error);
      }
    }

    checkUser();
  }, []);
  function handleSignOut() {
  localStorage.removeItem("token");
  setUser(null);
  window.location.href = "/";
}
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar user={user} onSignOut={handleSignOut} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn onLogin={setUser} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={ user && user.role === "admin" ? (<AdminDashboard />) : (   <Navigate to="/" />)} />
            <Route path="/admin/projects" element={ user && user.role === "admin" ? (<ManageProjects /> ) : (<Navigate to="/" /> )} />
          <Route
                path="/admin/education"
                element={
                  user && user.role === "admin" ? (
                    <ManageEducation />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              <Route
                path="/admin/contacts"
                element={
                  user && user.role === "admin" ? (
                    <ManageContacts />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/admin/users"
                element={
                  user && user.role === "admin"
                    ? <ManageUsers />
                    : <Navigate to="/" />
                }
              />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;