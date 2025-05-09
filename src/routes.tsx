import { createBrowserRouter, Outlet } from "react-router";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Resume from "./pages/Resume/Resume";
import Blog from "./pages/Blog/Blog";
import ContactPage from "./pages/Contact/ContactPage";
import Projects from "./pages/Projects/Projects";

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
        element: <Home />,
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
            <ContactPage />
          </div>
        ),
      },
    ],
  },
]);

export default routes;
