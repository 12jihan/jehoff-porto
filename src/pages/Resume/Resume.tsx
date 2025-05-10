import "./Resume.scss";
import experience from "../../experience";
import { ReactElement } from "react";
import Banner from "../../components/Banner/Banner";
import { Job } from "../../interfaces/Jobs/Job";

function Resume(): ReactElement {
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
      <section className="container jobs-wrapper">
        {experience.map((job: Job, index: number): ReactElement => {
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
                    .slice(0, 3)
                    .map((bullet: string, index: number): ReactElement => {
                      return <li key={bullet}>{limitString(bullet, 100)}</li>;
                    })}
                </ul>

                <div className="badge-group-h">
                  {job.tech.map(
                    (tech: string, index: number): JSX.Element | null => {
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
      </section>
    </>
  );
}

export default Resume;
