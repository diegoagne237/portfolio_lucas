// ============================================================
// Admin: login + CRUD de projetos, com upload de fotos pro
// Supabase Storage.
// ============================================================

const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const logoutBtn = document.getElementById("logoutBtn");

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");

const projectForm = document.getElementById("projectForm");
const projectIdField = document.getElementById("projectId");
const fieldClient = document.getElementById("fieldClient");
const fieldTitle = document.getElementById("fieldTitle");
const fieldCategory = document.getElementById("fieldCategory");
const fieldYear = document.getElementById("fieldYear");
const fieldImages = document.getElementById("fieldImages");
const existingImagesDiv = document.getElementById("existingImages");
const uploadProgress = document.getElementById("uploadProgress");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const formError = document.getElementById("formError");
const projectList = document.getElementById("projectList");
const categoryOptions = document.getElementById("categoryOptions");

let currentImages = []; // imagens já salvas do projeto em edição
let allProjects = [];

// ------------------------------------------------------------
// AUTENTICAÇÃO
// ------------------------------------------------------------

function showLogin() {
  loginScreen.hidden = false;
  dashboard.hidden = true;
  logoutBtn.hidden = true;
}

function showDashboard() {
  loginScreen.hidden = true;
  dashboard.hidden = false;
  logoutBtn.hidden = false;
  loadProjectList();
  loadSiteContentForm();
}

supabaseClient.auth.getSession().then(({ data }) => {
  if (data.session) showDashboard();
  else showLogin();
});

supabaseClient.auth.onAuthStateChange((_event, session) => {
  if (session) showDashboard();
  else showLogin();
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginError.hidden = true;
  const { error } = await supabaseClient.auth.signInWithPassword({
    email: loginEmail.value.trim(),
    password: loginPassword.value,
  });
  if (error) {
    loginError.textContent = "E-mail ou senha incorretos.";
    loginError.hidden = false;
  }
});

logoutBtn.addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
});

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------

function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function resetForm() {
  projectForm.reset();
  projectIdField.value = "";
  currentImages = [];
  existingImagesDiv.innerHTML = "";
  formTitle.textContent = "Adicionar projeto";
  submitBtn.textContent = "Salvar projeto";
  cancelEditBtn.hidden = true;
  formError.hidden = true;
}

cancelEditBtn.addEventListener("click", resetForm);

function renderExistingImages() {
  existingImagesDiv.innerHTML = "";
  currentImages.forEach((url, idx) => {
    const div = document.createElement("div");
    div.className = "admin-existing-thumb";
    div.innerHTML = `<img src="${url}" alt="" /><button type="button" title="Remover">✕</button>`;
    div.querySelector("button").addEventListener("click", () => {
      currentImages.splice(idx, 1);
      renderExistingImages();
    });
    existingImagesDiv.appendChild(div);
  });
}

// ------------------------------------------------------------
// TEXTOS DO SITE
// ------------------------------------------------------------

const contentForm = document.getElementById("contentForm");
const contentSubmitBtn = document.getElementById("contentSubmitBtn");
const contentSuccess = document.getElementById("contentSuccess");
const contentError = document.getElementById("contentError");

const cfHeroLede = document.getElementById("cfHeroLede");
const cfHeroClientes = document.getElementById("cfHeroClientes");
const cfHeroEspecialidade = document.getElementById("cfHeroEspecialidade");
const cfHeroBase = document.getElementById("cfHeroBase");
const cfAboutText = document.getElementById("cfAboutText");
const cfAboutTags = document.getElementById("cfAboutTags");
const cfContactHeading = document.getElementById("cfContactHeading");

async function loadSiteContentForm() {
  const { data, error } = await supabaseClient
    .from("site_content")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) return;

  cfHeroLede.value = data.hero_lede || "";
  cfHeroClientes.value = data.hero_clientes || "";
  cfHeroEspecialidade.value = data.hero_especialidade || "";
  cfHeroBase.value = data.hero_base || "";
  cfAboutText.value = data.about_text || "";
  cfAboutTags.value = (data.about_tags || []).join(", ");
  cfContactHeading.value = data.contact_heading || "";
}

contentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  contentSuccess.hidden = true;
  contentError.hidden = true;
  contentSubmitBtn.disabled = true;
  contentSubmitBtn.textContent = "Salvando...";

  const payload = {
    id: 1,
    hero_lede: cfHeroLede.value.trim(),
    hero_clientes: cfHeroClientes.value.trim(),
    hero_especialidade: cfHeroEspecialidade.value.trim(),
    hero_base: cfHeroBase.value.trim(),
    about_text: cfAboutText.value.trim(),
    about_tags: cfAboutTags.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    contact_heading: cfContactHeading.value.trim(),
  };

  const { error } = await supabaseClient
    .from("site_content")
    .upsert(payload);

  contentSubmitBtn.disabled = false;
  contentSubmitBtn.textContent = "Salvar textos";

  if (error) {
    contentError.textContent = "Erro ao salvar: " + error.message;
    contentError.hidden = false;
  } else {
    contentSuccess.hidden = false;
    setTimeout(() => (contentSuccess.hidden = true), 3000);
  }
});

