import Logger from "./logger";
import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";

export default async ({ expressApp }) => {
  await dependencyInjectorLoader();
  Logger.info("✌️ Dependency injector loaded");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
