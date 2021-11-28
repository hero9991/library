import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import s from './Slider.module.css'
import StarRating from '../starRating/StarRating';
import { NavLink } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Autoplay])

function Slider({ isBlackFont }) {
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch('/books', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setBooks(data))
    }, [])

    const params = {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            clickable: true,
            // dynamicBullets: true,
            // dynamicMainBullets: 10
        },
        spaceBetween: 10,
        slidesPerView: 4,
        slidesPerGroup: 4,
        allowTouchMove: true,
        shortSwipes: false,
        longSwipesRatio: 0.1,
        longSwipesMs: 1,
        speed: 500,
        breakpoints: {
            320: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 10,
                allowTouchMove: true
            },
            482: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            640: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            // 768: {
            //     slidesPerView: 4,
            //     slidesPerGroup: 4,
            //     // allowTouchMove: false
            // },
            992: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                // allowTouchMove: false,
                spaceBetween: 14,
            },
            1081: {
                // allowTouchMove: false,
                spaceBetween: 17
            },
            1200: {
                // allowTouchMove: false,
                spaceBetween: 21
            },
            1271: {
                // allowTouchMove: false,
                spaceBetween: 24
            },
            1401: {
                // allowTouchMove: false,    
                spaceBetween: 27
            },
            1601: {
                // allowTouchMove: false,
                spaceBetween: 30
            }
        }
    }

    return (
        <div className={`${s.slider} ${isBlackFont ? s.blackFont : s.whiteFont + ' whiteFont'}`}>
            <h2 className={s.topic}>{isBlackFont ? 'Armenian history' : 'Armenian literature'}</h2>
            <div className={s.books}>
                <Swiper id='main' wrapperTag="ul" className={s.swiper} {...params}>
                    {books.map(item => <SwiperSlide key={`test ${Math.random()}`} tag="li">
                        <NavLink exact to="/book"><img className={s.bookItem} src={require(`../../assets/booksCover/${item.cover}.jpeg`).default} alt="no img" /></NavLink>
                        <StarRating />
                        <p className={s.title}>{item.title}</p>
                        <p className={s.author}>{item.author}</p>
                    </SwiperSlide>)}
                    <div className={`swiper-button-prev ${s.prevButton}`}></div>
                    <div className={`swiper-button-next ${s.nextButton}`}></div>
                </Swiper>
            </div>
        </div>
    )
}

export default Slider