import { useEffect, useState } from "react";
import NavLink from "../NavLink";
import styles from "./DashboardHeader.module.scss";

export interface IDashboardHeaderProps {
	className?: string;
	title: string;
}
type TLink = {
	name: string;
	path: string;
	newTab?: boolean;
};

const DashboardHeader = ({ title, className }: IDashboardHeaderProps) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const links: TLink[] = [
		{
			name: "Profile",
			path: "/profile",
			newTab: false,
		},
		{
			name: "Help",
			path: "/help",
			newTab: true,
		},
		{
			name: "Logout",
			path: "/logout",
			newTab: false,
		},
	];
	return (
		<header
			className={`${styles.DashboardHeader} ${className}`}
			onClick={() => setDropdownOpen(false)}
		>
			<h3>{title}</h3>
			<nav>
				<button
					className={styles["DashboardHeader__avatar"]}
					onMouseOver={() => setDropdownOpen(true)}
					onClick={() => setDropdownOpen(!dropdownOpen)}
				>
					<img src="/bulb_avatar_placeholder.svg" alt="" />
					{dropdownOpen && (
						<ul
							onMouseLeave={() => setDropdownOpen(false)}
							className={styles.DashboardHeader__dropdown}
						>
							{links.map((link, index) => {
								return (
									<li key={index}>
										<NavLink
											activeClassName={
												styles[
													"DashboardHeader__link--active"
												]
											}
											href={link.path}
											newTab={link.newTab}
										>
											<a>{link.name}</a>
										</NavLink>
									</li>
								);
							})}
						</ul>
					)}
				</button>
			</nav>
		</header>
	);
};

export default DashboardHeader;
