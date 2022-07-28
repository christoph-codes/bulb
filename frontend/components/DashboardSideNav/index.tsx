import { ReactNode, useEffect, useState } from "react";
import { MdLightbulb, MdMenuOpen } from "react-icons/md";
import { BsPersonBadgeFill } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import styles from "./DashboardSideNav.module.scss";
import Image from "next/image";
import NavLink from "../../components/NavLink";
import { getWithExpiry, setWithExpiry } from "../../utils/helper";

export interface IDashboardSideNavProps {
  className?: string;
}

const DashboardSideNav = ({ className }: IDashboardSideNavProps) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(() => {
    const localSideNav = getWithExpiry("bulb_sidenav");
    console.log("isOpen? ", localSideNav);
    if (localSideNav !== undefined) {
      return localSideNav;
    } else {
      return true;
    }
  });

  useEffect(() => {
    setWithExpiry("bulb_sidenav", isSideNavOpen, 100000000);
  }, [isSideNavOpen]);
  return (
    <aside
      className={`${styles.DashboardSideNav__aside} ${className || ""} ${
        isSideNavOpen ? "" : styles["DashboardSideNav__aside--close"]
      }`}
    >
      <div className={styles.DashboardSideNav__logoTab}>
        <img
          className={`${styles.DashboardSideNav__logo} ${
            isSideNavOpen ? "" : styles["DashboardSideNav__logo--close"]
          }`}
          src="/bulb_light_color.svg"
          alt="bulb Logo"
        />
        <button
          className={styles.DashboardSideNav__hamburger}
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
        className={`${styles.DashboardSideNav__links} ${
          isSideNavOpen ? "" : styles["DashboardSideNav__links--close"]
        }`}
      >
        <li>
          <NavLink
            activeClassName={styles["DashboardSideNav__link--active"]}
            href="/dashboard"
          >
            <a>
              <MdLightbulb
                className={`${styles.DashboardSideNav__icon} ${
                  isSideNavOpen ? "" : styles["DashboardSideNav__icon--close"]
                }`}
              />
              {isSideNavOpen && " My Ideas"}
            </a>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles["DashboardSideNav__link--active"]}
            href="/dashboard/connections"
          >
            <a>
              <BsPersonBadgeFill
                className={`${styles.DashboardSideNav__icon} ${
                  isSideNavOpen ? "" : styles["DashboardSideNav__icon--close"]
                }`}
              />
              {isSideNavOpen && " Connections"}
            </a>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles["DashboardSideNav__link--active"]}
            href="/dashboard/settings"
          >
            <a>
              <FaCog
                className={`${styles.DashboardSideNav__icon} ${
                  isSideNavOpen ? "" : styles["DashboardSideNav__icon--close"]
                }`}
              />
              {isSideNavOpen && " Settings"}
            </a>
          </NavLink>
        </li>
      </ul>
      {isSideNavOpen && (
        <footer className={`${styles.DashboardSideNav__footer}`}>
          <p>Copyright © {new Date().getFullYear()}</p>
        </footer>
      )}
    </aside>
  );
};

export default DashboardSideNav;
