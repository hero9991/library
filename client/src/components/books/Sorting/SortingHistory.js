import React from 'react'
import s from '../Books.module.css'
import { NavLink } from 'react-router-dom'
import { BsArrowDownSquare } from 'react-icons/bs'
import { getAllBooksText, getAncientText, getByAlphabetText, getByPopularityText, getByRatingText, getMeidevalText, getNationalMovementText, getPrehistoricEraText, getUrartuText } from '../translatedText/translatedText'
import { toast } from 'react-toastify'

const SortingHistory = ({ currentSort, currentTopic, language, isReversed, setIsReversed }) => {
    return (
        <div className={s.sortingWrapper}>
            <div className={`${s.sortingScroll} container`}>
                <div className={s.sorting}>
                    <BsArrowDownSquare onClick={() => setIsReversed(!isReversed)} className={isReversed ? `${s.sortingDirection} ${s.reverse}` : s.sortingDirection} />
                    <NavLink isActive={() => currentSort === 'byPopularity'} exact activeClassName={s.activeOrder}
                        to={`/catalog/history?sort=byPopularity&topic=${currentTopic}`}>{getByPopularityText(language)}</NavLink>
                    <NavLink isActive={() => currentSort === 'byRating'} exact activeClassName={s.activeOrder}
                        to={`/catalog/history?sort=byRating&topic=${currentTopic}`}>{getByRatingText(language)}</NavLink>
                    <NavLink isActive={() => currentSort === 'byAlphabet'} exact activeClassName={s.activeOrder}
                        to={`/catalog/history?sort=byAlphabet&topic=${currentTopic}`}>{getByAlphabetText(language)}</NavLink>
                </div>
                <div className={`${s.sorting} ${s.topics}`}>
                    <NavLink isActive={() => currentTopic === 'all'} exact activeClassName={s.activeTopic}
                        to={`/catalog/history?sort=${currentSort}&topic=all`}>{getAllBooksText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'prehistoricEra'} exact activeClassName={s.activeTopic}
                        to={`/catalog/history?sort=${currentSort}&topic=prehistoricEra`}>{getPrehistoricEraText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'urartu'} exact activeClassName={s.activeTopic}
                        to={`/catalog/history?sort=${currentSort}&topic=urartu`} >{getUrartuText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'ancientArmenia'} exact activeClassName={s.activeTopic}
                        to={`/catalog/history?sort=${currentSort}&topic=ancientArmenia`} >{getAncientText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'meidevalArmenia'} exact activeClassName={s.activeTopic}
                        to={`/catalog/history?sort=${currentSort}&topic=meidevalArmenia`} >{getMeidevalText(language)}</NavLink>
                    <NavLink isActive={() => currentTopic === 'nationalMovement'} exact activeClassName={s.activeTopic}
                        to={`/catalog/history?sort=${currentSort}&topic=nationalMovement`} >{getNationalMovementText(language)}</NavLink>
                </div>
            </div>
        </div>
    )
}

export default SortingHistory