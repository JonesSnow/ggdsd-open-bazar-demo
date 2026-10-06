/**
 * Generates the static SVG artwork used across the Open Bazar demo.
 *
 * Output structure (see IMAGE_GUIDE.md):
 *   public/images/vendors/<category>-<variant>.svg   business covers, galleries, products
 *   public/images/categories/<category>.svg          category tiles
 *   public/images/hero/hero-open-bazaar.svg          homepage hero backdrop
 *   public/images/events/open-bazaar-5.svg           upcoming event band
 *   public/images/campus/campus-stalls.svg           campus / about sections
 *   public/images/brand/og-image.svg · favicon.svg   brand assets
 *
 * Run: node scripts/generate-images.mjs
 *
 * The artwork is abstract and editorial on purpose — flat geometric
 * compositions on a soft paper tint, so the demo needs no external
 * photography and remains fully self-contained.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");

/* ── Seeded PRNG ─────────────────────────────────── */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Category art palettes ───────────────────────── */
const CATEGORY_ART = {
  "fashion-accessories": {
    bg: "#F5EFE7",
    tones: ["#2C6B4C", "#C99B3E", "#8A4B5C", "#D9B36A", "#3E4440"],
  },
  "food-beverages": {
    bg: "#F6F0E4",
    tones: ["#B4530A", "#3E8562", "#D9B36A", "#7A561E", "#8C3B2E"],
  },
  "gifts-home-decor": {
    bg: "#F2EDE6",
    tones: ["#7A561E", "#2C6B4C", "#C99B3E", "#A8553F", "#5C401C"],
  },
  "personal-care-skincare": {
    bg: "#EFF3EE",
    tones: ["#3E8562", "#8FBFA4", "#C99B3E", "#5FA17E", "#23563D"],
  },
  "stationery-art": {
    bg: "#F4F1EA",
    tones: ["#3E4440", "#C99B3E", "#8C3B2E", "#5FA17E", "#2C6B4C"],
  },
  technology: {
    bg: "#EDF1F0",
    tones: ["#1D4533", "#3E8562", "#C99B3E", "#555C57", "#9A6E22"],
  },
  "photography-videography": {
    bg: "#F3EFE9",
    tones: ["#2A2E2B", "#C99B3E", "#8C3B2E", "#6B726D", "#D9B36A"],
  },
  "health-fitness": {
    bg: "#EFF4F0",
    tones: ["#23563D", "#5FA17E", "#C99B3E", "#8FBFA4", "#18382B"],
  },
  "education-tutoring": {
    bg: "#F5F1E8",
    tones: ["#1D4533", "#B8872A", "#3E8562", "#422D18", "#D9B36A"],
  },
  "event-services": {
    bg: "#F6F0E9",
    tones: ["#8A4B5C", "#C99B3E", "#2C6B4C", "#A8553F", "#5C401C"],
  },
};

/* ── Motifs: category-specific abstract geometry ─────────── */

function motifFashion(rand, t) {
  const [a, b, c] = t;
  return `
    <line x1="600" y1="120" x2="600" y2="320" stroke="${c}" stroke-width="6"/>
    <path d="M600 320 C 520 320 470 380 470 460 C 470 540 530 590 600 590 C 670 590 730 540 730 460 C 730 380 680 320 600 320 Z" fill="${a}" opacity="0.92"/>
    <path d="M600 330 C 545 330 510 375 510 450 C 510 520 555 560 600 560 C 645 560 690 520 690 450 C 690 375 655 330 600 330 Z" fill="${b}" opacity="0.85"/>
    <path d="M420 470 C 380 470 350 510 350 560 C 350 610 390 645 440 645 C 490 645 530 610 530 560 C 530 510 500 470 420 470 Z" fill="${c}" opacity="0.5"/>
    <path d="M790 380 C 755 380 730 415 730 460 C 730 505 762 535 805 535 C 848 535 880 505 880 460 C 880 415 855 380 790 380 Z" fill="${a}" opacity="0.45"/>
    <circle cx="600" cy="300" r="26" fill="${b}"/>
    <circle cx="600" cy="300" r="10" fill="${c}" opacity="0.8"/>`;
}

