import Logger from "./logger";
import expressLoader from "./express";

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
