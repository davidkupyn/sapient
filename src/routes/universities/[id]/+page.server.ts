export async function load({ params }) {
	const data = await fetch(`https://sapient-api.kupyn.dev/search?q="${params.id}"`);
	console.log(data);

	return {
		data: await data.json()
	};
}
