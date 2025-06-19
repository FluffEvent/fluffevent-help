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
		slug: 'fluff-event-2025',
	},
	{
		label: 'Cagnotte',
		translations: {
			en: 'Fundraising',
		},
		slug: 'fluff-event-2025/fundraising',
	},
	{
		label: 'Participants',
		slug: 'fluff-event-2025/streamers',
	},
	{
		label: 'Services',
		translations: {
			en: 'Services',
		},
		items: [
			{
				label: 'Dons directs',
				translations: {
					en: 'Direct Donations',
				},
				slug: 'fluff-event-2025/donations',
			},
			{
				label: 'FAQ Générale',
				translations: {
					en: 'General FAQ',
				},
				slug: 'fluff-event-2025/faq',
			},
		],
	},
]

export default sidebar
