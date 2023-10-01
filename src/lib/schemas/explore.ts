import { z } from 'zod';

export const exploreSchema = (defaultDescription = '') =>
	z.object({
		description: z
			.string({
				required_error: 'Please enter a description.'
			})
			.min(8, 'The description should be at least 8 characters long.')
			.max(300, 'The description should be at most 1000 characters long.')
			.default(defaultDescription)
	});
