# 0xC0000005 Hugo Blog

A complete Hugo site with a reusable theme, sample posts, Markdown demonstrations, and GitHub Pages deployment via GitHub Actions. The blog title and creator are both **0xC0000005**.

## Requirements

- Hugo 0.146 or later
- Git

## Preview locally

```sh
hugo server
```

## Add a post

Create a Markdown file under `content/articles/`. Copy the front matter from an existing post and edit `title`, `date`, `description`, `categories`, and `image`. Write the body in Markdown.

## Customize

- Site title, author, and description: `hugo.toml`
- Home page and carousel: `themes/gilded-page/layouts/home.html`
- Header and footer: `themes/gilded-page/layouts/_partials/`
- About page: `content/about/index.md`
- Theme styles and scripts: `themes/gilded-page/static/`

The slogan is configured as `params.slogan` in `hugo.toml`. Current value: “Beyond the obvious.”

## Deploy

The workflow in `.github/workflows/hugo-pages.yml` builds the site and deploys it to GitHub Pages. Set the repository's Pages source to **GitHub Actions**.
