const files = import.meta.glob("@/assets/products/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

const photos = import.meta.glob("@/assets/products/images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const bySlug = (entries) =>
  Object.fromEntries(
    Object.entries(entries).map(([path, url]) => [
      path.split("/").pop().replace(/\.\w+$/, ""),
      url,
    ]),
  );

const banners = import.meta.glob("@/assets/products/banners/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const icons = bySlug(files);
const images = bySlug(photos);
const covers = bySlug(banners);

const list = [
  {
    slug: "racoes",
    name: "Rações e complementos",
    description: "Alimentação e complementos para todo o tipo de animais.",
    groups: [
      { title: "<grupo 1>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
      { title: "<grupo 2>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
    ],
  },
  {
    slug: "pecuaria",
    name: "Pecuária",
    description: "Artigos de apoio à criação e maneio de gado.",
    groups: [
      { title: "<grupo 1>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
      { title: "<grupo 2>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
    ],
  },
  {
    slug: "animais-de-companhia",
    name: "Animais de companhia",
    description: "Tudo para cães, gatos e outros animais domésticos.",
    groups: [
      { title: "<grupo 1>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
      { title: "<grupo 2>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
    ],
  },
  {
    slug: "jardim",
    name: "Jardim",
    description: "Produtos e utensílios para cuidar do seu jardim.",
    groups: [
      { title: "<grupo 1>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
      { title: "<grupo 2>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
    ],
  },
  {
    slug: "adubos-e-fertilizantes",
    name: "Adubos e fertilizantes",
    description: "Nutrição para as suas culturas, horta e jardim.",
    groups: [
      { title: "<grupo 1>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
      { title: "<grupo 2>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
    ],
  },
  {
    slug: "plantas-arvores-e-sementes",
    name: "Plantas, árvores e sementes",
    description: "Sementes, plantas e árvores para plantar e semear.",
    groups: [
      { title: "<grupo 1>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
      { title: "<grupo 2>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
    ],
  },
  {
    slug: "fitofarmacos",
    name: "Produtos fitofarmacêuticos",
    description: "Proteção das culturas, com alternativas biológicas.",
    groups: [
      { title: "<grupo 1>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
      { title: "<grupo 2>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
    ],
  },
  {
    slug: "casa-e-bricolage",
    name: "Casa e bricolage",
    description: "Ferramentas e artigos de apoio à casa e ao quintal.",
    groups: [
      { title: "<grupo 1>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
      { title: "<grupo 2>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
    ],
  },
  {
    slug: "apicultura",
    name: "Apicultura",
    description: "Material e equipamento para a criação de abelhas.",
    groups: [
      { title: "<grupo 1>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
      { title: "<grupo 2>", items: ["<produto 1>", "<produto 2>", "<produto 3>"] },
    ],
  },
];

export const categories = list.map((category) => ({
  ...category,
  icon: icons[category.slug] ?? null,
  image: images[category.slug] ?? null,
  banner: covers[category.slug] ?? images[category.slug] ?? null,
}));
