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
			if (!this.tableExists) {
				await client.exec(SQL_CREATE_TABLES);
				this.tableExists = true;
			}
		} catch (error) {
			throw new Error('Failed to create publishers table', { cause: error });
		}

		return client;
	}

	async createFeed(articles: Omit<TArticle[], 'id'>, publisher: TPublisher) {
		const client = await this.getClient();
		try {
			const checkResult = await client.query<TPublisher>(
				'SELECT id FROM publishers WHERE rss_url = $1',
				[publisher.rssUrl]
			);
			const publisherExists = Boolean(checkResult.rows[0]);
			if (publisherExists) {
				throw new Error(
					`Publisher "${publisher.name}" with the RSS URL "${publisher.rssUrl}" already exists`
				);
			}

			const result = await client.query<Pick<TPublisher, 'id'>>(
				`
                INSERT INTO publishers (url, rss_url, name, icon_url)
                VALUES ($1, $2, $3, $4)
				RETURNING id;

            `,
				[publisher.url, publisher.rssUrl, publisher.name, publisher.iconUrl ?? null]
			);

			const publisherId = result.rows[0].id;

			await Promise.allSettled(
				articles.map((article) => {
					return client.query(
						`
					INSERT INTO articles (title, content, url, author, published_at, publisher_id)
					VALUES ($1, $2, $3, $4, $5, $6)
					ON CONFLICT (url) DO NOTHING;
				`,
						[
							article.title,
							article.content,
							article.url,
							article.author,
							article.publishedAt,
							publisherId
						]
					);
				})
			);
		} catch (error) {
			throw new Error(`Failed to create new feed for "${publisher.name}"`, { cause: error });
		}
	}
}
