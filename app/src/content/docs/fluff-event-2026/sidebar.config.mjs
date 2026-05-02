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
		label: 'Fluff Event 2026',
		slug: 'fluff-event-2026',
	},
	{
		label: 'Association soutenue',
		translations: {
			en: 'Supported charity',
		},
		slug: 'fluff-event-2026/charity',
	},
	{
		label: 'Sélection de l’association',
		translations: {
			en: 'Charity selection',
		},
		items: [
			{
				label: 'Processus de sélection',
				translations: {
					en: 'Selection process',
				},
				slug: 'fluff-event-2026/charity/selection',
			},
			{
				label: 'Modalités de vote des communautés',
				translations: {
					en: 'Communities voting process',
				},
				slug: 'fluff-event-2026/charity/voting',
			},
		],
	}
]

export default sidebar
