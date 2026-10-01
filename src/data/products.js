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

const list = [
  {
    slug: "racoes",
    name: "Rações e complementos",
    description: "Alimentação e complementos para todo o tipo de animais.",
    groups: [
      {
        title: "Rações Zêzere",
        text: "Somos revendedores das Rações Zêzere, produzidas aqui na Zona Centro, perto de nós. Temos rações para as principais espécies, adaptadas a cada fase de crescimento.",
        photo: "zezere",
        items: [
          "Marca portuguesa de confiança",
          "Rações para cada fase do animal",
          "Aconselhamento na loja",
        ],
      },
      {
        title: "Para que animais?",
        columns: 2,
        items: [
          "Aves",
          "Coelhos",
          "Suínos",
          "Ovinos",
          "Caprinos",
          "Cavalos",
          "Bovinos",
          "Cereais",
        ],
      },
    ],
  },
  {
    slug: "pecuaria",
    name: "Pecuária",
    description: "Equipamento e cuidados para a sua exploração.",
    lead: "Equipamento, higiene e saúde animal para ovinos, caprinos, suínos, bovinose aves, para quem tem uma exploração ou meia dúzia de cabeças em casa.",
    topics: [
      {
        icon: "torneira",
        title: "Bebedouros e comedouros",
        items: [
          "Bebedouros automáticos",
          "Manjedouras e comedouros",
          "Depósitos de água",
          "Baldes e selhas",
        ],
      },
      {
        icon: "vedacao",
        title: "Vedações e cercas",
        items: [
          "Rede ovelheira",
          "Postes e esticadores",
          "Vedação elétrica",
          "Arame e isoladores",
        ],
      },
      {
        icon: "saude",
        title: "Saúde animal",
        items: [
          "Desparasitantes",
          "Suplementos e vitaminas",
          "Blocos de sal e lambedores",
        ],
      },
      {
        icon: "gado",
        title: "Maneio e identificação",
        items: [
          "Brincos e aplicadores",
          "Cordas e cabeçadas",
          "Tosquia e cuidados de casco",
          "Marcadores",
        ],
      },
      {
        icon: "higiene",
        title: "Higiene e instalações",
        items: [
          "Desinfetantes",
          "Camas e absorventes",
          "Pulverizadores de instalações",
          "Vassouras e raspadores",
        ],
      },
      {
        icon: "aves",
        title: "Avicultura",
        items: [
          "Bebedouros e comedouros de aves",
          "Ninhos e poleiros",
          "Incubadoras",
          "Rede de capoeira",
        ],
      },
    ],
    groups: [],
  },
  {
    slug: "animais-de-companhia",
    name: "Animais de companhia",
    description: "Tudo para o bem-estar do seu animal.",
    lead: "Alimentação, acessórios e cuidados de saúde para cães, gatos, aves e outros animais de estimação. Na loja ajudamos a escolher o mais indicado para o seu companheiro.",
    topics: [
      {
        icon: "racao",
        title: "Alimentação",
        items: ["Rações para cães", "Rações para gatos", "Misturas para aves e roedores"],
      },
      {
        icon: "coleira",
        title: "Passeio e transporte",
        items: ["Coleiras", "Trelas", "Caixas transportadoras"],
      },
      {
        icon: "casota",
        title: "Casa e conforto",
        items: ["Gaiolas", "Ninhos", "Comedouros e bebedouros"],
      },
      {
        icon: "comprimido",
        title: "Saúde e cuidados",
        items: ["Desparasitantes", "Suplementos"],
      },
    ],
    groups: [],
  },
  {
    slug: "jardim",
    name: "Agricultura e jardinagem",
    description: "Ferramentas e materiais para o trabalho no campo e no jardim.",
    lead: "Do amanho do solo à rega e à colheita, temos o material para a exploração agrícola, a horta e o jardim de casa.",
    topics: [
      {
        icon: "rega",
        title: "Rega",
        items: [
          "Tubos e mangueiras",
          "Aspersores e gotejadores",
          "Torneiras e uniões",
          "Programadores",
        ],
      },
      {
        icon: "forquilha",
        title: "Ferramentas agrícolas",
        items: [
          "Enxadas e sachos",
          "Ancinhos e forquilhas",
          "Picaretas e alviões",
          "Cabos e ferragens",
        ],
      },
      {
        icon: "tesoura",
        title: "Jardinagem",
        items: [
          "Tesouras de poda",
          "Cortadores de sebes",
          "Pás de jardim",
          "Regadores e vasos",
        ],
      },
      {
        icon: "pulverizador",
        title: "Pulverização",
        items: [
          "Pulverizadores de mochila",
          "Pulverizadores manuais",
          "Bicos e acessórios",
          "Equipamento de proteção",
        ],
      },
      {
        icon: "cobertura",
        title: "Plásticos e coberturas",
        items: [
          "Plástico de estufa",
          "Mangas plásticas",
          "Manta térmica",
          "Tela de solo",
        ],
      },
      {
        icon: "rede",
        title: "Redes e amarrações",
        items: [
          "Rede de vedação e capoeira",
          "Rede de sombra",
          "Rede tutora",
          "Fio agrícola e fio tutor",
        ],
      },
    ],
    note: {
      icon: "loja",
      lines: [
        "Não encontra o que procura?",
        "Temos muito mais em loja e podemos encomendar.",
      ],
    },
    groups: [],
  },
  {
    slug: "adubos-e-fertilizantes",
    name: "Adubos e fertilizantes",
    description: "Solo mais fértil, culturas mais fortes.",
    split: {
      title: "Nutrição certa para cada cultura",
      text: "Temos adubos, corretivos e substratos para a horta, o pomar, o jardim e as grandes culturas. Trabalhamos com marcas de confiança e ajudamos a escolher o produto e a dose mais adequados ao seu solo.",
      boxes: [
        {
          icon: "adubo",
          title: "Adubos",
          items: ["Adubos sólidos", "Adubos líquidos", "Adubos solúveis"],
        },
        {
          icon: "corretivos",
          title: "Corretivos e orgânicos",
          items: ["Corretivos de solo", "Matéria orgânica", "Biofertilizantes"],
        },
        {
          icon: "substrato",
          title: "Substratos",
          items: ["Substratos para sementeira", "Substratos para vasos"],
        },
      ],
    },
    steps: {
      title: "Como ajudamos",
      items: [
        "Diga-nos a cultura",
        "Avaliamos o tipo de solo",
        "Recomendamos o adubo e a dose",
      ],
    },
    groups: [],
  },
  {
    slug: "plantas-arvores-e-sementes",
    name: "Plantas, árvores e sementes",
    description: "Para a horta, o jardim e a floresta.",
    lead: "Plantas, árvores e sementes de qualidade para agricultura, horticultura e jardinagem, escolhidas para boas colheitas e plantas fortes.",
    topics: [
      {
        icon: "rebento",
        title: "Plantas",
        photo: "PlantasLoja",
        items: [
          "Plantas hortícolas",
          "Plantas ornamentais",
          "Plantas aromáticas",
          "Flores da época",
        ],
      },
      {
        icon: "arvore",
        title: "Árvores",
        photo: "ArvoresLoja",
        items: [
          "Árvores de fruto",
          "Árvores florestais",
          "Árvores ornamentais",
        ],
      },
      {
        icon: "sementes",
        title: "Sementes",
        photo: "sementesLoja",
        items: [
          "Milho",
          "Forrageiras",
          "Batata de semente",
          "Sementes hortícolas",
          "Sementes ornamentais",
          "Relva",
        ],
      },
    ],
    note: {
      icon: "calendario",
      lines: [
        "Plantas da época disponíveis em loja.",
        "Pergunte-nos o que está bom para plantar agora.",
      ],
    },
    groups: [],
  },
  {
    slug: "fitofarmacos",
    name: "Produtos fitofarmacêuticos",
    description: "Proteção das culturas, com alternativas biológicas.",
    intro: {
      title: "Proteção segura e responsável",
      photo: "fitofarmacosLoja",
      text: "Vendemos apenas produtos fitofarmacêuticos homologados, para agricultores profissionais e particulares. Ajudamos a escolher o produto certo para cada cultura e explicamos como aplicá-lo corretamente.",
    },
    tiles: [
      { icon: "herbicidas", name: "Herbicidas", text: "Controlo de infestantes" },
      { icon: "fungicidas", name: "Fungicidas", text: "Prevenção de doenças" },
      { icon: "inseticidas", name: "Inseticidas", text: "Combate a pragas" },
      { icon: "acaricidas", name: "Acaricidas", text: "Controlo de ácaros" },
      { icon: "moluscicidas", name: "Moluscicidas", text: "Lesmas e caracóis" },
      { icon: "rebento", name: "Bioestimulantes", text: "Crescimento e vigor" },
    ],
    highlights: [
      { icon: "homologado", text: "Produtos homologados" },
      { icon: "conselho", text: "Aconselhamento técnico" },
      { icon: "loja", text: "Zona própria na loja" },
    ],
    groups: [],
  },
  {
    slug: "casa-e-bricolage",
    name: "Casa e bricolage",
    description: "Para os pequenos trabalhos do dia a dia.",
    lead: "Ferragens, tintas, produtos de limpeza e material de bricolage para reparações e melhorias em casa, sem ter de ir longe.",
    topics: [
      {
        icon: "chave",
        title: "Ferramentas",
        items: [
          "Ferramentas manuais",
          "Chaves e alicates",
          "Fitas métricas e níveis",
          "Escadas e escadotes",
        ],
      },
      {
        icon: "parafuso",
        title: "Ferragens",
        items: [
          "Parafusos e buchas",
          "Pregos e ferrolhos",
          "Dobradiças e fechaduras",
          "Correntes e cabos",
        ],
      },
      {
        icon: "rolo",
        title: "Tintas e acabamentos",
        items: [
          "Tintas e vernizes",
          "Pincéis e rolos",
          "Colas e silicones",
          "Fitas e lixas",
        ],
      },
      {
        icon: "vassoura",
        title: "Limpeza e doméstico",
        items: [
          "Detergentes e lixívias",
          "Vassouras e esfregonas",
          "Baldes e bacias",
          "Sacos do lixo",
          "Inseticidas domésticos",
        ],
      },
      {
        icon: "lampada",
        title: "Elétrico e canalização",
        items: [
          "Lâmpadas e extensões",
          "Fichas e interruptores",
          "Tubos e torneiras",
          "Vedantes e juntas",
          "Pilhas",
        ],
      },
    ],
    note: {
      icon: "casa",
      lines: [
        "Falta-lhe alguma coisa para acabar o trabalho?",
        "Passe pela loja, é bem provável que tenhamos.",
      ],
    },
    groups: [],
  },
  {
    slug: "apicultura",
    name: "Apicultura",
    description: "Tudo o que precisa para cuidar das suas colmeias.",
    lead: "Seja apicultor profissional ou esteja a começar, temos o material e os produtos para o trabalho no apiário, da colmeia à extração do mel.",
    topics: [
      {
        icon: "colmeia",
        title: "Colmeias",
        items: [
          "Colmeias e núcleos",
          "Quadros e alças",
          "Cera laminada",
          "Tampas e fundos",
        ],
      },
      {
        icon: "protecao",
        title: "Proteção e ferramentas",
        items: [
          "Fatos e máscaras",
          "Luvas",
          "Fumigadores",
          "Levantadores de quadros",
        ],
      },
      {
        icon: "mel",
        title: "Alimentação e cuidados",
        items: [
          "Alimentação para abelhas",
          "Pastas e xaropes",
          "Tratamentos contra a varroa",
          "Material de extração do mel",
        ],
      },
    ],
    cta: {
      text: "Está a começar na apicultura? Venha falar connosco, ajudamos a montar o seu primeiro apiário.",
      label: "Fale connosco",
    },
    groups: [],
  },
];

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
