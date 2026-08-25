/**
 * NotFound — 404 page for unmatched routes.
 *
 * Route: unmatched paths
 * Dependencies: Navbar, Footer
 */

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="text-6xl font-semibold" style={{ color: "#2a2722" }}>
          404
        </p>
        <h1 className="mt-4 text-lg font-semibold">Page not found</h1>
        <p className="mt-2 text-sm" style={{ color: "#999" }}>
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-md px-5 py-2.5 text-sm text-white"
          style={{ backgroundColor: "#E8614D" }}
        >
          Go home
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
