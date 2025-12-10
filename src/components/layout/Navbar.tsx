"use client";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-sm border-b border-muted" : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16">
          <a href="#home" className="font-semibold text-foreground">
            RF
          </a>

          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
