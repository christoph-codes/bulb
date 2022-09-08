import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import React, { useState, useEffect, ReactElement, Children } from 'react';
import { Url } from 'url';

export interface INavLinkProps extends LinkProps {
	children: ReactElement;
	activeClassName: string;
	newTab?: boolean;
	href: Url;
}

const NavLink = ({
	children,
	activeClassName,
	newTab,
	href,
	...props
}: INavLinkProps) => {
	const { asPath, isReady } = useRouter();

	const child = Children.only(children);
	const childClassName = child.props.className || '';
	const [className, setClassName] = useState(childClassName);

	useEffect(() => {
		// Check if the router fields are updated client-side
		if (isReady) {
			// Dynamic route will be matched via props.as
			// Static route will be matched via props.href
			const linkPathname = new URL(
				(props.as || href) as string,
				location.href,
			).pathname;

			// Using URL().pathname to get rid of query and hash
			const activePathname = new URL(asPath, location.href).pathname;

			const newClassName =
				linkPathname === activePathname
					? `${childClassName} ${activeClassName}`.trim()
					: childClassName;

			if (newClassName !== className) {
				setClassName(newClassName);
			}
		}
	}, [
		asPath,
		isReady,
		props.as,
		href,
		childClassName,
		activeClassName,
		setClassName,
		className,
	]);

	return (
		<Link href={href} target={newTab ? '_blank' : '_self'} {...props}>
			{React.cloneElement(child, {
				className: className || null,
			})}
		</Link>
	);
};

export default NavLink;
