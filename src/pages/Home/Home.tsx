import "./Home.scss";
import Banner from "../../components/Banner/Banner";
import Contact from "../../components/Contact/Contact";
import TechnologiesList from "../../components/TechnologiesList/TechnologiesList";
import experience from "../../experience";
import { Job } from "../../interfaces/Jobs/Job";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  const introText: string =
    "Hi, I'm a professional FULLSTACK SOFTWARE ENGINEER with over 9 years experience crafting digital experiences that make a difference. I'm passionate about turning complex problems into elegant, user-friendly solutions.";

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
      <Banner
        title={"Jareem E. Hoff"}
        subtext={introText}
        backgroundColor="transparent"
        // backgroundColor="#0d0221"
      />
      <TechnologiesList />
      <section className="home-container">
        <div className="section-header">
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
                              <li key={bullet}>{limitString(bullet, 80)}</li>
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
