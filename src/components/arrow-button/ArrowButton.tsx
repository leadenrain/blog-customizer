import arrowSvg from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import { FC } from 'react';
import clsx from 'clsx';

type ArrowProps = {
	onClick: () => void;
	isOpen: boolean;
};

export const ArrowButton: FC<ArrowProps> = ({ isOpen, onClick }) => {
	return (
		<button
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpen && styles.container_open)}
			onClick={onClick}>
			<img
				src={arrowSvg}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</button>
	);
};
