/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // * The old multi-page routes now live as sections on the single home page.
  // Permanent redirects keep old links and search results working.
  async redirects() {
    return [
      { source: "/about", destination: "/#experience", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/project-page/:id", destination: "/#projects", permanent: true },
    ];
  },
};

export default nextConfig;
