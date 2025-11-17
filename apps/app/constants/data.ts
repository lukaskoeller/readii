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
    },
    {
      title: "TechCrunch",
      url: "https://techcrunch.com/feed/",
      description: "Startup and Technology News",
      imgUrl: "https://techcrunch.com/wp-content/uploads/2015/02/cropped-cropped-favicon-gradient.png?w=32",
    },
    {
      title: "deutsche-startups.de",
      url: "https://www.deutsche-startups.de/feed/",
      description: "Startups - Venture Capital - Jobs",
      imgUrl: "https://www.deutsche-startups.de/app/themes/ds2013/apple-touch-icon.png",
    },
    {
      title: "EU-Startups",
      url: "https://feeds.feedburner.com/eu-startups",
      description: "Spotlight on European startups",
      imgUrl: "https://www.eu-startups.com/wp-content/themes/Newspaperimages/favicon.ico",
    },
    {
      title: "Startups - GeekWire",
      url: "https://www.geekwire.com/startups/feed/",
      description: "Breaking News in Technology & Business",
      imgUrl: "https://www.geekwire.com/wp-content/themes/geekwire/dist/images/geekwire-logo-rss.png",
    },
    {
      title: "Crunchbase News",
      url: "https://news.crunchbase.com/feed/",
      description: "Data-driven reporting on private markets, startups, founders, and investors",
      imgUrl: "https://news.crunchbase.com/wp-content/uploads/cb_news_favicon-150x150.png",
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
    {
      title: "Developer Way",
      url: "https://www.developerway.com/rss.xml",
      description: "Improve your technical skills with in-depth explanations, practical advices and useful tips and tricks. Techstack: React, Typescript, node, monorepos, yarn, webpack, etc.",
      imgUrl: "https://www.developerway.com/assets/favicon.png",
    },
    {
      title: "Miriam Eric Suzanne",
      url: "https://www.miriamsuzanne.com/feed.xml",
      description: "Art, writing, and code from Miriam Suzanne",
      imgUrl: "https://www.miriamsuzanne.com/images/headshots/eLIPAqMo4S-144.jpeg",
    },
    {
      title: "Loren Stewart",
      url: "https://www.lorenstew.art/rss.xml",
      description: "A blog exploring web development and AI",
      imgUrl: "https://www.lorenstew.art/favicon-32x32.png",
    },
  ],
  "style-beauty": [
    {
      title: "Refinery29",
      url: "https://www.refinery29.com/rss.xml",
      description: "Fashion news, shopping, beauty news and how-tos",
      imgUrl: "https://www.refinery29.com/assets/08c2e62e7d1f514259af92204bc9c284.ico",
    },
    {
      title: "Honestly WTF",
      url: "https://feeds.feedburner.com/honestlywtf",
      description: "Lifestyle blog featuring curated content on fashion, art, travel, interior design, and DIY, founded by Erica Chan Coffman.",
      imgUrl: "https://honestlywtf.com/wp-content/uploads/2018/04/favicon512_480-45x45.png",
    },
    {
      title: "College Fashion",
      url: "https://www.collegefashion.net/feed/",
      description: "Fashion and beauty blog written by college students for college students",
      imgUrl: "https://www.collegefashion.net/wp-content/uploads/2022/03/fav.png",
    },
    {
      title: "Extra Petite",
      url: "https://www.extrapetite.com/feed",
      description: "Fashion, style tips, and outfit ideas; Based in Boston",
      imgUrl: "https://www.extrapetite.com/wp-content/uploads/2023/04/favicon.png",
    },
    {
      title: "Teen Vogue",
      url: "https://www.teenvogue.com/feed/rss",
      description: "The latest from www.teenvogue.com",
      imgUrl: "https://www.teenvogue.com/verso/static/teenvogue-us/assets/favicon.ico",
    },
    {
      title: "Atlantic-Pacific",
      url: "https://www.the-atlantic-pacific.com/feed/",
      description: "A fashion and personal style site by Blair Eadie",
      imgUrl: "https://www.the-atlantic-pacific.com/wp-content/uploads/2016/11/ms-icon-310x310-100x100.png",
    },
    {
      title: "Who What Wear",
      url: "https://www.whowhatwear.com/feeds.xml",
      description: "DAll the latest content from the Who What Wear tea",
      imgUrl: "https://cdn.mos.cms.futurecdn.net/flexiimages/qzgqdurjen1667467717.png",
    },
    {
      title: "Stylescrapbook",
      url: "https://stylescrapbook.com/feed/",
      description: "Fashion blog by Andy Torres",
      imgUrl: "https://i0.wp.com/static.stylescrapbook.com/uploads/2020/10/12140935/cropped-favicon-1.jpg",
    },
    {
      title: "Nancy Marie Mangano Style",
      url: "https://nancymariemangano.com/feed/",
      description: "Beauty, fashion, style and so much more!",
      imgUrl: "https://nancymariemangano.com/wp-content/uploads/2016/05/nan-cover1-150x150.jpeg",
    },
    {
      title: "Southern Curls & Pearls",
      url: "https://www.southerncurlsandpearls.com/feed/",
      description: "Fashion, Travel, Beauty & Lifestyle by Caitlin Covington",
      imgUrl: "https://www.southerncurlsandpearls.com/wp-content/uploads/2018/09/cropped-favicon-@512-updated-32x32.jpg",
    },
    {
      title: "The Cereal Aisle by Leandra Medine Cohen",
      url: "https://leandramcohen.substack.com/feed",
      description: "A newsletter about how to get dressed (mostly).",
      imgUrl: "https://substackcdn.com/image/fetch/$s_!B7T7!,w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F02c735bf-a37e-40ce-a019-05fbb0c2882d_852x852.png",
    },
    {
      title: "Un-Fancy",
      url: "https://www.un-fancy.com/feed/",
      description: "a minimalist fashion blog & capsule wardrobe guide",
      imgUrl: "https://www.un-fancy.com/wp-content/themes/unfancy/images/favicon.ico",
    },
    {
      title: "The Allison Bornstein Newsletter",
      url: "https://allisonbornstein.substack.com/feed",
      description: "A monthly deep dive into all things personal style. Rediscover the joy of getting dressed with fashion stylist and “closet therapist” Allison Bornstein.",
      imgUrl: "https://substackcdn.com/image/fetch/$s_!8tcu!,w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbb6c925a-5c94-4455-9609-193f7ec18e27_501x501.png"
    },
    {
      title: "Carrie’s Substack",
      url: "https://carinanicklas.substack.com/feed",
      description: "I'm a former tailor, currently working as a creative consultant & content creator. Sharing everything that's on my mind, galleries, interiors, wishlists & looks that I wear on repeat. I have a thing for vintage treasures.",
      imgUrl: "https://substackcdn.com/image/fetch/$s_!AXt4!,w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F31621c8e-b52e-445e-a21d-e51d7201eb36_1280x1280.png",
    },
    {
      title: "Erin Walsh on The Art of Intentional Dressing",
      url: "https://erinwalshstyle.substack.com/feed",
      description: "Let’s get intentional about what we wear. Using fashion as our most powerful tool for self improvement and manifestation. Uplevel your life by changing your relationship to what you wear and why.",
      imgUrl: "https://substackcdn.com/image/fetch/$s_!BWE0!,w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0aefd37b-0397-46d9-9b06-a9d2b84646e4_1280x1280.png",
    }
  ],
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
