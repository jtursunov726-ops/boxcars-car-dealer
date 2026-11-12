# BOXCARS — car dealer website (React + Vite)

Built from the Figma community file “75+ Car Dealer Website Templates”: all 10 home pages and the 15 inner pages from the Premium page.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173. `npm run build` makes a production build in `dist/`.

## Pages

| Route | Figma frame |
| --- | --- |
| `/`, `/home-2` … `/home-10` | Home-1 … Home-10 |
| `/listings` | list v1 (filters, sort, pagination, saved cars `?saved=1`) |
| `/listings/:id` | details v1 |
| `/listings/:id/v2` | details v2 |
| `/blog`, `/blog/list`, `/blog/:id` | blog v1, blog v2, blog details |
| `/shop`, `/faqs`, `/loan-calculator`, `/pricing`, `/services`, `/terms`, `/about`, `/contact`, `/login` | matching inner pages |

## Structure

- `src/data/` — cars, blog posts, team, products and other content
- `src/components/` — header, footer, search bars, car card, reusable sections
- `src/pages/` — the pages above
- `src/index.css` — all styles (design tokens at the top)

Photos are loaded from Unsplash and brand logos from Simple Icons, so the site needs an internet connection to show images. Login is a front-end demo (username `demo`, password `demo`); forms show a confirmation but nothing is sent to a server.
