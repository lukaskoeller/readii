import { SQL_CREATE_TABLES } from '$lib/core/constants';
import type { TQueryArgs } from '$lib/core/types';
import { db } from '../db/index.svelte';

export type TPublisher = {
	id: number;
	name: string;
	url: string;
	rssUrl: string;
	iconUrl?: string;
};

export class PublishersMutation {
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

	async create(publisher: TQueryArgs<TPublisher>) {
		const client = await this.getClient();
		try {
			await client.exec(`
                INSERT INTO publishers (url, rss_url, name, icon_url)
                VALUES ('${publisher.url}', '${publisher.rssUrl}', '${publisher.name}', ${publisher.iconUrl ? `'${publisher.iconUrl}'` : 'NULL'});
            `);
		} catch (error) {
			throw new Error(`Failed to create new publisher "${publisher.name}"`, { cause: error });
		}
	}
}
