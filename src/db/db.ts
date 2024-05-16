import { video1 } from "../../__tests__/datasets";
export type DBType = { videos: any[]; blogs: any[]; posts: any[] };

export const db: DBType = {
  videos: [],
  blogs: [
    {
      id: "1",
      name: "string",
      description: "string",
      websiteUrl:
        "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
    },
  ],
  posts: [],
};
export const setDb = (dataset?: DBType) => {
  if (!dataset) {
    db.videos = [];
    db.blogs = [];
    db.posts = [];
    return;
  } else {
    db.videos = dataset.videos || db.videos;
  }
};
