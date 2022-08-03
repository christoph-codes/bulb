import { ReactNode, useLayoutEffect, useRef } from "react";
import Button from "../Button/Button";
import styles from "./Modal.module.scss";

export interface IModalProps {
	children: ReactNode;
	open: boolean;
	setOpen: (x: boolean) => void;
}

const Modal = ({ children, open, setOpen }: IModalProps) => {
	if (open) {
		document.body.style.overflow = "hidden";
		return (
			<div className={styles.Modal}>
				<div className={styles.Modal__content}>
					{children}
					<Button onClick={() => setOpen(false)}>Close</Button>
				</div>
				<div className={styles.Modal__backdrop}></div>
			</div>
		);
	}
	return null;
};

export default Modal;
