import Logger from "./logger";
import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import dbLoader from "./database";

export default async ({ expressApp }) => {
  try {
    await dependencyInjectorLoader();
    Logger.info("✌️ Dependency injector loaded");

    await expressLoader({ app: expressApp });
    Logger.info("✌️ Express loaded");

    await dbLoader();
    Logger.info("✌️ Database set up");
  } catch (error) {
    Logger.error(`X Something went wrong X: ${error}`);
  }
};