// ------------------------------------------------------------
// CARREGAR LISTA DE PROJETOS
// ------------------------------------------------------------

async function loadProjectList() {
  const { data, error } = await supabaseClient
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    projectList.innerHTML = `<p class="admin-error">Erro ao carregar: ${error.message}</p>`;
    return;
  }

  allProjects = data || [];

  // atualiza sugestões de categoria
  const cats = [...new Set(allProjects.map((p) => p.category))];
  categoryOptions.innerHTML = cats
    .map((c) => `<option value="${c}"></option>`)
    .join("");

  projectList.innerHTML = "";
  allProjects.forEach((project) => {
    const row = document.createElement("div");
    row.className = "admin-project-row";
    row.innerHTML = `
      <img src="${project.images[0] || ""}" alt="" />
      <div class="admin-project-row-info">
        <div class="admin-project-row-client">${project.client}</div>
        <div class="admin-project-row-title">${project.title}</div>
        <div class="admin-project-row-cat">${project.category} · ${project.images.length} foto(s)</div>
      </div>
      <div class="admin-project-row-actions">
        <button class="admin-row-btn" data-action="edit">Editar</button>
        <button class="admin-row-btn danger" data-action="delete">Apagar</button>
      </div>
    `;
    row
      .querySelector('[data-action="edit"]')
      .addEventListener("click", () => startEdit(project));
    row
      .querySelector('[data-action="delete"]')
      .addEventListener("click", () => deleteProject(project));
    projectList.appendChild(row);
  });
}

function startEdit(project) {
  projectIdField.value = project.id;
  fieldClient.value = project.client;
  fieldTitle.value = project.title;
  fieldCategory.value = project.category;
  fieldYear.value = project.year;
  currentImages = [...project.images];
  renderExistingImages();
  formTitle.textContent = "Editar projeto";
  submitBtn.textContent = "Salvar alterações";
  cancelEditBtn.hidden = false;
  formError.hidden = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function deleteProject(project) {
  if (
    !confirm(
      `Apagar o projeto "${project.title}" (${project.client})? Essa ação não pode ser desfeita.`
    )
  )
    return;

  // tenta apagar as fotos do Storage (ignora as que são caminhos estáticos locais)
  const storagePaths = project.images
    .filter((url) => url.includes("/storage/v1/object/public/project-images/"))
    .map((url) => url.split("/project-images/")[1]);

  if (storagePaths.length > 0) {
    await supabaseClient.storage.from("project-images").remove(storagePaths);
  }

  const { error } = await supabaseClient
    .from("projects")
    .delete()
    .eq("id", project.id);

  if (error) {
    alert("Erro ao apagar: " + error.message);
    return;
  }

  if (projectIdField.value === project.id) resetForm();
  loadProjectList();
}

// ------------------------------------------------------------
// SALVAR (CRIAR OU EDITAR)
// ------------------------------------------------------------

projectForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  formError.hidden = true;

  const files = Array.from(fieldImages.files);
  const isEditing = !!projectIdField.value;

  if (!isEditing && files.length === 0) {
    formError.textContent = "Selecione pelo menos uma foto.";
    formError.hidden = false;
    return;
  }

  if (isEditing && currentImages.length === 0 && files.length === 0) {
    formError.textContent = "O projeto precisa ter pelo menos uma foto.";
    formError.hidden = false;
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Salvando...";

  try {
    const uploadedUrls = [];

    if (files.length > 0) {
      const slug = `${slugify(fieldClient.value)}-${slugify(fieldTitle.value)}`;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        uploadProgress.hidden = false;
        uploadProgress.textContent = `Enviando foto ${i + 1} de ${files.length}...`;

        const ext = file.name.split(".").pop();
        const path = `${slug}/${Date.now()}-${i}.${ext}`;

        const { error: uploadError } = await supabaseClient.storage
          .from("project-images")
          .upload(path, file, { cacheControl: "3600", upsert: false });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabaseClient.storage
          .from("project-images")
          .getPublicUrl(path);

        uploadedUrls.push(publicUrlData.publicUrl);
      }
      uploadProgress.hidden = true;
    }

    const finalImages = [...currentImages, ...uploadedUrls];

    const payload = {
      client: fieldClient.value.trim(),
      title: fieldTitle.value.trim(),
      category: fieldCategory.value.trim(),
      year: fieldYear.value.trim(),
      images: finalImages,
    };

    let dbError;
    if (isEditing) {
      const { error } = await supabaseClient
        .from("projects")
        .update(payload)
        .eq("id", projectIdField.value);
      dbError = error;
    } else {
      const { error } = await supabaseClient.from("projects").insert(payload);
      dbError = error;
    }

    if (dbError) throw dbError;

    resetForm();
    loadProjectList();
  } catch (err) {
    formError.textContent = "Erro ao salvar: " + err.message;
    formError.hidden = false;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = isEditing ? "Salvar alterações" : "Salvar projeto";
    uploadProgress.hidden = true;
  }
});

// ano atual como sugestão padrão no campo Ano
fieldYear.value = new Date().getFullYear().toString();
