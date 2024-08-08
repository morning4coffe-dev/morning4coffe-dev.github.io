

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.B6g8PDFJ.js","_app/immutable/chunks/scheduler.D9xsQs6S.js","_app/immutable/chunks/index.DkBX_zpY.js","_app/immutable/chunks/entry.t3-sm-pw.js"];
export const stylesheets = [];
export const fonts = [];
