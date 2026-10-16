---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Landing · Cumbia De+Lito

Scope: `src/pages/index.astro`, single-page landing. Mode: **Persuade**. Spec: `PROMPT_WEB.md` §4–§6; product truth in `PRODUCT.md`.

Audience and action: organizers book the show through WhatsApp ("Contrata el show"); fans listen on Spotify ("Escúchanos"). Both CTAs carry equal weight and sit in the first viewport on 390 px and 1440 px; booking stays one tap away on every scroll position.

Proof: the 4 singles as lazy Spotify embeds, the Karol G credit proven by the official video and the Noticias RCN link, the city and country list, the rider and the stage plot. Nothing outside `brief.json` publishable types.

Unresolved: domain (`SITE_URL` TODO), web licence for Gotham (not used), original high-resolution photos, the neon logo original.

## Direction contract

THESIS: The page is the stage seen from above. Every section is a position on the EPK stage plot, marked with red gaffer-tape X's on the floor; it refuses the band-site default of a full-bleed photo hero over a row of equal cards.

OWN-WORLD: The EPK world, inherited: navy brick wall (#0D1121/#151931) with curved red (#721D1F) and gray (#8B8D95) bands cut from the real EPK wall; red accent #DA291C for the "+", the tape X's and the CTAs; white brush-script logo; polaroids with masking tape, ruled and grid notebook paper, aged poster paper, spray drips. Display: Archivo at maximum width and weight, uppercase and tracked; body: Archivo at normal width.

STORY: In one viewport the visitor understands it is Bogotá cumbia villera with a Caribbean "+", hears it one tap away and can book it one tap away. Scrolling walks the stage: music, the Karol G proof, the show, the trail, the organizer's sheet, back to the front mic to book.

FIRST VIEWPORT: The whole first screen is the real EPK brick wall (mirrored fondo-tarima, navy scrim behind the copy). Left: the white script logo at large scale, the genres line, the subtitle quote and the two CTAs side by side, red and white, equal size. Right: real band photos pasted on the wall as taped polaroids (duo with keytar large, live bar shot, octapad portrait) plus a red "Desde 2012" sticker; on mobile the photos fan out above the logo. Bottom: a red rolling ticker of published facts with red drips into the next section. Sticky top bar: logo, section links and a red "Contrata" button.

FORM: Gig-poster wall (signature: photos slapped onto the wall in sequence on load and the rolling red ticker; static with `prefers-reduced-motion`). Wayfinding is the top bar alone, which underlines the current section in red. The stage-plot minimap was removed at the client's request (2026-10-15): do not bring it back. Tape X's stay only as section-head marks. seed:9e0b51f9f15f37fc

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
