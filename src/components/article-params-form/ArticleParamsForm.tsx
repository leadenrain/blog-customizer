import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import {
	ArticleStateType,
	backgroundColorOptions,
	contentWidthArrOptions,
	defaultArticleState,
	fontColorOptions,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from '../../constants/articleProps';

import { useClose } from './hooks/useClose';

import { ArrowButton } from 'components/arrow-button';
import { Button } from '../button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type FormProps = Dispatch<SetStateAction<ArticleStateType>>;

export const ArticleParamsForm: FC<{ changeStyles: FormProps }> = ({
	changeStyles,
}) => {
	const [isSidebarOpen, seIsSidebarOpen] = useState<boolean>(false);
	const [options, setOptions] = useState<ArticleStateType>(defaultArticleState);

	const onArrowButtonClick = () => {
		seIsSidebarOpen((state: typeof isSidebarOpen) => !state);
	};

	const sidebarRef = useRef<HTMLDivElement>(null);
	const handleClose = () => {
		seIsSidebarOpen(false);
	};

	useClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onClose: handleClose,
		onChange: seIsSidebarOpen,
	});

	const changeOption = (
		optionKey: keyof ArticleStateType,
		optionType: OptionType
	) => {
		setOptions({ ...options, [optionKey]: optionType });
	};

	const resetOptions = () => {
		setOptions(defaultArticleState);
		changeStyles(defaultArticleState);
	};

	const applyOptions = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		changeStyles(options);
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton isOpen={isSidebarOpen} onClick={onArrowButtonClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onReset={resetOptions}
					onSubmit={applyOptions}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={options.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => changeOption('fontFamilyOption', option)}
					/>
					<RadioGroup
						title='Размер шрифта'
						name={''}
						selected={options.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => changeOption('fontSizeOption', option)}
					/>
					<Select
						title='Цвет шрифта'
						selected={options.fontColorOption}
						options={fontColorOptions}
						onChange={(option) => changeOption('fontColorOption', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={options.backgroundColorOption}
						options={backgroundColorOptions}
						onChange={(option) => changeOption('backgroundColorOption', option)}
					/>
					<Select
						title='Ширина контента'
						selected={options.contentWidthArrOption}
						options={contentWidthArrOptions}
						onChange={(option) => changeOption('contentWidthArrOption', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
