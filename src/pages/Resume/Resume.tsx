import "./Resume.scss";
import experience from "../../experience";
import { ReactElement } from "react";
import { Job } from "../../interfaces/Jobs/Job";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCode } from "@fortawesome/free-regular-svg-icons";

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
      <div className="header-container">
        <h2>Resume</h2>
      </div>
      <section className="container">
        <div className="job-container">
          {experience.map((job: Job): ReactElement => {
            return (
              <>
                <div className="job-wrapper">
                  <div className="job-header-group">
                    <span className="job-icon">
                      <FontAwesomeIcon icon={faFileCode} />
                    </span>
                    <h3 className="job-header">{job.name}</h3>
                  </div>
                  <ul className="job-description">
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
      {/* <section className="container jobs-wrapper"> */}
      {/*   {experience.map((job: Job, index: number): ReactElement => { */}
      {/*     return ( */}
      {/*       <> */}
      {/*         <div className="__long-card" key={index}> */}
      {/*           <div className="__long-card-header"> */}
      {/*             <p className="job-name">{job.name}</p> */}
      {/*             <p className="job-title">{job.title}</p> */}
      {/*             <p className="job-location">New York, NY (Remote)</p> */}
      {/*             <p className="job-date">{job.dates}</p> */}
      {/*           </div> */}
      {/*           <div className="__long-card-body"> */}
      {/*             <ul> */}
      {/*               {job.description */}
      {/*                 .slice(0, 3) */}
      {/*                 .map((bullet: string): ReactElement => { */}
      {/*                   return <li key={bullet}>{limitString(bullet, 100)}</li>; */}
      {/*                 })} */}
      {/*             </ul> */}
      {/**/}
      {/*             <div className="badge-group-h"> */}
      {/*               {job.tech.map( */}
      {/*                 (tech: string, index: number): ReactElement | null => { */}
      {/*                   return ( */}
      {/*                     <span className="badge" key={index}> */}
      {/*                       {tech} */}
      {/*                     </span> */}
      {/*                   ); */}
      {/*                 }, */}
      {/*               )} */}
      {/*             </div> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*       </> */}
      {/*     ); */}
      {/*   })} */}
      {/* </section> */}
    </>
  );
}

export default Resume;
