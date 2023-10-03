import type { University } from '$lib/types/university.js';

export async function load({ url }) {
	const searchQuery = url.searchParams.get('search') || '';

	if (!searchQuery) {
		return {
			streamed: {
				universities: []
			}
		};
	}

	async function getUniversities() {
		try {
			const res = await fetch(`https://sapient-api.kupyn.dev/search?q=${searchQuery}`);
			const universities: University[] = await res.json();

			return universities;
		} catch (error) {
			console.error(error);
		}
	}
	return {
		streamed: {
			universities: getUniversities()
		}
	};
}
