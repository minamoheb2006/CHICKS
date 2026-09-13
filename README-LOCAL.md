# CHICKS menu website

This is a front-end-only QR menu for CHICKS New Assiut. It displays the restaurant information and menu items; it does not include ordering, cart, checkout, staff login, or a database.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the local URL shown by Vite. To create a production build:

```bash
pnpm build
pnpm start
```

The menu data is in `client/src/pages/Home.tsx`, and the bundled images are in `client/public/images`.
