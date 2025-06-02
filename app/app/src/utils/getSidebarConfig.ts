import fs from 'node:fs'
import path from 'node:path'

import { getCollection, getEntry } from 'astro:content'
import { getRelativeLocaleUrl } from 'astro:i18n'
import type { SidebarEntry } from '@astrojs/starlight/utils/routing/types'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import type { DataEntryMap } from 'astro:content'

const ROOT = path.resolve('./src/content/docs')

async function loadConfig(filePath: string): Promise<NonNullable<StarlightUserConfig['sidebar']> | null>
{
	if (fs.existsSync(filePath))
	{
		const config = await import(filePath)
		return config.default
	}

	return null
}

type SidebarConfigItem = NonNullable<StarlightUserConfig['sidebar']>[number]
type SidebarConfigItemBadge = Extract<SidebarConfigItem, { badge?: unknown }>['badge']

type SidebarEntryBadge = SidebarEntry['badge']

function formatBadge(badge: SidebarConfigItemBadge): SidebarEntryBadge
{
	if (badge === undefined)
	{
		return undefined
	}

	if (typeof badge === 'string')
	{
		return {
			variant: 'default',
			text: badge,
			class: undefined,
		}
	}

	return {
		variant: badge.variant ?? 'default',
		text: badge.text as string, // FIXME
		class: badge.class,
	}
}

async function formatCollectionEntry(
	item: Extract<SidebarConfigItem, string | { slug?: unknown }> | null,
	collectionEntry: DataEntryMap['docs'][string],
	userUrl: URL,
	userLocale: string
): Promise<SidebarEntry>
{
	const label = collectionEntry.data.title
	const href = getRelativeLocaleUrl(userLocale, collectionEntry.id)

	const normalizePath = (p: string) => p === '/' ? '/' : p.replace(/\/+$/, '')
	const isCurrent = normalizePath(userUrl.pathname) === normalizePath(href)

	// TODO: Handle `translations` property
	return item && typeof item !== 'string'
		? {
			type: 'link',
			label: label || item.label || collectionEntry.id,
			href: href,
			isCurrent: isCurrent,
			badge: formatBadge(item.badge),
			attrs: item.attrs ?? {},
		}
		: {
			type: 'link',
			label: label || collectionEntry.id,
			href: href,
			isCurrent: isCurrent,
			badge: undefined,
			attrs: {},
		}
}

async function formatSidebarItem(item: SidebarConfigItem, userUrl: URL, userLocale: string): Promise<SidebarEntry>
{
	if (typeof item === 'string' || 'slug' in item)
	{
		// String item: <SidebarLinkItemSchema>
		// or Internal link item: <InternalSidebarLinkItemSchema>

		// Load collection entry by slug
		const slug = typeof item === 'string' ? item : item.slug
		const collectionEntry = await getEntry('docs', slug)

		if (collectionEntry)
		{
			return formatCollectionEntry(item, collectionEntry, userUrl, userLocale)
		}

		throw new Error(`Collection entry not found for slug: ${slug}`)
	}

	if ('link' in item)
	{
		// External link item
		// <SidebarLinkItemSchema>
		// TODO: Handle `translations` property
		return {
			type: 'link',
			label: item.label,
			href: item.link,
			isCurrent: false,
			badge: formatBadge(item.badge),
			attrs: item.attrs ?? {},
		}
	}

	if ('autogenerate' in item)
	{
		// Autogenerating group item
		// <AutoSidebarGroupSchema>

		// List collection entries in the directory
		const collectionEntries = await getCollection(
			'docs',
			entry =>
			{
				// Filter entries by directory
				return entry.id.startsWith(item.autogenerate.directory) // FIXME: maybe use && !entry.data.sidebar?.hidden
			},
		)

		return {
			type: 'group',
			label: item.label,
			collapsed: item.autogenerate.collapsed ?? false,
			badge: formatBadge(item.badge),
			entries: await Promise.all(collectionEntries.map(entry => formatCollectionEntry(null, entry, userUrl, userLocale))), // Recursively format entries
		}
	}

	if ('items' in item)
	{
		// Manual group item
		// <ManualSidebarGroupSchema>
		return {
			type: 'group',
			label: item.label,
			collapsed: item.collapsed ?? false,
			badge: formatBadge(item.badge),
			entries: await Promise.all(item.items.map(item => formatSidebarItem(item, userUrl, userLocale))), // Recursively format items
		}
	}

	throw new Error(`Unsupported sidebar config item: ${JSON.stringify(item)}`)
}

export async function getSidebarConfig(slugPath: string, userUrl: URL, userLocale: string): Promise<SidebarEntry[]>
{
	const segments = slugPath.split('/').filter(Boolean)

	let sidebarConfig = undefined
	for (let i = segments.length; i >= 0; i--)
	{
		const file = path.join(ROOT, ...segments.slice(0, i), 'sidebar.config.ts')
		console.log(`Loading sidebar config from: ${slugPath} ${file}`)
		const config = await loadConfig(file)
		if (config)
		{
			sidebarConfig = config
			break
		}
	}

	if (!sidebarConfig)
	{
		throw new Error(`Sidebar config not found for path: ${slugPath}`)
	}

	return Promise.all(sidebarConfig.map(item => formatSidebarItem(item, userUrl, userLocale)))
}
