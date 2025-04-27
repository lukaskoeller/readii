import type { TArticle } from '$lib/articles/mutations.svelte';
import { db } from '$lib/db/index.svelte';
import type { TPublisher } from '$lib/publishers/mutations.svelte';
import { SQL_CREATE_TABLES } from './constants';

export class MixtureMutation {
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
			throw new Error('Failed to create publishers table', { cause: error });
		}

		return client;
	}

	async createFeed(articles: Omit<TArticle[], "id">, publisher: TPublisher) {
		const client = await this.getClient();
		try {
			const result = await client.query<Pick<TPublisher, 'id'>>(
				`
                INSERT INTO publishers (url, rss_url, name, icon_url)
                VALUES ($1, $2, $3, $4)
                RETURNING id;
            `,
				[publisher.url, publisher.rssUrl, publisher.name, publisher.iconUrl ?? null]
			);
            
            
			const publisherId = result.rows[0].id;
            console.log(publisher, publisherId);

			await Promise.all(
				articles.map((article) => {
					return client.exec(`
                    INSERT INTO articles (title, content, author, publisher_id)
                    VALUES ('${article.title}', '${article.content}', '${article.author}', '${article.publishedAt}', ${publisherId});
                `);
				})
			);
            console.log("created articles");
            
		} catch (error) {
			throw new Error(`Failed to create new feed for "${publisher.name}"`, { cause: error });
		}
	}
}
