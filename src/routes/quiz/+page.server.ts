export async function load({ fetch }) {
	// const data = await fetch('https://sapient-api.kupyn.dev/questions');
	// const questions = (await data.json()) as string[];

	return {
		questions: [
			{
				id: 1,
				question: 'What is your favorite color?'
			},
			{
				id: 2,
				question: 'What is your favorite color? again.'
			},
			{
				id: 3,
				question: 'What is your favorite color?'
			},
			{
				id: 4,
				question: 'What is your favorite color? again.'
			},
			{
				id: 5,
				question: 'What is your favorite color?'
			},
			{
				id: 6,
				question: 'What is your favorite color? again.'
			},
			{
				id: 7,
				question: 'What is your favorite color?'
			},
			{
				id: 8,
				question: 'What is your favorite color? again.'
			}
		]
	};
}
