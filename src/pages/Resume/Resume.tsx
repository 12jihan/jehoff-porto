import "./Resume.scss";
import experience from "../../experience";
import { ReactElement } from "react";
import { Job } from "../../interfaces/Jobs/Job";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons/faArrowDownLong";

function Resume(): ReactElement {
  return (
    <>
      <section className="resume-container">
        <div className="header-container">
          <h2>Resume</h2>
        </div>
        <div className="con-container">
          <div className="jobs-header">
            <div className="header-item job-status">
              <p>
                <b>WORK STATUS:</b> <u>AVAILABLE</u>
              </p>
              <FontAwesomeIcon
                icon={faCheckCircle}
                color="#87cf55"
                enableBackground="true"
                size="1x"
              />
            </div>
            <button type="button" className="header-item job-download-resume">
              Download Resume
              <FontAwesomeIcon icon={faArrowDownLong} />
            </button>
          </div>
          <div className="job-container">
            <div className="jobs-wrapper">
              {experience.map((job: Job): ReactElement => {
                return (
                  <>
                    <div className="job-wrapper">
                      <div className="job-header-group">
                        <p className="job-item">
                          <span className="job-name">{job.name}</span>
                        </p>
                        <p className="job-item">{job.dates}</p>
                        <p className="job-item">
                          <i>{job.location}</i>
                        </p>
                      </div>
                      <ul className="job-body">
                        {job.description.map((desc: string): ReactElement => {
                          return <li>{desc}</li>;
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
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Resume;
