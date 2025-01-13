import { createBrowserRouter, Outlet } from "react-router";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Resume from "./pages/Resume/Resume";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/resume",
        element: <Resume />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/resume",
        element: <Blog />,
      },
    ],
  },
]);

export default routes;
