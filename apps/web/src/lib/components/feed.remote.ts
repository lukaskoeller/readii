import { prerender } from '$app/server';
import { FEED_URL } from '$lib/constants';
import { getFeedData } from '@readii/parser';

export const getFeed = prerender(async () => {
	const URL = FEED_URL;
	const feed = await getFeedData(URL, { source: 'social' });

	return feed.mediaItems;
});
