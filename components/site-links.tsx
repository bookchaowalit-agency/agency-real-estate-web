// Shared footer links for the hub, privacy, public status and contact. The home page's readiness note links to
// the agency portfolio so visitors can see the broader set of verticals.
export const hubHref = 'https://bookchaowalit.com/';
export const contactHref = 'mailto:bookchaowalit.work@gmail.com';
export const portfolioHref = 'https://agency.bookchaowalit.com/agencies';

export default function SiteLinks() {
  return (
    <nav className="site-links" aria-label="ลิงก์เว็บไซต์">
      <a href={hubHref}>bookchaowalit.com</a>
      <a href="https://bookchaowalit.com/privacy">Privacy</a>
      <a href="https://monitor.bookchaowalit.com/">Status</a>
      <a href={contactHref}>Contact</a>
    </nav>
  );
}
