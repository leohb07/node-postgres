import { fastify } from "fastify";
import { DatabasePostgres } from "./data/database-postgres.js";

const server = fastify();

const database = new DatabasePostgres();

server.post("/videos", async (request, response) => {
  const { title, description, duration } = request.body;

  await database.createVideo({
    title,
    description,
    duration,
  });

  return response.status(201).send();
});

server.get("/videos", async (request, response) => {
  const { search } = request.query;
  const videos = await database.listAllVideos(search);

  return response.status(200).send({
    videos,
  });
});

server.put("/videos/:id", async (request, response) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  await database.updateVideo(videoId, {
    title,
    description,
    duration,
  });

  return response.status(204).send();
});

server.delete("/videos/:id", (request, response) => {
  const videoId = request.params.id;

  database.deleteVideo(videoId);

  return response.status(204).send();
});

server.listen({
  port: 3333,
});
