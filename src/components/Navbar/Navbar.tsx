import { ReactElement } from "react";
import "./Navbar.scss";
import { NavLink, NavLinkRenderProps } from "react-router";

// @ts-ignore
interface RouteItem {
  name: string;
  route: string;
  // displayName: string;
  // icon?: string; // Optional icon for future use
}

function Navbar(): ReactElement {
  const routes: RouteItem[] = [
    {
      name: "home",
      route: "/",
    },
    {
      name: "resume",
      route: "/resume",
    },
    {
      name: "projects",
      route: "/projects",
    },
    {
      name: "blog",
      route: "/blog",
    },
    {
      name: "contact",
      route: "/contact",
    },
  ];

  return (
    <>
      <nav className="nav">
        <div className="nav__group">
          {/* Branding */}
          <NavLink className="nav__item" to="/">
            {"< JEHOFF />"}
          </NavLink>
        </div>
        <div className="nav__group">
          {routes.map((val: any, index: number): ReactElement => {
            let _val: string = val.name.toUpperCase();

            return (
              <NavLink
                key={index}
                className={({ isActive }: NavLinkRenderProps): string =>
                  `nav__item ${isActive ? "nav--active" : ""}`
                }
                to={val.route}
              >
                {_val}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
