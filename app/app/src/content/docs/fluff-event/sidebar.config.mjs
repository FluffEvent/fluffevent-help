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
		label: 'Fluff Event',
		slug: 'fluff-event',
	},
	{
		label: 'Documents officiels',
		slug: 'fluff-event/documents',
	},
	// {
	// 	label: 'Mentions légales',
	// 	slug: 'fluff-event/legal-notice',
	// },
	// {
	// 	label: 'CGV',
	// 	slug: 'fluff-event/cgv',
	// },
]

export default sidebar
