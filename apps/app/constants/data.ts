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
      imgUrl: "https://www.nytimes.com/vi-assets/static-assets/apple-touch-icon-dark-f74e69bf6dae735169854a4126cebf8c.png",
    },
    {
      title: "The Guardian",
      url: "https://www.theguardian.com/europe/rss",
      description:
        "Latest news, sport, business, comment, analysis and reviews from the Guardian, the world's leading liberal voice",
      imgUrl:
        "https://assets.guim.co.uk/static/frontend/icons/homescreen/apple-touch-icon-120.png",
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
    {
      title:
        "DIE ZEIT | Nachrichten, News, Hintergründe und Debatten",
      url: "https://newsfeed.zeit.de/index",
      description:
        "Aktuelle Nachrichten, Kommentare, Analysen und Hintergrundberichte aus Politik, Wirtschaft, Gesellschaft, Wissen, Kultur und Sport lesen Sie bei der ZEIT.",
      imgUrl:
        "https://static.zeit.de/p/zeit.web/icons/rss-feed-icon-96x96.png",
    },
    {
      title:
        "Süddeutsche Zeitung",
      url: "https://rss.sueddeutsche.de/rss/Alles",
      description:
        "Alle Meldungen von SZ.de",
      imgUrl:
        "https://www.sueddeutsche.de/assets/img/favicon.ico",
    },
    {
      title:
        "FAZ - Frankfurter Allgemeine Zeitung",
      url: "https://www.faz.net/rss/aktuell",
      description:
        "News, Nachrichten und aktuelle Meldungen aus allen Ressorts. Politik, Wirtschaft, Sport, Feuilleton und Finanzen im Überblick.",
      imgUrl:
        "https://www.faz.net/favicon.png",
    },
  ],
  entertainment: [
    {
      title: "/Film",
      url: "https://www.slashfilm.com/feed/",
      description:
        "The latest movie and television news, reviews, film trailers, exclusive interviews, and opinions - since 2005.",
      imgUrl: "https://www.slashfilm.com/img/slashfilm-favicon.png",
    },
    {
      title: "Ain't It Cool News CoolNews",
      url: "https://www.aintitcool.com/node/feed/coolnews/",
      description:
        "The best in movie, TV, DVD and comic book news.",
      imgUrl: "https://media.aintitcool.com/static/social/defaultsquarelogo.png",
    },
    {
      title: "ScreenCrush",
      url: "https://screencrush.com/feed/",
      description:
        "Read movie reviews, TV recaps and celebrity news, plus watch the latest movie trailers.",
      imgUrl: "https://townsquare.media/wp-content/uploads/2019/05/screencrush.png?w=72&h=72",
    },
    {
      title: "Deutschlandfunk Kultur - Film & Serie",
      url: "https://www.deutschlandfunkkultur.de/film-serie-100.rss",
      description: "Neuigkeiten, Hintergründe und Berichte zu Filmen und Serien.",
      imgUrl: "https://bilder.deutschlandfunk.de/db/bf/da/fa/dbbfdafa-35e3-426b-8170-f7a0bff13ac4/film-108-768x768.jpg",
    }
  ],
  sports: [
    {
      title: "kicker News",
      url: "https://www.espn.com/espn/rss/news",
      description: "Topaktuelle News bei kicker",
      imgUrl:
        "https://static.kicker.de/content/b2ea4d70/img/favicon/appicon48x48.png",
    },
    {
      title: "Sportschau",
      url: "https://www.sportschau.de/index~rss2.xml",
      description: "Die aktuellen Beiträge der Seite https://www.sportschau.de/",
      imgUrl: "https://www.sportschau.de/resources/assets/image/favicon/favicon.svg",
    },
    {
      title: "Formel1.de News",
      url: "https://www.formel1.de/rss/news/feed.xml",
      description: "Verpasse keine Formel-1-News mehr mit dem F1-Feed von Formel1.de.",
      imgUrl: "https://www.formel1.de/public/img/formel1.png",
    },
    {
      title: "Sportschau Formel 1",
      url: "https://www.sportschau.de/motorsport/formel1/index~rss2.xml",
      description: "Die aktuellen Beiträge der Seite https://www.sportschau.de/motorsport/formel1",
      imgUrl: "https://www.sportschau.de/resources/assets/image/favicon/favicon.svg",
    },
    {
      title: "ESPN Top News",
      url: "https://www.espn.com/espn/rss/news",
      description: "Latest TOP news from www.espn.com",
      imgUrl: "https://a.espncdn.com/i/espn/teamlogos/lrg/trans/espn_dotcom_black.gif",
    }
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
    {
      title: "Lea Verou’s blog",
      url: "https://lea.verou.me/feed.xml",
      description: "Web standards, Software Engineering, Product, Usability, and more",
      imgUrl: "https://lea.verou.me/mark.svg",
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
