import type { University } from '$lib/types/university.js';

export async function load({ url }) {
	const searchQuery = url.searchParams.get('search') || '';

	if (!searchQuery) {
		return {
			fetchState: 'idle' as const,
			universities: []
		};
	}
	return {
		fetchState: 'done' as const,
		universities: new Promise<University[]>(() =>
			fetch(`https://sapient-api.kupyn.dev/search?q="${encodeURI(searchQuery)}"`)
		)
	};
}
