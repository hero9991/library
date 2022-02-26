import React from 'react'
import s from './HomeBodyItem.module.css'
import Slider from '../slider/Slider'
import { CONTAINER } from '../../utility/Constants'

const HomeBodyItem = ({ isWhiteBack }: Props) => {
    return (
        <section className={`${s.homeBodyItem} ${isWhiteBack ? s.whiteBack : s.blackBack}`}>
            <div className={CONTAINER}>
                <Slider isBlackFont={isWhiteBack} />
            </div>
        </section>
    )
}

interface Props {
	isWhiteBack: boolean
}

export default HomeBodyItem