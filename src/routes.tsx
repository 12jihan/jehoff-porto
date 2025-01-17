import { createBrowserRouter, Outlet } from "react-router";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Resume from "./pages/Resume/Resume";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";
import Banner from "./components/Banner/Banner";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <Banner />
            <div className="container">
              <Home />
            </div>
          </>
        ),
      },
      {
        path: "/blog",
        element: (
          <div className="container">
            <Blog />
          </div>
        ),
      },
      {
        path: "/resume",
        element: (
          <div className="container">
            <Resume />
          </div>
        ),
      },
      {
        path: "/projects",
        element: (
          <div className="container">
            <Projects />
          </div>
        ),
      },
      {
        path: "/contact",
        element: (
          <div className="container">
            <Contact />
          </div>
        ),
      },
    ],
  },
]);

export default routes;
