import { memo } from 'react'
import s from '../Books.module.css'
import { NavLink } from 'react-router-dom'
import { BsArrowDownSquare } from 'react-icons/bs'
import { topicTranslations } from '../translatedText/translatedText'
import { CATALOG_HISTORY_URL, CATALOG_LITERATURE_URL, CONTAINER, SORT_PARAMETER, TOPIC_PARAMETER } from '../../../utility/Constants'
import { language, sortingTopics, topics } from '../../../utility/commonTypes'

const Sorting = memo(({ currentSort, currentTopic, language, isReversed, setIsReversed, isLiterature }: Props) => {
    const sortingTopics: sortingTopics[] = ['byPopularity', 'byRating', 'byAlphabet']
    const topics: topics[] = isLiterature 
        ? ['all', 'artisticWorks', 'epics', 'poems', 'memoirs', 'rhymes'] 
        : ['all', 'historicalNovels', 'sovietHistoriography', 'prerevolutionaryHistoriography', 'partyLiterature' ]
    const url = isLiterature ? CATALOG_LITERATURE_URL : CATALOG_HISTORY_URL

    return (
        <div className={s.sortingWrapper}>
            <div className={`${s.sortingScroll} ${CONTAINER}`}>
                <div className={s.sorting}>
                    <BsArrowDownSquare onClick={() => setIsReversed(!isReversed)} className={isReversed ? `${s.sortingDirection} ${s.reverse}` : s.sortingDirection} /> 
                    {sortingTopics.map(topic => <NavLink key={topic} isActive={() => currentSort === topic} exact activeClassName={s.activeOrder}
                        to={`${url}?${SORT_PARAMETER}${topic}&${TOPIC_PARAMETER}${currentTopic}`}>{topicTranslations[language][topic]}</NavLink>)}
                </div>
                <div className={`${s.sorting} ${s.topics}`}>
                    {topics.map(topic => <NavLink key={topic} isActive={() => currentTopic === topic} exact activeClassName={s.activeTopic}
                        to={`${url}?${SORT_PARAMETER}${currentSort}&${TOPIC_PARAMETER}${topic}`}>{topicTranslations[language][topic]}</NavLink>)}
                </div>
            </div>
        </div>
    )
})

interface Props {
	currentSort: string | null
    currentTopic: string | null
    language: language
    isReversed: boolean
    setIsReversed: any
    isLiterature: boolean
}

export default Sorting