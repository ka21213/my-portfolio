import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// Navigation bar displayed on every page
function Navbar() {
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

// Projects page
function Projects() {
  const projects = [
    {
      title: "Project 1: Portfolio Website",
      image: "/images/project1.jpg",
      description:
        "Developed a responsive personal portfolio using React, JavaScript, HTML, and CSS. The website presents my background, education, projects, and contact information",
    },
    {
      title: "Project 2: Database Project",
      image: "/images/project2.jpg",
      description:
        "A database project demonstrating my understanding of database design, data organization, and SQL.",
    },
    {
      title: "Project 3: Web Application",
      image: "/images/project3.jpg",
      description:
        "A web application project demonstrating my developing programming and user interface skills.",
    },
  ];

  return (
    <section className="page">
      <h1>My Projects</h1>

      <p>
        Here are some projects that demonstrate my learning and development
        skills.
      </p>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.image} alt={project.title} />

            <div className="project-content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Education page
function Education() {
  return (
    <section className="page">
      <h1>My Education</h1>

      <div className="education-card">
        <h2>College Education</h2>

        <p>
          <strong>Program:</strong> Software Engineering Technology Artificial Intelligence.
        </p>

        <p>
          <strong>Institution:</strong> Centennial College
        </p>

        <p>
          <strong>Start Date:</strong> 2025
        </p>

        <p>
          <strong>Expected Graduation:</strong> 2027
        </p>
      </div>

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

// Contact Me page
function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Update form data whenever the user types
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Validate the form, save the information, and return home
  function handleSubmit(event) {
    event.preventDefault();

    sessionStorage.setItem("contactFormData", JSON.stringify(formData));

    alert("Thank you for contacting me!");

    navigate("/");
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

          <button type="submit" className="button">
            Send Message
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
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;