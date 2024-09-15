import { useEffect } from 'react';

type UseClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useClose = ({ isOpen, rootRef, onClose, onChange }: UseClose) => {
	useEffect(() => {
		if (!isOpen) return;
		const handleOutsideClickClose = (evt: MouseEvent) => {
			const { target } = evt;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		const handleCloseByEsc = (evt: KeyboardEvent) => {
			if (evt.key === 'Escape') {
				onChange?.(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClickClose);
		document.addEventListener('keydown', handleCloseByEsc);
	}, [isOpen]);
};
