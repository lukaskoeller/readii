import { db } from './db/index.svelte';

export type TArticle = {
	id: number;
	title: string;
	content: string;
	author: string;
}

export class ArticlesMutation {
	constructor() {
		this.getClient();
	}

	private tableExists = $state(false);

	private async getClient() {
		const client = await db.promise;
		try {
			console.log(this.tableExists);
			
			console.time("CREATE TABLE IF");
			if (!this.tableExists) {
				await client.exec(`
					CREATE TABLE IF NOT EXISTS articles (
						id SERIAL PRIMARY KEY,
						title TEXT NOT NULL,
						content TEXT NOT NULL,
						author TEXT
					);
				`);
				this.tableExists = true;
				// publisher_id INT,
				// FOREIGN KEY (publisher_id) REFERENCES publishers(id)
			}
			console.timeEnd("CREATE TABLE IF");
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

	// SELECT * FROM articles WHERE id = ($1);
}