function motifFood(rand, t) {
  const [a, b, c] = t;
  return `
    <circle cx="600" cy="470" r="190" fill="${a}" opacity="0.9"/>
    <circle cx="600" cy="470" r="140" fill="${c}" opacity="0.35"/>
    <circle cx="600" cy="470" r="92" fill="${b}" opacity="0.85"/>
    <path d="M560 300 C 540 260 580 250 560 210" stroke="${a}" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.7"/>
    <path d="M610 310 C 630 265 590 258 612 215" stroke="${b}" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.6"/>
    <path d="M660 300 C 645 268 680 258 662 222" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.5"/>
    <circle cx="330" cy="640" r="46" fill="${b}" opacity="0.5"/>
    <circle cx="870" cy="330" r="34" fill="${a}" opacity="0.45"/>
    <circle cx="890" cy="620" r="22" fill="${c}" opacity="0.55"/>`;
}

function motifGifts(rand, t) {
  const [a, b, c] = t;
  return `
    <rect x="420" y="430" width="360" height="260" rx="18" fill="${a}" opacity="0.9"/>
    <rect x="420" y="380" width="360" height="70" rx="18" fill="${c}" opacity="0.85"/>
    <rect x="566" y="380" width="68" height="310" fill="${b}" opacity="0.9"/>
    <path d="M600 380 C 540 300 500 320 540 360 C 570 388 600 380 600 380 Z" fill="${b}"/>
    <path d="M600 380 C 660 300 700 320 660 360 C 630 388 600 380 600 380 Z" fill="${b}"/>
    <circle cx="600" cy="382" r="30" fill="${c}"/>
    <circle cx="330" cy="300" r="52" fill="${b}" opacity="0.4"/>
    <circle cx="880" cy="700" r="64" fill="${a}" opacity="0.35"/>
    <rect x="240" y="640" width="90" height="90" rx="14" fill="${c}" opacity="0.3" transform="rotate(18 285 685)"/>`;
}

function motifPersonalCare(rand, t) {
  const [a, b, c] = t;
  return `
    <path d="M600 180 C 690 320 740 400 740 500 A 140 140 0 0 1 460 500 C 460 400 510 320 600 180 Z" fill="${a}" opacity="0.9"/>
    <path d="M600 260 C 655 350 690 410 690 490 A 90 90 0 0 1 510 490 C 510 410 545 350 600 260 Z" fill="${b}" opacity="0.55"/>
    <circle cx="420" cy="330" r="42" fill="${b}" opacity="0.55"/>
    <circle cx="790" cy="420" r="58" fill="${c}" opacity="0.45"/>
    <circle cx="360" cy="560" r="26" fill="${a}" opacity="0.4"/>
    <circle cx="830" cy="620" r="34" fill="${b}" opacity="0.5"/>
    <circle cx="700" cy="700" r="18" fill="${c}" opacity="0.55"/>
    <circle cx="500" cy="710" r="24" fill="${a}" opacity="0.35"/>`;
}

function motifStationery(rand, t) {
  const [a, b, c] = t;
  return `
    <path d="M470 700 L600 180 L730 700 Q600 620 470 700 Z" fill="${a}" opacity="0.9"/>
    <path d="M600 180 L600 330 L655 640 Q600 610 545 640 Z" fill="${c}" opacity="0.75"/>
    <circle cx="600" cy="360" r="34" fill="${b}"/>
    <line x1="200" y1="760" x2="1000" y2="760" stroke="${c}" stroke-width="4" opacity="0.5"/>
    <line x1="240" y1="800" x2="960" y2="800" stroke="${c}" stroke-width="4" opacity="0.35"/>
    <line x1="280" y1="840" x2="920" y2="840" stroke="${c}" stroke-width="4" opacity="0.22"/>
    <circle cx="860" cy="240" r="46" fill="${b}" opacity="0.45"/>
    <circle cx="340" cy="220" r="28" fill="${c}" opacity="0.4"/>`;
}

function motifTechnology(rand, t) {
  const [a, b, c] = t;
  const nodes = [
    [300, 300], [480, 220], [700, 260], [880, 380],
    [380, 480], [600, 420], [820, 560], [460, 660], [680, 700],
  ];
  const links = [[0,1],[1,2],[2,3],[1,5],[0,4],[4,5],[5,6],[5,7],[7,8],[6,8],[3,6],[2,5]];
  const traces = links.map(([i, j]) => `<line x1="${nodes[i][0]}" y1="${nodes[i][1]}" x2="${nodes[j][0]}" y2="${nodes[j][1]}" stroke="${c}" stroke-width="5" opacity="0.55"/>`).join("\n    ");
  const dots = nodes.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 22 : 14}" fill="${i % 2 ? b : a}" opacity="${i % 3 === 0 ? 0.95 : 0.8}"/>`).join("\n    ");
  return `${traces}\n    ${dots}`;
}

