import { ReactElement } from "react";
import "./Navbar.scss";
import { NavLink, NavLinkRenderProps } from "react-router";

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

  // const [navState, setNavState] = useState<boolean>(true);

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
          {/* <button */}
          {/*   type="button" */}
          {/*   className="btn__icon btn--lime-outline" */}
          {/*   onClick={(): void => setNavState(!navState)} */}
          {/* > */}
          {/*   <AlignJustifyIcon /> */}
          {/* </button> */}
          {routes.map((val: RouteItem, index: number): ReactElement => {
            const _val: string = val.name.toUpperCase();

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
      {/* {navState && ( */}
      {/*   <div className="nav__mobile-group"> */}
      {/*     {routes.map((val: any, index: number): ReactElement => { */}
      {/*       let _val: string = val.name.toUpperCase(); */}
      {/**/}
      {/*       return ( */}
      {/*         <NavLink */}
      {/*           key={index} */}
      {/*           className={({ isActive }: NavLinkRenderProps): string => */}
      {/*             `nav__mobile-item ${isActive ? "nav--active" : ""}` */}
      {/*           } */}
      {/*           to={val.route} */}
      {/*         > */}
      {/*           <span>{_val}</span> */}
      {/*         </NavLink> */}
      {/*       ); */}
      {/*     })} */}
      {/*   </div> */}
      {/* )} */}
    </>
  );
}

export default Navbar;
