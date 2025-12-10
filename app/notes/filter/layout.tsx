import React from "react";
import css from './FilterLayout.module.css'; 

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div className={css.layoutContainer}>
      <div className={css.mainLayout}>
        <aside>{sidebar}</aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
