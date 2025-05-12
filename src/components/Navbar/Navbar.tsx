import { ReactElement } from "react";
import "./Navbar.scss";
import { Link } from "react-router";

function Navbar(): ReactElement {
  return (
    <>
      <nav className="nav-container">
        <div className="nav-grp">
          {/* Branding */}
          <Link to="/">{"< JEHOFF />"}</Link>
        </div>
        <div className="nav-grp">
          {/* Routes */}
          <Link to="/">Home</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
