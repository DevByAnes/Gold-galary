/** Product photography is served locally with the app. */
const localImages = new Set([
  "hero-1", "hero-2", "hero-3",
  "heart-charm-necklace-1", "rose-chain-pendant-1", "delicate-layer-necklace-1",
  "chunky-hoop-earrings-1", "drop-earrings-1", "twisted-hoop-earrings-1", "pave-huggie-earrings-1",
  "nail-bangle-set-1", "chain-bracelet-1", "id-bracelet-1", "stone-bangle-1", "bead-bangle-1",
  "twin-bands-1", "solitaire-ring-1", "cluster-ring-1", "delicate-rings-trio-1",
  "rose-set-1", "mesh-collar-set-1",
]);

export function img(name: string): string {
  if (!localImages.has(name)) throw new Error(`Missing local image asset: ${name}`);
  return `/images/${name}.jpg`;
}

/** Product image list `<slug>-1 … <slug>-n` in order. */
export function productImages(slug: string): string[] {
  const out: string[] = [];
  for (let i = 1; localImages.has(`${slug}-${i}`); i++) out.push(img(`${slug}-${i}`));
  return out;
}
