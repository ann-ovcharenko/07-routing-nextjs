"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./SidebarNotes.module.css";

const tags = ["Work", "Personal", "Ideas", "Learning"];

export default function SidebarNotes() {
  const pathname = usePathname();

  const getLinkClassName = (href: string) => {
    return `${css.menuLink} ${pathname === href ? css.active : ""}`;
  };

  return (
    <nav className={css.menuNav}>
      <h3 className={css.menuHeader}>Filter by Tag</h3>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link
            href={`/notes/filter/all`}
            className={getLinkClassName(`/notes/filter/all`)}
          >
            All notes
          </Link>
        </li>

        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={getLinkClassName(`/notes/filter/${tag}`)}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
