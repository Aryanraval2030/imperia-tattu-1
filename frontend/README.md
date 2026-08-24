# Tattu — Tattoo Studio Website

A premium, responsive frontend for a contemporary tattoo studio, built with
React (Vite), plain JavaScript and CSS Modules only — no Tailwind, no UI
libraries.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── assets/                # (reserved for local images/icons)
├── hooks/
│   └── useScrollReveal.js # IntersectionObserver hook powering scroll animations
├── components/
│   ├── Navbar/
│   ├── Hero/
│   ├── About/
│   ├── Portfolio/
│   ├── Artists/
│   ├── WhyChooseUs/
│   ├── Testimonials/
│   ├── Contact/
│   └── Footer/
├── styles/
│   ├── variables.css      # design tokens (color, type, spacing)
│   └── global.css         # reset, base styles, shared animations
├── App.jsx                # composes every section
└── main.jsx                # React entry point
```

Every component folder holds a `.jsx` file and its matching `.module.css`,
so each piece is self-contained and easy to study on its own.

## Notes

- **Typography:** the whole site uses a single typeface, [Sora](https://fonts.google.com/specimen/Sora), loaded from Google Fonts in `index.html`. Hierarchy comes from weight and size, not mixed fonts.
- **Parallax hero:** the fixed background effect is pure CSS (`background-attachment: fixed`), with a `scroll` fallback for iOS Safari where `fixed` isn't supported.
- **Images:** placeholder photography is pulled from Unsplash by URL for the hero, about, portfolio and artist sections. Swap these `src` values in each component for your studio's real photography before shipping.
- **Contact form:** the booking form is fully wired with controlled inputs and validation but has no backend — `handleSubmit` in `Contact.jsx` just confirms receipt in the UI. Connect it to your email service or API of choice.
- **Map:** the contact section has a placeholder map block — swap it for a real Google Maps / Mapbox embed and address.
