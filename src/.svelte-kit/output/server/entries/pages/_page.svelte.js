import { c as create_ssr_component } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1dfh84z_START -->${$$result.title = `<title>Hello World</title>`, ""}<meta name="description" content="This is my SvelteKit page"><link href="https://cdn.jsdelivr.net/npm/beercss@3.6.13/dist/cdn/beer.min.css" rel="stylesheet"><script type="module" src="https://cdn.jsdelivr.net/npm/beercss@3.6.13/dist/cdn/beer.min.js" data-svelte-h="svelte-l15z95"><\/script><script type="module" src="https://cdn.jsdelivr.net/npm/material-dynamic-colors@1.1.2/dist/cdn/material-dynamic-colors.min.js" data-svelte-h="svelte-1mxzozf"><\/script><!-- HEAD_svelte-1dfh84z_END -->`, ""} <body class="dark" data-svelte-h="svelte-7xfbc2"><main class="responsive"><img src="https://www.beercss.com/beer-and-woman.svg" class="responsive round" alt="Beer and Woman"> <h3>Welcome</h3> <h5>The beer is ready!</h5></main></body>`;
});
export {
  Page as default
};
