export async function GET() {
  const baseUrl = "https://taxsahi.com";

  const staticPages = [
    "",
    "/tools/calculator",
    "/blog"
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `<url>
  <loc>${baseUrl}${page}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>${page === "" ? "1.0" : "0.8"}</priority>
</url>`
  )
  .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
