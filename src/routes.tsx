import { createBrowserRouter, Outlet } from "react-router";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Resume from "./pages/Resume/Resume";
import Blog from "./pages/Blog/Blog";
import ContactPage from "./pages/Contact/ContactPage";
import Projects from "./pages/Projects/Projects";
import Footer from "./components/Footer/Footer";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer />
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
        element: (
          <div className="container">
            <Projects />
          </div>
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
