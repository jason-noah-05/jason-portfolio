import Link from "next/link";
import { navigation } from "@/lib/data/navigation";
import { site } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";

export function Navigation() {
  return (
    <header className="site-header">
      <div className="site-header__inner fade-in" style={{ "--enter-delay": "0.1s" } as React.CSSProperties}>
        <Link href="/" className="nav-link" aria-label={`${site.name}, home`}>
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-10">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <MobileMenu items={navigation} />
      </div>
    </header>
  );
}