import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map();

  listAllVideos(searchQuery) {
    return Array.from(this.#videos.entries())
      .map((video) => {
        const videoId = video[0];
        const dataVideo = video[1];

        return {
          videoId,
          ...dataVideo,
        };
      })
      .filter((video) => {
        if (searchQuery) {
          return video.title.includes(searchQuery);
        }

        return true;
      });
  }

  createVideo(video) {
    const videoId = randomUUID();

    this.#videos.set(videoId, video);
  }

  updateVideo(id, video) {
    this.#videos.set(id, video);
  }

  deleteVideo(id) {
    this.#videos.delete(id);
  }
}
