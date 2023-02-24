export type VideoIdParam = string | number;

export interface VideoTag {
  prefix: string;
  title: string;
  id: string;
}

export interface VideoSerie {
  id: string;
  title: string;
}

export interface Video {
  type: string;
  url: string;
  image: string;
  num_id: string;
  title: string;
  id: string;
  description: string;
  event_date: string;
  video_serie: VideoSerie;
  tags: VideoTag[];
  highlight_title: string;
  highlight_description: string[];
}
