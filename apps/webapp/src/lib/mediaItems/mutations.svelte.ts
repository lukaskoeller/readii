import { SQL_CREATE_TABLES } from '$lib/core/constants';
import { db } from '../db/index.svelte';
import type { TMediaItemPayload } from './schema';

export class MediaItemMutation {
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

	async create(mediaItem: TMediaItemPayload) {
		const client = await this.getClient();
		try {
			await client.exec(`
				INSERT INTO media_items (title, content, creator)
				VALUES ('${mediaItem.title}', '${mediaItem.content}', '${mediaItem.creator}');
			`);
		} catch (error) {
			throw new Error(`Failed to create new article "${mediaItem.title}"`, { cause: error });
		}
	}

	// SELECT * FROM articles WHERE id = ($1);
}
