<script>
  import Router from 'svelte-spa-router';
  import { wrap } from 'svelte-spa-router/wrap';
  import Home from './Home.svelte';
  import Details from './Details.svelte';

  const routes = {
    '/': Home,
    '/:id': wrap({
      component: Details,
      conditions: [
        (detail) => detail.params.id !== undefined
      ]
    })
  };
</script>

<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/beercss@3.6.13/dist/cdn/beer.min.css"
    rel="stylesheet"
  />
  <script
    type="module"
    src="https://cdn.jsdelivr.net/npm/beercss@3.6.13/dist/cdn/beer.min.js"
  ></script>
</svelte:head>

<Router {routes} />