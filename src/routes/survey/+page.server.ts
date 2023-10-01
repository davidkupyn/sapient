import { uuid } from '$lib/helpers/uuid.js';

export async function load({ fetch }) {
	// const data = await fetch('https://sapient-api.kupyn.dev/search');
	// const questions = (await data.json()) as string[];
	// console.log(questions);
	return {
		firstQuestion: {
			id: 'root',
			question: 'Are you ready to choose your educational path?',
			options: {
				right: {
					id: 'fromRoot',
					question: 'Are you interested in science?',
					options: {
						right: {
							id: 'scienceInterest',
							question: 'Do you like mathematics?',
							options: {
								right: {
									id: 'mathInterest',
									question: 'Would you like to work as an engineer?',
									options: {
										right: {
											result: ['Electrical Engineering', 'Mechanical Engineering']
										},
										left: {
											result: ['Applied Mathematics', 'Statistics']
										}
									}
								},
								left: {
									id: 'noMathInterest',
									question: 'Are you interested in biology?',
									options: {
										right: {
											result: ['Molecular Biology', 'Biotechnology']
										},
										left: {
											result: ['Physics', 'Chemistry']
										}
									}
								}
							}
						},
						left: {
							id: 'noScienceInterest',
							question: 'Do you like art?',
							options: {
								right: {
									id: 'artInterest',
									question: 'Would you like to work as an artist?',
									options: {
										right: {
											result: ['Fine Arts', 'Graphic Design']
										},
										left: {
											result: ['Art History', 'Photography']
										}
									}
								},
								left: {
									id: 'noArtInterest',
									question: 'Would you like to work with people?',
									options: {
										right: {
											result: ['Psychology', 'Sociology']
										},
										left: {
											result: ['Computer Science', 'Management']
										}
									}
								}
							}
						}
					}
				}
			}
		}
	};
}
