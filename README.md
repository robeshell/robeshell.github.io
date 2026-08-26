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

网站提供极简、杂志、编程、赛博朋克、岛屿生活和旷野冒险六种主题。主题只改变视觉，不影响内容。

主题颜色、字体和版式变量集中在 `src/styles/global.css`，切换控件位于 `src/components/ThemePicker.astro`。新增主题时，在这两个文件中增加同名选项和 `data-theme` 变量即可。

## 发布

提交并推送到 GitHub 的 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。
