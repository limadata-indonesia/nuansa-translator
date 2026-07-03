// Registry for industry landing pages (rendered by ServiceLanding, same data shape as services).
import { data as hukum } from "./penerjemah-hukum";
import { data as medis } from "./penerjemah-medis";
import { data as keuangan } from "./penerjemah-keuangan";
import { data as pemasaran } from "./penerjemah-pemasaran";
import { data as pemerintahan } from "./penerjemah-pemerintahan";
import { data as teknologi } from "./penerjemah-teknologi";
import { data as teknik } from "./penerjemah-teknik";
import { data as otomotif } from "./penerjemah-otomotif";
import { data as migas } from "./penerjemah-migas";
import { data as sdm } from "./penerjemah-sdm";
import { data as game } from "./penerjemah-game";
import { data as fesyen } from "./penerjemah-fesyen";
import { data as kosmetik } from "./penerjemah-kosmetik";
import { data as korporat } from "./penerjemah-korporat";

const ALL = [
  hukum, medis, keuangan, pemasaran, pemerintahan, teknologi, teknik,
  otomotif, migas, sdm, game, fesyen, kosmetik, korporat,
];

const INDUSTRY_CONTENT = Object.fromEntries(ALL.map((d) => [d.slug, d]));

export function getIndustry(slug) {
  return INDUSTRY_CONTENT[slug];
}

export function allIndustrySlugs() {
  return ALL.map((d) => d.slug);
}
