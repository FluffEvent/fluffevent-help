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
		}),
	],
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
})
