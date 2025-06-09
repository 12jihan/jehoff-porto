import "./Projects.scss";
import axios, { AxiosResponse } from "axios";
import GitHubCalendar from "react-github-calendar";
import { useQuery } from "@tanstack/react-query";
import { ReactElement, useState } from "react";
import { GitForkIcon } from "lucide-react";

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

  const [calendar, setCalendar] = useState<boolean>(false);

  return (
    <>
      <section className="container">
        <h2 className="section-header-center">Projects</h2>

        <div className="section-body-left">
          <div className="recent-projects ">
            <h3 className="sub-header">Featured Projects</h3>
            <div className="recent-list">
              <p className="white">(Currently No Featured Projects)</p>
            </div>
          </div>

          <h3 className="sub-header">GitHub Repositories</h3>
          {isLoading && <p>Loading projects...</p>}
          {error && <p>Error loading projects: {error.message}</p>}
          {projects && (
            <>
              <div className="project-container">
                {/* {projects.slice(0, 6).map( */}
                {projects.map(
                  (project: any): ReactElement => (
                    <div key={project.id} className="project-card">
                      <div className="project-card__left">
                        <h4 className="lime">{project.name}</h4>
                        <p className="white">
                          {project.description || "No description available"}
                        </p>
                        <p className="white">
                          {project.stargazers_count}⭐ {project.forks_count}🍴
                        </p>
                      </div>
                      {/* <div className="project-meta"> */}
                      {/* <span> */}
                      {/* </span> */}
                      {/* {project.language && <span>📝 {project.language}</span>} */}
                      {/* </div> */}
                      <div className="project-card__right">
                        <a
                          href={project.html_url}
                          target="_blank"
                          // rel="noopener noreferrer"
                          className="btn btn--sm btn--lime-outline "
                        >
                          View on GitHub
                          <GitForkIcon />
                        </a>
                      </div>
                    </div>
                  ),
                )}
              </div>
              <div className="project-footer">
                <div className="footer-header">
                  <h3 className="lime">Github Commits</h3>
                  <button
                    className="btn btn--sm btn--lime"
                    onClick={() => {
                      setCalendar(!calendar);
                    }}
                  >
                    {calendar ? "Close" : "Open"} GitHub Calendar
                  </button>
                </div>
                <div className="footer-body">
                  {calendar && (
                    <GitHubCalendar
                      username="12jihan"
                      colorScheme="dark"
                      theme={{
                        light: ["#0b0b0b", "#85ff00"],
                        dark: ["#0b0b0b", "#85ff00"],
                      }}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Projects;
