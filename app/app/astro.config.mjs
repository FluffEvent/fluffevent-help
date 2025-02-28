import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Fluff Event Help',
			description: 'Help and documentation for Fluff Event',
			editLink: {
				baseUrl: 'https://github.com/FluffEvent/help-website/edit/main/app/app/',
			},
			// sidebar: [
			// 	{
			// 		label: 'Home',
			// 		link: '/',
			// 	},
			// ],
			locales: {
				root: {
					label: 'Français',
					lang: 'fr',
				},
				en: {
					label: 'English',
					lang: 'en',
				},
			},
			social: {
				github: 'https://github.com/FluffEvent/help-website',
			},
			customCss: [
				'./src/styles/global.css',
			],
			lastUpdated: true,
			pagination: false,
			// components: {
			// 	SiteTitle: '~/components/overrides/SiteTitle.astro',
			// 	SocialIcons: '~/components/overrides/SocialIcons.astro',
			// 	Sidebar: '~/components/overrides/Sidebar.astro',
			// 	Banner: '~/components/overrides/Banner.astro',
			// 	Footer: '~/components/overrides/Footer.astro',
			// },
		}),
	],
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
})
