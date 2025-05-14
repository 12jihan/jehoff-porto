import "./Resume.scss";
import experience from "../../experience";
import { ReactElement } from "react";
import { Job } from "../../interfaces/Jobs/Job";

function Resume(): ReactElement {
  // function limitString(text: string, maxLength: number): string {
  //   let shortened: string = "";
  //   if (text.length >= maxLength) {
  //     shortened = text.substring(0, maxLength) + " " + "...";
  //   } else {
  //     shortened = text;
  //   }
  //   return shortened;
  // }

  return (
    <>
      <section className="resume-container">
        <div className="header-container">
          <h2>Resume</h2>
        </div>
        <div className="job-container">
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
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Resume;
