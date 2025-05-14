import Banner from "../../components/Banner/Banner";
import Contact from "../../components/Contact/Contact";
import TechnologiesList from "../../components/TechnologiesList/TechnologiesList";
import experience from "../../experience";
import { Job } from "../../interfaces/Jobs/Job";
import "./Home.scss";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  function limitString(text: string, maxLength: number): string {
    let shortened: string = "";
    if (text.length >= maxLength) {
      shortened = text.substring(0, maxLength) + " " + "...";
    } else {
      shortened = text;
    }
    return shortened;
  }

  return (
    <>
      <Banner />
      <TechnologiesList />
      <section className="home-container">
        <div className="header-container">
          <h2>Work Experience</h2>
        </div>
        <div className="intro-container">
          <div className="container intro-column">
            {experience
              .slice(0, 3)
              .map((job: Job, index: number): ReactElement => {
                return (
                  <div className="__long-card" key={index}>
                    <div className="__long-card-header">
                      <p className="job-name">{job.name}</p>
                      <p className="job-title">{job.title}</p>
                      <p className="job-location">New York, NY (Remote)</p>
                      <p className="job-date">{job.dates}</p>
                    </div>
                    <div className="__long-card-body">
                      <ul>
                        {job.description
                          .slice(0, 4)
                          .map((bullet: string): ReactElement => {
                            return (
                              <li key={bullet}>{limitString(bullet, 100)}</li>
                            );
                          })}
                      </ul>

                      <div className="badge-group-h">
                        {job.tech.map(
                          (
                            tech: string,
                            index: number,
                          ): ReactElement | null => {
                            return (
                              <span className="badge" key={index}>
                                {tech}
                              </span>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}
