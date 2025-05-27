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
        <h2>Projects</h2>
        <div className="calendar-container">
          <GitHubCalendar
            username="12jihan"
            colorScheme="dark"
            // labels
            theme={{
              light: ["#1f035c", "#5b46e5", "#8d41e4", "#a65aff", "#f706cf"],
              dark: ["#1f035c", "#5b46e5", "#8d41e4", "#a65aff", "#f706cf"],
            }}
          />
        </div>

        <div className="recent-projects">
          <h3>Recent Repositories</h3>
          {isLoading && <p>Loading projects...</p>}
          {error && <p>Error loading projects: {error.message}</p>}
          {projects && (
            <div className="projects-grid">
              {projects.slice(0, 6).map(
                (project: any): ReactElement => (
                  <div key={project.id} className="project-card">
                    <h4>{project.name}</h4>
                    <p>{project.description || "No description available"}</p>
                    <div className="project-meta">
                      <span>⭐ {project.stargazers_count}</span>
                      <span>🍴 {project.forks_count}</span>
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
        </div>
      </section>
    </>
  );
}

export default Projects;
