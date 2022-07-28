import { ReactNode, useState } from "react";
import { MdLightbulb, MdMenuOpen } from "react-icons/md";
import { BsPersonBadgeFill } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import styles from "./DashboardLayout.module.scss";
import Image from "next/image";
import NavLink from "../../components/NavLink";

export interface IDashboardLayoutProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

const DashboardLayout = ({
  title,
  className,
  children,
}: IDashboardLayoutProps) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  return (
    <div className={`${styles.DashboardLayout} ${className}`}>
      <aside
        className={`${styles.DashboardLayout__aside} ${
          isSideNavOpen ? "" : styles["DashboardLayout__aside--close"]
        }`}
      >
        <div className={styles.DashboardLayout__logoTab}>
          <img
            className={`${styles.DashboardLayout__logo} ${
              isSideNavOpen ? "" : styles["DashboardLayout__logo--close"]
            }`}
            src="/bulb_light_color.svg"
            alt="bulb Logo"
          />
          <button
            className={styles.DashboardLayout__hamburger}
            onClick={() => setIsSideNavOpen(!isSideNavOpen)}
          >
            {isSideNavOpen ? (
              <MdMenuOpen size={32} />
            ) : (
              <Image src="/bulb_icon.svg" alt="" width="48" height="48" />
            )}
          </button>
        </div>
        <ul
          className={`${styles.DashboardLayout__links} ${
            isSideNavOpen ? "" : styles["DashboardLayout__links--close"]
          }`}
        >
          <li>
            <NavLink
              activeClassName={styles["DashboardLayout__link--active"]}
              href="/dashboard"
            >
              <a>
                <MdLightbulb
                  className={`${styles.DashboardLayout__icon} ${
                    isSideNavOpen ? "" : styles["DashboardLayout__icon--close"]
                  }`}
                />
                {isSideNavOpen && " My Ideas"}
              </a>
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles["DashboardLayout__link--active"]}
              href="/dashboard/connections"
            >
              <a>
                <BsPersonBadgeFill
                  className={`${styles.DashboardLayout__icon} ${
                    isSideNavOpen ? "" : styles["DashboardLayout__icon--close"]
                  }`}
                />
                {isSideNavOpen && " Connections"}
              </a>
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles["DashboardLayout__link--active"]}
              href="/dashboard/settings"
            >
              <a>
                <FaCog
                  className={`${styles.DashboardLayout__icon} ${
                    isSideNavOpen ? "" : styles["DashboardLayout__icon--close"]
                  }`}
                />
                {isSideNavOpen && " Settings"}
              </a>
            </NavLink>
          </li>
        </ul>
        {isSideNavOpen && (
          <footer className={`${styles.DashboardLayout__footer}`}>
            <p>Copyright © {new Date().getFullYear()}</p>
          </footer>
        )}
      </aside>
      <div className={`${styles.DashboardLayout__container}`}>
        <header className={styles.DashboardLayout__header}>
          <h3>{title}</h3>
        </header>
        <main className={styles.DashboardLayout__main}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
