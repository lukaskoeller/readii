import type { PageLoad } from './$types';

export const load: PageLoad = ({ route }) => {
	return {
        route,
    }
};