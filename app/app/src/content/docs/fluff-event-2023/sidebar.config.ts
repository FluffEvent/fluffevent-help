import type { StarlightUserConfig } from '@astrojs/starlight/types'

const sidebar: NonNullable<StarlightUserConfig['sidebar']> = [
	{
		label: '⬅️ Back to home page',
		slug: '::back',
	},
	{
		label: 'Fluff Event 2023',
		link: '#',
	},
	{
		label: 'FAQ',
		slug: 'fluff-event-2023/faq',
	},
]

export default sidebar
