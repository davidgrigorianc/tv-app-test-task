export interface Video {
    Id: string;
    Title: string;
    CoverImage: string;
    TitleImage?: string;
    Date: string;
    ReleaseYear: string;
    MpaRating: string;
    Category: string;
    Duration: string;
    VideoUrl?: string;
    Description: string;
    LastSeen?: number;
}

export interface VideoData {
    Featured: Video;
    TrendingNow: Video[];
}

export interface FeaturedVideoProps {
    video: Video;
    isPlaying: boolean;
    onPlayClick: () => void;
}
