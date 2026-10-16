import { useState, useEffect, useCallback, useRef } from 'react';
import { Terminal, Code2, Zap, Mail, ArrowRight, Sun, Moon, Waves } from 'lucide-react';

// Newer lucide-react versions dropped brand icons, so these are inlined.
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const Github = ({ className }: { className?: string }) => (
  <svg {...svgProps} className={className} aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg {...svgProps} className={className} aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BOOT_LINES = [
  "> INITIALIZING SYSTEM...",
  "> LOADING KERNEL MODULES............... [OK]",
  "> ESTABLISHING SECURE CONNECTION........ [OK]",
  "> MOUNTING /dev/creative................ [OK]",
  "> DECRYPTING PORTFOLIO DATA............. [OK]",
  "> CALIBRATING DISPLAY MATRIX............ [OK]",
  "> LOADING AARYA MISHRA.................. [OK]",
  "> SYSTEM READY_",
];

const SCRAMBLE_CHARS = "!<>-_/\\[]{}—=+*^?#@$%&";

// Respect users who ask their OS to reduce motion
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useScramble(target: string, active: boolean) {
  const [display, setDisplay] = useState(target);
  const raf = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active || prefersReducedMotion()) {
      setDisplay(target);
      return;
    }

    let iter = 0;
    const totalFrames = target.length * 3;

    const tick = () => {
      setDisplay(
        target
          .split("")
          .map((_, i) =>
            i < iter / 3
              ? target[i]
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          )
          .join("")
      );
      iter++;
      if (iter <= totalFrames) {
        raf.current = setTimeout(tick, 30);
      } else {
        setDisplay(target);
      }
    };

    tick();
    return () => {
      if (raf.current) clearTimeout(raf.current);
    };
  }, [active, target]);

  return display;
}

const GITHUB = "https://github.com/aaryaiscoding";

const PROJECTS = [
  {
    title: "SAGAR_TRACE",
    type: "MARINE SAFETY",
    desc: "Marine oil spill detection and investigation system built for the Smart India Hackathon.",
    color: "#39ff14",
    icon: <Waves className="w-8 h-8" />,
    href: "https://github.com/aaryaiscoding/sagar",
  },
  {
    title: "ONCORA",
    type: "HEALTHCARE SYSTEMS",
    desc: "Federated learning system for brain tumor classification and prescription safety. Simulated hospital nodes train locally on MRI data via CNN, aggregate through FedAvg, while an NLP module flags dangerous drug interactions from prescription text.",
    color: "#bc13fe",
    icon: <ArrowRight className="w-8 h-8" />,
    href: "https://github.com/aaryaiscoding/oncora",
  },
  {
    title: "PHISH_NET",
    type: "THREAT DETECTION",
    desc: "Two-stage phishing detector combining classical ML models with screenshot-based CNN analysis. 30+ engineered URL/DOM features, 97.4% accuracy across 11,000+ samples.",
    color: "#39ff14",
    icon: <Zap className="w-8 h-8" />,
    href: "https://github.com/aaryaiscoding/phishing-detection",
  },
  {
    title: "BOT_SENTINEL",
    type: "BROWSER SECURITY",
    desc: "Detects automated browsers by fingerprinting WebDriver flags, automation globals, and interaction-timing patterns. Validated against spoofed environments using headless simulation.",
    color: "#bc13fe",
    icon: <Terminal className="w-8 h-8" />,
    href: "https://github.com/aaryaiscoding/bot-detection",
  },
  {
    title: "INBOX_TRIAGE",
    type: "AUTOMATION",
    desc: "OAuth 2.0-secured email manager with token refresh and Gmail API integration. Rule-based filtering automates spam and phishing triage at scale.",
    color: "#39ff14",
    icon: <Code2 className="w-8 h-8" />,
    href: "https://github.com/aaryaiscoding/email-cleaner-ver2",
  },
];

