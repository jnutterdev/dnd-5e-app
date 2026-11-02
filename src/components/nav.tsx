import Link from 'next/link'

export default function Navigation() {

  return (
    <nav className="nav">
      <p>These are my links and what not</p>
      <ul>
        <li>
          <Link href="/">Home</Link>
          <Link href="/fellowship">Fellowship</Link>
          <Link href="/campaigns">Campaigns</Link>
        </li>
      </ul>
    </nav>
  );
}
