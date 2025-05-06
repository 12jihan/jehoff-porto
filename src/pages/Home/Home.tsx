import "./Home.scss";
import { ReactElement } from "react";

interface Job {
  name: string;
  title: string;
  description: string;
  dates: string;
  location: string;
}
function Home(): ReactElement {
  const experience: Job[] = [
    {
      name: "test",
      title: "test engineer",
      description: "this is a test",
      dates: "01/01/2024 - 01/01/2025",
      location: "New York, NY",
    },
    {
      name: "test1",
      title: "test engineer",
      description: "this is a test",
      dates: "01/01/2024 - 01/01/2025",
      location: "New York, NY",
    },
    {
      name: "test2",
      title: "test engineer",
      description: "this is a test",
      dates: "01/01/2024 - 01/01/2025",
      location: "New York, NY",
    },
  ];

  return (
    <section className="home-container">
      <div className="header-container">
        <h2>Work Experience</h2>
      </div>
      <div className="intro-container">
        <div className="intro-row">
          {experience.map((job: Job): JSX.Element => {
            return (
              <div className="__long-card">
                <div className="__long-card-header">
                  <p className="job-name">{job.name}</p>
                  <p className="job-title">{job.title}</p>
                  <p className="job-date">{job.dates}</p>
                  <p className="job-location">New York, NY (Remote)</p>
                </div>
                <div className="__long-card-body">
                  <p>
                    Lead engineer for high-frequency trading systems processing
                    $50M+ daily volume. Architected and implemented real-time
                    market data processing pipeline reducing latency by 40%.
                    Mentored team of 5 engineers.
                  </p>
                  <div className="badge-group-h">
                    <span className="badge">#Badge</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="connect-container"> */}
      {/*   <div> */}
      {/*     <h3>Let's Connect</h3> */}
      {/*     <p> */}
      {/*       Senior Software Engineer based in NYC with 9+ years of experience */}
      {/*       building scalable applications. Specialized in distributed systems, */}
      {/*       real-time applications, and cloud architecture. */}
      {/*     </p> */}
      {/*   </div> */}
      {/* </div> */}
    </section>
  );
}

export default Home;
