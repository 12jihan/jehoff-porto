import "./Resume.scss";
import experience from "../../experience";
import { ReactElement } from "react";
import { Job } from "../../interfaces/Jobs/Job";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

function Resume(): ReactElement {
  const available: boolean = true;

  return (
    <>
      <section className="">
        <div className="section-header">
          <h2>Resume</h2>
        </div>
        <div className="resume">
          <div className="resume__header">
            <div className="header-item job-status">
              <p>
                <b>WORK STATUS:</b>{" "}
                {available ? <u>AVAILABLE</u> : <u>UNAVAILABLE</u>}
              </p>
              <FontAwesomeIcon
                icon={available ? faCheckCircle : faXmarkCircle}
                color={available ? "#22cc11" : "#bb4444"}
                // enableBackground="true"
                size="1x"
              />
            </div>
            <button type="button" className="header-item btn btn--lime-outline">
              Download
              {/* <FontAwesomeIcon icon={faArrowDownLong} /> */}
            </button>
          </div>
          <div className="resume__body">
            {experience.map((job: Job): ReactElement => {
              return (
                <>
                  <div className="resume__job">
                    <div className="job-header">
                      <p className="job-header__item">
                        <span className="job-name">{job.name}</span>
                      </p>
                      <p className="job-header__item">{job.dates}</p>
                      <p className="job-header__item">
                        <i>{job.location}</i>
                      </p>
                    </div>
                    <ul className="job-body">
                      {job.description.map(
                        (desc: string, index: number): ReactElement => {
                          return (
                            <li className="job-body__item" key={index}>
                              {desc}
                            </li>
                          );
                        },
                      )}
                    </ul>
                    <div className="badge-group-h">
                      {job.tech.map(
                        (tech: string, index: number): ReactElement | null => {
                          return (
                            <span className="badge--outline" key={index}>
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
      </section>
    </>
  );
}

export default Resume;
