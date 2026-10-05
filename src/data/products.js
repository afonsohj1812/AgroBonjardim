import list from "@/assets/data/products.json";

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

const gallery = import.meta.glob("@/assets/products/photos/*/*", {
  eager: true,
  query: "?url",
  import: "default",
});

// As fotos vivem numa pasta por categoria, indexadas por "<categoria>/<nome>".
const photoOf = (slug, name) => {
  const wanted = `/${slug}/${name}`.toLowerCase();

  const entry = Object.entries(gallery).find(([path]) =>
    path.replace(/\.\w+$/, "").toLowerCase().endsWith(wanted),
  );

  return entry ? entry[1] : null;
};

const marks = bySlug(
  import.meta.glob("@/assets/icons/*.svg", {
    eager: true,
    query: "?url",
    import: "default",
  }),
);

// Troca o nome do ícone pelo ficheiro correspondente em assets/icons.
const drawn = (entry) =>
  entry && { ...entry, icon: marks[entry.icon] ?? null };

const icons = bySlug(files);
const images = bySlug(photos);
const covers = bySlug(banners);

export const categories = list.map((category) => ({
  ...category,
  icon: icons[category.slug] ?? null,
  image: images[category.slug] ?? null,
  banner: covers[category.slug] ?? images[category.slug] ?? null,
  intro: category.intro && {
    ...category.intro,
    image: category.intro.photo
      ? photoOf(category.slug, category.intro.photo)
      : null,
  },
  groups: category.groups?.map((group) => ({
    ...group,
    image: group.photo ? photoOf(category.slug, group.photo) : null,
  })),
  topics: category.topics?.map((topic) => ({
    ...drawn(topic),
    image: topic.photo ? photoOf(category.slug, topic.photo) : null,
  })),
  tiles: category.tiles?.map(drawn),
  highlights: category.highlights?.map(drawn),
  split: category.split && {
    ...category.split,
    boxes: category.split.boxes.map(drawn),
  },
  note: drawn(category.note),
  cta: drawn(category.cta),
}));
