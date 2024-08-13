import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.body
});

export default app

export async function fetchProjectData(owner, repo) {
  try {
    const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;

    const [readmeResponse, repoResponse] = await Promise.all([
      fetch(readmeUrl, { headers: { Accept: 'application/vnd.github.v3+json' } }),
      fetch(repoUrl, { headers: { Accept: 'application/vnd.github.v3+json' } }),
    ]);

    let readmeContent = '';
    if (readmeResponse.ok) {
      const readmeData = await readmeResponse.json();
      readmeContent = atob(readmeData.content);
    } else {
      console.error('Error fetching README:', readmeResponse.statusText);
    }

    let repoDescription = '';
    if (repoResponse.ok) {
      const repoData = await repoResponse.json();
      repoDescription = repoData.description || '';
    } else {
      console.error('Error fetching repository description:', repoResponse.statusText);
    }

    return { content: readmeContent, description: repoDescription };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { content: '', description: '' };
  }
}
