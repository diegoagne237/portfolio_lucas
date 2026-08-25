/*
  ============================================================
  GERENCIADOR DE PROJETOS
  ============================================================
  Pra adicionar um projeto novo:

  1. Crie uma pasta dentro de /images com o nome do cliente
     (sem espaço, sem acento — ex: /images/nome-do-cliente)
  2. Coloque as fotos numeradas dentro: 01.jpg, 02.jpg, 03.jpg...
  3. Copie um bloco { ... } abaixo, cole no fim da lista e troque
     os dados. O "images" é só a quantidade de fotos numeradas
     que você colocou na pasta.

  Pronto — o site atualiza sozinho, não precisa mexer em mais
  nada.
  ============================================================
*/

const PROJECTS = [
  {
    client: "Banco da Amazônia",
    title: "Estande de Feira Agro",
    category: "Ativação de Marca",
    year: "2026",
    folder: "banco-da-amazonia",
    images: 4,
  },
  {
    client: "Corona",
    title: "Adega Retornável",
    category: "Ponto de Venda",
    year: "2026",
    folder: "corona-adega",
    images: 3,
  },
  {
    client: "Corona",
    title: "Deck — Lounge de Marca",
    category: "Ativação de Marca",
    year: "2026",
    folder: "corona-deck",
    images: 3,
  },
  {
    client: "Cyrela | Goldsztein",
    title: "Nova Olaria — Ação em Shopping",
    category: "Ativação de Marca",
    year: "2026",
    folder: "cyrela",
    images: 1,
  },
  {
    client: "Barchart",
    title: "cmdtyView — Estande Corporativo",
    category: "Estande Corporativo",
    year: "2026",
    folder: "barchart",
    images: 1,
  },
  {
    client: "Beats",
    title: "Ativação Noturna — Palco Beats",
    category: "Ativação de Marca",
    year: "2026",
    folder: "beats",
    images: 2,
  },
  {
    client: "Spaten",
    title: "Espaço Spaten — Festival",
    category: "Ativação de Marca",
    year: "2026",
    folder: "spaten",
    images: 1,
  },
  {
    client: "GWM | e-BRUN",
    title: "Hello, Tomorrow — Estande Concessionária",
    category: "Estande Corporativo",
    year: "2026",
    folder: "gwm-ebrun",
    images: 6,
  },
  {
    client: "KF",
    title: "DNA Inovador — Estande Feira Agro",
    category: "Estande Corporativo",
    year: "2026",
    folder: "kf",
    images: 12,
  },
];
