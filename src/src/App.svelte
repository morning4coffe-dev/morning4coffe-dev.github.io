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

<Router {routes} />