import { uuid } from '$lib/helpers/uuid.js';

export async function load({ fetch }) {
	// const data = await fetch('https://sapient-api.kupyn.dev/search');
	// const questions = (await data.json()) as string[];
	// console.log(questions);
	return {
		firstQuestion: {
			id: 'youReady',
			question: 'Are you ready to choose your educational path',
			options: {
				right: {
					id: 'root',
					question: 'Czy interesujesz się nauką?',
					options: {
						right: {
							id: 'scienceInterest',
							question: 'Czy lubisz matematykę?',
							options: {
								right: {
									id: 'mathInterest',
									question: 'Czy chciałbyś pracować jako inżynier?',
									options: {
										right: {
											result: [
												'Kierunek: Inżynieria Elektryczna',
												'Kierunek: Inżynieria Mechaniczna'
											]
										},
										left: {
											result: ['Kierunek: Matematyka Stosowana', 'Kierunek: Statystyka']
										}
									}
								},
								left: {
									id: 'noMathInterest',
									question: 'Czy interesujesz się biologią?',
									options: {
										right: {
											result: ['Kierunek: Biologia Molekularna', 'Kierunek: Biotechnologia']
										},
										left: {
											result: ['Kierunek: Fizyka', 'Kierunek: Chemia']
										}
									}
								}
							}
						},
						left: {
							id: 'noScienceInterest',
							question: 'Czy lubisz sztukę?',
							options: {
								right: {
									id: 'artInterest',
									question: 'Czy chciałbyś pracować jako artysta?',
									options: {
										right: {
											result: ['Kierunek: Sztuki Piękne', 'Kierunek: Grafika']
										},
										left: {
											result: ['Kierunek: Historia Sztuki', 'Kierunek: Fotografia']
										}
									}
								},
								left: {
									id: 'noArtInterest',
									question: 'Czy chciałbyś pracować z ludźmi?',
									options: {
										right: {
											result: ['Kierunek: Psychologia', 'Kierunek: Socjologia']
										},
										left: {
											result: ['Kierunek: Informatyka', 'Kierunek: Zarządzanie']
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
