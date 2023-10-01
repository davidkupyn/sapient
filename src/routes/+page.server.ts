import type { University } from '$lib/types';

export async function load({ url }) {
	const searchQuery = url.searchParams.get('search');

	// const mode = url.searchParams.has('mode')
	// 	? JSON.parse(url.searchParams.get('mode') || '')
	// 	: undefined;
	// const city = url.searchParams.has('city')
	// 	? JSON.parse(url.searchParams.get('city') || '')
	// 	: undefined;
	// const type = url.searchParams.has('type')
	// 	? JSON.parse(url.searchParams.get('type') || '')
	// 	: undefined;
	// const degree = url.searchParams.has('degree')
	// 	? JSON.parse(url.searchParams.get('degree') || '')
	// 	: undefined;

	if (searchQuery) {
		try {
			const searchJSON = await fetch(`https://sapient-api.kupyn.dev/search?q="${searchQuery}"`);
			const universities = (await searchJSON.json()) as University[];
			console.log(universities);
			return { universities };
		} catch (error) {
			console.error(error);
		}
	}

	return { universities: [] as University[] };
}
