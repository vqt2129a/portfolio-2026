import { useRef, useState, useEffect, type RefObject } from "react";

interface ProjectItem {
  name: string;
  desc: string;
}

interface TimelineItem {
  period: string;
  company: string;
  role: string;
  link?: string;
  tech: string[];
  summary: string;
  projects: ProjectItem[];
}

const TIMELINE: TimelineItem[] = [
  {
    period: "06/2026 - 07/2026",
    company: "Freelance — Driving School Web Portal",
    role: "Full-stack Developer",
    link: "https://daotaolaixehiepthanh.vn",
    tech: ["ASP.NET Core 9", "React 18", "Node.js", "Prisma ORM", "SQL Server", "Tailwind CSS"],
    summary: "Built an end-to-end web system comprising an SEO-friendly public landing portal (.NET 9 MVC), an Admin SPA Dashboard (ReactJS, Vite), and a centralized Backend API (Node.js, Prisma, SQL Server).",
    projects: [
      {
        name: "Single Page Admin Dashboard",
        desc: "Developed a responsive SPA Admin Dashboard using React 18, Vite, and Tailwind CSS, integrating rich-text editors to manage course offerings, news articles, instructor profiles, and dynamic banners.",
      },
      {
        name: "Client-side Navigation & Auth",
        desc: "Configured client-side navigation with React Router v7 and centralized Axios interceptors to manage JWT authentication flow, token storage, and secure, role-based route protection.",
      },
      {
        name: "RESTful API & Database Schema",
        desc: "Designed and implemented the RESTful API & database schema on SQL Server using Prisma ORM, implementing soft deletes, transaction validation logic, and password hashing with Bcryptjs.",
      },
      {
        name: "SEO Public Portal (.NET 9 MVC)",
        desc: "Architected server-side rendered public pages using ASP.NET Core 9 MVC, connecting to the Node.js API via HttpClient and implementing custom Action Filters, slug-based routing, and dynamic Open Graph/Meta tags.",
      },
    ],
  },
  {
    period: "10/2025 - 05/2026",
    company: "ITECCOM Technology Company Limited",
    role: "Fresher Full-stack Developer",
    tech: ["ASP.NET Core 8", "ASP.NET MVC 5", "SQL Server", "JavaScript", "REST API"],
    summary: "Building enterprise web applications — from database design to production UI.",
    projects: [
      {
        name: "Digital Signature Platform",
        desc: "Multi-method contract signing (image, USB Token), bulk sign, contract type management — designed DB, UI & backend from scratch",
      },
      {
        name: "CRM Saigontourist",
        desc: "Maintained enterprise CRM — loyalty system, member cards, Vetour API transaction sync",
      },
      {
        name: "BMWindows Portal",
        desc: "App Launcher portal & Admin CMS with dynamic resource management (icons, URLs, statuses)",
      },
    ],
  },
  {
    period: "08/2025 - 10/2025",
    company: "Computing Community and Technology Corporation",
    role: "Intern Full-stack Developer",
    tech: ["ReactJS", "ASP.NET Core", "SQL Server", "JWT", "RESTful API"],
    summary: "First professional experience building a full-stack admin system end-to-end.",
    projects: [
      {
        name: "Admin Web Application",
        desc: "Full-stack CMS with React + ASP.NET — JWT auth, article & account management with pagination & filtering",
      },
    ],
  },
];

function useInView(ref: RefObject<HTMLDivElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

interface ExperienceSectionProps {
  animating: boolean;
}

export default function ExperienceSection({ animating }: ExperienceSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className="exp-wrapper"
      style={{
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(12px)" : "translateY(0)",
      }}
    >
      <div
        className="exp-container"
        data-in-view={inView || !animating ? "true" : "false"}
      >
        <span className="exp-label">Experience</span>
        <h2 className="exp-heading">
          Work <span>journey.</span>
        </h2>

        <div className="exp-timeline">
          {TIMELINE.map((item, idx) => (
            <div key={idx} className="exp-card">
              {/* Left: Company info */}
              <div className="exp-card-left">
                <div className="exp-card-period">{item.period}</div>
                <div className="exp-card-company-header">
                  <h3 className="exp-card-company">{item.company}</h3>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="exp-company-link"
                      title={item.link}
                    >
                      <span>{item.link.replace(/^https?:\/\//, '')}</span>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
                <div className="exp-card-role">{item.role}</div>
                <p className="exp-card-summary">{item.summary}</p>
                <div className="exp-card-tech">
                  {item.tech.map((t) => (
                    <span key={t} className="exp-tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Right: Projects */}
              <div className="exp-card-right">
                {item.projects.map((project) => (
                  <div key={project.name} className="exp-project-chip">
                    <h4 className="exp-project-name">
                      <span className="exp-project-dot" />
                      {project.name}
                    </h4>
                    <p className="exp-project-desc">{project.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
