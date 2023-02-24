export interface Books {
  hits: {
    hits: {
      _id: string;
      _source: {
        tag: string;
        title: string;
        cover: string;
        author: string;
        date: string;
        desc: string;
      };
    }[];
  };
}
