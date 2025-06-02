import fs from 'node:fs'
import path from 'node:path'

import { getCollection, getEntry } from 'astro:content'
import { getRelativeLocaleUrl } from 'astro:i18n'
import type { SidebarEntry } from '@astrojs/starlight/utils/routing/types'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import type { DataEntryMap } from 'astro:content'

const ROOT = path.resolve('./src/content/docs')

type Context = {
	sidebarConfigSlug: string,
	slugPath: string,
	userUrl: URL,
	userLocale: string
}

async function loadConfig(filePath: string): Promise<NonNullable<StarlightUserConfig['sidebar']> | null>
{
	if (fs.existsSync(filePath))
	{
		const config = await import(/* @vite-ignore */ filePath)
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
	context: Context
): Promise<SidebarEntry>
{
	const slug = collectionEntry.id.replace(/^\/?index$/, '')
	const label = collectionEntry.data.title || slug
	const href = getRelativeLocaleUrl(context.userLocale, slug)

	const normalizePath = (p: string) => p === '/' ? '/' : p.replace(/\/+$/, '')
	const isCurrent = normalizePath(context.userUrl.pathname) === normalizePath(href)

	// TODO: Handle `translations` property
	return item && typeof item !== 'string'
		? {
			type: 'link',
			label: item.translations?.[context.userLocale] || item.label || label,
			href: href,
			isCurrent: isCurrent,
			badge: formatBadge(item.badge),
			attrs: item.attrs ?? {},
		}
		: {
			type: 'link',
			label: label,
			href: href,
			isCurrent: isCurrent,
			badge: undefined,
			attrs: {},
		}
}

async function formatSidebarItem(item: SidebarConfigItem, context: Context): Promise<SidebarEntry>
{
	if (typeof item === 'string' || 'slug' in item)
	{
		// String item: <SidebarLinkItemSchema>
		// or Internal link item: <InternalSidebarLinkItemSchema>

		let slug = typeof item === 'string' ? item : item.slug
		let collectionEntry: DataEntryMap['docs'][string] | undefined = undefined

		if (slug !== '::back')
		{
			// Load collection entry by slug
			collectionEntry = await getEntry('docs', slug)
		}
		else
		{
			slug = context.sidebarConfigSlug
			while (!collectionEntry && slug !== 'index')
			{
				// Remove trailing slug segment
				// If slug is empty, fallback to 'index' for home page
				slug = slug.replace(/\/?[^/]+$/, '') || 'index'

				// Try to load the collection entry for this slug
				collectionEntry = await getEntry('docs', slug)
			}
		}


		if (collectionEntry)
		{
			return formatCollectionEntry(item, collectionEntry, context)
		}

		throw new Error(`Collection entry not found for slug '${slug}'`)
	}

	if ('link' in item)
	{
		// External link item
		// <SidebarLinkItemSchema>
		// TODO: Handle `translations` property
		return {
			type: 'link',
			label: item.translations?.[context.userLocale] || item.label,
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
			label: item.translations?.[context.userLocale] || item.label,
			collapsed: item.autogenerate.collapsed ?? false,
			badge: formatBadge(item.badge),
			entries: await Promise.all(collectionEntries.map(entry => formatCollectionEntry(null, entry, context))), // Recursively format entries
		}
	}

	if ('items' in item)
	{
		// Manual group item
		// <ManualSidebarGroupSchema>
		return {
			type: 'group',
			label: item.translations?.[context.userLocale] || item.label,
			collapsed: item.collapsed ?? false,
			badge: formatBadge(item.badge),
			entries: await Promise.all(item.items.map(item => formatSidebarItem(item, context))), // Recursively format items
		}
	}

	throw new Error(`Unsupported sidebar config item: ${JSON.stringify(item)}`)
}

export async function getSidebarConfig(
	slugPath: string,
	userUrl: URL,
	userLocale: string,
): Promise<SidebarEntry[]>
{
	// Remove leading language prefix if present
	if (userLocale && slugPath.startsWith(`${userLocale}/`))
	{
		slugPath = slugPath.slice(userLocale.length + 1)
	}

	// slugPath may be empty for the root path (home page)
	const segments = slugPath.split('/').filter(Boolean)

	let sidebarConfig = undefined
	let sidebarConfigSlug = undefined
	for (let i = segments.length; i >= 0; i--)
	{
		const slugSegment = segments.slice(0, i).join('/')
		const file = path.join(ROOT, slugSegment, 'sidebar.config.ts')
		const config = await loadConfig(file)
		if (config)
		{
			sidebarConfig = config
			sidebarConfigSlug = slugSegment
			break
		}
	}

	if (!sidebarConfig)
	{
		throw new Error(`Sidebar config not found for path: ${slugPath}`)
	}

	return Promise.all(
		sidebarConfig.map(
			item => formatSidebarItem(
				item,
				{
					sidebarConfigSlug: sidebarConfigSlug!,
					slugPath,
					userUrl,
					userLocale
				}
			)
		)
	)
}
