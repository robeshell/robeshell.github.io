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

## 专题

专题是独立于栏目的一层，适合"咖啡豆""威士忌"这类需要系统学习的学问。每个专题是 `src/content/topics/` 下的一个 Markdown 文件，头部写标题、简介、状态和学习大纲，正文是专题简介：

```md
---
title: 咖啡豆
description: 一句话简介
status: learning        # learning 学习中 / paused 暂停中 / done 已完成
outline:
  - key: processing     # 章节标识，文章用它归档
    title: 处理法
    summary: 这一章打算写什么
---
```

文章仍然放在 `src/content/entries/`，头部多写两行就会归到专题和章节下，专题主页会自动更新进度，文章页会出现专题标记和专题内的上一篇、下一篇：

```md
topic: coffee
chapter: processing
```

草稿（`draft: true`）不会出现在首页和栏目列表里，构建上线时也不会发布。本地 `npm run dev` 时可以从专题页或直接访问链接预览，页面上带"草稿"标记。

## 主题

网站提供留白、编辑部、终端、夜之城、岛屿、旷野和预告信七种主题。主题只改变视觉，不影响内容。

公共基础和组件样式位于 `src/styles/global.css`，每个主题的颜色、字体和版式规则分别位于 `src/styles/themes/` 下的同名文件，切换控件位于 `src/components/ThemePicker.astro`。新增主题时，在 `ThemePicker.astro`、`BaseLayout.astro` 和 `src/styles/themes/` 中增加同名选项与规则即可。

### Aether 开源边界

主题系统的源文件已同步到独立的 Aether 包中（本地目录：`../aether-themes`）。个人站保留一份可独立构建的 CSS 与运行时脚本快照，避免在 Aether 正式发布前让 GitHub Pages 依赖本地路径。Aether 更新后，在两个目录并列的情况下运行：

```bash
npm run sync:aether
```

主题包负责 CSS，以及预告信拆字、分割线和列表箭头的框架无关脚本；文章、路由、图片、站点文案和主题切换器仍由 W.Site 维护。站点自己的背景图通过 `src/styles/site-assets.css` 注入，不会进入 Aether 包。

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

## 字体

所有字体都随站点自托管，不依赖外部字体服务，许可证均为 SIL OFL 1.1：

- 中文黑体：Noto Sans SC（`@fontsource-variable/noto-sans-sc`）
- 中文宋体：Noto Serif SC（`@fontsource-variable/noto-serif-sc`）
- 中文圆体：猫啃网糖圆体（`@chinese-fonts/mkwtyt`），汉字部分源自 Apache-2.0 的小杉圆体
- 西文：JetBrains Mono、Nunito、Cinzel、Rajdhani（Fontsource）

字体栈统一定义在 `src/styles/global.css` 顶部的 `--ff-*` 变量里，各主题文件末尾只引用这些变量。

西文字体体积很小，直接打包进全站样式。三套中文字体各有约 30 KB 的切片声明，所以按主题异步加载：`src/layouts/BaseLayout.astro` 中的 `themeCjkFonts` 记录每个主题用到哪几套中文字体，页面只加载当前主题需要的那几份，切换主题时再补加载。新增主题或修改主题的 `--ff-*` 引用时，记得同步更新这份映射。

## 发布

提交并推送到 GitHub 的 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。
