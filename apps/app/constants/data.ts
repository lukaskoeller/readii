export const CATEGORIES = [
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "news-politics" },
    },
    key: "news-politics",
    label: "News & Politics",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "entertainment" },
    },
    key: "entertainment",
    label: "Entertainment",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "sports" },
    },
    key: "sports",
    label: "Sports",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "money-business" },
    },
    key: "money-business",
    label: "Money & Business",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "style-beauty" },
    },
    key: "style-beauty",
    label: "Style & Beauty",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "food" },
    },
    key: "food",
    label: "Food",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "travel-regional" },
    },
    key: "travel-regional",
    label: "Travel & Regional",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "health" },
    },
    key: "health",
    label: "Health",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "home-garden" },
    },
    key: "home-garden",
    label: "Home & Garden",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "science-tech" },
    },
    key: "science-tech",
    label: "Science & Tech",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "cars" },
    },
    key: "cars",
    label: "Cars",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "hobbies" },
    },
    key: "hobbies",
    label: "Hobbies",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "outdoors" },
    },
    key: "outdoors",
    label: "Outdoors",
  },
  {
    href: {
      pathname: "/home/add/[category]",
      params: { category: "kids-parenting" },
    },
    key: "kids-parenting",
    label: "Kids & Parenting",
  },
] as const;

export const FEEDS_BY_CATEGORY = {
  "news-politics": [
    {
      title: "New York Times: Top Stories",
      url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
      description: "Follow top stories from The New York Times.",
      imgUrl: "https://static01.nyt.com/images/misc/NYT_logo_rss_250x40.png",
    },
    {
      title: "The Guardian",
      url: "https://www.theguardian.com/europe/rss",
      description:
        "Latest news, sport, business, comment, analysis and reviews from the Guardian, the world's leading liberal voice",
      imgUrl:
        "https://assets.guim.co.uk/images/guardian-logo-rss.c45beb1bafa34b347ac333af2e6fe23f.png",
    },
    {
      title:
        "tagesschau.de - die erste Adresse für Nachrichten und Information",
      url: "https://www.tagesschau.de/index~rss2.xml",
      description:
        "Die aktuellen Beiträge der Seite https://www.tagesschau.de/",
      imgUrl:
        "https://www.tagesschau.de/resources/assets/image/favicon/favicon.svg",
    },
  ],
  entertainment: [],
  sports: [
    {
      title: "kicker News",
      url: "https://www.espn.com/espn/rss/news",
      description: "Topaktuelle News bei kicker",
      imgUrl:
        "https://static.kicker.de/content/b2ea4d70/img/favicon/appicon48x48.png",
    },
  ],
  "money-business": [],
  "style-beauty": [],
  food: [],
  "travel-regional": [],
  health: [],
  "home-garden": [],
  "science-tech": [],
  cars: [],
  hobbies: [],
  outdoors: [],
  "kids-parenting": [],
} as const;
