<script lang="ts">
  import { link } from "svelte-spa-router";
  import { onMount } from "svelte";
  import localProjects from "./projects.json";
  import { fetchProjectData } from "./main.js";

  let projects = [...localProjects];
  let isLoading = true;

  async function updateProjectData() {
    for (let project of projects) {
      const [owner, repo] = project.repo.split("/");
      console.log("Fetching data for:", project.repo);

      const data = await fetchProjectData(owner, repo);
      project.description = data.description;
      project.content = data.content;
    }
    isLoading = false;
  }

  onMount(() => {
    updateProjectData();
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
    <div class="row header-row center-align">
      <div class="column s12 m6">
        <h1>Hey 👋, <br />I'm Coffe</h1>
        <button class="tertiary">software engineer</button>
        <button class="border">gamer</button>
      </div>
      <div class="column s12 m6 image-container">
        <img
          src="https://creatorspace.imgix.net/users/clf614ni400z3qy0ybq664n4o/ckGTLUUyy5zHifYG-Screenshot%25202023-12-14%2520005434.png?w=300&h=300"
          alt="Morning4coffe's profile"
          class="responsive circle"
        />
      </div>
    </div>

    <h5 class="projects-header">My Projects</h5>

    {#if isLoading}
      <div class="center-align">
        <progress class="circle center-align" />
        <p>Loading projects...</p>
      </div>
    {:else}
      <div class="grid">
        {#each projects as project (project.title)}
          <article class="s12 m6 l4 project-card">
            <div class="project-content">
              <div class="row">
                <img
                  class="large icon round"
                  src={project.logo}
                  alt={project.title}
                />
                <div class="max">
                  <h6>{project.title}</h6>
                  <p class="description-truncate">{project.description}</p>
                </div>
              </div>
              <nav class="project-footer">
                <a href={`/${project.title.toLowerCase()}`} use:link>
                  <button class="primary">Details</button>
                </a>
              </nav>
            </div>
          </article>
        {/each}
      </div>
    {/if}

    <!--<h5 class="projects-header">Websites</h5>

    <div class="grid">
      {#each projects as project (project.title)}
        <article class="s12 m6 l4 project-card">
          <div class="project-content">
            <div class="row">
              <img
                class="large icon round"
                src={project.logo}
                alt={project.title}
              />
              <div class="max">
                <h6>{project.title}</h6>
                <p class="description-truncate">{project.description}</p>
              </div>
            </div>
            <nav class="project-footer">
              <a href={`/${project.title.toLowerCase()}`} use:link>
                <button class="primary">Details</button>
              </a>
            </nav>
          </div>
        </article>
      {/each}
    </div>-->
  </main>
</body>

<style>
  .header-row {
    padding: 180px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-row h1 {
    margin: 0;
    font-size: 4.5rem;
  }

  .header-row button {
    margin: 10px;
  }

  .projects-header {
    margin: 36px 0px;
  }

  .project-card {
    display: flex;
  }

  .project-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 12px 8px;
  }

  .project-footer {
    margin-top: 12px;
  }

  .icon {
    max-height: 80px;
    object-fit: contain;
  }

  .image-container {
    max-width: 200px;
    aspect-ratio: 1 / 1;
  }

  .description-truncate {
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
  }

  @media (max-width: 600px) {
    .header-row {
      flex-direction: column;
      padding: 50px 0px;
    }

    .header-row img {
      margin-bottom: 20px;
    }

    .projects-header {
      margin: 10px 0px;
    }
  }
</style>
