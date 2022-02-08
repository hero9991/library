import React from 'react'
import s from '../Books.module.css'
import { NavLink } from 'react-router-dom'
import { BsArrowDownSquare } from 'react-icons/bs'
import { get19CenturyText, getAllBooksText, getByAlphabetText, getByPopularityText, getByRatingText, getModernText, getSovietText } from '../translatedText/translatedText'
import { toast } from 'react-toastify'

const SortingLiterature = ({ currentSort, currentTopic, language, isReversed, setIsReversed }) => {
    return (
        <div className={s.sortingWrapper}>
            <div className={`${s.sortingScroll} container`}>
                <div className={s.sorting}>
                    <BsArrowDownSquare onClick={() => setIsReversed(!isReversed)} className={isReversed ? `${s.sortingDirection} ${s.reverse}` : s.sortingDirection} />
                    <NavLink isActive={() => currentSort === 'byPopularity'} exact activeClassName={s.activeOrder}
                        to={`/catalog/literature?sort=byPopularity&topic=${currentTopic}`}>{getByPopularityText(language)}</NavLink>
                    <NavLink isActive={() => currentSort === 'byRating'} exact activeClassName={s.activeOrder}
                        to={`/catalog/literature?sort=byRating&topic=${currentTopic}`}>{getByRatingText(language)}</NavLink>
                    <NavLink isActive={() => currentSort === 'byAlphabet'} exact activeClassName={s.activeOrder}
                        to={`/catalog/literature?sort=byAlphabet&topic=${currentTopic}`}>{getByAlphabetText(language)}</NavLink>
                </div>
                <div className={`${s.sorting} ${s.topics}`}>
                    <NavLink isActive={() => currentTopic === 'all'} exact activeClassName={s.activeTopic}
                        to={`/catalog/literature?sort=${currentSort}&topic=all`}>{getAllBooksText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'sovietUnionPeriod'} exact activeClassName={s.activeTopic}
                        to={`/catalog/literature?sort=${currentSort}&topic=sovietUnionPeriod`}>{getSovietText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'modern'} exact activeClassName={s.activeTopic}
                        to={`/catalog/literature?sort=${currentSort}&topic=modern`} >{getModernText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === '19century'} exact activeClassName={s.activeTopic}
                        to={`/catalog/literature?sort=${currentSort}&topic=19century`} >{get19CenturyText(language)}</NavLink>
                </div>
            </div>
        </div>
    )
}

export default SortingLiterature