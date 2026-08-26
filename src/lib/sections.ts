export const sections = {
  writing: { label: '文章', description: '一些相对完整的想法。' },
  notes: { label: '笔记', description: '仍在生长和修订的记录。' },
  journeys: { label: '游记', description: '去过的地方，以及途中发生的事。' },
  photos: { label: '照片', description: '偶尔停下来看见的东西。' },
  music: { label: '音乐', description: '最近听见并想要记住的声音。' },
} as const;

export type SectionKey = keyof typeof sections;