function ProjectCard({
  project,
  isDark,
  className = "",
}: {
  project: (typeof PROJECTS)[number];
  isDark: boolean;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const title = useScramble(project.title, hovered);

  return (
    <div
      className={`group border-4 p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:translate-x-2 ${
        project.color === "#39ff14"
          ? "border-[#39ff14] hover:shadow-[-8px_8px_0_#bc13fe]"
          : "border-[#bc13fe] hover:shadow-[-8px_8px_0_#39ff14]"
      } ${isDark ? "bg-black" : "bg-white"} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity"
        style={{ color: project.color }}
      >
        {project.icon}
      </div>

      <p
        className="text-sm tracking-widest mb-2 font-['Share_Tech_Mono',monospace]"
        style={{ color: project.color }}
      >
        [{project.type}]
      </p>

      <h3
        className="text-3xl font-['Black_Han_Sans',sans-serif] uppercase tracking-tight mb-4 transition-colors font-bold"
        style={{ color: hovered ? project.color : isDark ? "#fff" : "#0a0a0a" }}
      >
        {title}
      </h3>

      <p
        className={`leading-relaxed mb-8 font-['Share_Tech_Mono',monospace] text-sm ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {project.desc}
      </p>

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-2 uppercase tracking-widest text-sm font-bold border-b-2 pb-1 transition-all font-['Share_Tech_Mono',monospace]"
        style={{ borderColor: project.color, color: project.color }}
      >
        Access File <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

const NAV = [
  { label: "[WORK]", href: "#work" },
  { label: "[ABOUT]", href: "#about" },
  { label: "[PING]", href: "#contact" },
];

export function GlitchNeon() {
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [isDark, setIsDark] = useState(true);
  const [glitching, setGlitching] = useState(false);
  const [navHover, setNavHover] = useState<string | null>(null);
  const navTitle = useScramble("AM_SYS.init()", navHover === "logo");

  useEffect(() => {
    if (prefersReducedMotion()) {
      setBooted(true);
      return;
    }

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const reveal = () => {
      if (i < BOOT_LINES.length) {
        setBootLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
        timer = setTimeout(
          reveal,
          i === BOOT_LINES.length - 1 ? 500 : Math.random() * 180 + 80
        );
      } else {
        timer = setTimeout(() => setBooted(true), 700);
      }
    };

    timer = setTimeout(reveal, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!booted || prefersReducedMotion()) return;

    let timeout: ReturnType<typeof setTimeout>;
    let inner: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const quiet = Math.random() * 4000 + 1500;
      timeout = setTimeout(() => {
        setGlitching(true);
        const duration = Math.random() * 300 + 100;
        inner = setTimeout(() => {
          setGlitching(false);
          scheduleNext();
        }, duration);
      }, quiet);
    };

    scheduleNext();
    return () => {
      clearTimeout(timeout);
      clearTimeout(inner);
    };
  }, [booted]);

  const handleClick = useCallback(() => {
    if (prefersReducedMotion()) return;
    setGlitching(true);
    setTimeout(() => setGlitching(false), 250);
  }, []);

  const bg = isDark ? "#000" : "#f0f0f0";
  const fg = isDark ? "#fff" : "#0a0a0a";
  const dimFg = isDark ? "#6b7280" : "#4b5563";
  const navBorder = isDark ? "#39ff14" : "#1a7a00";
  const green = isDark ? "#39ff14" : "#1a7a00";
  const purple = isDark ? "#bc13fe" : "#7b00c2";

  return (
    <div
      className="min-h-screen overflow-x-hidden font-['Share_Tech_Mono',monospace]"
      style={{
        backgroundColor: bg,
        color: fg,
        transition: "background-color 0.3s, color 0.3s",
      }}
      onClick={handleClick}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Share+Tech+Mono&display=swap');

        html { scroll-behavior: smooth; }
        section[id] { scroll-margin-top: 24px; }

        .scanlines {
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.12));
          background-size: 100% 4px;
          position: fixed; inset: 0;
          pointer-events: none;
          z-index: 100;
          opacity: ${isDark ? 1 : 0.3};
          transition: opacity 0.3s;
        }

        .glitch-hero { position: relative; display: inline-block; }
        .glitch-hero::before,
        .glitch-hero::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          background: ${bg};
        }
        .glitch-hero::before {
          left: ${glitching ? "6px" : "2px"};
          text-shadow: ${glitching ? "-4px 0 red" : "-1px 0 red"};
          animation: ${glitching ? "glitch-burst 0.08s infinite linear" : "glitch-idle 4s infinite linear alternate-reverse"};
          opacity: ${glitching ? 1 : 0.6};
        }
        .glitch-hero::after {
          left: ${glitching ? "-6px" : "-2px"};
          text-shadow: ${glitching ? "-4px 0 blue" : "-1px 0 blue"};
          animation: ${glitching ? "glitch-burst-2 0.1s infinite linear alternate-reverse" : "glitch-idle-2 5s infinite linear alternate-reverse"};
          opacity: ${glitching ? 1 : 0.6};
        }

        @keyframes glitch-idle {
          0%   { clip-path: inset(80% 0 10% 0); transform: translate(-1px, 0); }
          25%  { clip-path: inset(20% 0 70% 0); transform: translate(1px, 0); }
          50%  { clip-path: inset(50% 0 40% 0); transform: translate(0, 0); }
          75%  { clip-path: inset(10% 0 85% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(60% 0 30% 0); transform: translate(1px, 0); }
        }
        @keyframes glitch-idle-2 {
          0%   { clip-path: inset(10% 0 70% 0); transform: translate(1px, 0); }
          33%  { clip-path: inset(40% 0 20% 0); transform: translate(-1px, 0); }
          66%  { clip-path: inset(70% 0 10% 0); transform: translate(0, -1px); }
          100% { clip-path: inset(5% 0 80% 0); transform: translate(1px, 1px); }
        }
        @keyframes glitch-burst {
          0%   { clip-path: inset(5% 0 60% 0);  transform: translate(-5px, 2px); }
          20%  { clip-path: inset(40% 0 5% 0);  transform: translate(5px, -3px); }
          40%  { clip-path: inset(70% 0 15% 0); transform: translate(-4px, 1px); }
          60%  { clip-path: inset(15% 0 75% 0); transform: translate(4px, -2px); }
          80%  { clip-path: inset(55% 0 25% 0); transform: translate(-3px, 3px); }
          100% { clip-path: inset(25% 0 50% 0); transform: translate(3px, -1px); }
        }
        @keyframes glitch-burst-2 {
          0%   { clip-path: inset(60% 0 5% 0);  transform: translate(5px, -2px); }
          20%  { clip-path: inset(10% 0 55% 0); transform: translate(-5px, 3px); }
          40%  { clip-path: inset(80% 0 5% 0);  transform: translate(4px, -1px); }
          60%  { clip-path: inset(30% 0 40% 0); transform: translate(-4px, 2px); }
          80%  { clip-path: inset(5% 0 70% 0);  transform: translate(3px, -3px); }
          100% { clip-path: inset(45% 0 20% 0); transform: translate(-3px, 1px); }
        }

        .neon-border-green  { box-shadow: 0 0 10px ${green}88, inset 0 0 10px ${green}22; }
        .neon-border-purple { box-shadow: 0 0 10px ${purple}88, inset 0 0 10px ${purple}22; }

        .mode-btn {
          border: 2px solid ${green}; color: ${green}; background: transparent;
          padding: 4px 14px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;
          cursor: pointer; transition: background 0.15s, color 0.15s;
          display: flex; align-items: center; gap: 6px;
        }
        .mode-btn:hover { background: ${green}; color: #000; }

        .blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .boot-screen {
          position: fixed; inset: 0; background: #000;
          display: flex; flex-direction: column; justify-content: center;
          padding: 10vw; z-index: 200;
          font-family: 'Share Tech Mono', monospace;
        }
        .boot-line {
          color: #39ff14;
          font-size: clamp(11px, 1.4vw, 16px);
          line-height: 2; letter-spacing: 0.05em;
          animation: fadeIn 0.1s ease-out;
        }
        .boot-line.last { color: #fff; font-size: clamp(13px, 1.7vw, 20px); }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .page-enter { animation: pageIn 0.6s ease-out both; }
        @keyframes pageIn {
          from { opacity: 0; filter: brightness(3) saturate(0); }
          to   { opacity: 1; filter: brightness(1) saturate(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .glitch-hero::before, .glitch-hero::after { animation: none; }
          .blink, .page-enter, .boot-line { animation: none; }
          html { scroll-behavior: auto; }
        }
      `,
        }}
      />

      <div className="scanlines" aria-hidden="true" />

      {!booted && (
        <div className="boot-screen" aria-hidden="true">
          {bootLines.map((line, i) => (
            <div
              key={i}
              className={`boot-line ${
                i === bootLines.length - 1 && i === BOOT_LINES.length - 1 ? "last" : "done"
              }`}
            >
              {line}
            </div>
          ))}
          {bootLines.length < BOOT_LINES.length && <span className="boot-line blink">_</span>}
        </div>
      )}

      {booted && (
        <div className="page-enter relative z-10">
          <nav
            className="px-6 py-4 flex flex-wrap gap-4 justify-between items-center border-b-2"
            style={{ borderColor: navBorder }}
          >
            <div
              className="font-bold text-xl tracking-widest cursor-pointer"
              style={{ color: green }}
              onMouseEnter={() => setNavHover("logo")}
              onMouseLeave={() => setNavHover(null)}
            >
              {navTitle}
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm uppercase tracking-widest">
              {NAV.map(({ label, href }, i) => (
                <a
                  key={label}
                  href={href}
                  className="transition-colors"
                  style={{
                    color: navHover === label ? (i % 2 === 0 ? green : purple) : dimFg,
                  }}
                  onMouseEnter={() => setNavHover(label)}
                  onMouseLeave={() => setNavHover(null)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {label}
                </a>
              ))}

              <button
                className="mode-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDark((d) => !d);
                }}
              >
                {isDark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                INVERT_DISPLAY
              </button>
            </div>
          </nav>

          <main className="max-w-6xl mx-auto px-6 py-20">
            <section className="mb-32 pt-10">
              <p className="mb-4 text-lg border-l-2 pl-4" style={{ color: green, borderColor: green }}>
                STATUS: ONLINE_
              </p>

              <h1
                className="glitch-hero text-6xl sm:text-7xl md:text-9xl font-['Black_Han_Sans',sans-serif] uppercase tracking-tighter mb-6"
                data-text="AARYA MISHRA"
                style={{ color: fg }}
              >
                AARYA MISHRA
              </h1>

              <div
                className="inline-block px-3 py-1 font-bold text-lg sm:text-xl mb-8 uppercase transform -skew-x-12"
                style={{ backgroundColor: purple, color: "#fff" }}
              >
                Security-minded builder: ML, APIs, and things that break on purpose
              </div>

              <p
                className="max-w-2xl text-lg leading-relaxed border-l-4 pl-6 ml-2"
                style={{ color: dimFg, borderColor: purple }}
              >
                I like breaking things to understand how they hold together —
                currently learning my way through security and database systems,
                with a few projects that lean into data work along the way.
                <br />
                <br />
                <span style={{ color: green }}>{">"} System override ready.</span>
              </p>

              <p className="mt-6 text-xs tracking-widest" style={{ color: dimFg }}>
                // CLICK ANYWHERE TO FORCE A GLITCH
              </p>
            </section>

            <section id="about" className="mb-32">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold tracking-widest whitespace-nowrap" style={{ color: purple }}>
                  {">>_ABOUT"}
                </h2>
                <div className="flex-1 h-[2px] neon-border-purple" style={{ backgroundColor: purple }} />
              </div>

              <div className="max-w-2xl space-y-6 leading-relaxed" style={{ color: dimFg }}>
                <p>
                  Final-year Computer Science Engineering student at Bangalore
                  Institute of Technology. Java is the language I think in; Python
                  is where most of my ML and security tooling lives.
                </p>
                <p>
                  My security grounding comes from pwn.college and hands-on web
                  testing with Burp Suite against the OWASP Top 10. I pair that
                  with machine learning, which is how the phishing detector and
                  Oncora came together.
                </p>
                <p style={{ color: green }}>
                  {">"} Stack: Java, Spring Boot, Python, ML, Burp Suite, OAuth 2.0
                </p>
              </div>
            </section>

            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-3xl font-bold tracking-widest whitespace-nowrap" style={{ color: green }}>
                {">>_ARCHIVE"}
              </h2>
              <div className="flex-1 h-[2px] neon-border-green" style={{ backgroundColor: green }} />
            </div>

            <section id="work" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
              {PROJECTS.map((project, i) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  isDark={isDark}
                  className={
                    i === PROJECTS.length - 1 && PROJECTS.length % 2 === 1 ? "md:col-span-2" : ""
                  }
                />
              ))}
            </section>

            <div className="flex items-center gap-4 mb-16">
              <div className="flex-1 h-[2px] neon-border-purple" style={{ backgroundColor: purple }} />
              <h2 className="text-3xl font-bold tracking-widest whitespace-nowrap" style={{ color: purple }}>
                TRANSMISSION_
              </h2>
            </div>

            <section id="contact" className="mb-20">
              <div className="border-4 p-8 md:p-16 relative" style={{ borderColor: purple }}>
                <div
                  className="absolute -top-4 left-8 px-4 text-xl font-bold tracking-widest"
                  style={{ backgroundColor: bg, color: purple }}
                >
                  [ESTABLISH_CONNECTION]
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3
                      className="text-4xl font-['Black_Han_Sans',sans-serif] uppercase tracking-tighter mb-6"
                      style={{ color: fg }}
                    >
                      LET'S TALK
                    </h3>

                    <p className="mb-8 leading-relaxed text-sm" style={{ color: dimFg }}>
                      Open to conversations about security, ML, and anything
                      worth breaking on purpose. Send a ping and I'll reply.
                    </p>

                    <a
                      href="mailto:aarumishra38@gmail.com"
                      className="inline-flex items-center gap-3 px-8 py-4 font-bold uppercase tracking-widest transition-colors"
                      style={{ backgroundColor: green, color: "#000" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="w-5 h-5" />
                      INITIATE PING
                    </a>
                  </div>

                  <div className="flex flex-col gap-6 justify-center">
                    {[
                      {
                        icon: <Github className="w-6 h-6" />,
                        text: "GITHUB // @AARYAISCODING",
                        col: green,
                        href: GITHUB,
                      },
                      {
                        icon: <Linkedin className="w-6 h-6" />,
                        text: "LINKEDIN // AARYA_MISHRA",
                        col: purple,
                        href: "https://www.linkedin.com/in/aarya-mishra-68685a297/",
                      },
                    ].map(({ icon, text, col, href }) => (
                      <a
                        key={text}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 transition-colors text-sm tracking-widest"
                        style={{ color: dimFg }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = col)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = dimFg)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {icon}
                        <span>{text}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer
            className="border-t-2 p-6 text-center text-xs tracking-widest"
            style={{ borderColor: green, color: dimFg }}
          >
            <p>END_OF_FILE // {new Date().getFullYear()} // AARYA MISHRA</p>
          </footer>
        </div>
      )}
    </div>
  );
}
