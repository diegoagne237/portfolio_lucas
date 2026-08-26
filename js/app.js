// ============================================================
// Busca os projetos no Supabase (editados pela página /admin) e
// monta a grade. Se o Supabase não responder, usa o FALLBACK_PROJECTS
// do js/projects.js pra o site nunca ficar vazio.
// ============================================================

const grid = document.getElementById("grid");
const filterList = document.getElementById("filterList");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClientTitle = document.getElementById("lbClientTitle");
const lbCounter = document.getElementById("lbCounter");
const lbCategory = document.getElementById("lbCategory");

let ALL_PROJECTS = [];
let activeProject = null;
let activeIndex = 0;

async function loadProjects() {
  try {
    const { data, error } = await supabaseClient
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) throw new Error("Sem projetos no banco");

    return data;
  } catch (err) {
    console.warn("Usando dados locais (Supabase indisponível):", err);
    return FALLBACK_PROJECTS;
  }
}

function renderGrid(list, filter) {
  grid.innerHTML = "";
  const filtered = filter
    ? list.filter((p) => p.category === filter)
    : list;

  filtered.forEach((project) => {
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
        <img src="${project.images[0]}" alt="${project.title} — ${project.client}" loading="lazy" />
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

function renderFilters(list) {
  const categories = ["Todos", ...new Set(list.map((p) => p.category))];
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
      renderGrid(ALL_PROJECTS, category === "Todos" ? null : category);
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
  lbImg.src = activeProject.images[activeIndex];
  lbImg.alt = `${activeProject.title} — foto ${n}`;
  lbClientTitle.querySelector("strong").textContent = activeProject.client;
  lbClientTitle.querySelector("span").textContent = activeProject.title;
  lbCategory.textContent = activeProject.category;
  lbCounter.textContent = `${String(n).padStart(2, "0")} / ${String(
    activeProject.images.length
  ).padStart(2, "0")}`;
}

function nextImg() {
  activeIndex = (activeIndex + 1) % activeProject.images.length;
  updateLightbox();
}

function prevImg() {
  activeIndex =
    (activeIndex - 1 + activeProject.images.length) %
    activeProject.images.length;
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

(async function init() {
  ALL_PROJECTS = await loadProjects();
  renderFilters(ALL_PROJECTS);
  renderGrid(ALL_PROJECTS, null);
})();

document.getElementById("year").textContent = new Date().getFullYear();
