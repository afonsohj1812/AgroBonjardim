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

const bySlug = (entries, strip) =>
  Object.fromEntries(
    Object.entries(entries).map(([path, url]) => [
      path.split("/").pop().replace(strip, ""),
      url,
    ]),
  );

const icons = bySlug(files, ".svg");
const images = bySlug(photos, /\.\w+$/);

const list = [
  {
    slug: "racoes",
    name: "Rações e complementos para animais",
    description: "Alimentação e complementos para todo o tipo de animais.",
  },
  {
    slug: "pecuaria",
    name: "Pecuária",
    description: "Artigos de apoio à criação e maneio de gado.",
  },
  {
    slug: "animais-de-companhia",
    name: "Animais de companhia",
    description: "Tudo para cães, gatos e outros animais domésticos.",
  },
  {
    slug: "jardim",
    name: "Jardim",
    description: "Produtos e utensílios para cuidar do seu jardim.",
  },
  {
    slug: "adubos-e-fertilizantes",
    name: "Adubos e fertilizantes",
    description: "Nutrição para as suas culturas, horta e jardim.",
  },
  {
    slug: "plantas-arvores-e-sementes",
    name: "Plantas, árvores e sementes",
    description: "Sementes, plantas e árvores para plantar e semear.",
  },
  {
    slug: "fitofarmacos",
    name: "Produtos fitofarmacêuticos e soluções biológicas",
    description: "Proteção das culturas, com alternativas biológicas.",
  },
  {
    slug: "casa-e-bricolage",
    name: "Casa e bricolage",
    description: "Ferramentas e artigos de apoio à casa e ao quintal.",
  },
];

export const categories = list.map((category) => ({
  ...category,
  icon: icons[category.slug] ?? null,
  image: images[category.slug] ?? null,
}));
