<script lang="ts">
  import { link } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import localProjects from './projects.json';

  let projects = [...localProjects];

  async function fetchReadmeAndDescription(owner: string, repo: string, projectTitle: string): Promise<void> {
    try {
      const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
      const readmeResponse = await fetch(readmeUrl, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      let readmeContent = '';
      if (readmeResponse.ok) {
        const readmeData = await readmeResponse.json();
        readmeContent = atob(readmeData.content);
      } else {
        console.error('Error fetching README:', readmeResponse.statusText);
      }

      const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;
      const repoResponse = await fetch(repoUrl, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      let repoDescription = '';
      if (repoResponse.ok) {
        const repoData = await repoResponse.json();
        repoDescription = repoData.description || '';
      } else {
        console.error('Error fetching repository description:', repoResponse.statusText);
      }

      projects = projects.map((project) =>
        project.title === projectTitle
          ? { ...project, content: readmeContent, description: repoDescription }
          : project,
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  onMount(() => {
    localProjects.forEach((project) => {
      const [owner, repo] = project.repo.split('/');
      console.log('Fetching data for:', project.repo);
      fetchReadmeAndDescription(owner, repo, project.title);
    });
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
      </div>
      <div class="column s12 m6 image-container">
        <img
          src="https://creatorspace.imgix.net/users/clf614ni400z3qy0ybq664n4o/ckGTLUUyy5zHifYG-Screenshot%25202023-12-14%2520005434.png?w=300&h=300"
          alt="Morning4coffe's profile"
          class="responsive circle"
        />
      </div>
    </div>

    <h5>My Projects</h5>

    <div class="grid">
      {#each projects as project (project.title)}
        <article class="s12 m6 l4">
          <div class="row">
            <img class="large" src={project.logo} alt={project.title} />
            <div class="max">
              <h6>{project.title}</h6>
              <p class="description-truncate">{project.description}</p>
            </div>
          </div>
          <nav>
            <a href={`/${project.title.toLowerCase()}`} use:link>
              <button>Details</button>
            </a>
          </nav>
        </article>
      {/each}
    </div>
  </main>
</body>

<style>
  .image-container {
    max-width: 200px;
    aspect-ratio: 1 / 1;
    position: relative;
  }

  .description-truncate {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
  }

  @media (max-width: 600px) {
    .header-row {
      flex-direction: column;
    }

    .image-container {
      margin-bottom: 20px;
    }
  }
</style>
