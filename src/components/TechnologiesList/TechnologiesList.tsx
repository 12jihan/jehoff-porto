import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import "./TechnologiesList.scss";
import {
  faAngular,
  faAws,
  faJava,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons/faReact";
// import { iconName } from "@fortawesome/free-solid-svg-icons/faEnvelopeSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";

export default function TechnologiesList(): ReactElement {
  const iconSize: SizeProp | undefined = undefined;
  // const iconSize: SizeProp | undefined = "5x";
  // const techList: unknown[] = [
  //   {
  //     name: "Angular",
  //     color: "red",
  //     icon: faAngular,
  //   },
  // ];

  return (
    <>
      <section className="container">
        <h2 className="section-header-center">Technologies</h2>
        <div className="section-body-center">
          <div className="tech-list">
            <div className="mini-card">
              <div className="mini-card__icon">
                <FontAwesomeIcon size={iconSize} icon={faAngular} />
              </div>
              {/* <p>Angular</p> */}
            </div>
            <div className="mini-card">
              <div className="mini-card__icon">
                <FontAwesomeIcon size={iconSize} icon={faReact} />
              </div>
              {/* <p>React</p> */}
            </div>
            <div className="mini-card">
              <div className="mini-card__icon">
                <FontAwesomeIcon size={iconSize} icon={faNodeJs} />
              </div>
              {/* <p>NodeJS</p> */}
            </div>
            <div className="mini-card">
              <div className="mini-card__icon">
                <FontAwesomeIcon size={iconSize} icon={faJava} />
              </div>
              {/* <p>Java</p> */}
            </div>
            <div className="mini-card">
              <div className="mini-card__icon">
                <FontAwesomeIcon size={iconSize} icon={faAws} />
              </div>
              {/* <p>AWS</p> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
