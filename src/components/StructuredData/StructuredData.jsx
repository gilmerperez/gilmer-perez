/**
 * StructuredData Component
 * Renders JSON-LD structured data for SEO
 * Supports Person, WebSite, BreadcrumbList, and CreativeWork schemas
 */

export default function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
