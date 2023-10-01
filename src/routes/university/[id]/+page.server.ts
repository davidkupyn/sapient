export async function load({ params }) {
	const data = await fetch(`https://sapient-api.kupyn.dev/school/${params.id}`);

	try {
		return {
			data: await data.json()
		};
	} catch (error) {
		console.error(error);
		return {};
	}
}
