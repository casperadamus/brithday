(() => {
  const $ = (sel) => document.querySelector(sel);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- fill in text from content.js ----------
  document.title = `Happy Birthday, ${CONTENT.momName}`;
  document.querySelectorAll("[data-bind]").forEach((el) => {
    el.textContent = CONTENT[el.dataset.bind] ?? "";
  });

  const letterBody = $(".letter-body");
  CONTENT.letter.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    letterBody.appendChild(p);
  });

  // ---------- gallery ----------
  const gallery = $(".gallery");
  const tilts = [-2.2, 1.6, -1, 2.4, -1.8, 1.2, -1.4, 2, -0.8];
  CONTENT.photos.forEach((photo, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "polaroid reveal";
    card.style.setProperty("--tilt", `${tilts[i % tilts.length]}deg`);
    card.style.transitionDelay = `${(i % 3) * 0.12}s`;

    const frame = document.createElement("div");
    frame.className = "frame";
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption || "A photo of us";
    img.loading = "lazy";
    if (photo.focus) img.style.objectPosition = photo.focus;
    img.onerror = () => {
      frame.innerHTML = '<span class="placeholder">photo coming soon</span>';
      card.dataset.missing = "true";
    };
    frame.appendChild(img);

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption || "";

    card.append(frame, caption);
    card.addEventListener("click", () => {
      if (!card.dataset.missing) openLightbox(photo);
    });
    gallery.appendChild(card);
  });

  // ---------- lightbox ----------
  const lightbox = $(".lightbox");
  function openLightbox(photo) {
    lightbox.querySelector("img").src = photo.src;
    lightbox.querySelector("img").alt = photo.caption || "";
    lightbox.querySelector("figcaption").textContent = photo.caption || "";
    lightbox.hidden = false;
    $(".lightbox-close").focus();
  }
  const closeLightbox = () => (lightbox.hidden = true);
  lightbox.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG") closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // ---------- reasons ----------
  const reasons = $(".reasons");
  CONTENT.reasons.forEach((r, i) => {
    const li = document.createElement("li");
    li.className = "reveal";
    li.style.transitionDelay = `${(i % 3) * 0.1}s`;
    const h3 = document.createElement("h3");
    h3.textContent = r.title;
    const p = document.createElement("p");
    p.textContent = r.text;
    li.append(h3, p);
    reasons.appendChild(li);
  });

  // ---------- reveal on scroll ----------
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // ---------- falling petals ----------
  const petals = $(".petals");
  function spawnPetal() {
    const petal = document.createElement("span");
    petal.className = "petal";
    const size = 0.6 + Math.random() * 0.8;
    const duration = 9 + Math.random() * 8;
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.transform = `scale(${size})`;
    petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 200}px`);
    petal.style.setProperty("--spin", `${Math.random() * 720 - 360}deg`);
    petal.style.animationDuration = `${duration}s`;
    petals.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000);
  }
  if (!reduceMotion) {
    for (let i = 0; i < 4; i++) setTimeout(spawnPetal, i * 900);
    setInterval(spawnPetal, 1400);
  }

  // ---------- surprise + confetti ----------
  const canvas = $(".confetti");
  const ctx = canvas.getContext("2d");
  const colors = ["#d99a8f", "#f3dcd4", "#b56f66", "#b9c4ad", "#f7e3c3", "#ffffff"];
  let pieces = [];
  let running = false;

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  function drawHeart(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.3);
    ctx.bezierCurveTo(x, y, x - s / 2, y, x - s / 2, y + s * 0.3);
    ctx.bezierCurveTo(x - s / 2, y + s * 0.6, x, y + s * 0.8, x, y + s);
    ctx.bezierCurveTo(x, y + s * 0.8, x + s / 2, y + s * 0.6, x + s / 2, y + s * 0.3);
    ctx.bezierCurveTo(x + s / 2, y, x, y, x, y + s * 0.3);
    ctx.fill();
  }

  function burst() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < 160; i++) {
      pieces.push({
        x: w / 2 + (Math.random() - 0.5) * 80,
        y: h * 0.75,
        vx: (Math.random() - 0.5) * 14,
        vy: -8 - Math.random() * 12,
        size: 6 + Math.random() * 8,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: colors[(Math.random() * colors.length) | 0],
        heart: Math.random() < 0.35,
        life: 0,
      });
    }
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces = pieces.filter((p) => p.y < window.innerHeight + 40 && p.life < 400);
    pieces.forEach((p) => {
      p.life++;
      p.vy += 0.28;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.heart) drawHeart(0, -p.size / 2, p.size * 1.4);
      else ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });
    if (pieces.length) requestAnimationFrame(tick);
    else running = false;
  }

  $(".gift").addEventListener("click", (e) => {
    $(".surprise").classList.add("show");
    e.currentTarget.textContent = "Again!";
    if (!reduceMotion) burst();
  });
})();
