import Link from 'next/link'

export default function Navigation() {

  const links = [
    { href: "/", label: "Home" },
    { href: "/fellowship", label: "Fellowship" },
    { href: "/campaigns", label: "Campaigns" },
    { href: "/compendium", label: "Compendium"},
    { href: "/gamemasters", label: "Gamemasters"},
  ];

  const navLinks = links.map(link =>
    <Link key={link.href}  href={link.href} className="py-3 px-4 inline-flex items-center gap-2 bg-layer
      text-sm text-layer-foreground font-medium rounded-lg shadow-2xs focus:outline-hidden">{link.label}</Link>
  )

  return (
    <div className="flex bg-surface hover:bg-surface-hover rounded-lg p-1">
      <nav className="flex gap-x-2">
        { navLinks }
      </nav>
    </div>
  );
}
