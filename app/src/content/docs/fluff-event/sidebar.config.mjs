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
		label: 'Liens utiles',
		translations: {
			en: 'Useful links',
		},
		slug: 'fluff-event/links',
	},
	{
		label: 'Ressources officielles',
		translations: {
			en: 'Official resources',
		},
		collapsed: false,
		items: [
			{
				label: 'Documents officiels',
				slug: 'fluff-event/official/documents',
			},
			{
				label: 'Mentions légales',
				slug: 'fluff-event/official/legal-notice',
			},
			// {
			// 	label: 'CGV',
			// 	slug: 'fluff-event/official/cgv',
			// },
		],
	},
]

export default sidebar
