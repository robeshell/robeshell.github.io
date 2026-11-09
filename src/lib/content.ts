import { getCollection, type CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'entries'>;
export type Topic = CollectionEntry<'topics'>;

/**
 * Drafts never ship in a production build. Locally they can be previewed from their topic page
 * or by URL, but the homepage feed and section lists always leave them out.
 */
export const showDrafts = import.meta.env.DEV;

const byDateDesc = (a: Entry, b: Entry) => b.data.date.valueOf() - a.data.date.valueOf();
const byDateAsc = (a: Entry, b: Entry) => a.data.date.valueOf() - b.data.date.valueOf();

export async function getEntries(filter?: (entry: Entry) => boolean) {
  const entries = await getCollection('entries', (entry) => (showDrafts || !entry.data.draft) && (filter?.(entry) ?? true));
  return entries.sort(byDateDesc);
}

export async function getTopics() {
  const topics = await getCollection('topics');
  return topics.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, 'zh-CN'));
}

export const topicStatus = {
  learning: '学习中',
  paused: '暂停中',
  done: '已完成',
} as const;

export interface TopicChapter {
  key: string;
  title: string;
  summary?: string;
  number: number;
  entries: Entry[];
}

export interface TopicView {
  topic: Topic;
  chapters: TopicChapter[];
  /** Entries in the topic whose chapter is missing or not in the outline. */
  loose: Entry[];
  /** Every entry in reading order: outline order, then date. */
  sequence: Entry[];
  progress: { written: number; total: number };
  updated?: Date;
}

export function buildTopicView(topic: Topic, allEntries: Entry[]): TopicView {
  const own = allEntries.filter((entry) => entry.data.topic?.id === topic.id).sort(byDateAsc);
  const keys = new Set(topic.data.outline.map((item) => item.key));

  const chapters = topic.data.outline.map((item, index) => ({
    ...item,
    number: index + 1,
    entries: own.filter((entry) => entry.data.chapter === item.key),
  }));
  const loose = own.filter((entry) => !entry.data.chapter || !keys.has(entry.data.chapter));
  for (const entry of loose) {
    if (entry.data.chapter) {
      console.warn(`[topics] ${entry.id}: chapter "${entry.data.chapter}" is not in the outline of "${topic.id}".`);
    }
  }

  const sequence = [...chapters.flatMap((chapter) => chapter.entries), ...loose];
  return {
    topic,
    chapters,
    loose,
    sequence,
    progress: { written: chapters.filter((chapter) => chapter.entries.length > 0).length, total: chapters.length },
    updated: own.length ? new Date(Math.max(...own.map((entry) => entry.data.date.valueOf()))) : undefined,
  };
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
