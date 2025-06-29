import { defineConfig, envField } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Fluff Event Help',
			description: 'Help and documentation for Fluff Event',
			editLink: {
				baseUrl: 'https://github.com/FluffEvent/fluffevent-help/edit/main/app/app/',
			},
			// Sidebar is overridden in this project
			// Set config to empty here to avoid useless computation
			sidebar: [],
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
			social: [
				{ icon: 'twitter', label: 'Twitter', href: 'https://twitter.com/FluffEvent' },
				{ icon: 'telegram', label: 'Telegram', href: 'https://t.me/FluffEventNews' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.com/invite/rAesnJHuPe' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/FluffEvent/fluffevent-help' },
			],
			customCss: [
				'./src/styles/global.css',
			],
			lastUpdated: true,
			pagination: false,
			components: {
				Sidebar: '~/components/overrides/Sidebar.astro',
			},
			credits: false,
		}),
	],
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
	env: {
		schema: {
			GITHUB_REPOSITORY_URL: envField.string({ context: 'client', access: 'public', optional: true }),
			GITHUB_SHA: envField.string({ context: 'client', access: 'public', optional: true }),
		},
		validateSecrets: true,
	},
})
