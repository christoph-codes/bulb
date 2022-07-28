import { ReactNode } from "react";
import styles from "./DashboardLayout.module.scss";
import DashboardSideNav from "../../components/DashboardSideNav";

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
  return (
    <div className={`${styles.DashboardLayout} ${className}`}>
      <DashboardSideNav />
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
