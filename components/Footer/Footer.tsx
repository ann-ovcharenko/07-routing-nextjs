import css from "./Footer.module.css";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Anna Ovcharenko</p>
          <p>
            Contact us:
            <a href="mailto:anyutka1426@gmail.com">anyutka1426@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
