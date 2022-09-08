import { useState } from 'react';
import { Url } from 'url';
import { useAuth } from '../../providers/AuthProvider';
import { TUtilityButton } from '../../templates/DashboardLayout';
import Button from '../Button/Button';
import NavLink from '../NavLink';
import styles from './DashboardHeader.module.scss';

export type TLink = {
	label: string;
	href: any;
};
export interface IDashboardHeaderProps {
	className?: string;
	title: string;
	utilityButtons?: TUtilityButton[];
}

const DashboardHeader = ({
	title,
	className,
	utilityButtons,
}: IDashboardHeaderProps) => {
	const { logout } = useAuth();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const links: TLink[] = [
		{
			label: 'Profile',
			href: '/profile',
		},
		{
			label: 'Help',
			href: '/help',
		},
	];
	return (
		<header
			className={`${styles.DashboardHeader} ${className}`}
			onClick={() => setDropdownOpen(false)}
		>
			<span>
				<h3>{title}</h3>
				{utilityButtons?.map((utility, index) => {
					return (
						<Button
							key={index}
							href={utility.href}
							onClick={utility.onClick}
							variant={utility.variant}
							chip={utility.chip}
						>
							{utility.label}
						</Button>
					);
				})}
			</span>
			<nav>
				<button
					className={styles['DashboardHeader__avatar']}
					onMouseOver={() => setDropdownOpen(true)}
					onClick={() => setDropdownOpen(!dropdownOpen)}
				>
					<img src='/bulb_avatar_placeholder.svg' alt='' />
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
													'DashboardHeader__link--active'
												]
											}
											href={link.href}
										>
											<a>{link.label}</a>
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
