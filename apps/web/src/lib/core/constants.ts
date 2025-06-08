export const SQL_CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS publishers (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    name TEXT NOT NULL,
    rss_url TEXT NOT NULL UNIQUE,
    icon_url TEXT
);

CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    url TEXT NOT NULL UNIQUE,
    author TEXT,
    published_at TIMESTAMP,
    publisher_id INT,
    FOREIGN KEY (publisher_id) REFERENCES publishers(id)
);
`;