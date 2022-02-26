import React, { memo } from 'react'
import s from '../Books.module.css'
import { NavLink } from 'react-router-dom'
import { BsArrowDownSquare } from 'react-icons/bs'
import { get19CenturyText, getAllBooksText, getByAlphabetText, getByPopularityText, getByRatingText, getModernText, getSovietText } from '../translatedText/translatedText'
import { CATALOG_LITERATURE_URL, CONTAINER, SORT_PARAMETER, TOPIC_PARAMETER } from '../../../utility/Constants'
import { language } from '../../../utility/commonTypes'

const SortingLiterature = memo(({ currentSort, currentTopic, language, isReversed, setIsReversed }: Props) => {

    return (
        <div className={s.sortingWrapper}>
            <div className={`${s.sortingScroll} ${CONTAINER}`}>
                <div className={s.sorting}>
                    <BsArrowDownSquare onClick={() => setIsReversed(!isReversed)} className={isReversed ? `${s.sortingDirection} ${s.reverse}` : s.sortingDirection} />
                    <NavLink isActive={() => currentSort === 'byPopularity'} exact activeClassName={s.activeOrder}
                        to={`${CATALOG_LITERATURE_URL}?${SORT_PARAMETER}byPopularity&${TOPIC_PARAMETER}${currentTopic}`}>{getByPopularityText(language)}</NavLink>
                    <NavLink isActive={() => currentSort === 'byRating'} exact activeClassName={s.activeOrder}
                        to={`${CATALOG_LITERATURE_URL}?${SORT_PARAMETER}byRating&${TOPIC_PARAMETER}${currentTopic}`}>{getByRatingText(language)}</NavLink>
                    <NavLink isActive={() => currentSort === 'byAlphabet'} exact activeClassName={s.activeOrder}
                        to={`${CATALOG_LITERATURE_URL}?${SORT_PARAMETER}byAlphabet&${TOPIC_PARAMETER}${currentTopic}`}>{getByAlphabetText(language)}</NavLink>
                </div>
                <div className={`${s.sorting} ${s.topics}`}>
                    <NavLink isActive={() => currentTopic === 'all'} exact activeClassName={s.activeTopic}
                        to={`${CATALOG_LITERATURE_URL}?${SORT_PARAMETER}${currentSort}&${TOPIC_PARAMETER}all`}>{getAllBooksText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'sovietUnionPeriod'} exact activeClassName={s.activeTopic}
                        to={`${CATALOG_LITERATURE_URL}?${SORT_PARAMETER}${currentSort}&${TOPIC_PARAMETER}sovietUnionPeriod`}>{getSovietText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'modern'} exact activeClassName={s.activeTopic}
                        to={`${CATALOG_LITERATURE_URL}?${SORT_PARAMETER}${currentSort}&${TOPIC_PARAMETER}modern`} >{getModernText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === '19century'} exact activeClassName={s.activeTopic}
                        to={`${CATALOG_LITERATURE_URL}?${SORT_PARAMETER}${currentSort}&${TOPIC_PARAMETER}19century`} >{get19CenturyText(language)}</NavLink>
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
}

export default SortingLiterature