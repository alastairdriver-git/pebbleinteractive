"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Inbox, Package } from "lucide-react";

const LINKS = [
  { href: "/", label: "Schedule", icon: CalendarDays },
  { href: "/products", label: "Products", icon: Package },
  { href: "/leads", label: "Leads", icon: Inbox },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="studio-nav" aria-label="Studio">
      {LINKS.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>
          <Icon size={18} strokeWidth={2} aria-hidden="true" />{label}
        </Link>
      ))}
    </nav>
  );
}