function motifPhotography(rand, t) {
  const [a, b, c] = t;
  const blades = Array.from({ length: 6 }, (_, i) => {
    const ang = (i * 60 * Math.PI) / 180;
    const x = 600 + Math.cos(ang) * 90;
    const y = 470 + Math.sin(ang) * 90;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="170" fill="none" stroke="${i % 2 ? b : a}" stroke-width="34" opacity="0.8"/>`;
  }).join("\n    ");
  return `
    <circle cx="600" cy="470" r="250" fill="${c}" opacity="0.28"/>
    ${blades}
    <circle cx="600" cy="470" r="96" fill="${a}"/>
    <circle cx="600" cy="470" r="40" fill="${b}"/>
    <circle cx="330" cy="280" r="30" fill="${b}" opacity="0.5"/>
    <circle cx="880" cy="660" r="44" fill="${a}" opacity="0.4"/>`;
}

function motifHealth(rand, t) {
  const [a, b, c] = t;
  const petal = (angle, fill, op) => {
    const rad = (angle * Math.PI) / 180;
    return `<path d="M600 560 C ${600 + Math.cos(rad - 0.5) * 190} ${560 - Math.sin(rad + 0.2) * 190} ${600 + Math.cos(rad) * 230} ${560 - Math.abs(Math.sin(rad)) * 230 - 60} ${600 + Math.cos(rad + 0.35) * 190} ${560 - Math.sin(rad + 0.9) * 190} Q 600 480 600 560 Z" fill="${fill}" opacity="${op}" transform="rotate(${angle} 600 560)"/>`;
  };
  return `
    <circle cx="600" cy="560" r="250" fill="${c}" opacity="0.22"/>
    ${petal(-70, a, 0.5)}
    ${petal(-35, b, 0.55)}
    ${petal(0, a, 0.9)}
    ${petal(35, b, 0.55)}
    ${petal(70, a, 0.5)}
    <circle cx="600" cy="500" r="34" fill="${c}"/>
    <circle cx="350" cy="300" r="40" fill="${b}" opacity="0.4"/>
    <circle cx="860" cy="340" r="28" fill="${a}" opacity="0.4"/>
    <circle cx="880" cy="680" r="48" fill="${b}" opacity="0.3"/>`;
}

function motifEducation(rand, t) {
  const [a, b, c] = t;
  return `
    <path d="M600 420 C 480 330 320 330 220 400 L220 640 C 320 570 480 570 600 660 Z" fill="${a}" opacity="0.9"/>
    <path d="M600 420 C 720 330 880 330 980 400 L980 640 C 880 570 720 570 600 660 Z" fill="${c}" opacity="0.75"/>
    <path d="M600 420 L600 660" stroke="${b}" stroke-width="8" opacity="0.7"/>
    <path d="M300 470 C 380 430 470 430 540 470" stroke="${c}" stroke-width="6" fill="none" opacity="0.6"/>
    <path d="M900 470 C 820 430 730 430 660 470" stroke="${c}" stroke-width="6" fill="none" opacity="0.6"/>
    <circle cx="330" cy="290" r="38" fill="${b}" opacity="0.45"/>
    <circle cx="880" cy="700" r="46" fill="${a}" opacity="0.35"/>
    <rect x="770" y="240" width="70" height="70" rx="12" fill="${b}" opacity="0.35" transform="rotate(14 805 275)"/>`;
}

function motifEvents(rand, t) {
  const [a, b, c] = t;
  const flags = [320, 430, 540, 650, 760, 870].map((x, i) => {
    const y = 300 + Math.sin((i / 5) * Math.PI) * 60;
    const fill = [a, b, c][i % 3];
    return `<path d="M${x} ${y} L${x + 64} ${y + 6} L${x + 10} ${y + 108} Z" fill="${fill}" opacity="${0.75 + (i % 2) * 0.15}"/>`;
  }).join("\n    ");
  return `
    <path d="M240 310 Q 600 430 960 310" stroke="${a}" stroke-width="8" fill="none" opacity="0.85"/>
    ${flags}
    <circle cx="330" cy="640" r="44" fill="${b}" opacity="0.4"/>
    <circle cx="870" cy="660" r="56" fill="${c}" opacity="0.35"/>
    <circle cx="600" cy="760" r="30" fill="${a}" opacity="0.3"/>`;
}

const MOTIFS = {
  "fashion-accessories": motifFashion,
  "food-beverages": motifFood,
  "gifts-home-decor": motifGifts,
  "personal-care-skincare": motifPersonalCare,
  "stationery-art": motifStationery,
  technology: motifTechnology,
  "photography-videography": motifPhotography,
  "health-fitness": motifHealth,
  "education-tutoring": motifEducation,
  "event-services": motifEvents,
};

/* ── Canvas composition ────────────────────────────────── */

function compose(categorySlug, variant) {
  const seed = [...categorySlug].reduce((acc, ch) => acc + ch.charCodeAt(0) * 31, 7) + variant * 977;
  const rand = mulberry32(seed);
  const art = CATEGORY_ART[categorySlug];
  const tones = [...art.tones].sort(() => rand() - 0.5);
  const motif = MOTIFS[categorySlug](rand, tones);

  const decor = Array.from({ length: 26 }, () => {
    const x = (rand() * 1160 + 20).toFixed(0);
    const y = (rand() * 860 + 20).toFixed(0);
    const r = (rand() * 2.4 + 0.8).toFixed(1);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${tones[4]}" opacity="${(rand() * 0.16 + 0.05).toFixed(2)}"/>`;
  }).join("\n    ");

  const blob = `
    <circle cx="${(rand() * 500 + 100).toFixed(0)}" cy="${(rand() * 300 + 80).toFixed(0)}" r="${(rand() * 180 + 120).toFixed(0)}" fill="${tones[1]}" opacity="0.12"/>
    <circle cx="${(rand() * 400 + 700).toFixed(0)}" cy="${(rand() * 300 + 450).toFixed(0)}" r="${(rand() * 200 + 140).toFixed(0)}" fill="${tones[2]}" opacity="0.10"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${categorySlug} artwork">
  <rect width="1200" height="900" fill="${art.bg}"/>
  ${blob}
  <g>
    ${decor}
  </g>
  <g>
    ${motif}
  </g>
  <rect x="28" y="28" width="1144" height="844" rx="28" fill="none" stroke="${tones[0]}" stroke-opacity="0.18" stroke-width="2"/>
</svg>`;
}

