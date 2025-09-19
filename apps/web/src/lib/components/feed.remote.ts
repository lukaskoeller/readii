import { prerender } from '$app/server';
import { getFeedData } from '@readii/parser';

export const getFeed = prerender(async () => {
	const URL = 'https://bsky.app/profile/did:plc:eclio37ymobqex2ncko63h4r/rss';
	const feed = await getFeedData(URL, { source: 'social' });

	return feed.mediaItems;
});
