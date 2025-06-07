/** @type {import('@astrojs/starlight/types').StarlightUserConfig} */
const sidebar = [
	{
		label: '⬅️ Retour à l’accueil',
		translations: {
			en: '⬅️ Back to home page',
		},
		slug: '::back',
	},
	{
		label: 'Fluff Event 2025',
		link: '#',
	},
	{
		label: 'Participants',
		slug: 'fluff-event-2025/streamers',
	},
	{
		label: 'FAQ',
		slug: 'fluff-event-2025/faq',
	},
]

export default sidebar
