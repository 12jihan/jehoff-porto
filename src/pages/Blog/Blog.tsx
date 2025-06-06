import "./Blog.scss";
import { ReactElement } from "react";

/**
 * Displays a placeholder section for the blog page with a heading indicating that content is forthcoming.
 *
 * @returns A React element containing a heading and an empty container.
 */
function Blog(): ReactElement {
  return (
    <section className="blog-container">
      <h2 className="section-header-center">Coming Soon...</h2>
      <div></div>
    </section>
  );
}

export default Blog;
