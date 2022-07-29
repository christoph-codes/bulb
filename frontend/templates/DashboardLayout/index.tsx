import { ReactElement, ReactNode } from "react";
import styles from "./DashboardLayout.module.scss";
import DashboardSideNav from "../../components/DashboardSideNav";
import DashboardHeader from "../../components/DashboardHeader";
import { IButtonProps } from "../../components/Button/Button";

export type TUtilityButton = {
	label?: string | ReactElement;
	onClick?: () => void;
	href?: string;
	variant?: IButtonProps["variant"];
	chip?: IButtonProps["chip"];
};
export interface IDashboardLayoutProps {
	title: string;
	children?: ReactNode;
	className?: string;
	utilityButtons?: TUtilityButton[];
}

const DashboardLayout = ({
	title,
	className,
	children,
	utilityButtons,
}: IDashboardLayoutProps) => {
	return (
		<div className={`${styles.DashboardLayout} ${className}`}>
			<DashboardSideNav />
			<div className={`${styles.DashboardLayout__container}`}>
				<DashboardHeader
					title={title}
					utilityButtons={utilityButtons}
				/>
				<main className={styles.DashboardLayout__main}>{children}</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
