import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (args) => {
	const { searchParams } = args.url;
	const feedUrl = searchParams.get('url');
	if (!feedUrl) {
		error(400, 'Missing "url" query parameter');
	}
	const response = await fetch(feedUrl);
	const feedText = await response.text();

	return new Response(feedText);
};