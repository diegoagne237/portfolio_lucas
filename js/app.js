// ============================================================
// Monta a grade de projetos a partir de PROJECTS (js/projects.js)
// ============================================================

const grid = document.getElementById("grid");
const filterList = document.getElementById("filterList");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClientTitle = document.getElementById("lbClientTitle");
const lbCounter = document.getElementById("lbCounter");
const lbCategory = document.getElementById("lbCategory");

let activeProject = null;
let activeIndex = 0;

function imgPath(project, n) {
  const num = String(n).padStart(2, "0");
  return `images/${project.folder}/${num}.jpg`;
}

function renderGrid(filter) {
  grid.innerHTML = "";
  const list = filter
    ? PROJECTS.filter((p) => p.category === filter)
    : PROJECTS;

  list.forEach((project) => {
    const card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute(
      "aria-label",
      `Ver projeto ${project.title} — ${project.client}`
    );

    card.innerHTML = `
      <div class="card-frame">
        <img src="${imgPath(project, 1)}" alt="${project.title} — ${project.client}" loading="lazy" />
        <div class="card-bracket"><span></span><span></span><span></span><span></span></div>
      </div>
      <div class="card-info">
        <div class="card-client">${project.client}</div>
        <h3 class="card-title">${project.title}</h3>
        <div class="card-tags">
          <span>${project.category}</span>
        </div>
      </div>
    `;

    const open = () => openLightbox(project);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });

    grid.appendChild(card);
  });
}

function renderFilters() {
  const categories = ["Todos", ...new Set(PROJECTS.map((p) => p.category))];
  filterList.innerHTML = "";

  categories.forEach((category, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (i === 0 ? " active" : "");
    btn.textContent = category;
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderGrid(category === "Todos" ? null : category);
    });
    li.appendChild(btn);
    filterList.appendChild(li);
  });
}

function openLightbox(project) {
  activeProject = project;
  activeIndex = 0;
  updateLightbox();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function updateLightbox() {
  const n = activeIndex + 1;
  lbImg.src = imgPath(activeProject, n);
  lbImg.alt = `${activeProject.title} — foto ${n}`;
  lbClientTitle.querySelector("strong").textContent = activeProject.client;
  lbClientTitle.querySelector("span").textContent = activeProject.title;
  lbCategory.textContent = activeProject.category;
  lbCounter.textContent = `${String(n).padStart(2, "0")} / ${String(
    activeProject.images
  ).padStart(2, "0")}`;
}

function nextImg() {
  activeIndex = (activeIndex + 1) % activeProject.images;
  updateLightbox();
}

function prevImg() {
  activeIndex =
    (activeIndex - 1 + activeProject.images) % activeProject.images;
  updateLightbox();
}

document.getElementById("lbNext").addEventListener("click", nextImg);
document.getElementById("lbPrev").addEventListener("click", prevImg);
document.getElementById("lbClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImg();
  if (e.key === "ArrowLeft") prevImg();
});

renderFilters();
renderGrid(null);

document.getElementById("year").textContent = new Date().getFullYear();
