import React, { useState } from 'react'
import { covers } from '../../utility/BooksData'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import s from './Slider.module.css'

SwiperCore.use(Navigation, Pagination)

function Slider({ isBlackFont }) {
    const params = {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        spaceBetween: 80,
        slidesPerView: 3
    }

    return (
        <div className={`${s.slider} ${isBlackFont ? s.blackFont : s.whiteFont}`}>
            <h2 className={s.topic}>{isBlackFont ? 'Armenian history' : 'Armenian literature'}</h2>
            <div className={s.books}>
                <Swiper id='main' wrapperTag="ul" classNmae={s.swiper} {...params}>
                    {covers.map(item => <SwiperSlide key={`test ${Math.random()}`} tag="li">
                        <img className={s.bookItem} src={item.cover} alt="no img" />
                    </SwiperSlide>)}
                    <div class={`swiper-button-prev ${s.prevButton}`}></div>
                    <div class={`swiper-button-next ${s.nextButton}`}></div>
                </Swiper>
            </div>
        </div>
    )
}

export default Slider