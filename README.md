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

## 发布

提交并推送到 GitHub 的 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。
