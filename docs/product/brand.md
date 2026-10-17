# Plico UI identity

Plico UI uses a monochrome folded-P mark: a compact geometric symbol that suggests a folded interface layer and reads clearly at small sizes. Pair it with the Plico UI wordmark for the full identity. Keep the spelling **Plico UI**, the registry namespace `@plico`, and the default site origin `https://plico-ui.vercel.app` consistent across product surfaces.

## Canonical assets

Use these assets rather than drawing local variations:

| Asset       | Source                                                                         | Use                                                                 |
| ----------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Mark        | [`public/brand/plico-mark.svg`](../../public/brand/plico-mark.svg)             | Navigation, application icons, and small identity placements        |
| Wordmark    | [`public/brand/plico-wordmark.svg`](../../public/brand/plico-wordmark.svg)     | Full product identity in headers and shared materials               |
| Dark hero   | [`public/brand/plico-hero.svg`](../../public/brand/plico-hero.svg)             | Repository README and dark presentation surfaces                    |
| Light hero  | [`public/brand/plico-hero-light.svg`](../../public/brand/plico-hero-light.svg) | Repository README and light presentation surfaces                   |
| Favicon     | [`public/brand/plico-icon.svg`](../../public/brand/plico-icon.svg)             | Browser tabs; ink tile keeps the paper mark legible in either theme |
| App icon    | [`public/brand/plico-icon.png`](../../public/brand/plico-icon.png)             | 512 × 512 raster icon                                               |
| Apple icon  | [`public/brand/plico-apple-icon.png`](../../public/brand/plico-apple-icon.png) | 180 × 180 home-screen icon                                          |
| Social card | [`public/brand/plico-social.png`](../../public/brand/plico-social.png)         | 1200 × 630 Open Graph and Twitter image                             |

The README uses a `picture` element to select the hero for the reader's color scheme. The mark and wordmark have `-light.svg` counterparts for dark surfaces. Wordmark lettering is outlined from the bundled Inter font, so it renders consistently without a font download. Website and metadata assets derive from the same mark geometry. Component previews may include integration and customer logos as sample content; those marks keep their owners' identity.

## Visual treatment

Use Inter for interface and wordmark typography where text remains live. The core identity colors are ink `#111111` and paper `#fafafa`: dark ink on light surfaces, light paper on dark surfaces. Preserve strong contrast, the mark's proportions, and clear space around the symbol. Do not stretch the mark, add gradients or shadows to it, or replace its geometry with a text glyph.

Keep downloadable brand assets in `public/brand/`, and use repository-relative paths in the README. Site code uses root-relative `/brand/` URLs. When an identity asset changes, check its small-icon appearance, the README in both themes, browser metadata, and any preview image that embeds the product mark.
