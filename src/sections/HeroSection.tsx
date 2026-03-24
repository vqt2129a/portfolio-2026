import { useEffect, useRef, useState } from "react";

const ROLES = ["Full Stack Developer", "React / Node.js", "Problem Solver"];

function TypedRole() {
  const [display, setDisplay] = useState("");
  const state = useRef({ ri: 0, ci: 0, deleting: false });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function loop() {
      const { ri, deleting } = state.current;
      const word = ROLES[ri];
      if (!deleting) {
        state.current.ci++;
        setDisplay(word.slice(0, state.current.ci));
        if (state.current.ci === word.length) {
          state.current.deleting = true;
          timeout = setTimeout(loop, 2200);
          return;
        }
      } else {
        state.current.ci--;
        setDisplay(word.slice(0, state.current.ci));
        if (state.current.ci === 0) {
          state.current.deleting = false;
          state.current.ri = (ri + 1) % ROLES.length;
        }
      }
      timeout = setTimeout(loop, deleting ? 38 : 68);
    }
    timeout = setTimeout(loop, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <p className="hero-typed">
      <span className="hero-typed-text">{display}</span>
      <span className="hero-caret" />
    </p>
  );
}

interface HeroSectionProps {
  animating: boolean;
}

export default function HeroSection({ animating }: HeroSectionProps) {
  return (
    <div
      className="hero-content"
      style={{
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(12px)" : "translateY(0)",
      }}
    >
      <div className="hero-center">
        <h1 className="hero-name hero-glitch">Vo Quang Thanh</h1>
        <TypedRole />

        <p className="hero-tagline">
          Crafting modern web experiences with clean code &amp; sharp design.
        </p>
      </div>
    </div>
  );
}
