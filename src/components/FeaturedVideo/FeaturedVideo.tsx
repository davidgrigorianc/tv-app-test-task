import React, {useEffect, useState} from 'react';
import type {Video} from '../../types';

interface Props {
    video: Video;
}

const FeaturedVideo: React.FC<Props> = ({video}) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
        setIsVideoPlaying(false);
        const timeout = setTimeout(() => {
            if (video.VideoUrl) {
                setIsVideoPlaying(true);
            }
        }, 2000);

        return () => clearTimeout(timeout);
    }, [video]);

    return (
        <section className="relative h-full min-h-[600px] w-full overflow-hidden">
            {isVideoPlaying ? (
                <video
                    className="absolute h-full w-full object-cover"
                    src={video.VideoUrl}
                    autoPlay
                    muted
                    loop
                />
            ) : (
                <>
                    <img
                        className="object- absolute inset-0 h-full w-full"
                        src={`/assets/${video.CoverImage}`}
                        alt={video.Title}
                    />
                    <div className="relative z-10 flex h-full flex-col justify-center px-6 py-10 text-white">
                        <div
                            className="mb-2 text-[24px] leading-[42px] font-bold tracking-[4.8px] text-[#858688] uppercase">
                            {video.Category}
                        </div>
                        <img
                            src="/assets/FeaturedTitleImage.png"
                            alt={video.Title}
                            className="mb-4 max-w-[60%]"
                        />
                        <div className="mb-4 flex gap-4 text-[30px] leading-[42px] text-[#F1F1F1]">
                            <span>{video.ReleaseYear}</span>
                            <span>{video.MpaRating}</span>
                            <span>{Math.floor(Number(video.Duration) / 60)} min</span>
                        </div>
                        <p className="max-w-2xl text-[30px] leading-[42px] text-[#F1F1F1]">
                            {video.Description}
                        </p>
                        <div className="mt-6 flex gap-4">
                            <button
                                className="h-[72px] w-[240px] cursor-pointer rounded-[40px] bg-[#F1F1F1] text-center font-[Tajawal] text-[32px] leading-[30px] font-bold tracking-[-0.32px] text-[#0C0C0C]">
                                Play
                            </button>

                            <button
                                className="h-[72px] w-[240px] cursor-pointer rounded-[40px] bg-gradient-to-br from-[#2727F5] to-[#001671] text-center font-[Tajawal] text-[32px] leading-[30px] font-bold tracking-[-0.32px] text-[#F1F1F1]">
                                More Info
                            </button>
                        </div>
                    </div>
                </>
            )}
            <div className="absolute inset-0 bg-black/40"/>

        </section>
    );
};

export default FeaturedVideo;
