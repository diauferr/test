export class VideoModel {
  constructor(
    public id: number,
    public uri: string,
    public img: string,
    public title: string,
    public description: string,
    public speakers?: string,
    public eventName?: string,
    public eventDate?: string,
    public eventLocation?: string,
    public initials?: string,
    public year?: string,
    public serie?: string
  ) {}
}
