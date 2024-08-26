<script>
  import { onMount } from "svelte";
  import { params } from "svelte-spa-router";
  import localProjects from "./projects.json";
  import { fetchProjectData } from "./main.ts";
  import SvelteMarkdown from "svelte-markdown";

  let project = {
    title: "",
    description: "",
    content: "",
  };

  function removeImagesFromContent(content) {
    return content.replace(/!\[.*?\]\(.*?\)/g, "");
  }

  async function fetchProjectDetails(id) {
    const foundProject = localProjects.find(
      (p) => p.title.toLowerCase() === id.toLowerCase()
    );
    if (foundProject) {
      const [owner, repo] = foundProject.repo.split("/");
      const data = await fetchProjectData(owner, repo);
      project = {
        ...foundProject,
        description: data.description,
        content: removeImagesFromContent(data.content),
      };
    }
  }

  onMount(() => {
    const unsubscribe = params.subscribe((p) => {
      if (p && p.id) {
        fetchProjectDetails(p.id);
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
    <img
      class="large responsive round"
      src={project.logo}
      alt={project.title}
    />
    <SvelteMarkdown source={project.content} />
  </main>
</body>
