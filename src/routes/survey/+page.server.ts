import { uuid } from '$lib/helpers/uuid.js';

export async function load({ fetch }) {
	// const data = await fetch('https://sapient-api.kupyn.dev/search');
	// const questions = (await data.json()) as string[];
	// console.log(questions);
	return {
		id: 'root',
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
								result: ['Electrical Engineering', 'Mechanical Engineering'],
								images: [
									'https://img.freepik.com/free-photo/man-electrical-technician-working-switchboard-with-fuses-uses-tablet_169016-25055.jpg?w=2000&t=st=1696132902~exp=1696133502~hmac=851ea0e32725a2218f3a7389393d6d1c3df18f3db2ea6ae677bc9facc19d50f8',
									'https://img.freepik.com/free-photo/male-worker-factory_1303-14306.jpg?w=2000&t=st=1696132917~exp=1696133517~hmac=f484d04a158e0fd16ee61862a30a22873ecf2ef2b506f4004cc76f031e4e2ef5'
								]
							},
							left: {
								result: ['Applied Mathematics', 'Statistics'],
								images: [
									'https://img.freepik.com/free-photo/close-up-still-life-hard-exams_23-2149314045.jpg?w=2000&t=st=1696132961~exp=1696133561~hmac=3b8d84d506b8f0bf6dc25f1f96df4c77cf611cf7e17f4d7ec5e04647f6821125',
									'https://img.freepik.com/free-photo/businesswoman-using-tablet-analysis-graph-company-finance-strategy-statistics-success-concept-planning-future-office-room_74952-1410.jpg?w=2000&t=st=1696132973~exp=1696133573~hmac=acce9990db470e8d8fdca69c4a88ec39ae8629852b93191fb5c6c44f9f733993'
								]
							}
						}
					},
					left: {
						id: 'noMathInterest',
						question: 'Are you interested in biology?',
						options: {
							right: {
								result: ['Molecular Biology', 'Biotechnology'],
								images: [
									'https://img.freepik.com/free-photo/dna-representation-collage_23-2150239209.jpg?w=1800&t=st=1696133574~exp=1696134174~hmac=959db42fa191d0e4aad5a7c7478be31ccde6501bb3609632038b94cc38d8fabe',
									'https://img.freepik.com/free-photo/virolog-coducting-experiment-course-coronavirus-pandemic-with-micropipette-chemist-modern-laboratory-doing-research-using-dispenser-during-global-epidemic-with-covid-19_482257-5737.jpg?w=2000&t=st=1696133021~exp=1696133621~hmac=0847bfe0d5162608e95931bbdd31e96c27d445d2d72352c4d73e223d52ba8de0'
								]
							},
							left: {
								result: ['Physics', 'Chemistry'],
								images: [
									'https://img.freepik.com/free-photo/examining-molecular-model_1098-19572.jpg?w=2000&t=st=1696133102~exp=1696133702~hmac=162dd7335e1deed3cbbf6352791c2f9c2c2a7717505d829b2fb4cbb9b1c9a728',
									'https://img.freepik.com/free-photo/close-up-researcher-holding-glassware_23-2148794430.jpg?w=2000&t=st=1696133120~exp=1696133720~hmac=8f1cadcd1fb55709a6176cc8bf03b0a13764a39421b28c2426a0891370de914d'
								]
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
								result: ['Fine Arts', 'Graphic Design'],
								images: [
									'https://img.freepik.com/darmowe-zdjecie/widok-z-gory-atrakcyjnych-rak-kobiety-rysujacych-niesamowity-obraz-na-plotnie-w-nowoczesnym-przytulnym-warsztacie-artystycznym_574295-563.jpg?w=2000&t=st=1696133745~exp=1696134345~hmac=7158ec8b87267f62dc9340eeb56cdf7a4cba48af5f03dc56265d3a1886a13369',
									'https://img.freepik.com/darmowe-zdjecie/logo-be-creative-inspiration-design-concept_53876-132620.jpg?w=1800&t=st=1696133766~exp=1696134366~hmac=52668914ccfc7d458aa30343f101997a9a3604cfd16026ebc032c52e52c3853e'
								]
							},
							left: {
								result: ['Art History', 'Photography'],
								images: [
									'https://img.freepik.com/free-photo/friends-going-shopping-antique-store_23-2149525707.jpg?w=2000&t=st=1696133167~exp=1696133767~hmac=3b8f148f6de9d500be5d57d1e8893d41b35214cd76157dea5448311370e13574',
									'https://img.freepik.com/free-photo/young-female-product-photographer-studio_23-2148970228.jpg?w=2000&t=st=1696133198~exp=1696133798~hmac=acb9b7fc1a98516e0e8d1c516936ff5fe2e219973990b0f4933234f5ccdbd99e'
								]
							}
						}
					},
					left: {
						id: 'noArtInterest',
						question: 'Are you considering medical-related majors?',
						options: {
							right: {
								result: ['Medicine, Biology'],
								images: [
									'https://img.freepik.com/free-photo/medical-banner-with-doctor-wearing-goggles_23-2149611193.jpg?size=626&ext=jpg'
								]
							},
							left: {
								result: ['Geography'],
								images: [
									'https://img.freepik.com/free-photo/focus-girl-studying-globe-earth-home_329181-2491.jpg?t=st=1696147813~exp=1696148413~hmac=f939ecec715a4f3960ae6df18261f7be1819281bbf86b0c9827f43f0cca5217f'
								]
							}
						}
					}
				}
			}
		}
	};
}
