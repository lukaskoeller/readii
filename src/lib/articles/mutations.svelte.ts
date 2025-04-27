import { SQL_CREATE_TABLES } from '$lib/core/constants';
import { db } from '../db/index.svelte';

export type TArticle = {
	id: number;
	title: string;
	content: string;
	url: string;
	author: string;
	publishedAt: string;
};

export class ArticlesMutation {
	constructor() {
		this.getClient();
	}

	private tableExists = $state(false);

	private async getClient() {
		const client = await db.promise;
		try {
			console.time('CREATE TABLE IF');
			if (!this.tableExists) {
				await client.exec(SQL_CREATE_TABLES);
				this.tableExists = true;
			}
			console.timeEnd('CREATE TABLE IF');
		} catch (error) {
			throw new Error('Failed to create articles table', { cause: error });
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
