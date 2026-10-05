import data from "@/assets/data/partners.json";

const assets = Object.fromEntries(
  Object.entries(
    import.meta.glob("@/assets/partners/*", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  ).map(([path, url]) => [path.split("/").pop(), url]),
);

export const hero = assets[data.hero];

export const partners = data.partners.map((partner) => ({
  ...partner,
  logo: assets[partner.logo],
}));
