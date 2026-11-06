"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Home" },
  { href: "/fellowship", label: "Fellowship" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/compendium", label: "Compendium" },
  { href: "/gamemasters", label: "Gamemasters" },
]

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white p-1.5">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={isActive(pathname, link.href) ? "page" : undefined}
          className="rounded-full px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 aria-[current=page]:bg-neutral-900 aria-[current=page]:text-white aria-[current=page]:hover:bg-neutral-900"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
