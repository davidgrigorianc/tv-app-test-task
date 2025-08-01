import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';

import type { Video } from '../../types';

interface TrendingCarouselProps {
    videos: Video[];
    onSelect: (video: Video) => void;
}

const TrendingCarousel: React.FC<TrendingCarouselProps> = ({ videos, onSelect }) => {
    return (
        <section className="mt-8">
            <h3 className="mb-4 text-xl font-semibold">Trending Now</h3>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={8}
                className="h-[300px]"
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={true}
            >
                {videos.slice(0, 50).map((video) => (
                    <SwiperSlide
                        key={video.Id}
                        onClick={() => onSelect(video)}
                        className="cursor-pointer"
                    >
                        <img
                            src={`/assets/${video.CoverImage}`}
                            alt={video.Title}
                            className="h-[296px] w-full rounded object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};
export default TrendingCarousel;
