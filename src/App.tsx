import React, {useEffect, useState} from 'react';
import Menu from './components/Menu/Menu';
import FeaturedVideo from './components/FeaturedVideo/FeaturedVideo';
import TrendingCarousel from './components/TrendingCarousel/TrendingCarousel';

import rawData from './data/data.json';
import type {Video, VideoData} from './types';

type ExtendedVideo = Video & { LastSeen?: number };

const App: React.FC = () => {
    const [videos, setVideos] = useState<ExtendedVideo[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<ExtendedVideo | null>(null);

    useEffect(() => {
        const data = rawData as VideoData;
        const baseVideos = data.TrendingNow;

        const lastSeenRaw = sessionStorage.getItem('lastSeenVideos');
        const lastSeenData: Record<string, number> = lastSeenRaw ? JSON.parse(lastSeenRaw) : {};

        const mergedVideos: ExtendedVideo[] = baseVideos.map((video) => ({
            ...video,
            LastSeen: lastSeenData[video.Id] || 0,
        }));

        const sorted = [...mergedVideos].sort((a, b) => {
            if ((b.LastSeen || 0) !== (a.LastSeen || 0)) {
                return (b.LastSeen || 0) - (a.LastSeen || 0);
            }
            return 0;
        });
        const featuredInTrending = baseVideos.find(v => v.Id === data.Featured.Id);

        setVideos(sorted);
        setSelectedVideo(sorted[0] || featuredInTrending);
    }, []);

    const handleVideoSelect = (video: Video) => {
        const now = Date.now();

        const lastSeenRaw = sessionStorage.getItem('lastSeenVideos');
        const lastSeenData: Record<string, number> = lastSeenRaw ? JSON.parse(lastSeenRaw) : {};
        lastSeenData[video.Id] = now;
        sessionStorage.setItem('lastSeenVideos', JSON.stringify(lastSeenData));

        setSelectedVideo({...video, LastSeen: now});
    };

    return (
        <div className="flex h-screen bg-black text-white">
            <Menu/>
            <main className="h-full w-full overflow-hidden pl-[157px]">
                <div className="flex h-full flex-col">
                    {selectedVideo && (
                        <div className="flex-grow-[7]">
                            <FeaturedVideo video={selectedVideo}/>
                        </div>
                    )}
                    <div className="flex-grow-[3]">
                        <TrendingCarousel videos={videos} onSelect={handleVideoSelect}/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
