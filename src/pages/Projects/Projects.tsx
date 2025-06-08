import "./Projects.scss";
import axios, { AxiosResponse } from "axios";
import GitHubCalendar from "react-github-calendar";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

const fetchGitHubRepos = async (username: string): Promise<any> => {
  const response: AxiosResponse<any, any> = await api.get(
    `/users/${username}/repos`,
    {
      params: {
        sort: "pushed",
        direction: "desc",
        per_page: 5,
      },
    },
  );
  return response.data;
};

/**
 * Displays a section featuring a GitHub user's contribution calendar and a list of their recent repositories.
 *
 * Fetches and renders up to five repositories for the user "12jihan" along with a themed contribution calendar. Shows loading and error states as appropriate.
 *
 * @returns The rendered projects section as a React element.
 */
function Projects(): ReactElement {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["github-repos", "12jihan"],
    queryFn: () => fetchGitHubRepos("12jihan"),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return (
    <>
      <section className="projects-container">
        <h2 className="section-header-center">Projects</h2>

        <div className="recent-projects">
          <h3>Featured Projects</h3>
          <div>
            <p>(Currently No Featured Projects</p>
          </div>
        </div>

        <div className="recent-projects">
          <h3>GitHub Repositories</h3>
          {isLoading && <p>Loading projects...</p>}
          {error && <p>Error loading projects: {error.message}</p>}
          {projects && (
            <div className="projects-grid">
              {/* {projects.slice(0, 6).map( */}
              {projects.map(
                (project: any): ReactElement => (
                  <div key={project.id} className="project-card">
                    <h4>{project.name}</h4>
                    <p>{project.description || "No description available"}</p>
                    <div className="project-meta">
                      {/* <span> */}
                      {/*   ⭐ {project.stargazers_count}🍴 {project.forks_count} */}
                      {/* </span> */}
                      {project.language && <span>📝 {project.language}</span>}
                    </div>
                    {/* <a */}
                    {/*   href={project.html_url} */}
                    {/*   target="_blank" */}
                    {/*   // rel="noopener noreferrer" */}
                    {/*   className="project-link" */}
                    {/* > */}
                    {/*   View on GitHub */}
                    {/* </a> */}
                  </div>
                ),
              )}
            </div>
          )}
          <div className="calendar-container">
            <GitHubCalendar
              username="12jihan"
              colorScheme="dark"
              // labels
              theme={{
                light: ["#0b0b0b", "#85ff00"],
                dark: ["#0b0b0b", "#85ff00"],
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;
