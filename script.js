(() => {
  const $ = (sel) => document.querySelector(sel);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- fill in text from content.js ----------
  document.title = `Wszystkiego najlepszego, ${CONTENT.momName}`;
  document.querySelectorAll("[data-bind]").forEach((el) => {
    el.textContent = CONTENT[el.dataset.bind] ?? "";
  });

  const letterBody = $(".letter-body");
  CONTENT.letter.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    letterBody.appendChild(p);
  });

  const lightbox = $(".lightbox");

  // ---------- photo story (one photo at a time) ----------
  const slidesEl = $(".slides");
  const note = $(".note");
  const count = $(".story-count");
  const bar = $(".story-bar span");
  const prevBtn = $(".story-btn.prev");
  const nextBtn = $(".story-btn.next");
  const hint = $(".story-hint");
  const tilts = [-2.2, 1.6, -1, 2.4, -1.8, 1.2, -1.4, 2, -0.8];

  const slides = CONTENT.photos.map((photo, i) => {
    const slide = document.createElement("figure");
    slide.className = "slide polaroid";
    slide.style.setProperty("--tilt", `${tilts[i % tilts.length]}deg`);
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${i + 1} z ${CONTENT.photos.length}`);

    const frame = document.createElement("div");
    frame.className = "frame";
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption || "Nasze zdjęcie";
    img.draggable = false;
    if (photo.focus) img.style.objectPosition = photo.focus;
    img.onerror = () => {
      frame.innerHTML = '<span class="placeholder">zdjęcie wkrótce</span>';
      slide.dataset.missing = "true";
    };
    frame.appendChild(img);

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption || "";

    slide.append(frame, caption);
    slidesEl.appendChild(slide);
    return slide;
  });

  let current = 0;
  const last = slides.length - 1;

  function show(index) {
    current = Math.max(0, Math.min(last, index));
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === current);
      slide.classList.toggle("before", i < current);
      slide.classList.toggle("after", i > current);
      slide.setAttribute("aria-hidden", i !== current);
    });
    note.classList.remove("show");
    const text = CONTENT.photos[current].note || "";
    setTimeout(() => {
      note.textContent = text;
      if (text) note.classList.add("show");
    }, 250);
    count.textContent = `${current + 1} / ${slides.length}`;
    bar.style.width = `${((current + 1) / slides.length) * 100}%`;
    prevBtn.disabled = current === 0;
    const atEnd = current === last;
    nextBtn.classList.toggle("finish", atEnd);
    nextBtn.textContent = atEnd ? "dalej ↓" : "›";
    nextBtn.setAttribute("aria-label", atEnd ? "Przejdź dalej" : "Następne zdjęcie");
  }

  function go(step) {
    if (step > 0 && current === last) {
      $("#reasons").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }
    show(current + step);
    hint.classList.add("hide");
  }

  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));

  // swipe to move, tap to see the whole photo
  let start = null;
  slidesEl.addEventListener("pointerdown", (e) => {
    start = { x: e.clientX, y: e.clientY };
  });
  slidesEl.addEventListener("pointerup", (e) => {
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    start = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && !slides[current].dataset.missing) {
      openLightbox(CONTENT.photos[current]);
    }
  });
  slidesEl.addEventListener("pointercancel", () => (start = null));

  // arrow keys work while the photos are on screen
  let storyOnScreen = false;
  new IntersectionObserver(([entry]) => (storyOnScreen = entry.isIntersecting), { threshold: 0.5 }).observe(slidesEl);
  document.addEventListener("keydown", (e) => {
    if (!storyOnScreen || !lightbox.hidden) return;
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  });

  show(0);

  // ---------- lightbox ----------
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
    e.currentTarget.textContent = "Jeszcze raz!";
    if (!reduceMotion) burst();
  });
})();
