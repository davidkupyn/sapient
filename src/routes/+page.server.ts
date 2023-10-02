import type { University } from '$lib/types/university.js';

export async function load({ url }) {
	const searchQuery = url.searchParams.get('search') || '';

	if (!searchQuery) {
		return {
			universities: []
		};
	}
	return {
		universities: new Promise<University[]>(() =>
			fetch(`https://sapient-api.kupyn.dev/search?q="${encodeURI(searchQuery)}"`)
		)
	};
}
