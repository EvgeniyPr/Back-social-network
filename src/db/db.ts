import { video1 } from "../../__tests__/datasets";
export type DBType = { videos: any[] };

export const db: DBType = { videos: [video1] };
export const setDb = (dataset?: DBType) => {
  if (!dataset) {
    db.videos = [];
    return;
  } else {
    db.videos = dataset.videos || db.videos;
  }
};
