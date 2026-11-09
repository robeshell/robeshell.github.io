import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const fileId = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '').split('/').pop() ?? entry;

const entries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/entries', generateId: fileId }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    section: z.enum(['writing', 'notes', 'journeys', 'photos', 'music']),
    draft: z.boolean().default(false),
    location: z.string().optional(),
    /** 所属专题（src/content/topics 下的文件名）。 */
    topic: reference('topics').optional(),
    /** 专题大纲里的章节 key。 */
    chapter: z.string().optional(),
  }),
});

const topics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/topics', generateId: fileId }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** 专题之间的排列顺序，小的在前。 */
    order: z.number().default(0),
    status: z.enum(['learning', 'paused', 'done']).default('learning'),
    started: z.coerce.date().optional(),
    outline: z.array(z.object({
      key: z.string(),
      title: z.string(),
      summary: z.string().optional(),
    })).min(1),
  }),
});

export const collections = { entries, topics };
