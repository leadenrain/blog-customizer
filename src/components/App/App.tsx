import { CSSProperties, useState } from 'react';
import styles from '../../styles/index.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColorOption.value,
					'--container-width': articleState.contentWidthArrOption.value,
					'--bg-color': articleState.backgroundColorOption.value,
				} as CSSProperties
			}>
			<ArticleParamsForm changeStyles={setArticleState} />
			<Article />
		</div>
	);
};
