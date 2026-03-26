import { useRef, useState, useEffect, type RefObject } from "react";

const STACK = [
  "React", "TypeScript", "Node.js", ".NET",
  "Tailwind", "SQL Server", "Docker", "Git", "NestJS",
];

const FOCUS_ITEMS = [
  "Building responsive and performant products",
  "Designing clean APIs and maintainable codebases",
  "Turning business goals into smooth user journeys",
];

function useInView(ref: RefObject<HTMLDivElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

interface AboutSectionProps {
  animating: boolean;
}

export default function AboutSection({ animating }: AboutSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className="about-wrapper"
      style={{
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(12px)" : "translateY(0)",
      }}
    >
      <div
        className="about-shell"
        data-in-view={inView || !animating ? "true" : "false"}
      >
        {/* Left column */}
        <div className="about-left">
          <span className="about-label">About me</span>

          <h2 className="about-heading">
            Full-stack developer
            <br />
            <span>with product mindset.</span>
          </h2>

          <p className="about-copy">
            I build modern web experiences that are fast, clean, and easy to
            scale. I care about details in both code quality and visual polish,
            so products feel reliable from backend to interface.
          </p>

          <div className="about-highlights">
            <div className="about-highlight-item">
              <span className="about-highlight-value">1+ Year</span>
              <span className="about-highlight-label">Experience</span>
            </div>
            <div className="about-highlight-item">
              <span className="about-highlight-value">5+</span>
              <span className="about-highlight-label">Projects</span>
            </div>
            <div className="about-highlight-item">
              <span className="about-highlight-value">5+</span>
              <span className="about-highlight-label">Technologies</span>
            </div>
          </div>

          <div className="about-links">
            <a href="/Vo_Quang_Thanh_CV.pdf" target="_blank" rel="noopener noreferrer" className="about-link-btn about-link-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
            <a
              href="https://github.com/vqt2129a"
              target="_blank"
              rel="noopener noreferrer"
              className="about-link-btn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Right column */}
        <div className="about-right">
          <article className="about-panel">
            <p className="about-panel-title">Now focused on</p>
            <ul className="about-focus-list">
              {FOCUS_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="about-panel">
            <p className="about-panel-title">Tech stack</p>
            <div className="about-chip-list">
              {STACK.map((tech) => (
                <span key={tech} className="about-chip">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}