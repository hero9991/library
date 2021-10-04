import React, { useState } from 'react'
import { covers } from '../../utility/BooksData'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import s from './Slider.module.css'

function Slider() {
    const [thumbSwiper, setThumbSwiper] = useState(null);

    return (
        <div className={s.slider}>
            <h2 className={s.topic}>Topic</h2>
            <div className={s.books}>
                <Swiper classNmae={s.swiper} navigation pagination spaceBetween={1} slidesPerView={3} onSwiper={setThumbSwiper}>
                    {covers.map(item => <SwiperSlide tag='li'>
                        <img className={s.bookItem} src={item.cover} alt="no img" />
                    </SwiperSlide>)}
                </Swiper>
            </div>
        </div>
    )
}

export default Slider