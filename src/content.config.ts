import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entries = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/entries',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').split('/').pop() ?? entry,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    section: z.enum(['writing', 'notes', 'journeys', 'photos', 'music']),
    draft: z.boolean().default(false),
    location: z.string().optional(),
  }),
});

export const collections = { entries };
