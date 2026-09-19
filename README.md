# tzamora-blog

A personal blog built with Next.js and Markdown files.

## Local development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Writing a post

Add a `.md` file to `content/posts/` with `title`, `date`, `description`, and optional `tags` frontmatter. Push it to Git and Railway will deploy it.

## Railway

Deploy this repository as one Railway service. Railpack detects Next.js automatically.

- Build command: `npm run build`
- Start command: `npm run start`
- The Next.js server uses Railway's `PORT` automatically.
- No database, volume, or environment variables are needed for the initial Git-backed blog.

Do not commit `.env` files. If configuration is added later, set it in Railway Dashboard Variables.
