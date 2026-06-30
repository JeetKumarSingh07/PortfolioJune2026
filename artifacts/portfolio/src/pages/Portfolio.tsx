import { useEffect, useRef, useState } from "react";
import "../portfolio.css";

const PHOTO_SRC =
  "data:image/jpeg;base64,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";

interface GhRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
}

export default function Portfolio() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const skillsCanvasRef = useRef<HTMLCanvasElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const neuralCanvasRef = useRef<HTMLCanvasElement>(null);
  const eduCanvasRef = useRef<HTMLCanvasElement>(null);
  const aboutChartRef = useRef<HTMLCanvasElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);

  const [accVal, setAccVal] = useState("94.2%");
  const [lossVal, setLossVal] = useState("0.082");
  const [valVal, setValVal] = useState("93.7%");
  const [ghRepos, setGhRepos] = useState<GhRepo[]>([]);
  const [ghLoading, setGhLoading] = useState(true);
  const [ghError, setGhError] = useState("");
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | ""; msg: string }>({ type: "", msg: "" });
  const [fname, setFname] = useState("");
  const [femail, setFemail] = useState("");
  const [fsubject, setFsubject] = useState("");
  const [fmessage, setFmessage] = useState("");
  const [barWidths, setBarWidths] = useState([0, 0, 0, 0, 0, 0]);
  const [barLabels, setBarLabels] = useState(["0%", "0%", "0%", "0%", "0%", "0%"]);
  const [counters, setCounters] = useState([0, 0, 0]);

  const barTargets = [92, 88, 85, 87, 80, 74];

  useEffect(() => {
    const ticker = tickerTrackRef.current;
    if (!ticker) return;
    const items = [
      { l: "Python", v: "★ 92%" }, { l: "SQL", v: "88%" }, { l: "Power BI", v: "85%" },
      { l: "Amazon ML", v: "✓ 2026" }, { l: "ETL speed", v: "+60%" }, { l: "Task completion", v: "+35%" },
      { l: "CGPA", v: "7.54" }, { l: "Hackathons", v: "3+" }, { l: "ML accuracy", v: "~94%" },
      { l: "Pandas", v: "Expert" }, { l: "ISRO 2025", v: "✓ Cert" }, { l: "AppZime", v: "Intern ✓" },
    ];
    [...items, ...items].forEach(it => {
      const el = document.createElement("div");
      el.className = "ticker-item";
      el.innerHTML = `<span>${it.l}</span><span class="ticker-val">${it.v}</span>`;
      ticker.appendChild(el);
    });
  }, []);

  useEffect(() => {
    const phrases = [
      "Turning raw data into decisions.",
      "Python · Pandas · NumPy · SQL.",
      "ETL pipelines & BI dashboards.",
      "Amazon ML Summer School 2026 ✓",
    ];
    let ti = 0, tc = 0, td = false;
    let timer: ReturnType<typeof setTimeout>;
    const el = typewriterRef.current;
    if (!el) return;
    function ts() {
      if (!el) return;
      const ph = phrases[ti];
      if (!td) {
        el.textContent = ph.slice(0, tc + 1);
        tc++;
        if (tc === ph.length) { td = true; timer = setTimeout(ts, 1900); return; }
      } else {
        el.textContent = ph.slice(0, tc - 1);
        tc--;
        if (tc === 0) { td = false; ti = (ti + 1) % phrases.length; }
      }
      timer = setTimeout(ts, td ? 36 : 60);
    }
    timer = setTimeout(ts, 700);
    return () => clearTimeout(timer);
  }, []);

  function hexGrid(canvas: HTMLCanvasElement, sec: HTMLElement, fillColor: string, strokeColor: (a: string) => string, animated: boolean) {
    const s = 38, w = s * 2, h = Math.sqrt(3) * s;
    let hexes: { x: number; y: number; ph: number }[] = [];
    function buildHexes() {
      canvas.width = sec.offsetWidth || 900;
      canvas.height = sec.offsetHeight || 600;
      const cols = Math.ceil(canvas.width / (w * 0.75)) + 3;
      const rows = Math.ceil(canvas.height / h) + 3;
      hexes = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          hexes.push({ x: c * w * 0.75 - s, y: r * h + (c % 2 === 0 ? 0 : h / 2) - h / 2, ph: Math.random() * Math.PI * 2 });
    }
    buildHexes();
    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { buildHexes(); if (!animated) draw(); }, 120); }
    window.addEventListener("resize", onResize);
    function hexPath(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 180) * (60 * i - 30);
        i === 0 ? ctx.moveTo(x + size * Math.cos(a), y + size * Math.sin(a)) : ctx.lineTo(x + size * Math.cos(a), y + size * Math.sin(a));
      }
      ctx.closePath();
    }
    let t = 0;
    let rafId: number;
    let alive = true;
    function draw() {
      if (!alive) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hexes.forEach(hx => {
        const p = animated ? (Math.sin(t * 0.018 + hx.ph) + 1) / 2 : 0.3;
        hexPath(ctx, hx.x, hx.y, s - 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
        const alpha = (0.08 + p * 0.22).toFixed(3);
        ctx.strokeStyle = strokeColor(alpha);
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      if (animated) { t++; rafId = requestAnimationFrame(draw); }
    }
    draw();
    return () => { alive = false; cancelAnimationFrame(rafId); window.removeEventListener("resize", onResize); };
  }

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const sections = [
      { canvas: heroCanvasRef.current, sec: document.getElementById("hero"), fill: "rgba(255,153,0,0.025)", stroke: (a: string) => `rgba(255,153,0,${a})`, anim: true },
      { canvas: skillsCanvasRef.current, sec: document.getElementById("skills"), fill: "rgba(4,182,206,0.04)", stroke: (a: string) => `rgba(4,182,206,${a})`, anim: true },
      { canvas: matrixCanvasRef.current, sec: document.getElementById("matrixSection"), fill: "rgba(255,153,0,0.03)", stroke: (a: string) => `rgba(4,182,206,${parseFloat(a) * 1.3})`, anim: true },
      { canvas: eduCanvasRef.current, sec: document.getElementById("education"), fill: "rgba(34,81,227,0.03)", stroke: (a: string) => `rgba(34,81,227,${a})`, anim: false },
    ];
    sections.forEach(({ canvas, sec, fill, stroke, anim }) => {
      if (canvas && sec) {
        const cleanup = hexGrid(canvas, sec, fill, stroke, anim);
        if (cleanup) cleanups.push(cleanup);
      }
    });
    return () => cleanups.forEach(c => c());
  }, []);

  useEffect(() => {
    const nC = neuralCanvasRef.current;
    const nSec = document.getElementById("about");
    if (!nC || !nSec) return;
    function resN() {
      if (!nC || !nSec) return;
      nC.width = nSec.offsetWidth || 900;
      nC.height = nSec.offsetHeight || 500;
    }
    resN();
    window.addEventListener("resize", resN);
    const nlayers = [3, 5, 5, 3];
    let nT = 0;
    let alive = true;
    let rafId: number;
    function animN() {
      if (!alive || !nC) return;
      const nX = nC.getContext("2d");
      if (!nX) return;
      nX.clearRect(0, 0, nC.width, nC.height);
      const W = nC.width, H = nC.height;
      const lx = nlayers.map((_, i) => 80 + (i / (nlayers.length - 1)) * (W - 160));
      const nd = nlayers.map((c, li) => Array.from({ length: c }, (_, ni) => ({ x: lx[li], y: H / 2 + (ni - (c - 1) / 2) * (H / (c + 1)), li, ni })));
      for (let li = 0; li < nd.length - 1; li++) {
        nd[li].forEach(a => nd[li + 1].forEach(b => {
          const p = (Math.sin(nT * 0.034 + a.ni * 0.7 + li * 1.2) + 1) / 2;
          nX.beginPath(); nX.strokeStyle = `rgba(34,81,227,${0.04 + p * 0.09})`; nX.lineWidth = 0.65;
          nX.moveTo(a.x, a.y); nX.lineTo(b.x, b.y); nX.stroke();
        }));
      }
      nd.flat().forEach(n => {
        const p = (Math.sin(nT * 0.05 + n.ni * 0.9 + n.li * 1.5) + 1) / 2;
        nX.beginPath(); nX.arc(n.x, n.y, 4 + p * 4, 0, Math.PI * 2);
        nX.fillStyle = `rgba(34,81,227,${0.1 + p * 0.2})`; nX.fill();
      });
      nT++;
      rafId = requestAnimationFrame(animN);
    }
    animN();
    return () => { alive = false; cancelAnimationFrame(rafId); window.removeEventListener("resize", resN); };
  }, []);

  useEffect(() => {
    const cc = aboutChartRef.current;
    if (!cc) return;
    cc.width = cc.offsetWidth || 300;
    cc.height = 150;
    let tr = Array.from({ length: 30 }, (_, i) => 72 + Math.random() * 18 + i * 0.72);
    let vd = Array.from({ length: 30 }, (_, i) => 70 + Math.random() * 18 + i * 0.68);
    let alive = true;
    function dC() {
      if (!cc) return;
      const ctx = cc.getContext("2d");
      if (!ctx) return;
      const W = cc.width, H = cc.height, pd = 22, mn = 60, mx = 100;
      ctx.clearRect(0, 0, W, H);
      const sy = (v: number) => H - pd - ((v - mn) / (mx - mn)) * (H - pd * 2);
      const sx = (i: number) => pd + (i / (tr.length - 1)) * (W - pd * 2);
      [70, 80, 90, 100].forEach(v => {
        ctx.beginPath(); ctx.strokeStyle = "rgba(0,0,0,0.04)"; ctx.lineWidth = 1;
        ctx.moveTo(pd, sy(v)); ctx.lineTo(W - pd, sy(v)); ctx.stroke();
        ctx.fillStyle = "rgba(107,127,150,.5)"; ctx.font = "9px JetBrains Mono,monospace";
        ctx.fillText(v + "%", 2, sy(v) + 3);
      });
      ctx.beginPath(); tr.forEach((v, i) => i === 0 ? ctx.moveTo(sx(i), sy(v)) : ctx.lineTo(sx(i), sy(v)));
      ctx.strokeStyle = "#2251e3"; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); vd.forEach((v, i) => i === 0 ? ctx.moveTo(sx(i), sy(v)) : ctx.lineTo(sx(i), sy(v)));
      ctx.strokeStyle = "#10b981"; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]);
      const lx2 = sx(tr.length - 1), ly = sy(tr[tr.length - 1]);
      ctx.beginPath(); ctx.arc(lx2, ly, 4, 0, Math.PI * 2); ctx.fillStyle = "#2251e3"; ctx.fill();
    }
    function tick() {
      if (!alive) return;
      const l = tr[tr.length - 1], nv = Math.min(99, Math.max(72, l + (Math.random() - 0.47) * 1.4));
      tr.push(nv); tr.shift();
      const vl = vd[vd.length - 1], nval = Math.min(98, Math.max(70, vl + (Math.random() - 0.47) * 1.2));
      vd.push(nval); vd.shift();
      setAccVal(nv.toFixed(1) + "%");
      setLossVal((0.02 + (100 - nv) * 0.003).toFixed(3));
      setValVal(nval.toFixed(1) + "%");
      dC();
      setTimeout(tick, 950);
    }
    dC();
    const t = setTimeout(tick, 950);
    return () => { alive = false; clearTimeout(t); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(en => { if (en.isIntersecting) en.target.classList.add("visible"); }),
      { threshold: 0.07 }
    );
    document.querySelectorAll(".fade-up").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const barsEl = document.querySelector(".bars-wrap");
    if (!barsEl) return;
    const bObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        barTargets.forEach((pct, i) => {
          let c = 0;
          function step() {
            c = Math.min(c + 1.6, pct);
            setBarWidths(prev => { const n = [...prev]; n[i] = c; return n; });
            setBarLabels(prev => { const n = [...prev]; n[i] = Math.round(c) + "%"; return n; });
            if (c < pct) setTimeout(step, 16);
          }
          setTimeout(step, i * 110);
        });
        bObs.unobserve(en.target);
      });
    }, { threshold: 0.25 });
    bObs.observe(barsEl);
    return () => bObs.disconnect();
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const targets = [2, 3, 10];
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        targets.forEach((t, i) => {
          const inc = t / 55;
          let c = 0;
          function step() {
            c = Math.min(c + inc, t);
            setCounters(prev => { const n = [...prev]; n[i] = c; return n; });
            if (c < t) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
        cObs.unobserve(en.target);
      });
    }, { threshold: 0.25 });
    cObs.observe(hero);
    return () => cObs.disconnect();
  }, []);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("https://api.github.com/users/JeetKumarSingh07/repos?sort=updated&per_page=9");
        if (!res.ok) throw new Error("rate");
        const repos: GhRepo[] = await res.json();
        if (!Array.isArray(repos) || !repos.length) throw new Error("empty");
        setGhRepos(repos);
        setGhLoading(false);
      } catch {
        setGhLoading(false);
        setGhError("Could not fetch repos (API rate limit). Visit github.com/JeetKumarSingh07 directly.");
      }
    }
    fetchRepos();
  }, []);

  function handleSend() {
    const n = fname.trim(), e = femail.trim(), s = fsubject.trim() || "Portfolio Contact", m = fmessage.trim();
    if (!n || !e || !m) { setFormStatus({ type: "error", msg: "Please fill in name, email, and message." }); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { setFormStatus({ type: "error", msg: "Please enter a valid email." }); return; }
    window.location.href = `mailto:jeetkumarsingh07india@gmail.com?subject=${encodeURIComponent(s)}&body=Hi Jeet,%0A%0A${encodeURIComponent(m)}%0A%0AFrom: ${encodeURIComponent(n)}%0AReply to: ${encodeURIComponent(e)}`;
    setFormStatus({ type: "success", msg: `Mail client opened! Thanks, ${n}.` });
    setFname(""); setFemail(""); setFsubject(""); setFmessage("");
  }

  const LC: Record<string, string> = { Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#2b7489", HTML: "#e34c26", CSS: "#563d7c", "Jupyter Notebook": "#DA5B0B", default: "#8892b0" };

  const GitHubIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );

  return (
    <>
      <nav>
        <div className="nav-logo">
          <div className="nav-logo-hex">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <polygon points="14,2 25,8 25,20 14,26 3,20 3,8" fill="none" stroke="#2251e3" strokeWidth="1.5" />
              <polygon points="14,6 22,10.5 22,19.5 14,24 6,19.5 6,10.5" fill="#dce8ff" />
              <text x="14" y="18" textAnchor="middle" fontFamily="Clash Display,sans-serif" fontSize="7" fontWeight="700" fill="#2251e3">JK</text>
            </svg>
          </div>
          <span>Jeet Kumar Singh</span>
        </div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#gh-repos">GitHub</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div id="dataTicker">
        <div className="ticker-track" ref={tickerTrackRef}></div>
      </div>

      <section id="hero">
        <canvas id="heroHexCanvas" ref={heroCanvasRef} />
        <div className="hero-orb orb1" />
        <div className="hero-orb orb2" />
        <div className="hero-orb orb3" />
        <div className="hero-inner">
          <div className="hero-photo-wrap">
            <div className="photo-hex">
              <div className="photo-inner" style={{display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#2251e3 0%,#7c3aed 50%,#04b6ce 100%)'}}>
                <span style={{fontFamily:'Clash Display,sans-serif',fontSize:'3.8rem',fontWeight:700,color:'#fff',letterSpacing:'-0.04em',lineHeight:1,userSelect:'none'}}>JK</span>
              </div>
            </div>
            <div className="chip"><span className="cdot" style={{ background: "#2251e3" }} />Python 92%</div>
            <div className="chip"><span className="cdot" style={{ background: "#FF9900" }} />Amazon ML ✓</div>
            <div className="chip"><span className="cdot" style={{ background: "#10b981" }} />CGPA 7.54</div>
            <div className="chip"><span className="cdot" style={{ background: "#7c3aed" }} />ISRO 2025 ✓</div>
          </div>
          <div className="hero-text">
            <div className="amz-badge">
              <span style={{ fontSize: ".85rem" }}>⭐</span>
              <span className="amz-logo">amazon</span>
              <span className="amz-txt">ML Summer School 2026 — Selected</span>
            </div>
            <br />
            <div className="hero-badge"><span className="bdot" />Data Analyst Intern · AppZime Technologies · Jun 2026</div>
            <h1>
              <span className="g-blue">Jeet Kumar</span><br />
              <span className="g-pink">Singh</span>
              <span className="sub-role">// data-analyst · python · sql · power-bi</span>
            </h1>
            <p className="hero-tagline"><span id="typewriter" ref={typewriterRef}>Turning raw data into decisions.</span></p>
            <div className="hero-ctas">
              <a href="#contact" className="btn btn-p">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 012 2.18C2 1.1 2.89.22 3.96.22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z" />
                </svg>
                Get in Touch
              </a>
              <a
                href="#"
                className="btn btn-o"
                onClick={e => { e.preventDefault(); alert("To enable CV download: upload your resume PDF and update this button's href to the file URL."); }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
              </a>
              <a href="https://github.com/JeetKumarSingh07" target="_blank" rel="noreferrer" className="btn btn-o">
                <GitHubIcon /> GitHub
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat"><span className="stat-num">{Math.round(counters[0])}+</span><span className="stat-label">Projects</span></div>
              <div className="stat"><span className="stat-num">{Math.round(counters[1])}+</span><span className="stat-label">Hackathons</span></div>
              <div className="stat"><span className="stat-num">{Math.round(counters[2])}+</span><span className="stat-label">Tech Skills</span></div>
              <div className="stat"><span className="stat-num">7.54</span><span className="stat-label">CGPA / 10</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <canvas id="neuralCanvas" ref={neuralCanvasRef} />
        <div className="about-grid fade-up">
          <div style={{ flex: 1, minWidth: 260 }}>
            <p className="sec-label">About Me</p>
            <h2 className="sec-title g-blue">Data meets curiosity</h2>
            <p style={{ color: "var(--text-sub)", fontSize: ".92rem", lineHeight: 1.78, maxWidth: 560 }}>
              B.Tech Computer Science student at <strong style={{ color: "var(--text)" }}>CGC University, Chandigarh</strong> (2024–2028, CGPA 7.54). Working at the intersection of data analytics, engineering, and visualisation — building ETL pipelines, dashboards, and AI-powered tools.
            </p>
            <p style={{ color: "var(--text-sub)", fontSize: ".92rem", lineHeight: 1.78, maxWidth: 560, marginTop: 12 }}>
              Currently interning at <strong style={{ color: "var(--primary)" }}>AppZime Technologies</strong>. Selected for <strong style={{ color: "#FF9900" }}>Amazon ML Summer School 2026</strong>. Competed in ISRO's Bharatiya Antariksh Hackathon 2025.
            </p>
            <div style={{ marginTop: 20 }}>
              {[
                ["Location", "Chandigarh, India 🇮🇳"],
                ["Degree", "B.Tech CSE · CGC University · 2024–2028"],
                ["Current", "Data Analyst Intern @ AppZime Technologies"],
              ].map(([k, v]) => (
                <div className="info-row" key={k}>
                  <span className="info-key">{k}</span>
                  <span className="info-val">{v}</span>
                </div>
              ))}
              <div className="info-row">
                <span className="info-key">Email</span>
                <span className="info-val"><a href="mailto:jeetkumarsingh07india@gmail.com">jeetkumarsingh07india@gmail.com</a></span>
              </div>
              <div className="info-row">
                <span className="info-key">Phone</span>
                <span className="info-val"><a href="tel:+919279975875">+91 9279975875</a></span>
              </div>
              <div className="info-row">
                <span className="info-key">GitHub</span>
                <span className="info-val"><a href="https://github.com/JeetKumarSingh07" target="_blank" rel="noreferrer">JeetKumarSingh07 ↗</a></span>
              </div>
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-lbl">Model Accuracy — Live Sim</div>
            <div className="chart-big">{accVal}</div>
            <canvas ref={aboutChartRef} style={{ width: "100%", height: 150, display: "block", marginTop: 8 }} />
            <div className="chart-meta">
              <span>● loss: <strong style={{ color: "var(--primary)" }}>{lossVal}</strong></span>
              <span>● val: <strong style={{ color: "var(--green)" }}>{valVal}</strong></span>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <canvas id="skillsHexCanvas" ref={skillsCanvasRef} />
        <div className="fade-up">
          <p className="sec-label">Technical Stack</p>
          <h2 className="sec-title g-pink">Skills &amp; Tools</h2>
          <p className="sec-sub">Everything I reach for when wrangling data, building pipelines, and communicating insights.</p>
          <div className="skills-grid">
            {[
              { cat: "Core Analysis", tags: ["Python", "Pandas", "NumPy", "SQL", "Excel", "Hypothesis Testing", "Regression"], cls: "" },
              { cat: "Visualization", tags: ["Power BI", "Tableau", "Matplotlib", "Seaborn", "Dashboards"], cls: "t" },
              { cat: "Data Engineering", tags: ["ETL Pipelines", "Data Cleaning", "Data Wrangling", "Data Modeling", "Query Optimization"], cls: "" },
              { cat: "Databases", tags: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"], cls: "g" },
              { cat: "Dev & Tools", tags: ["Git/GitHub", "Docker", "FastAPI", "Django", "Agile/Scrum"], cls: "t" },
              { cat: "Soft Skills", tags: ["Analytical Thinking", "Problem Solving", "Communication", "Collaboration"], cls: "" },
            ].map(({ cat, tags, cls }) => (
              <div className="skill-card" key={cat}>
                <div className="skill-cat">{cat}</div>
                <div className="stags">
                  {tags.map(t => <span key={t} className={`stag ${cls}`}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="bars-wrap fade-up">
            <div className="bars-title">Proficiency levels</div>
            {[
              { label: "Python (Pandas · NumPy)", pct: barTargets[0], cls: "bf-b", id: 0 },
              { label: "SQL & Databases", pct: barTargets[1], cls: "bf-b", id: 1 },
              { label: "Power BI / DAX", pct: barTargets[2], cls: "bf-w", id: 2 },
              { label: "Data Visualization", pct: barTargets[3], cls: "bf-w", id: 3 },
              { label: "ETL Pipelines", pct: barTargets[4], cls: "bf-s", id: 4 },
              { label: "Machine Learning", pct: barTargets[5], cls: "bf-s", id: 5 },
            ].map(({ label, cls, id }) => (
              <div className="bar-item" key={label}>
                <div className="bar-lbl"><span>{label}</span><span>{barLabels[id]}</span></div>
                <div className="bar-track">
                  <div className={`bar-fill ${cls}`} style={{ width: barWidths[id] + "%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="matrixSection">
        <canvas id="matrixHexCanvas" ref={matrixCanvasRef} />
        <div className="matrix-content fade-up">
          <p className="sec-label">Core Domains</p>
          <h2 className="sec-title g-rainbow">Everything I work with</h2>
          <div className="ds-pills">
            {["Data Wrangling","Statistical Modeling","EDA","Feature Engineering","Regression Analysis","ETL Pipelines","Dashboard Design","Hypothesis Testing","Data Storytelling","KPI Reporting","Predictive Analytics","Query Optimization","Power Query","Seaborn · Matplotlib","Data Modeling","Business Intelligence"].map(p => (
              <span className="ds-pill" key={p}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="fade-up">
          <p className="sec-label">Featured Work</p>
          <h2 className="sec-title g-orange">Projects</h2>
          <p className="sec-sub">From analytics dashboards to AI-powered full-stack tools — built with real data, measurable outcomes.</p>
          <div className="projects-grid">
            <div className="pcard">
              <div className="pct">
                <div className="picon" style={{ background: "#dce8ff" }}>📊</div>
                <div className="pname">Uber Data Analysis Dashboard</div>
                <p className="pdesc">Interactive Power BI dashboard analysing Uber booking trends, ride performance, and revenue KPIs.</p>
                <ul className="pbullets">
                  <li>DAX-powered KPI cards for bookings, revenue &amp; distance</li>
                  <li>Power Query ETL — end-to-end data cleaning</li>
                  <li>Navigation pages, filters, lost-booking analysis</li>
                </ul>
              </div>
              <div className="pcb">
                <div className="pls">
                  <span className="lang-badge">Power BI</span>
                  <span className="lang-badge">DAX</span>
                  <span className="lang-badge">Power Query</span>
                </div>
              </div>
            </div>
            <div className="pcard">
              <div className="pct">
                <div className="picon" style={{ background: "#ccf7ff" }}>🤖</div>
                <div className="pname">ZeroCloud AI</div>
                <p className="pdesc">Full-stack productivity analytics platform with AI-assisted document analysis and ETL pipelines.</p>
                <ul className="pbullets">
                  <li>5+ daily performance indicators with streak tracking</li>
                  <li>60% faster document review via automated MCQ generation</li>
                  <li>+35% task completion through analytics nudges</li>
                </ul>
              </div>
              <div className="pcb">
                <div className="pls">
                  <span className="lang-badge">Python</span>
                  <span className="lang-badge">AI APIs</span>
                  <span className="lang-badge">ETL</span>
                </div>
                <a href="https://github.com/JeetKumarSingh07/Zerocloud-AI-main" target="_blank" rel="noreferrer" className="gh-link">
                  <GitHubIcon /> View repo ↗
                </a>
              </div>
            </div>
            <div className="pcard">
              <div className="pct">
                <div className="picon" style={{ background: "var(--green-light)" }}>💬</div>
                <div className="pname">Axyntrel</div>
                <p className="pdesc">Secure real-time messaging and video-calling platform with automated bank transaction management.</p>
                <ul className="pbullets">
                  <li>React + Node.js + Express + MongoDB full-stack</li>
                  <li>Plaid API for automated financial data management</li>
                  <li>Docker + CI/CD; Jest testing; multi-language support</li>
                </ul>
              </div>
              <div className="pcb">
                <div className="pls">
                  <span className="lang-badge">React</span>
                  <span className="lang-badge">Node.js</span>
                  <span className="lang-badge">MongoDB</span>
                  <span className="lang-badge">Docker</span>
                </div>
                <a href="https://github.com/JeetKumarSingh07/axyntrel-1-main" target="_blank" rel="noreferrer" className="gh-link">
                  <GitHubIcon /> View repo ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gh-repos">
        <div className="fade-up">
          <p className="sec-label">GitHub</p>
          <h2 className="sec-title g-green">Live Repositories</h2>
          <p className="sec-sub">
            Fetched live from{" "}
            <a href="https://github.com/JeetKumarSingh07" target="_blank" rel="noreferrer" style={{ color: "var(--primary)" }}>
              github.com/JeetKumarSingh07
            </a>
          </p>
          {ghError && (
            <div id="gh-error" style={{ display: "block" }}>⚠️ {ghError}</div>
          )}
          {ghLoading && !ghError && <div id="gh-loading">Loading repos…</div>}
          {!ghLoading && ghRepos.length > 0 && (
            <div className="gh-grid">
              {ghRepos.map(r => {
                const lang = r.language || "N/A";
                const col = LC[lang] || LC.default;
                return (
                  <div className="gh-card" key={r.name}>
                    <a href={r.html_url} target="_blank" rel="noreferrer" className="gh-card-name">📁 {r.name}</a>
                    <div className="gh-card-desc">{r.description || "No description."}</div>
                    <div className="gh-card-meta">
                      {lang !== "N/A" && <span className="gh-lang" style={{ background: col + "22", color: col }}>{lang}</span>}
                      <span className="gh-stars">⭐ {r.stargazers_count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section id="experience">
        <div className="fade-up">
          <p className="sec-label">Experience</p>
          <h2 className="sec-title g-green">Work History</h2>
          <p className="sec-sub">Real-world roles where data skills have been put to measurable use.</p>
          <div className="timeline">
            <div className="titem">
              <div className="tdot" style={{ background: "var(--primary-light)" }}>💼</div>
              <div>
                <div className="intern-badge">🟢 Active — Current Internship</div>
                <div className="trole">Data Analyst Intern</div>
                <div className="tco">AppZime Technologies · Lucknow, UP</div>
                <div className="tperiod">Jun 2026 – Aug 2026 · ₹10,000/month</div>
                <p className="tdesc">Structured training &amp; development programme applying Python, SQL, Power BI and statistical analysis to real business datasets.</p>
              </div>
            </div>
            <div className="titem">
              <div className="tdot" style={{ background: "var(--accent-light)" }}>📊</div>
              <div>
                <div className="trole">Data Analyst — Uber Dashboard</div>
                <div className="tco">Academic Project · 2025</div>
                <div className="tperiod">2025</div>
                <p className="tdesc">End-to-end Power BI dashboard with Power Query ETL, DAX KPI cards, and lost-booking trend analysis.</p>
              </div>
            </div>
            <div className="titem">
              <div className="tdot" style={{ background: "var(--green-light)" }}>🚀</div>
              <div>
                <div className="trole">Full-Stack Engineer — ZeroCloud AI</div>
                <div className="tco">github.com/JeetKumarSingh07/Zerocloud-AI-main</div>
                <div className="tperiod">2024–2025</div>
                <p className="tdesc">AI productivity analytics platform. ETL document analyser — cut review time 60%, boosted task completion 35%.</p>
              </div>
            </div>
            <div className="titem">
              <div className="tdot" style={{ background: "#fef9c3" }}>⚡</div>
              <div>
                <div className="trole">Software Engineer — Axyntrel</div>
                <div className="tco">github.com/JeetKumarSingh07/axyntrel-1-main</div>
                <div className="tperiod">2024</div>
                <p className="tdesc">Secure messaging &amp; video platform — React, Node.js, MongoDB, Docker CI/CD, Plaid API, Jest testing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="education">
        <canvas id="eduHexCanvas" ref={eduCanvasRef} />
        <div className="fade-up">
          <p className="sec-label">Background</p>
          <h2 className="sec-title g-amazon">Education &amp; Certifications</h2>
          <p className="sec-sub">The academic foundation and competitive achievements behind the work.</p>
          <div className="amz-card fade-up">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: "1.7rem" }}>📦</span>
              <span className="amz-wordmark">amazon</span>
            </div>
            <div className="amz-title">ML Summer School 2026</div>
            <div className="amz-sub">Selection Test Qualifier · 28 Jun 2026, 2:00–6:00 PM IST · Amazon India</div>
            <p className="amz-desc">
              Selected for Amazon's prestigious <strong>ML Summer School 2026</strong> — a highly competitive programme across India. Cleared the selection test covering machine learning fundamentals, algorithms, and applied data science.
            </p>
            <div>
              <span className="amz-pill">🤖 Machine Learning</span>
              <span className="amz-pill">📊 Data Science</span>
              <span className="amz-pill">⚡ Selection Cleared</span>
              <span className="amz-pill">🇮🇳 Amazon India</span>
            </div>
          </div>
          <div className="edu-grid">
            <div className="edu-card">
              <div className="edu-icon">🎓</div>
              <div className="edu-degree">B.Tech, Computer Science Engineering</div>
              <div className="edu-school">CGC University — Chandigarh Engineering College</div>
              <div className="edu-meta">2024–2028 · CGPA: 7.54 / 10.0</div>
              <p className="edu-courses">DSA · DBMS · Software Engineering · OOP</p>
            </div>
          </div>
          <div className="certs-title">Certifications &amp; Achievements</div>
          <ul className="cert-list">
            <li className="cert-item" style={{ border: "1.5px solid #FF9900", background: "linear-gradient(135deg,#fffbf0,#fff8ee)" }}>
              <span className="cert-icon">🏅</span>
              <div>
                <div className="cert-title-text g-amazon">Amazon ML Summer School 2026</div>
                <div className="cert-org">Selection Test Qualifier · Amazon India · Jun 2026</div>
              </div>
            </li>
            <li className="cert-item">
              <span className="cert-icon">🛰️</span>
              <div>
                <div className="cert-title-text">Bharatiya Antariksh Hackathon 2025</div>
                <div className="cert-org">Certificate of Acknowledgement · ISRO · Applied data analysis &amp; software development</div>
              </div>
            </li>
            <li className="cert-item">
              <span className="cert-icon">☁️</span>
              <div>
                <div className="cert-title-text">Empowering the Cloud Era</div>
                <div className="cert-org">Cloud Computing &amp; DevOps · GDG Chandigarh &amp; Appwrk IT Solutions · 2024</div>
              </div>
            </li>
            <li className="cert-item">
              <span className="cert-icon">📋</span>
              <div>
                <div className="cert-title-text">Microsoft Office Specialist Event</div>
                <div className="cert-org">Top 200 Participant Nationally</div>
              </div>
            </li>
            <li className="cert-item">
              <span className="cert-icon">🏆</span>
              <div>
                <div className="cert-title-text">Hack-N-Win 3.0 Hackathon</div>
                <div className="cert-org">Selected Participant · Competitive full-stack development challenge</div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section id="contact">
        <div className="fade-up">
          <p className="sec-label">Contact</p>
          <h2 className="sec-title g-blue">Let's connect</h2>
          <p className="sec-sub">Open to opportunities, internships, collaborations, and interesting data problems.</p>
          <div className="contact-grid">
            <div>
              <div className="contact-head">Reach me directly</div>
              <div className="contact-links">
                <a href="mailto:jeetkumarsingh07india@gmail.com" className="contact-link">
                  <span style={{ fontSize: "1.1rem" }}>✉️</span>
                  <div><div className="cl-label">Email</div><div className="cl-val">jeetkumarsingh07india@gmail.com</div></div>
                </a>
                <a href="tel:+919279975875" className="contact-link">
                  <span style={{ fontSize: "1.1rem" }}>📱</span>
                  <div><div className="cl-label">Phone</div><div className="cl-val">+91 9279975875</div></div>
                </a>
                <a href="https://github.com/JeetKumarSingh07" target="_blank" rel="noreferrer" className="contact-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0c1422">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  <div><div className="cl-label">GitHub</div><div className="cl-val">JeetKumarSingh07</div></div>
                </a>
                <a
                  href="#"
                  className="contact-link"
                  onClick={e => { e.preventDefault(); alert("To enable CV download: upload your resume PDF and update this button's href to the file URL."); }}
                >
                  <span style={{ fontSize: "1.1rem" }}>📄</span>
                  <div><div className="cl-label">Resume</div><div className="cl-val">Download PDF</div></div>
                </a>
              </div>
            </div>
            <div>
              <div className="contact-head">Send a message</div>
              <div className="contact-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="fname">Your name</label>
                  <input className="form-input" type="text" id="fname" placeholder="Rahul Sharma" value={fname} onChange={e => setFname(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="femail">Email address</label>
                  <input className="form-input" type="email" id="femail" placeholder="you@example.com" value={femail} onChange={e => setFemail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="fsubject">Subject</label>
                  <input className="form-input" type="text" id="fsubject" placeholder="Opportunity / Collaboration" value={fsubject} onChange={e => setFsubject(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="fmessage">Message</label>
                  <textarea className="form-textarea" id="fmessage" placeholder="Hi Jeet, I'd like to discuss…" value={fmessage} onChange={e => setFmessage(e.target.value)} />
                </div>
                {formStatus.type && (
                  <div id="form-status" className={formStatus.type} style={{ display: "block" }}>{formStatus.type === "error" ? "⚠️ " : "✅ "}{formStatus.msg}</div>
                )}
                <button className="btn btn-p" onClick={handleSend} type="button" style={{ width: "100%", justifyContent: "center" }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p><strong>Jeet Kumar Singh</strong> · <a href="mailto:jeetkumarsingh07india@gmail.com">jeetkumarsingh07india@gmail.com</a> · <a href="https://github.com/JeetKumarSingh07" target="_blank" rel="noreferrer">GitHub ↗</a></p>
        <p style={{ marginTop: 6, opacity: 0.5 }}>B.Tech CSE · CGC University · Data Analyst · AppZime Technologies · Amazon ML 2026</p>
      </footer>
    </>
  );
}
