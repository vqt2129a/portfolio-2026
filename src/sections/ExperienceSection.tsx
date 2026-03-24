import { useRef, useState, useEffect, type RefObject } from "react";

interface ProjectItem {
  name: string;
  desc: string;
}

interface TimelineItem {
  period: string;
  company: string;
  role: string;
  tech: string[];
  summary: string;
  projects: ProjectItem[];
}

const TIMELINE: TimelineItem[] = [
  {
    period: "Jan 2026 → Present",
    company: "ITECCOM Technology Company Limited",
    role: "Full-stack Developer",
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
    period: "Oct → Dec 2025",
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
                <h3 className="exp-card-company">{item.company}</h3>
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
