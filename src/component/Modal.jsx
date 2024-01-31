import { useImperativeHandle, useRef, forwardRef } from 'react';

const Modal = forwardRef(function Modal({ children }, ref) {
	const modal = useRef();

	useImperativeHandle(ref, () => {
		return {
			open: () => {
				modal.current.showModal();
			},
			close: () => {
				modal.current.close();
			},
		};
	});

	return <dialog ref={modal}>{children}</dialog>;
});

export default Modal;
