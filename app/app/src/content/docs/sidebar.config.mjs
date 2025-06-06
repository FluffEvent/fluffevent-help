/** @type {import('@astrojs/starlight/types').StarlightUserConfig} */
const sidebar = [
	{
		label: '🐾 fluffevent.fr',
		link: 'https://fluffevent.fr',
		attrs: {
			target: '_blank',
		},
	},
	{
		label: 'Accueil',
		translations: {
			en: 'Home',
		},
		slug: 'index',
	},
	{
		label: 'L\'association',
		slug: 'fluff-event',
	},
	{
		label: 'Fluff Event 2023',
		slug: 'fluff-event-2023',
	},
	{
		label: 'Fluff Event 2024',
		slug: 'fluff-event-2024',
	},
	{
		label: 'Fluff Event 2025',
		slug: 'fluff-event-2025',
	},
]

export default sidebar