/* ── Dedicated compositions ────────────────────────────── */

/** Homepage hero backdrop — a wide bazaar arch scene (1600×1000). */
function heroArtwork() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" role="img" aria-label="Open Bazaar campus scene">
  <rect width="1600" height="1000" fill="#F5F1E8"/>
  <circle cx="1330" cy="140" r="330" fill="#2C6B4C" opacity="0.10"/>
  <circle cx="220" cy="830" r="300" fill="#C99B3E" opacity="0.10"/>
  <g fill="none" stroke="#23563D" stroke-opacity="0.16" stroke-width="2">
    <circle cx="800" cy="560" r="430"/>
    <circle cx="800" cy="560" r="360"/>
    <circle cx="800" cy="560" r="290"/>
  </g>
  <path d="M560 880 L560 420 A 240 240 0 0 1 1040 420 L 1040 880 Z" fill="#2C6B4C" opacity="0.92"/>
  <path d="M620 880 L620 450 A 180 180 0 0 1 980 450 L 980 880 Z" fill="#F4E8CE"/>
  <path d="M620 880 L620 450 A 180 180 0 0 1 980 450" fill="none" stroke="#C99B3E" stroke-width="10"/>
  <path d="M560 500 A 240 240 0 0 1 1040 500" fill="none" stroke="#C99B3E" stroke-width="6" opacity="0.6"/>
  <rect x="690" y="640" width="220" height="240" rx="10" fill="#B8872A" opacity="0.9"/>
  <rect x="712" y="664" width="176" height="120" rx="6" fill="#F5F1E8"/>
  <path d="M300 340 Q 800 470 1300 340" stroke="#23563D" stroke-width="7" fill="none" opacity="0.75"/>
  ${[380, 540, 700, 860, 1020, 1180].map((x, i) => {
    const y = 340 + Math.sin((i / 5) * Math.PI) * 55;
    const fill = ["#C99B3E", "#8FBFA4", "#8A4B5C"][i % 3];
    return `<path d="M${x} ${y} L${x + 56} ${y + 5} L${x + 9} ${y + 96} Z" fill="${fill}" opacity="0.8"/>`;
  }).join("\n  ")}
  <circle cx="290" cy="700" r="60" fill="#C99B3E" opacity="0.35"/>
  <circle cx="1310" cy="640" r="74" fill="#2C6B4C" opacity="0.28"/>
  <circle cx="220" cy="240" r="26" fill="#8A4B5C" opacity="0.35"/>
  <circle cx="1390" cy="220" r="20" fill="#B8872A" opacity="0.4"/>
  <rect x="40" y="40" width="1520" height="920" rx="30" fill="none" stroke="#23563D" stroke-opacity="0.16" stroke-width="2"/>
