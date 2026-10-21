(function () {
  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const topicId = document.body.dataset.topic;

  /* ---------- אייקון תלת־ממדי מתוך assets/icons ---------- */
  const ic = (name, cls = "ic") => `<img class="${cls}" src="assets/icons/${name}.png" alt="" aria-hidden="true">`;

  /* ---------- קישוטי רקע ---------- */
  function decorate() {
    const deco = document.createElement("div");
    deco.className = "bg-deco";
    const items = ["star", "sparkle", "scroll", "star", "heart", "sparkle"];
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("span");
      s.innerHTML = ic(items[i % items.length]);
      s.style.left = Math.random() * 100 + "vw";
      s.style.animationDuration = 16 + Math.random() * 16 + "s";
      s.style.animationDelay = -Math.random() * 30 + "s";
      s.style.fontSize = 14 + Math.random() * 16 + "px";
      deco.appendChild(s);
    }
    document.body.prepend(deco);
    [["#ee2f62", "8%", "10%"], ["#fdb916", "70%", "60%"], ["#1dbcd7", "40%", "85%"]].forEach(([c, x, y]) => {
      const b = document.createElement("div");
      b.className = "blob";
      Object.assign(b.style, { background: c, left: x, top: y, width: "380px", height: "380px" });
      document.body.prepend(b);
    });
  }

  /* ---------- קונפטי ---------- */
  const confetti = (() => {
    let cv, ctx, parts = [], running = false;
    const colors = ["#ee2f62", "#fdb916", "#1dbcd7", "#aa479a", "#7b4fc4", "#4ade80"];
    function loop() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      parts.forEach(p => {
        p.vy += 0.25; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      });
      parts = parts.filter(p => p.y < cv.height + 40);
      if (parts.length) requestAnimationFrame(loop); else { running = false; ctx.clearRect(0, 0, cv.width, cv.height); }
    }
    return function burst(x = innerWidth / 2, y = innerHeight / 3, n = 140) {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!cv) {
        cv = document.createElement("canvas"); cv.id = "confetti"; document.body.appendChild(cv);
        ctx = cv.getContext("2d");
      }
      cv.width = innerWidth; cv.height = innerHeight;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, sp = 4 + Math.random() * 9;
        parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 6, r: Math.random() * 6, vr: (Math.random() - .5) * .4,
          w: 8 + Math.random() * 8, h: 5 + Math.random() * 6, c: colors[i % colors.length] });
      }
      if (!running) { running = true; loop(); }
    };
  })();
  window.confetti = confetti;

  /* ---------- הופעה בגלילה ---------- */
  function reveal(sel) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: .12 });
    document.querySelectorAll(sel).forEach((el, i) => { el.style.transitionDelay = (i % 6) * 70 + "ms"; io.observe(el); });
  }

  /* ---------- הטיה תלת־ממדית ---------- */
  function tilt(el, target = el) {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      target.style.transform = `perspective(900px) rotateY(${(px - .5) * 12}deg) rotateX(${(.5 - py) * 12}deg) translateY(-6px) scale(1.02)`;
      target.style.setProperty("--mx", px * 100 + "%"); target.style.setProperty("--my", py * 100 + "%");
    });
    el.addEventListener("pointerleave", () => { target.style.transform = ""; });
  }

  function topbar(isHome) {
    return `<header class="topbar">
      <a href="index.html"><img class="brand" src="assets/img/shalhevet.webp" alt="שלהבות חב&quot;ד"></a>
      <div class="actions">
        ${isHome ? "" : `<a class="pill" href="index.html">${ic("home")} <span class="lbl">כל הנושאים</span></a>`}
        <button class="pill" id="fsBtn" title="מסך מלא">${ic("fullscreen")} <span class="lbl">מסך מלא</span></button>
      </div>
    </header>`;
  }

  function footer() {
    return `<footer>
      <img src="assets/img/logo.webp" alt="אקטואלי בפרשה">
      <small>אקטואלי בפרשה · שלהבות חב"ד · פרשת ${esc(S.parasha)}</small>
    </footer>`;
  }

  function bindFullscreen() {
    $("#fsBtn").addEventListener("click", () => {
      if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.();
    });
  }

  /* ================= עמוד הבית ================= */
  /* קשקושי גיר לבנים כמו בלוח בקנבה (viewBox 0 0 100 100) */
  const DOODLE = {
    star: `<path d="M50 8 61 38H93L67 57 77 88 50 69 23 88 33 57 7 38H39Z"/>`,
    dash: `<path d="M6 30H40M2 48H34M10 66H38"/>`,
    smile: `<circle cx="50" cy="50" r="40"/><path d="M35 38v6M65 38v6M30 60Q50 80 70 60"/>`,
    crown: `<polyline points="10,80 14,26 34,54 50,14 66,54 86,26 90,80 10,80"/><circle cx="50" cy="66" r="5"/>`,
    wave: `<path d="M4 50v0M11 42v16M18 30v40M25 44v12M32 18v64M39 36v28M46 26v48M53 42v16M60 30v40M67 40v20M74 22v56M81 45v10M88 36v28M95 47v6"/>`,
    squiggle: `<path d="M8 92C28 62 18 42 44 36S70 12 92 14M18 98C40 72 40 56 62 50S84 30 98 34"/>`,
    spark: `<path d="M50 8V34M50 66V92M8 50H34M66 50H92M22 22 38 38M62 62 78 78M78 22 62 38M38 62 22 78"/>`
  };
  const TILE_DOODLES = {
    pgisha: [["star", "left:5%;top:44%;width:20cqmin", "wig"], ["dash", "left:20%;top:47%;width:14cqmin"], ["smile", "right:7%;bottom:7%;width:16cqmin", "wig"]],
    play: [["spark", "right:8%;top:42%;width:18cqmin", "wig"]],
    live: [["star", "right:7%;bottom:12%;width:16cqmin", "wig"]],
    aluf: [["crown", "left:34%;top:5%;width:20cqmin", "wig"], ["star", "right:9%;top:52%;width:12cqmin"]],
    podcast: [["wave", "right:4%;bottom:22%;width:44cqmin;height:22cqmin"]],
    ted: [["squiggle", "right:4%;bottom:6%;width:46cqmin"], ["spark", "right:12%;top:34%;width:12cqmin", "wig"]]
  };
  const doodles = id => (TILE_DOODLES[id] || []).map(([d, pos, cls = ""]) =>
    `<svg class="doodle ${cls}" viewBox="0 0 100 100" style="${pos}" aria-hidden="true">${DOODLE[d]}</svg>`).join("");

  /* כותרת בשתי שורות, כמו בקנבה: "פרשה / PLAY", "פגישה עם / הפרשה" */
  function titleLines(title) {
    const w = title.split(" ");
    const cut = w.length > 2 ? 2 : 1;
    const line = ws => `<span>${ws.map(x => /^[A-Za-z]+$/.test(x) ? `<b class="en">${esc(x)}</b>` : esc(x)).join(" ")}</span>`;
    return line(w.slice(0, cut)) + (w.length > cut ? line(w.slice(cut)) : "");
  }

  function renderHome() {
    document.title = `אקטואלי בפרשה · ${S.parasha}`;
    document.body.classList.add("home");
    const tiles = S.topics.map((t, i) => `
      <a class="tile t-${t.id}" href="${t.id}.html" style="--i:${i}" aria-label="${esc(t.title)} — ${esc(t.tagline)}">
        <div class="tile-in">
          ${doodles(t.id)}
          <img class="char" src="${t.char}" alt="">
          <div class="tile-txt"><h2>${titleLines(t.title)}</h2>${ic(t.icon, "t-icon")}<p>${esc(t.tagline)}</p></div>
          <span class="go">←</span>
          <span class="shine"></span>
        </div>
      </a>`).join("");
    document.body.insertAdjacentHTML("beforeend", `
      <main class="bento">
        ${tiles}
        <div class="tile t-logo" id="logoTile" style="--i:6">
          <div class="tile-in">
            <span class="corner a"></span><span class="corner b"></span>
            <img class="brand-sm" src="assets/img/shalhevet.webp" alt="שלהבות חב&quot;ד">
            <div class="logo-wrap">
              <img class="logo" src="assets/img/logo.webp" alt="אקטואלי בפרשה">
              <span class="chip"><small>פרשת</small>${esc(S.parasha)}</span>
              <span class="hint">לוחצים על נושא — ומציגים לכיתה או מורידים להדפסה</span>
            </div>
          </div>
        </div>
      </main>
      <button class="fs-float" id="fsBtn" title="מסך מלא" aria-label="מסך מלא">${ic("fullscreen")}</button>`);
    document.querySelectorAll("a.tile").forEach(a => tilt(a, $(".tile-in", a)));
    $("#logoTile").addEventListener("click", e => confetti(e.clientX, e.clientY));
    setTimeout(() => { const r = $(".t-logo .logo").getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, 110); }, 1500);
  }

  /* ================= דף נושא ================= */
  function renderTopic(t) {
    document.title = `${t.title} · ${S.parasha} · אקטואלי בפרשה`;
    document.documentElement.style.setProperty("--c", t.color);
    document.documentElement.style.setProperty("--soft", t.soft);
    const idx = S.topics.indexOf(t);
    const letters = t.title.split(" ").map((w, i) => `<span class="letter" style="animation-delay:${.15 + i * .15}s">${esc(w)}</span>`).join(" ");
    const fileName = `אקטואלי בפרשה - ${t.title} - ${S.parasha}.pdf`;
    const landscape = t.kind === "slides";

    let special = "";
    if (t.kind === "video") {
      special = `<section class="block">
        <h2 class="block-title">${ic("clapper")} הסרטון</h2>
        <div class="video-frame"><span class="live-dot">LIVE</span>${videoHTML(t)}</div>
      </section>`;
    }
    if (t.game) special += gameHTML(t.game);
    if (t.interview) special += interviewHTML(t.interview);

    const pages = t.pages.map((p, i) => `
      <button class="page-thumb" data-i="${i}" aria-label="הצגת עמוד ${i + 1}">
        <span class="num">${i + 1}</span>
        <img src="${p}" alt="${esc(t.title)} עמוד ${i + 1}" loading="lazy">
        <span class="zoom">${ic("zoom")} הצגה על המסך</span>
      </button>`).join("");

    const nav = S.topics.map(o => `<a href="${o.id}.html" class="${o === t ? "cur" : ""}"><img src="${o.char}" alt="">${esc(o.title)}</a>`).join("");
    const next = S.topics[(idx + 1) % S.topics.length];

    document.body.insertAdjacentHTML("beforeend", `
      ${topbar(false)}
      <main>
        <section class="topic-hero">
          <div class="panel">
            <span class="eyebrow">${ic(t.icon)} פרשת ${esc(S.parasha)}</span>
            <h1>${letters}</h1>
            <p class="sub">${esc(t.tagline)}</p>
            <div class="btns">
              <button class="btn" id="presentBtn">${ic("present", "ic i")} הצגה בכיתה</button>
              <a class="btn light" href="${t.pdf}" download="${esc(fileName)}">${ic("download", "ic i")} הורדה להדפסה</a>
              <a class="btn light" href="${t.pdf}" target="_blank" rel="noopener">${ic("print", "ic i")} פתיחת PDF</a>
            </div>
          </div>
          <div class="char-wrap"><img src="${t.char}" alt=""></div>
        </section>
        ${special}
        <section class="block">
          <h2 class="block-title">${ic(landscape ? "present" : "print")} ${t.pagesTitle ? esc(t.pagesTitle) : landscape ? "השקופיות" : "הדפים להדפסה"}</h2>
          <div class="pages ${landscape ? "landscape" : ""}">${pages}</div>
        </section>
        <nav class="topic-nav" aria-label="נושאים">${nav}</nav>
        <section class="block" style="text-align:center">
          <a class="btn" href="${next.id}.html" style="background:${next.color}">לנושא הבא: ${esc(next.title)} ←</a>
        </section>
      </main>
      ${footer()}
      ${presenterHTML(t)}`);

    reveal(".page-thumb");
    setupPresenter(t);
    if (t.game) setupGame(t.game);
    if (t.interview) setupInterview();
  }

  /* ---------- סרטון: יוטיוב / וימאו / mp4, ובלי קישור — השקופית ---------- */
  function videoHTML(t) {
    const v = t.video || "";
    const yt = v.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
    const vm = v.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    const frame = src => `<div style="aspect-ratio:16/9"><iframe src="${src}" style="width:100%;height:100%;border:0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
    if (yt) return frame(`https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`);
    if (vm) return frame(`https://player.vimeo.com/video/${vm[1]}`);
    if (v) return `<video controls playsinline preload="metadata" poster="${t.poster}" src="${esc(v)}"></video>`;
    return `<img src="${t.poster}" alt="${esc(t.title)}" style="width:100%">`;
  }

  /* ---------- מצב הצגה ---------- */
  function presenterHTML(t) {
    return `<div class="presenter" id="presenter" role="dialog" aria-label="מצב הצגה">
      <div class="p-title">${esc(t.title)} · ${esc(S.parasha)}</div>
      <button class="close" id="pClose" aria-label="סגירה">✕</button>
      <img class="slide-img" id="pImg" alt="">
      <div class="bar">
        <button id="pPrev" aria-label="הקודם">→</button>
        <span class="count" id="pCount"></span>
        <button id="pNext" aria-label="הבא">←</button>
      </div>
    </div>`;
  }
  function setupPresenter(t) {
    const P = $("#presenter"), img = $("#pImg");
    let i = 0;
    const show = n => {
      i = (n + t.pages.length) % t.pages.length;
      img.src = t.pages[i]; img.classList.remove("anim"); void img.offsetWidth; img.classList.add("anim");
      $("#pCount").textContent = `${i + 1} / ${t.pages.length}`;
    };
    const open = n => { show(n); P.classList.add("open"); P.requestFullscreen?.().catch(() => {}); };
    const close = () => { P.classList.remove("open"); if (document.fullscreenElement) document.exitFullscreen(); };
    $("#presentBtn").addEventListener("click", () => {
      const v = t.kind === "video" && $(".video-frame video, .video-frame iframe");
      if (v) { v.requestFullscreen?.().catch(() => {}); v.play?.(); }
      else if (t.kind === "video") { P.classList.add("open"); img.src = t.poster; $("#pCount").textContent = ""; P.requestFullscreen?.().catch(() => {}); }
      else open(0);
    });
    document.querySelectorAll(".page-thumb").forEach(b => b.addEventListener("click", () => open(+b.dataset.i)));
    $("#pClose").addEventListener("click", close);
    $("#pNext").addEventListener("click", () => show(i + 1));
    $("#pPrev").addEventListener("click", () => show(i - 1));
    img.addEventListener("click", () => show(i + 1));
    document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && P.classList.contains("open")) P.classList.remove("open"); });
    document.addEventListener("keydown", e => {
      if (!P.classList.contains("open")) return;
      if (e.key === "ArrowLeft" || e.key === " ") show(i + 1);
      if (e.key === "ArrowRight") show(i - 1);
      if (e.key === "Escape") close();
    });
  }

  /* ---------- משחק נכון / לא נכון ---------- */
  function gameHTML(g) {
    return `<section class="block">
      <h2 class="block-title">${ic("gamepad")} משחק בכיתה: נכון או לא נכון?</h2>
      <div class="game" id="game">
        <p class="intro">${esc(g.intro)} <b>${esc(g.instruction)}</b></p>
        <div class="progress">${g.items.map(() => "<i></i>").join("")}</div>
        <div class="stage"><span class="qnum" id="gNum"></span><p class="q" id="gQ"></p></div>
        <div class="sides">
          <button class="side yes" id="gYes">${ic("check")} נכון</button>
          <button class="side no" id="gNo">${ic("cross")} לא נכון</button>
        </div>
        <div class="answer" id="gAns"></div>
        <div class="nav">
          <button class="btn light" id="gPrev">→ הקודם</button>
          <button class="btn light" id="gReveal">${ic("eye")} חשיפת התשובה</button>
          <button class="btn" id="gNext">הבא ←</button>
        </div>
      </div>
    </section>`;
  }
  function setupGame(g) {
    let i = 0;
    const bars = document.querySelectorAll("#game .progress i");
    const yes = $("#gYes"), no = $("#gNo"), ans = $("#gAns");
    const show = n => {
      i = Math.max(0, Math.min(g.items.length - 1, n));
      const q = $("#gQ");
      q.textContent = g.items[i].q; q.classList.remove("anim"); void q.offsetWidth; q.classList.add("anim");
      $("#gNum").textContent = `${i + 1} / ${g.items.length}`;
      bars.forEach((b, k) => { b.className = k < i ? "done" : k === i ? "cur" : ""; });
      [yes, no].forEach(b => b.classList.remove("dim", "win"));
      ans.textContent = ""; ans.classList.remove("show");
      $("#gNext").innerHTML = i === g.items.length - 1 ? "סיום " + ic("trophy") : "הבא ←";
    };
    const revealAns = () => {
      const it = g.items[i];
      if (it.a === null) { ans.innerHTML = ic("sparkle") + " נדון בזה יחד בכיתה!"; ans.classList.add("show"); return; }
      const good = it.a ? yes : no, bad = it.a ? no : yes;
      bad.classList.add("dim"); good.classList.add("win");
      ans.textContent = it.note; ans.style.color = it.a ? "#15803d" : "#be123c";
      ans.classList.remove("show"); void ans.offsetWidth; ans.classList.add("show");
      const r = good.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top + r.height / 2, 70);
    };
    $("#gReveal").addEventListener("click", revealAns);
    yes.addEventListener("click", revealAns);
    no.addEventListener("click", revealAns);
    $("#gNext").addEventListener("click", () => {
      if (i === g.items.length - 1) { bars.forEach(b => b.className = "done"); confetti(innerWidth / 2, innerHeight / 2, 220); return; }
      show(i + 1);
    });
    $("#gPrev").addEventListener("click", () => show(i - 1));
    show(0);
  }

  /* ---------- ראיון (כרטיסים מתהפכים) ---------- */
  function interviewHTML(iv) {
    return `<section class="block">
      <h2 class="block-title">${ic("headphones")} ${esc(iv.title)}</h2>
      <p style="margin:-6px 0 18px">לוחצים על כרטיס של המראיינת — ומגלים מה משה ענה.</p>
      <div class="interview">${iv.items.map((it, k) => `
        <button class="flip" aria-label="שאלה ${k + 1}">
          <div class="inner">
            <div class="face front"><div class="who">${ic("headphones")} מראיינת:</div><div class="txt">${esc(it.q)}</div><span class="hint">לחצו להפוך ↻</span></div>
            <div class="face back"><div class="who">${ic("mic")} משה:</div><div class="txt">${esc(it.a)}</div></div>
          </div>
        </button>`).join("")}
      </div>
    </section>`;
  }
  function setupInterview() {
    document.querySelectorAll(".flip").forEach(f => f.addEventListener("click", () => f.classList.toggle("open")));
  }

  /* ---------- הפעלה ---------- */
  decorate();
  if (!topicId) renderHome();
  else {
    const t = S.topics.find(x => x.id === topicId);
    if (t) renderTopic(t); else location.href = "index.html";
  }
  bindFullscreen();
})();
