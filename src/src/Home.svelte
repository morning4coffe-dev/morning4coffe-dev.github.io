<script lang="ts">
  import { onMount } from "svelte";
  import localProjects from "./projects.json";
  import { fetchProjectData } from "./main";

  let projects = [...localProjects];
  let isLoading = true;

  async function updateProjectData() {
    for (let project of projects) {
      const [owner, repo] = project.repo.split("/");
      const data = await fetchProjectData(owner, repo);
      project.description = data.description;
      project.content = data.content;
    }
    isLoading = false;
  }

  function scrollToProjects() {
    const projectsSection = document.querySelector(
      ".projects-section"
    ) as HTMLElement;
    projectsSection.scrollIntoView({ behavior: "smooth" });
  }

  onMount(() => {
    updateProjectData();
  });
</script>

<svelte:head>
  <title>Home | Morning4coffe</title>
</svelte:head>

<body class="dark">
  <main>
    <section class="header-row full-screen">
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

      <button
        class="scroll-arrow"
        on:click={scrollToProjects}
        aria-label="Scroll to Projects"
      >
        <p>Projects</p>
      </button>
    </section>

    <section class="projects-section responsive full-screen">
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
                  <a href={`/${project.title.toLowerCase()}`}>
                    <button class="primary">Details</button>
                  </a>
                </nav>
              </div>
            </article>
          {/each}
        </div>
      {/if}
    </section>
  </main>
</body>
