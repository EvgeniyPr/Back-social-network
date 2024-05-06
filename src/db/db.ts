export type DBType = { videos: any[] };
export const db: DBType = { videos: [] };
export const setDb = (dataset?: DBType) => {
  if (!dataset) {
    db.videos = [];
    return;
  } else {
    db.videos = dataset.videos || db.videos;
  }
};