</svg>`;
}

/** Event band artwork — stage, bunting and a crowd (1600×900). */
function eventArtwork() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="Open Bazaar 5.0 event artwork">
  <rect width="1600" height="900" fill="#0C1F17"/>
  <circle cx="1380" cy="120" r="340" fill="#2C6B4C" opacity="0.35"/>
  <circle cx="180" cy="790" r="280" fill="#C99B3E" opacity="0.14"/>
  <g stroke="#B9D7C6" stroke-opacity="0.14" stroke-width="14" fill="none" stroke-linecap="round">
    <path d="M560 90 L 700 420"/>
    <path d="M1040 90 L 900 420"/>
    <path d="M800 60 L 800 430"/>
  </g>
  <path d="M360 560 Q 800 430 1240 560 L 1240 640 Q 800 520 360 640 Z" fill="#18382B"/>
  <path d="M360 560 Q 800 430 1240 560" fill="none" stroke="#DAB669" stroke-width="6"/>
  ${[440, 580, 720, 860, 1000, 1140].map((x, i) => {
    const y = 545 + Math.sin((i / 5) * Math.PI) * 34;
    const fill = ["#C99B3E", "#8FBFA4", "#DAB669"][i % 3];
    return `<path d="M${x} ${y} L${x + 52} ${y + 5} L${x + 8} ${y + 92} Z" fill="${fill}" opacity="0.85"/>`;
  }).join("\n  ")}
  <rect x="730" y="470" width="140" height="90" rx="8" fill="#C99B3E"/>
  <rect x="752" y="492" width="96" height="46" rx="5" fill="#0C1F17" opacity="0.85"/>
  <g fill="#B9D7C6">
    ${Array.from({ length: 42 }, (_, i) => {
      const x = 240 + (i * 28) % 1120;
      const y = 690 + ((i * 53) % 120);
      return `<circle cx="${x}" cy="${y}" r="${6 + (i % 3) * 2}" opacity="${0.25 + (i % 4) * 0.12}"/>`;
    }).join("\n    ")}
  </g>
  <rect x="40" y="40" width="1520" height="820" rx="28" fill="none" stroke="#B9D7C6" stroke-opacity="0.22" stroke-width="2"/>
</svg>`;
}

