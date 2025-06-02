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
				{ icon: 'telegram', label: 'Telegram', href: 'https://t.me/FluffEvent' },
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
			credits: true,
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
