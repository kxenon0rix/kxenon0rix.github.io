# 林间 Hugo 主题

简洁的中文博客主题，含首页分页、标签归档、文章页、上一篇/下一篇、RSS 和关于页。首页用一小段原生 JavaScript 按视口高度和文章标题实际换行情况计算分页数量；关闭 JavaScript 时仍使用 Hugo 生成的普通分页。使用 Hugo 0.146.0 及以上版本的新模板目录结构，没有 Node 包或外部 Hugo 模块依赖。

## 使用

将 `themes/linjian` 复制到你的网站项目，并在 `hugo.toml` 中配置：

```toml
theme = "linjian"
languageCode = "zh-cn"
title = "林间"

[pagination]
  pagerSize = 5

[taxonomies]
  tag = "tags"

[params]
  description = "写给日常的几句话。"
  author = "林间"
```

文章放进 `content/posts/`，使用 `title`、`date` 和 `tags` 前置参数。归档页和关于页可直接复制示例站点的 `content/archive.md` 与 `content/about.md`。

```sh
hugo server
hugo --minify
```

在仓库根目录运行以上命令可预览和构建内附的示例站点。无 JavaScript 时首页每页默认 5 篇，数量由 Hugo 配置中的 `pagerSize` 控制；启用 JavaScript 时根据当前屏幕能容纳的条目数自适应。短页面会使用视口高度布局；超出屏幕的文章正文保持自然滚动，避免压缩字号。CSS 可在 `static/style.css` 覆盖。
