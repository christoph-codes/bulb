import { ReactNode, useLayoutEffect, useRef } from "react";
import Button from "../Button/Button";
import styles from "./Modal.module.scss";

export interface IModalProps {
	children: ReactNode;
	open: boolean;
}

const Modal = ({ children, open }: IModalProps) => {
	const modalRef = useRef<HTMLDialogElement>(null);
	const toggleModal = () => {
		if (modalRef.current?.open) {
			modalRef?.current?.close();
		} else {
			modalRef?.current?.showModal();
		}
	};
	useLayoutEffect(() => {
		toggleModal();
	}, [open]);
	return (
		<dialog ref={modalRef} className={styles.Modal}>
			{children}
			<Button onClick={() => toggleModal()}>Close</Button>
		</dialog>
	);
};

export default Modal;
