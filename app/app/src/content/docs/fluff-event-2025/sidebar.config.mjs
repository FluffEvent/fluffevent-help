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
		label: 'FAQ',
		translations: {
			en: 'FAQ',
		},
		items: [
			{
				label: 'FAQ Dons',
				translations: {
					en: 'Donations FAQ',
				},
				slug: 'fluff-event-2025/faq/donations',
			},
			{
				label: 'FAQ Boutique',
				translations: {
					en: 'Shop FAQ',
				},
				slug: 'fluff-event-2025/faq/shop',
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
