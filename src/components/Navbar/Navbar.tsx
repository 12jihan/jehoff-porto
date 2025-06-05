import { ReactElement } from "react";
import "./Navbar.scss";
import { Link } from "react-router";

function Navbar(): ReactElement {
  return (
    <>
      <nav className="nav">
        <div className="nav__group">
          {/* Branding */}
          <Link className="nav__item" to="/">
            {"< JEHOFF />"}
          </Link>
        </div>
        <div className="nav__group">
          <Link className="nav__item" to="/">
            Home
          </Link>
          <Link className="nav__item" to="/resume">
            Resume
          </Link>
          <Link className="nav__item" to="/projects">
            Projects
          </Link>
          <Link className="nav__item" to="/blog">
            Blog
          </Link>
          <Link className="nav__item" to="/contact">
            {" "}
            Contact
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
