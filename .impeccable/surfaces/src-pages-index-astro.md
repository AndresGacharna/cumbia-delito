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

FIRST VIEWPORT: Back wall band across the top quarter (real brick crop). Below it, the navy stage floor seen from above. Front-centre, where the lead vocal stands: the SVG logo at large scale, the line "Cumbia villera · cumbia urbana · Bogotá, Colombia", the subtitle quote, then the two CTAs side by side, red and white, equal size. At the keytar position (front left on desktop, upper right on mobile): the stage photo as a taped polaroid. Three tape X's on the floor with leader-line labels pointing to Música, El show and Organizadores. Sticky top bar: logo and a red "Contrata" button.

FORM: Stage plot as page map (signature: after the first viewport the stage shrinks into a sticky minimap that lights the current section's position in red and draws its leader line; on mobile a thin strip under the top bar; static with `prefers-reduced-motion`). Position 6 of 7 on the grounded list. Raises: fixed stage grid from teletext; leader-line callouts from the annotated-uniform world. seed:9e0b51f9f15f37fc

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
