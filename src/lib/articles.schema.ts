import { db } from './db/index.svelte';

export class Articles {
	constructor() {
		this.getClient();
	}

	async getClient() {
		console.log('Creating Articles table…');
		const client = await db.promise;
		try {
			await client.exec(`
				CREATE TABLE IF NOT EXISTS articles (
					id SERIAL PRIMARY KEY,
					title TEXT NOT NULL,
					content TEXT NOT NULL,
					author TEXT
				);
			`);
			// publisher_id INT,
			// FOREIGN KEY (publisher_id) REFERENCES publishers(id)
			console.log("Article table created, return client");
		} catch (error) {
			throw new Error("Failed to create articles table", { cause: error });
		}
		
		return client;
	}

	async create(article: { title: string; content: string; author: string }) {
		const client = await this.getClient();
		try {
			await client.exec(`
				INSERT INTO articles (title, content, author)
				VALUES ('${article.title}', '${article.content}', '${article.author}');
			`);
		} catch (error) {
			throw new Error(`Failed to create new article "${article.title}"`, { cause: error });
		}
	}

	async read(id?: number) {
		const client = await this.getClient();
		if (id) {
			return await client.query(`
                SELECT * FROM articles WHERE id = ${id};
            `);
		} else {
			return await client.query(`
                SELECT * FROM articles;
            `);
		}
	}
}
