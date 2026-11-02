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
    <li key={link.href}><Link href={ link.href }>{ link.label }</Link></li>
  )

  return (
    <nav className="nav">
      <p>These are my links and what not</p>
      <ul>
        { navLinks }
      </ul>
    </nav>
  );
}
