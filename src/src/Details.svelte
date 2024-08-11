<script>
  import { onMount } from "svelte";
  import { params } from "svelte-spa-router";
  import projects from "./projects.json";

  let project = {};

  onMount(() => {
    const unsubscribe = params.subscribe(p => {
      if (p && p.id) {
        console.log("Params:", p);
        const itemId = p.id.toString();
        project = projects.find(i => i.title.toLowerCase().toString() === itemId) || {};
        console.log("Fetched Item:", projects);
      } else {
        console.log("Params or Params.id is undefined");
      }
    });

    return unsubscribe;
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="This is my SvelteKit page" />
  <link
    href="https://cdn.jsdelivr.net/npm/beercss@3.6.13/dist/cdn/beer.min.css"
    rel="stylesheet"
  />
  <script
    type="module"
    src="https://cdn.jsdelivr.net/npm/beercss@3.6.13/dist/cdn/beer.min.js"
  ></script>
</svelte:head>

<body class="dark">
  <main class="responsive">
    <img class="large responsive round" src={project.logo} alt={project.title} />
    <h2>{project.title}</h2>
    <p class="description-truncate">{project.description}</p>
  </main>
</body>