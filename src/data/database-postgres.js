import { randomUUID } from "node:crypto";
import { sql } from "../config/db.js";

export class DatabasePostgres {
  async listAllVideos(searchQuery) {
    let videos;

    if (searchQuery) {
      videos = await sql`SELECT * FROM videos WHERE title ilike ${
        "%" + searchQuery + "%"
      }`;
    } else {
      videos = await sql`SELECT * FROM videos`;
    }

    return videos;
  }

  async createVideo(video) {
    const videoId = randomUUID();

    const { title, description, duration } = video;

    await sql`
    INSERT INTO videos (id, title, description, duration)
    VALUES (${videoId}, ${title}, ${description}, ${duration})
    `;
  }

  async updateVideo(id, video) {
    const { title, description, duration } = video;

    await sql`
    UPDATE videos
    SET title = ${title}, 
    description = ${description}, 
    duration = ${duration}
    WHERE id = ${id}
    `;
  }

  async deleteVideo(id) {
    await sql`
    DELETE FROM videos
    WHERE id = ${id}
    `;
  }
}
