/**
 * Site-owned Aether configuration.
 * Remove themes from this list when the site should ship a smaller visual bundle.
 */
export default {
  themes: ['minimal', 'magazine', 'terminal', 'cyber', 'island', 'wilds', 'persona'],
  defaultTheme: 'minimal',
  themeMeta: {
    minimal: { label: '留白', description: '极简与秩序' },
    magazine: { label: '编辑部', description: '纸张与版式' },
    terminal: { label: '终端', description: '黑屏与命令' },
    cyber: { label: '夜之城', description: '黄黑与霓虹' },
    island: { label: '岛屿', description: '晴空与草地' },
    wilds: { label: '旷野', description: '风沙与遗迹' },
    persona: { label: '预告信', description: '红黑与斜切' },
  },
};
