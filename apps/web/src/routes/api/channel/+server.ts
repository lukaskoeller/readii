import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = (args) => {
	const params = args.params
	
	console.log(params);

	// error(400, 'min and max must be numbers, and min must be less than max');
	

	return new Response(JSON.stringify({
		body: params,
	}));
};