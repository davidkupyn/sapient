import { exploreSchema } from '$lib/schemas';
import type { University } from '$lib/types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ url }) {
	const searchQuery = url.searchParams.get('search');
	const form = await superValidate(exploreSchema(searchQuery ?? ''));

	return { form, universities: [{ name: 'Techni Schools' }, { name: 'Vizja' }] as University[] };
}

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, exploreSchema());

		if (!form.valid) {
			return fail(400, { form });
		}

		const { description } = form.data;
		console.log(description);
		return {
			form
		};
	}
};
