/*
  ============================================================
  DADOS DE RESERVA (FALLBACK)
  ============================================================
  Isso NÃO é mais o gerenciador principal. Os projetos agora
  vivem no Supabase e são editados pela página /admin.

  Esse arquivo só é usado se o site não conseguir se conectar
  ao Supabase por algum motivo (ex: sem internet no momento do
  build, chave errada, etc) — assim o site nunca fica vazio.
  Não precisa manter isso atualizado manualmente.
  ============================================================
*/

const FALLBACK_PROJECTS = [
  {
    client: "Banco da Amazônia",
    title: "Estande de Feira Agro",
    category: "Ativação de Marca",
    year: "2026",
    images: ["images/banco-da-amazonia/01.jpg", "images/banco-da-amazonia/02.jpg", "images/banco-da-amazonia/03.jpg", "images/banco-da-amazonia/04.jpg"],
  },
  {
    client: "Corona",
    title: "Adega Retornável",
    category: "Ponto de Venda",
    year: "2026",
    images: ["images/corona-adega/01.jpg", "images/corona-adega/02.jpg", "images/corona-adega/03.jpg"],
  },
  {
    client: "Corona",
    title: "Deck — Lounge de Marca",
    category: "Ativação de Marca",
    year: "2026",
    images: ["images/corona-deck/01.jpg", "images/corona-deck/02.jpg", "images/corona-deck/03.jpg"],
  },
  {
    client: "Cyrela | Goldsztein",
    title: "Nova Olaria — Ação em Shopping",
    category: "Ativação de Marca",
    year: "2026",
    images: ["images/cyrela/01.jpg"],
  },
  {
    client: "Barchart",
    title: "cmdtyView — Estande Corporativo",
    category: "Estande Corporativo",
    year: "2026",
    images: ["images/barchart/01.jpg"],
  },
  {
    client: "Beats",
    title: "Ativação Noturna — Palco Beats",
    category: "Ativação de Marca",
    year: "2026",
    images: ["images/beats/01.jpg", "images/beats/02.jpg"],
  },
  {
    client: "Spaten",
    title: "Espaço Spaten — Festival",
    category: "Ativação de Marca",
    year: "2026",
    images: ["images/spaten/01.jpg"],
  },
  {
    client: "GWM | e-BRUN",
    title: "Hello, Tomorrow — Estande Concessionária",
    category: "Estande Corporativo",
    year: "2026",
    images: ["images/gwm-ebrun/01.jpg", "images/gwm-ebrun/02.jpg", "images/gwm-ebrun/03.jpg", "images/gwm-ebrun/04.jpg", "images/gwm-ebrun/05.jpg", "images/gwm-ebrun/06.jpg"],
  },
  {
    client: "KF",
    title: "DNA Inovador — Estande Feira Agro",
    category: "Estande Corporativo",
    year: "2026",
    images: ["images/kf/01.jpg", "images/kf/02.jpg", "images/kf/03.jpg", "images/kf/04.jpg", "images/kf/05.jpg", "images/kf/06.jpg", "images/kf/07.jpg", "images/kf/08.jpg", "images/kf/09.jpg", "images/kf/10.jpg", "images/kf/11.jpg", "images/kf/12.jpg"],
  },
];
