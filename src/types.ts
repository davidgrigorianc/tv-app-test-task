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
}

export interface VideoData {
    Featured: Video;
    TrendingNow: Video[];
}
