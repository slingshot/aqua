# Aqua

Aqua is a super simple app for masking external services under a custom-branded domain, via full-page embeds and redirects.

Pages like Airtable forms/views, Typeforms, Craft/Notion docs, and anything else on the web that allows iframe embeds can be easily added and served on your custom domain.

The app implements Upstash Redis and the Next.js Edge Runtime in combination with SSG for lightning-fast performance.

## Getting started

To get started, set up your environment with the variables in [.env.template](.env.template), and deploy to any host that supports the Next.JS Edge Runtime.

Deploy with one-click on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fslingshot%2Faqua%2Ftree%2Fmain&env=REDIS_URL,REDIS_TOKEN,API_TOKEN&envDescription=Add%20your%20Upstash%20URL%20%26%20token%2C%20plus%20a%20long%20randomly-generated%20string%20to%20use%20as%20your%20API%20token.&envLink=https%3A%2F%2Fgithub.com%2Fslingshot%2Faqua)

For local development, just get started as you would with any other Next.js project:

```bash
bun install
bun dev
```

## Admin Panel

Aqua includes a built-in admin panel at `/admin` for managing your embeds. The admin panel allows you to:

- View all existing embeds in a table
- Create new embeds with a simple form
- Test embeds by opening them in a new tab

To access the admin panel, enter your `API_TOKEN` as the password.

## Customization

Aqua is built to be customized. There are only two steps:

1. Edit [`aqua.config.ts`](aqua.config.ts) to add your preferred names and a social media share card image
2. Use a [Favicon Generator](https://favicon-generator.org) and replace all of the images in [`public/logos`](public/logos) as well as the [`public/favicon.ico`](public/favicon.ico) file

That's it! Deploy and enjoy.

## Roadmap

- [x] Basic dynamic embedding
- [x] Link creation frontend
- [ ] Redirects
- [ ] Per-page social/meta photos
- [ ] Dynamic script loading for specific providers like Typeform
- [ ] Custom 404
