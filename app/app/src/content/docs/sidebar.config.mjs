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
		label: 'Fluff Event 2023',
		slug: 'fluff-event-2023',
	},
	{
		label: 'Fluff Event 2024',
		slug: 'fluff-event-2024',
	},
	{
		label: 'Fluff Event 2025',
		// FIXME: Add an index page for this section
		slug: 'fluff-event-2025/faq',
	},
]

export default sidebar
