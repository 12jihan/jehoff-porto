import "./Home.scss";
import Banner from "../../components/Banner/Banner";
import Contact from "../../components/Contact/Contact";
import TechnologiesList from "../../components/TechnologiesList/TechnologiesList";
import experience from "../../experience";
import { Job } from "../../interfaces/Jobs/Job";
import { ReactElement, useEffect } from "react";
import { useAnalytics } from "../../customHooks/useAnalytics";

export default function Home(): ReactElement {
  const introText: string =
    "Hi, I'm a professional FULLSTACK SOFTWARE ENGINEER with over 9 years experience crafting digital experiences that make a difference. I'm passionate about turning complex problems into elegant, user-friendly solutions.";
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView("/home", "Home Page");
  }, []);

  return (
    <>
      <Banner
        title={"Jareem E. Hoff"}
        subtext={introText}
        backgroundColor="transparent"
      />
      <TechnologiesList />
      <section className="container">
        <h2 className="section-header-center">Work Experience</h2>
        <div className="section-body-center">
          {experience
            .slice(0, 3)
            .map((job: Job, index: number): ReactElement => {
              return (
                <div className="long-card" key={index}>
                  <div className="long-card__header">
                    <p className="job-name">{job.name}</p>
                    <p className="job-title">{job.title}</p>
                    <p className="job-location">New York, NY (Remote)</p>
                    <p className="job-date">{job.dates}</p>
                  </div>
                  <div className="long-card__body">
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
                        (tech: string, index: number): ReactElement | null => {
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
      </section>
      <Contact />
    </>
  );

  function limitString(text: string, maxLength: number): string {
    let shortened: string = "";
    if (text.length >= maxLength) {
      shortened = text.substring(0, maxLength) + " " + "...";
    } else {
      shortened = text;
    }
    return shortened;
  }
}
