// Import the framework and instantiate it
import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";
import "./database/redis";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { PORT } from "./utils/env";

console.log(process.env.DATABASE_URL);
const firebaseApp = initializeApp({
  credential: admin.credential.cert(
    "./.firebase/beprepared-service-account.json"
  ),
});

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: "*",
});

fastify.register(routes);

fastify.listen({ port: PORT, host: "192.168.1.43" }).then(() => {
  console.log(`Server is listening to ${PORT}`);
});

fastify.listen({ port: PORT }).then(() => {
  console.log(`Server is listening to ${PORT}`);
});
