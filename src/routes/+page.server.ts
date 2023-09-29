import { exploreSchema } from '$lib/schemas/explore.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export async function load() {
	const form = await superValidate(exploreSchema);

	return { form };
}

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, exploreSchema);

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
