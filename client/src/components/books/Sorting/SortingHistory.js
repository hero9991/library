import React, { memo } from 'react'
import s from '../Books.module.css'
import { NavLink } from 'react-router-dom'
import { BsArrowDownSquare } from 'react-icons/bs'
import { getAllBooksText, getAncientText, getByAlphabetText, getByPopularityText, getByRatingText, getMeidevalText, getNationalMovementText, getPrehistoricEraText, getUrartuText } from '../translatedText/translatedText'
import { CONTAINER, CATALOG_HISTORY_URL, SORT_PARAMETER, TOPIC_PARAMETER } from '../../../utility/Constants'

const SortingHistory = memo(({ currentSort, currentTopic, language, isReversed, setIsReversed }) => {

    return (
        <div className={s.sortingWrapper}>
            <div className={`${s.sortingScroll} ${CONTAINER}`}>
                <div className={s.sorting}>
                    <BsArrowDownSquare onClick={() => setIsReversed(!isReversed)} className={isReversed ? `${s.sortingDirection} ${s.reverse}` : s.sortingDirection} />
                    <NavLink isActive={() => currentSort === 'byPopularity'} exact activeClassName={s.activeOrder}
                        to={`${CATALOG_HISTORY_URL}?${SORT_PARAMETER}byPopularity&${TOPIC_PARAMETER}${currentTopic}`}>{getByPopularityText(language)}</NavLink>
                    <NavLink isActive={() => currentSort === 'byRating'} exact activeClassName={s.activeOrder}
                        to={`${CATALOG_HISTORY_URL}?${SORT_PARAMETER}byRating&${TOPIC_PARAMETER}${currentTopic}`}>{getByRatingText(language)}</NavLink>
                    <NavLink isActive={() => currentSort === 'byAlphabet'} exact activeClassName={s.activeOrder}
                        to={`${CATALOG_HISTORY_URL}?${SORT_PARAMETER}byAlphabet&${TOPIC_PARAMETER}${currentTopic}`}>{getByAlphabetText(language)}</NavLink>
                </div>
                <div className={`${s.sorting} ${s.topics}`}>
                    <NavLink isActive={() => currentTopic === 'all'} exact activeClassName={s.activeTopic}
                        to={`${CATALOG_HISTORY_URL}?${SORT_PARAMETER}${currentSort}&${TOPIC_PARAMETER}all`}>{getAllBooksText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'prehistoricEra'} exact activeClassName={s.activeTopic}
                        to={`${CATALOG_HISTORY_URL}?${SORT_PARAMETER}${currentSort}&${TOPIC_PARAMETER}prehistoricEra`}>{getPrehistoricEraText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'urartu'} exact activeClassName={s.activeTopic}
                        to={`${CATALOG_HISTORY_URL}?${SORT_PARAMETER}${currentSort}&${TOPIC_PARAMETER}urartu`} >{getUrartuText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'ancientArmenia'} exact activeClassName={s.activeTopic}
                        to={`${CATALOG_HISTORY_URL}?${SORT_PARAMETER}${currentSort}&${TOPIC_PARAMETER}ancientArmenia`} >{getAncientText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'meidevalArmenia'} exact activeClassName={s.activeTopic}
                        to={`${CATALOG_HISTORY_URL}?${SORT_PARAMETER}${currentSort}&${TOPIC_PARAMETER}meidevalArmenia`} >{getMeidevalText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'nationalMovement'} exact activeClassName={s.activeTopic}
                        to={`${CATALOG_HISTORY_URL}?${SORT_PARAMETER}${currentSort}&${TOPIC_PARAMETER}nationalMovement`} >{getNationalMovementText(language)}</NavLink>
                </div>
            </div>
        </div>
    )
})

export default SortingHistory