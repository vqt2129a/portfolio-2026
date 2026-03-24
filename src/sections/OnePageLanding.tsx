import { Suspense, lazy } from "react";
import QTLogo from "../components/QTLogo";
import { SECTION_LABELS } from "../constants/landing";
import { useOnePageNavigation } from "../hooks/useOnePageNavigation";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";

const IntroScenes = lazy(() => import("../scenes/IntroScenes"));

export default function OnePageLanding() {
  const { current, animating, goTo, sections } = useOnePageNavigation();

  return (
    <main className="onepage-main">
      <div className="onepage-bg">
        <Suspense fallback={<div className="onepage-fallback-bg" />}>
          <IntroScenes />
        </Suspense>
      </div>
      <div className="onepage-grid-overlay" />

      <div className="onepage-content-layer">
        {current === "home" && <HeroSection animating={animating} />}
        {current === "about" && <AboutSection animating={animating} />}
        {current === "experience" && <ExperienceSection animating={animating} />}
        {current === "project" && <ProjectsSection animating={animating} />}
      </div>

      {/* Scroll indicator — visible on all sections */}
      <div className="scroll-indicator" style={{ opacity: animating ? 0 : 1 }}>
        <span className="scroll-text">Scroll</span>
        <div className="scroll-mouse">
          <div className="scroll-mouse-dot" />
        </div>
      </div>

      <nav className="onepage-nav">
        <a
          href="#"
          className="onepage-logo"
          onClick={(event) => {
            event.preventDefault();
            goTo("home");
          }}
        >
          <QTLogo />
        </a>

        <div className="onepage-nav-links">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => goTo(section)}
              className={`onepage-nav-item ${current === section ? "active" : ""}`}
            >
              {SECTION_LABELS[section]}
            </button>
          ))}

          <a href="mailto:voquangthanh.dev@gmail.com" className="onepage-cta-btn">
            Hire me
          </a>
        </div>
      </nav>

      <div className="onepage-dots">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => goTo(section)}
            className={`onepage-dot ${current === section ? "active" : ""}`}
            aria-label={section}
          />
        ))}
      </div>
    </main>
  );
}
