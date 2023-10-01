import { uuid } from '$lib/helpers/uuid.js';

export async function load({ fetch }) {
	// const data = await fetch('https://sapient-api.kupyn.dev/search');
	// const questions = (await data.json()) as string[];
	// console.log(questions);
	return {
		firstQuestion: {
			id: 'root',
			question: 'Wybierz swoją ścieżkę edukacji',
			options: {
				right: {
					id: 'r1',
					question: 'Czy interesujesz się naukami ścisłymi?',
					options: {
						right: {
							id: 'r1r1',
							question: 'Czy lubisz matematykę?',
							options: {
								right: {
									id: 'r1r1r1',
									question: 'Czy chciałbyś pracować w analizie danych?',
									options: {
										right: {
											id: 'r1r1r1r1',
											question: 'Czy interesujesz się big data?',
											options: {
												right: {
													id: 'r1r1r1r1r1',
													question: 'Czy chciałbyś być analitykiem danych?',
													options: {
														right: {
															result: [
																'Kierunek: Analiza Danych Biznesowych',
																'Kierunek: Analiza Danych Naukowych',
																'Kierunek: Analiza Danych Medycznych'
															]
														},
														left: {
															result: [
																'Kierunek: Analiza Danych Społecznych',
																'Kierunek: Analiza Danych Finansowych',
																'Kierunek: Analiza Danych Ekonomicznych'
															]
														}
													}
												},
												left: {
													id: 'r1r1r1r1r2',
													question: 'Czy interesujesz się machine learningiem?',
													options: {
														right: {
															result: [
																'Kierunek: Machine Learning w Biznesie',
																'Kierunek: Machine Learning w Nauce',
																'Kierunek: Machine Learning w Medycynie'
															]
														},
														left: {
															result: [
																'Kierunek: Machine Learning w Ekonomii',
																'Kierunek: Machine Learning w Społeczeństwie',
																'Kierunek: Machine Learning w Finansach'
															]
														}
													}
												}
											}
										},
										left: {
											id: 'r1r1r1r2',
											question: 'Czy interesujesz się sztuczną inteligencją?',
											options: {
												right: {
													id: 'r1r1r1r2r1',
													question: 'Czy chciałbyś być inżynierem AI?',
													options: {
														right: {
															result: [
																'Kierunek: Inżynieria Sztucznej Inteligencji',
																'Kierunek: Inżynieria Systemów AI',
																'Kierunek: Inżynieria Sieci Neuronowych'
															]
														},
														left: {
															result: [
																'Kierunek: Algorytmy Sztucznej Inteligencji',
																'Kierunek: Algorytmy Genetyczne',
																'Kierunek: Algorytmy Sieci Neuronowych'
															]
														}
													}
												},
												left: {
													id: 'r1r1r1r2r2',
													question: 'Czy chciałbyś projektować systemy AI?',
													options: {
														right: {
															result: [
																'Kierunek: Projektowanie Systemów Sztucznej Inteligencji',
																'Kierunek: Projektowanie Systemów Wspomagania Decyzji',
																'Kierunek: Projektowanie Systemów Analizy Tekstu'
															]
														},
														left: {
															result: [
																'Kierunek: Wdrażanie Sztucznej Inteligencji',
																'Kierunek: Wdrażanie Systemów Analizy Tekstu',
																'Kierunek: Wdrażanie Systemów Analizy Obrazu'
															]
														}
													}
												}
											}
										}
									}
								},
								left: {
									id: 'r1r1r2',
									question: 'Czy interesuje cię informatyka?',
									options: {
										right: {
											id: 'r1r1r2r1',
											question: 'Czy chciałbyś być programistą?',
											options: {
												right: {
													result: [
														'Kierunek: Programowanie Aplikacji',
														'Kierunek: Programowanie Gier',
														'Kierunek: Programowanie Aplikacji Mobilnych'
													]
												},
												left: {
													result: [
														'Kierunek: Programowanie Systemów',
														'Kierunek: Programowanie Systemów Webowych',
														'Kierunek: Programowanie Systemów Rozproszonych'
													]
												}
											}
										},
										left: {
											id: 'r1r1r2r2',
											question: 'Czy chciałbyś zajmować się sieciami komputerowymi?',
											options: {
												right: {
													result: [
														'Kierunek: Administracja Sieciami',
														'Kierunek: Administracja Sieciami Komputerowymi',
														'Kierunek: Administracja Sieciami Teleinformatycznymi'
													]
												},
												left: {
													result: [
														'Kierunek: Cyberbezpieczeństwo',
														'Kierunek: Cyberbezpieczeństwo Systemów Bankowych',
														'Kierunek: Cyberbezpieczeństwo Systemów Medycznych'
													]
												}
											}
										}
									}
								}
							}
						},
						left: {
							id: 'r1r2',
							question: 'Czy interesujesz się fizyką?',
							options: {
								right: {
									id: 'r1r2r1',
									question: 'Czy chciałbyś być inżynierem lotnictwa?',
									options: {
										right: {
											result: [
												'Kierunek: Inżynieria Lotnicza',
												'Kierunek: Inżynieria Lotnicza Komunikacyjna',
												'Kierunek: Inżynieria Lotnicza Informatyczna'
											]
										},
										left: {
											result: [
												'Kierunek: Inżynieria Mechaniczna',
												'Kierunek: Inżynieria Mechaniczna Energii',
												'Kierunek: Inżynieria Mechaniczna Konstrukcji'
											]
										}
									}
								},
								left: {
									id: 'r1r2r2',
									question: 'Czy chciałbyś badać struktury mikroskopowe?',
									options: {
										right: {
											result: [
												'Kierunek: Fizyka Medyczna',
												'Kierunek: Fizyka Medyczna Obrazowania',
												'Kierunek: Fizyka Medyczna Terapii'
											]
										},
										left: {
											result: [
												'Kierunek: Fizyka Ciała Stałego',
												'Kierunek: Fizyka Ciała Stałego Nanostruktur',
												'Kierunek: Fizyka Ciała Stałego Materiałów Specjalnych'
											]
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
