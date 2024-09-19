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

	const changeOption = (
		optionKey: keyof ArticleStateType,
		optionType: OptionType
	) => {
		setOptions({ ...options, [optionKey]: optionType });
	};

	const onFontFamilyChange = (selectedOption: OptionType) => {
		changeOption('fontFamilyOption', selectedOption);
	};

	const onFontSizeChange = (selectedOption: OptionType) => {
		changeOption('fontSizeOption', selectedOption);
	};

	const onFontColorChange = (selectedOption: OptionType) => {
		changeOption('fontColorOption', selectedOption);
	};

	const onBackgroundColorChange = (selectedOption: OptionType) => {
		changeOption('backgroundColorOption', selectedOption);
	};

	const onContentWidthArrChange = (selectedOption: OptionType) => {
		changeOption('contentWidthArrOption', selectedOption);
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
						onChange={onFontFamilyChange}
					/>
					<RadioGroup
						title='Размер шрифта'
						name={''}
						selected={options.fontSizeOption}
						options={fontSizeOptions}
						onChange={onFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						selected={options.fontColorOption}
						options={fontColorOptions}
						onChange={onFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={options.backgroundColorOption}
						options={backgroundColorOptions}
						onChange={onBackgroundColorChange}
					/>
					<Select
						title='Ширина контента'
						selected={options.contentWidthArrOption}
						options={contentWidthArrOptions}
						onChange={onContentWidthArrChange}
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
