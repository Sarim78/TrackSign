/**
 * BlogPage — placeholder for product and contract-review posts.
 *
 * Route: /blog
 * Dependencies: Navbar, Footer
 */

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const BlogPage = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        <h1 className="mb-4 text-3xl font-semibold">Blog</h1>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          Insights on contracts, negotiation tips, and product updates.
        </p>
        {/* TODO [BACKEND]: Replace with real blog posts or integrate a CMS */}
        <div
          className="mt-8 rounded-xl p-12 text-center"
          style={{ backgroundColor: "#1e1c18", border: "1px solid #2a2722" }}
        >
          <p className="text-sm" style={{ color: "#999" }}>
            No posts yet. Check back soon.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
