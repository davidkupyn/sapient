export async function load() {
	const data = await fetch('https://sapient-api.kupyn.dev/questions');
	const questions = (await data.json()) as string[];

	return {
		questions
	};
}
