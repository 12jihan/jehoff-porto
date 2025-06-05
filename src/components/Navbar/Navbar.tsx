import { ReactElement } from "react";
import "./Navbar.scss";
import { Link } from "react-router";

function Navbar(): ReactElement {
  return (
    <>
      <nav className="top-nav">
        <div className="top-nav__nav-group">
          {/* Branding */}
          <Link className="nav-item" to="/">
            {"< JEHOFF />"}
          </Link>
        </div>
        <div className="nav-grp">
          {/* Routes */}
          <Link className="nav-item" to="/">
            Home
          </Link>
          <Link className="nav-item" to="/resume">
            Resume
          </Link>
          <Link className="nav-item" to="/projects">
            Projects
          </Link>
          <Link className="nav-item" to="/blog">
            Blog
          </Link>
          <Link className="nav-item" to="/contact">
            Contact
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
