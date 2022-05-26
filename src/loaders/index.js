import Logger from "./logger";
import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import dbLoader from "./database";

export default async ({ expressApp }) => {
  try {
    await dependencyInjectorLoader();
    Logger.info("✌️ Dependency injector loaded");

    await dbLoader();
    Logger.info("✌️ Database set up");

    await expressLoader({ app: expressApp });
    Logger.info("✌️ Express loaded");
  } catch (error) {
    Logger.error(`X Something went wrong X: ${error}`);
  }
};