/** Campus scene — a row of stall arches (1200×900). */
function campusArtwork() {
  const stalls = [170, 430, 690, 950].map((x, i) => {
    const tones = [
      ["#2C6B4C", "#C99B3E"],
      ["#8A4B5C", "#D9B36A"],
      ["#B8872A", "#8FBFA4"],
      ["#3E8562", "#F4E8CE"],
    ][i];
    return `
    <path d="M${x - 90} 700 L${x - 90} 420 A 90 90 0 0 1 ${x + 90} 420 L${x + 90} 700 Z" fill="${tones[0]}" opacity="0.9"/>
    <path d="M${x - 90} 480 A 90 90 0 0 1 ${x + 90} 480" fill="none" stroke="${tones[1]}" stroke-width="7" opacity="0.8"/>
    <rect x="${x - 52}" y="560" width="104" height="140" rx="8" fill="#F5F1E8" opacity="0.92"/>
    <rect x="${x - 52}" y="560" width="104" height="26" rx="8" fill="${tones[1]}" opacity="0.85"/>`;
  }).join("\n  ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="Campus stalls scene">
  <rect width="1200" height="900" fill="#F6F0E4"/>
  <circle cx="1050" cy="160" r="260" fill="#C99B3E" opacity="0.12"/>
  <circle cx="140" cy="760" r="240" fill="#2C6B4C" opacity="0.10"/>
  <rect x="0" y="700" width="1200" height="200" fill="#DCEBE2"/>
  <rect x="0" y="700" width="1200" height="10" fill="#8FBFA4" opacity="0.6"/>
  ${stalls}
  <path d="M120 260 Q 600 360 1080 260" stroke="#23563D" stroke-width="6" fill="none" opacity="0.5"/>
  ${[240, 480, 720, 960].map((x, i) => {
    const y = 260 + Math.sin((i / 3) * Math.PI) * 40;
    return `<path d="M${x} ${y} L${x + 44} ${y + 4} L${x + 7} ${y + 78} Z" fill="${["#C99B3E", "#8FBFA4", "#8A4B5C", "#B8872A"][i]}" opacity="0.75"/>`;
  }).join("\n  ")}
  <circle cx="240" cy="180" r="22" fill="#C99B3E" opacity="0.35"/>
  <circle cx="990" cy="140" r="18" fill="#2C6B4C" opacity="0.3"/>
  <rect x="28" y="28" width="1144" height="844" rx="28" fill="none" stroke="#23563D" stroke-opacity="0.16" stroke-width="2"/>
</svg>`;
}

function ogImage() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-label="GGDSD Open Bazar">
  <rect width="1200" height="630" fill="#0C1F17"/>
  <circle cx="1020" cy="120" r="300" fill="#2C6B4C" opacity="0.35"/>
  <circle cx="120" cy="560" r="260" fill="#C99B3E" opacity="0.18"/>
  <g fill="none" stroke="#B9D7C6" stroke-opacity="0.25" stroke-width="2">
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${60 + i * 14} ${i * 8} h100"/>`).join("\n    ")}
  </g>
  <path d="M180 330 C 180 250 250 200 330 200 L 470 200 C 550 200 620 250 620 330 L 620 460 C 620 470 612 478 602 478 L 198 478 C 188 478 180 470 180 460 Z" fill="#F4E8CE"/>
  <path d="M330 200 C 400 260 460 290 470 290 C 480 290 540 260 620 200" fill="none" stroke="#0C1F17" stroke-width="10"/>
  <path d="M405 478 L405 340 A 55 55 0 0 1 515 340 L 515 478" fill="#C99B3E"/>
  <text x="700" y="290" font-family="Georgia, 'Times New Roman', serif" font-size="96" fill="#FBFAF7">Open Bazar</text>
  <text x="704" y="372" font-family="Arial, sans-serif" font-size="34" letter-spacing="6" fill="#DAB669">GGDSD COLLEGE · IIC</text>
  <text x="704" y="436" font-family="Arial, sans-serif" font-size="26" fill="#8FBFA4">The campus business directory</text>
</svg>`;
}

function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0C1F17"/>
  <path d="M14 44 C 14 28 24 20 32 20 C 40 20 50 28 50 44 Z" fill="#F4E8CE"/>
  <path d="M22 44 L22 32 A 10 10 0 0 1 42 32 L42 44 Z" fill="#C99B3E"/>
</svg>`;
}

/* ── Run ───────────────────────────────────────────────── */

const CATEGORY_SLUGS = Object.keys(CATEGORY_ART);

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
}

let count = 0;

for (const slug of CATEGORY_SLUGS) {
  // Vendor imagery: six deterministic variants per category.
  for (let v = 0; v < 6; v++) {
    write(join(outDir, "vendors", `${slug}-${v}.svg`), compose(slug, v));
    count++;
  }
  // Category tile: the canonical (first) composition.
  write(join(outDir, "categories", `${slug}.svg`), compose(slug, 0));
  count++;
}

write(join(outDir, "hero", "hero-open-bazaar.svg"), heroArtwork());
write(join(outDir, "events", "open-bazaar-5.svg"), eventArtwork());
write(join(outDir, "campus", "campus-stalls.svg"), campusArtwork());
write(join(outDir, "brand", "og-image.svg"), ogImage());
write(join(outDir, "brand", "favicon.svg"), favicon());
count += 5;

console.log(`Generated ${count} images in ${outDir.replace(root, ".")}`);
