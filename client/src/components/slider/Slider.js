import React, { useState } from 'react'
import { covers } from '../../utility/BooksData'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation, Pagination} from 'swiper'
import 'swiper/swiper-bundle.min.css'
import s from './Slider.module.css'

SwiperCore.use(Navigation, Pagination)

function Slider() {

    return (
        <div className={s.slider}>
            <h2 className={s.topic}>Books about Armenian history</h2>
            <div className={s.books}>
                <Swiper id='main' wrapperTag="ul" classNmae={s.swiper} navigation pagination={{ clickable: true }} spaceBetween={1} slidesPerView={3}>
                    {covers.map(item => <SwiperSlide key={`test ${Math.random()}`} tag="li">
                        <img className={s.bookItem} src={item.cover} alt="no img" />
                    </SwiperSlide>)}
                </Swiper>
            </div>
        </div>
    )
}

export default Slider