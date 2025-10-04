export const CATEGORIES = [
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "news-politics" },
    },
    key: "news-politics",
    label: "News & Politics",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "entertainment" },
    },
    key: "entertainment",
    label: "Entertainment",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "sports" },
    },
    key: "sports",
    label: "Sports",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "startups-innovation" },
    },
    key: "startups-innovation",
    label: "Startups & Innovation",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "money-business" },
    },
    key: "money-business",
    label: "Money & Business",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "software-development" },
    },
    key: "software-development",
    label: "Software Development",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "style-beauty" },
    },
    key: "style-beauty",
    label: "Style & Beauty",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "food" },
    },
    key: "food",
    label: "Food",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "travel-regional" },
    },
    key: "travel-regional",
    label: "Travel & Regional",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "health" },
    },
    key: "health",
    label: "Health",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "home-garden" },
    },
    key: "home-garden",
    label: "Home & Garden",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "science-tech" },
    },
    key: "science-tech",
    label: "Science & Tech",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "cars" },
    },
    key: "cars",
    label: "Cars",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "hobbies" },
    },
    key: "hobbies",
    label: "Hobbies",
  },
  {
    href: {
      pathname: "/add/[category]",
      params: { category: "outdoors" },
    },
    key: "outdoors",
    label: "Outdoors",
  },
  {
    href: {
      pathname: "/add/[category]",
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
  "startups-innovation": [
    {
      title: "Gründerszene",
      url: "https://www.businessinsider.de/gruenderszene/feed/",
      description: "Aktuelle Wirtschafts-News von Business Insider aus Deutschland.",
      imgUrl: "https://www.businessinsider.de/wp-content/themes/business-insider/public/favicons/apple-touch-icon-gs.png",
    },
    {
      title: "Sovereign Tech Agency",
      url: "https://www.sovereign.tech/feed.rss",
      description: "The Sovereign Tech Agency is dedicated to protecting and strengthening the open source backbone of our digital future.",
      imgUrl: "https://www.sovereign.tech/static/images/favicons/favicon-32x32.png",
    }
  ],
  "money-business": [],
  "software-development": [
    {
      title: "Smashing Magazine",
      url: "https://www.smashingmagazine.com/feed/",
      description: "Recent content in Articles on Smashing Magazine — For Web Designers And Developers",
      imgUrl: "https://www.smashingmagazine.com/images/favicon/app-icon-512x512.png",
    },
    {
      title: "Adam Argyle",
      url: "https://nerdy.dev/rss.xml",
      description: "RSS Feed for Adam Argyle: Web design & development tips & tricks: CSS, JS, HTML, Design, & UX.",
      imgUrl: "https://nerdy.dev/rss-icon.png",
    },
    {
      title: "The Index by Piccalilli",
      url: "https://piccalil.li/the-index/feed.xml",
      description: "High quality, curated design, dev and tech links. Twice a week.",
      imgUrl: "https://piccalil.li/favicons/favicon-32x32.png",
    },
    {
      title: "CSS Weekly",
      url: "https://feedpress.me/cssweekly",
      description: "Weekly e-mail roundup of latest CSS articles, tutorials, tools and experiments",
      imgUrl: "https://css-weekly.com/favicon.svg",
    },
    {
      title: "overreacted — A blog by Dan Abramov",
      url: "https://overreacted.io/rss.xml",
      description: "A blog by Dan Abramov",
      imgUrl: "https://github.com/gaearon.png",
    },
    {
      title: "Ahmad Shadeed",
      url: "https://ishadeed.com/feed.xml",
      description: "Deep-dive CSS articles, modern CSS and visual CSS explanations.",
      imgUrl: "https://ishadeed.com/assets/favicon-32x32.png",
    },
    {
      title: "Josh Comeau's blog",
      url: "https://www.joshwcomeau.com/rss.xml",
      description: "Friendly tutorials for developers. Focus on React, CSS, animation, and careers.",
      imgUrl: "https://www.joshwcomeau.com/favicon.png",
    },
  ],
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
