import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getEntries } from '../lib/content';
import { sections } from '../lib/sections';
import { SITE_DESCRIPTION, SITE_TITLE } from '../lib/site';

export async function GET(context: APIContext) {
  // Feeds are for readers, so drafts stay out even in dev.
  const entries = await getEntries((entry) => !entry.data.draft);
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: `/${entry.data.section}/${entry.id}/`,
      categories: [sections[entry.data.section].label],
    })),
    customData: '<language>zh-CN</language>',
  });
}
