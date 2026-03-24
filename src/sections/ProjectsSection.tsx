import { useRef, useState, useEffect, type RefObject } from "react";

interface ProjectItem {
  name: string;
  tagline: string;
  tech: string[];
  github: string;
  demo?: string;
  icon: string;
  fullDescription: string;
}

const PROJECTS: ProjectItem[] = [
  {
    name: "AI Text-to-SQL",
    tagline: "Natural language to SQL conversion system powered by LLM, enabling data querying without writing SQL",
    tech: ["React", "Python", "FastAPI", "PostgreSQL", "Docker"],
    github: "https://github.com/vqt2129a/AI-TextToSQL",
    icon: "🤖",
    fullDescription: "Designed and developed an AI-powered Text-to-SQL service that converts natural language into SQL queries, enabling users to query databases without writing SQL. Built backend APIs using Python and FastAPI, processing user input and returning generated SQL along with query results. Integrated external LLM APIs with prompt engineering techniques to generate accurate SQL statements based on database schema. Executed queries on PostgreSQL and processed results in real-time. Containerized the application using Docker for consistent deployment and environment isolation. Designed with a modular architecture (API, service, data layers) to support future scalability and extension into a full data querying system. Reduced complexity of database querying by enabling natural language input for non-technical users. Improved data accessibility through an intuitive Text-to-SQL interface.",
  },
  {
    name: "Portfolio Website",
    tagline: "Modern one-page portfolio with React Three Fiber particle background, section-based navigation & responsive design",
    tech: ["React", "TypeScript", "Three.js", "Vite"],
    github: "#",
    demo: "#",
    icon: "👤",
    fullDescription: "Developed a modern one-page portfolio website using React, TypeScript, and Vite, showcasing projects, experience, and personal branding through a structured landing-page layout. Implemented custom section-based navigation with smooth transitions across Hero, About, Experience, and Projects sections. Built an interactive visual experience using React Three Fiber and Three.js, including a custom animated particle network background to enhance UI appeal. Styled the application with Tailwind CSS v4 and developed reusable components such as branded logo elements and landing-page sections for maintainability. Enhanced user experience through lightweight frontend optimizations such as lazy-loaded 3D scenes, typed text animation, and responsive one-page navigation design.",
  },
  {
    name: "Admin Web App",
    tagline: "Fullstack admin application with JWT authentication, article management & RESTful API integration",
    tech: ["React", "ASP.NET Core", "SQL Server", "JWT"],
    github: "https://github.com/vqt2129a/adminwebapp-react-aspnet",
    icon: "⚙️",
    fullDescription: "Developed key features of a fullstack admin web application using ReactJS and ASP.NET Web API, focusing on article management and authentication. Implemented JWT-based authentication to secure user login and protect API endpoints. Designed and developed CRUD operations for article management, including creating, updating, deleting, and retrieving articles. Built responsive frontend components with React for form handling, data presentation, and user interactions, and integrated them with backend services via RESTful APIs.",
  },
  {
    name: "TechStore E-Commerce",
    tagline: "End-to-end e-commerce web application with product catalog, shopping cart, order processing & role-based authorization",
    tech: ["ASP.NET MVC", "C#", "SQL Server", "EF Core"],
    github: "https://github.com/vqt2129a/techstore-aspnetmvc-ecommerce",
    icon: "🛒",
    fullDescription: "Designed and developed an end-to-end e-commerce web application using ASP.NET MVC and C#, covering the complete shopping workflow from product browsing to order processing. Implemented core features including product catalog management, shopping cart functionality, and order processing. Built backend logic using Entity Framework for efficient database interaction and data persistence. Developed dynamic server-rendered UI using Razor, handling user interactions and data presentation. Implemented user authentication and role-based authorization to ensure secure access for customers and administrators. Applied the MVC architecture to structure the application, ensuring clear separation of concerns and maintainability.",
  },
  {
    name: "EVDict",
    tagline: "Dictionary application with Android client & backend API for real-time word search and retrieval",
    tech: ["Kotlin", "Android", "REST API"],
    github: "https://github.com/vqt2129a/evdict-android-api",
    icon: "📖",
    fullDescription: "Designed and developed a dictionary application consisting of an Android client and a backend API, enabling users to search and retrieve word meanings efficiently. Built the Android application to handle user input, display search results, and communicate with backend services. Developed RESTful APIs to process search requests and return dictionary data. Implemented client–server communication between the Android app and backend using HTTP APIs, ensuring real-time data retrieval and smooth user experience. Structured the backend to handle query processing and data management effectively.",
  },
  {
    name: "FilmStream",
    tagline: "Movie streaming web application with search, filtering, user authentication & engagement features",
    tech: ["ASP.NET MVC", "C#", "SQL Server", "EF Core"],
    github: "https://github.com/vqt2129a/filmstream-aspnetmvc",
    icon: "🎬",
    fullDescription: "Designed and developed a movie streaming web application using ASP.NET MVC and SQL Server, enabling users to browse, search, and watch movies through a web interface. Implemented core features including movie listing, search and filtering, and detailed movie pages. Built backend logic using Entity Framework for efficient database interaction and data management. Developed dynamic server-rendered UI using Razor, handling user interactions and content display. Implemented user authentication and authorization using ASP.NET Identity, supporting login, registration, and user profile management. Integrated user interaction features such as comments, likes, and view tracking to enhance user engagement. Applied the MVC architecture to structure the application, ensuring maintainability and scalability.",
  },
];



function useInView(ref: RefObject<HTMLDivElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

interface ProjectsSectionProps {
  animating: boolean;
}

export default function ProjectsSection({ animating }: ProjectsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <div
      ref={ref}
      className="proj-wrapper"
      style={{
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(12px)" : "translateY(0)",
      }}
    >
      <div
        className="proj-container"
        data-in-view={inView || !animating ? "true" : "false"}
      >
        <span className="proj-label">Projects</span>
        <h2 className="proj-heading">
          My <span>projects.</span>
        </h2>

        <div className="proj-grid">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.name}
              className="proj-card"
              style={{ transitionDelay: `${0.1 + idx * 0.08}s` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="proj-card-header">
                <span className="proj-card-icon">{project.icon}</span>
                <div className="proj-card-links" onClick={(e) => e.stopPropagation()}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-link" title="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="proj-link" title="Live Demo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <h3 className="proj-card-name">{project.name}</h3>
              <p className="proj-card-tagline">{project.tagline}</p>

              <div className="proj-card-tech">
                {project.tech.map((t) => (
                  <span key={t} className="proj-tech-tag">{t}</span>
                ))}
              </div>

              <div className="proj-view-more">
                View Details
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="proj-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="proj-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="proj-modal-close" onClick={() => setSelectedProject(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="proj-modal-header">
              <span className="proj-modal-icon">{selectedProject.icon}</span>
              <h3 className="proj-modal-name">{selectedProject.name}</h3>
            </div>

            <div className="proj-modal-body">
              <div className="proj-modal-tech">
                {selectedProject.tech.map(t => (
                  <span key={t} className="proj-tech-tag">{t}</span>
                ))}
              </div>

              <p className="proj-modal-description">
                {selectedProject.fullDescription}
              </p>

              <div className="proj-modal-links">
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="proj-modal-btn github">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  Repository
                </a>
                {selectedProject.demo && (
                  <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="proj-modal-btn demo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                    Live Preview
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
