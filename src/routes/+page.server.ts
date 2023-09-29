export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const description = formData.get('description');
		console.log(description);
		return {
			props: {
				title: 'Page'
			}
		};
	}
};
