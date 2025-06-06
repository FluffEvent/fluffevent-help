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
		label: 'Fluff Event 2023',
		link: '#',
	},
	{
		label: 'Participants',
		slug: 'fluff-event-2023/streamers',
	},
	{
		label: 'FAQ',
		slug: 'fluff-event-2023/faq',
	},
]

export default sidebar
