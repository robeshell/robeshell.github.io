# 个人网站

一个使用 Astro 和 Markdown 构建的极简静态个人网站。

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址。

## 新增内容

在 `src/content/entries/` 新建一个 Markdown 文件：

```md
---
title: 文章标题
description: 一句话摘要
date: 2026-08-26
section: writing
---

从这里开始写正文。
```

`section` 可填写：

- `writing`：文章
- `notes`：笔记
- `journeys`：游记
- `photos`：照片
- `music`：音乐

草稿可以在头部增加 `draft: true`，构建时不会发布。

图片放在 `public/images/`，在 Markdown 中使用 `![说明](/images/文件名.jpg)`。

## 主题

网站提供留白、编辑部、终端、夜之城、岛屿、旷野和预告信七种主题。主题只改变视觉，不影响内容。

公共基础和组件样式位于 `src/styles/global.css`，每个主题的颜色、字体和版式规则分别位于 `src/styles/themes/` 下的同名文件，切换控件位于 `src/components/ThemePicker.astro`。新增主题时，在 `ThemePicker.astro`、`BaseLayout.astro` 和 `src/styles/themes/` 中增加同名选项与规则即可。

### Aether 开源边界

主题系统的源文件已同步到独立的 Aether 包中（本地目录：`../aether-themes`）。个人站保留一份可独立构建的 CSS 快照，避免在 Aether 正式发布前让 GitHub Pages 依赖本地路径。Aether 更新后，在两个目录并列的情况下运行：

```bash
npm run sync:aether
```

主题包只负责基础层和视觉规则；文章、路由、图片和站点文案仍由 W.Site 维护。站点自己的背景图通过 `src/styles/site-assets.css` 注入，不会进入 Aether 包。

Aether 正式发布后，再把站点切换到版本化包依赖；在此之前不要把 `file:../aether-themes` 写进站点依赖，否则 GitHub Pages 在单仓库检出时无法安装。

### 只启用需要的主题

在根目录的 `aether.config.mjs` 中维护 `themes` 数组。主题选择器和样式导入都会使用这份配置：

```js
export default {
  themes: ['minimal', 'persona'],
  defaultTheme: 'minimal',
  themeMeta: {
    minimal: { label: '留白', description: '极简与秩序' },
    persona: { label: '预告信', description: '红黑与斜切' },
  },
};
```

修改后运行 `npm run generate:aether`，就只会打包并加载选中的主题。`defaultTheme` 必须属于 `themes`。

## 发布

提交并推送到 GitHub 的 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。
