export async function load({ params }) {
	async function getUniversityById(id: string) {
		try {
			const res = await fetch(`https://sapient-api.kupyn.dev/school/${id}`);
			const university = await res.json();

			return university as string[];
		} catch (error) {
			console.error(error);
		}
		return [];
	}
	return {
		streamed: {
			data: getUniversityById(params.id)
		}
	};
}
