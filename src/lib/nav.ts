export const NAV_EVENT = "pf-navigate";

/** Fire a site-wide navigation request (handled in App with a curtain wipe). */
export function navigate(id: string) {
  window.dispatchEvent(new CustomEvent<string>(NAV_EVENT, { detail: id }));
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
